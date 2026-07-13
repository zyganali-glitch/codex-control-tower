'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { phase0Command, FALLBACK_QUESTIONS } = require('../cli/commands/phase0');
const { ROOT, freshTemp, readJson } = require('./helpers');

(async () => {
  assert.equal(FALLBACK_QUESTIONS.en.length, 8);
  const enTemplate = readJson(path.join(ROOT, 'core', 'en', 'phase0-questions.json'));
  assert.equal((enTemplate.questions || enTemplate).length, 8);
  const target = freshTemp('phase0');
  fs.mkdirSync(path.join(target, 'src'));
  const result = await phase0Command({ target, locale: 'en', demo: true });
  const data = readJson(path.join(target, '.controltower', 'phase0.json'));
  assert.equal(result.simulated, true);
  assert.equal(data.locale, 'en');
  assert.match(data.codexMissionPrompt, /Mission goal/);
  assert.match(data.codexMissionPrompt, /Detected risks/);
  assert.match(data.codexMissionPrompt, /Required evidence/);
  assert.match(data.codexMissionPrompt, /Forbidden actions/);
  assert.ok(fs.existsSync(path.join(target, 'plans', 'PHASE0_ALIGNMENT.md')));
  await assert.rejects(() => phase0Command({ target, locale: 'tr', demo: true }), /English-only/);
  console.log('PASS test_phase0');
})().catch((error) => { console.error(error); process.exitCode = 1; });
