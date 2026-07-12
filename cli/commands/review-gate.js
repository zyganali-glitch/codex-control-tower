'use strict';

const { ensureReviewGate, updateReviewGate } = require('../lib/reviewGate');
const { resolveTarget } = require('../lib/safeFs');

async function reviewGateCommand(args) {
  const target = resolveTarget(args.target || '.');
  let gate;
  const metadata = { scope: args.scope, allowedFiles: args.allow, forbiddenActions: args.forbid };
  if (args.approve) gate = updateReviewGate(target, 'approve', args.note, metadata);
  else if (args.reject) gate = updateReviewGate(target, 'reject', args.note, metadata);
  else if (args.reset) gate = updateReviewGate(target, 'reset', args.note);
  else if (args.block) gate = updateReviewGate(target, 'block', args.note);
  else gate = ensureReviewGate(target);
  console.log(`Review Gate: ${gate.status}`);
  console.log(`Note: ${gate.note || 'No note.'}`);
  if (gate.status === 'APPROVED') console.log(`Scope: ${gate.scopeComplete ? 'COMPLETE' : 'INCOMPLETE — add --scope, --allow, and --forbid for risky work'}`);
  console.log('Boundary: local file-based approval; identity is not verified.');
  return gate;
}

module.exports = { reviewGateCommand };
