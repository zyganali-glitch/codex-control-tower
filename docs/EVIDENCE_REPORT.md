# Root Repository Evidence Report

This report describes real repository/build evidence. InvoiceFlow Mini is a fictional sample project with prepared before/after snapshots; their `25 → 88` values are real deterministic scan results on those snapshots, not customer outcomes or a benchmark. GPT-5.6 did not produce that transformation.

## Published checkpoint

The last fully published checkpoint before the current coherence hardening is commit `416d145`. Git history remains the authority for the final commit created after this document changes.

| Check | Status | Evidence / boundary |
| --- | --- | --- |
| Full local verification | PASS | `npm run verify` completed at the published checkpoint: root tests, deterministic demo regeneration, dependency audit, and production dashboard build passed. Exact transient module counts are not treated as a product guarantee. |
| Deterministic demo | PASS | Real scans of the two prepared fictional snapshots produced `25/100` with 16 risks and `88/100` with one remaining risk; two focused fixture tests passed. |
| Root dogfooding boundary | PASS | Root scans use `REAL_LOCAL_SCAN` and explicitly exclude fictional fixture/generated-output contamination. The governance score is heuristic, not a correctness or security certificate. |
| Real GPT-5.6 Evidence Reconciliation | PASS | The explicit opt-in path verified ChatGPT subscription access, invoked `gpt-5.6-sol` read-only, preserved locked statuses/local verdict, kept model opinion separate, and recorded the result. |
| Evidence provenance | PASS | The current reconciliation record contains bounded evidence, command/model metadata, base Git commit plus bounded worktree state, freshness information, and SHA-256 hashes. All eight recorded evidence files existed at bundle time; unsupported citation paths are filtered from accepted citations and recorded for inspection. |
| Dashboard data-contract integrity | PASS | Adapter/regression tests cover absent fields and locked reconciliation state; a production Vite build completed. The local dashboard shows live state, while GitHub Pages shows only a static recorded snapshot. |
| Source protection | PASS | `SOURCE_PROTECTION.md`, the source-protection test, and the independent repository boundary protect the Universal Agent OS family research sources. |
| Static GitHub Pages judge exhibit | PASS | Workflow run [`29279549424`](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29279549424) succeeded for published baseline `416d145`; the public page was verified without authentication. |
| Final video, private `/feedback` entry, real user validation | NOT_RUN / private | These are not fabricated or stored as complete in the public repository. See `NOT_RUN_GATES.md` and `USER_VALIDATION.md`. |
| Fixture/provider deployment, load, accessibility, independent security review | NOT_RUN | The static Pages exhibit does not convert these separate gates to PASS. |

## Evidence policy

- `PASS` means an executed check or inspectable artifact supports the bounded claim.
- `WARN` means proof is partial, stale, ambiguous, or needs human interpretation.
- `FAIL` records an observed failure or contradiction.
- `NOT_RUN` means no execution/result artifact exists.
- `SIMULATED` is reserved for controlled sample actors/events. The scan/test/model executions are labeled separately as real.

Evidence freshness matters. If the target, report, or evidence bundle changes after recording, the reconciliation must be marked stale and rerun; an old PASS must not silently describe new content.
