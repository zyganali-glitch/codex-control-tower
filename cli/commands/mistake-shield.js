'use strict';

const { scanRepository } = require('../lib/repoScanner');
const { evaluateMistakeShield } = require('../lib/mistakeShield');
const { appendPreflightEvent } = require('../lib/flightRecorder');
const { resolveTarget } = require('../lib/safeFs');
const { booleanValue, verifyGitRepositoryRoot } = require('./destructive-preflight');

async function mistakeShieldCommand(args) {
  const target = resolveTarget(args.target || '.');
  const action = args.action || (args.operation ? `${args.operation} ${args.path || ''}`.trim() : '');
  const report = scanRepository(target, { action });
  const result = evaluateMistakeShield(target, action, {
    reviewGate: report.reviewGate,
    memoryLens: report.memoryLens,
    riskFlags: report.riskFlags,
    currentWorkingDirectory: args.cwd || process.cwd(),
    platform: args.platform || process.platform,
    repositoryRootVerified: verifyGitRepositoryRoot(target),
    preflightInput: args.operation ? {
      operation: args.operation,
      requestedTarget: args.path || '',
      currentWorkingDirectory: args.cwd || process.cwd(),
      repositoryRoot: target,
      platform: args.platform || process.platform,
      recursive: booleanValue(args.recursive),
      force: booleanValue(args.force),
      source: 'mistake_shield_structured'
    } : null
  });
  if (result.destructivePreflight && booleanValue(args.record)) {
    appendPreflightEvent(target, result.destructivePreflight, 'cct-mistake-shield');
  }
  console.log(`Mistake Shield: ${result.verdict}`);
  result.reasons.forEach((reason) => console.log(`- ${reason}`));
  console.log(`Next safe action: ${result.saferNextAction}`);
  return result;
}

module.exports = { mistakeShieldCommand };
