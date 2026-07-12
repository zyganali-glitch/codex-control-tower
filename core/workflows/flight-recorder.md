# Workflow: Codex Flight Recorder

Maintain an append-only local JSONL trail that helps the next session distinguish
intent, action, evidence, and unfinished work.

## Record material events

- mission received and context loaded;
- Review Gate checked or transitioned;
- proposed and changed files;
- commands run with outcome and evidence path;
- `PASS`, `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` decisions;
- risks discovered, scope changes, and human decisions;
- closure summary and next safe action.

## Event shape

Each line should contain `schemaVersion`, ISO timestamp, event name, status, concise
summary, and relevant fields such as files, command, result, evidence, risk, or next
action. Add `simulated: true` for demo events.

## Integrity rules

Append; do not rewrite history to make a run look cleaner. Never record secrets,
tokens, raw customer data, or oversized command output. If exact evidence is absent,
use `NOT_RUN` or `WARN`. The recorder supports continuity but is not a signed audit log.
