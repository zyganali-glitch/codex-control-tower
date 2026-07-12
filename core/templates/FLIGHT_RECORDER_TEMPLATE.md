# Codex Flight Recorder — {{PROJECT_NAME}}

Store events as append-only JSONL in `.controltower/flight-recorder.jsonl`.

## Event examples

```jsonl
{"schemaVersion":"1.0","timestamp":"{{ISO_TIMESTAMP}}","event":"MISSION_STARTED","status":"PASS","summary":"{{MISSION}}","simulated":false}
{"schemaVersion":"1.0","timestamp":"{{ISO_TIMESTAMP}}","event":"REVIEW_GATE_CHECKED","status":"{{GATE_STATUS}}","summary":"{{SCOPE_RESULT}}","simulated":false}
{"schemaVersion":"1.0","timestamp":"{{ISO_TIMESTAMP}}","event":"FILES_CHANGED","status":"PASS","files":["{{PATH}}"],"simulated":false}
{"schemaVersion":"1.0","timestamp":"{{ISO_TIMESTAMP}}","event":"CHECK_RECORDED","status":"{{PASS|WARN|FAIL|NOT_RUN|SIMULATED}}","command":"{{COMMAND_OR_NULL}}","result":"{{RESULT}}","evidence":"{{PATH_OR_NULL}}","simulated":false}
{"schemaVersion":"1.0","timestamp":"{{ISO_TIMESTAMP}}","event":"MISSION_CLOSED","status":"{{STATUS}}","summary":"{{BOUNDARY}}","nextSafeAction":"{{ACTION}}","simulated":false}
```

## Recording rules

- Append material events; do not erase inconvenient history.
- Keep entries concise and exclude secrets, personal data, and raw source content.
- Record actual outcomes and preserve `NOT_RUN` and `SIMULATED` distinctions.
- End with remaining risk and one next safe action.
