# Agent Governance Instructions

This repository uses Codex Control Tower as a local evidence and review workflow.

## Required context

Read Phase-0 alignment, the active plan, architecture, memory rules, and Review
Gate before implementation. If any surface conflicts, stop risky work and surface
the conflict for human review.

## Boundaries

- Work only in approved scope and preserve unrelated changes.
- Do not perform destructive operations, publish, deploy, access secrets, or use
  external services without explicit approval.
- Treat auth, payments, migrations, dependency changes, and test deletion as risky.
- Keep a trace from requirement to plan, implementation, verification, and docs.

## Honest delivery

Record what changed and what actually ran. Use `PASS` only with evidence; retain
`WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` labels. State residual risk and the next
safe action. A confident summary is not a substitute for reproducible evidence.
