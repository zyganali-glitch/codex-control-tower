'use strict';

const path = require('node:path');
const { scanRepository } = require('../lib/repoScanner');
const { writeJson } = require('../lib/reportWriter');

async function contextGraphCommand(args) {
  const report = scanRepository(args.target || '.');
  if (args.out) {
    const destination = writeJson(path.resolve(args.out), report.contextGraph);
    console.log(`Context Graph written: ${destination}`);
  } else {
    console.log(JSON.stringify(report.contextGraph, null, 2));
  }
  return report.contextGraph;
}

module.exports = { contextGraphCommand };
