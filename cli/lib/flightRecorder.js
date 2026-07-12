'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { ensureDirectory } = require('./safeFs');

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

module.exports = { EVENT_TYPES, appendFlightEvent, readFlightEvents };
