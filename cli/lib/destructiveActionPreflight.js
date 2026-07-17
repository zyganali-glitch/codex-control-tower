'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { parseDestructiveCommand } = require('./destructiveCommandParser');

const POLICY_VERSION = '1.0.0';
const OPERATIONS = new Set([
  'delete',
  'recursive_delete',
  'remove_directory',
  'clean_untracked',
  'overwrite',
  'destructive_reset'
]);

const REASON_TEXT = {
  UNSUPPORTED_OPERATION: 'The requested operation is not part of the documented destructive-operation policy.',
  MISSING_TARGET: 'No single target path was supplied, so the destructive boundary cannot be resolved.',
  CONTROL_CHARACTER: 'The target contains a control character and cannot be resolved deterministically.',
  COMMAND_SUBSTITUTION: 'Command substitution is not accepted in a destructive target.',
  COMMAND_CHAINING: 'Shell chaining, redirection, or piping makes the target ambiguous.',
  UNTERMINATED_QUOTE: 'The target contains an unterminated or dynamic quote expression.',
  UNRESOLVED_VARIABLE: 'The target contains an unresolved or unsupported variable expression.',
  AMBIGUOUS_WILDCARD: 'Wildcard and glob targets are not accepted for destructive analysis.',
  WINDOWS_DRIVE_RELATIVE: 'A Windows drive-relative path depends on process state and is not deterministic.',
  MULTIPLE_TARGETS: 'Multiple destructive targets are outside the documented command subset.',
  UNSUPPORTED_COMMAND_FORM: 'The destructive command form is outside the documented parser subset.',
  PATH_INSPECTION_UNCERTAIN: 'The target boundary could not be inspected reliably.',
  SYMLINK_BOUNDARY: 'A symbolic-link boundary makes the final target uncertain.',
  FILESYSTEM_ROOT: 'The target resolves to a filesystem or drive root.',
  USER_HOME: 'The target resolves to the user home boundary.',
  USER_HOME_PARENT: 'The target resolves to the parent of the user home boundary.',
  REPOSITORY_ROOT: 'The target resolves to the repository root itself.',
  REPOSITORY_GIT_DIR: 'The target resolves to the repository .git directory or one of its descendants.',
  OUTSIDE_REPOSITORY: 'The target resolves outside the repository boundary.',
  REPOSITORY_SUBPATH: 'The target is a specific repository subpath, but destructive execution still requires human review.'
};

function normalizePlatform(value = process.platform) {
  const normalized = String(value || '').toLowerCase();
  return normalized === 'win32' || normalized === 'windows' ? 'win32' : 'posix';
}

function pathApiFor(platform) {
  return normalizePlatform(platform) === 'win32' ? path.win32 : path.posix;
}

function normalizeSeparators(value, platform) {
  return normalizePlatform(platform) === 'win32'
    ? String(value || '').replaceAll('/', '\\')
    : String(value || '').replaceAll('\\', '/');
}

function normalizeComparable(value, platform) {
  const api = pathApiFor(platform);
  const normalized = api.normalize(normalizeSeparators(value, platform));
  return normalizePlatform(platform) === 'win32' ? normalized.toLowerCase() : normalized;
}

function samePath(left, right, platform) {
  return normalizeComparable(left, platform) === normalizeComparable(right, platform);
}

function isInsidePath(parent, child, platform) {
  const api = pathApiFor(platform);
  const relative = api.relative(
    normalizeSeparators(parent, platform),
    normalizeSeparators(child, platform)
  );
  const comparable = normalizePlatform(platform) === 'win32' ? relative.toLowerCase() : relative;
  return comparable === ''
    || (!comparable.startsWith('..') && !api.isAbsolute(relative));
}

function stripOuterQuotes(value) {
  const text = String(value || '').trim();
  if (text.length >= 2 && ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'")))) {
    return { value: text.slice(1, -1), balanced: true };
  }
  if (text.startsWith('"') || text.endsWith('"') || text.startsWith("'") || text.endsWith("'")) {
    return { value: text, balanced: false };
  }
  return { value: text, balanced: true };
}

function pushReason(codes, code) {
  if (!codes.includes(code)) codes.push(code);
}

function expandTargetExpression(requestedTarget, context) {
  const { homeDirectory, platform } = context;
  const quoted = stripOuterQuotes(requestedTarget);
  let value = quoted.value;
  const reasonCodes = [];
  let usedHomeExpression = false;

  if (!quoted.balanced) pushReason(reasonCodes, 'UNTERMINATED_QUOTE');
  if (!value) pushReason(reasonCodes, 'MISSING_TARGET');
  if (/[\u0000-\u001f\u007f]/u.test(value)) pushReason(reasonCodes, 'CONTROL_CHARACTER');
  if (value.includes('`') || value.includes('$(')) pushReason(reasonCodes, 'COMMAND_SUBSTITUTION');
  if (/(?:&&|\|\||[;|<>])/u.test(value)) pushReason(reasonCodes, 'COMMAND_CHAINING');

  const homePrefix = /^(?:\$\{HOME\}|\$HOME|~|%USERPROFILE%|\$env:USERPROFILE)(?=$|[\\/])/iu;
  if (homePrefix.test(value)) {
    value = value.replace(homePrefix, () => homeDirectory);
    usedHomeExpression = true;
  }

  if (/^(?:~[^\\/]|~$)/u.test(value) && !usedHomeExpression) {
    pushReason(reasonCodes, 'UNRESOLVED_VARIABLE');
  }
  if (/\$(?:\{[^}]*\}|env:[A-Za-z_][A-Za-z0-9_]*|[A-Za-z_][A-Za-z0-9_]*|\()/iu.test(value)
    || /%[^%]+%/u.test(value)) {
    pushReason(reasonCodes, 'UNRESOLVED_VARIABLE');
  }
  if (/[*?[\]{}]/u.test(value)) pushReason(reasonCodes, 'AMBIGUOUS_WILDCARD');
  if (/["']/u.test(value)) pushReason(reasonCodes, 'UNTERMINATED_QUOTE');
  if (normalizePlatform(platform) === 'win32' && /^[A-Za-z]:(?![\\/])/u.test(value)) {
    pushReason(reasonCodes, 'WINDOWS_DRIVE_RELATIVE');
  }

  return {
    expanded: normalizeSeparators(value, platform),
    reasonCodes,
    usedHomeExpression
  };
}

function relativeDisplay(root, target, token, platform) {
  const api = pathApiFor(platform);
  if (samePath(root, target, platform)) return token;
  if (!isInsidePath(root, target, platform)) return null;
  const relative = api.relative(
    normalizeSeparators(root, platform),
    normalizeSeparators(target, platform)
  ).replaceAll('\\', '/');
  return relative ? `${token}/${relative}` : token;
}

function redactResolvedTarget(target, context) {
  const { homeDirectory, homeParent, repositoryRoot, repositoryGitDirectory, filesystemRoot, platform } = context;
  if (!target) return '<UNRESOLVED_TARGET>';

  const candidates = [
    [repositoryGitDirectory, '<REPOSITORY_GIT_DIR>'],
    [repositoryRoot, '<REPOSITORY_ROOT>'],
    [homeDirectory, '<USER_HOME>'],
    [homeParent, '<USER_HOME_PARENT>'],
    [filesystemRoot, '<FILESYSTEM_ROOT>']
  ].sort((left, right) => String(right[0]).length - String(left[0]).length);

  for (const [root, token] of candidates) {
    const display = relativeDisplay(root, target, token, platform);
    if (display) return display;
  }
  return '<OUTSIDE_REPOSITORY>';
}

function replaceInsensitive(value, search, replacement) {
  if (!search) return value;
  const source = String(value);
  const lowerSource = source.toLowerCase();
  const lowerSearch = String(search).toLowerCase();
  const index = lowerSource.indexOf(lowerSearch);
  if (index === -1) return source;
  return `${source.slice(0, index)}${replacement}${source.slice(index + String(search).length)}`;
}

function redactRequestedTarget(value, context) {
  let redacted = String(value || '');
  const entries = [
    [context.repositoryRoot, '<REPOSITORY_ROOT>'],
    [context.homeDirectory, '<USER_HOME>'],
    [context.homeParent, '<USER_HOME_PARENT>']
  ].sort((left, right) => String(right[0]).length - String(left[0]).length);
  for (const [root, token] of entries) {
    redacted = normalizePlatform(context.platform) === 'win32'
      ? replaceInsensitive(redacted, root, token)
      : redacted.replace(root, token);
  }
  return redacted;
}

function inspectSymlinkBoundary(repositoryRoot, resolvedTarget, context, options) {
  const { platform } = context;
  const api = pathApiFor(platform);
  const injected = options.inspectPath;
  const declaredSymlinks = (options.symlinkPaths || []).map((item) => normalizeSeparators(item, platform));

  for (const candidate of declaredSymlinks) {
    if (samePath(candidate, resolvedTarget, platform) || isInsidePath(candidate, resolvedTarget, platform)) {
      return { reasonCode: 'SYMLINK_BOUNDARY' };
    }
  }

  if (typeof injected === 'function') {
    const relative = api.relative(repositoryRoot, resolvedTarget);
    const parts = relative.split(api.sep).filter(Boolean);
    const candidates = [repositoryRoot];
    let current = repositoryRoot;
    for (const part of parts) {
      current = api.join(current, part);
      candidates.push(current);
    }
    for (const candidate of candidates) {
      let inspection;
      try {
        inspection = injected(candidate);
      } catch {
        return { reasonCode: 'PATH_INSPECTION_UNCERTAIN' };
      }
      if (inspection?.uncertain || inspection?.error) return { reasonCode: 'PATH_INSPECTION_UNCERTAIN' };
      if (inspection?.symbolicLink || inspection?.isSymbolicLink) return { reasonCode: 'SYMLINK_BOUNDARY' };
    }
    return null;
  }

  if (normalizePlatform(platform) !== normalizePlatform(process.platform)) return null;
  const relative = api.relative(repositoryRoot, resolvedTarget);
  const parts = relative.split(api.sep).filter(Boolean);
  const candidates = [repositoryRoot];
  let current = repositoryRoot;
  for (const part of parts) {
    current = api.join(current, part);
    candidates.push(current);
  }
  for (const candidate of candidates) {
    try {
      if (!fs.existsSync(candidate)) continue;
      if (fs.lstatSync(candidate).isSymbolicLink()) return { reasonCode: 'SYMLINK_BOUNDARY' };
    } catch {
      return { reasonCode: 'PATH_INSPECTION_UNCERTAIN' };
    }
  }
  return null;
}

function analyzeDestructiveAction(input = {}, options = {}) {
  const platform = normalizePlatform(input.platform || options.platform || process.platform);
  const api = pathApiFor(platform);
  const repositoryRoot = api.resolve(normalizeSeparators(input.repositoryRoot || '.', platform));
  const currentWorkingDirectory = api.resolve(
    repositoryRoot,
    normalizeSeparators(input.currentWorkingDirectory || repositoryRoot, platform)
  );
  const homeDirectory = api.resolve(normalizeSeparators(
    options.homeDirectory || input.homeDirectory || os.homedir(),
    platform
  ));
  const homeParent = api.dirname(homeDirectory);
  const repositoryGitDirectory = api.join(repositoryRoot, '.git');
  const filesystemRoot = api.parse(repositoryRoot).root || api.sep;
  const context = {
    platform,
    repositoryRoot,
    currentWorkingDirectory,
    homeDirectory,
    homeParent,
    repositoryGitDirectory,
    filesystemRoot
  };
  const operation = String(input.operation || '').trim().toLowerCase();
  const requestedTarget = String(input.requestedTarget ?? '');
  const expansion = expandTargetExpression(requestedTarget, context);
  const reasonCodes = [...(options.preflightReasonCodes || []), ...expansion.reasonCodes];
  let resolvedTarget = null;
  let protectedBoundary = '<UNRESOLVED_TARGET>';
  let protectedBoundaryType = 'UNRESOLVED_TARGET';

  if (!OPERATIONS.has(operation)) pushReason(reasonCodes, 'UNSUPPORTED_OPERATION');

  if (!reasonCodes.length) {
    try {
      resolvedTarget = api.resolve(currentWorkingDirectory, expansion.expanded);
    } catch {
      pushReason(reasonCodes, 'PATH_INSPECTION_UNCERTAIN');
    }
  }

  if (resolvedTarget && !reasonCodes.length) {
    if (samePath(resolvedTarget, api.parse(resolvedTarget).root, platform)) {
      pushReason(reasonCodes, 'FILESYSTEM_ROOT');
      protectedBoundary = '<FILESYSTEM_ROOT>';
      protectedBoundaryType = 'FILESYSTEM_ROOT';
    } else if (samePath(resolvedTarget, homeDirectory, platform)) {
      pushReason(reasonCodes, 'USER_HOME');
      protectedBoundary = '<USER_HOME>';
      protectedBoundaryType = 'USER_HOME';
    } else if (samePath(resolvedTarget, homeParent, platform)) {
      pushReason(reasonCodes, 'USER_HOME_PARENT');
      protectedBoundary = '<USER_HOME_PARENT>';
      protectedBoundaryType = 'USER_HOME_PARENT';
    } else if (samePath(resolvedTarget, repositoryRoot, platform)) {
      pushReason(reasonCodes, 'REPOSITORY_ROOT');
      protectedBoundary = '<REPOSITORY_ROOT>';
      protectedBoundaryType = 'REPOSITORY_ROOT';
    } else if (samePath(resolvedTarget, repositoryGitDirectory, platform)
      || isInsidePath(repositoryGitDirectory, resolvedTarget, platform)) {
      pushReason(reasonCodes, 'REPOSITORY_GIT_DIR');
      protectedBoundary = '<REPOSITORY_GIT_DIR>';
      protectedBoundaryType = 'REPOSITORY_GIT_DIR';
    } else if (!isInsidePath(repositoryRoot, resolvedTarget, platform)) {
      pushReason(reasonCodes, 'OUTSIDE_REPOSITORY');
      protectedBoundary = '<OUTSIDE_REPOSITORY>';
      protectedBoundaryType = 'OUTSIDE_REPOSITORY';
    } else {
      const inspection = inspectSymlinkBoundary(repositoryRoot, resolvedTarget, context, options);
      if (inspection) {
        pushReason(reasonCodes, inspection.reasonCode);
        protectedBoundary = inspection.reasonCode === 'SYMLINK_BOUNDARY'
          ? '<SYMLINK_BOUNDARY>'
          : '<UNRESOLVED_BOUNDARY>';
        protectedBoundaryType = inspection.reasonCode;
      } else {
        pushReason(reasonCodes, 'REPOSITORY_SUBPATH');
        protectedBoundary = '<REPOSITORY_SUBPATH>';
        protectedBoundaryType = 'REPOSITORY_SUBPATH';
      }
    }
  }

  if (protectedBoundaryType === 'UNRESOLVED_TARGET' && reasonCodes.length) {
    if (reasonCodes.includes('SYMLINK_BOUNDARY')) {
      protectedBoundary = '<SYMLINK_BOUNDARY>';
      protectedBoundaryType = 'SYMLINK_BOUNDARY';
    } else {
      protectedBoundary = '<UNRESOLVED_TARGET>';
      protectedBoundaryType = 'UNRESOLVED_TARGET';
    }
  }

  const decision = reasonCodes.length === 1 && reasonCodes[0] === 'REPOSITORY_SUBPATH'
    ? 'CAUTION'
    : 'BLOCKED';
  const checkedAtValue = typeof options.now === 'function' ? options.now() : options.now;
  const checkedAt = checkedAtValue
    ? new Date(checkedAtValue).toISOString()
    : new Date().toISOString();
  const displayedResolvedTarget = resolvedTarget
    ? redactResolvedTarget(resolvedTarget, context)
    : '<UNRESOLVED_TARGET>';
  const displayedExpandedTarget = expansion.usedHomeExpression
    ? replaceInsensitive(expansion.expanded, homeDirectory, '<USER_HOME>')
    : resolvedTarget
      ? displayedResolvedTarget
      : redactRequestedTarget(expansion.expanded, context) || '<UNRESOLVED_TARGET>';

  return {
    operation: operation || 'unknown',
    decision,
    executionState: 'NOT_RUN',
    executed: false,
    requestedTarget: redactRequestedTarget(requestedTarget, context),
    expandedTarget: normalizeSeparators(displayedExpandedTarget, 'posix'),
    resolvedTarget: normalizeSeparators(displayedResolvedTarget, 'posix'),
    protectedBoundary,
    protectedBoundaryType,
    reasons: reasonCodes.map((code) => REASON_TEXT[code] || code),
    reasonCodes,
    humanReviewRequired: true,
    saferNextAction: decision === 'BLOCKED'
      ? 'Do not execute the command. Narrow the target to a specific non-symlinked repository subpath, inspect it, and obtain scoped human approval.'
      : 'Inspect the exact repository subpath, preserve needed data, and obtain scoped human approval before any execution.',
    deterministic: true,
    checkedAt,
    policyVersion: POLICY_VERSION,
    currentWorkingDirectory: redactResolvedTarget(currentWorkingDirectory, context),
    repositoryRoot: '<REPOSITORY_ROOT>',
    platform,
    recursive: input.recursive === true,
    force: input.force === true,
    source: String(input.source || 'structured_cli')
  };
}

module.exports = {
  OPERATIONS,
  POLICY_VERSION,
  REASON_TEXT,
  analyzeDestructiveAction,
  normalizePlatform,
  parseDestructiveCommand
};
