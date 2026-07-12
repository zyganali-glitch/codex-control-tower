# Workflow: Codex Mistake Shield

Evaluate a proposed action against local minefield lessons, architecture rules,
forbidden areas, review scope, and deterministic risk terms.

## Inputs

- proposed action and target files;
- Phase-0 risks and forbidden areas;
- Review Gate scope;
- Memory Lens minefields and architecture rules;
- repository signals such as auth, payment, migration, deletion, secrets, tests,
  deployment, and large blast radius.

## Decisions

- `CLEAR`: no applicable rule is violated; explain the supporting context.
- `CAUTION`: work may be safe with named mitigations or additional evidence.
- `BLOCKED`: action conflicts with policy or approval; state what must change.

## Rules

Never block silently. Cite the matching rule or signal and return a next safe action.
Do not claim semantic certainty from lexical matching. A `CLEAR` result is guidance,
not proof of correctness, authorization, or successful testing.
