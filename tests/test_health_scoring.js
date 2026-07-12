'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { scoreHealth } = require('../cli/lib/healthScorer');
const { scanRepository } = require('../cli/lib/repoScanner');
const { ROOT, freshTemp } = require('./helpers');

const before = scanRepository(path.join(ROOT, 'examples', 'messy-saas-before'), { simulatedData: true });
const after = scanRepository(path.join(ROOT, 'examples', 'governed-saas-after'), { simulatedData: true });
assert.ok(before.score >= 25 && before.score <= 45, `messy score was ${before.score}`);
assert.ok(after.score >= 75 && after.score <= 90, `governed score was ${after.score}`);
assert.ok(after.score > before.score);
assert.ok(after.riskFlags.length < before.riskFlags.length, `${after.riskFlags.length} should be below ${before.riskFlags.length}`);
assert.ok(before.riskFlags.some((flag) => flag.id === 'RISKY_AUTH'));
assert.ok(before.riskFlags.some((flag) => flag.id === 'RISKY_PAYMENT'));
assert.equal(before.simulatedData, true);
assert.equal(after.simulatedData, true);
assert.equal(before.scoreBreakdown.mistakeShield, 0, 'a generated preflight result must not replace a durable Mistake Shield record');
assert.equal(after.scoreBreakdown.mistakeShield, 5, 'a healthy shield integrated with memory and a scoped gate earns full credit');
assert.ok(
  scoreHealth({ ...before.facts, contextNodeCount: 1 }).scoreBreakdown.contextGraph < before.scoreBreakdown.contextGraph,
  'one discovered file must not earn full Context Graph credit'
);
assert.equal(after.score, Object.values(after.scoreBreakdown).reduce((sum, value) => sum + value, 0), 'the score must equal its visible breakdown');

const completeSimulatedFacts = {
  ...after.facts,
  hasCi: true,
  ciHealthy: true,
  todoCount: 0,
  criticalRiskCount: 0,
  highRiskCount: 0
};
const completeSimulated = scoreHealth(completeSimulatedFacts);
assert.ok(completeSimulated.score > 88, 'simulated scans must not be forced under an opaque 88-point cap');
assert.deepEqual(
  scoreHealth({ ...completeSimulatedFacts, projectName: 'renamed-project', targetPath: 'some/other/path' }),
  completeSimulated,
  'project names and target paths must not affect health scoring'
);

const hollow = freshTemp('hollow-governance');
for (const relative of ['.codex/AGENTS.md', '.controltower/config.json', '.controltower/review-gate.json', '.controltower/flight-recorder.jsonl', 'plans/master-roadmap.md', 'docs/EVIDENCE_REPORT.md', 'docs/TRACEABILITY_MATRIX.md', 'docs/NOT_RUN_GATES.md', 'docs/TECH_DEBT_DELTA.md', 'docs/MEMORY_LENS.md', 'docs/MISTAKE_SHIELD.md', 'docs/ARCHITECTURE.md', 'TECH_DEBT_AND_SECURITY.md', 'README.md', 'tests/empty.test.js', '.github/workflows/ci.yml']) {
  const file = path.join(hollow, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, '', 'utf8');
}
fs.writeFileSync(path.join(hollow, 'package.json'), JSON.stringify({ name: 'hollow', scripts: { test: 'node tests/empty.test.js' } }), 'utf8');
fs.writeFileSync(path.join(hollow, '.controltower/review-gate.json'), JSON.stringify({ status: 'APPROVED' }), 'utf8');
const hollowReport = scanRepository(hollow, { simulatedData: false });
assert.ok(hollowReport.score < 50, `empty governance must not score as ready: ${hollowReport.score}`);
assert.ok(hollowReport.riskFlags.some((flag) => flag.id === 'UNSCOPED_APPROVAL'));
assert.notEqual(hollowReport.codexReadiness, 'PASS');

const stable = freshTemp('stable-report-scan');
fs.cpSync(path.join(ROOT, 'examples', 'governed-saas-after'), stable, { recursive: true });
const stableFirst = scanRepository(stable, { simulatedData: true });
fs.writeFileSync(path.join(stable, 'arbitrary-report.json'), JSON.stringify(stableFirst, null, 2), 'utf8');
const stableSecond = scanRepository(stable, { simulatedData: true });
assert.equal(stableSecond.score, stableFirst.score);
assert.equal(stableSecond.riskFlags.length, stableFirst.riskFlags.length);
assert.equal(stableSecond.contextGraph.nodes.length, stableFirst.contextGraph.nodes.length);

const rootReport = scanRepository(ROOT);
assert.equal(rootReport.scanMode, 'REAL_LOCAL_SCAN', 'root scan must not inherit the simulated demo label');
assert.equal(rootReport.simulatedData, false);
assert.deepEqual(rootReport.scanScope.excludedPaths, [
  'examples/demo-report',
  'examples/demo-workspace',
  'examples/governed-saas-after',
  'examples/messy-saas-before'
], 'configured exclusions must be explicit in the report');
assert.ok(!rootReport.riskFlags.some((flag) => flag.id === 'RISKY_AUTH' || flag.id === 'RISKY_PAYMENT'), 'fixture risks must not leak into the root scan');
assert.ok(!rootReport.riskFlags.some((flag) => flag.id === 'STALE_README'), 'README discussion of stale-doc detection must not mark the root README stale');
assert.ok(!rootReport.riskFlags.some((flag) => flag.id === 'LARGE_FILES'), 'generated lockfiles must not be treated as source-code monoliths');
assert.ok(!rootReport.detectedFiles.some((file) => file.path.startsWith('examples/')), 'configured demo fixtures must be excluded from the root scan');
assert.ok(rootReport.score >= 75, `dogfooded root score should be governed: ${rootReport.score}`);
assert.match(rootReport.codexPrompt, /Review gate scope: Complete bounded release-preflight hardening/, 'mission prompt must preserve the explicitly approved publication scope');
assert.match(rootReport.codexPrompt, /unless the APPROVED scoped Review Gate explicitly authorizes the exact action and destination/, 'publication rule must defer to exact scoped authorization without lexical guessing');
assert.match(before.codexPrompt, /Review gate scope: No approved scope recorded\./, 'unapproved missions must expose the missing scope');

const nullConfig = freshTemp('null-control-config');
fs.mkdirSync(path.join(nullConfig, '.controltower'), { recursive: true });
fs.writeFileSync(path.join(nullConfig, '.controltower', 'config.json'), 'null\n', 'utf8');
fs.writeFileSync(path.join(nullConfig, 'package.json'), 'null\n', 'utf8');
fs.writeFileSync(path.join(nullConfig, 'README.md'), '# Minimal repository\n', 'utf8');
assert.equal(scanRepository(nullConfig).scanMode, 'REAL_LOCAL_SCAN', 'valid JSON null must degrade safely instead of crashing');
console.log(`PASS test_health_scoring (${before.score} -> ${after.score})`);
