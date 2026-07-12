'use strict';

const { scanRepository } = require('../lib/repoScanner');

async function healthCommand(args) {
  const report = scanRepository(args.target || '.');
  const missingEvidence = ['evidenceReport', 'traceability', 'notRunVisibility'].filter((key) => report.evidenceStatus[key]?.status !== 'PASS').length;
  const docs = report.evidenceStatus.documentation;
  console.log(`Governance Health: ${report.score}/100`);
  console.log(`Codex Readiness: ${report.codexReadiness}`);
  console.log(`Evidence: ${missingEvidence ? 'WARN' : 'PASS'} — ${missingEvidence} missing or incomplete evidence surface(s)`);
  console.log(`Docs Sync: ${docs.status} — ${docs.status === 'PASS' ? 'README and architecture detected' : 'documentation surface incomplete'}`);
  console.log(`Review Gate: ${report.reviewGate.status}`);
  console.log(`Mistake Shield: ${report.mistakeShield.verdict}`);
  console.log(`Next Action: ${report.suggestedNextActions[0] || 'Preserve evidence and review the next mission.'}`);
  if (args.strict && report.score < 80) process.exitCode = 1;
  return report;
}

module.exports = { healthCommand };
