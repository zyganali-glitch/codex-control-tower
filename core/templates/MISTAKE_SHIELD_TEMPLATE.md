# Codex Mistake Shield — {{PROJECT_NAME}}

## Proposed action

{{ACTION_AND_TARGET_FILES}}

## Decision: {{CLEAR|CAUTION|BLOCKED}}

| Signal or rule | Source | Match | Effect | Mitigation |
| --- | --- | --- | --- | --- |
| {{RULE}} | {{PHASE0_GATE_MEMORY_OR_SCAN_PATH}} | {{MATCH_EXPLANATION}} | {{RISK}} | {{MITIGATION}} |

## Review scope comparison

- Gate status: {{STATUS}}
- Scope match: {{PASS|WARN|FAIL}}
- Files outside approval: {{PATHS_OR_NONE}}

## Required evidence

- {{CHECK_OR_ARTIFACT}}

## Next safe action

{{ONE_BOUNDED_ACTION}}

A Mistake Shield decision is deterministic guidance. It never proves correctness,
successful testing, or human authorization by itself, and it never blocks silently.
