'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { initCommand } = require('./init');
const { phase0Command } = require('./phase0');
const { createEvidencePack } = require('../lib/evidenceCollector');
const { appendFlightEvent } = require('../lib/flightRecorder');
const { evaluateMistakeShield } = require('../lib/mistakeShield');
const { scanRepository } = require('../lib/repoScanner');
const { updateReviewGate } = require('../lib/reviewGate');
const { copyDirectory, ensureDirectory, resetDemoDirectory, writeGeneratedFile } = require('../lib/safeFs');

function portableString(value, root) {
  return String(value).replaceAll(root, '.').replaceAll(root.split(path.sep).join('/'), '.');
}

function portableValue(value, root) {
  if (typeof value === 'string') return portableString(value, root);
  if (Array.isArray(value)) return value.map((item) => portableValue(item, root));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portableValue(item, root)]));
  }
  return value;
}

function writePortableJson(destination, value, root) {
  return writeGeneratedFile(destination, `${JSON.stringify(portableValue(value, root), null, 2)}\n`);
}

function sanitizeGeneratedPack(files, root) {
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    if (path.extname(file).toLowerCase() === '.json') {
      writePortableJson(file, JSON.parse(text), root);
    } else {
      writeGeneratedFile(file, portableString(text, root));
    }
  }
}

async function demoCommand() {
  const root = path.resolve(__dirname, '..', '..');
  const source = path.join(root, 'examples', 'messy-saas-before');
  const workspace = path.join(root, 'examples', 'demo-workspace');
  const reportDir = path.join(root, 'examples', 'demo-report');
  resetDemoDirectory(root, workspace);
  copyDirectory(source, workspace);
  ensureDirectory(reportDir);

  const before = scanRepository(workspace, { simulatedData: true });
  const beforeShield = evaluateMistakeShield(workspace, 'Refactor auth and delete old tests', {
    reviewGate: before.reviewGate,
    memoryLens: before.memoryLens,
    riskFlags: before.riskFlags
  });
  before.mistakeShield = beforeShield;
  writePortableJson(path.join(reportDir, 'before-report.json'), before, root);
  writePortableJson(path.join(reportDir, 'before-context-graph.json'), before.contextGraph, root);
  writePortableJson(path.join(reportDir, 'before-mistake-shield.json'), beforeShield, root);

  await phase0Command({ target: workspace, locale: 'en', demo: true });
  await initCommand({ target: workspace, profile: 'startup', locale: 'en', codex: true });
  appendFlightEvent(workspace, 'PROMPT', 'SIMULATED InvoiceFlow Mini Phase-0 mission generated.', 'cct-demo', { simulated: true });
  appendFlightEvent(workspace, 'PLAN', 'SIMULATED governance surfaces planned; product behavior remains out of scope.', 'cct-demo', { simulated: true });
  const gate = updateReviewGate(workspace, 'approve', 'SIMULATED demo approval for governance-only changes.', {
    scope: 'Install and record Control Tower governance surfaces in the controlled demo workspace.',
    allowedFiles: ['.codex/**', '.controltower/**', 'plans/**', 'docs/**', 'TECH_DEBT_AND_SECURITY.md'],
    forbiddenActions: ['delete tests', 'change auth behavior', 'change payment behavior', 'write outside the demo workspace']
  });
  appendFlightEvent(workspace, 'APPROVAL', `Local demo gate changed to ${gate.status}.`, 'cct-demo', { simulated: true });
  appendFlightEvent(workspace, 'NOT_RUN', 'InvoiceFlow Mini behavior tests were not executed by the demo orchestrator.', 'cct-demo', { simulated: true });

  const evidence = createEvidencePack(workspace, path.join(reportDir, 'evidence-pack'), { simulatedData: true });
  sanitizeGeneratedPack(evidence.files, root);
  appendFlightEvent(workspace, 'EVIDENCE', 'SIMULATED demo evidence pack generated; target tests remain NOT_RUN.', 'cct-demo', { simulated: true });
  const workspaceAfter = scanRepository(workspace, { simulatedData: true });
  writePortableJson(path.join(reportDir, 'workspace-after-report.json'), workspaceAfter, root);

  const governed = path.join(root, 'examples', 'governed-saas-after');
  const governedTest = spawnSync(process.execPath, ['--test', path.join(governed, 'tests', 'invoiceflow.test.js')], {
    cwd: governed,
    encoding: 'utf8',
    windowsHide: true
  });
  const testOutput = `${governedTest.stdout || ''}${governedTest.stderr || ''}`;
  const testEvidenceFile = path.join(reportDir, 'governed-test-output.txt');
  writeGeneratedFile(testEvidenceFile, portableString(`Generated: ${new Date().toISOString()}\nCommand: node --test tests/invoiceflow.test.js\nExit code: ${governedTest.status}\n\n${testOutput}`, root));
  if (governedTest.status !== 0) {
    throw new Error(`Governed InvoiceFlow fixture test failed. See ${testEvidenceFile}`);
  }
  const testCountMatch = testOutput.match(/(?:#|ℹ)?\s*tests\s+(\d+)/i);
  const testCount = testCountMatch ? Number(testCountMatch[1]) : null;
  const after = scanRepository(governed, { simulatedData: true });
  after.evidenceStatus.tests = {
    status: 'PASS',
    evidence: ['node --test tests/invoiceflow.test.js', 'examples/demo-report/governed-test-output.txt']
  };
  const executableRow = after.traceabilityMatrix.find((row) => row.requirement === 'Executable proof');
  if (executableRow) {
    executableRow.status = 'PASS';
    executableRow.evidence = `node --test tests/invoiceflow.test.js exited 0${testCount ? ` with ${testCount} tests` : ''}.`;
  }
  after.verification = {
    commands: [{
      command: 'node --test tests/invoiceflow.test.js',
      status: 'PASS',
      exitCode: governedTest.status,
      testCount,
      evidence: 'examples/demo-report/governed-test-output.txt'
    }],
    notRun: ['CI', 'browser/accessibility', 'load/concurrency', 'deployment', 'independent security review']
  };
  after.comparison = {
    label: 'SIMULATED InvoiceFlow Mini governance comparison',
    beforeScore: before.score,
    afterScore: after.score,
    scoreDelta: after.score - before.score,
    beforeRisks: before.riskFlags.length,
    afterRisks: after.riskFlags.length,
    riskReduction: before.riskFlags.length - after.riskFlags.length,
    beforeMissingSurfaces: before.missingSurfaces.length,
    afterMissingSurfaces: after.missingSurfaces.length,
    evidenceBefore: 'FAIL',
    evidenceAfter: `PASS — ${testCount || 'focused'} fixture tests ran; CI and external checks remain NOT_RUN`
  };
  after.beforeSnapshot = {
    score: before.score,
    riskFlags: before.riskFlags,
    missingSurfaces: before.missingSurfaces,
    evidenceStatus: before.evidenceStatus
  };
  after.codexLiveReview = {
    state: 'READY',
    mode: 'REAL_CODEX_EVIDENCE_RECONCILIATION',
    model: 'gpt-5.6-sol',
    authenticatedVia: 'Checked when evidence reconciliation starts',
    disclosure: 'Real GPT-5.6 evidence reconciliation is ready; deterministic states remain locked and independently reproducible.'
  };
  writePortableJson(path.join(reportDir, 'after-report.json'), after, root);
  writePortableJson(path.join(root, 'apps', 'dashboard', 'src', 'sample-report.json'), after, root);
  writePortableJson(path.join(root, 'apps', 'dashboard', 'public', 'live-report.json'), after, root);
  writePortableJson(path.join(governed, 'CONTROL_TOWER_REPORT.json'), after, root);

  console.log('SIMULATED InvoiceFlow Mini demo prepared.');
  console.log(`Before: ${before.score}/100, ${before.riskFlags.length} risks`);
  console.log(`After: ${after.score}/100, ${after.riskFlags.length} risks`);
  console.log(`Evidence pack: ${evidence.outDir}`);
  console.log('npm run dashboard');
  console.log('open docs/DEMO_SCRIPT.md');
  return { before, workspaceAfter, after, evidence };
}

module.exports = { demoCommand };
