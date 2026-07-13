'use strict';

const assert = require('node:assert/strict');
const { DEFAULT_MODEL, REVIEW_SCHEMA, buildReviewPrompt } = require('../cli/commands/codex-review');

assert.equal(DEFAULT_MODEL, 'gpt-5.6-sol');
assert.deepEqual(REVIEW_SCHEMA.properties.verdict.enum, ['PASS', 'WARN', 'FAIL']);
assert.equal(REVIEW_SCHEMA.additionalProperties, false);

const prompt = buildReviewPrompt({ score: 88, riskFlags: [{ id: 'ONE' }], reviewGate: { status: 'APPROVED' } });
assert.match(prompt, /read-only/i);
assert.match(prompt, /Do not search the repository/);
assert.match(prompt, /CONTROL_TOWER_REPORT.json/);
assert.match(prompt, /SIMULATED and NOT_RUN/);
assert.match(prompt, /88\/100/);
assert.match(prompt, /APPROVED/);
console.log('PASS test_codex_review');
