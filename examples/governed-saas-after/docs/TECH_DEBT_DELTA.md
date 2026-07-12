# Technical Debt Delta — InvoiceFlow Mini

> SIMULATED DEMO DATA. This is a comparative demonstration, not a customer audit.

## Reduced

| Before | After | Evidence |
| --- | --- | --- |
| Unsigned, caller-editable identity | HMAC-signed expiring token with server-side role lookup | `src/auth.js` and tamper test |
| Authentication failed open | Invalid tokens return `null` | `src/auth.js` |
| Caller-selected payment status | Status set only after a verified simulated event | `src/payments.js` |
| Duplicate payment events accepted | Provider event ID is idempotent | Replay assertion |
| Unknown invoice and arbitrary amount accepted | Open invoice and exact total required | `src/payments.js` |
| No reviewable delivery artifacts | Plans, gate, recorder, evidence, traceability | Governance files |

## Remaining

- The app is intentionally in-memory and loses state on exit (`WARN`).
- The signing approach is educational and not an identity-provider replacement (`WARN`).
- Only two focused local tests exist; broader gates remain `NOT_RUN`.
- Ownership is documented in the plan but no team `CODEOWNERS` file exists.

Net result: high-risk demo patterns were reduced without claiming production readiness.
