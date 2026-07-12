# Codex Review Gate — {{PROJECT_NAME}}

Human-readable mirror of `.controltower/review-gate.json`.

- Status: `{{AWAITING_HUMAN|APPROVED|REJECTED|BLOCKED}}`
- Mission: {{MISSION}}
- Decision reason: {{REASON}}
- Reviewer label: {{REVIEWER}}
- Decision time: {{ISO_TIMESTAMP}}
- Simulated: {{TRUE_OR_FALSE}}

## Allowed files and actions

- {{ALLOWED_PATH_OR_ACTION}}

## Forbidden without a new decision

- {{FORBIDDEN_PATH_OR_ACTION}}

## Required evidence

- {{EVIDENCE}}

## Machine-readable shape

```json
{
  "schemaVersion": "1.0",
  "status": "{{STATUS}}",
  "scope": "{{MISSION}}",
  "allowedFiles": ["{{PATH}}"],
  "forbiddenActions": ["{{ACTION}}"],
  "approvedBy": "{{REVIEWER_OR_NULL}}",
  "approvedAt": "{{ISO_TIMESTAMP_OR_NULL}}",
  "simulated": false
}
```

This local gate is review workflow evidence, not enterprise identity verification.
