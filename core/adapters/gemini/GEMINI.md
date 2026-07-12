# Codex Control Tower Adapter for Gemini

Use the local Control Tower files as the source of truth for mission boundaries.

1. Load Phase-0 alignment, the master roadmap, architecture, memory, and review state.
2. Confirm proposed files and actions are covered by an approved mission.
3. Evaluate risky work against the Mistake Shield before implementation.
4. Keep changes small, preserve unrelated work, and avoid destructive operations.
5. Do not use network access, credentials, deployment, or external services unless
   the current gate explicitly approves them.
6. Update tests, traceability, and docs when behavior changes.
7. Record actual commands and results. Keep failed and skipped checks visible.

Use `PASS` only with evidence. Distinguish `WARN`, `FAIL`, `NOT_RUN`, and
`SIMULATED`. Finish with remaining risks and one next safe action.
