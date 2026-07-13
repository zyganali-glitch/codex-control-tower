# Phase-0 Alignment — InvoiceFlow Mini

> **SIMULATED DEMO DATA.** Generated from predefined English demo answers. The
> Build Week product supports English only.

| Prompt | Simulated answer |
| --- | --- |
| Goal | Harden the simulated invoice, authentication, and payment workflow without external services. |
| Audience | Small-business operators evaluating a lightweight tracker and Build Week demo viewers. |
| Success | Signed local sessions, verified idempotent simulated payments, synced docs, and a passing Node.js test. |
| Forbidden areas | Real providers, networks, databases, credentials, customer data, and files outside this fixture. |
| Biggest risk | Unsigned identity or unverified payment events marking the wrong invoice paid. |
| Expected evidence | Test output, auth and idempotency assertions, traceability, NOT_RUN gates, and review state. |
| Workflow | Startup |
| Next safe mission | Review the bounded hardening evidence without expanding scope. |

## First Codex Mission Prompt

Work only inside `examples/governed-saas-after`. Review the bounded auth and
payment hardening. Preserve the stated goal and prevent unsigned identity,
unverified payment, and duplicate event risks. Do not access forbidden areas.
Require the Node test result, traceability links, explicit NOT_RUN gates, and
current Review Gate status before reporting completion.

If new risky files or broader work are proposed, run `cct scan --target .` and
`cct review-gate --target . --status` before proceeding.
