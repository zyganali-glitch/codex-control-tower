# Root Repository Evidence Report

This report describes real repository/build evidence. InvoiceFlow Mini is a fictional sample project with prepared before/after snapshots; their `25 → 88` values are real deterministic scan results on those snapshots, not customer outcomes or a benchmark. GPT-5.6 did not produce that transformation.

## Published checkpoint and current authority

A fully published checkpoint before the current coherence hardening is commit `416d145`; it is historical. The existing `openai-build-week-final` tag is the immutable v0.1 baseline. The v0.2.0 candidate is on moving `main`; current command output, generated evidence records, and workflow history govern it until a verified public YouTube URL allows creation of the separate immutable `openai-build-week-final-v2` tag/release.

| Check | Status | Evidence / boundary |
| --- | --- | --- |
| Final v0.2.0 local verification | PASS | On 2026-07-17, `npm test` and `npm run verify` passed the full core/CLI, persistence, harmless-hook, privacy, source-protection, and 11 dashboard adapter checks; deterministic demo regeneration completed; dependency audit reported zero known vulnerabilities; and Vite built 52 modules. |
| Deterministic demo | PASS | Real scans of the two prepared fictional snapshots produced `25/100` with 16 risks and `88/100` with one remaining risk; two focused fixture tests passed. |
| Root dogfooding boundary | PASS | [Portable root evidence](ROOT_REPO_SCAN.json) records `REAL_LOCAL_SCAN`, no simulated-data flag, `100/100`, zero risks, zero missing surfaces, base commit `633fe839e44a67d53befd29422e3f0167400be13`, and a clean worktree at scan time. Fictional fixtures/generated output are explicitly excluded. The score is heuristic, not a correctness or security certificate. |
| Real Blind GPT-5.6 Semantic Audit execution | PASS execution; WARN provenance age | The latest recorded call completed on 2026-07-16 through signed-in ChatGPT with pinned `codex-cli 0.144.3` and exact `gpt-5.6-sol`: empty ephemeral read-only workspace, disabled instruction/web/environment/approval surfaces, accepted tool events 0, and clean pre-run worktree at `587ddbd7b43e122d21598194e29a818a20c3f6a3`. The recorded report was older than 24 hours, so its `WARN` / `stale: true` provenance remains visible; a fresh scan matched score, risk flags, and changed files. The model returned 3 SUPPORTS / 3 CONTRADICTS; five policy alignments plus one mission semantic conflict produced HUMAN REVIEW REQUIRED while one NOT_RUN stayed locked. |
| Destructive Action Preflight contract | PASS in final local suite | Supported structured/raw intent is expanded and canonicalized, then compared with filesystem root, user home/parent, verified repository root, `.git`, outside, uncertain, and symlink boundaries. Results are sanitized BLOCKED/CAUTION records with NOT_RUN, `executed: false`, and human review. Persistence and recorder paths reject unverified roots and linked paths. Tests and `npm run demo:safety` never perform deletion. |
| Real optional `PreToolUse` denial | PASS for exact bounded probe | Pinned Codex CLI `0.144.3` with `gpt-5.6-sol` denied the nonexistent harmless `cct-preflight-probe --operation recursive_delete --path $HOME/..` before execution in a read-only sandbox. No approval bypass occurred. Verification used a one-off vetted hook-trust bypass only; normal project/hash trust, other tools, unsupported forms, hook-failure behavior, and complete interception are not proven. |
| Honest audit verdict | FAIL — controlled fixture | Both the local fixture verdict and separate model verdict are FAIL because the fictional target has no CI/external completion and does not implement or test the durable rejected-payment audit criterion. This is the value-producing evidence result, not a failed model invocation or failed Control Tower CI run. |
| Evidence provenance | PASS integrity / WARN freshness | The current reconciliation record contains bounded evidence, command/model metadata, base Git commit plus clean pre-run worktree state, a visible stale-report warning with a matching fresh-scan comparison, full-file hashes, exact included-content hashes, and final bundle SHA-256 `e8f14df20bcb975c7cab56ed601e64779e66a0f38da7c5c76bfa366bdf495722`. All 12 recorded evidence files existed at bundle time; unsupported citation paths are filtered from accepted citations and recorded for inspection. |
| Dashboard data-contract integrity | PASS | Eleven adapter/regression tests cover absent fields, false-value preservation, privacy, hook non-synthesis, and locked reconciliation state; the final local production Vite build transformed 52 modules. The local dashboard shows live state, while GitHub Pages shows only a static recorded snapshot. |
| Source protection | PASS | `SOURCE_PROTECTION.md`, the source-protection test, and the independent repository boundary protect the Universal Agent OS family research sources. |
| Static GitHub Pages judge exhibit | PASS | Public page is anonymously reachable; current deployment status is read from [workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml). Old run IDs remain history only. |
| Final public YouTube video | PENDING | The 12-clip plan totals 2:52 and new clip 03 is specified. No real public URL has been supplied or invented; replacement clip 11 and the v2 tag/release wait on that external asset. |
| Private `/feedback` entry | PRIVATE FORM ONLY | The Session ID is intentionally absent from public source and must remain in Devpost only. |
| Real user validation | NOT_RUN | No participant, quote, or outcome is invented. See `USER_VALIDATION.md`. |
| Fixture/provider deployment, load, accessibility, independent security review | NOT_RUN | The static Pages exhibit does not convert these separate gates to PASS. |

## Evidence policy

- `PASS` means an executed check or inspectable artifact supports the bounded claim.
- `WARN` means proof is partial, stale, ambiguous, or needs human interpretation.
- `FAIL` records an observed failure or contradiction.
- `NOT_RUN` means no execution/result artifact exists.
- `SIMULATED` is reserved for controlled sample actors/events. The scan/test/model executions are labeled separately as real.

Evidence freshness matters. If the target, report, or evidence bundle changes after recording, the reconciliation must be marked stale and rerun; an old PASS must not silently describe new content.
