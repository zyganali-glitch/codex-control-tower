#!/usr/bin/env node
'use strict';

const os = require('node:os');
const { execFileSync } = require('node:child_process');
const {
  analyzeDestructiveAction,
  parseDestructiveCommand
} = require('../../cli/lib/destructiveActionPreflight');

function denyOutput(reason) {
  return {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason: reason
    }
  };
}

function outputForPreflight(preflight) {
  if (preflight?.decision === 'BLOCKED') {
    return denyOutput(
      `CCT Destructive Action Preflight resolved ${preflight.protectedBoundary} as BLOCKED; execution remains NOT_RUN. ${preflight.saferNextAction}`
    );
  }

  if (preflight?.decision === 'CAUTION') {
    return {
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        additionalContext: `CCT Destructive Action Preflight returned CAUTION for ${preflight.resolvedTarget}. Human review is required before destructive execution.`
      }
    };
  }

  return null;
}

function findRepositoryRoot(cwd) {
  return execFileSync('git', ['rev-parse', '--show-toplevel'], {
    cwd,
    encoding: 'utf8',
    windowsHide: true,
    stdio: ['ignore', 'pipe', 'ignore']
  }).trim();
}

function evaluateHookPayload(payload = {}, options = {}) {
  if (payload.hook_event_name !== 'PreToolUse' || payload.tool_name !== 'Bash') {
    return { output: null, preflight: null };
  }

  const command = payload.tool_input?.command;
  if (typeof command !== 'string') {
    return {
      output: denyOutput('CCT could not inspect the supported shell input; execution remains NOT_RUN.'),
      preflight: null
    };
  }

  const parsed = parseDestructiveCommand(command);
  if (!parsed.matched) return { output: null, preflight: null };

  let repositoryRoot = options.repositoryRoot;
  try {
    repositoryRoot ||= findRepositoryRoot(payload.cwd || process.cwd());
  } catch {
    return {
      output: denyOutput('CCT could not resolve the repository boundary; execution remains NOT_RUN.'),
      preflight: null
    };
  }

  const preflight = analyzeDestructiveAction({
    operation: parsed.operation,
    requestedTarget: parsed.requestedTarget,
    currentWorkingDirectory: payload.cwd || repositoryRoot,
    repositoryRoot,
    platform: options.platform || process.platform,
    recursive: parsed.recursive,
    force: parsed.force,
    source: parsed.source || 'codex_pretooluse_hook'
  }, {
    homeDirectory: options.homeDirectory || os.homedir(),
    now: options.now,
    inspectPath: options.inspectPath,
    symlinkPaths: options.symlinkPaths,
    canonicalizePath: options.canonicalizePath,
    repositoryRootVerified: true,
    preflightReasonCodes: parsed.supported === false ? parsed.reasonCodes : []
  });

  return {
    output: outputForPreflight(preflight),
    preflight
  };
}

async function readStdin() {
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) input += chunk;
  return input;
}

async function main() {
  try {
    const input = await readStdin();
    const payload = JSON.parse(input);
    const result = evaluateHookPayload(payload);
    if (result.output) process.stdout.write(`${JSON.stringify(result.output)}\n`);
  } catch {
    process.stderr.write('CCT could not parse the PreToolUse payload; execution remains NOT_RUN.\n');
    process.exitCode = 2;
  }
}

if (require.main === module) main();

module.exports = { denyOutput, evaluateHookPayload, findRepositoryRoot, main, outputForPreflight };
