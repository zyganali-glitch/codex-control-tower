'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { COMMANDS, HELP, parseArgs } = require('../cli/index');
const { ROOT } = require('./helpers');

const packageJson = require('../package.json');
assert.equal(packageJson.name, 'codex-control-tower');
assert.equal(packageJson.bin.cct, 'cli/index.js');
for (const command of ['init', 'phase0', 'scan', 'health', 'doctor', 'evidence', 'context-graph', 'codex-review', 'review-gate', 'mistake-shield', 'memory-lens', 'flight-recorder', 'export-devpost', 'demo']) {
  assert.equal(typeof COMMANDS[command], 'function', `${command} must be routed`);
  assert.match(HELP, new RegExp(command.replace('-', '\\-')));
}
assert.deepEqual(parseArgs(['--target', '.', '--strict', '--out', 'report.json']), { _: [], target: '.', strict: true, out: 'report.json' });
const output = execFileSync(process.execPath, [path.join(ROOT, 'cli', 'index.js'), '--help'], { encoding: 'utf8' });
assert.match(output, /Codex Control Tower/);
assert.match(output, /codex-review/);
console.log('PASS test_cli_commands');
