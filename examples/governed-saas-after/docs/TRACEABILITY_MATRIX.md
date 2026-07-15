# Traceability Matrix — InvoiceFlow Mini

> SIMULATED DEMO DATA. Traceability applies only to this controlled local fixture.

| Requirement | Plan | Implementation | Verification | Status |
| --- | --- | --- | --- | --- |
| Reject altered session tokens | IFM-02 | `src/auth.js` | tampered-token assertion | PASS |
| Resolve authorization server-side | IFM-02 | `src/auth.js` | owner login used by integration test | PASS |
| Require verified provider event | IFM-03 | `src/payments.js` | unverified-event rejection assertion | PASS |
| Deduplicate provider events | IFM-03 | `src/payments.js` | replay returns one stored payment | PASS |
| Match payment to open invoice total | IFM-03 | `src/payments.js` | successful exact-total flow | PASS |
| Preserve a durable audit record for rejected payment attempts | IFM-06 | No implementation recorded | No focused assertion or output | NOT_RUN |
| Keep skipped checks visible | IFM-04 | `docs/NOT_RUN_GATES.md` | document review | PASS |
| Connect real auth/payment services | IFM-05 | None; forbidden by mission | No check run | NOT_RUN |

Evidence commands and their boundaries are recorded in `docs/EVIDENCE_REPORT.md`.
