#!/usr/bin/env node
'use strict';

const { contextGraphCommand } = require('./commands/context-graph');
const { codexReviewCommand } = require('./commands/codex-review');
const { destructivePreflightCommand } = require('./commands/destructive-preflight');
const { demoCommand } = require('./commands/demo');
const { doctorCommand } = require('./commands/doctor');
const { evidenceCommand } = require('./commands/evidence');
const { exportDevpostCommand } = require('./commands/export-devpost');
const { flightRecorderCommand } = require('./commands/flight-recorder');
const { healthCommand } = require('./commands/health');
const { initCommand } = require('./commands/init');
const { memoryLensCommand } = require('./commands/memory-lens');
const { mistakeShieldCommand } = require('./commands/mistake-shield');
const { phase0Command } = require('./commands/phase0');
const { reviewGateCommand } = require('./commands/review-gate');
const { scanCommand } = require('./commands/scan');

const HELP = `Codex Control Tower (cct) — mission control for AI-built software

Usage:
  cct init --target <dir> --profile solo|startup|enterprise|regulated --codex
  cct phase0 --target <dir> [--demo]
  cct scan --target <dir> [--out <file>] [--portable]
  cct health --target <dir> [--strict]
  cct doctor --target <dir>
  cct evidence --target <dir> --out <dir>
  cct context-graph --target <dir> [--out <file>]
  cct codex-review --target <dir> [--model gpt-5.6-sol] [--live-report <file>]  # blind semantic evidence challenge
  cct destructive-preflight --target <repo> --operation <operation> --path <target-path> [--cwd <dir>] [--platform win32|posix] [--recursive] [--force] [--out <generated-file>] [--overwrite] [--record]
  cct review-gate --target <dir> --status|--approve|--reject|--reset [--note <text>] [--scope <text> --allow <paths> --forbid <actions>]
  cct mistake-shield --target <dir> --action <text>
  cct memory-lens --target <dir> [--out <file>]
  cct flight-recorder --target <dir> --event <type> --message <text>
  cct export-devpost --target <dir> --out <dir>
  cct demo

Evidence states: PASS, WARN, FAIL, NOT_RUN, SIMULATED.
Core operation is local-first. codex-review adds a real, blind GPT-5.6 semantic
evidence challenge through a ChatGPT subscription session and requires no API key.
It uses an empty ephemeral read-only workspace and rejects any model tool event.
GPT-5.6 cannot overwrite locked local evidence states.`;

function parseArgs(argv) {
  const result = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (!value.startsWith('--')) {
      result._.push(value);
      continue;
    }
    const key = value.slice(2).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
    const next = argv[index + 1];
    if (next !== undefined && !next.startsWith('--')) {
      result[key] = next;
      index += 1;
    } else {
      result[key] = true;
    }
  }
  return result;
}

const COMMANDS = {
  init: initCommand,
  phase0: phase0Command,
  scan: scanCommand,
  health: healthCommand,
  doctor: doctorCommand,
  evidence: evidenceCommand,
  'context-graph': contextGraphCommand,
  'codex-review': codexReviewCommand,
  'destructive-preflight': destructivePreflightCommand,
  'review-gate': reviewGateCommand,
  'mistake-shield': mistakeShieldCommand,
  'memory-lens': memoryLensCommand,
  'flight-recorder': flightRecorderCommand,
  'export-devpost': exportDevpostCommand,
  demo: demoCommand
};

async function main(argv = process.argv.slice(2)) {
  const command = argv[0];
  if (!command || command === 'help' || command === '--help' || command === '-h') {
    console.log(HELP);
    return null;
  }
  if (!COMMANDS[command]) {
    throw new Error(`Unknown command: ${command}. Run cct --help.`);
  }
  const args = parseArgs(argv.slice(1));
  return COMMANDS[command](args);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(`cct error: ${error.message}`);
    process.exitCode = 1;
  });
}

module.exports = { COMMANDS, HELP, main, parseArgs };
