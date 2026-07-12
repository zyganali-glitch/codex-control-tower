'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { SURFACES } = require('./constants');
const { buildContextGraph } = require('./contextGraphBuilder');
const { buildCodexPrompt } = require('./codexPromptBuilder');
const { scoreHealth, readiness } = require('./healthScorer');
const { analyzeMemory } = require('./memoryLens');
const { evaluateMistakeShield } = require('./mistakeShield');
const { readReviewGate } = require('./reviewGate');
const { listRepoFiles, normalizeExcludedPaths, readJson, readText, resolveTarget } = require('./safeFs');
const { readFlightEvents } = require('./flightRecorder');

const TEXT_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.json', '.md', '.txt', '.yml', '.yaml', '.toml', '.py', '.go', '.rs', '.java', '.sh', '.ps1']);
const SOURCE_EXTENSIONS = new Set(['.js', '.jsx', '.mjs', '.cjs', '.ts', '.tsx', '.py', '.go', '.rs', '.java']);
const TODO_COMMENT_PATTERN = /(?:\/\/|\/\*|#)\s*(TODO|FIXME)\b/i;

function surfacePresent(fileSet, key) {
  return SURFACES[key].some((relative) => fileSet.has(relative));
}

function risk(id, severity, issue, whyItMatters, recommendedFix, files = []) {
  return { id, severity, issue, whyItMatters, recommendedFix, files };
}

function isGeneratedJson(file) {
  if (path.extname(file.relative).toLowerCase() !== '.json' || file.bytes > 5 * 1024 * 1024) return false;
  try {
    const value = JSON.parse(fs.readFileSync(file.absolute, 'utf8'));
    return Boolean(
      value && typeof value === 'object'
      && ((value.contextGraph && value.codexPrompt && Number.isFinite(value.score))
        || (value.generatedLocally && Array.isArray(value.nodes) && Array.isArray(value.edges)))
    );
  } catch {
    return false;
  }
}

function substantial(text, minimum, patterns = []) {
  return text.length >= minimum && patterns.every((pattern) => pattern.test(text));
}

function record(value) {
  return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
}

function addMissingRisks(flags, facts) {
  if (!facts.hasCodexInstructions) flags.push(risk('NO_CODEX_INSTRUCTIONS', 'CRITICAL', 'No Codex instruction surface', 'A future session has no durable scope or safety rules.', 'Add .codex/AGENTS.md with allowed files, evidence, and review rules.'));
  else if (!facts.codexInstructionsHealthy) flags.push(risk('WEAK_CODEX_INSTRUCTIONS', 'CRITICAL', 'Codex instructions are empty or incomplete', 'A filename alone does not define scope, approval, or evidence rules.', 'Add explicit scope, destructive-action, evidence, and NOT_RUN rules.'));
  if (facts.hasConfig && !facts.configHealthy) flags.push(risk('INVALID_CONTROL_TOWER_CONFIG', 'MEDIUM', 'Control Tower configuration is incomplete', 'An empty or malformed config cannot carry governance policy.', 'Record product, profile, locale, and local-first policy in the config.'));
  if (!facts.hasRoadmap) flags.push(risk('NO_PLAN', 'CRITICAL', 'No master roadmap', 'Work can drift without a durable mission and acceptance criteria.', 'Create plans/master-roadmap.md before implementation.'));
  else if (!facts.roadmapHealthy) flags.push(risk('WEAK_PLAN', 'CRITICAL', 'Master roadmap is empty or incomplete', 'A path without mission and acceptance content cannot bound work.', 'Add mission scope, deliverables, acceptance, and evidence links.'));
  if (!facts.hasEvidence) flags.push(risk('NO_EVIDENCE', 'CRITICAL', 'No evidence report', 'A done claim cannot be checked against concrete proof.', 'Create docs/EVIDENCE_REPORT.md and record only verified checks.'));
  else if (!facts.evidenceHealthy) flags.push(risk('WEAK_EVIDENCE', 'CRITICAL', 'Evidence report has no substantial proof boundary', 'An empty evidence filename can inflate confidence without proof.', 'Record scoped statuses, commands or artifact paths, and honest NOT_RUN items.'));
  if (!facts.hasTraceability) flags.push(risk('NO_TRACEABILITY', 'HIGH', 'No traceability matrix', 'Requirements are not connected to implementation and proof.', 'Create docs/TRACEABILITY_MATRIX.md.'));
  else if (!facts.traceabilityHealthy) flags.push(risk('WEAK_TRACEABILITY', 'HIGH', 'Traceability matrix is empty or incomplete', 'Requirements still lack implementation and evidence links.', 'Add requirement, implementation, evidence, and status columns.'));
  if (!facts.hasNotRun) flags.push(risk('NO_NOT_RUN', 'HIGH', 'No NOT_RUN gates file', 'Skipped checks can disappear from the handoff.', 'Create docs/NOT_RUN_GATES.md and keep skipped checks visible.'));
  else if (!facts.notRunHealthy) flags.push(risk('WEAK_NOT_RUN', 'HIGH', 'NOT_RUN record is empty or incomplete', 'Skipped checks remain invisible despite the filename.', 'List each unexecuted check and why it remains NOT_RUN.'));
  if (!facts.reviewGateExists) flags.push(risk('NO_REVIEW_GATE', 'CRITICAL', 'No local review gate', 'Risky actions have no explicit human decision artifact.', 'Create .controltower/review-gate.json in AWAITING_HUMAN.'));
  else if (facts.reviewGateStatus === 'APPROVED' && !facts.reviewGateScoped) flags.push(risk('UNSCOPED_APPROVAL', 'CRITICAL', 'Review Gate approval has no complete scope', 'An unbounded approval cannot safely authorize risky work.', 'Record scope, allowed files, forbidden actions, note, and decision timestamp.'));
  if (!facts.hasFlightRecorder) flags.push(risk('NO_FLIGHT_RECORDER', 'HIGH', 'No flight recorder', 'The next session cannot reconstruct prompts, changes, tests, and approvals.', 'Create .controltower/flight-recorder.jsonl.'));
  else if (!facts.flightRecorderHealthy) flags.push(risk('EMPTY_FLIGHT_RECORDER', 'MEDIUM', 'Flight recorder has no valid events', 'An empty log cannot support cross-session continuity.', 'Record prompt, plan, test, evidence, risk, approval, or NOT_RUN events.'));
  if (!facts.hasMemoryLens) flags.push(risk('NO_MEMORY_LENS', 'MEDIUM', 'No memory lens', 'Minefields and durable constraints may be missed in future sessions.', 'Create docs/MEMORY_LENS.md.'));
  else if (!facts.memoryLensHealthy) flags.push(risk('WEAK_MEMORY_LENS', 'MEDIUM', 'Memory Lens is empty or incomplete', 'A placeholder cannot carry minefields or architecture constraints.', 'Record durable rules, risks, and continuity constraints.'));
  if (!facts.hasMistakeShield) flags.push(risk('NO_MISTAKE_SHIELD', 'MEDIUM', 'No mistake shield record', 'Proposed work is not compared with known risks.', 'Create docs/MISTAKE_SHIELD.md.'));
  else if (!facts.mistakeShieldHealthy) flags.push(risk('WEAK_MISTAKE_SHIELD', 'MEDIUM', 'Mistake Shield record is empty or incomplete', 'A verdict without reasoning cannot guide a safer next action.', 'Record CLEAR, CAUTION, or BLOCKED with reasons and next action.'));
  if (facts.weakTests) flags.push(risk('WEAK_TESTS', 'HIGH', 'Tests are missing or only placeholders', 'Behavior changes could be reported without executable proof.', 'Add a small working test and record its command.'));
  if (!facts.hasCi) flags.push(risk('NO_CI', 'HIGH', 'No CI configuration', 'Repository checks are not repeatable in a clean automation environment.', 'Add a minimal CI workflow that runs tests and the demo.'));
  else if (!facts.ciHealthy) flags.push(risk('INVALID_CI', 'HIGH', 'CI configuration does not run a test or verification command', 'An empty workflow is not repeatable proof.', 'Add an explicit test or verification step.'));
  if (!facts.hasArchitecture) flags.push(risk('NO_ARCHITECTURE', 'HIGH', 'Architecture documentation is missing', 'Future Codex sessions lack system boundaries and dependency intent.', 'Add docs/ARCHITECTURE.md.'));
  else if (!facts.architectureHealthy) flags.push(risk('WEAK_ARCHITECTURE', 'HIGH', 'Architecture documentation is empty or incomplete', 'A placeholder cannot explain system boundaries.', 'Document components, data flow, boundaries, and safety model.'));
  if (!facts.hasBrownfield) flags.push(risk('NO_BROWNFIELD_QUARANTINE', 'HIGH', 'No brownfield safety record', 'Existing risky areas may be changed without explicit quarantine.', 'Add TECH_DEBT_AND_SECURITY.md before touching legacy areas.'));
  else if (!facts.brownfieldHealthy) flags.push(risk('WEAK_BROWNFIELD_QUARANTINE', 'HIGH', 'Brownfield record is empty or incomplete', 'Legacy minefields remain unbounded.', 'Record quarantined risk areas and approval requirements.'));
}

function evidenceStatus(facts, simulatedData) {
  return {
    mode: simulatedData ? 'SIMULATED' : 'REAL_LOCAL_SCAN',
    plan: facts.roadmapHealthy ? { status: 'PASS', evidence: 'plans/master-roadmap.md' } : { status: facts.hasRoadmap ? 'WARN' : 'FAIL', evidence: facts.hasRoadmap ? 'plans/master-roadmap.md' : null },
    tests: !facts.hasTests ? { status: 'FAIL', evidence: null } : { status: facts.testsHealthy ? 'NOT_RUN' : 'WARN', evidence: facts.testFiles },
    ci: facts.ciHealthy ? { status: 'NOT_RUN', evidence: facts.ciFiles } : { status: facts.hasCi ? 'WARN' : 'FAIL', evidence: facts.hasCi ? facts.ciFiles : null },
    documentation: facts.readmeHealthy && facts.architectureHealthy ? { status: 'PASS', evidence: ['README.md', 'docs/ARCHITECTURE.md'] } : { status: 'WARN', evidence: facts.hasReadme ? ['README.md'] : [] },
    evidenceReport: facts.hasEvidence
      ? { status: facts.evidenceHealthy ? 'PASS' : 'WARN', evidence: 'docs/EVIDENCE_REPORT.md' }
      : { status: 'FAIL', evidence: null },
    traceability: facts.traceabilityHealthy
      ? { status: 'PASS', evidence: 'docs/TRACEABILITY_MATRIX.md' }
      : { status: facts.hasTraceability ? 'WARN' : 'FAIL', evidence: facts.hasTraceability ? 'docs/TRACEABILITY_MATRIX.md' : null },
    techDebtDelta: facts.techDebtHealthy
      ? { status: 'PASS', evidence: 'docs/TECH_DEBT_DELTA.md' }
      : { status: facts.hasTechDebtDelta ? 'WARN' : 'FAIL', evidence: facts.hasTechDebtDelta ? 'docs/TECH_DEBT_DELTA.md' : null },
    notRunVisibility: facts.notRunHealthy ? { status: 'PASS', evidence: 'docs/NOT_RUN_GATES.md' } : { status: facts.hasNotRun ? 'WARN' : 'FAIL', evidence: facts.hasNotRun ? 'docs/NOT_RUN_GATES.md' : null }
  };
}

function scanRepository(targetInput = '.', options = {}) {
  const target = resolveTarget(targetInput);
  const controlConfig = record(readJson(path.join(target, '.controltower', 'config.json'), {}));
  const configuredExcludes = normalizeExcludedPaths(
    Array.isArray(controlConfig.scan && controlConfig.scan.exclude) ? controlConfig.scan.exclude : []
  );
  const rawFiles = listRepoFiles(target, {
    excludePaths: [...configuredExcludes, ...(Array.isArray(options.excludePaths) ? options.excludePaths : [])]
  }).filter((file) => !isGeneratedJson(file));
  const contents = new Map();
  const files = rawFiles.map((file) => {
    let lines = 0;
    if (file.bytes <= 1024 * 1024 && TEXT_EXTENSIONS.has(path.extname(file.relative).toLowerCase())) {
      const text = readText(file.absolute);
      contents.set(file.relative, text);
      lines = text ? text.split(/\r?\n/).length : 0;
    }
    return { ...file, lines };
  });
  const fileSet = new Set(files.map((file) => file.relative));
  const packageJson = record(readJson(path.join(target, 'package.json'), {}));
  const readme = contents.get('README.md') || '';
  const reviewGate = readReviewGate(target);
  const phase0 = readJson(path.join(target, '.controltower', 'phase0.json'), null);
  const flightEvents = readFlightEvents(target);
  const planFiles = files.filter((file) => file.relative.startsWith('plans/') && file.relative.endsWith('.md')).map((file) => file.relative);
  const testFiles = files.filter((file) => /(^|\/)(tests?|__tests__)(\/|$)|\.(test|spec)\./i.test(file.relative)).map((file) => file.relative);
  const ciFiles = files.filter((file) => file.relative.startsWith('.github/workflows/') || /(^|\/)\.gitlab-ci\.yml$/i.test(file.relative)).map((file) => file.relative);
  const todoMarkers = [];
  for (const [relative, text] of contents.entries()) {
    text.split(/\r?\n/).forEach((line, index) => {
      if (TODO_COMMENT_PATTERN.test(line)) todoMarkers.push({ file: relative, line: index + 1, text: line.trim().slice(0, 180) });
    });
  }
  const testsHealthy = testFiles.some((file) => substantial(contents.get(file) || '', 60, [/\b(assert|expect|describe|it\s*\(|test\s*\()/i]))
    && !testFiles.every((file) => /placeholder|todo|skip/i.test(`${file}\n${contents.get(file) || ''}`));
  const testSurfaceMeaningful = testFiles.some((file) => (contents.get(file) || '').trim().length >= 30);
  const weakTests = !testsHealthy;
  const ciHealthy = ciFiles.some((file) => substantial(contents.get(file) || '', 40, [/(npm|pnpm|yarn|node)[^\n]*(test|verify)|run:\s*.*(test|verify)/i]));
  const codexText = contents.get('.codex/AGENTS.md') || contents.get('AGENTS.md') || '';
  const roadmapText = contents.get('plans/master-roadmap.md') || '';
  const evidenceText = contents.get('docs/EVIDENCE_REPORT.md') || '';
  const traceabilityText = contents.get('docs/TRACEABILITY_MATRIX.md') || '';
  const notRunText = contents.get('docs/NOT_RUN_GATES.md') || '';
  const techDebtText = contents.get('docs/TECH_DEBT_DELTA.md') || '';
  const memoryText = contents.get('docs/MEMORY_LENS.md') || '';
  const shieldText = contents.get('docs/MISTAKE_SHIELD.md') || '';
  const brownfieldText = contents.get('TECH_DEBT_AND_SECURITY.md') || '';
  const architectureText = contents.get('docs/ARCHITECTURE.md') || '';
  const simulatedData = options.simulatedData ?? (
    packageJson.simulated === true
    || controlConfig.simulatedDemoData === true
    || controlConfig.dataMode === 'SIMULATED'
  );
  const readmeMarkedStale = /<!--[^>]*(?:intentionally\s+(?:stale|outdated)|CCT:STALE)[^>]*-->|^\s*(?:README\s+)?STATUS\s*:\s*STALE\s*$/im.test(readme);
  const facts = {
    hasPackage: fileSet.has('package.json'),
    hasCodexInstructions: surfacePresent(fileSet, 'codexInstructions'),
    hasConfig: surfacePresent(fileSet, 'config'),
    hasRoadmap: surfacePresent(fileSet, 'roadmap'),
    hasAnyPlan: planFiles.length > 0,
    hasEvidence: surfacePresent(fileSet, 'evidence'),
    hasTraceability: surfacePresent(fileSet, 'traceability'),
    hasNotRun: surfacePresent(fileSet, 'notRun'),
    hasTechDebtDelta: surfacePresent(fileSet, 'techDebtDelta'),
    hasMemoryLens: surfacePresent(fileSet, 'memoryLens'),
    hasMistakeShield: surfacePresent(fileSet, 'mistakeShield'),
    hasBrownfield: surfacePresent(fileSet, 'brownfield'),
    hasReadme: surfacePresent(fileSet, 'readme'),
    hasArchitecture: surfacePresent(fileSet, 'architecture'),
    hasPhase0: surfacePresent(fileSet, 'phase0'),
    hasFlightRecorder: surfacePresent(fileSet, 'flightRecorder'),
    reviewGateExists: reviewGate.exists,
    reviewGateStatus: reviewGate.status,
    reviewGateScoped: reviewGate.scopeComplete,
    reviewGateDecisionRecorded: reviewGate.decisionRecorded,
    hasTests: testFiles.length > 0,
    testsHealthy,
    testSurfaceMeaningful,
    weakTests,
    testFiles,
    hasTestScript: Boolean(packageJson.scripts && packageJson.scripts.test && !/no test specified/i.test(packageJson.scripts.test)),
    hasCi: ciFiles.length > 0,
    ciHealthy,
    ciFiles,
    readmeHealthy: readme.length >= 300 && !readmeMarkedStale,
    todoCount: todoMarkers.length,
    simulatedData
  };
  facts.codexInstructionsHealthy = facts.hasCodexInstructions && substantial(codexText, 180, [/(evidence|proof)/i, /(NOT_RUN|not run)/i, /(approval|review gate|do not|must)/i]);
  facts.configHealthy = facts.hasConfig && controlConfig.product === 'Codex Control Tower'
    && ['solo', 'startup', 'enterprise', 'regulated'].includes(controlConfig.profile) && controlConfig.localFirst === true;
  facts.roadmapHealthy = facts.hasRoadmap && substantial(roadmapText, 180, [/(mission|scope)/i, /(acceptance|deliverable|evidence|status)/i]);
  facts.evidenceHealthy = facts.hasEvidence && evidenceText.length >= 200 && /\b(PASS|WARN|FAIL|NOT_RUN|SIMULATED)\b/.test(evidenceText);
  facts.traceabilityHealthy = facts.hasTraceability && substantial(traceabilityText, 140, [/\|/, /(requirement|implementation)/i, /(evidence|status)/i]);
  facts.notRunHealthy = facts.hasNotRun && substantial(notRunText, 80, [/NOT_RUN/]);
  facts.techDebtHealthy = facts.hasTechDebtDelta && substantial(techDebtText, 100, [/(debt|risk)/i, /\b(PASS|WARN|FAIL|NOT_RUN|SIMULATED)\b/]);
  facts.memoryLensHealthy = facts.hasMemoryLens && substantial(memoryText, 140, [/(risk|minefield|never|rule|lesson)/i]);
  facts.mistakeShieldHealthy = facts.hasMistakeShield && substantial(shieldText, 100, [/\b(CLEAR|CAUTION|BLOCKED)\b/, /(reason|next|action|risk)/i]);
  facts.brownfieldHealthy = facts.hasBrownfield && substantial(brownfieldText, 140, [/(risk|security|quarantine|approval)/i]);
  facts.architectureHealthy = facts.hasArchitecture && substantial(architectureText, 240, [/(architecture|component|module)/i, /(flow|boundary|dependency|data)/i]);
  facts.phase0Healthy = facts.hasPhase0 && phase0 && ['goal', 'risk', 'expectedEvidence', 'forbiddenAreas', 'nextMission'].every((key) => String(phase0[key] || '').trim());
  facts.flightRecorderHealthy = facts.hasFlightRecorder && flightEvents.length > 0;
  facts.evidenceSurfaceCount = [facts.evidenceHealthy, facts.traceabilityHealthy, facts.notRunHealthy, facts.techDebtHealthy]
    .filter(Boolean).length;

  const riskFlags = [];
  addMissingRisks(riskFlags, facts);
  if (todoMarkers.length) riskFlags.push(risk('UNTRACKED_TODO', 'MEDIUM', `${todoMarkers.length} TODO/FIXME marker(s) detected`, 'Markers can become hidden scope and repeated work.', 'Move markers into the roadmap or tech-debt delta.', [...new Set(todoMarkers.map((item) => item.file))]));
  const largeFiles = files.filter((file) => SOURCE_EXTENSIONS.has(path.extname(file.relative).toLowerCase()) && file.lines > 400);
  if (largeFiles.length) riskFlags.push(risk('LARGE_FILES', 'MEDIUM', `${largeFiles.length} file(s) exceed 400 lines`, 'Large files increase blast radius and context pressure.', 'Split only with an approved plan and focused tests.', largeFiles.map((file) => file.relative)));
  if (!facts.readmeHealthy) riskFlags.push(risk('STALE_README', 'HIGH', 'README is missing, tiny, or marked stale', 'Users and future Codex sessions may follow outdated commands.', 'Rewrite or synchronize README with verified behavior.', facts.hasReadme ? ['README.md'] : []));
  if (options.action && /\b(delete|remove|drop|truncate|overwrite|reset|destroy|purge)\b/i.test(options.action) && (reviewGate.status !== 'APPROVED' || !reviewGate.scopeComplete)) {
    riskFlags.push(risk('DESTRUCTIVE_ACTION_WITHOUT_APPROVAL', 'CRITICAL', 'Proposed destructive action lacks approval', 'Destructive scope can erase evidence or unrelated user work.', 'Narrow the action and obtain an APPROVED local review gate with a note.'));
  }

  for (const file of files.filter((entry) => /(^|\/)auth[^/]*\.(js|ts)$/i.test(entry.relative))) {
    const text = contents.get(file.relative) || '';
    if (/Buffer\.from\([^\n]+base64|password\s*===|Math\.random\(\).*(token|session)|TODO[^\n]*auth|FIXME[^\n]*auth|trust[^\n]*(role|admin)/i.test(text)) {
      riskFlags.push(risk('RISKY_AUTH', 'CRITICAL', 'Risky authentication logic detected', 'Unverified tokens, passwords, or caller-controlled roles can bypass authorization.', 'Require signed token verification and focused auth tests before changes.', [file.relative]));
    }
  }
  for (const file of files.filter((entry) => /(^|\/)payments?[^/]*\.(js|ts)$/i.test(entry.relative))) {
    const text = contents.get(file.relative) || '';
    if (/skip[^\n]*verif|without[^\n]*verif|TODO[^\n]*payment|FIXME[^\n]*payment|trust[^\n]*(amount|paid|status)|client[^\n]*(amount|paid|status)|mark[^\n]*paid[^\n]*request/i.test(text)) {
      riskFlags.push(risk('RISKY_PAYMENT', 'CRITICAL', 'Risky payment state logic detected', 'Caller-controlled payment state can create false settlement records.', 'Verify provider events, amounts, currency, and idempotency before marking paid.', [file.relative]));
    }
  }

  const contextGraph = buildContextGraph({ files, contents, riskFlags });
  const memoryLens = analyzeMemory(target);
  const scanAction = options.action || (riskFlags.some((flag) => flag.severity === 'CRITICAL') ? '' : 'Continue with the smallest listed governance fix');
  const mistakeShield = evaluateMistakeShield(target, scanAction, { reviewGate, memoryLens, riskFlags });
  facts.contextNodeCount = contextGraph.nodes.length;
  facts.criticalRiskCount = riskFlags.filter((flag) => flag.severity === 'CRITICAL').length;
  facts.highRiskCount = riskFlags.filter((flag) => flag.severity === 'HIGH').length;
  const scored = scoreHealth(facts);
  const missingSurfaces = Object.entries(SURFACES)
    .filter(([key]) => !surfacePresent(fileSet, key))
    .map(([, candidates]) => candidates[0]);
  if (!facts.ciHealthy) missingSurfaces.push(facts.hasCi ? 'working CI verification' : '.github/workflows/ci.yml');
  if (weakTests) missingSurfaces.push('working tests');
  if (facts.hasRoadmap && !facts.roadmapHealthy) missingSurfaces.push('substantial plans/master-roadmap.md');
  if (facts.hasEvidence && !facts.evidenceHealthy) missingSurfaces.push('evidence-backed docs/EVIDENCE_REPORT.md');
  if (facts.reviewGateStatus === 'APPROVED' && !facts.reviewGateScoped) missingSurfaces.push('scoped Review Gate approval');

  const report = {
    schemaVersion: '1.0',
    projectName: packageJson.displayName || packageJson.name || path.basename(target),
    targetPath: target,
    generatedAt: new Date().toISOString(),
    scanMode: simulatedData ? 'SIMULATED' : 'REAL_LOCAL_SCAN',
    simulatedData,
    scanScope: {
      targetPath: target,
      excludedPaths: configuredExcludes.map((value) => String(value)),
      exclusionSource: configuredExcludes.length ? '.controltower/config.json' : 'built-in generated/dependency exclusions only',
      note: configuredExcludes.length
        ? 'Configured exclusions are visible here and remain directly scannable when selected as the target.'
        : 'No repository-specific path exclusions were configured.'
    },
    score: scored.score,
    scoreBreakdown: scored.scoreBreakdown,
    codexReadiness: readiness(scored.score),
    missingSurfaces: [...new Set(missingSurfaces)],
    riskFlags,
    detectedFiles: files.map(({ relative, bytes, lines, modifiedAt }) => ({ path: relative, bytes, lines, modifiedAt })),
    suggestedNextActions: riskFlags.slice(0, 8).map((flag) => flag.recommendedFix),
    codexPrompt: '',
    traceabilityMatrix: [
      { requirement: 'Plan before implementation', implementation: facts.hasRoadmap ? 'plans/master-roadmap.md' : 'Missing', evidence: facts.hasEvidence ? 'docs/EVIDENCE_REPORT.md' : 'Missing', status: facts.roadmapHealthy && facts.evidenceHealthy ? 'PASS' : facts.hasRoadmap || facts.hasEvidence ? 'WARN' : 'FAIL' },
      { requirement: 'Human review gate', implementation: reviewGate.exists ? '.controltower/review-gate.json' : 'Missing', evidence: reviewGate.status, status: reviewGate.status === 'APPROVED' && reviewGate.scopeComplete ? 'PASS' : 'WARN' },
      { requirement: 'Executable proof', implementation: testFiles.join(', ') || 'Missing', evidence: 'Tests were not executed by scan.', status: facts.testsHealthy ? 'NOT_RUN' : facts.hasTests ? 'WARN' : 'FAIL' },
      { requirement: 'Visible skipped gates', implementation: facts.hasNotRun ? 'docs/NOT_RUN_GATES.md' : 'Missing', evidence: facts.notRunHealthy ? 'Substantial NOT_RUN record present' : 'No substantial record', status: facts.notRunHealthy ? 'PASS' : facts.hasNotRun ? 'WARN' : 'FAIL' }
    ],
    evidenceStatus: evidenceStatus(facts, simulatedData),
    contextGraph,
    reviewGate,
    memoryLens,
    mistakeShield,
    phase0,
    flightRecorder: { events: flightEvents },
    facts: { ...facts, contents: undefined }
  };
  report.codexPrompt = buildCodexPrompt({ ...report, hasTestScript: facts.hasTestScript });
  return report;
}

module.exports = { scanRepository };
