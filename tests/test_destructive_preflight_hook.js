'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const {
  evaluateHookPayload,
  outputForPreflight
} = require('../.codex/hooks/destructive-preflight');
const { ROOT } = require('./helpers');

const repositoryRoot = '/srv/fixture-user/work/control-tower';
const homeDirectory = '/srv/fixture-user';
const payload = {
  session_id: 'fixture-session',
  turn_id: 'fixture-turn',
  cwd: repositoryRoot,
  hook_event_name: 'PreToolUse',
  tool_name: 'Bash',
  tool_use_id: 'fixture-tool',
  permission_mode: 'default',
  tool_input: {
    command: 'cct-preflight-probe --operation recursive_delete --path $HOME/..'
  }
};
const options = {
  repositoryRoot,
  homeDirectory,
  platform: 'posix',
  now: '2026-07-17T12:00:00.000Z',
  inspectPath: () => ({ exists: false }),
  canonicalizePath: (value) => value
};

const denied = evaluateHookPayload(payload, options);
assert.equal(denied.preflight.decision, 'BLOCKED');
assert.equal(denied.preflight.executionState, 'NOT_RUN');
assert.equal(denied.preflight.executed, false);
assert.equal(denied.preflight.protectedBoundary, '<USER_HOME_PARENT>');
assert.deepEqual(Object.keys(denied.output), ['hookSpecificOutput']);
assert.deepEqual(
  Object.keys(denied.output.hookSpecificOutput),
  ['hookEventName', 'permissionDecision', 'permissionDecisionReason']
);
assert.deepEqual({
  hookEventName: denied.output.hookSpecificOutput.hookEventName,
  permissionDecision: denied.output.hookSpecificOutput.permissionDecision
}, {
  hookEventName: 'PreToolUse',
  permissionDecision: 'deny'
});
assert.equal(
  denied.output.hookSpecificOutput.permissionDecisionReason,
  'CCT Destructive Action Preflight resolved <USER_HOME_PARENT> as BLOCKED; execution remains NOT_RUN. Do not execute the command. Narrow the target to a specific non-symlinked repository subpath, inspect it, and obtain scoped human approval.'
);
assert.doesNotMatch(JSON.stringify(denied), /srv\/fixture-user/u);

const caution = evaluateHookPayload({
  ...payload,
  tool_input: {
    command: 'cct-preflight-probe --operation recursive_delete --path tmp/generated-cache'
  }
}, options);
assert.equal(caution.preflight.decision, 'CAUTION');
assert.deepEqual(caution.output, {
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    additionalContext: 'CCT Destructive Action Preflight returned CAUTION for <REPOSITORY_ROOT>/tmp/generated-cache. Human review is required before destructive execution.'
  }
});

assert.equal(outputForPreflight({ decision: 'CLEAR' }), null);
assert.equal(outputForPreflight({ decision: 'UNKNOWN' }), null);

assert.deepEqual(evaluateHookPayload({
  ...payload,
  tool_input: { command: 'echo harmless-probe' }
}, options), { output: null, preflight: null });
assert.deepEqual(evaluateHookPayload({
  ...payload,
  hook_event_name: 'PostToolUse'
}, options), { output: null, preflight: null });
assert.deepEqual(evaluateHookPayload({
  ...payload,
  tool_name: 'apply_patch'
}, options), { output: null, preflight: null });

const malformed = evaluateHookPayload({
  ...payload,
  tool_input: {}
}, options);
assert.equal(malformed.preflight, null);
assert.deepEqual(malformed.output, {
  hookSpecificOutput: {
    hookEventName: 'PreToolUse',
    permissionDecision: 'deny',
    permissionDecisionReason: 'CCT could not inspect the supported shell input; execution remains NOT_RUN.'
  }
});

const hookConfig = JSON.parse(fs.readFileSync(path.join(ROOT, '.codex', 'hooks.json'), 'utf8'));
assert.deepEqual(Object.keys(hookConfig.hooks), ['PreToolUse']);
assert.equal(hookConfig.hooks.PreToolUse.length, 1);
const configured = hookConfig.hooks.PreToolUse[0];
assert.equal(configured.matcher, '^Bash$');
assert.equal(configured.hooks.length, 1);
assert.equal(configured.hooks[0].type, 'command');
assert.match(configured.hooks[0].command, /destructive-preflight\.js/u);
assert.match(configured.hooks[0].commandWindows, /destructive-preflight\.js/u);

const hookSource = fs.readFileSync(
  path.join(ROOT, '.codex', 'hooks', 'destructive-preflight.js'),
  'utf8'
);
assert.doesNotMatch(hookSource, /\b(?:appendFile|writeFile|createWriteStream)\b/u);
assert.doesNotMatch(hookSource, /flightRecorder/iu);

const verification = JSON.parse(fs.readFileSync(
  path.join(ROOT, '.controltower', 'CODEX_HOOK_VERIFICATION.json'),
  'utf8'
));
assert.equal(verification.status, 'PASS');
assert.equal(verification.codexCliVersion, '0.144.3');
assert.equal(verification.model, 'gpt-5.6-sol');
assert.equal(verification.hookEvent, 'PreToolUse');
assert.equal(verification.matcher, '^Bash$');
assert.equal(
  verification.probe,
  'cct-preflight-probe --operation recursive_delete --path $HOME/..'
);
assert.equal(verification.sandbox, 'read-only');
assert.equal(verification.approvalBypass, false);
assert.equal(verification.hookTrustBypass, true);
assert.match(verification.hookTrust, /one-off vetted bypass/u);
assert.equal(verification.normalProjectTrustSetupVerified, false);
assert.equal(verification.probeExecutableFound, false);
assert.equal(verification.preflightDecision, 'BLOCKED');
assert.equal(verification.hookOutcome, 'DENIED');
assert.equal(verification.executionState, 'NOT_RUN');
assert.equal(verification.executed, false);
assert.equal(verification.protectedBoundary, '<USER_HOME_PARENT>');
assert.ok(verification.limitations.length >= 6);
const serializedVerification = JSON.stringify(verification);
assert.doesNotMatch(serializedVerification, /(?:[A-Za-z]:[\\/]|\/(?:Users|home|srv)\/)/u);
assert.doesNotMatch(serializedVerification, /(?:thread|session)[_-]?id/iu);
assert.doesNotMatch(serializedVerification, /\b[0-9a-f]{8}-[0-9a-f-]{27,}\b/iu);

const childOutput = execFileSync(process.execPath, [
  path.join(ROOT, '.codex', 'hooks', 'destructive-preflight.js')
], {
  cwd: ROOT,
  input: JSON.stringify({
    ...payload,
    cwd: ROOT,
    tool_input: {
      command: 'cct-preflight-probe --operation recursive_delete --path $HOME/..'
    }
  }),
  encoding: 'utf8'
});
const childDecision = JSON.parse(childOutput);
assert.equal(childDecision.hookSpecificOutput.permissionDecision, 'deny');
assert.match(childDecision.hookSpecificOutput.permissionDecisionReason, /NOT_RUN/u);
assert.doesNotMatch(JSON.stringify(childDecision), /(?:MEHMET|[A-Za-z]:[\\/]Users[\\/])/iu);
console.log('PASS test_destructive_preflight_hook (harmless probe only)');
