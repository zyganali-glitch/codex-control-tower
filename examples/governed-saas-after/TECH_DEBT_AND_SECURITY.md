# Brownfield Quarantine — InvoiceFlow Mini

> SIMULATED DEMO DATA. This safety record applies only to the controlled fixture.

## Quarantined risk areas

- `src/auth.js`: identity and authorization behavior; change only with focused tests.
- `src/payments.js`: settlement state and idempotency; no real provider access.
- `tests/invoiceflow.test.js`: retained evidence; deletion requires a new approval.

## Protected boundaries

Do not add network access, real credentials, customer data, persistence, deployment,
or real payment/authentication services. Preserve unrelated changes and write only
inside this fixture. Move the Review Gate to `AWAITING_HUMAN` before expanding scope.

## Known residual debt

The app is an in-memory educational example, has no concurrency or deployment proof,
and uses an illustrative signing flow. Those limitations remain `WARN`; real
integration, load, browser, and deployment checks remain `NOT_RUN`.
