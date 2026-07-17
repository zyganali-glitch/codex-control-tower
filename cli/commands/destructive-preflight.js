'use strict';

const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const { execFileSync } = require('node:child_process');
const { analyzeDestructiveAction } = require('../lib/destructiveActionPreflight');
const { appendPreflightEvent } = require('../lib/flightRecorder');
const { resolveTarget, writeJsonSafe } = require('../lib/safeFs');

function booleanValue(value) {
  if (value === true || value === false) return value;
  if (value == null || value === '') return false;
  const normalized = String(value).trim().toLowerCase();
  if (['true', '1', 'yes', 'on'].includes(normalized)) return true;
  if (['false', '0', 'no', 'off'].includes(normalized)) return false;
  throw new Error(`Expected a boolean value, received: ${value}`);
}

function printPreflight(result) {
  console.log('DESTRUCTIVE ACTION PREFLIGHT');
  console.log('ANALYSIS ONLY · NO COMMAND EXECUTED');
  console.log(`Operation: ${result.operation}`);
  console.log(`Requested target: ${result.requestedTarget}`);
  console.log(`Resolved boundary: ${result.protectedBoundary}`);
  console.log(`Decision: ${result.decision}`);
  console.log(`Execution: ${result.executionState}`);
  console.log('HUMAN REVIEW REQUIRED');
  console.log(`Deterministic policy: ${result.policyVersion}`);
  result.reasons.forEach((reason) => console.log(`- ${reason}`));
  console.log(`Safer next action: ${result.saferNextAction}`);
}

function normalizeOutputPath(value) {
  if (path.isAbsolute(String(value || ''))) {
    throw new Error('destructive-preflight --out must use a repository-relative generated path.');
  }
  const normalized = path.posix.normalize(String(value || '').replaceAll('\\', '/'));
  const allowedRoot = normalized.startsWith('.controltower/') || normalized.startsWith('tmp/');
  const allowedName = /(?:^|\/)[^/]*destructive-preflight[^/]*\.json$/iu.test(normalized);
  if (!allowedRoot || !allowedName || normalized.startsWith('../')) {
    throw new Error('destructive-preflight --out is limited to a named preflight JSON under .controltower/ or tmp/.');
  }
  return normalized;
}

function verifyGitRepositoryRoot(target) {
  try {
    const reported = execFileSync('git', ['-C', target, 'rev-parse', '--show-toplevel'], {
      encoding: 'utf8',
      windowsHide: true,
      stdio: ['ignore', 'pipe', 'ignore']
    }).trim();
    const reportedRealPath = fs.realpathSync.native(reported);
    const targetRealPath = fs.realpathSync.native(target);
    return process.platform === 'win32'
      ? reportedRealPath.toLowerCase() === targetRealPath.toLowerCase()
      : reportedRealPath === targetRealPath;
  } catch {
    return false;
  }
}

async function destructivePreflightCommand(args, options = {}) {
  const target = resolveTarget(args.target || '.');
  if (!args.operation) throw new Error('destructive-preflight requires --operation.');
  if (args.path === undefined || args.path === true) throw new Error('destructive-preflight requires --path.');

  const result = analyzeDestructiveAction({
    operation: args.operation,
    requestedTarget: args.path,
    currentWorkingDirectory: args.cwd || process.cwd(),
    repositoryRoot: target,
    platform: args.platform || process.platform,
    recursive: booleanValue(args.recursive),
    force: booleanValue(args.force),
    source: args.source || 'structured_cli'
  }, {
    homeDirectory: options.homeDirectory || os.homedir(),
    now: options.now,
    inspectPath: options.inspectPath,
    symlinkPaths: options.symlinkPaths,
    canonicalizePath: options.canonicalizePath,
    repositoryRootVerified: options.repositoryRootVerified ?? verifyGitRepositoryRoot(target)
  });

  if (args.out) {
    const outputPath = normalizeOutputPath(args.out);
    const written = writeJsonSafe(target, outputPath, result, { overwrite: booleanValue(args.overwrite) });
    if (written.status === 'PRESERVED') {
      throw new Error('The preflight output already exists. Choose a new generated path or pass --overwrite explicitly.');
    }
  }
  if (booleanValue(args.record)) {
    appendPreflightEvent(target, result);
  }
  printPreflight(result);
  return result;
}

module.exports = {
  booleanValue,
  destructivePreflightCommand,
  normalizeOutputPath,
  printPreflight,
  verifyGitRepositoryRoot
};
