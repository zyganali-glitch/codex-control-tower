'use strict';

const path = require('node:path');
const { GATE_STATES } = require('./constants');
const { readJson, writeJsonSafe } = require('./safeFs');

function defaultGate() {
  return {
    status: 'AWAITING_HUMAN',
    note: 'Human review has not been recorded.',
    updatedAt: null,
    decidedBy: null,
    localFileGate: true,
    identityVerified: false,
    scope: null,
    allowedFiles: [],
    forbiddenActions: [],
    scopeComplete: false
  };
}

function list(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  return String(value || '').split(',').map((item) => item.trim()).filter(Boolean);
}

function normalizeGate(value, exists) {
  const decisionRecorded = Boolean(
    exists && ['APPROVED', 'REJECTED', 'BLOCKED'].includes(value.status)
    && String(value.note || '').trim() && (value.updatedAt || value.approvedAt)
  );
  const gate = {
    ...defaultGate(),
    ...value,
    allowedFiles: list(value.allowedFiles),
    forbiddenActions: list(value.forbiddenActions),
    exists,
    decisionRecorded
  };
  gate.scopeComplete = Boolean(
    gate.status === 'APPROVED' && String(gate.note || '').trim() && String(gate.scope || '').trim()
    && gate.allowedFiles.length && gate.forbiddenActions.length && decisionRecorded
  );
  return gate;
}

function readReviewGate(target) {
  const file = path.join(target, '.controltower', 'review-gate.json');
  const value = readJson(file, null);
  if (!value || !GATE_STATES.includes(value.status)) {
    return normalizeGate(defaultGate(), false);
  }
  return normalizeGate(value, true);
}

function updateReviewGate(target, action, note = '', metadata = {}) {
  const actionMap = {
    approve: 'APPROVED',
    reject: 'REJECTED',
    reset: 'AWAITING_HUMAN',
    block: 'BLOCKED'
  };
  const status = actionMap[action];
  if (!status) throw new Error(`Unsupported review-gate action: ${action}`);
  if (['approve', 'reject', 'block'].includes(action) && !String(note).trim()) {
    throw new Error(`--note is required when the gate is ${action}d.`);
  }
  const gate = {
    status,
    note: String(note || 'Gate reset; human review is required.').trim(),
    updatedAt: new Date().toISOString(),
    decidedBy: status === 'AWAITING_HUMAN' ? null : 'local-human-command',
    localFileGate: true,
    identityVerified: false,
    scope: status === 'AWAITING_HUMAN' ? null : String(metadata.scope || note).trim(),
    allowedFiles: status === 'AWAITING_HUMAN' ? [] : list(metadata.allowedFiles),
    forbiddenActions: status === 'AWAITING_HUMAN' ? [] : list(metadata.forbiddenActions).length
      ? list(metadata.forbiddenActions)
      : ['destructive actions outside the recorded scope']
  };
  writeJsonSafe(target, '.controltower/review-gate.json', gate, { overwrite: true, backup: true });
  return normalizeGate(gate, true);
}

function ensureReviewGate(target) {
  const current = readReviewGate(target);
  if (current.exists) return current;
  const gate = defaultGate();
  writeJsonSafe(target, '.controltower/review-gate.json', gate);
  return normalizeGate(gate, true);
}

module.exports = { defaultGate, ensureReviewGate, readReviewGate, updateReviewGate };
