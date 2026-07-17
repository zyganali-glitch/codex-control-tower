'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { SKIP_DIRECTORIES, SKIP_FILES } = require('./constants');

function resolveTarget(input = '.') {
  const target = path.resolve(input);
  if (!fs.existsSync(target)) {
    throw new Error(`Target does not exist: ${target}`);
  }
  if (!fs.statSync(target).isDirectory()) {
    throw new Error(`Target is not a directory: ${target}`);
  }
  return target;
}

function normalizeRelative(value) {
  return value.split(path.sep).join('/').replace(/^\.\//, '');
}

function isInside(parent, child) {
  const relative = path.relative(path.resolve(parent), path.resolve(child));
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function ensureInside(parent, child) {
  if (!isInside(parent, child)) {
    throw new Error(`Refusing to access a path outside the allowed root: ${child}`);
  }
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, { recursive: true });
}

function assertNoSymlinkTraversal(root, destination) {
  const relative = path.relative(path.resolve(root), path.resolve(destination));
  const parts = relative.split(path.sep).filter(Boolean);
  let current = path.resolve(root);

  function inspect(candidate) {
    try {
      if (fs.lstatSync(candidate).isSymbolicLink()) {
        throw new Error(`Refusing to access a path through a symbolic link: ${candidate}`);
      }
    } catch (error) {
      if (error?.code === 'ENOENT' || error?.code === 'ENOTDIR') return;
      throw error;
    }
  }

  inspect(current);
  for (const part of parts) {
    current = path.join(current, part);
    inspect(current);
  }
}

function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function readText(file, fallback = '') {
  try {
    return fs.readFileSync(file, 'utf8');
  } catch {
    return fallback;
  }
}

function normalizeExcludedPaths(values = []) {
  return values
    .map((value) => String(value || '').trim().replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/$/, ''))
    .filter((value) => value && value !== '.' && !value.startsWith('../') && !path.isAbsolute(value));
}

function listRepoFiles(target, options = {}) {
  const files = [];
  const excludedPaths = normalizeExcludedPaths(options.excludePaths);

  function excluded(relative) {
    return excludedPaths.some((candidate) => relative === candidate || relative.startsWith(`${candidate}/`));
  }

  function visit(directory) {
    const entries = fs.readdirSync(directory, { withFileTypes: true })
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory() && SKIP_DIRECTORIES.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      ensureInside(target, absolute);
      const relative = normalizeRelative(path.relative(target, absolute));
      if (excluded(relative)) continue;
      if (entry.isDirectory() && fs.existsSync(path.join(absolute, '.controltower-generated.json'))) continue;
      if (entry.isDirectory()) visit(absolute);
      if (entry.isFile()) {
        if (SKIP_FILES.has(entry.name)) continue;
        const stats = fs.statSync(absolute);
        files.push({
          absolute,
          relative,
          bytes: stats.size,
          modifiedAt: stats.mtime.toISOString()
        });
      }
    }
  }

  visit(target);
  return files;
}

function timestampForPath(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function writeFileSafe(target, relative, content, options = {}) {
  const destination = path.resolve(target, relative);
  ensureInside(target, destination);
  assertNoSymlinkTraversal(target, destination);
  ensureDirectory(path.dirname(destination));
  const exists = fs.existsSync(destination);
  if (exists && !options.overwrite) {
    return { path: destination, status: 'PRESERVED' };
  }
  if (exists && options.backup) {
    const backupRoot = path.join(target, '.controltower-backups', options.timestamp || timestampForPath());
    const backupPath = path.join(backupRoot, relative);
    ensureInside(target, backupPath);
    assertNoSymlinkTraversal(target, backupPath);
    ensureDirectory(path.dirname(backupPath));
    fs.copyFileSync(destination, backupPath);
  }
  fs.writeFileSync(destination, content, 'utf8');
  return { path: destination, status: exists ? 'UPDATED' : 'CREATED' };
}

function writeJsonSafe(target, relative, value, options = {}) {
  return writeFileSafe(target, relative, `${JSON.stringify(value, null, 2)}\n`, options);
}

function writeGeneratedFile(destination, content) {
  ensureDirectory(path.dirname(path.resolve(destination)));
  fs.writeFileSync(path.resolve(destination), content, 'utf8');
  return path.resolve(destination);
}

function resetDemoDirectory(root, directory) {
  const absolute = path.resolve(directory);
  ensureInside(root, absolute);
  if (path.basename(absolute) !== 'demo-workspace') {
    throw new Error(`Refusing to reset a non-demo directory: ${absolute}`);
  }
  if (fs.existsSync(absolute)) fs.rmSync(absolute, { recursive: true, force: true });
  fs.mkdirSync(absolute, { recursive: true });
}

function copyDirectory(source, destination) {
  ensureDirectory(destination);
  fs.cpSync(source, destination, { recursive: true, force: false, errorOnExist: false });
}

module.exports = {
  copyDirectory,
  assertNoSymlinkTraversal,
  ensureDirectory,
  ensureInside,
  isInside,
  listRepoFiles,
  normalizeExcludedPaths,
  normalizeRelative,
  readJson,
  readText,
  resetDemoDirectory,
  resolveTarget,
  timestampForPath,
  writeFileSafe,
  writeGeneratedFile,
  writeJsonSafe
};
