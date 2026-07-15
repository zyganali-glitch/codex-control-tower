# Root Repository Traceability Matrix

| Requirement | Implementation | Evidence | Status |
| --- | --- | --- | --- |
| Local-first Codex governance CLI | `cli/commands/`, `cli/lib/` | Current test and `npm run verify` records | PASS |
| Product self-scan | `npm run evidence:self` | `docs/ROOT_REPO_SCAN.json`: portable clean-worktree `REAL_LOCAL_SCAN` | PASS — structural governance only |
| Judge-readable dashboard | `apps/dashboard/` | Production build plus local/Pages visual checks | PASS |
| Static no-install judge exhibit | `.github/workflows/pages.yml` | [Current Pages workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml), public HTTP check, frozen final tag | PASS |
| Live recording workbench | Local `npm run dashboard` | `READY → RUNNING → COMPLETE` contract and dashboard tests | PASS — local only |
| Honest fictional before/after sample | `examples/messy-saas-before`, `examples/governed-saas-after` | Real `npm run demo` scans and two focused fixture tests | PASS — prepared snapshots, not customer outcomes |
| Neutral target-derived evidence claims | `cli/commands/codex-review.js` | Reconciliation tests and generated claims | PASS |
| Blind comparison boundary | Locked claim-status fields/expected classes withheld; raw evidence retained | Prompt-invariance and no-leak tests | PASS |
| Real GPT-5.6 audit | Explicit opt-in `npm run demo:codex` | Pinned Codex CLI, `gpt-5.6-sol`, medium reasoning, empty ephemeral read-only workspace and evidence record | PASS |
| Isolated no-tool model boundary | Empty temporary workspace; user/project instructions, web, inherited environment, persistence, and approval disabled | Fail-closed JSONL tests reject command/file/MCP/web/plan/unknown/failed/malformed events | PASS |
| Mission/change/test semantic challenge | `MISSION_CHANGE_TEST_ALIGNMENT` | Structural local precheck plus Phase-0, changes, test source/output, evidence; controlled raw fixture gap | PASS — controlled sample, not deterministic semantic truth |
| Deterministic authority boundary | Local verdict/status/action plus separate model opinion; align/compatible/conflict policy raises human review only on conflict | Adversarial validation/reconciliation tests | PASS |
| Evidence integrity/freshness | Separate full-file, included-content, and bundle SHA-256 hashes; base Git commit, bounded worktree state, command provenance, freshness state | Reconciliation record; target-local raw test output | PASS |
| Evidence-bearing model output | Decisive allowed-citation rule plus required counter/missing evidence | Adversarial assessment-validation tests | PASS |
| Unsupported citation handling | Citation allowlist and rejected-path record | Accepted citations are filtered; rejected paths remain inspectable | PASS |
| Plan and bounded mission | `plans/master-roadmap.md`, `.controltower/phase0.json` | Mission prompt and Review Gate scope | PASS |
| Human publication approval | `.controltower/review-gate.json` | Local unsigned gate | PASS — identity is not cryptographically verified |
| Source lineage and protection | `docs/SOURCE_*`, `docs/FEATURE_HARVEST.md`, `docs/ORIGINALITY_MATRIX.md` | `tests/test_source_protection.js` | PASS |
| Final public YouTube video | `docs/DEMO_SCRIPT.md`, `docs/DEMO_REHBERI_TR.md`, Devpost form | Under three minutes; spoken Codex/GPT-5.6 explanation | COMPLETE in submission assumption; URL authority is Devpost |
| Private `/feedback` form field | Primary Codex task and Devpost form | Real Session ID, intentionally not committed | COMPLETE in private submission assumption |
| Independent user validation | `docs/USER_VALIDATION.md` | Consented sessions and honest summary | NOT_RUN |

The final Git commit created after this matrix is edited must be read from Git history; this file does not predict or invent it.
