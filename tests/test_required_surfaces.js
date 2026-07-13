'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ROOT } = require('./helpers');

const required = [
  'README.md', 'package.json', 'LICENSE', 'CHANGELOG.md', '.github/workflows/ci.yml',
  'docs/DEVPOST_SUBMISSION.md', 'docs/DEMO_SCRIPT.md', 'docs/JUDGING_MAP.md', 'docs/CODEX_BUILD_LOG.md',
  'docs/DEMO_REHBERI_TR.md', 'cli/commands/codex-review.js', 'tests/test_codex_review.js',
  'docs/SOURCE_PROTECTION.md', 'docs/SOURCE_RESEARCH_MATRIX.md', 'docs/FEATURE_HARVEST.md', 'docs/ORIGINALITY_MATRIX.md',
  'docs/CODEX_SELF_ASSESSMENT.md', 'docs/CODEX_NATIVE_RECOMMENDATIONS.md', 'docs/FINAL_COMPLETENESS_REVIEW.md',
  'apps/dashboard/src/App.jsx', 'apps/dashboard/src/components/CodexLiveReviewPanel.jsx', 'apps/dashboard/src/sample-report.json', 'apps/dashboard/public/live-report.json',
  'core/en/phase0-questions.json'
];
for (const relative of required) assert.ok(fs.existsSync(path.join(ROOT, relative)), `${relative} missing`);
const beforeRequired = ['package.json', 'README.md', 'src/app.js', 'src/auth.js', 'src/invoices.js', 'src/customers.js', 'src/payments.js', 'src/report.js', 'src/utils.js', 'tests/placeholder.test.js', 'docs/old-notes.md'];
for (const relative of beforeRequired) assert.ok(fs.existsSync(path.join(ROOT, 'examples/messy-saas-before', relative)), `messy ${relative} missing`);
assert.equal(fs.existsSync(path.join(ROOT, 'examples/messy-saas-before/.codex/AGENTS.md')), false, 'messy repo must stay ungoverned');
console.log('PASS test_required_surfaces');
