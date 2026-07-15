# Root Repository Evidence Report

This report describes real repository/build evidence. InvoiceFlow Mini is a fictional sample project with prepared before/after snapshots; their `25 → 88` values are real deterministic scan results on those snapshots, not customer outcomes or a benchmark. GPT-5.6 did not produce that transformation.

## Published checkpoint and current authority

A fully published checkpoint before the current coherence hardening is commit `416d145`; it is historical, not the submission authority. The frozen `openai-build-week-final` tag, current command output, generated audit record, and live workflow history govern the final version.

| Check | Status | Evidence / boundary |
| --- | --- | --- |
| Full local verification | PASS | `npm run verify` completed at the published checkpoint: root tests, deterministic demo regeneration, dependency audit, and production dashboard build passed. Exact transient module counts are not treated as a product guarantee. |
| Deterministic demo | PASS | Real scans of the two prepared fictional snapshots produced `25/100` with 16 risks and `88/100` with one remaining risk; two focused fixture tests passed. |
| Root dogfooding boundary | PASS | [Portable root evidence](ROOT_REPO_SCAN.json) records `REAL_LOCAL_SCAN`, no simulated-data flag, `100/100`, zero risks, zero missing surfaces, base commit `079a604`, and a clean worktree at scan time. Fictional fixtures/generated output are explicitly excluded. The score is heuristic, not a correctness or security certificate. |
| Real Blind GPT-5.6 Semantic Audit | PASS | The explicit opt-in path verifies ChatGPT access, invokes `gpt-5.6-sol` with medium reasoning read-only, withholds locked comparison targets/expected classes, preserves local authority, and records structured result/provenance. |
| Evidence provenance | PASS | The current reconciliation record contains bounded evidence, command/model metadata, base Git commit plus bounded worktree state, freshness information, and SHA-256 hashes. All eight recorded evidence files existed at bundle time; unsupported citation paths are filtered from accepted citations and recorded for inspection. |
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
