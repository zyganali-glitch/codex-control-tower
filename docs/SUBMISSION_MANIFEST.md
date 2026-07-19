# OpenAI Build Week Submission Manifest

This file identifies the public surfaces for the Codex Control Tower submission without embedding a self-referential commit SHA.

## Version state

| Item | Value |
| --- | --- |
| Project | Codex Control Tower |
| Track | Developer Tools |
| Final package version | `0.2.0` |
| Moving development source | [main](https://github.com/zyganali-glitch/codex-control-tower/tree/main) |
| Historical immutable baseline | [openai-build-week-final tag](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final) and [release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final) |
| Final v0.2.0 frozen source | [openai-build-week-final-v2 tag](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final-v2) |
| Final v0.2.0 release | [openai-build-week-final-v2 release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final-v2) |
| Public demo | [YouTube — displayed duration 2:59](https://youtu.be/EvtguYLSNkg) |
| No-install exhibit | [GitHub Pages](https://zyganali-glitch.github.io/codex-control-tower/) |
| Judge entry point | [JUDGE_START_HERE.md](../JUDGE_START_HERE.md) |
| Sanitized Devpost media | [Screenshot pack and exact English captions](../DEVPOST_SCREENSHOTS.md) |

The old `openai-build-week-final` tag must never be moved, deleted, or rewritten. It is the v0.1 historical baseline, not the v0.2.0 authority. The immutable `openai-build-week-final-v2` tag/release is the canonical submitted source; `main` remains moving development. GitHub Pages is a static visualization built from published source and may lag a local checkout.

## Evidence authority

| Surface | Purpose | Authority boundary |
| --- | --- | --- |
| GitHub Pages | Immediate, no-install product inspection | Static recorded exhibit; does not execute a visitor's repository or start a new model run |
| Devpost screenshot pack | Four sanitized 1920 × 1080 judge-facing views | Recorded public exhibit; captions preserve fictional/real and model/local authority boundaries |
| `npm run demo` | Reproducible deterministic fixture scan/test path | Current command output is authoritative for scores and fixture-test execution |
| `npm run demo:safety` | Analysis-only Destructive Action Preflight exhibit | Sanitized BLOCKED/NOT_RUN record; no deletion command or executable runs |
| `npm run demo:codex` | Real Blind GPT-5.6 Semantic Audit | Current local audit record is authoritative for model/run provenance; model opinion remains non-authoritative for locked facts |
| `openai-build-week-final-v2` | Frozen v0.2.0 implementation and documentation | Canonical submitted source |
| Devpost entry | Submitted text, public video URL, and private required fields | Canonical competition-form record |

The latest committed model record completed on 2026-07-16 through signed-in ChatGPT with `codex-cli 0.144.3` and `gpt-5.6-sol`. It accepted zero tool events in an empty ephemeral workspace and used a clean pre-run worktree at `587ddbd7b43e122d21598194e29a818a20c3f6a3`. Its recorded report was older than 24 hours, so `reportProvenance.status: WARN` and `stale: true` remain visible; a fresh scan matched score, risk flags, and changed files. The run produced 3 SUPPORTS / 3 CONTRADICTS, aligned on five local comparison outcomes, raised one HUMAN REVIEW REQUIRED mission conflict, and preserved one locked NOT_RUN. Its local/model controlled-fixture verdicts are both FAIL; the invocation itself completed successfully.

The v0.2.0 preflight record is a separate deterministic layer. `$HOME/..` resolves to `<USER_HOME_PARENT>`, returns BLOCKED, and retains NOT_RUN / `executed: false`. Protected filesystem, user, repository, `.git`, outside, symlink, or unresolved boundaries fail closed; a specific repository subpath is CAUTION. Public output is sanitized, and no test or demo runs deletion.

The optional project hook has one retained real verification: a matching supported `Bash` `PreToolUse` denied a deliberately nonexistent probe before execution with CLI `0.144.3`, model `gpt-5.6-sol`, and read-only sandboxing. No approval bypass occurred; a one-off vetted hook-trust bypass was used only for this check. Normal project/hash trust and complete tool interception are not verified. Sandboxing remains primary.

## Competition media and private-field boundary

- Public YouTube video: **PASS / PUBLIC** — https://youtu.be/EvtguYLSNkg; YouTube displays `2:59`.
- Devpost screenshot pack: **READY** — four sanitized 1920 × 1080 images with exact English captions in [`DEVPOST_SCREENSHOTS.md`](../DEVPOST_SCREENSHOTS.md).
- Audited editor plan: `2:57` across all 13 source slots; the published encode displays `2:59` and remains under three minutes.
- Old clip 03: retained 8-second terminal/local-dashboard startup proof.
- New `03 (YENİ)` source: separate 15-second Destructive Action Preflight view placed after clip 10.
- Existing clip 11: **RETAINED** unchanged as the 16-second historical-baseline repository capture and used in the published edit.
- Private `/feedback` Session ID: Devpost-only. It must never be copied into this public repository.

## Reproduction commands

~~~bash
npm install
npm run verify
npm run demo
npm run demo:safety
npm run dashboard
npm run demo:codex
~~~

The first five commands cover the deterministic path, analysis-only preflight, and local workbench. The last command is explicit opt-in, requires a signed-in ChatGPT account with `gpt-5.6-sol` access, and sends only the disclosed bounded evidence bundle. Pinned Codex CLI runs in a new empty ephemeral read-only workspace with user/project instructions and web/tool surfaces disabled; any tool/unknown/failed/malformed event rejects the result.

## Core implementation evidence

- `cli/commands/codex-review.js` — blind prompt, isolated real Codex invocation, fail-closed event/output validation, and reconciliation
- `tests/test_codex_review.js` — isolation, no-tool, evidence-bearing output, authority-boundary, and adversarial contract tests
- `cli/lib/destructiveActionPreflight.js` and `cli/lib/destructiveCommandParser.js` — canonical target policy and documented raw-command subset
- `tests/test_destructive_action_preflight.js` — no-delete boundary, privacy, integration, and deterministic regression coverage
- `.codex/hooks.json`, `.codex/hooks/destructive-preflight.js`, and `.controltower/CODEX_HOOK_VERIFICATION.json` — optional limited hook plus exact harmless verification boundary
- `apps/dashboard/` — judge-facing evidence workbench
- `examples/governed-saas-after/.controltower/` — bounded fictional-fixture evidence and recorded model run
- [Architecture](ARCHITECTURE.md) — data flow and trust boundary
- [Judging Map](JUDGING_MAP.md) — official criteria to evidence
- [Build Week Delta](BUILD_WEEK_DELTA.md) — in-period provenance
- [Codex Build Log](CODEX_BUILD_LOG.md) — executed verification history

## Required disclosure

InvoiceFlow Mini is fictional. The scans, focused fixture tests, evidence hashing, provenance checks, and recorded GPT-5.6 calls are real executions on controlled sample inputs. They are not customer outcomes, production validation, or independent security attestation.
