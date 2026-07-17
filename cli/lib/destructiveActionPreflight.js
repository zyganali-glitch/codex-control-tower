'use strict';

const os = require('node:os');
const { parseDestructiveCommand } = require('./destructiveCommandParser');
const {
  canonicalizeBoundary,
  expandTargetExpression,
  hasVerifiedRepositoryMarker,
  inspectSymlinkBoundary,
  isInsidePath,
  normalizePlatform,
  normalizeSeparators,
  pathApiFor,
  redactRequestedTarget,
  redactResolvedTarget,
  redactSensitiveText,
  samePath
} = require('./destructivePathPolicy');

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
  UNSAFE_REPOSITORY_ROOT: 'The claimed repository root is itself a protected filesystem or user boundary.',
  UNVERIFIED_REPOSITORY_ROOT: 'The claimed repository root could not be verified as an actual Git worktree root.',
  SYMLINK_BOUNDARY: 'A symbolic-link boundary makes the final target uncertain.',
  FILESYSTEM_ROOT: 'The target resolves to a filesystem or drive root.',
  USER_HOME: 'The target resolves to the user home boundary.',
  USER_HOME_PARENT: 'The target resolves to the parent of the user home boundary.',
  REPOSITORY_ROOT: 'The target resolves to the repository root itself.',
  REPOSITORY_GIT_DIR: 'The target resolves to the repository .git directory or one of its descendants.',
  OUTSIDE_REPOSITORY: 'The target resolves outside the repository boundary.',
  REPOSITORY_SUBPATH: 'The target is a specific repository subpath, but destructive execution still requires human review.'
};

function pushReason(codes, code) {
  if (!codes.includes(code)) codes.push(code);
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

  if (samePath(repositoryRoot, filesystemRoot, platform)
    || samePath(repositoryRoot, homeDirectory, platform)
    || samePath(repositoryRoot, homeParent, platform)) {
    pushReason(reasonCodes, 'UNSAFE_REPOSITORY_ROOT');
  } else if (!hasVerifiedRepositoryMarker(repositoryRoot, platform, options)) {
    pushReason(reasonCodes, 'UNVERIFIED_REPOSITORY_ROOT');
  }
  if (!OPERATIONS.has(operation)) pushReason(reasonCodes, 'UNSUPPORTED_OPERATION');

  if (!reasonCodes.length) {
    try {
      resolvedTarget = api.resolve(currentWorkingDirectory, expansion.expanded);
    } catch {
      pushReason(reasonCodes, 'PATH_INSPECTION_UNCERTAIN');
    }
  }

  if (resolvedTarget && !reasonCodes.length) {
    const canonicalTarget = canonicalizeBoundary(resolvedTarget, platform, options);
    const canonicalRepository = canonicalizeBoundary(repositoryRoot, platform, options);
    const canonicalGit = canonicalizeBoundary(repositoryGitDirectory, platform, options);
    const canonicalHome = canonicalizeBoundary(homeDirectory, platform, options);
    const canonicalHomeParent = canonicalizeBoundary(homeParent, platform, options);
    if ([canonicalTarget, canonicalRepository, canonicalGit, canonicalHome, canonicalHomeParent].some((item) => item.uncertain)) {
      pushReason(reasonCodes, 'PATH_INSPECTION_UNCERTAIN');
      protectedBoundary = '<UNRESOLVED_BOUNDARY>';
      protectedBoundaryType = 'PATH_INSPECTION_UNCERTAIN';
    } else if (samePath(canonicalTarget.value, api.parse(canonicalTarget.value).root, platform)) {
      pushReason(reasonCodes, 'FILESYSTEM_ROOT');
      protectedBoundary = '<FILESYSTEM_ROOT>';
      protectedBoundaryType = 'FILESYSTEM_ROOT';
    } else if (samePath(canonicalTarget.value, canonicalHome.value, platform)) {
      pushReason(reasonCodes, 'USER_HOME');
      protectedBoundary = '<USER_HOME>';
      protectedBoundaryType = 'USER_HOME';
    } else if (samePath(canonicalTarget.value, canonicalHomeParent.value, platform)) {
      pushReason(reasonCodes, 'USER_HOME_PARENT');
      protectedBoundary = '<USER_HOME_PARENT>';
      protectedBoundaryType = 'USER_HOME_PARENT';
    } else if (samePath(canonicalTarget.value, canonicalRepository.value, platform)) {
      pushReason(reasonCodes, 'REPOSITORY_ROOT');
      protectedBoundary = '<REPOSITORY_ROOT>';
      protectedBoundaryType = 'REPOSITORY_ROOT';
    } else if (samePath(canonicalTarget.value, canonicalGit.value, platform)
      || isInsidePath(canonicalGit.value, canonicalTarget.value, platform)) {
      pushReason(reasonCodes, 'REPOSITORY_GIT_DIR');
      protectedBoundary = '<REPOSITORY_GIT_DIR>';
      protectedBoundaryType = 'REPOSITORY_GIT_DIR';
    } else if (!isInsidePath(canonicalRepository.value, canonicalTarget.value, platform)) {
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
  const displayedResolvedTarget = protectedBoundaryType === 'REPOSITORY_GIT_DIR'
    ? '<REPOSITORY_GIT_DIR>'
    : protectedBoundaryType === 'OUTSIDE_REPOSITORY'
      ? '<OUTSIDE_REPOSITORY>'
      : resolvedTarget
        ? redactResolvedTarget(resolvedTarget, context)
        : '<UNRESOLVED_TARGET>';
  const displayedExpandedTarget = expansion.usedHomeExpression
    ? redactRequestedTarget(expansion.expanded, context)
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
  parseDestructiveCommand,
  redactSensitiveText
};
