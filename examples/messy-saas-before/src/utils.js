// SIMULATED DEMO CODE. Intentionally simplistic for the messy-before fixture.

function makeId(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function money(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

function nowIso() {
  return new Date().toISOString();
}

module.exports = { makeId, money, nowIso };
