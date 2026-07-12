'use strict';

const path = require('node:path');
const { scanRepository } = require('./repoScanner');
const { ensureDirectory } = require('./safeFs');
const { bullets, table } = require('./markdown');
const { writeJson, writeMarkdown } = require('./reportWriter');

function modeLabel(report) {
  return report.simulatedData ? 'SIMULATED — controlled demo data' : 'REAL_LOCAL_SCAN — local files only';
}

function createEvidencePack(target, outDir, options = {}) {
  const report = options.report || scanRepository(target, options);
  const destination = path.resolve(outDir);
  ensureDirectory(destination);
  writeJson(path.join(destination, '.controltower-generated.json'), {
    product: 'Codex Control Tower',
    artifactType: 'evidence-pack',
    generatedAt: report.generatedAt,
    simulatedData: report.simulatedData
  });
  const created = [];
  const addMd = (name, content) => {
    created.push(writeMarkdown(path.join(destination, name), content));
  };

  const evidenceRows = Object.entries(report.evidenceStatus)
    .filter(([, value]) => value && typeof value === 'object')
    .map(([check, value]) => [check, value.status, Array.isArray(value.evidence) ? value.evidence.join(', ') : value.evidence || 'No evidence']);
  addMd('EVIDENCE_REPORT.md', [
    '# Codex Control Tower Evidence Report',
    '',
    `Generated: ${report.generatedAt}`,
    '',
    `Data boundary: **${modeLabel(report)}**`,
    '',
    'A PASS below means a concrete repository artifact was detected. Test and CI execution remain NOT_RUN unless this pack was given external command evidence.',
    '',
    table(['Check', 'Status', 'Evidence'], evidenceRows),
    '',
    '## Remaining risks',
    '',
    bullets(report.riskFlags.map((flag) => `[${flag.severity}] ${flag.issue}`))
  ].join('\n'));

  addMd('TRACEABILITY_MATRIX.md', [
    '# Traceability Matrix', '',
    `Generated: ${report.generatedAt}`, '',
    `Data boundary: **${modeLabel(report)}**`, '',
    table(['Requirement', 'Implementation', 'Evidence', 'Status'], report.traceabilityMatrix.map((row) => [row.requirement, row.implementation, row.evidence, row.status]))
  ].join('\n'));

  addMd('NOT_RUN_GATES.md', [
    '# NOT_RUN Gates', '',
    `Generated: ${report.generatedAt}`, '',
    '- **NOT_RUN** — target repository test command was not executed by `cct evidence`.',
    '- **NOT_RUN** — CI workflow was not executed by the local scanner.',
    '- **NOT_RUN** — deployment, browser, performance, accessibility, and security penetration checks.',
    '- **NOT_RUN** — API-backed or identity-backed approval verification.',
    '',
    'These checks remain visible by design. Presence of a test or CI file is not execution evidence.'
  ].join('\n'));

  addMd('TECH_DEBT_DELTA.md', [
    '# Technical Debt Delta', '',
    `Generated: ${report.generatedAt}`, '',
    '**WARN** — this scan reports current risks; it does not infer a historical before/after delta without two evidence-backed snapshots.', '',
    bullets(report.riskFlags.map((flag) => `${flag.id}: ${flag.issue} — ${flag.recommendedFix}`))
  ].join('\n'));

  addMd('CODEX_MISSION_PROMPT.md', report.codexPrompt);
  const reportPath = writeJson(path.join(destination, 'CONTROL_TOWER_REPORT.json'), report);
  created.push(reportPath);
  const graphPath = writeJson(path.join(destination, 'CONTEXT_GRAPH.json'), report.contextGraph);
  created.push(graphPath);
  addMd('REVIEW_GATE_STATUS.md', [
    '# Review Gate Status', '',
    `Generated: ${report.generatedAt}`, '',
    `Status: **${report.reviewGate.status}**`, '',
    `Note: ${report.reviewGate.note || 'No note.'}`, '',
    'Boundary: this is a local file-based approval artifact, not enterprise identity verification.'
  ].join('\n'));

  addMd('MEMORY_LENS_REPORT.md', [
    '# Memory Lens Report', '',
    `Generated: ${report.generatedAt}`, '',
    `Sources found: ${report.memoryLens.metrics.sourcesFound}`, '',
    `Continuity coverage: ${report.memoryLens.metrics.continuityCoverage}%`, '',
    '## Never-forget risks', '',
    bullets(report.memoryLens.neverForgetRisks), '',
    '## Missing memory sources', '',
    bullets(report.memoryLens.missingSources)
  ].join('\n'));

  addMd('MISTAKE_SHIELD_REPORT.md', [
    '# Mistake Shield Report', '',
    `Generated: ${report.generatedAt}`, '',
    `Verdict: **${report.mistakeShield.verdict}**`, '',
    `Proposed action: ${report.mistakeShield.proposedAction || 'No explicit action supplied.'}`, '',
    '## Reasons', '', bullets(report.mistakeShield.reasons), '',
    `Next safe action: ${report.mistakeShield.saferNextAction}`
  ].join('\n'));

  const events = report.flightRecorder.events || [];
  addMd('FLIGHT_RECORDER_SUMMARY.md', [
    '# Flight Recorder Summary', '',
    `Generated: ${report.generatedAt}`, '',
    events.length ? table(['Timestamp', 'Type', 'Message', 'Source'], events.map((event) => [event.timestamp, event.type, event.message, event.source])) : '**WARN** — no flight recorder events were found.'
  ].join('\n'));

  addMd('DEVPOST_SUMMARY.md', [
    '# Devpost Evidence Summary', '',
    `Generated: ${report.generatedAt}`, '',
    `Project: ${report.projectName}`, '',
    `Governance health: **${report.score}/100**`, '',
    `Data boundary: **${modeLabel(report)}**`, '',
    `Risks detected: ${report.riskFlags.length}`, '',
    'Codex Control Tower scanned local files, produced a Context Trace and mission prompt, and exported an honest evidence boundary. It did not run target tests, deploy, upload source, or call an AI API.'
  ].join('\n'));

  return { outDir: destination, files: created.sort(), report };
}

module.exports = { createEvidencePack };
