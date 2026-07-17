'use strict';

const { readReviewGate } = require('./reviewGate');
const { analyzeMemory } = require('./memoryLens');
const { analyzeDestructiveAction, parseDestructiveCommand } = require('./destructiveActionPreflight');

const DESTRUCTIVE = /\b(delete|remove|drop|truncate|overwrite|reset|destroy|purge)\b/i;
const TEST_AREA = /\b(test|tests|spec|coverage)\b/i;
const HIGH_RISK_AREA = /\b(auth|authentication|authorization|permission|payment|billing|invoice|migration|secret|credential)\b/i;

function meaningfulWords(value) {
  return String(value || '').toLowerCase().split(/\W+/).filter((word) => word.length >= 5);
}

function overlaps(left, right, minimum = 1) {
  const rightWords = new Set(meaningfulWords(right));
  return meaningfulWords(left).filter((word) => rightWords.has(word)).length >= minimum;
}

function evaluateMistakeShield(target, action, options = {}) {
  const proposedAction = String(action || '').trim();
  const gate = options.reviewGate || readReviewGate(target);
  const memory = options.memoryLens || analyzeMemory(target);
  const riskFlags = options.riskFlags || [];
  const reasons = [];
  let verdict = 'CLEAR';
  let destructivePreflight = null;

  const parsedCommand = options.preflightInput
    ? null
    : parseDestructiveCommand(proposedAction);
  const preflightInput = options.preflightInput || (parsedCommand?.matched ? {
    operation: parsedCommand.operation,
    requestedTarget: parsedCommand.requestedTarget,
    currentWorkingDirectory: options.currentWorkingDirectory || target,
    repositoryRoot: target,
    platform: options.platform || process.platform,
    recursive: parsedCommand.recursive,
    force: parsedCommand.force,
    source: parsedCommand.source || 'raw_command'
  } : null);

  if (preflightInput) {
    destructivePreflight = analyzeDestructiveAction({
      currentWorkingDirectory: options.currentWorkingDirectory || target,
      repositoryRoot: target,
      platform: options.platform || process.platform,
      source: 'mistake_shield',
      ...preflightInput
    }, {
      homeDirectory: options.homeDirectory,
      now: options.now,
      inspectPath: options.inspectPath,
      symlinkPaths: options.symlinkPaths,
      preflightReasonCodes: parsedCommand?.supported === false ? parsedCommand.reasonCodes : []
    });
    if (destructivePreflight.decision === 'BLOCKED') verdict = 'BLOCKED';
    else if (verdict === 'CLEAR') verdict = 'CAUTION';
    reasons.push(...destructivePreflight.reasons.map((reason) => `Destructive Action Preflight: ${reason}`));
  }

  if (!proposedAction) {
    verdict = 'CAUTION';
    reasons.push('No proposed action was supplied, so scope cannot be compared with known risks.');
  }
  if (DESTRUCTIVE.test(proposedAction) && (gate.status !== 'APPROVED' || !gate.scopeComplete)) {
    verdict = 'BLOCKED';
    reasons.push(`A destructive verb was detected while the local review gate is ${gate.status}${gate.status === 'APPROVED' && !gate.scopeComplete ? ' but its scope is incomplete' : ''}.`);
  }
  if (DESTRUCTIVE.test(proposedAction) && TEST_AREA.test(proposedAction)) {
    verdict = 'BLOCKED';
    reasons.push('Removing test evidence can hide regressions and requires explicit, scoped approval.');
  }
  const forbiddenMatch = (gate.forbiddenActions || []).find((rule) => overlaps(proposedAction, rule, meaningfulWords(rule).length > 1 ? 2 : 1));
  if (forbiddenMatch) {
    verdict = 'BLOCKED';
    reasons.push(`The proposed action overlaps a Review Gate prohibition: ${forbiddenMatch}`);
  }
  if (HIGH_RISK_AREA.test(proposedAction) && verdict !== 'BLOCKED') {
    if (gate.status !== 'APPROVED' || !gate.scopeComplete) {
      verdict = 'BLOCKED';
      reasons.push(`The action touches a high-risk area without a complete APPROVED scope; gate state is ${gate.status}.`);
    } else if (!overlaps(proposedAction, `${gate.scope || ''} ${(gate.allowedFiles || []).join(' ')}`)) {
      verdict = 'BLOCKED';
      reasons.push('The high-risk area is not named in the approved scope or allowed-file patterns.');
    } else {
      verdict = 'CAUTION';
      reasons.push('The action touches an authentication, payment, credential, or migration risk area inside an approved scope.');
    }
  }

  const matchedRisks = riskFlags.filter((risk) => {
    const haystack = `${risk.issue || ''} ${(risk.files || []).join(' ')}`.toLowerCase();
    return proposedAction.toLowerCase().split(/\W+/).some((word) => word.length > 4 && haystack.includes(word));
  }).slice(0, 5);
  if (matchedRisks.length && verdict === 'CLEAR') verdict = 'CAUTION';
  reasons.push(...matchedRisks.map((risk) => `Matched known risk: ${risk.issue}`));

  const matchedLessons = memory.neverForgetRisks.filter((lesson) => {
    const words = proposedAction.toLowerCase().split(/\W+/).filter((word) => word.length > 4);
    return words.some((word) => lesson.toLowerCase().includes(word));
  }).slice(0, 3);
  if (matchedLessons.length && verdict === 'CLEAR') verdict = 'CAUTION';
  reasons.push(...matchedLessons.map((lesson) => `Matched memory: ${lesson}`));
  if (!reasons.length) reasons.push('No destructive verb or known minefield overlap was detected.');

  const saferNextAction = destructivePreflight && (destructivePreflight.decision === 'BLOCKED' || verdict === 'CAUTION')
    ? destructivePreflight.saferNextAction
    : verdict === 'BLOCKED'
      ? 'Narrow the change, preserve tests, record a plan, and obtain an APPROVED local review gate with a note.'
    : verdict === 'CAUTION'
      ? 'Inspect the listed risk files, define allowed files and evidence, then request review before changing behavior.'
      : 'Proceed only within the declared scope and record commands, evidence, NOT_RUN checks, and remaining risk.';

  return {
    verdict,
    proposedAction,
    reasons: [...new Set(reasons)],
    matchedLessons,
    gateStatus: gate.status,
    saferNextAction,
    checkedAt: new Date().toISOString(),
    deterministic: true,
    ...(destructivePreflight ? { destructivePreflight } : {})
  };
}

module.exports = { evaluateMistakeShield };
