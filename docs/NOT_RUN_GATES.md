# Root Repository Evidence Gates

This list separates completed release evidence from work that is still unavailable. A successful static GitHub Pages deployment does not imply that the fictional fixture's provider, accessibility, load, or security gates passed.

## Verified external gates

| Gate | Status | Evidence / boundary |
| --- | --- | --- |
| Published Devpost rules and FAQ review | PASS | The current [official rules](https://openai.devpost.com/rules) and [official FAQ](https://openai.devpost.com/details/faqs) were reviewed during the Build Week hardening work. Requirements must still be rechecked immediately before submission because the organizer may update the site. |
| Real OpenAI/Codex integration | PASS | The explicit opt-in `npm run demo:codex` path verifies signed-in ChatGPT and runs real `gpt-5.6-sol` with medium reasoning read-only. Locked comparison targets/expected classes are withheld; local verdict remains authoritative. |
| Static judge-exhibit deployment | PASS | [Current Pages workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml) records the published build/deploy; the public page is anonymously reachable and exposes the sanitized preflight markers. This is a static recorded exhibit, not a hosted scanner or live Codex service. |
| Harmless Codex hook denial probe | PASS for exact path | Matching `Bash` `PreToolUse` denied a nonexistent probe before execution with CLI `0.144.3`, `gpt-5.6-sol`, and read-only sandboxing. One-off hook-trust bypass only; no approval bypass. This does not prove normal trust setup or complete interception. |
| Final public YouTube video | PASS / PUBLIC | [Accepted demo](https://youtu.be/EvtguYLSNkg) is anonymously reachable, displays as 2:59, and contains audible Codex/GPT-5.6/preflight narration. The 13-slot editor plan totals 2:57; the published encode remains under three minutes. |
| Immutable v2 tag/release | PASS | [openai-build-week-final-v2](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final-v2) is the canonical submitted source. The old `openai-build-week-final` tag remains untouched as the v0.1 baseline. |

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

`NOT_RUN` is not failure and is never silently promoted to PASS. It means no named execution artifact supports the claim.

## Submission-form boundary

The public under-three-minute YouTube video is verified at https://youtu.be/EvtguYLSNkg. The private primary-task `/feedback` field is not a public repository gate: its real value belongs only in Devpost and must never appear here.
