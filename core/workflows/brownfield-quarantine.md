# Workflow: Brownfield Quarantine

Use this workflow before changing an existing repository with incomplete context.

## Discover without mutating

1. Inspect repository instructions, status, plans, architecture, tests, CI, and docs.
2. Identify existing uncommitted work, generated files, large files, TODO/FIXME
   clusters, risky areas, and stale or contradictory guidance.
3. Build a context trace from proposed files to tests, plans, docs, and owners.
4. Mark unknown ownership and missing validation as risk; do not assume absence.

## Create the quarantine boundary

- List exact allowed paths for the mission.
- List protected legacy paths and unrelated changes.
- State forbidden destructive actions and external side effects.
- Require human approval for expanding beyond that boundary.
- Prefer additive or reversible changes until behavior is understood.

## Exit criteria

Leave quarantine only when the plan, blast radius, evidence expectations, Review
Gate, and rollback or recovery path are reviewable. Unknown checks remain
`NOT_RUN`; scanned heuristics remain `WARN` until evidence resolves them.
