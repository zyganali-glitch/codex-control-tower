'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { ensureReviewGate, readReviewGate, updateReviewGate } = require('../cli/lib/reviewGate');
const { freshTemp } = require('./helpers');

const target = freshTemp('review-gate');
const initial = ensureReviewGate(target);
assert.equal(initial.status, 'AWAITING_HUMAN');
assert.ok(fs.existsSync(path.join(target, '.controltower', 'review-gate.json')));
const approved = updateReviewGate(target, 'approve', 'Human reviewed the scoped test fixture.');
assert.equal(approved.status, 'APPROVED');
assert.ok(approved.updatedAt);
assert.equal(approved.scopeComplete, false);
const scoped = updateReviewGate(target, 'approve', 'Human reviewed the scoped test fixture.', {
  scope: 'Change the test fixture only.',
  allowedFiles: ['tests/**'],
  forbiddenActions: ['delete tests']
});
assert.equal(scoped.scopeComplete, true);
assert.equal(readReviewGate(target).identityVerified, false);
assert.throws(() => updateReviewGate(target, 'reject', ''), /--note is required/);
console.log('PASS test_review_gate');
