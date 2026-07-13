'use strict';

const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const { scanRepository } = require('../lib/repoScanner');
const { ensureInside, resolveTarget, writeFileSafe, writeJsonSafe } = require('../lib/safeFs');

const DEFAULT_MODEL = 'gpt-5.6-sol';

const REVIEW_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['verdict', 'summary', 'strengths', 'findings', 'nextSafeAction'],
  properties: {
    verdict: { type: 'string', enum: ['PASS', 'WARN', 'FAIL'] },
    summary: { type: 'string' },
    strengths: { type: 'array', items: { type: 'string' } },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['severity', 'title', 'evidence', 'recommendation'],
        properties: {
          severity: { type: 'string', enum: ['HIGH', 'MEDIUM', 'LOW'] },
          title: { type: 'string' },
          evidence: { type: 'string' },
          recommendation: { type: 'string' }
        }
      }
    },
    nextSafeAction: { type: 'string' }
  }
};

function codexProgram() {
  const root = path.resolve(__dirname, '..', '..');
  const script = path.join(root, 'node_modules', '@openai', 'codex', 'bin', 'codex.js');
  if (!fs.existsSync(script)) throw new Error('Codex CLI is not installed. Run npm install, then try again.');
  return script;
}

function runCodex(args, options = {}) {
  return spawnSync(process.execPath, [codexProgram(), ...args], {
    cwd: options.cwd,
    input: options.input,
    encoding: 'utf8',
    windowsHide: true,
    timeout: options.timeout || 30000,
    maxBuffer: 10 * 1024 * 1024
  });
}

function commandOutput(result) {
  return `${result.stdout || ''}${result.stderr || ''}`.trim();
}

function portableValue(value, roots) {
  if (typeof value === 'string') {
    return roots.reduce((text, root) => text.replaceAll(root, '.').replaceAll(root.split(path.sep).join('/'), '.'), value);
  }
  if (Array.isArray(value)) return value.map((item) => portableValue(item, roots));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, portableValue(item, roots)]));
  return value;
}

function writeLiveReport(target, liveReport, codexLiveReview) {
  if (!liveReport) return;
  const destination = path.resolve(liveReport);
  ensureInside(process.cwd(), destination);
  const report = scanRepository(target, { simulatedData: true });
  report.codexLiveReview = codexLiveReview;
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, `${JSON.stringify(portableValue(report, [process.cwd()]), null, 2)}\n`, 'utf8');
}

function buildReviewPrompt(report) {
  return [
    '# Codex Control Tower live review',
    '',
    'You are the real Codex model review layer for this local demonstration.',
    'Work read-only. Do not edit files, run destructive commands, publish, or claim checks that did not run.',
    'Review repository governance and evidence quality, not the fictional product as a production system.',
    'Read only these files: CONTROL_TOWER_REPORT.json, .controltower/review-gate.json, docs/EVIDENCE_REPORT.md, docs/TRACEABILITY_MATRIX.md, and docs/NOT_RUN_GATES.md.',
    'Do not search the repository, inspect application source, run tests, run package commands, or send progress updates.',
    'Make one bounded evidence pass, then return the final structured assessment immediately.',
    'Keep SIMULATED and NOT_RUN boundaries visible.',
    '',
    `Deterministic governance score: ${report.score}/100`,
    `Detected risk flags: ${report.riskFlags.length}`,
    `Review Gate: ${report.reviewGate?.status || 'UNKNOWN'}`,
    '',
    'Return only the requested final structured assessment. Evidence must name one of the listed files or an explicit missing proof.'
  ].join('\n');
}

async function codexReviewCommand(args) {
  const target = resolveTarget(args.target || '.');
  const model = String(args.model || DEFAULT_MODEL);
  const liveReport = args.liveReport;
  const startedAt = new Date().toISOString();
  const baseState = {
    state: 'RUNNING', mode: 'REAL_CODEX', model,
    authenticatedVia: 'Checking ChatGPT subscription session', startedAt,
    disclosure: 'Optional real Codex review; deterministic score remains independently reproducible.'
  };
  const fail = (message, state = 'FAILED') => {
    writeLiveReport(target, liveReport, {
      ...baseState, state, authenticatedVia: state === 'BLOCKED' ? 'Not signed in with ChatGPT' : baseState.authenticatedVia,
      completedAt: new Date().toISOString(), error: String(message).slice(-1200)
    });
  };
  writeLiveReport(target, liveReport, baseState);

  const versionResult = runCodex(['--version'], { cwd: target });
  if (versionResult.status !== 0) {
    const message = `Codex CLI could not start: ${commandOutput(versionResult)}`;
    fail(message);
    throw new Error(message);
  }
  const authResult = runCodex(['login', 'status'], { cwd: target });
  const authOutput = commandOutput(authResult);
  if (authResult.status !== 0 || !/logged in using chatgpt/i.test(authOutput)) {
    fail('Open Codex and sign in with ChatGPT, then run this command again.', 'BLOCKED');
    throw new Error('Codex is not signed in with ChatGPT. Open Codex, sign in, and try again.');
  }

  const catalogResult = runCodex(['debug', 'models'], { cwd: target });
  if (catalogResult.status !== 0) {
    const message = `Codex model list could not be read: ${commandOutput(catalogResult)}`;
    fail(message);
    throw new Error(message);
  }
  let catalog;
  try { catalog = JSON.parse(catalogResult.stdout); } catch {
    const message = 'Codex returned an unreadable model list. Update Codex and try again.';
    fail(message);
    throw new Error(message);
  }
  if (!(catalog.models || []).some((item) => item.slug === model)) {
    const message = `Model ${model} is not available in this ChatGPT account.`;
    fail(message, 'BLOCKED');
    throw new Error(message);
  }

  const report = scanRepository(target, { simulatedData: true });
  const prompt = buildReviewPrompt(report);
  writeFileSafe(target, '.controltower/CODEX_LIVE_REVIEW_PROMPT.md', `${prompt}\n`, { overwrite: true });
  writeJsonSafe(target, '.controltower/codex-review-schema.json', REVIEW_SCHEMA, { overwrite: true });
  const schemaPath = path.join(target, '.controltower', 'codex-review-schema.json');
  const outputPath = path.join(target, '.controltower', 'codex-live-review.json');
  const reviewResult = runCodex([
    'exec', '--model', model, '--config', 'model_reasoning_effort="low"', '--sandbox', 'read-only', '--cd', target,
    '--output-schema', schemaPath, '--output-last-message', outputPath, '--json', '-'
  ], { cwd: target, input: prompt, timeout: Number(args.timeout || 240000) });
  const portableEvents = portableValue(reviewResult.stdout || '', [process.cwd(), target]);
  writeFileSafe(target, '.controltower/codex-live-events.jsonl', portableEvents, { overwrite: true });
  if (reviewResult.status !== 0) {
    const error = commandOutput(reviewResult) || `Codex exited with code ${reviewResult.status}`;
    fail(error);
    throw new Error(`Real Codex review failed: ${error}`);
  }

  let assessment;
  try { assessment = JSON.parse(fs.readFileSync(outputPath, 'utf8')); } catch {
    const message = 'Codex completed but its structured review file could not be read.';
    fail(message);
    throw new Error(message);
  }
  const completed = {
    ...baseState, state: 'COMPLETE', authenticatedVia: 'ChatGPT subscription',
    cliVersion: commandOutput(versionResult), completedAt: new Date().toISOString(), assessment,
    evidence: ['.controltower/CODEX_LIVE_REVIEW_PROMPT.md', '.controltower/codex-live-review.json', '.controltower/codex-live-events.jsonl']
  };
  writeJsonSafe(target, '.controltower/codex-live-review-record.json', completed, { overwrite: true });
  writeLiveReport(target, liveReport, completed);
  console.log(`REAL Codex review complete with ${model}.`);
  console.log(`Verdict: ${assessment.verdict}`);
  console.log(`Evidence: ${path.relative(process.cwd(), outputPath)}`);
  return completed;
}

module.exports = { DEFAULT_MODEL, REVIEW_SCHEMA, buildReviewPrompt, codexReviewCommand };
