'use strict';

const { SCORE_MAX } = require('./constants');

function clamp(value, max) {
  return Math.max(0, Math.min(max, Math.round(value)));
}

function scoreContextGraph(facts) {
  const nodeCount = Number.isFinite(facts.contextNodeCount) ? facts.contextNodeCount : 0;
  return clamp(
    (nodeCount > 0 ? 1 : 0)
      + (nodeCount >= 5 ? 1 : 0)
      + (nodeCount >= 10 ? 1 : 0)
      + (facts.hasPackage ? 1 : 0)
      + (facts.hasTests ? 1 : 0)
      + (facts.hasReadme ? 1 : 0),
    SCORE_MAX.contextGraph
  );
}

function scoreMistakeShield(facts) {
  if (!facts.hasMistakeShield) return 0;
  return clamp(
    1
      + (facts.mistakeShieldHealthy ? 2 : 0)
      + (facts.mistakeShieldHealthy && facts.memoryLensHealthy ? 1 : 0)
      + (facts.mistakeShieldHealthy && facts.reviewGateStatus === 'APPROVED' && facts.reviewGateScoped ? 1 : 0),
    SCORE_MAX.mistakeShield
  );
}

function scoreHealth(facts) {
  const breakdown = {};
  breakdown.planning = clamp(facts.roadmapHealthy ? 12 : facts.hasRoadmap || facts.hasAnyPlan ? 6 : 3, SCORE_MAX.planning);
  breakdown.codexReadiness = clamp(
    facts.codexInstructionsHealthy && facts.configHealthy ? 12
      : facts.codexInstructionsHealthy ? 8
        : facts.configHealthy ? 6
          : facts.hasCodexInstructions || facts.hasConfig ? 4 : 3,
    SCORE_MAX.codexReadiness
  );
  // Simulated evidence remains useful demo proof, but it is not equivalent to
  // evidence captured from a real project run. The distinction is reflected in
  // this category instead of imposing an opaque ceiling on the final score.
  const evidencePointsPerSurface = facts.simulatedData ? 2.5 : 4;
  breakdown.evidencePack = clamp(facts.evidenceSurfaceCount * evidencePointsPerSurface, SCORE_MAX.evidencePack);

  let testCi = 0;
  if (facts.hasTests) testCi += facts.testsHealthy ? 6 : facts.testSurfaceMeaningful ? 3 : 2;
  if (facts.hasTestScript) testCi += 2;
  if (facts.ciHealthy) testCi += 4;
  else if (facts.hasCi) testCi += 1;
  breakdown.testCiProof = clamp(testCi, SCORE_MAX.testCiProof);

  breakdown.documentationSync = clamp(
    (facts.hasReadme ? (facts.readmeHealthy ? 4 : 2) : 0) + (facts.architectureHealthy ? 4 : facts.hasArchitecture ? 2 : 0),
    SCORE_MAX.documentationSync
  );
  breakdown.brownfieldSafety = clamp(facts.brownfieldHealthy ? 8 : facts.hasBrownfield ? 4 : facts.hasPackage ? 2 : 0, SCORE_MAX.brownfieldSafety);
  breakdown.memoryContinuity = clamp(
    (facts.memoryLensHealthy ? 4 : facts.hasMemoryLens ? 2 : 0)
      + (facts.flightRecorderHealthy ? 3 : facts.hasFlightRecorder ? 1 : 0)
      + (facts.phase0Healthy ? 3 : facts.hasPhase0 ? 1 : 0),
    SCORE_MAX.memoryContinuity
  );
  breakdown.reviewGate = clamp(
    facts.reviewGateStatus === 'APPROVED' && facts.reviewGateScoped ? (facts.simulatedData ? 7 : 8)
      : facts.reviewGateStatus === 'APPROVED' && facts.reviewGateDecisionRecorded ? 5
        : facts.reviewGateExists && facts.reviewGateStatus === 'AWAITING_HUMAN' ? 3
          : facts.reviewGateExists ? 1 : 0,
    SCORE_MAX.reviewGate
  );
  breakdown.contextGraph = scoreContextGraph(facts);
  breakdown.mistakeShield = scoreMistakeShield(facts);
  breakdown.riskHygiene = clamp(
    (facts.todoCount === 0 ? 1 : 0) + (facts.criticalRiskCount === 0 ? 1 : 0) + (facts.highRiskCount === 0 ? 1 : 0),
    SCORE_MAX.riskHygiene
  );

  const score = Object.values(breakdown).reduce((sum, value) => sum + value, 0);
  return { score: clamp(score, 100), scoreBreakdown: breakdown };
}

function readiness(score) {
  if (score >= 80) return 'PASS';
  if (score >= 50) return 'WARN';
  return 'FAIL';
}

module.exports = { readiness, scoreHealth };
