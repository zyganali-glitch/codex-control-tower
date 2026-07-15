# OpenAI Build Week Submission Manifest

This file identifies the public surfaces for the Codex Control Tower submission without embedding a self-referential commit SHA.

## Canonical version

| Item | Value |
| --- | --- |
| Project | Codex Control Tower |
| Track | Developer Tools |
| Frozen source reference | `openai-build-week-final` |
| Frozen source | [tag tree](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final) |
| Release record | [openai-build-week-final release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final) |
| Moving development branch | [main](https://github.com/zyganali-glitch/codex-control-tower/tree/main) |
| No-install exhibit | [GitHub Pages](https://zyganali-glitch.github.io/codex-control-tower/) |
| Judge entry point | [JUDGE_START_HERE.md](../JUDGE_START_HERE.md) |

The final tag is the frozen code/document reference. `main` may move after submission. GitHub Pages is a static visualization built from the published repository; where a display and an artifact disagree, the tagged source artifact and reproducible command output are authoritative.

## Evidence authority

| Surface | Purpose | Authority boundary |
| --- | --- | --- |
| GitHub Pages | Immediate, no-install product inspection | Static recorded exhibit; does not execute a visitor's repository or start a new model run |
| `npm run demo` | Reproducible deterministic fixture scan/test path | Current command output is authoritative for scores and fixture-test execution |
| `npm run demo:codex` | Real Blind GPT-5.6 Semantic Audit | Current local audit record is authoritative for model/run provenance; model opinion remains non-authoritative for locked facts |
| Tagged repository | Frozen implementation and documentation | Canonical submitted source |
| Devpost entry | Submitted text, public video URL, and private required fields | Canonical competition-form record |

## Competition media and private-field boundary

The submission-readiness assessment treats these form-only requirements as completed:

- a public YouTube demonstration shorter than three minutes, with spoken explanations of Codex and GPT-5.6;
- the real `/feedback` Session ID obtained from the primary Codex build task and entered in the private Devpost field.

The private Session ID must never be copied into this public repository. The public video URL is read from the Devpost entry rather than fabricated here.

## Reproduction commands

~~~bash
npm install
npm run verify
npm run demo
npm run dashboard
npm run demo:codex
~~~

The first four commands cover the deterministic path and local workbench. The last command is explicit opt-in, requires a signed-in ChatGPT account with `gpt-5.6-sol` access, and sends only the disclosed bounded evidence bundle. Pinned Codex CLI runs in a new empty ephemeral read-only workspace with user/project instructions and web/tool surfaces disabled; any tool/unknown/failed/malformed event rejects the result.

## Core implementation evidence

- `cli/commands/codex-review.js` — blind prompt, isolated real Codex invocation, fail-closed event/output validation, and reconciliation
- `tests/test_codex_review.js` — isolation, no-tool, evidence-bearing output, authority-boundary, and adversarial contract tests
- `apps/dashboard/` — judge-facing evidence workbench
- `examples/governed-saas-after/.controltower/` — bounded fictional-fixture evidence and recorded model run
- [Architecture](ARCHITECTURE.md) — data flow and trust boundary
- [Judging Map](JUDGING_MAP.md) — official criteria to evidence
- [Build Week Delta](BUILD_WEEK_DELTA.md) — in-period provenance
- [Codex Build Log](CODEX_BUILD_LOG.md) — executed verification history

## Required disclosure

InvoiceFlow Mini is fictional. The scans, focused fixture tests, evidence hashing, provenance checks, and recorded GPT-5.6 calls are real executions on controlled sample inputs. They are not customer outcomes, production validation, or independent security attestation.
