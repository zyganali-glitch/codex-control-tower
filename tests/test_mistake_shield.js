'use strict';

const assert = require('node:assert/strict');
const { ensureReviewGate, updateReviewGate } = require('../cli/lib/reviewGate');
const { evaluateMistakeShield } = require('../cli/lib/mistakeShield');
const { freshTemp } = require('./helpers');

const target = freshTemp('mistake-shield');
ensureReviewGate(target);
const blocked = evaluateMistakeShield(target, 'Refactor auth and delete old tests');
assert.equal(blocked.verdict, 'BLOCKED');
assert.ok(blocked.reasons.some((reason) => /test evidence/i.test(reason)));
assert.match(blocked.saferNextAction, /APPROVED/);
const caution = evaluateMistakeShield(target, 'Review payment settlement behavior');
assert.equal(caution.verdict, 'BLOCKED');
updateReviewGate(target, 'approve', 'Approve test-only cleanup.', {
  scope: 'Change test fixtures only.',
  allowedFiles: ['tests/**'],
  forbiddenActions: ['change authentication behavior']
});
assert.equal(evaluateMistakeShield(target, 'Refactor authentication').verdict, 'BLOCKED');
updateReviewGate(target, 'approve', 'Approve bounded authentication review.', {
  scope: 'Review authentication without changing public contracts.',
  allowedFiles: ['src/auth.js', 'tests/auth.test.js'],
  forbiddenActions: ['delete tests']
});
assert.equal(evaluateMistakeShield(target, 'Review authentication').verdict, 'CAUTION');
console.log('PASS test_mistake_shield');
