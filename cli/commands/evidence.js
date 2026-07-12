'use strict';

const path = require('node:path');
const { createEvidencePack } = require('../lib/evidenceCollector');
const { resolveTarget } = require('../lib/safeFs');

async function evidenceCommand(args) {
  const target = resolveTarget(args.target || '.');
  const out = path.resolve(args.out || path.join(target, 'evidence-pack'));
  const result = createEvidencePack(target, out);
  console.log(`Evidence pack written: ${result.outDir}`);
  console.log(`Boundary: ${result.report.simulatedData ? 'SIMULATED' : 'REAL_LOCAL_SCAN'}; target tests remain NOT_RUN.`);
  return result;
}

module.exports = { evidenceCommand };
