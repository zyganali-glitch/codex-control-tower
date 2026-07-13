# Root Repository Evidence Gates

This list separates completed release evidence from work that is still unavailable. A successful static GitHub Pages deployment does not imply that the fictional fixture's provider, accessibility, load, or security gates passed.

## Verified external gates

| Gate | Status | Evidence / boundary |
| --- | --- | --- |
| Published Devpost rules and FAQ review | PASS | The current [official rules](https://openai.devpost.com/rules) and [official FAQ](https://openai.devpost.com/details/faqs) were reviewed during the Build Week hardening work. Requirements must still be rechecked immediately before submission because the organizer may update the site. |
| Real OpenAI/Codex integration | PASS | The explicit opt-in `npm run demo:codex` path verified the signed-in ChatGPT session and ran real `gpt-5.6-sol` read-only. The deterministic local verdict remains authoritative. |
| Static judge-exhibit deployment | PASS | Historical GitHub Pages workflow run [`29279549424`](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29279549424) completed successfully for published baseline `416d145`; the public page returned successfully without authentication. Current status is read from workflow history. This is a static recorded exhibit, not a hosted scanner or live Codex service. |

## Gates that remain NOT_RUN

| Gate | Status | Why | Next evidence |
| --- | --- | --- | --- |
| Final submission-media privacy review | NOT_RUN | The final public YouTube video and final screenshot set are not stored or verified in this repository. | Inspect every final frame for personal paths, credentials, private tasks, unsupported claims, and the private `/feedback` Session ID. |
| Final public YouTube URL | NOT_RUN | No video URL has been supplied to this repository. | Record a sub-three-minute demo, publish it publicly, then add the verified URL only where required. |
| Final `/feedback` Session ID | NOT_RUN in public evidence | The value must come from the primary Codex build task and belongs only in the private Devpost form. | Run `/feedback` in the primary task and paste the real value into Devpost; never commit it. |
| Independent user validation | NOT_RUN | No participant count, quotes, or outcomes are claimed. | Use `USER_VALIDATION.md` with consent and report only observed results. |
| Accessibility audit | NOT_RUN | No named keyboard, contrast, semantics, or screen-reader audit artifact exists. | Run and record a bounded accessibility review. |
| Load/concurrency test | NOT_RUN | The competition version is a local CLI/dashboard and static judge exhibit. | Define a realistic repository corpus and performance budget. |
| Fixture/provider deployment | NOT_RUN | InvoiceFlow Mini has no real auth, payment, or customer provider. | Add only with a real integration and named execution evidence. |
| Independent security review | NOT_RUN | No external reviewer has signed off. | Review filesystem, command, dependency, model-input, and publication boundaries. |

`NOT_RUN` is not failure and is never silently promoted to PASS. It means no named execution artifact supports the claim.
