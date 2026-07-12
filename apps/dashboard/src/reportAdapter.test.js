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
