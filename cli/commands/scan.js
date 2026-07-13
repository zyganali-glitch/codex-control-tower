'use strict';

const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { scanRepository } = require('../lib/repoScanner');
const { writeJson } = require('../lib/reportWriter');

function portableValue(value, target) {
  if (typeof value === 'string') {
    return value
      .replaceAll(target, '.')
      .replaceAll(target.split(path.sep).join('/'), '.');
  }
  if (Array.isArray(value)) return value.map((item) => portableValue(item, target));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portableValue(item, target)]));
  }
  return value;
}

function gitProvenance(target) {
  try {
    const gitCommit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: target, encoding: 'utf8', windowsHide: true }).trim();
    const status = execFileSync('git', ['status', '--porcelain'], { cwd: target, encoding: 'utf8', windowsHide: true }).trim();
    return { gitCommit, worktreeAtScan: status ? 'DIRTY' : 'CLEAN' };
  } catch {
    return { gitCommit: null, worktreeAtScan: 'UNKNOWN' };
  }
}

async function scanCommand(args) {
  const target = path.resolve(args.target || '.');
  let report = scanRepository(target);
  if (args.portable) {
    report = portableValue({
      ...report,
      provenance: {
        generatedBy: 'cct scan --portable',
        ...gitProvenance(target)
      }
    }, target);
  }
  if (args.out) {
    const destination = writeJson(path.resolve(args.out), report);
    console.log(`Scan report written: ${destination}`);
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  return report;
}

module.exports = { portableValue, scanCommand };
