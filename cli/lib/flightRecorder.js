'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { assertNoSymlinkTraversal, ensureDirectory, ensureInside } = require('./safeFs');

const EVENT_TYPES = ['PROMPT', 'PLAN', 'CHANGE', 'TEST', 'EVIDENCE', 'NOT_RUN', 'RISK', 'APPROVAL', 'BLOCKED'];

function appendFlightEvent(target, type, message, source = 'cct-cli', extra = {}) {
  const normalizedType = String(type || '').toUpperCase();
  if (!EVENT_TYPES.includes(normalizedType)) {
    throw new Error(`Unsupported event type: ${type}. Use ${EVENT_TYPES.join(', ')}.`);
  }
  if (!String(message || '').trim()) throw new Error('Flight recorder --message cannot be empty.');
  const event = {
    timestamp: new Date().toISOString(),
    type: normalizedType,
    message: String(message).trim(),
    source,
    ...extra
  };
  const file = path.join(target, '.controltower', 'flight-recorder.jsonl');
  ensureInside(target, file);
  assertNoSymlinkTraversal(target, file);
  ensureDirectory(path.dirname(file));
  fs.appendFileSync(file, `${JSON.stringify(event)}\n`, 'utf8');
  return event;
}

function readFlightEvents(target) {
  const file = path.join(target, '.controltower', 'flight-recorder.jsonl');
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean).flatMap((line) => {
    try { return [JSON.parse(line)]; } catch { return []; }
  });
}

function appendPreflightEvent(target, preflight, source = 'cct-destructive-preflight') {
  if (!preflight || !['BLOCKED', 'CAUTION'].includes(preflight.decision)) {
    throw new Error('A BLOCKED or CAUTION destructive preflight result is required.');
  }
  const type = preflight.decision === 'BLOCKED' ? 'BLOCKED' : 'RISK';
  return appendFlightEvent(
    target,
    type,
    `${preflight.operation} resolved to ${preflight.protectedBoundary}; execution remained NOT_RUN.`,
    source,
    {
      status: preflight.decision,
      executionState: 'NOT_RUN',
      executed: false,
      destructiveActionPreflight: preflight
    }
  );
}

module.exports = { EVENT_TYPES, appendFlightEvent, appendPreflightEvent, readFlightEvents };
