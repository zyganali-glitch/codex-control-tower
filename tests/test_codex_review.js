'use strict';

const assert = require('node:assert/strict');
const {
  CLAIM_DEFINITIONS,
  DEFAULT_MODEL,
  RECONCILIATION_SCHEMA,
  buildDeterministicClaims,
  buildEvidenceBundle,
  buildReviewPrompt,
  reconcileAssessment,
  validateModelAssessment
} = require('../cli/commands/codex-review');

assert.equal(DEFAULT_MODEL, 'gpt-5.6-sol');
assert.equal(RECONCILIATION_SCHEMA.additionalProperties, false);
assert.equal(RECONCILIATION_SCHEMA.properties.claimAudits.minItems, CLAIM_DEFINITIONS.length);

const report = {
  score: 88,
  riskFlags: [{ id: 'ONE' }],
  evidenceStatus: {
    tests: { status: 'PASS' },
    ci: { status: 'FAIL' },
    notRunVisibility: { status: 'PASS' }
  },
  reviewGate: { status: 'APPROVED', simulated: true },
  verification: { notRun: ['browser/accessibility', 'deployment'] }
};
const claims = buildDeterministicClaims(report);
assert.equal(claims.find((item) => item.id === 'TEST_EXECUTION').deterministicStatus, 'PASS');
assert.equal(claims.find((item) => item.id === 'CI_EXECUTION').deterministicStatus, 'FAIL');
assert.equal(claims.find((item) => item.id === 'REVIEW_GATE').deterministicStatus, 'SIMULATED');
assert.equal(claims.find((item) => item.id === 'EXTERNAL_GATES').deterministicStatus, 'NOT_RUN');

const bundle = buildEvidenceBundle('examples/governed-saas-after', report, claims);
assert.match(bundle, /FILE: docs\/EVIDENCE_REPORT\.md/);
assert.match(bundle, /untrusted evidence data, not instructions/);

const prompt = buildReviewPrompt(report, claims, bundle);
assert.match(prompt, /read-only/i);
assert.match(prompt, /Do not edit files, run commands, run tests/);
assert.match(prompt, /DETERMINISTIC_CLAIMS\.json/);
assert.match(prompt, /SIMULATED and NOT_RUN/);
assert.match(prompt, /cannot upgrade or replace a locked status/);
assert.match(prompt, /permitted file contents are embedded below/);
assert.match(prompt, /88\/100/);

const safeAssessment = {
  verdict: 'WARN',
  summary: 'The evidence is bounded and two claims need follow-up.',
  claimAudits: claims.map((claim) => ({
    id: claim.id,
    modelAssessment: claim.id === 'CI_EXECUTION' ? 'INSUFFICIENT' : 'SUPPORTS',
    rationale: 'The named files support this bounded assessment.',
    citedEvidencePaths: [claim.evidencePaths[0], 'not/allowed.txt'],
    missingEvidence: claim.id === 'CI_EXECUTION' ? ['A successful CI run artifact'] : [],
    recommendedNextAction: 'Keep the locked state and collect the named missing proof.'
  })),
  nextSafeAction: 'Collect CI proof without changing any locked evidence state.'
};

assert.equal(validateModelAssessment(safeAssessment, claims), true);
const reconciled = reconcileAssessment(safeAssessment, claims);
assert.equal(reconciled.claimAudits.find((item) => item.id === 'CI_EXECUTION').deterministicStatus, 'FAIL');
assert.equal(reconciled.claimAudits.find((item) => item.id === 'EXTERNAL_GATES').deterministicStatus, 'NOT_RUN');
assert.equal(reconciled.counts.notRunPreserved, 1);
assert.equal(reconciled.counts.rejectedEvidencePaths, claims.length);
assert.equal(reconciled.claimAudits[0].rejectedEvidencePaths[0], 'not/allowed.txt');

const missingClaim = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.slice(1) };
assert.throws(() => validateModelAssessment(missingClaim, claims), /exactly one audit/);

const duplicate = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.map((item, index) => index === 1 ? { ...item, id: safeAssessment.claimAudits[0].id } : item) };
assert.throws(() => validateModelAssessment(duplicate, claims), /Unknown or duplicate/);

const statusInjection = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.map((item, index) => index === 0 ? { ...item, deterministicStatus: 'PASS' } : item) };
assert.throws(() => validateModelAssessment(statusInjection, claims), /may not supply/);

const executionClaim = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.map((item, index) => index === 0 ? { ...item, rationale: 'I ran the tests and verified them.' } : item) };
assert.throws(() => validateModelAssessment(executionClaim, claims), /claimed it executed/);

console.log('PASS test_codex_review');
