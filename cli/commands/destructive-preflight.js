'use strict';

const os = require('node:os');
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

async function destructivePreflightCommand(args, options = {}) {
  const target = resolveTarget(args.target || '.');
  if (!args.operation) throw new Error('destructive-preflight requires --operation.');
  if (args.path === undefined || args.path === true) throw new Error('destructive-preflight requires --path.');

  const result = analyzeDestructiveAction({
    operation: args.operation,
    requestedTarget: args.path,
    currentWorkingDirectory: args.cwd || target,
    repositoryRoot: target,
    platform: args.platform || process.platform,
    recursive: booleanValue(args.recursive),
    force: booleanValue(args.force),
    source: args.source || 'structured_cli'
  }, {
    homeDirectory: args.home || options.homeDirectory || os.homedir(),
    now: options.now,
    inspectPath: options.inspectPath,
    symlinkPaths: options.symlinkPaths
  });

  if (args.out) {
    writeJsonSafe(target, args.out, result, { overwrite: true });
  }
  if (booleanValue(args.record)) {
    appendPreflightEvent(target, result);
  }
  printPreflight(result);
  return result;
}

module.exports = { booleanValue, destructivePreflightCommand, printPreflight };
