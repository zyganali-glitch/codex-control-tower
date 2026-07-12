'use strict';

// SIMULATED DEMO CODE. No real customer or payment data is processed.
const crypto = require('node:crypto');

function makeId(prefix) {
  return `${prefix}_${crypto.randomUUID()}`;
}

function money(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) throw new TypeError('Amount must be a finite number.');
  return Math.round(numeric * 100) / 100;
}

function nowIso() {
  return new Date().toISOString();
}

module.exports = { makeId, money, nowIso };
