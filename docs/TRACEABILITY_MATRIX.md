# Root Repository Traceability Matrix

| Requirement | Implementation | Evidence | Status |
| --- | --- | --- | --- |
| Local-first Codex governance CLI | `cli/commands/`, `cli/lib/` | Current test and `npm run verify` records | PASS |
| Product self-scan | `npm run evidence:self` | `docs/ROOT_REPO_SCAN.json`: portable clean-worktree `REAL_LOCAL_SCAN` | PASS — structural governance only |
| Judge-readable dashboard | `apps/dashboard/` | Production build plus local/Pages visual checks | PASS |
| Static no-install judge exhibit | `.github/workflows/pages.yml` | [Pages run 29606886221](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29606886221), anonymous cache-busted HTTP/asset check | PASS for published v0.2.0 candidate at `97d35d4` |
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
| Destructive target analysis | `cli/lib/destructiveActionPreflight.js`, `cli/commands/destructive-preflight.js` | Root, home, repository, `.git`, outside, symlink, and ambiguity tests; `$HOME/..` exhibit | PASS in implementation contract — BLOCKED or CAUTION, NOT_RUN, no execution |
| Backward-compatible Mistake Shield | `cli/lib/mistakeShield.js` | Legacy action tests plus structured preflight attachment | PASS — legacy CLEAR means no configured match, not safety |
| Sanitized preflight publication | Redacted requested/expanded/resolved target and protected-boundary tokens | Privacy regression assertions and dashboard/sample contract | PASS in contract — no personal path |
| Optional Codex pre-tool denial | `.codex/hooks.json`, `.codex/hooks/destructive-preflight.js` | Real nonexistent harmless probe, CLI `0.144.3`, `gpt-5.6-sol`, read-only sandbox, no approval bypass | PASS for exact matching `Bash` path; normal trust and complete coverage NOT_RUN |
| No-delete safety demo | `npm run demo:safety` | Generated `tmp/destructive-preflight.json`, BLOCKED/NOT_RUN/`executed: false`; final `npm test` and `npm run verify` | PASS in final local v0.2.0 suite |
| Source lineage and protection | `docs/SOURCE_*`, `docs/FEATURE_HARVEST.md`, `docs/ORIGINALITY_MATRIX.md` | `tests/test_source_protection.js` | PASS |
| Final public YouTube video | `docs/DEMO_SCRIPT.md`, `docs/DEMO_REHBERI_TR.md`, Devpost form | Twelve clips total 2:52; spoken Codex/GPT-5.6/preflight explanation | PENDING — no public URL supplied or invented |
| Replacement clip 11 | GitHub README/Actions/Pages/v2 release view | Exact 16-second narration and capture plan | PENDING — wait for real YouTube integration plus v2 tag/release |
| Immutable v0.2.0 source/release | Planned `openai-build-week-final-v2` | Real public YouTube link plus final green verification/Pages | PENDING — old `openai-build-week-final` remains untouched |
| Private `/feedback` form field | Primary Codex task and Devpost form | Real Session ID, intentionally not committed | PRIVATE FORM ONLY |
| Independent user validation | `docs/USER_VALIDATION.md` | Consented sessions and honest summary | NOT_RUN |

The final Git commit created after this matrix is edited must be read from Git history; this file does not predict or invent it.
