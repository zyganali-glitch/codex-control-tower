# Root Repository Traceability Matrix

| Requirement | Implementation | Evidence | Status |
| --- | --- | --- | --- |
| Local-first Codex governance CLI | `cli/commands/`, `cli/lib/` | Current test and `npm run verify` records | PASS |
| Product self-scan | `npm run evidence:self` | `docs/ROOT_REPO_SCAN.json`: portable clean-worktree `REAL_LOCAL_SCAN` | PASS — structural governance only |
| Judge-readable dashboard | `apps/dashboard/` | Production build plus local/Pages visual checks | PASS |
| Static no-install judge exhibit | `.github/workflows/pages.yml` | Historical GitHub Pages run [`29279549424`](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29279549424), published baseline `416d145`; current result lives in workflow history | PASS |
| Live recording workbench | Local `npm run dashboard` | `READY → RUNNING → COMPLETE` contract and dashboard tests | PASS — local only |
| Honest fictional before/after sample | `examples/messy-saas-before`, `examples/governed-saas-after` | Real `npm run demo` scans and two focused fixture tests | PASS — prepared snapshots, not customer outcomes |
| General target-derived evidence claims | `cli/commands/codex-review.js` | Reconciliation tests and generated deterministic claims | PASS |
| Real GPT-5.6 audit | Explicit opt-in `npm run demo:codex` | Recorded model/run provenance and evidence record | PASS |
| Deterministic authority boundary | Local verdict/status computation plus separate model opinion | Adversarial validation/reconciliation tests | PASS |
| Evidence integrity/freshness | SHA-256 bundle/file hashes, base Git commit, bounded worktree state, command provenance, freshness state | Reconciliation record; target-local raw test output | PASS |
| Unsupported citation handling | Citation allowlist and rejected-path record | Accepted citations are filtered; rejected paths remain inspectable | PASS |
| Plan and bounded mission | `plans/master-roadmap.md`, `.controltower/phase0.json` | Mission prompt and Review Gate scope | PASS |
| Human publication approval | `.controltower/review-gate.json` | Local unsigned gate | PASS — identity is not cryptographically verified |
| Source lineage and protection | `docs/SOURCE_*`, `docs/FEATURE_HARVEST.md`, `docs/ORIGINALITY_MATRIX.md` | `tests/test_source_protection.js` | PASS |
| Final public YouTube video | `docs/DEMO_SCRIPT.md`, `docs/DEMO_REHBERI_TR.md` | Verified public URL and media privacy review | NOT_RUN |
| Private `/feedback` form field | Primary Codex task and Devpost form | Real Session ID, not committed | NOT_RUN in public evidence |
| Independent user validation | `docs/USER_VALIDATION.md` | Consented sessions and honest summary | NOT_RUN |

The final Git commit created after this matrix is edited must be read from Git history; this file does not predict or invent it.
