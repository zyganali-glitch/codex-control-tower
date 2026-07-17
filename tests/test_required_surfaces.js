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
  'docs/CODEX_SELF_ASSESSMENT.md', 'docs/CODEX_NATIVE_RECOMMENDATIONS.md', 'docs/FINAL_COMPLETENESS_REVIEW.md', 'docs/ROOT_REPO_SCAN.json',
  'apps/dashboard/src/App.jsx', 'apps/dashboard/src/components/CodexLiveReviewPanel.jsx', 'apps/dashboard/src/sample-report.json', 'apps/dashboard/public/live-report.json',
  'apps/dashboard/src/components/DestructiveActionPreflightPanel.jsx', 'apps/dashboard/src/destructivePreflightAdapter.js',
  'cli/lib/destructiveActionPreflight.js', 'cli/commands/destructive-preflight.js',
  '.codex/hooks.json', '.codex/hooks/destructive-preflight.js', '.controltower/CODEX_HOOK_VERIFICATION.json',
  'tests/test_destructive_action_preflight.js', 'tests/test_destructive_preflight_persistence.js', 'tests/test_destructive_preflight_hook.js',
  'core/en/phase0-questions.json'
];
for (const relative of required) assert.ok(fs.existsSync(path.join(ROOT, relative)), `${relative} missing`);
const beforeRequired = ['package.json', 'README.md', 'src/app.js', 'src/auth.js', 'src/invoices.js', 'src/customers.js', 'src/payments.js', 'src/report.js', 'src/utils.js', 'tests/placeholder.test.js', 'docs/old-notes.md'];
for (const relative of beforeRequired) assert.ok(fs.existsSync(path.join(ROOT, 'examples/messy-saas-before', relative)), `messy ${relative} missing`);
assert.equal(fs.existsSync(path.join(ROOT, 'examples/messy-saas-before/.codex/AGENTS.md')), false, 'messy repo must stay ungoverned');
const governedEvidencePath = path.join(ROOT, 'examples/governed-saas-after/.controltower/governed-test-output.txt');
assert.ok(fs.existsSync(governedEvidencePath), 'governed fixture must retain its target-local raw test output');
const governedReport = JSON.parse(fs.readFileSync(path.join(ROOT, 'examples/governed-saas-after/CONTROL_TOWER_REPORT.json'), 'utf8'));
assert.equal(governedReport.verification.commands[0].evidence, '.controltower/governed-test-output.txt');
assert.equal(governedReport.destructiveActionPreflight.decision, 'BLOCKED');
assert.equal(governedReport.destructiveActionPreflight.executionState, 'NOT_RUN');
assert.equal(governedReport.destructiveActionPreflight.executed, false);
assert.equal(governedReport.destructiveActionPreflight.requestedTarget, '$HOME/..');
assert.equal(governedReport.destructiveActionPreflight.protectedBoundary, '<USER_HOME_PARENT>');
assert.equal(governedReport.destructiveActionPreflight.hookOutcome, 'DENIED');
console.log('PASS test_required_surfaces');
