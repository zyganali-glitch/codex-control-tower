# Codex Control Tower Master Roadmap

Status: **RELEASE PREFLIGHT**
Mission: ship an honest, competition-ready, local-first mission control layer for Codex-assisted software delivery.

## Product scope

The competition build includes the Node.js CLI, deterministic repository scanner and scorer, Mission Prompt Generator, Context Trace, Review Gate, Mistake Shield, Flight Recorder, Memory Lens, Phase-0 wizard in English and Turkish, evidence/Devpost exporters, React dashboard, and the simulated InvoiceFlow Mini before/after story.

The build excludes hosted SaaS, mandatory API keys, telemetry, real authentication or payment integration, enterprise identity verification, and claims of guaranteed correctness.

## Release 0.1 deliverables

- [x] Independent repository and source-protection records.
- [x] Working CLI and local dashboard.
- [x] Simulated InvoiceFlow Mini before/after fixtures with visible disclosure.
- [x] Content-aware governance scoring and evidence vocabulary.
- [x] Review Gate, Mistake Shield, Flight Recorder, Memory Lens, Context Trace, and Mission Prompt.
- [x] Phase-0 `en|tr`, automated demo mode, tests, CI workflow, and Devpost narrative.
- [x] Close root-repository dogfooding regressions and record post-change evidence.
- [x] Push the verified `main` branch to the approved GitHub destination and observe hosted CI success.
- [ ] Recheck published Devpost rules when available and record eligibility constraints.
- [ ] Capture sanitized final screenshots and a three-minute demo video.

## Acceptance and evidence

Release readiness requires `npm.cmd run verify` to pass, the controlled score story to remain within 25–45 before and 75–90 after, the root scan to be `REAL_LOCAL_SCAN` with no fixture risk leakage, `git diff --check` to be clean, and the remote `main` SHA to match the local commit. Hosted CI and other external checks remain `NOT_RUN` until observed.

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
3. Add optional OpenAI-powered review only when explicitly enabled, while retaining deterministic local mode.

### Future work

Signed/team Review Gates, PR/MR integrations, richer ownership and blast-radius mapping, hosted collaboration, accessibility and load hardening, more locale packs, and real user validation remain future work.
