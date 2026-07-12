'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { GOVERNANCE_PROFILES } = require('../lib/constants');
const { ensureReviewGate } = require('../lib/reviewGate');
const { readJson, resolveTarget, writeFileSafe, writeJsonSafe } = require('../lib/safeFs');

function governanceFiles(profile, locale, brownfield) {
  const now = new Date().toISOString();
  return {
    '.codex/AGENTS.md': `# Codex Control Tower Instructions\n\nProfile: ${profile}\nLocale: ${locale}\n\n- Read the roadmap, Phase-0 alignment, memory lens, and review gate before editing.\n- Work only within explicitly allowed files and preserve unrelated user changes.\n- Do not perform destructive work while the local gate is not APPROVED.\n- PASS requires command or artifact evidence. Keep WARN, FAIL, NOT_RUN, and SIMULATED visible.\n- Record changed files, commands, remaining risks, and the next safe action.\n`,
    'plans/master-roadmap.md': '# Master Roadmap\n\nStatus: ALIGNMENT_REQUIRED\n\n## Mission\n\nDefine the next approved Codex mission before implementation.\n\n## Acceptance\n\n- [ ] Scope and allowed files are explicit.\n- [ ] Review state is recorded.\n- [ ] Tests and evidence expectations are listed.\n- [ ] NOT_RUN checks remain visible.\n',
    'docs/EVIDENCE_REPORT.md': '# Evidence Report\n\n**NOT_RUN** — no implementation validation has been recorded yet.\n',
    'docs/TRACEABILITY_MATRIX.md': '# Traceability Matrix\n\n| Requirement | Implementation | Evidence | Status |\n| --- | --- | --- | --- |\n| Define the next mission | plans/master-roadmap.md | Pending | NOT_RUN |\n',
    'docs/NOT_RUN_GATES.md': '# NOT_RUN Gates\n\n- **NOT_RUN** — project tests\n- **NOT_RUN** — CI\n- **NOT_RUN** — security review\n',
    'docs/TECH_DEBT_DELTA.md': '# Technical Debt Delta\n\n**WARN** — baseline captured; no approved implementation delta exists yet.\n',
    'docs/MEMORY_LENS.md': '# Memory Lens\n\n## Never-forget rules\n\n- Preserve unrelated files and existing tests.\n- Require evidence before PASS.\n- Treat authentication and payment changes as high risk.\n',
    'docs/MISTAKE_SHIELD.md': '# Mistake Shield\n\nInitial verdict: **CAUTION**\n\nReview the proposed action against project minefields and the local review gate.\n',
    ...(brownfield ? {
      'TECH_DEBT_AND_SECURITY.md': '# Technical Debt and Security Quarantine\n\nThis existing repository was detected as brownfield. Authentication, payments, migrations, secrets, data deletion, and legacy tests are quarantined until an approved plan and focused evidence exist.\n'
    } : {})
  };
}

async function initCommand(args) {
  const target = resolveTarget(args.target || '.');
  const profile = String(args.profile || 'startup').toLowerCase();
  const locale = String(args.locale || 'en').toLowerCase();
  if (!GOVERNANCE_PROFILES.includes(profile) || profile === 'light') {
    throw new Error('Profile must be solo, startup, enterprise, or regulated.');
  }
  if (!['en', 'tr'].includes(locale)) throw new Error('Locale must be en or tr.');
  const existing = fs.readdirSync(target).filter((name) => !['.git', '.controltower'].includes(name));
  const brownfield = existing.length > 0;
  const timestamp = new Date().toISOString();
  const results = [];

  for (const [relative, content] of Object.entries(governanceFiles(profile, locale, brownfield))) {
    results.push(writeFileSafe(target, relative, content));
  }
  fs.mkdirSync(path.join(target, 'plans', 'completed'), { recursive: true });

  const configFile = path.join(target, '.controltower', 'config.json');
  const previous = readJson(configFile, {});
  const config = {
    ...previous,
    product: 'Codex Control Tower',
    version: '0.1.0',
    profile,
    locale,
    codexAdapter: args.codex !== false,
    localFirst: true,
    telemetry: false,
    initializedAt: previous.initializedAt || timestamp,
    updatedAt: timestamp,
    brownfield
  };
  results.push(writeJsonSafe(target, '.controltower/config.json', config, { overwrite: true, backup: Boolean(Object.keys(previous).length) }));
  ensureReviewGate(target);
  results.push(writeFileSafe(target, '.controltower/flight-recorder.jsonl', ''));
  console.log(`Control Tower initialized in ${target}`);
  console.log(`Profile: ${profile}; locale: ${locale}; brownfield: ${brownfield}`);
  console.log(`Created: ${results.filter((item) => item.status === 'CREATED').length}; preserved: ${results.filter((item) => item.status === 'PRESERVED').length}`);
  return { target, profile, locale, brownfield, results };
}

module.exports = { initCommand };
