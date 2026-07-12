# Codex Instructions — InvoiceFlow Mini

> SIMULATED DEMO DATA. These instructions govern only this controlled fixture.

## Before changing files

1. Read `plans/master-roadmap.md`, `.controltower/phase0.json`, and the current
   `.controltower/review-gate.json`.
2. Confirm the proposed files and actions are inside the approved scope.
3. Read `docs/MEMORY_LENS.md` and run the Mistake Shield for auth, payment,
   deletion, migration, or test-removal work.

## Allowed in the current mission

- Harden the in-memory simulated auth and payment paths.
- Update `src/`, `tests/`, plans, and evidence documents for that bounded work.
- Run local, non-destructive Node.js checks.

## Approval required

- Adding a real server, database, authentication provider, or payment provider.
- Changing public API contracts, deleting tests, or removing evidence history.
- Accessing the network, using real credentials, or processing real customer data.
- Writing outside this fixture.

## Evidence boundary

- Use `PASS` only for a check with a recorded command and observable result.
- Use `NOT_RUN` when a relevant check did not run; never infer a pass.
- Mark fixture data and mock provider events `SIMULATED`.
- Record changed files, commands, residual risks, and the next safe action in the
  flight recorder and evidence report.

## Delivery

Keep files focused and under 400 lines. Preserve idempotency and fail-closed auth.
End every mission with test results, NOT_RUN gates, remaining risks, review state,
and one next safe Codex mission.
