'use strict';

function formatList(items, fallback) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${fallback}`;
}

function buildCodexPrompt(context) {
  const risks = (context.riskFlags || []).slice(0, 10).map((risk) => `[${risk.severity}] ${risk.issue}`);
  const missing = context.missingSurfaces || [];
  const phase0 = context.phase0 || {};
  const forbidden = Array.isArray(phase0.forbiddenAreas)
    ? phase0.forbiddenAreas
    : String(phase0.forbiddenAreas || '').split(',').map((item) => item.trim()).filter(Boolean);
  const evidence = Array.isArray(phase0.expectedEvidence)
    ? phase0.expectedEvidence
    : [phase0.expectedEvidence].filter(Boolean);
  const allowed = phase0.allowedFiles || (context.reviewGate?.allowedFiles?.length ? context.reviewGate.allowedFiles : ['governance files listed under Missing surfaces', 'tests directly related to the approved mission']);
  const tests = context.hasTestScript ? ['Run the repository test command discovered in package metadata.'] : ['Discover the smallest relevant test command; report NOT_RUN if unavailable.'];
  const docs = ['README.md when behavior or commands change', 'docs/EVIDENCE_REPORT.md', 'docs/TRACEABILITY_MATRIX.md', 'docs/NOT_RUN_GATES.md'];
  const reviewGate = context.reviewGate || {};
  const publicationRule = 'Do not push, publish, deploy, or upload source unless the APPROVED scoped Review Gate explicitly authorizes the exact action and destination. Never expose secrets.';

  return [
    '# Codex Control Tower Mission',
    '',
    `Target repository: ${context.targetPath}`,
    `Mission goal: ${phase0.nextMission || phase0.goal || 'Close only the detected governance gaps without unrelated refactoring.'}`,
    `Review gate: ${context.reviewGate?.status || 'AWAITING_HUMAN'}${context.reviewGate?.status === 'APPROVED' ? (context.reviewGate.scopeComplete ? ' (scoped)' : ' (scope incomplete)') : ''}`,
    `Review gate scope: ${reviewGate.scope || 'No approved scope recorded.'}`,
    `Mistake Shield: ${context.mistakeShield?.verdict || 'CAUTION'}`,
    '',
    '## Detected risks',
    formatList(risks, 'No scanner risk was detected; continue to verify scope.'),
    '',
    '## Missing surfaces',
    formatList(missing, 'No required governance surface is currently missing.'),
    '',
    '## Allowed files',
    formatList(allowed, 'Only files explicitly approved by the developer.'),
    '',
    '## Forbidden actions',
    formatList([
      'Do not delete tests, history, user data, or unrelated legacy code.',
      'Do not overwrite existing files without a backup and explicit need.',
      publicationRule,
      'Do not expand scope beyond the mission or bypass a non-approved review gate.',
      ...(context.reviewGate?.forbiddenActions || []).map((item) => `Review Gate forbids: ${item}`),
      ...forbidden.map((item) => `Do not touch without approval: ${item}`)
    ], 'Do not perform destructive or out-of-scope actions.'),
    '',
    '## Required evidence',
    formatList([
      ...evidence,
      'List every changed file and every command actually run.',
      'Attach concrete output or artifact paths for every PASS claim.',
      'Keep WARN, FAIL, NOT_RUN, and SIMULATED labels visible.'
    ], 'Evidence must be agreed before implementation.'),
    '',
    '## Tests to run',
    formatList(tests, 'Report tests as NOT_RUN.'),
    '',
    '## Documentation to update',
    formatList(docs, 'Update only documentation affected by the mission.'),
    '',
    '## Execution contract',
    'You are Codex working under Codex Control Tower. Fix only the listed gaps. Read instructions and plans before editing. Stop before risky implementation unless the local gate is APPROVED, fully scoped, and the proposed action stays within that scope. PASS requires evidence; an edited file is not a validated file. If a check cannot run, label it NOT_RUN and explain why.',
    '',
    '## Final response format',
    '1. Summary',
    '2. Changed files',
    '3. Commands and evidence with PASS/WARN/FAIL/NOT_RUN/SIMULATED',
    '4. Review gate and Mistake Shield state',
    '5. Remaining risks',
    '6. Next safe action'
  ].join('\n');
}

module.exports = { buildCodexPrompt };
