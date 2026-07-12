# Root Repository Traceability Matrix

| Requirement | Implementation | Evidence | Status |
| --- | --- | --- | --- |
| Local-first Codex governance CLI | `cli/commands/`, `cli/lib/` | Root tests and `npm.cmd run verify` record | PASS |
| Judge-readable dashboard | `apps/dashboard/` | Vite production build and prior visual inspection | PASS |
| Honest simulated before/after demo | `examples/messy-saas-before`, `examples/governed-saas-after` | `npm.cmd run demo`, disclosure labels, generated reports | PASS |
| Root dogfooding without fixture leakage | Configured, visible scan excludes plus explicit simulation/stale markers | Root regression assertions and `REAL_LOCAL_SCAN` release report | PASS |
| Plan and bounded mission | `plans/master-roadmap.md`, `.controltower/phase0.json` | This matrix and Review Gate scope | PASS |
| Human publication approval | `.controltower/review-gate.json` | User's active-session request, local unsigned gate | PASS — identity is not cryptographically verified |
| Source lineage and protection | `docs/SOURCE_*`, `docs/FEATURE_HARVEST.md`, `docs/ORIGINALITY_MATRIX.md` | `tests/test_source_protection.js` | PASS |
| Remote GitHub release | `origin/main` | Matching local/remote commit SHA | NOT_RUN |
| Hosted CI | `.github/workflows/ci.yml` | GitHub Actions result | NOT_RUN |
| Final Devpost media and submission | `docs/DEMO_SCRIPT.md`, submission docs | Sanitized captures, video URL, submitted entry | NOT_RUN |
