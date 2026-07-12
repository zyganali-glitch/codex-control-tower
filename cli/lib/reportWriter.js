'use strict';

const path = require('node:path');
const { writeGeneratedFile } = require('./safeFs');

function writeJson(destination, value) {
  return writeGeneratedFile(path.resolve(destination), `${JSON.stringify(value, null, 2)}\n`);
}

function writeMarkdown(destination, value) {
  const normalized = String(value).endsWith('\n') ? String(value) : `${value}\n`;
  return writeGeneratedFile(path.resolve(destination), normalized);
}

module.exports = { writeJson, writeMarkdown };
