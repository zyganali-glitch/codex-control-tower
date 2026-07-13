'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT } = require('./helpers');

const packageJson = require('../package.json');
const activeMetadata = JSON.stringify(packageJson).toLowerCase();
assert.equal(activeMetadata.includes('universal-agent-os'), false, 'active package must not depend on a lineage package');
const protection = fs.readFileSync(path.join(ROOT, 'docs', 'SOURCE_PROTECTION.md'), 'utf8');
for (const url of ['https://github.com/zyganali-glitch/Universal-Agent-OS']) {
  assert.match(protection, new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
}
const docs = fs.readdirSync(path.join(ROOT, 'docs')).filter((name) => name.endsWith('.md')).map((name) => fs.readFileSync(path.join(ROOT, 'docs', name), 'utf8')).join('\n');
assert.doesNotMatch(docs, /production-ready guaranteed/i);
assert.doesNotMatch(docs, /Codex is (conscious|self-aware|sentient)/i);
const portableDemoArtifacts = [
  'apps/dashboard/src/sample-report.json',
  'apps/dashboard/public/live-report.json',
  'examples/governed-saas-after/CONTROL_TOWER_REPORT.json',
  'examples/demo-report/after-report.json',
  'examples/governed-saas-after/.controltower/codex-live-events.jsonl',
  'examples/governed-saas-after/.controltower/codex-live-review-record.json'
].map((relative) => fs.readFileSync(path.join(ROOT, relative), 'utf8')).join('\n');
assert.doesNotMatch(portableDemoArtifacts, /(?:[A-Za-z]:\\Users\\[^\\]+|\/(?:home|Users)\/[^/]+)/i, 'committed demo reports must not expose builder-specific absolute paths');
console.log('PASS test_source_protection');
