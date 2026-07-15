# NOT_RUN Gates — InvoiceFlow Mini

> SIMULATED DEMO DATA. `NOT_RUN` is intentional and is not equivalent to `PASS`.

| Gate | Status | Why it was not run | What would enable it |
| --- | --- | --- | --- |
| Dependency vulnerability audit | NOT_RUN | Fixture has no third-party packages | Run after dependencies are approved and installed |
| Browser / accessibility test | NOT_RUN | Fixture has no browser interface | Add a separately approved UI mission |
| Load / concurrency test | NOT_RUN | In-memory single-process demo | Define capacity goals and a test environment |
| Durable rejected-payment audit record | NOT_RUN | No persistence mechanism or focused assertion exists | Approve a bounded persistence design, implementation, and focused test |
| Real identity-provider test | NOT_RUN | Network and real credentials are forbidden | Human-approved integration plan and safe secrets handling |
| Real payment-provider test | NOT_RUN | No real money or provider access allowed | Human-approved sandbox plan and signed webhook design |
| Deployment smoke test | NOT_RUN | No deployment target exists | Approved deployment scope and environment |

These gates remain visible in the report and must not be summarized as successful.
