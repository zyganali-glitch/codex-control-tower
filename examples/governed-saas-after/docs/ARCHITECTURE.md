# Architecture — InvoiceFlow Mini

> SIMULATED DEMO DATA. This architecture is deliberately local and small.

## System boundary

InvoiceFlow Mini is a CommonJS Node.js domain fixture. It has no HTTP listener,
database, UI, external identity system, payment SDK, telemetry, or network call.
All state exists in a single in-memory store created by `createApp`.

```text
app.js
├── auth.js       signed local sessions and server-side role lookup
├── customers.js  customer validation and in-memory writes
├── invoices.js   invoice validation and lifecycle
├── payments.js   authorization, event verification, and idempotency
└── report.js     read-only aggregate summary
```

`utils.js` owns ID, money, and timestamp helpers. `tests/invoiceflow.test.js`
exercises the critical cross-module path and rejection behavior.

## Trust boundaries

1. Callers may supply customer and invoice input; modules validate required fields.
2. Session claims are signed, but authorization resolves from the local user store.
3. A provider event is considered verified only when an upstream simulated adapter
   supplies `verified: true`; no real verification occurs in this fixture.
4. Payment records require an authorized owner, an open invoice, matching amount,
   and a unique provider event ID.

## Governance layer

`.codex/AGENTS.md` sets agent boundaries. `.controltower/` stores Phase-0 alignment,
review state, policy, and append-only demo events. `plans/` defines approved intent;
evidence documents record what passed, what remains `NOT_RUN`, and what comes next.

## Known limits

The modules illustrate control placement; they are not a complete security design.
Any server, database, provider, deployment, or multi-user concurrency work requires
a separately approved architecture and evidence plan.
