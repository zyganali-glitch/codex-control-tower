'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { COMMANDS, HELP, parseArgs } = require('../cli/index');
const { portableValue } = require('../cli/commands/scan');
const { scanRepository } = require('../cli/lib/repoScanner');
const { ROOT } = require('./helpers');

const packageJson = require('../package.json');
assert.equal(packageJson.name, 'codex-control-tower');
assert.equal(packageJson.bin.cct, 'cli/index.js');
for (const command of ['init', 'phase0', 'scan', 'health', 'doctor', 'evidence', 'context-graph', 'codex-review', 'review-gate', 'mistake-shield', 'memory-lens', 'flight-recorder', 'export-devpost', 'demo']) {
  assert.equal(typeof COMMANDS[command], 'function', `${command} must be routed`);
  assert.match(HELP, new RegExp(command.replace('-', '\\-')));
}
assert.deepEqual(parseArgs(['--target', '.', '--strict', '--portable', '--out', 'report.json']), { _: [], target: '.', strict: true, portable: true, out: 'report.json' });
assert.deepEqual(
  portableValue({ targetPath: 'C:\\Users\\Builder\\repo', nested: ['C:/Users/Builder/repo/file.js'] }, 'C:\\Users\\Builder\\repo'),
  { targetPath: '.', nested: ['./file.js'] }
);
assert.deepEqual(
  portableValue({ targetPath: 'C:/Users/Builder/repo', nested: ['C:\\Users\\Builder\\repo\\file.js'] }, 'C:/Users/Builder/repo'),
  { targetPath: '.', nested: ['./file.js'] }
);
assert.deepEqual(
  portableValue({ targetPath: '/home/builder/repo', nested: ['/home/builder/repo/file.js'] }, '/home/builder/repo'),
  { targetPath: '.', nested: ['./file.js'] }
);
const rootScan = scanRepository(ROOT);
assert.equal(rootScan.scanMode, 'REAL_LOCAL_SCAN');
assert.equal(rootScan.simulatedData, false);
assert.equal(rootScan.projectName, 'codex-control-tower');
assert.ok(rootScan.score >= 75, `real root repository scan should remain reviewable, received ${rootScan.score}`);
const output = execFileSync(process.execPath, [path.join(ROOT, 'cli', 'index.js'), '--help'], { encoding: 'utf8' });
assert.match(output, /Codex Control Tower/);
assert.match(output, /codex-review/);
console.log('PASS test_cli_commands');
