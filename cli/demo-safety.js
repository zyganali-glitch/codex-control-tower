#!/usr/bin/env node
'use strict';

const path = require('node:path');
const { destructivePreflightCommand } = require('./commands/destructive-preflight');

async function main() {
  const root = path.resolve(__dirname, '..');
  return destructivePreflightCommand({
    target: root,
    operation: 'recursive_delete',
    path: '$HOME/..',
    recursive: true,
    force: true,
    source: 'demo_safety',
    out: 'tmp/destructive-preflight.json',
    overwrite: true
  });
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`cct safety demo error: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { main };
