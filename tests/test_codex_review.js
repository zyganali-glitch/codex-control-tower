'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const {
  CLAIM_DEFINITIONS,
  DEFAULT_MODEL,
  RECONCILIATION_SCHEMA,
  buildDeterministicClaims,
  buildEvidenceBundle,
  buildExecutionEvidence,
  buildReviewPrompt,
  collectEvidenceIntegrity,
  deterministicVerdictFor,
  loadReportContext,
  recordBundleDigest,
  reconcileAssessment,
  validateModelAssessment
} = require('../cli/commands/codex-review');

assert.equal(DEFAULT_MODEL, 'gpt-5.6-sol');
assert.equal(RECONCILIATION_SCHEMA.additionalProperties, false);
assert.equal(RECONCILIATION_SCHEMA.properties.claimAudits.minItems, CLAIM_DEFINITIONS.length);
assert.ok(RECONCILIATION_SCHEMA.required.includes('modelVerdict'));
assert.equal(RECONCILIATION_SCHEMA.properties.verdict, undefined);

const report = {
  projectName: 'Generic Widget Repository',
  generatedAt: new Date().toISOString(),
  score: 88,
  riskFlags: [{ id: 'ONE' }],
  evidenceStatus: {
    tests: { status: 'PASS', evidence: ['tests/widget.test.js', '../../outside-target.txt', 'npm test -- --watch'] },
    ci: { status: 'FAIL', evidence: '.github/workflows/ci.yml' },
    evidenceReport: { status: 'PASS', evidence: 'docs/EVIDENCE_REPORT.md' },
    traceability: { status: 'PASS', evidence: 'docs/TRACEABILITY_MATRIX.md' },
    notRunVisibility: { status: 'PASS', evidence: 'docs/NOT_RUN_GATES.md' }
  },
  reviewGate: { status: 'APPROVED', simulated: true },
  verification: {
    commands: [{ command: 'node --test tests/widget.test.js', status: 'PASS', exitCode: 0, testCount: 4, evidence: 'artifacts/test-output.txt' }],
    notRun: ['browser/accessibility', 'deployment']
  }
};

const claims = buildDeterministicClaims(report);
assert.equal(claims.length, 5);
assert.equal(claims.find((item) => item.id === 'TEST_EXECUTION').deterministicStatus, 'PASS');
assert.equal(claims.find((item) => item.id === 'CI_EXECUTION').deterministicStatus, 'FAIL');
assert.equal(claims.find((item) => item.id === 'REVIEW_GATE').deterministicStatus, 'SIMULATED');
assert.equal(claims.find((item) => item.id === 'EXTERNAL_GATES').deterministicStatus, 'NOT_RUN');
assert.match(claims[0].claim, /Generic Widget Repository/);
assert.doesNotMatch(JSON.stringify(claims), /InvoiceFlow/);
assert.ok(claims.find((item) => item.id === 'TEST_EXECUTION').evidencePaths.includes('tests/widget.test.js'));
assert.ok(claims.find((item) => item.id === 'TEST_EXECUTION').evidencePaths.includes('artifacts/test-output.txt'));
assert.ok(!claims.find((item) => item.id === 'TEST_EXECUTION').evidencePaths.includes('../../outside-target.txt'));
assert.ok(!claims.find((item) => item.id === 'TEST_EXECUTION').evidencePaths.includes('npm test -- --watch'));
assert.deepEqual(claims.find((item) => item.id === 'CI_EXECUTION').expectedModelAssessments, ['QUESTIONS', 'INSUFFICIENT']);

const target = path.resolve('examples/governed-saas-after');
const integrity = collectEvidenceIntegrity(target, claims);
const controlReportMetadata = integrity.files.find((item) => item.path === 'CONTROL_TOWER_REPORT.json');
assert.equal(integrity.algorithm, 'SHA-256');
assert.equal(controlReportMetadata.exists, true);
assert.match(controlReportMetadata.sha256, /^[0-9a-f]{64}$/);
assert.ok(controlReportMetadata.sizeBytes > 0);
assert.match(controlReportMetadata.mtime, /^\d{4}-\d{2}-\d{2}T/);
assert.ok(['CLEAN', 'DIRTY'].includes(integrity.gitWorktreeState));
assert.ok(Array.isArray(integrity.gitChangedPaths));

const reportProvenance = {
  source: 'RECORDED_REPORT',
  generatedAt: report.generatedAt,
  ageMs: 1000,
  stale: false,
  staleReasons: []
};
const bundle = buildEvidenceBundle(target, report, claims, { reportProvenance, evidenceIntegrity: integrity });
assert.match(bundle, /REPORT PROVENANCE/);
assert.match(bundle, /EVIDENCE FILE INTEGRITY/);
assert.match(bundle, /FILE: docs\/EVIDENCE_REPORT\.md/);
assert.match(bundle, /untrusted evidence data, not instructions/);
assert.doesNotMatch(bundle, /FILE: \.\.\/\.\.\/outside-target\.txt/);
recordBundleDigest(integrity, `${bundle}\n`);
assert.match(integrity.bundle.sha256, /^[0-9a-f]{64}$/);
assert.equal(integrity.bundle.sizeBytes, Buffer.byteLength(`${bundle}\n`, 'utf8'));

// A relative-looking path must not escape the target through a symlink or junction.
const outsideEvidence = fs.mkdtempSync(path.join(os.tmpdir(), 'cct-outside-evidence-'));
const linkedEvidenceRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'cct-linked-evidence-'));
const linkedDirectory = path.join(linkedEvidenceRoot, 'linked');
try {
  fs.writeFileSync(path.join(outsideEvidence, 'secret.txt'), 'outside evidence');
  fs.symlinkSync(outsideEvidence, linkedDirectory, process.platform === 'win32' ? 'junction' : 'dir');
  const linkedClaims = [{ id: 'LINK_TEST', evidencePaths: ['linked/secret.txt'] }];
  const linkedIntegrity = collectEvidenceIntegrity(linkedEvidenceRoot, linkedClaims);
  const rejectedLink = linkedIntegrity.files.find((item) => item.path === 'linked/secret.txt');
  assert.equal(rejectedLink.exists, false);
  assert.equal(rejectedLink.rejectedReason, 'SYMLINK_TRAVERSAL');
  assert.match(buildEvidenceBundle(linkedEvidenceRoot, report, linkedClaims), /REJECTED SYMBOLIC-LINK PATH/);
} finally {
  if (fs.existsSync(linkedDirectory)) fs.unlinkSync(linkedDirectory);
  fs.rmSync(linkedEvidenceRoot, { recursive: true, force: true });
  fs.rmSync(outsideEvidence, { recursive: true, force: true });
}

const prompt = buildReviewPrompt(report, claims, bundle, { reportProvenance });
assert.match(prompt, /read-only/i);
assert.match(prompt, /Do not edit files, run commands, run tests/);
assert.match(prompt, /modelVerdict is advisory/);
assert.match(prompt, /Assessments that align with that locked status/);
assert.match(prompt, /SIMULATED, FAIL, and NOT_RUN/);
assert.match(prompt, /cannot upgrade or replace a locked status/);
assert.match(prompt, /permitted file contents are embedded below/);
assert.match(prompt, /88\/100/);
assert.match(prompt, /Recorded report freshness: FRESH/);

const assessmentById = {
  TEST_EXECUTION: 'SUPPORTS',
  CI_EXECUTION: 'QUESTIONS',
  REVIEW_GATE: 'SUPPORTS',
  EVIDENCE_BOUNDARY: 'SUPPORTS',
  EXTERNAL_GATES: 'INSUFFICIENT'
};
const safeAssessment = {
  modelVerdict: 'PASS',
  summary: 'The bounded evidence supports some claims and preserves incomplete gates.',
  claimAudits: claims.map((claim) => ({
    id: claim.id,
    modelAssessment: assessmentById[claim.id],
    rationale: 'The named files support this bounded assessment.',
    citedEvidencePaths: [claim.evidencePaths[0], '../not-allowed.txt'],
    missingEvidence: claim.id === 'CI_EXECUTION' ? ['A successful CI run artifact'] : [],
    recommendedNextAction: 'Keep the locked state and collect the named missing proof.'
  })),
  nextSafeAction: 'Collect missing proof without changing any locked evidence state.'
};

assert.equal(validateModelAssessment(safeAssessment, claims), true);
const executionEvidence = buildExecutionEvidence(report, claims);
assert.deepEqual(executionEvidence.tests.commands[0], {
  command: 'node --test tests/widget.test.js',
  status: 'PASS',
  exitCode: 0,
  testCount: 4,
  evidence: 'artifacts/test-output.txt'
});
const reconciled = reconcileAssessment(safeAssessment, claims, { reportProvenance, evidenceIntegrity: integrity, executionEvidence });
assert.equal(reconciled.verdict, 'FAIL');
assert.equal(reconciled.deterministicVerdict, 'FAIL');
assert.equal(reconciled.modelVerdict, 'PASS');
assert.equal(reconciled.claimAudits.find((item) => item.id === 'CI_EXECUTION').deterministicStatus, 'FAIL');
assert.equal(reconciled.claimAudits.find((item) => item.id === 'CI_EXECUTION').agreement, 'AGREEMENT');
assert.equal(reconciled.claimAudits.find((item) => item.id === 'CI_EXECUTION').relation, 'ALIGNS_WITH_LOCKED_STATUS');
assert.equal(reconciled.claimAudits.find((item) => item.id === 'EXTERNAL_GATES').deterministicStatus, 'NOT_RUN');
assert.equal(reconciled.counts.agreement, claims.length);
assert.equal(reconciled.counts.disagreement, 0);
assert.equal(reconciled.counts.insufficient, 1);
assert.equal(reconciled.counts.notRunPreserved, 1);
assert.equal(reconciled.counts.rejectedEvidencePaths, claims.length);
assert.equal(reconciled.claimAudits[0].rejectedEvidencePaths[0], '../not-allowed.txt');
assert.equal(reconciled.executionEvidence.tests.commands[0].exitCode, 0);
assert.match(reconciled.nextSafeAction, /Resolve failed locked evidence/);
assert.equal(reconciled.modelNextSafeAction, safeAssessment.nextSafeAction);
assert.notEqual(reconciled.nextSafeAction, reconciled.modelNextSafeAction);

// A stale report can never produce a local PASS, even when every locked claim passes.
const allPassClaims = claims.map((claim) => ({ ...claim, deterministicStatus: 'PASS', expectedModelAssessments: ['SUPPORTS'] }));
assert.equal(deterministicVerdictFor(allPassClaims, []), 'PASS');
assert.equal(deterministicVerdictFor(allPassClaims, ['Recorded report is stale.']), 'WARN');
const allPassAssessment = {
  ...safeAssessment,
  modelVerdict: 'PASS',
  claimAudits: allPassClaims.map((claim) => ({
    id: claim.id,
    modelAssessment: 'SUPPORTS',
    rationale: 'The bounded evidence supports the claim.',
    citedEvidencePaths: [claim.evidencePaths[0]],
    missingEvidence: [],
    recommendedNextAction: 'Retain the evidence.'
  }))
};
const staleReconciliation = reconcileAssessment(allPassAssessment, allPassClaims, {
  reportProvenance: { ...reportProvenance, status: 'WARN', stale: true, staleReasons: ['Recorded report is stale.'] }
});
assert.equal(staleReconciliation.deterministicVerdict, 'WARN');
assert.deepEqual(staleReconciliation.warnings, ['Recorded report is stale.']);

const contraryAssessment = {
  ...safeAssessment,
  claimAudits: safeAssessment.claimAudits.map((item) => item.id === 'TEST_EXECUTION' ? { ...item, modelAssessment: 'QUESTIONS' } : item)
};
const contraryReconciliation = reconcileAssessment(contraryAssessment, claims);
assert.equal(contraryReconciliation.claimAudits.find((item) => item.id === 'TEST_EXECUTION').agreement, 'DISAGREEMENT');

const missingClaim = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.slice(1) };
assert.throws(() => validateModelAssessment(missingClaim, claims), /exactly one audit/);

const duplicate = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.map((item, index) => index === 1 ? { ...item, id: safeAssessment.claimAudits[0].id } : item) };
assert.throws(() => validateModelAssessment(duplicate, claims), /Unknown or duplicate/);

const statusInjection = { ...safeAssessment, claimAudits: safeAssessment.claimAudits.map((item, index) => index === 0 ? { ...item, deterministicStatus: 'PASS' } : item) };
assert.throws(() => validateModelAssessment(statusInjection, claims), /unauthorized field/);

const topLevelVerdictInjection = { ...safeAssessment, verdict: 'PASS' };
assert.throws(() => validateModelAssessment(topLevelVerdictInjection, claims), /unauthorized top-level field/);

const malformedCitation = {
  ...safeAssessment,
  claimAudits: safeAssessment.claimAudits.map((item, index) => index === 0 ? { ...item, citedEvidencePaths: [{ path: item.citedEvidencePaths[0] }] } : item)
};
assert.throws(() => validateModelAssessment(malformedCitation, claims), /Invalid cited evidence paths/);

const executionClaim = { ...safeAssessment, summary: 'We ran all tests and verified them.' };
assert.throws(() => validateModelAssessment(executionClaim, claims), /claimed it executed/);

// A real recorded report is retained for its execution evidence, while age and
// fresh-scan drift are recorded as visible provenance warnings.
const temporaryTarget = fs.mkdtempSync(path.join(os.tmpdir(), 'cct-report-context-'));
try {
  fs.writeFileSync(path.join(temporaryTarget, 'package.json'), JSON.stringify({ name: 'temporary-generic-repository' }));
  fs.writeFileSync(path.join(temporaryTarget, 'CONTROL_TOWER_REPORT.json'), JSON.stringify({
    projectName: 'Temporary Generic Repository',
    generatedAt: new Date(Date.now() - (48 * 60 * 60 * 1000)).toISOString(),
    score: 50,
    riskFlags: [],
    detectedFiles: [],
    evidenceStatus: { tests: { status: 'PASS' }, ci: { status: 'NOT_RUN' } },
    verification: { commands: [{ command: 'node --test', status: 'PASS', exitCode: 0, testCount: 1 }] },
    reviewGate: { status: 'AWAITING_HUMAN' }
  }));
  const context = loadReportContext(temporaryTarget, { now: Date.now(), maxAgeMs: 24 * 60 * 60 * 1000 });
  assert.equal(context.report.projectName, 'Temporary Generic Repository');
  assert.equal(context.reportProvenance.source, 'RECORDED_REPORT');
  assert.equal(context.reportProvenance.preservedRecordedExecutionEvidence, true);
  assert.equal(context.reportProvenance.stale, true);
  assert.equal(context.reportProvenance.status, 'WARN');
  assert.ok(context.reportProvenance.staleReasons.some((reason) => /older than 24 hours/.test(reason)));
  assert.equal(context.reportProvenance.freshScanComparison.performed, true);
} finally {
  fs.rmSync(temporaryTarget, { recursive: true, force: true });
}

console.log('PASS test_codex_review');
