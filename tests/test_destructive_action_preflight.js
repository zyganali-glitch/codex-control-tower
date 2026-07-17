'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { destructivePreflightCommand } = require('../cli/commands/destructive-preflight');
const { preservedCodexReview, recordedPreflight } = require('../cli/commands/demo');
const {
  POLICY_VERSION,
  analyzeDestructiveAction,
  parseDestructiveCommand
} = require('../cli/lib/destructiveActionPreflight');
const { appendFlightEvent, appendPreflightEvent, readFlightEvents } = require('../cli/lib/flightRecorder');
const { evaluateMistakeShield } = require('../cli/lib/mistakeShield');
const { ROOT } = require('./helpers');

const FIXED_TIME = '2026-07-17T12:00:00.000Z';
const posixContext = {
  operation: 'recursive_delete',
  currentWorkingDirectory: '/srv/fixture-user/work/control-tower',
  repositoryRoot: '/srv/fixture-user/work/control-tower',
  platform: 'posix',
  recursive: true,
  force: true,
  source: 'unit_test'
};
const posixOptions = {
  homeDirectory: '/srv/fixture-user',
  now: FIXED_TIME,
  inspectPath: () => ({ exists: false }),
  canonicalizePath: (value) => value,
  repositoryRootVerified: true
};
const windowsContext = {
  ...posixContext,
  currentWorkingDirectory: 'C:\\Users\\Fixture\\work\\control-tower',
  repositoryRoot: 'C:\\Users\\Fixture\\work\\control-tower',
  platform: 'win32'
};
const windowsOptions = {
  homeDirectory: 'C:\\Users\\Fixture',
  now: FIXED_TIME,
  inspectPath: () => ({ exists: false }),
  canonicalizePath: (value) => value,
  repositoryRootVerified: true
};

function analyze(requestedTarget, input = {}, options = {}) {
  return analyzeDestructiveAction(
    { ...posixContext, requestedTarget, ...input },
    { ...posixOptions, ...options }
  );
}

function analyzeWindows(requestedTarget, input = {}, options = {}) {
  return analyzeDestructiveAction(
    { ...windowsContext, requestedTarget, ...input },
    { ...windowsOptions, ...options }
  );
}

function assertBlocked(result, reasonCode) {
  assert.equal(result.decision, 'BLOCKED');
  assert.equal(result.executionState, 'NOT_RUN');
  assert.equal(result.executed, false);
  assert.equal(result.humanReviewRequired, true);
  assert.equal(result.deterministic, true);
  assert.equal(result.policyVersion, POLICY_VERSION);
  if (reasonCode) assert.ok(result.reasonCodes.includes(reasonCode), `${reasonCode} must be recorded`);
}

for (const expression of ['$HOME', '${HOME}', '~', '%USERPROFILE%', '$env:USERPROFILE']) {
  const result = analyze(expression);
  assertBlocked(result, 'USER_HOME');
  assert.equal(result.resolvedTarget, '<USER_HOME>');
}

const parent = analyze('$HOME/..');
assertBlocked(parent, 'USER_HOME_PARENT');
assert.equal(parent.requestedTarget, '$HOME/..');
assert.equal(parent.expandedTarget, '<USER_HOME>/..');
assert.equal(parent.resolvedTarget, '<USER_HOME_PARENT>');
assert.equal(parent.protectedBoundary, '<USER_HOME_PARENT>');

assertBlocked(analyze('/'), 'FILESYSTEM_ROOT');
assertBlocked(analyze('.'), 'REPOSITORY_ROOT');
assertBlocked(analyze('/srv/fixture-user/work/control-tower'), 'REPOSITORY_ROOT');
assertBlocked(analyze('.git'), 'REPOSITORY_GIT_DIR');
assertBlocked(analyze('.git/config'), 'REPOSITORY_GIT_DIR');
assertBlocked(analyze('../sibling'), 'OUTSIDE_REPOSITORY');
assertBlocked(analyze('..\\sibling'), 'OUTSIDE_REPOSITORY');

for (const expression of ['$UNKNOWN', '${UNKNOWN}', '%UNKNOWN%', '$env:UNKNOWN', '~someone/cache']) {
  assertBlocked(analyze(expression), 'UNRESOLVED_VARIABLE');
}
for (const expression of ['$home/tmp', '${home}/tmp']) {
  assertBlocked(analyze(expression), 'UNRESOLVED_VARIABLE');
}
for (const expression of ['$(dynamic-target)', '`dynamic-target`']) {
  assertBlocked(analyze(expression), 'COMMAND_SUBSTITUTION');
}
for (const expression of ['tmp/*', 'tmp/?', 'tmp/[ab]', 'tmp/{a,b}']) {
  assertBlocked(analyze(expression), 'AMBIGUOUS_WILDCARD');
}
assertBlocked(analyze('tmp/cache && another-target'), 'COMMAND_CHAINING');
assertBlocked(analyze('tmp/"dynamic"/cache'), 'UNTERMINATED_QUOTE');

assertBlocked(analyzeDestructiveAction({
  ...posixContext,
  repositoryRoot: '/',
  currentWorkingDirectory: '/',
  requestedTarget: 'tmp'
}, {
  ...posixOptions,
  repositoryRootVerified: true
}), 'UNSAFE_REPOSITORY_ROOT');
assertBlocked(analyzeDestructiveAction({
  ...posixContext,
  repositoryRoot: posixOptions.homeDirectory,
  currentWorkingDirectory: posixOptions.homeDirectory,
  requestedTarget: 'tmp'
}, {
  ...posixOptions,
  repositoryRootVerified: true
}), 'UNSAFE_REPOSITORY_ROOT');
assertBlocked(analyzeDestructiveAction({
  ...posixContext,
  repositoryRoot: '/srv/fixture-user/work/not-a-repository',
  currentWorkingDirectory: '/srv/fixture-user/work/not-a-repository',
  requestedTarget: 'tmp'
}, {
  ...posixOptions,
  repositoryRootVerified: false
}), 'UNVERIFIED_REPOSITORY_ROOT');

const symlinked = analyze('tmp/link/child', {}, {
  symlinkPaths: ['/srv/fixture-user/work/control-tower/tmp/link']
});
assertBlocked(symlinked, 'SYMLINK_BOUNDARY');
assert.equal(symlinked.protectedBoundary, '<SYMLINK_BOUNDARY>');

const uncertain = analyze('tmp/cache', {}, {
  inspectPath(candidate) {
    return candidate.endsWith('/tmp') ? { uncertain: true } : { symbolicLink: false };
  }
});
assertBlocked(uncertain, 'PATH_INSPECTION_UNCERTAIN');
assertBlocked(analyzeDestructiveAction({
  ...posixContext,
  requestedTarget: 'tmp/cache'
}, {
  homeDirectory: posixOptions.homeDirectory,
  now: FIXED_TIME,
  repositoryRootVerified: true,
  canonicalizePath: undefined
}), 'PATH_INSPECTION_UNCERTAIN');

const caution = analyze('tmp/generated-cache');
assert.equal(caution.decision, 'CAUTION');
assert.deepEqual(caution.reasonCodes, ['REPOSITORY_SUBPATH']);
assert.equal(caution.resolvedTarget, '<REPOSITORY_ROOT>/tmp/generated-cache');
assert.equal(caution.humanReviewRequired, true);
assert.equal(caution.executionState, 'NOT_RUN');
assert.equal(caution.executed, false);

for (const expression of ['%USERPROFILE%', '$env:USERPROFILE']) {
  assertBlocked(analyzeWindows(expression), 'USER_HOME');
}
assertBlocked(analyzeWindows('C:\\'), 'FILESYSTEM_ROOT');
assertBlocked(analyzeWindows('.'), 'REPOSITORY_ROOT');
assertBlocked(analyzeWindows('.GiT\\config'), 'REPOSITORY_GIT_DIR');
assertBlocked(analyzeWindows('GIT~1\\config', {}, {
  canonicalizePath: (value) => value.replace(/\\GIT~1(?=\\|$)/iu, '\\.git')
}), 'REPOSITORY_GIT_DIR');
assertBlocked(analyzeWindows('..\\sibling'), 'OUTSIDE_REPOSITORY');
assertBlocked(analyzeWindows('C:relative-target'), 'WINDOWS_DRIVE_RELATIVE');
assert.equal(analyzeWindows('tmp/cache').resolvedTarget, '<REPOSITORY_ROOT>/tmp/cache');
assert.equal(analyzeWindows('tmp\\cache').resolvedTarget, '<REPOSITORY_ROOT>/tmp/cache');

const repeated = analyze('$HOME/..');
assert.deepEqual(repeated, analyze('$HOME/..'));
const serialized = JSON.stringify([
  repeated,
  analyzeWindows('$env:USERPROFILE'),
  caution,
  analyzeWindows('C:/Users/Fixture/x;C:\\Users\\Fixture\\y')
]);
assert.doesNotMatch(serialized, /srv\/fixture-user/u);
assert.doesNotMatch(serialized, /C:\\\\Users\\\\Fixture/iu);
assert.doesNotMatch(serialized, /Users[\\/]Fixture/iu);
assert.doesNotMatch(serialized, /hookOutcome/u);

const recordedDemoPreflight = recordedPreflight(ROOT);
assertBlocked(recordedDemoPreflight, 'USER_HOME_PARENT');
assert.equal(recordedDemoPreflight.hookOutcome, 'DENIED');
assert.doesNotMatch(JSON.stringify(recordedDemoPreflight), /recorded-demo-user/u);
const preservedReview = preservedCodexReview(
  ROOT,
  path.join(ROOT, 'examples', 'governed-saas-after')
);
assert.equal(preservedReview.state, 'COMPLETE');
assert.equal(preservedReview.model, 'gpt-5.6-sol');
assert.ok(Array.isArray(preservedReview.reconciliation?.claimAudits));

const rawCases = [
  ['rm -rf $HOME', 'recursive_delete', '$HOME'],
  ['Remove-Item -Recurse -Force $HOME', 'recursive_delete', '$HOME'],
  ['del /s /q %USERPROFILE%', 'recursive_delete', '%USERPROFILE%'],
  ['git clean -fdx', 'clean_untracked', '.']
];
for (const [command, operation, requestedTarget] of rawCases) {
  const parsed = parseDestructiveCommand(command);
  assert.equal(parsed.matched, true);
  assert.equal(parsed.supported, true);
  assert.equal(parsed.operation, operation);
  assert.equal(parsed.requestedTarget, requestedTarget);
}
const missingRmdirTarget = parseDestructiveCommand('rmdir /s /q');
assert.equal(missingRmdirTarget.matched, true);
assert.equal(missingRmdirTarget.supported, false);
assert.ok(missingRmdirTarget.reasonCodes.includes('MISSING_TARGET'));
assert.equal(parseDestructiveCommand('rm --unknown tmp/cache').supported, false);
assert.ok(parseDestructiveCommand('rm -rf tmp/one tmp/two').reasonCodes.includes('MULTIPLE_TARGETS'));
assert.ok(parseDestructiveCommand('bash -c "rm -rf $HOME"').reasonCodes.includes('UNSUPPORTED_COMMAND_FORM'));
assert.ok(parseDestructiveCommand('sudo rm -rf $HOME').reasonCodes.includes('UNSUPPORTED_COMMAND_FORM'));
assert.ok(parseDestructiveCommand('rm -rf tmp/cache && echo done').reasonCodes.includes('COMMAND_CHAINING'));
assert.equal(parseDestructiveCommand('git.exe clean -fdx').supported, true);
assert.equal(parseDestructiveCommand('git -C . clean -fdx').supported, false);
assert.equal(parseDestructiveCommand('"C:\\Program Files\\Git\\cmd\\git.exe" clean -fdx').supported, true);
assert.equal(parseDestructiveCommand('& "C:\\Program Files\\Git\\cmd\\git.exe" clean -fdx').supported, false);
assert.equal(parseDestructiveCommand('Update the documentation').matched, false);

const approvedGate = {
  status: 'APPROVED',
  scopeComplete: true,
  scope: 'Review a bounded generated cache only.',
  allowedFiles: ['tmp/generated-cache/**'],
  forbiddenActions: []
};
const emptyMemory = { neverForgetRisks: [] };
function shield(command, context = posixContext, options = posixOptions) {
  return evaluateMistakeShield(context.repositoryRoot, command, {
    reviewGate: approvedGate,
    memoryLens: emptyMemory,
    riskFlags: [],
    currentWorkingDirectory: context.currentWorkingDirectory,
    platform: context.platform,
    homeDirectory: options.homeDirectory,
    now: FIXED_TIME,
    inspectPath: options.inspectPath,
    canonicalizePath: options.canonicalizePath,
    repositoryRootVerified: true
  });
}

for (const [command] of rawCases) {
  const result = command.includes('%USERPROFILE%')
    ? shield(command, windowsContext, windowsOptions)
    : shield(command);
  assert.equal(result.verdict, 'BLOCKED');
  assert.equal(result.destructivePreflight.executionState, 'NOT_RUN');
}
assert.equal(shield('rmdir /s /q', windowsContext, windowsOptions).verdict, 'BLOCKED');
assert.equal(shield('rm -rf tmp/generated-cache').verdict, 'CAUTION');
assert.equal(shield('Update the documentation').verdict, 'CLEAR');
for (const command of [
  'git.exe clean -fdx',
  'git -C . clean -fdx',
  '"C:\\Program Files\\Git\\cmd\\git.exe" clean -fdx',
  '& "C:\\Program Files\\Git\\cmd\\git.exe" clean -fdx'
]) {
  assert.equal(shield(command, windowsContext, windowsOptions).verdict, 'BLOCKED');
}
const redactedShield = shield('rm -rf C:\\Users\\Fixture\\private-cache', windowsContext, windowsOptions);
assert.equal(redactedShield.verdict, 'BLOCKED');
assert.match(redactedShield.proposedAction, /<USER_HOME>/u);
assert.doesNotMatch(JSON.stringify(redactedShield), /Users[\\/]Fixture/iu);

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
    target: testTarget,
    operation: 'recursive_delete',
    path: '.git',
    cwd: testTarget,
    out: '.git/config'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /limited to/u);
  await assert.rejects(() => destructivePreflightCommand({
    target: testTarget,
    operation: 'recursive_delete',
    path: '.git',
    cwd: testTarget,
    out: '../destructive-preflight.json'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /limited to/u);
  fs.mkdirSync(path.join(testTarget, 'tmp'), { recursive: true });
  const existingOutput = path.join(testTarget, 'tmp', 'existing-destructive-preflight.json');
  fs.writeFileSync(existingOutput, 'user-owned\n', 'utf8');
  await assert.rejects(() => destructivePreflightCommand({
    target: testTarget,
    operation: 'recursive_delete',
    path: '.git',
    cwd: testTarget,
    out: 'tmp/existing-destructive-preflight.json'
  }, { now: FIXED_TIME, repositoryRootVerified: true }), /already exists/u);
  assert.equal(fs.readFileSync(existingOutput, 'utf8'), 'user-owned\n');

  const ignoredHomeOverride = await destructivePreflightCommand({
    target: ROOT,
    operation: 'recursive_delete',
    path: '$HOME',
    home: ROOT
  }, { now: FIXED_TIME, repositoryRootVerified: true });
  assertBlocked(ignoredHomeOverride, 'USER_HOME');
  assert.equal(ignoredHomeOverride.resolvedTarget, '<USER_HOME>');

  const cwdDefaultsToProcess = await destructivePreflightCommand({
    target: testTarget,
    operation: 'recursive_delete',
    path: '.'
  }, {
    now: FIXED_TIME,
    repositoryRootVerified: true,
    homeDirectory: posixOptions.homeDirectory
  });
  assertBlocked(cwdDefaultsToProcess, 'OUTSIDE_REPOSITORY');

  const linkTarget = path.join(ROOT, 'tmp', 'tests', `flight-outside-${process.pid}-${Date.now()}`);
  const linkedRecorderRoot = path.join(ROOT, 'tmp', 'tests', `flight-link-${process.pid}-${Date.now()}`);
  fs.mkdirSync(linkTarget, { recursive: true });
  fs.mkdirSync(linkedRecorderRoot, { recursive: true });
  fs.symlinkSync(linkTarget, path.join(linkedRecorderRoot, '.controltower'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(
    () => appendFlightEvent(linkedRecorderRoot, 'BLOCKED', 'No write may traverse this link.', 'unit-test'),
    /symbolic link/u
  );
  assert.equal(fs.existsSync(path.join(linkTarget, 'flight-recorder.jsonl')), false);

  assert.throws(() => analyzeDestructiveAction({
    ...posixContext,
    requestedTarget: 'tmp/cache',
    platform: 'win64'
  }, posixOptions), /Unsupported platform/u);

  const output = execFileSync(process.execPath, [
    path.join(ROOT, 'cli', 'index.js'),
    'destructive-preflight',
    '--target', ROOT,
    '--operation', 'recursive_delete',
    '--path', '.git'
  ], { encoding: 'utf8' });
  assert.match(output, /DESTRUCTIVE ACTION PREFLIGHT/u);
  assert.match(output, /ANALYSIS ONLY · NO COMMAND EXECUTED/u);
  assert.match(output, /Decision: BLOCKED/u);
  assert.match(output, /Execution: NOT_RUN/u);
  console.log('PASS test_destructive_action_preflight');
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
