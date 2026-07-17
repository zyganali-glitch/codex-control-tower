'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

function normalizePlatform(value = process.platform) {
  const normalized = String(value || '').toLowerCase();
  if (normalized === 'win32' || normalized === 'windows') return 'win32';
  if (['posix', 'linux', 'darwin', 'freebsd', 'openbsd', 'aix', 'sunos'].includes(normalized)) return 'posix';
  throw new Error(`Unsupported platform: ${value}`);
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

  const platformHomePrefix = normalizePlatform(platform) === 'win32'
    ? value.match(/^(?:\$\{HOME\}|\$HOME|~|%USERPROFILE%|\$env:USERPROFILE)(?=$|[\\/])/iu)
    : value.match(/^(?:\$\{HOME\}|\$HOME|~)(?=$|[\\/])/u)
      || value.match(/^(?:%USERPROFILE%|\$env:USERPROFILE)(?=$|[\\/])/iu);
  if (platformHomePrefix) {
    value = `${homeDirectory}${value.slice(platformHomePrefix[0].length)}`;
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
}

function pathExpression(root) {
  return normalizeSeparators(root, 'posix')
    .split('/')
    .map(escapeRegExp)
    .join('[\\\\/]');
}

function redactRequestedTarget(value, context) {
  let redacted = String(value || '');
  const entries = [
    [context.repositoryRoot, '<REPOSITORY_ROOT>'],
    [context.homeDirectory, '<USER_HOME>']
  ].sort((left, right) => String(right[0]).length - String(left[0]).length);
  for (const [root, token] of entries) {
    const flags = normalizePlatform(context.platform) === 'win32' ? 'giu' : 'gu';
    redacted = redacted.replace(new RegExp(pathExpression(root), flags), token);
  }
  redacted = redacted
    .replace(/\b[A-Za-z]:[\\/]+Users[\\/]+[^\\/\s"'`]+/giu, '<USER_HOME>')
    .replace(/\/(?:Users|home)\/[^/\s"'`]+/gu, '<USER_HOME>');
  const parentFlags = normalizePlatform(context.platform) === 'win32' ? 'giu' : 'gu';
  redacted = redacted.replace(new RegExp(pathExpression(context.homeParent), parentFlags), '<USER_HOME_PARENT>');
  return redacted;
}

function redactSensitiveText(value, input = {}, options = {}) {
  const platform = normalizePlatform(input.platform || options.platform || process.platform);
  const api = pathApiFor(platform);
  const repositoryRoot = api.resolve(normalizeSeparators(input.repositoryRoot || '.', platform));
  const homeDirectory = api.resolve(normalizeSeparators(
    options.homeDirectory || input.homeDirectory || os.homedir(),
    platform
  ));
  return redactRequestedTarget(value, {
    platform,
    repositoryRoot,
    homeDirectory,
    homeParent: api.dirname(homeDirectory)
  });
}

function hasVerifiedRepositoryMarker(repositoryRoot, platform, options = {}) {
  if (typeof options.repositoryRootVerified === 'boolean') return options.repositoryRootVerified;
  if (normalizePlatform(platform) !== normalizePlatform(process.platform)) return false;
  try {
    const marker = fs.lstatSync(pathApiFor(platform).join(repositoryRoot, '.git'));
    return !marker.isSymbolicLink() && (marker.isDirectory() || marker.isFile());
  } catch {
    return false;
  }
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

  if (normalizePlatform(platform) !== normalizePlatform(process.platform)) {
    return { reasonCode: 'PATH_INSPECTION_UNCERTAIN' };
  }
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
      if (fs.lstatSync(candidate).isSymbolicLink()) return { reasonCode: 'SYMLINK_BOUNDARY' };
    } catch (error) {
      if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') break;
      return { reasonCode: 'PATH_INSPECTION_UNCERTAIN' };
    }
  }
  return null;
}

function canonicalizeBoundary(value, platform, options = {}) {
  const api = pathApiFor(platform);
  if (typeof options.canonicalizePath === 'function') {
    try {
      const canonical = options.canonicalizePath(value);
      return { value: canonical ? api.resolve(normalizeSeparators(canonical, platform)) : value, uncertain: false };
    } catch {
      return { value, uncertain: true };
    }
  }
  if (normalizePlatform(platform) !== normalizePlatform(process.platform)) {
    return { value, uncertain: true };
  }

  let candidate = value;
  const suffix = [];
  while (candidate && !samePath(candidate, api.dirname(candidate), platform)) {
    try {
      const canonical = fs.realpathSync.native(candidate);
      return {
        value: suffix.length ? api.join(canonical, ...suffix) : canonical,
        uncertain: false
      };
    } catch (error) {
      if (error?.code !== 'ENOENT' && error?.code !== 'ENOTDIR') {
        return { value, uncertain: true };
      }
      suffix.unshift(api.basename(candidate));
      candidate = api.dirname(candidate);
    }
  }
  return { value, uncertain: false };
}

module.exports = {
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
};
