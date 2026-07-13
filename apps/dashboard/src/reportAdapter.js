import normalizeCodexLiveReview from './reconciliationAdapter.js';

const evidenceStates = ['PASS', 'WARN', 'FAIL', 'NOT_RUN', 'SIMULATED'];

const asArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value == null || value === '') return [];
  return [String(value)];
};

const hasValue = (value) => value !== undefined && value !== null && value !== '';

const numberOrNull = (value) => {
  if (!hasValue(value)) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const statusOrUnknown = (value) => hasValue(value) ? String(value).toUpperCase() : 'UNKNOWN';

const titleCase = (value = '') => String(value)
  .replace(/([a-z])([A-Z])/g, '$1 $2')
  .replaceAll('_', ' ')
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const scoreForStatus = (status) => ({
  PASS: 100, APPROVED: 100, CLEAR: 100, READY: 100,
  WARN: 65, CAUTION: 65, NOT_RUN: 35, SIMULATED: 70,
  FAIL: 0, MISSING: 0, BLOCKED: 0, REJECTED: 0,
}[String(status || '').toUpperCase()] ?? null);

function averageStatuses(surfaces, keys) {
  const values = keys.map((key) => scoreForStatus(surfaces?.[key])).filter((value) => value != null);
  if (!values.length) return null;
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function evidenceCoverage(evidenceStatus) {
  const checks = Object.values(evidenceStatus || {}).filter((item) => item && typeof item === 'object' && hasValue(item.status));
  if (!checks.length) return null;
  return Math.round((checks.filter((item) => String(item.status).toUpperCase() === 'PASS').length / checks.length) * 100);
}

function normalizeEvidence(raw) {
  const checks = (raw.checks || []).map((check, index) => ({
    id: `EV-${String(index + 1).padStart(3, '0')}`,
    name: check.name || `Check ${index + 1}`,
    status: statusOrUnknown(check.status),
    evidence: check.result || check.reason || 'No evidence detail recorded',
    source: check.command || 'Source not recorded',
  }));

  Object.entries(raw.evidenceStatus || {}).forEach(([key, item]) => {
    if (!item || typeof item !== 'object') return;
    checks.push({
      id: `EV-${String(checks.length + 1).padStart(3, '0')}`,
      name: titleCase(key),
      status: statusOrUnknown(item.status),
      evidence: asArray(item.evidence).join(' · ') || 'No executable evidence attached',
      source: 'evidenceStatus',
    });
  });

  asArray(raw.verification?.notRun).forEach((item) => {
    checks.push({
      id: `EV-${String(checks.length + 1).padStart(3, '0')}`,
      name: String(item),
      status: 'NOT_RUN',
      evidence: 'No execution evidence was recorded for this check.',
      source: 'verification.notRun',
    });
  });

  if (raw.simulatedDemoData || raw.simulatedData || raw.scanMode === 'SIMULATED') {
    checks.push({ id: `EV-${String(checks.length + 1).padStart(3, '0')}`, name: 'Demo provenance', status: 'SIMULATED', evidence: 'InvoiceFlow Mini is a fictional local fixture', source: 'report metadata' });
  }

  const summary = Object.fromEntries(evidenceStates.map((state) => [state, checks.filter((check) => check.status === state).length]));
  return { summary, checks };
}

function normalizeContext(raw) {
  const graph = raw.contextGraph || {};
  const graphNodes = (graph.nodes || []).slice(0, 16);
  const traceNodes = graph.contextTrace?.length ? graph.contextTrace : graphNodes;
  const nodes = graphNodes.map((node, index) => {
    const angle = (-Math.PI / 2) + ((Math.PI * 2 * index) / Math.max(graphNodes.length, 1));
    const type = ({ 'risk-area': 'source', 'review-gate': 'gate', instruction: 'memory', plan: 'mission', documentation: 'evidence', readme: 'evidence', control: 'gate', ci: 'test', file: 'source' })[node.type] || node.type;
    const risk = typeof node.risk === 'string'
      ? node.risk
      : node.risk === true || node.type === 'risk-area' ? 'high' : node.risk === false ? 'low' : null;
    return {
      ...node,
      label: (node.label || node.path || node.id).split(/[\\/]/).pop(),
      type,
      risk,
      x: Math.round(50 + Math.cos(angle) * 33),
      y: Math.round(50 + Math.sin(angle) * 31),
    };
  });
  const metricScore = (value, labels = {}) => {
    if (!hasValue(value)) return null;
    const mapped = labels[String(value).toLowerCase()];
    if (mapped != null) return mapped;
    const number = numberOrNull(value);
    if (number == null) return null;
    return number <= 1 ? Math.round(number * 100) : number;
  };
  const selected = traceNodes.slice(0, 12).filter((node) => hasValue(node.label || node.path || node.id)).map((node, index) => {
    const path = node.label || node.path || node.id;
    const tokens = numberOrNull(node.tokens) ?? (numberOrNull(node.bytes) != null ? Math.ceil(Math.min(Number(node.bytes), 16000) / 4) : null);
    return {
      id: `CTX-${String(index + 1).padStart(2, '0')}`,
      label: path.split(/[\\/]/).pop(),
      kind: node.type,
      path,
      reason: node.reason || 'Selection reason not recorded.',
      relevance: metricScore(node.relevance),
      freshness: metricScore(node.freshness, { fresh: 100, aging: 65, mixed: 60, stale: 25 }),
      importance: metricScore(node.importance, { high: 100, medium: 72, low: 45 }),
      protected: Boolean(node.protected),
      tokens,
    };
  });
  const estimatedTokens = selected.map((item) => item.tokens).filter((value) => value != null);
  const explicitUsed = numberOrNull(graph.contextBudget?.estimatedTokens ?? graph.contextBudget?.used);
  const used = explicitUsed ?? (estimatedTokens.length ? estimatedTokens.reduce((sum, value) => sum + value, 0) : null);
  const nodeIds = new Set(graphNodes.map((node) => node.id));
  const edges = (graph.edges || []).filter((edge) => nodeIds.has(edge.from) && nodeIds.has(edge.to)).map((edge) => ({ from: edge.from, to: edge.to, label: edge.relation || edge.label }));
  return {
    budget: { used, limit: numberOrNull(graph.contextBudget?.limit), maxItems: numberOrNull(graph.contextBudget?.maxItems), unit: graph.contextBudget?.unit || 'estimated tokens', selected: numberOrNull(graph.contextBudget?.selectedItems) ?? selected.length, candidates: numberOrNull(graph.contextBudget?.availableItems ?? graph.stats?.nodeCount ?? graph.nodeCount) ?? graphNodes.length },
    selectionPolicy: graph.algorithm || 'Selection policy not recorded.',
    selected,
    nodes,
    edges,
  };
}

function normalizeScoreBreakdown(raw) {
  if (Array.isArray(raw.scoreBreakdown)) return raw.scoreBreakdown;
  const value = raw.scoreBreakdown || {};
  const percent = (keys, maximum) => Math.round((keys.reduce((sum, key) => sum + Number(value[key] || 0), 0) / maximum) * 100);
  if (Object.keys(value).length) return [
    { label: 'Planning', score: percent(['planning', 'codexReadiness'], 24), weight: 15, detail: 'Roadmap and Codex readiness points' },
    { label: 'Evidence', score: percent(['evidencePack'], 16), weight: 25, detail: 'Evidence-pack surface points' },
    { label: 'Testing', score: percent(['testCiProof'], 12), weight: 20, detail: 'Tests, scripts, and CI proof points' },
    { label: 'Documentation', score: percent(['documentationSync', 'brownfieldSafety'], 16), weight: 15, detail: 'Documentation sync and brownfield safety' },
    { label: 'Review & Safety', score: percent(['memoryContinuity', 'reviewGate', 'contextGraph', 'mistakeShield', 'riskHygiene'], 32), weight: 25, detail: 'Memory, gate, graph, shield, and risk hygiene' },
  ];
  const surfaces = raw.surfaces || {};
  return [
    { label: 'Planning', score: averageStatuses(surfaces, ['masterRoadmap', 'codexInstructions']), weight: 15, detail: 'Roadmap and Codex instruction surfaces' },
    { label: 'Evidence', score: averageStatuses(surfaces, ['evidenceReport', 'traceabilityMatrix', 'notRunGates']), weight: 25, detail: 'Evidence, traceability, and NOT_RUN visibility' },
    { label: 'Testing', score: averageStatuses(surfaces, ['tests', 'ci']), weight: 20, detail: 'Executable tests and CI proof' },
    { label: 'Documentation', score: averageStatuses(surfaces, ['architecture', 'documentation']), weight: 15, detail: 'Architecture and documentation sync' },
    { label: 'Review & Safety', score: averageStatuses(surfaces, ['reviewGate', 'mistakeShield', 'memoryLens']), weight: 25, detail: 'Approval, memory, and preflight protection' },
  ];
}

function normalizeMemory(raw) {
  const memory = raw.memoryLens || {};
  let sourceItems = memory.selectedItems || [];
  if (!sourceItems.length) {
    sourceItems = [
      ...(memory.persistentRules || []).map((text) => ({ pillar: 'Code Soul', text, reason: 'Durable rule', protected: true })),
      ...(memory.neverForgetRisks || []).map((text) => ({ pillar: 'Minefield', text, reason: 'Risk prevention', protected: true })),
      ...(memory.architecturePrinciples || []).map((text) => ({ pillar: 'Architecture', text, reason: 'Design continuity', protected: false })),
      ...(memory.environmentConstraints || []).map((text) => ({ pillar: 'Environment', text, reason: 'Runtime constraint', protected: false })),
      ...(memory.userPreferences || []).map((text) => ({ pillar: 'User Preferences', text, reason: 'Developer preference', protected: false })),
    ];
  }
  const memoryMetric = (value, labels = {}) => {
    if (!hasValue(value)) return null;
    const mapped = labels[String(value).toLowerCase()];
    if (mapped != null) return mapped;
    const number = numberOrNull(value);
    if (number == null) return null;
    return number <= 1 ? Math.round(number * 100) : number;
  };
  const items = sourceItems.slice(0, 16).map((item, index) => ({
    id: `MEM-${String(index + 1).padStart(2, '0')}`,
    pillar: item.pillar || 'Memory',
    title: item.text || item.title || 'Recorded memory item',
    detail: item.reason || item.detail || 'Selected by the local Memory Lens.',
    confidence: memoryMetric(item.confidence ?? item.relevance),
    freshness: memoryMetric(item.freshness, { fresh: 100, aging: 65, mixed: 60, stale: 25 }),
    importance: memoryMetric(item.importance, { high: 100, medium: 72, low: 45 }),
    protected: Boolean(item.protected),
    status: !hasValue(item.freshness) ? 'UNKNOWN' : String(item.freshness).toLowerCase() === 'stale' ? 'STALE' : 'ACTIVE',
  }));
  return {
    summary: {
      selected: memory.metrics?.selectedItems ?? items.length,
      stale: memory.metrics?.staleSources ?? memory.staleSections?.length ?? memory.staleSources ?? 0,
      conflicts: memory.contradictions?.length || 0,
      protected: memory.metrics?.protectedItems ?? items.filter((item) => item.protected).length,
    },
    items,
  };
}

function normalizeFlightRecorder(raw) {
  const recorder = raw.flightRecorder || {};
  if (Array.isArray(recorder)) return recorder;
  if (Array.isArray(recorder.events) && recorder.events.length) return recorder.events.filter((event) => hasValue(event.timestamp || event.at)).map((event, index) => {
    const type = String(event.type || 'UNKNOWN').toUpperCase();
    const statusFromType = ({ NOT_RUN: 'NOT_RUN', BLOCKED: 'BLOCKED', RISK: 'WARN' })[type];
    return {
      id: event.id || `FR-${String(index + 1).padStart(3, '0')}`,
      at: event.timestamp || event.at,
      type,
      title: titleCase(event.event || event.title || 'Untitled recorded event'),
      detail: event.message || event.summary || event.detail || 'No event detail recorded.',
      actor: event.actor || event.source || 'Actor not recorded',
      status: statusOrUnknown(event.status || statusFromType || (event.simulated ? 'SIMULATED' : null)),
    };
  });
  return [];
}

function normalizeCliReport(raw) {
  const simulated = Boolean(raw.simulatedDemoData || raw.simulatedData || raw.scanMode === 'SIMULATED');
  const evidenceBoundary = normalizeEvidence(raw);
  const contextTrace = normalizeContext(raw);
  const surfaces = raw.surfaces || {};
  const phase0 = raw.phase0 ? {
    ...raw.phase0,
    mode: raw.phase0.simulated ? 'SIMULATED' : raw.phase0.status,
    forbiddenAreas: asArray(raw.phase0.forbiddenAreas),
    expectedEvidence: asArray(raw.phase0.expectedEvidence),
    biggestRisk: raw.phase0.risk || raw.riskSummary?.remaining?.[0] || 'No explicit Phase-0 risk was recorded.',
  } : null;
  const score = numberOrNull(raw.health?.score ?? raw.score);
  const riskFlags = Array.isArray(raw.riskFlags) ? raw.riskFlags : [];
  const prompt = raw.phase0?.codexMissionPrompt || raw.phase0?.missionPrompt || raw.codexMissionPrompt || raw.codexPrompt || null;
  const explicitRiskCount = numberOrNull(raw.riskSummary?.afterFlags) ?? (Array.isArray(raw.riskFlags) ? raw.riskFlags.length : null);
  const governanceSurfaceCount = Object.keys(surfaces).length
    ? Object.keys(surfaces).filter((key) => !['MISSING', 'FAIL'].includes(String(surfaces[key]).toUpperCase())).length
    : Object.entries(raw.facts || {}).filter(([key, value]) => key.startsWith('has') && value === true).length || null;

  const rawComparison = raw.comparison || null;
  const beforeSnapshot = raw.beforeSnapshot || null;
  const comparisonExists = Boolean(rawComparison || beforeSnapshot);
  const beforeRiskIds = new Set((beforeSnapshot?.riskFlags || []).map((risk) => risk.id));
  const stateFromRisk = (riskId) => beforeRiskIds.has(riskId) ? 'MISSING' : 'UNKNOWN';
  const testState = (snapshot, fallback) => {
    const evidence = asArray(snapshot?.evidenceStatus?.tests?.evidence);
    if (evidence.some((item) => item.toLowerCase().includes('placeholder'))) return 'PLACEHOLDER';
    return snapshot?.surfaces?.tests || snapshot?.evidenceStatus?.tests?.status || fallback || 'UNKNOWN';
  };
  const notRunVisible = (snapshot) => {
    if (typeof snapshot?.facts?.hasNotRun === 'boolean') return snapshot.facts.hasNotRun;
    const state = String(snapshot?.evidenceStatus?.notRunVisibility?.status || '').toUpperCase();
    if (state === 'PASS') return true;
    if (state === 'FAIL' || state === 'MISSING') return false;
    return null;
  };
  const knownGovernanceSurfaces = (snapshot) => {
    const explicit = numberOrNull(snapshot?.governanceSurfaces);
    if (explicit != null) return explicit;
    if (snapshot?.surfaces && Object.keys(snapshot.surfaces).length) {
      return Object.values(snapshot.surfaces).filter((status) => !['MISSING', 'FAIL'].includes(String(status).toUpperCase())).length;
    }
    const governanceEvidenceKeys = ['plan', 'ci', 'evidenceReport', 'traceability', 'techDebtDelta', 'notRunVisibility'];
    const recorded = governanceEvidenceKeys.filter((key) => {
      const item = snapshot?.evidenceStatus?.[key];
      return item && !['MISSING', 'FAIL'].includes(String(item.status).toUpperCase()) && asArray(item.evidence).length > 0;
    });
    return recorded.length || null;
  };
  const beforeScore = numberOrNull(rawComparison?.beforeScore ?? beforeSnapshot?.score ?? raw.health?.beforeScore);
  const afterScore = numberOrNull(rawComparison?.afterScore) ?? score;
  const beforeRisks = numberOrNull(rawComparison?.beforeRisks ?? raw.riskSummary?.beforeFlags)
    ?? (Array.isArray(beforeSnapshot?.riskFlags) ? beforeSnapshot.riskFlags.length : null);
  const afterRisks = numberOrNull(rawComparison?.afterRisks ?? raw.riskSummary?.afterFlags) ?? explicitRiskCount;
  const projectLabel = raw.phase0?.project || raw.project?.name || raw.projectName || 'Repository';
  const comparison = comparisonExists ? {
    mode: simulated ? 'SIMULATED' : 'LOCAL',
    before: {
      label: rawComparison?.beforeLabel || `${projectLabel} — before snapshot`,
      path: rawComparison?.beforePath || beforeSnapshot?.targetPath || 'Path not recorded',
      score: beforeScore,
      riskFlags: beforeRisks,
      governanceSurfaces: numberOrNull(rawComparison?.beforeGovernanceSurfaces) ?? knownGovernanceSurfaces(beforeSnapshot),
      evidenceCoverage: numberOrNull(rawComparison?.beforeEvidenceCoverage) ?? evidenceCoverage(beforeSnapshot?.evidenceStatus),
      reviewGate: beforeSnapshot?.reviewGate?.status || stateFromRisk('NO_REVIEW_GATE'),
      mistakeShield: beforeSnapshot?.mistakeShield?.verdict || beforeSnapshot?.mistakeShield?.status || stateFromRisk('NO_MISTAKE_SHIELD'),
      contextTrace: beforeSnapshot?.contextGraph?.status || (beforeSnapshot?.contextGraph?.generatedLocally ? 'READY' : 'UNKNOWN'),
      tests: testState(beforeSnapshot),
      notRunVisible: notRunVisible(beforeSnapshot),
    },
    after: {
      label: rawComparison?.afterLabel || `${projectLabel} — current scan`,
      path: rawComparison?.afterPath || raw.project?.target || raw.targetPath || 'Path not recorded',
      score: afterScore,
      riskFlags: afterRisks,
      governanceSurfaces: numberOrNull(rawComparison?.afterGovernanceSurfaces) ?? governanceSurfaceCount,
      evidenceCoverage: numberOrNull(rawComparison?.afterEvidenceCoverage) ?? evidenceCoverage(raw.evidenceStatus),
      reviewGate: raw.reviewGate?.status || raw.facts?.reviewGateStatus || 'UNKNOWN',
      mistakeShield: raw.mistakeShield?.verdict || raw.mistakeShield?.status || 'UNKNOWN',
      contextTrace: raw.contextGraph?.status || (raw.contextGraph?.generatedLocally ? 'READY' : 'UNKNOWN'),
      tests: testState(raw, raw.facts?.hasTests === false ? 'FAIL' : null),
      notRunVisible: notRunVisible(raw),
    },
  } : null;
  const reviewGateStatus = statusOrUnknown(raw.reviewGate?.status);
  const reviewGateApproved = reviewGateStatus === 'APPROVED';

  return {
    ...raw,
    mode: simulated ? 'SIMULATED' : raw.scanMode || 'LOCAL',
    disclosure: simulated
      ? 'InvoiceFlow Mini and its customer facts are fictional. The 25/88 values are real deterministic scans of prepared fictional snapshots, not a customer outcome; policy checks, evidence, two Node.js tests, and recorded GPT-5.6 reconciliation are real tool outputs.'
      : 'LOCAL REPORT — source and evidence remain on this device.',
    sampleContext: simulated ? {
      fictional: true,
      label: 'FICTIONAL SAMPLE PROJECT',
      fictionalScope: 'InvoiceFlow Mini, its people, customer facts, approval identity, and prepared before/after states',
      realExecution: 'Real deterministic scans of prepared snapshots, policy checks, evidence bundle, two Node.js tests, and recorded GPT-5.6 reconciliation',
    } : { fictional: false },
    repository: {
      name: raw.project?.name || raw.projectName || 'Unnamed repository',
      path: raw.project?.target || raw.targetPath || 'Path not recorded',
      branch: raw.project?.branch || raw.branch || 'Not recorded',
      profile: raw.profile || raw.phase0?.profile || null,
      filesScanned: raw.contextGraph?.stats?.nodeCount ?? raw.contextGraph?.nodeCount ?? raw.detectedFiles?.length ?? '—',
    },
    health: {
      score,
      grade: titleCase(raw.health?.band || (score == null ? 'Unscored' : score >= 75 ? 'Governed' : score >= 45 ? 'Needs alignment' : 'Uncontrolled')),
      trend: numberOrNull(raw.health?.scoreDelta ?? rawComparison?.scoreDelta)
        ?? (score != null && beforeScore != null ? score - beforeScore : null),
      summary: explicitRiskCount == null
        ? 'Risk count was not recorded. PASS claims remain separate from NOT_RUN and simulated evidence.'
        : `${explicitRiskCount} risk flag(s) remain. PASS claims are separated from NOT_RUN and simulated evidence.`,
    },
    scoreBreakdown: normalizeScoreBreakdown(raw),
    risks: riskFlags.map((risk, index) => ({ id: risk.id || `RISK-${index + 1}`, severity: risk.severity || 'MEDIUM', title: risk.issue || risk.title, area: asArray(risk.files)[0] || risk.path || raw.targetPath || '.', detail: risk.whyItMatters || risk.issue || risk.detail, mitigation: risk.recommendedFix || 'Record an explicit mitigation before implementation.', status: 'OPEN' })),
    missingSurfaces: asArray(raw.missingSurfaces).map((surface) => ({ name: surface, impact: 'Governance coverage is incomplete until this surface exists or is explicitly waived.', priority: 'UNKNOWN' })),
    phase0,
    missionPrompt: prompt ? {
      status: 'GENERATED',
      title: 'Next bounded Codex mission',
      objective: raw.nextSafeAction || raw.mistakeShield?.saferNextAction || phase0?.nextMission || null,
      allowedFiles: asArray(raw.reviewGate?.allowedFiles),
      forbiddenActions: asArray(raw.reviewGate?.forbiddenActions || phase0?.forbiddenAreas),
      requiredEvidence: asArray(raw.requiredEvidence || phase0?.expectedEvidence),
      prompt,
    } : null,
    reviewGate: raw.reviewGate ? {
      ...raw.reviewGate,
      status: reviewGateStatus,
      scope: reviewGateApproved ? raw.reviewGate.scope || null : null,
      approvedBy: reviewGateApproved ? raw.reviewGate.approvedBy || raw.reviewGate.decidedBy || null : null,
      approvedAt: reviewGateApproved ? raw.reviewGate.approvedAt || null : null,
      conditions: asArray(raw.reviewGate.forbiddenActions || phase0?.forbiddenAreas),
    } : null,
    evidenceBoundary,
    traceability: raw.traceabilityMatrix || Object.entries(raw.evidenceStatus || {}).map(([key, item]) => ({ requirement: titleCase(key), implementation: asArray(item.evidence)[0] || 'Not recorded', evidence: asArray(item.evidence).join(' · ') || 'No evidence recorded', status: statusOrUnknown(item.status) })),
    contextTrace,
    memoryLens: normalizeMemory(raw),
    flightRecorder: normalizeFlightRecorder(raw),
    mistakeShield: raw.mistakeShield ? {
      status: statusOrUnknown(raw.mistakeShield.verdict || raw.mistakeShield.status),
      action: raw.mistakeShield.proposedAction || raw.nextSafeAction || null,
      score: numberOrNull(raw.mistakeShield.score),
      summary: asArray(raw.mistakeShield.reasons)[0] || 'No detailed shield explanation was recorded.',
      matches: asArray(raw.mistakeShield.reasons).map((reason, index) => ({ rule: `MS-${String(index + 1).padStart(2, '0')}`, severity: (raw.mistakeShield.verdict || raw.mistakeShield.status) === 'CLEAR' ? 'INFO' : (raw.mistakeShield.verdict || raw.mistakeShield.status) === 'BLOCKED' ? 'BLOCKING' : 'CAUTION', title: reason, explanation: reason, source: raw.mistakeShield.matchedLessons?.[index] || (raw.mistakeShield.deterministic ? 'deterministic local check' : 'Source not recorded') })),
      safeRewrite: raw.mistakeShield.saferNextAction || raw.nextSafeAction || phase0?.nextMission || null,
    } : null,
    comparison,
    codexLiveReview: normalizeCodexLiveReview(raw.codexLiveReview),
  };
}

export default function normalizeReport(raw = {}) {
  if (!raw.repository || !raw.health?.grade) return normalizeCliReport(raw);
  return {
    ...raw,
    risks: raw.risks || [], missingSurfaces: raw.missingSurfaces || [], scoreBreakdown: raw.scoreBreakdown || [], traceability: raw.traceability || [], flightRecorder: Array.isArray(raw.flightRecorder) ? raw.flightRecorder : [],
    evidenceBoundary: raw.evidenceBoundary || { summary: Object.fromEntries(evidenceStates.map((state) => [state, 0])), checks: [] },
    codexLiveReview: normalizeCodexLiveReview(raw.codexLiveReview),
  };
}
