'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT } = require('./helpers');

const packageJson = require('../package.json');
const activeMetadata = JSON.stringify(packageJson).toLowerCase();
for (const fragment of ['universal-agent-os-uipath', 'universal-agent-os-gitlab-edition', 'universal-agent-os-qwen']) {
  assert.equal(activeMetadata.includes(fragment), false, `active package references ${fragment}`);
}
const protection = fs.readFileSync(path.join(ROOT, 'docs', 'SOURCE_PROTECTION.md'), 'utf8');
for (const url of ['https://github.com/zyganali-glitch/Universal-Agent-OS', 'https://github.com/zyganali-glitch/universal-agent-os-uipath', 'https://gitlab.com/zyganali/universal-agent-os-gitlab-edition', 'https://gitlab.com/zyganali/universal-agent-os-qwen']) {
  assert.match(protection, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}
const docs = fs.readdirSync(path.join(ROOT, 'docs')).filter((name) => name.endsWith('.md')).map((name) => fs.readFileSync(path.join(ROOT, 'docs', name), 'utf8')).join('\n');
assert.doesNotMatch(docs, /production-ready guaranteed/i);
assert.doesNotMatch(docs, /Codex is (conscious|self-aware|sentient)/i);
const portableDemoArtifacts = [
  'apps/dashboard/src/sample-report.json',
  'examples/governed-saas-after/CONTROL_TOWER_REPORT.json',
  'examples/demo-report/after-report.json'
].map((relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8')).join('\n');
assert.doesNotMatch(portableDemoArtifacts, /(?:[A-Za-z]:\\Users\\[^\\]+|\/(?:home|Users)\/[^/]+)/i, 'committed demo reports must not expose builder-specific absolute paths');
console.log('PASS test_source_protection');
