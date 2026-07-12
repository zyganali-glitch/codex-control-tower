'use strict';

const GOVERNANCE_PROFILES = ['light', 'solo', 'startup', 'enterprise', 'regulated'];
const GATE_STATES = ['AWAITING_HUMAN', 'APPROVED', 'REJECTED', 'BLOCKED'];
const EVIDENCE_STATES = ['PASS', 'WARN', 'FAIL', 'NOT_RUN', 'SIMULATED'];

const SURFACES = {
  codexInstructions: ['.codex/AGENTS.md', 'AGENTS.md'],
  config: ['.controltower/config.json'],
  reviewGate: ['.controltower/review-gate.json'],
  flightRecorder: ['.controltower/flight-recorder.jsonl'],
  roadmap: ['plans/master-roadmap.md'],
  evidence: ['docs/EVIDENCE_REPORT.md'],
  traceability: ['docs/TRACEABILITY_MATRIX.md'],
  notRun: ['docs/NOT_RUN_GATES.md'],
  techDebtDelta: ['docs/TECH_DEBT_DELTA.md'],
  memoryLens: ['docs/MEMORY_LENS.md'],
  mistakeShield: ['docs/MISTAKE_SHIELD.md'],
  brownfield: ['TECH_DEBT_AND_SECURITY.md'],
  readme: ['README.md'],
  architecture: ['docs/ARCHITECTURE.md'],
  phase0: ['.controltower/phase0.json']
};

const SCORE_MAX = {
  planning: 12,
  codexReadiness: 12,
  evidencePack: 16,
  testCiProof: 12,
  documentationSync: 8,
  brownfieldSafety: 8,
  memoryContinuity: 10,
  reviewGate: 8,
  contextGraph: 6,
  mistakeShield: 5,
  riskHygiene: 3
};

const SKIP_DIRECTORIES = new Set([
  '.git', 'node_modules', 'dist', 'build', 'coverage', 'tmp', 'evidence-pack', 'devpost-pack', 'demo-report', '.controltower-backups'
]);
const SKIP_FILES = new Set([
  '.controltower-generated.json', 'CONTROL_TOWER_REPORT.json', 'CONTEXT_GRAPH.json'
]);

module.exports = {
  EVIDENCE_STATES,
  GATE_STATES,
  GOVERNANCE_PROFILES,
  SCORE_MAX,
  SKIP_DIRECTORIES,
  SKIP_FILES,
  SURFACES
};
