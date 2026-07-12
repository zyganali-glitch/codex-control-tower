# Codex Control Tower Instructions

Use this adapter as the starting point for a target repository's `.codex/AGENTS.md`.
Replace bracketed values during initialization; do not silently invent policy.

## Mission

- Goal: `[goal]`
- Approved scope: `[allowed files and features]`
- Forbidden scope: `[forbidden files, features, and actions]`
- Required evidence: `[commands, checks, and artifacts]`

## Before implementation

1. Read `.controltower/phase0.json`, `plans/master-roadmap.md`, and applicable
   architecture and memory documents.
2. Check `.controltower/review-gate.json`. Work beyond safe planning requires an
   `APPROVED` gate whose scope covers the proposed action.
3. Run the Mistake Shield for risky, destructive, security, payment, migration,
   dependency, or test-removal actions.
4. Identify unrelated working-tree changes and preserve them.

## Work rules

- Stay inside approved files and make the smallest coherent change.
- Do not delete, reset, publish, deploy, access a network, or handle credentials
  without explicit approval.
- Keep modules focused; flag files over the configured line threshold.
- Update tests and documentation when behavior or contracts change.
- Record commands, changed files, results, remaining risks, and next safe action.

## Evidence boundary

- `PASS`: direct, reproducible evidence exists.
- `WARN`: concern exists but work may continue within policy.
- `FAIL`: a required check ran and failed.
- `NOT_RUN`: relevant check did not run; never imply success.
- `SIMULATED`: demo or mock evidence, clearly separated from real validation.

## Completion

Do not equate edited code with validated work. Report plan coverage, changes,
commands, evidence, gate status, documentation state, NOT_RUN checks, residual
risks, and exactly one next safe mission.
