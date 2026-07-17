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
const legacyDestructive = evaluateMistakeShield(target, 'Delete generated cache');
assert.equal(legacyDestructive.verdict, 'CAUTION');
assert.equal(Object.prototype.hasOwnProperty.call(legacyDestructive, 'destructivePreflight'), false);
assert.ok(legacyDestructive.reasons.some((reason) => /no supported structured target analysis/iu.test(reason)));
const redactedLegacy = evaluateMistakeShield('C:\\Users\\Fixture\\work\\repo', 'delete C:\\Users\\Fixture\\private-note', {
  reviewGate: { status: 'AWAITING_HUMAN', scopeComplete: false, allowedFiles: [], forbiddenActions: [] },
  memoryLens: { neverForgetRisks: [] }, riskFlags: [], platform: 'win32', homeDirectory: 'C:\\Users\\Fixture'
});
assert.equal(redactedLegacy.verdict, 'BLOCKED');
assert.match(redactedLegacy.proposedAction, /<USER_HOME>/u);
assert.doesNotMatch(JSON.stringify(redactedLegacy), /Users[\\/]Fixture/iu);
console.log('PASS test_mistake_shield');
