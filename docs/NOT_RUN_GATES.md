# Root Repository Evidence Gates

This list separates completed release evidence from work that is still unavailable. A successful static GitHub Pages deployment does not imply that the fictional fixture's provider, accessibility, load, or security gates passed.

## Verified external gates

| Gate | Status | Evidence / boundary |
| --- | --- | --- |
| Published Devpost rules and FAQ review | PASS | The current [official rules](https://openai.devpost.com/rules) and [official FAQ](https://openai.devpost.com/details/faqs) were reviewed during the Build Week hardening work. Requirements must still be rechecked immediately before submission because the organizer may update the site. |
| Real OpenAI/Codex integration | PASS | The explicit opt-in `npm run demo:codex` path verifies signed-in ChatGPT and runs real `gpt-5.6-sol` with medium reasoning read-only. Locked comparison targets/expected classes are withheld; local verdict remains authoritative. |
| Static judge-exhibit deployment | PASS for published v0.2.0 candidate | [Pages run 29606886221](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29606886221) deployed commit `97d35d4f5e2c8d3884c8d61dcce504f285c06670`; the public page returned HTTP 200 and the deployed asset exposed the sanitized preflight markers. The existing old tag remains a v0.1 baseline, while the v2 tag/release remains pending the real public YouTube media. This is a static recorded exhibit, not a hosted scanner or live Codex service. |
| Harmless Codex hook denial probe | PASS for exact path | Matching `Bash` `PreToolUse` denied a nonexistent probe before execution with CLI `0.144.3`, `gpt-5.6-sol`, and read-only sandboxing. One-off hook-trust bypass only; no approval bypass. This does not prove normal trust setup or complete interception. |

## Gates that remain NOT_RUN

| Gate | Status | Why | Next evidence |
| --- | --- | --- | --- |
| Independent user validation | NOT_RUN | No participant count, quotes, or outcomes are claimed. | Use `USER_VALIDATION.md` with consent and report only observed results. |
| Accessibility audit | NOT_RUN | No named keyboard, contrast, semantics, or screen-reader audit artifact exists. | Run and record a bounded accessibility review. |
| Load/concurrency test | NOT_RUN | The competition version is a local CLI/dashboard and static judge exhibit. | Define a realistic repository corpus and performance budget. |
| Fixture/provider deployment | NOT_RUN | InvoiceFlow Mini has no real auth, payment, or customer provider. | Add only with a real integration and named execution evidence. |
| Independent security review | NOT_RUN | No external reviewer has signed off. | Review filesystem, command, dependency, model-input, and publication boundaries. |
| Normal project/hash hook trust setup | NOT_RUN | The bounded verification deliberately used a one-off vetted hook-trust bypass. | Trust the project/config through the documented normal flow and record a separate harmless check without weakening sandbox/approvals. |
| Complete destructive tool interception | NOT_RUN / unsupported claim | Official `PreToolUse` coverage is incomplete and this matcher covers supported `Bash` forms only. | Do not promote this to PASS; retain sandbox, permissions, review, and command-specific evidence. |
| Final public YouTube video | NOT_RUN | No real public URL has been supplied or anonymously verified. | Verify public access, audio, duration below three minutes, and privacy when the user supplies the URL. |
| Replacement clip 11 and immutable v2 release | NOT_RUN | They must wait for the real public YouTube URL and final source state. | Record clip 11 only after the real tag/release exist; never move the old tag or invent v2. |

`NOT_RUN` is not failure and is never silently promoted to PASS. It means no named execution artifact supports the claim.

## Submission-form boundary

The public under-three-minute YouTube video remains PENDING until a real URL is supplied and verified. The private primary-task `/feedback` field is not a public repository gate: its real value belongs only in Devpost and must never appear here.
