# Technical Debt Delta

Generated: 2026-07-13T20:54:46.627Z

**WARN** — this scan reports current risks; it does not infer a historical before/after delta without two evidence-backed snapshots.

- WEAK_EVIDENCE: Evidence report has no substantial proof boundary — Record scoped statuses, commands or artifact paths, and honest NOT_RUN items.
- WEAK_TESTS: Tests are missing or only placeholders — Add a small working test and record its command.
- NO_ARCHITECTURE: Architecture documentation is missing — Add docs/ARCHITECTURE.md.
- UNTRACKED_TODO: 6 TODO/FIXME marker(s) detected — Move markers into the roadmap or tech-debt delta.
- STALE_README: README is missing, tiny, or marked stale — Rewrite or synchronize README with verified behavior.
- RISKY_AUTH: Risky authentication logic detected — Require signed token verification and focused auth tests before changes.
- RISKY_PAYMENT: Risky payment state logic detected — Verify provider events, amounts, currency, and idempotency before marking paid.
