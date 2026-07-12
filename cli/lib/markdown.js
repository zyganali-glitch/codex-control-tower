'use strict';

function escapeCell(value) {
  return String(value ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, '<br>');
}

function table(headers, rows) {
  const head = `| ${headers.map(escapeCell).join(' | ')} |`;
  const rule = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`).join('\n');
  return [head, rule, body].filter(Boolean).join('\n');
}

function bullets(items, empty = '- None detected.') {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : empty;
}

function statusBadge(status, detail) {
  return `**${status}**${detail ? ` — ${detail}` : ''}`;
}

module.exports = { bullets, escapeCell, statusBadge, table };
