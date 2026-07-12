'use strict';

const { scanRepository } = require('../lib/repoScanner');
const { evaluateMistakeShield } = require('../lib/mistakeShield');
const { resolveTarget } = require('../lib/safeFs');

async function mistakeShieldCommand(args) {
  const target = resolveTarget(args.target || '.');
  const action = args.action || '';
  const report = scanRepository(target, { action });
  const result = evaluateMistakeShield(target, action, {
    reviewGate: report.reviewGate,
    memoryLens: report.memoryLens,
    riskFlags: report.riskFlags
  });
  console.log(`Mistake Shield: ${result.verdict}`);
  result.reasons.forEach((reason) => console.log(`- ${reason}`));
  console.log(`Next safe action: ${result.saferNextAction}`);
  return result;
}

module.exports = { mistakeShieldCommand };
