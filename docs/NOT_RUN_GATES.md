# Root Repository Evidence Gates

This list separates completed release evidence from work that is still unavailable. A successful static GitHub Pages deployment does not imply that the fictional fixture's provider, accessibility, load, or security gates passed.

## Verified external gates

| Gate | Status | Evidence / boundary |
| --- | --- | --- |
| Published Devpost rules and FAQ review | PASS | The current [official rules](https://openai.devpost.com/rules) and [official FAQ](https://openai.devpost.com/details/faqs) were reviewed during the Build Week hardening work. Requirements must still be rechecked immediately before submission because the organizer may update the site. |
| Real OpenAI/Codex integration | PASS | The explicit opt-in `npm run demo:codex` path verifies signed-in ChatGPT and runs real `gpt-5.6-sol` with medium reasoning read-only. Locked comparison targets/expected classes are withheld; local verdict remains authoritative. |
| Static judge-exhibit deployment | PASS | The public page is anonymously reachable. Current status is read from [Pages workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml) and the final tag; old workflow IDs are history only. This is a static recorded exhibit, not a hosted scanner or live Codex service. |

## Gates that remain NOT_RUN

| Gate | Status | Why | Next evidence |
| --- | --- | --- | --- |
| Independent user validation | NOT_RUN | No participant count, quotes, or outcomes are claimed. | Use `USER_VALIDATION.md` with consent and report only observed results. |
| Accessibility audit | NOT_RUN | No named keyboard, contrast, semantics, or screen-reader audit artifact exists. | Run and record a bounded accessibility review. |
| Load/concurrency test | NOT_RUN | The competition version is a local CLI/dashboard and static judge exhibit. | Define a realistic repository corpus and performance budget. |
| Fixture/provider deployment | NOT_RUN | InvoiceFlow Mini has no real auth, payment, or customer provider. | Add only with a real integration and named execution evidence. |
| Independent security review | NOT_RUN | No external reviewer has signed off. | Review filesystem, command, dependency, model-input, and publication boundaries. |

`NOT_RUN` is not failure and is never silently promoted to PASS. It means no named execution artifact supports the claim.

## Submission-form-only completion assumption

For the final jury/readiness evaluation, the public under-three-minute YouTube video, spoken Codex/GPT-5.6 explanation, media privacy review, and real primary-task `/feedback` field are treated as completed. Devpost is authoritative for the video URL and private field. The private Session ID must never appear in this repository; its absence here is intentional, not a product NOT_RUN gate.
