'use strict';

const path = require('node:path');
const { analyzeMemory } = require('../lib/memoryLens');
const { writeJson } = require('../lib/reportWriter');
const { resolveTarget } = require('../lib/safeFs');

async function memoryLensCommand(args) {
  const target = resolveTarget(args.target || '.');
  const result = analyzeMemory(target);
  if (args.out) {
    console.log(`Memory Lens written: ${writeJson(path.resolve(args.out), result)}`);
  } else {
    console.log(JSON.stringify(result, null, 2));
  }
  return result;
}

module.exports = { memoryLensCommand };
