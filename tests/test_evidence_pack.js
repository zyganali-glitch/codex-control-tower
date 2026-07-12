'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createEvidencePack } = require('../cli/lib/evidenceCollector');
const { ROOT, freshTemp, readJson } = require('./helpers');

const out = freshTemp('evidence-pack');
const result = createEvidencePack(path.join(ROOT, 'examples', 'messy-saas-before'), out, { simulatedData: true });
const required = ['EVIDENCE_REPORT.md', 'TRACEABILITY_MATRIX.md', 'NOT_RUN_GATES.md', 'TECH_DEBT_DELTA.md', 'CODEX_MISSION_PROMPT.md', 'CONTROL_TOWER_REPORT.json', 'CONTEXT_GRAPH.json', 'REVIEW_GATE_STATUS.md', 'MEMORY_LENS_REPORT.md', 'MISTAKE_SHIELD_REPORT.md', 'FLIGHT_RECORDER_SUMMARY.md', 'DEVPOST_SUMMARY.md'];
for (const file of required) assert.ok(fs.existsSync(path.join(out, file)), `${file} missing`);
const report = readJson(path.join(out, 'CONTROL_TOWER_REPORT.json'));
assert.equal(report.simulatedData, true);
assert.match(fs.readFileSync(path.join(out, 'NOT_RUN_GATES.md'), 'utf8'), /NOT_RUN/);
assert.match(fs.readFileSync(path.join(out, 'EVIDENCE_REPORT.md'), 'utf8'), /SIMULATED/);
assert.equal(result.files.length, required.length);

const inTarget = freshTemp('evidence-self-scan');
fs.cpSync(path.join(ROOT, 'examples', 'messy-saas-before'), inTarget, { recursive: true });
const before = createEvidencePack(inTarget, path.join(inTarget, 'evidence-pack'), { simulatedData: true }).report;
const after = createEvidencePack(inTarget, path.join(inTarget, 'evidence-pack'), { simulatedData: true }).report;
assert.equal(after.score, before.score, 'evidence output must not change the target score on rerun');
assert.equal(after.riskFlags.length, before.riskFlags.length, 'evidence output must not create scanner risks');
assert.equal(after.contextGraph.nodes.length, before.contextGraph.nodes.length, 'evidence output must not enter its own context graph');
console.log('PASS test_evidence_pack');
