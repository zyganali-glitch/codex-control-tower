'use strict';

const path = require('node:path');
const { scanRepository } = require('../lib/repoScanner');
const { writeJson } = require('../lib/reportWriter');

async function scanCommand(args) {
  const report = scanRepository(args.target || '.');
  if (args.out) {
    const destination = writeJson(path.resolve(args.out), report);
    console.log(`Scan report written: ${destination}`);
  } else {
    console.log(JSON.stringify(report, null, 2));
  }
  return report;
}

module.exports = { scanCommand };
