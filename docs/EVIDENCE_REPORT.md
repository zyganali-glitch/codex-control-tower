# Root Repository Evidence Report

This report describes real repository/build evidence. InvoiceFlow Mini is a fictional sample project with prepared before/after snapshots; their `25 → 88` values are real deterministic scan results on those snapshots, not customer outcomes or a benchmark. GPT-5.6 did not produce that transformation.

## Published checkpoint and current authority

A fully published checkpoint before the current coherence hardening is commit `416d145`; it is historical, not the submission authority. The frozen `openai-build-week-final` tag, current command output, generated audit record, and live workflow history govern the final version.

| Check | Status | Evidence / boundary |
| --- | --- | --- |
| Full local verification | PASS | Final pre-audit `npm run verify` passed: root tests, seven dashboard data-contract tests, deterministic demo regeneration, dependency audit with zero known vulnerabilities, and production dashboard build. Exact transient module counts are not treated as a product guarantee. |
| Deterministic demo | PASS | Real scans of the two prepared fictional snapshots produced `25/100` with 16 risks and `88/100` with one remaining risk; two focused fixture tests passed. |
| Root dogfooding boundary | PASS | [Portable root evidence](ROOT_REPO_SCAN.json) records `REAL_LOCAL_SCAN`, no simulated-data flag, `100/100`, zero risks, zero missing surfaces, base commit `633fe839e44a67d53befd29422e3f0167400be13`, and a clean worktree at scan time. Fictional fixtures/generated output are explicitly excluded. The score is heuristic, not a correctness or security certificate. |
| Real Blind GPT-5.6 Semantic Audit execution | PASS | Final recorded call completed through signed-in ChatGPT with pinned `codex-cli 0.144.3` and exact `gpt-5.6-sol`: empty ephemeral read-only workspace, disabled instruction/web/environment/approval surfaces, accepted tool events 0, fresh report, and clean pre-run worktree at `470944e`. The model returned 3 SUPPORTS / 3 CONTRADICTS; five policy alignments plus one mission semantic conflict produced HUMAN REVIEW REQUIRED while one NOT_RUN stayed locked. |
| Honest audit verdict | FAIL — controlled fixture | Both the local fixture verdict and separate model verdict are FAIL because the fictional target has no CI/external completion and does not implement or test the durable rejected-payment audit criterion. This is the value-producing evidence result, not a failed model invocation or failed Control Tower CI run. |
| Evidence provenance | PASS | The current reconciliation record contains bounded evidence, command/model metadata, base Git commit plus clean pre-run worktree state, fresh report comparison, full-file hashes, exact included-content hashes, and final bundle SHA-256 `43107422f4aacb65c27e7bfaa59a1528503c7429fbfe10a7032dd7543f1cd1d9`. All 12 recorded evidence files existed at bundle time; unsupported citation paths are filtered from accepted citations and recorded for inspection. |
| Dashboard data-contract integrity | PASS | Adapter/regression tests cover absent fields and locked reconciliation state; a production Vite build completed. The local dashboard shows live state, while GitHub Pages shows only a static recorded snapshot. |
| Source protection | PASS | `SOURCE_PROTECTION.md`, the source-protection test, and the independent repository boundary protect the Universal Agent OS family research sources. |
| Static GitHub Pages judge exhibit | PASS | Public page is anonymously reachable; current deployment status is read from [workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml). Old run IDs remain history only. |
| Final video and private `/feedback` entry | COMPLETE in submission assumption | Devpost is authoritative for the public URL and private field. The Session ID is intentionally absent from public source. |
| Real user validation | NOT_RUN | No participant, quote, or outcome is invented. See `USER_VALIDATION.md`. |
| Fixture/provider deployment, load, accessibility, independent security review | NOT_RUN | The static Pages exhibit does not convert these separate gates to PASS. |

## Evidence policy

- `PASS` means an executed check or inspectable artifact supports the bounded claim.
- `WARN` means proof is partial, stale, ambiguous, or needs human interpretation.
- `FAIL` records an observed failure or contradiction.
- `NOT_RUN` means no execution/result artifact exists.
- `SIMULATED` is reserved for controlled sample actors/events. The scan/test/model executions are labeled separately as real.

Evidence freshness matters. If the target, report, or evidence bundle changes after recording, the reconciliation must be marked stale and rerun; an old PASS must not silently describe new content.
