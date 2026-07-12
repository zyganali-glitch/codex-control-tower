# InvoiceFlow Mini — Governed Demo

> **SIMULATED DEMO DATA.** InvoiceFlow Mini is a controlled fixture for the
> Codex Control Tower demonstration, not a real customer system. It never calls
> a payment provider and contains no real credentials or customer records.

InvoiceFlow Mini tracks customers, invoices, and verified simulated payments for
small businesses. This directory represents the same small project as
`examples/messy-saas-before`, after local governance surfaces and targeted risk
controls have been added.

## Run locally

```bash
npm test
npm start
```

Node.js 18 or newer is required. The application stores data in memory and has
no runtime dependencies, network listener, database, telemetry, or analytics.

## Safety boundaries

- Authentication tokens are HMAC-signed with a caller-supplied demo secret.
- Roles are loaded from the server-side simulated user list, not from token claims.
- Payments require an authorized actor and a pre-verified simulated provider event.
- Provider event IDs are idempotent and amounts must match an open invoice.
- Any real authentication, persistence, or payment-provider integration requires
  a new plan and human approval.

## Governance state

- Review Gate: `APPROVED` for the bounded simulated hardening mission.
- Mistake Shield: `CLEAR` for this fixture; destructive payment/auth expansion is
  still outside the approved scope.
- Evidence: one working integration test was run with Node's test runner.
- NOT_RUN: dependency audit, browser tests, load tests, and real-provider tests.
- Remaining risk: this is illustrative in-memory code, not production software.

See [Architecture](docs/ARCHITECTURE.md), [Evidence Report](docs/EVIDENCE_REPORT.md),
[Traceability Matrix](docs/TRACEABILITY_MATRIX.md), and
[NOT_RUN Gates](docs/NOT_RUN_GATES.md) for the reviewable handoff.
