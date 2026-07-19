# Codex Control Tower Master Roadmap

Status: **FINAL SUBMISSION READY**
Mission: ship an honest, competition-ready, local-first mission control layer for Codex-assisted software delivery.

## Product scope

The competition build includes the Node.js CLI, deterministic repository scanner and scorer, bounded Mission Prompt, target-derived locked claims, authoritative local verdict, separate real GPT-5.6 opinion, evidence integrity/freshness, Review Gate, deterministic Destructive Action Preflight with a bounded optional Codex `PreToolUse` hook, evidence/Devpost exporters, React dashboard, and prepared fictional InvoiceFlow Mini snapshots.

The build excludes hosted SaaS, mandatory API keys, telemetry, real authentication or payment integration, enterprise identity verification, and claims of guaranteed correctness.

## v0.2.0 final submission deliverables

- [x] Independent repository and source-protection records.
- [x] Working CLI and local dashboard.
- [x] Prepared fictional InvoiceFlow Mini before/governed fixtures with real scan/test execution and visible disclosure.
- [x] Content-aware governance scoring and evidence vocabulary.
- [x] Review Gate, Mistake Shield, Flight Recorder, Memory Lens, Context Trace, and Mission Prompt.
- [x] English-only Phase-0, automated demo mode, tests, CI workflow, and Devpost narrative.
- [x] Close root-repository dogfooding regressions and record post-change evidence.
- [x] Push the verified `main` branch to the approved GitHub destination and observe hosted CI success.
- [x] Review published Devpost rules/FAQ and record eligibility and media constraints.
- [x] Publish and verify the static GitHub Pages no-install judge exhibit.
- [x] Add Destructive Action Preflight with canonical protected-boundary resolution, sanitized `BLOCKED`/`CAUTION` output, `NOT_RUN`, `executed: false`, adversarial tests, and no deletion execution.
- [x] Capture sanitized final screenshots and publish the audible under-three-minute demo at https://youtu.be/EvtguYLSNkg (YouTube displays 2:59).
- [x] Freeze the canonical v0.2.0 submission at the immutable `openai-build-week-final-v2` tag/release while preserving `openai-build-week-final` as the untouched v0.1 baseline.

## Acceptance and evidence

Release readiness requires `npm.cmd run verify` to pass, the prepared-snapshot score story to remain within 25–45 before and 75–90 after, the root scan to be `REAL_LOCAL_SCAN` with no fixture risk leakage, `git diff --check` to be clean, and the remote `main` SHA to match the local commit. Hosted CI and Pages are PASS only when their named runs succeed; other external checks remain `NOT_RUN` until observed.

## Competition priorities

### P0 — before submission

1. Dogfood the product on its own repository without simulated-fixture contamination.
2. Publish a clean, reproducible repository and verify the remote commit.
3. Add sanitized visual proof and keep the demo to a simple Detect → Bound → Prove arc.
4. Recheck official Devpost rules and describe prior/project lineage transparently.
5. Make Codex contribution provenance inspectable through a concise change receipt or build-session evidence.

### P1 — high-leverage differentiation

1. Package Control Tower as a Codex-native plugin/skill or hook-driven workflow.
2. Export a PR-level “agent change passport” joining mission, scope, diff, commands, gate, NOT_RUN items, and next action.
3. Extend target-derived Evidence Reconciliation policies while retaining locked deterministic states and local verdict authority.

### Future work

Signed/team Review Gates, PR/MR integrations, richer ownership and blast-radius mapping, hosted collaboration, accessibility and load hardening, more locale packs, and real user validation remain future work.
