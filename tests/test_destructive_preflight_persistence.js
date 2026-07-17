'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { destructivePreflightCommand } = require('../cli/commands/destructive-preflight');
const { mistakeShieldCommand } = require('../cli/commands/mistake-shield');
const { analyzeDestructiveAction } = require('../cli/lib/destructiveActionPreflight');
const { appendFlightEvent, appendPreflightEvent, readFlightEvents } = require('../cli/lib/flightRecorder');
const { ROOT } = require('./helpers');

const FIXED_TIME = '2026-07-17T12:00:00.000Z';
const fixtureContext = {
  operation: 'recursive_delete',
  requestedTarget: '$HOME/..',
  currentWorkingDirectory: '/srv/fixture-user/work/control-tower',
  repositoryRoot: '/srv/fixture-user/work/control-tower',
  platform: 'posix',
  recursive: true,
  force: true,
  source: 'unit_test'
};
const fixtureOptions = {
  homeDirectory: '/srv/fixture-user',
  now: FIXED_TIME,
  inspectPath: () => ({ exists: false }),
  canonicalizePath: (value) => value,
  repositoryRootVerified: true
};

function assertBlocked(result, reasonCode) {
  assert.equal(result.decision, 'BLOCKED');
  assert.equal(result.executionState, 'NOT_RUN');
  assert.equal(result.executed, false);
  if (reasonCode) assert.ok(result.reasonCodes.includes(reasonCode));
}

const parent = analyzeDestructiveAction(fixtureContext, fixtureOptions);
const testTarget = path.join(ROOT, 'tmp', 'tests', `destructive-preflight-${process.pid}-${Date.now()}`);
fs.mkdirSync(path.join(testTarget, '.controltower'), { recursive: true });
appendFlightEvent(testTarget, 'PLAN', 'Existing event shape remains readable.', 'unit-test');
appendPreflightEvent(testTarget, parent, 'unit-test');
const events = readFlightEvents(testTarget);
assert.equal(events.length, 2);
assert.equal(events[1].type, 'BLOCKED');
assert.equal(events[1].executionState, 'NOT_RUN');
assert.equal(events[1].executed, false);
assert.equal(events[1].destructiveActionPreflight.protectedBoundary, '<USER_HOME_PARENT>');
assert.doesNotMatch(fs.readFileSync(path.join(testTarget, '.controltower', 'flight-recorder.jsonl'), 'utf8'), /srv\/fixture-user/u);

(async () => {
  const commandResult = await destructivePreflightCommand({
    target: testTarget,
    operation: 'recursive_delete',
    path: '.git',
    cwd: testTarget,
    out: '.controltower/destructive-preflight.json'
  }, { now: FIXED_TIME, repositoryRootVerified: true });
  assertBlocked(commandResult, 'REPOSITORY_GIT_DIR');
  assert.ok(fs.existsSync(path.join(testTarget, '.controltower', 'destructive-preflight.json')));

  await assert.rejects(() => destructivePreflightCommand({
    target: testTarget, operation: 'recursive_delete', path: '.git', cwd: testTarget,
    out: '.git/config'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /limited to/u);
  await assert.rejects(() => destructivePreflightCommand({
    target: testTarget, operation: 'recursive_delete', path: '.git', cwd: testTarget,
    out: '../destructive-preflight.json'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /limited to/u);

  fs.mkdirSync(path.join(testTarget, 'tmp'), { recursive: true });
  const existingOutput = path.join(testTarget, 'tmp', 'existing-destructive-preflight.json');
  fs.writeFileSync(existingOutput, 'user-owned\n', 'utf8');
  await assert.rejects(() => destructivePreflightCommand({
    target: testTarget, operation: 'recursive_delete', path: '.git', cwd: testTarget,
    out: 'tmp/existing-destructive-preflight.json'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /already exists/u);
  assert.equal(fs.readFileSync(existingOutput, 'utf8'), 'user-owned\n');

  const danglingOutput = path.join(testTarget, '.controltower', 'dangling-destructive-preflight.json');
  const danglingTarget = path.join(testTarget, 'tmp', 'never-created-by-preflight.json');
  let danglingLinkCreated = false;
  try {
    fs.symlinkSync(danglingTarget, danglingOutput, 'file');
    danglingLinkCreated = true;
  } catch (error) {
    if (process.platform !== 'win32' || error?.code !== 'EPERM') throw error;
  }
  if (danglingLinkCreated) {
    await assert.rejects(() => destructivePreflightCommand({
      target: testTarget, operation: 'recursive_delete', path: '.git', cwd: testTarget,
      out: '.controltower/dangling-destructive-preflight.json'
    }, { now: FIXED_TIME, repositoryRootVerified: true }), /symbolic link/u);
    assert.equal(fs.existsSync(danglingTarget), false);
  }

  const ignoredHomeOverride = await destructivePreflightCommand({
    target: ROOT, operation: 'recursive_delete', path: '$HOME', home: ROOT
  }, { now: FIXED_TIME, repositoryRootVerified: true });
  assertBlocked(ignoredHomeOverride, 'USER_HOME');
  assert.equal(ignoredHomeOverride.resolvedTarget, '<USER_HOME>');

  const cwdDefaultsToProcess = await destructivePreflightCommand({
    target: testTarget, operation: 'recursive_delete', path: '.'
  }, { now: FIXED_TIME, repositoryRootVerified: true, homeDirectory: fixtureOptions.homeDirectory });
  assertBlocked(cwdDefaultsToProcess, 'OUTSIDE_REPOSITORY');

  const unverifiedTarget = path.join(ROOT, 'tmp', 'tests', `unverified-preflight-${process.pid}-${Date.now()}`);
  fs.mkdirSync(unverifiedTarget, { recursive: true });
  await assert.rejects(() => destructivePreflightCommand({
    target: unverifiedTarget, operation: 'recursive_delete', path: '.', cwd: unverifiedTarget,
    out: '.controltower/destructive-preflight.json'
  }, { now: FIXED_TIME }), /verified, non-protected Git repository root/u);
  assert.equal(fs.existsSync(path.join(unverifiedTarget, '.controltower')), false);
  await assert.rejects(() => mistakeShieldCommand({
    target: unverifiedTarget, operation: 'recursive_delete', path: '.', cwd: unverifiedTarget, record: true
  }), /verified, non-protected Git repository root/u);
  assert.equal(fs.existsSync(path.join(unverifiedTarget, '.controltower')), false);

  const linkTarget = path.join(ROOT, 'tmp', 'tests', `flight-outside-${process.pid}-${Date.now()}`);
  const linkedRecorderRoot = path.join(ROOT, 'tmp', 'tests', `flight-link-${process.pid}-${Date.now()}`);
  fs.mkdirSync(linkTarget, { recursive: true });
  fs.mkdirSync(linkedRecorderRoot, { recursive: true });
  const externalRecorder = `${JSON.stringify({ type: 'EVIDENCE', message: 'external' })}\n`;
  fs.writeFileSync(path.join(linkTarget, 'flight-recorder.jsonl'), externalRecorder, 'utf8');
  fs.symlinkSync(linkTarget, path.join(linkedRecorderRoot, '.controltower'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(
    () => appendFlightEvent(linkedRecorderRoot, 'BLOCKED', 'No write may traverse this link.', 'unit-test'),
    /symbolic link/u
  );
  assert.equal(fs.readFileSync(path.join(linkTarget, 'flight-recorder.jsonl'), 'utf8'), externalRecorder);
  assert.deepEqual(readFlightEvents(linkedRecorderRoot), []);

  assert.throws(() => analyzeDestructiveAction({
    ...fixtureContext, requestedTarget: 'tmp/cache', platform: 'win64'
  }, fixtureOptions), /Unsupported platform/u);

  const output = execFileSync(process.execPath, [
    path.join(ROOT, 'cli', 'index.js'), 'destructive-preflight',
    '--target', ROOT, '--operation', 'recursive_delete', '--path', '.git'
  ], { encoding: 'utf8' });
  assert.match(output, /DESTRUCTIVE ACTION PREFLIGHT/u);
  assert.match(output, /ANALYSIS ONLY · NO COMMAND EXECUTED/u);
  assert.match(output, /Decision: BLOCKED/u);
  assert.match(output, /Execution: NOT_RUN/u);
  console.log('PASS test_destructive_preflight_persistence');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
