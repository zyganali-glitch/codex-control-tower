# Codex Memory Lens — InvoiceFlow Mini

> SIMULATED DEMO DATA. This deterministic memory snapshot is local to the fixture.

## State memory

- Current mission: review bounded auth and payment hardening.
- Review Gate: `APPROVED` for named local fixture files.
- Verification: two Node tests pass; external and non-local gates remain `NOT_RUN`.
- Next safe action: inspect evidence; request a new gate for scope expansion.

## Persona and user preferences

- Prefer a small, understandable three-minute demo.
- Keep the default path local-first, deterministic, and dependency-free.
- Surface uncertainty, simulated evidence, and skipped checks explicitly.

## Minefield history

- Never trust a role embedded in an unsigned or caller-controlled token.
- Never accept client-selected payment status as provider truth.
- Never process the same provider event twice.
- Never turn `NOT_RUN` into `PASS` or imply a demo fixture is a customer system.

## Code soul and architecture rules

- Keep domain modules separate and under 400 lines.
- Inject sensitive configuration; do not commit real secrets.
- Keep providers and network access outside the fixture.
- Pair risky behavior changes with a focused test and traceability row.

## Freshness

Snapshot date: 2026-07-12. Re-scan after any auth, payment, test, or architecture
change. Treat this document as `WARN` if the code changes without a matching update.
