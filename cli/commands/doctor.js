'use strict';

const { scanRepository } = require('../lib/repoScanner');

const PRIORITY = ['NO_CODEX_INSTRUCTIONS', 'NO_REVIEW_GATE', 'NO_EVIDENCE', 'NO_PLAN', 'NO_TRACEABILITY', 'NO_MISTAKE_SHIELD', 'NO_FLIGHT_RECORDER', 'WEAK_TESTS', 'NO_CI', 'STALE_README'];

async function doctorCommand(args) {
  const report = scanRepository(args.target || '.');
  const ordered = [...report.riskFlags].sort((a, b) => {
    const ai = PRIORITY.indexOf(a.id);
    const bi = PRIORITY.indexOf(b.id);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || a.id.localeCompare(b.id);
  });
  console.log(`Codex Control Tower Doctor — ${report.projectName}`);
  console.log(`Health: ${report.score}/100 (${report.codexReadiness})`);
  ordered.slice(0, 10).forEach((item, index) => console.log(`${index + 1}. [${item.severity}] ${item.issue}\n   Fix: ${item.recommendedFix}`));
  if (!ordered.length) console.log('No ranked governance gaps were detected. Review evidence before claiming completion.');
  return ordered;
}

module.exports = { doctorCommand };
