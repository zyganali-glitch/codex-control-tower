# Root Repository Evidence Report

Generated for the independent Codex Control Tower product repository. This is real local build evidence; InvoiceFlow Mini results are separately labeled `SIMULATED`.

## Current checkpoint

| Check | Status | Evidence |
| --- | --- | --- |
| Baseline full local verification before release-preflight edits | PASS | `npm.cmd run verify`; nine root test scripts, the earlier `30 → 88` demo calibration, two governed fixture tests, and Vite production build completed as recorded in `docs/CODEX_BUILD_LOG.md`. |
| Root self-scan before hardening | FAIL | `node cli/index.js health --target .` produced 37/100 and exposed simulation, fixture-contamination, and stale-README false positives. |
| Scanner and scoring integrity correction | PASS | `npm.cmd run verify` passed after the changes; the demo is transparently `25 → 88`, with no score cap or target-name special case. |
| Root dogfooding scan | PASS | `node cli/index.js scan --target . --out tmp/root-release-report.json` produced `REAL_LOCAL_SCAN`, 100/100 governance readiness, zero detected risks, zero missing surfaces, and an explicit four-path fixture exclusion list. This structural score is not a code-correctness or security certification. |
| Dashboard data-contract integrity | PASS | Five adapter tests prove that absent baselines, approval actors, dates, prompts, shield results, recorder statuses, and evidence coverage are not fabricated; Vite built 47 modules. |
| Source protection | PASS | `docs/SOURCE_PROTECTION.md`, source-protection test, and independent repository boundary. |
| GitHub publication | PASS | Local and `origin/main` both resolved to release commit `e0ee256e7eb497cd6293fe51f51899645ee3ed90`. |
| GitHub-hosted CI | PASS | Workflow run [29208503014](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29208503014) completed successfully; checkout, Node setup, install, tests, demo, dashboard build, and required-file checks passed. |
| Deployment, real providers, load, accessibility, independent security review | NOT_RUN | Outside the verified competition-build boundary. |

## Evidence policy

`PASS` means an executed check or inspectable artifact supports the claim. `WARN` means partial or pending proof. `FAIL` records an observed failure. `NOT_RUN` stays visible. `SIMULATED` is used only for the controlled InvoiceFlow Mini demo.

Local release-preflight verification completed at 2026-07-12T23:47:16+03:00; publication and the first hosted CI run were independently observed by 2026-07-12T23:52:03+03:00. Remaining external checks stay `NOT_RUN`.
