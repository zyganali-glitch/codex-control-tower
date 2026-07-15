import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';

import normalizeReport from './reportAdapter.js';

test('normalizes the simulated sample from recorded comparison and evidence data', () => {
  const raw = JSON.parse(fs.readFileSync(new URL('./sample-report.json', import.meta.url), 'utf8'));
  const report = normalizeReport(raw);

  assert.equal(report.health.score, 88);
  assert.equal(report.health.trend, raw.comparison.scoreDelta);
  assert.equal(report.comparison.before.score, raw.comparison.beforeScore);
  assert.equal(report.comparison.before.riskFlags, raw.comparison.beforeRisks);
  assert.equal(report.comparison.after.score, raw.comparison.afterScore);
  assert.equal(report.comparison.after.riskFlags, raw.comparison.afterRisks);
  assert.equal(report.comparison.before.governanceSurfaces, 1);
  assert.equal(report.comparison.before.evidenceCoverage, 0);
  assert.equal(report.comparison.after.evidenceCoverage, 88);
  assert.equal(report.reviewGate.approvedBy, 'SIMULATED_DEMO_REVIEWER');
  assert.equal(report.mistakeShield.score, null);
  assert.equal(report.sampleContext.fictional, true);
  assert.match(report.disclosure, /real deterministic scans of prepared fictional snapshots/i);
  assert.match(report.disclosure, /recorded blind GPT-5\.6 semantic audit/i);
});

test('does not synthesize a baseline, prompt, gate, shield, or recorder event', () => {
  const report = normalizeReport({ projectName: 'bare-project', score: 55, riskFlags: [] });

  assert.equal(report.health.trend, null);
  assert.equal(report.comparison, null);
  assert.equal(report.missionPrompt, null);
  assert.equal(report.reviewGate, null);
  assert.equal(report.mistakeShield, null);
  assert.deepEqual(report.flightRecorder, []);
});

test('keeps a pending gate unapproved and preserves unknown recorder status', () => {
  const report = normalizeReport({
    projectName: 'pending-project',
    score: 40,
    reviewGate: {
      status: 'AWAITING_HUMAN',
      scope: 'src/auth.js only',
      decidedBy: 'request-author',
      updatedAt: '2026-07-12T10:00:00.000Z',
    },
    flightRecorder: {
      events: [{ timestamp: '2026-07-12T10:00:00.000Z', event: 'MISSION_STARTED' }],
    },
  });

  assert.equal(report.reviewGate.scope, null);
  assert.equal(report.reviewGate.approvedBy, null);
  assert.equal(report.reviewGate.approvedAt, null);
  assert.equal(report.flightRecorder[0].status, 'UNKNOWN');
});

test('preserves semantic NOT_RUN, risk, and blocked recorder states without inventing PASS', () => {
  const report = normalizeReport({
    flightRecorder: {
      events: [
        { timestamp: '2026-07-12T10:00:00.000Z', type: 'NOT_RUN', simulated: true },
        { timestamp: '2026-07-12T10:01:00.000Z', type: 'RISK' },
        { timestamp: '2026-07-12T10:02:00.000Z', type: 'BLOCKED' },
      ],
    },
  });

  assert.deepEqual(report.flightRecorder.map((event) => event.status), ['NOT_RUN', 'WARN', 'BLOCKED']);
});

test('uses explicit raw comparison values and derives coverage independently from health', () => {
  const report = normalizeReport({
    projectName: 'comparison-project',
    score: 77,
    riskFlags: [{ id: 'ONE', issue: 'One risk' }],
    comparison: { beforeScore: 44, afterScore: 77, beforeRisks: 3, afterRisks: 1 },
    beforeSnapshot: {
      evidenceStatus: {
        tests: { status: 'PASS', evidence: 'test.log' },
        ci: { status: 'FAIL', evidence: null },
      },
    },
    evidenceStatus: {
      tests: { status: 'PASS', evidence: 'test.log' },
      ci: { status: 'FAIL', evidence: null },
    },
  });

  assert.equal(report.comparison.before.score, 44);
  assert.equal(report.comparison.before.riskFlags, 3);
  assert.equal(report.comparison.after.riskFlags, 1);
  assert.equal(report.comparison.before.evidenceCoverage, 50);
  assert.equal(report.comparison.after.evidenceCoverage, 50);
});

test('preserves locked local states beside blind GPT-5.6 model assessments', () => {
  const report = normalizeReport({
    projectName: 'reconciled-project',
    score: 70,
    codexLiveReview: {
      state: 'COMPLETE',
      mode: 'REAL_CODEX_BLIND_SEMANTIC_AUDIT',
      reconciliation: {
        claimAudits: [{
          id: 'EXTERNAL_GATES',
          deterministicStatus: 'NOT_RUN',
          modelAssessment: 'SUPPORTS',
          agreement: 'AGREEMENT',
        }],
      },
    },
  });

  assert.equal(report.codexLiveReview.reconciliation.claimAudits[0].deterministicStatus, 'NOT_RUN');
  assert.equal(report.codexLiveReview.reconciliation.claimAudits[0].modelAssessment, 'SUPPORTS');
  assert.equal(report.codexLiveReview.reconciliation.claimAudits[0].relation, 'AGREEMENT');
  assert.equal(report.codexLiveReview.reconciliation.localVerdict, 'NOT_RUN');
  assert.equal(report.codexLiveReview.reconciliation.humanReviewRequired, false);
});

test('preserves split verdicts, semantic relations, freshness, and integrity provenance', () => {
  const report = normalizeReport({
    projectName: 'provenance-project',
    score: 72,
    codexLiveReview: {
      state: 'COMPLETE',
      model: 'gpt-5.6-sol',
      mode: 'REAL_CODEX_BLIND_SEMANTIC_AUDIT',
      reconciliation: {
        verdict: 'FAIL',
        deterministicVerdict: 'FAIL',
        modelVerdict: 'WARN',
        summary: 'A local rule failed.',
        modelSummary: 'The model questioned one source.',
        claimAudits: [{
          id: 'CI_EXECUTION',
          deterministicStatus: 'PASS',
          modelAssessment: 'CONTRADICTS',
          agreement: 'DISAGREEMENT',
          relation: 'CONFLICTS_WITH_LOCKED_STATUS',
          counterEvidence: ['The named log records exit code 0.'],
          recommendedNextAction: 'Have a human inspect the CI log.',
        }],
        reportProvenance: {
          generatedAt: '2026-07-13T10:00:00.000Z',
          loadedAt: '2026-07-13T10:00:01.000Z',
          stale: false,
        },
        evidenceIntegrity: {
          algorithm: 'sha256',
          gitCommit: 'abc123',
          gitWorktreeState: 'DIRTY',
          gitChangedPaths: ['CONTROL_TOWER_REPORT.json'],
          files: [{ path: 'CONTROL_TOWER_REPORT.json', sha256: 'digest', sizeBytes: 42 }],
          bundle: { path: '.controltower/EVIDENCE_BUNDLE.md', sha256: 'bundle-digest', sizeBytes: 84 },
        },
      },
    },
  });

  const reconciliation = report.codexLiveReview.reconciliation;
  assert.equal(reconciliation.localVerdict, 'FAIL');
  assert.equal(reconciliation.modelVerdict, 'WARN');
  assert.equal(reconciliation.claimAudits[0].modelAssessment, 'CONTRADICTS');
  assert.equal(reconciliation.claimAudits[0].relation, 'CONFLICTS_WITH_LOCKED_STATUS');
  assert.equal(reconciliation.humanReviewRequired, true);
  assert.equal(reconciliation.reviewState, 'HUMAN_REVIEW_REQUIRED');
  assert.deepEqual(reconciliation.claimAudits[0].counterEvidence, ['The named log records exit code 0.']);
  assert.equal(reconciliation.claimAudits[0].recommendedNextAction, 'Have a human inspect the CI log.');
  assert.equal(reconciliation.reportProvenance.stale, false);
  assert.equal(reconciliation.evidenceIntegrity.bundle.sha256, 'bundle-digest');
  assert.equal(reconciliation.evidenceIntegrity.gitWorktreeState, 'DIRTY');
});
