# Judge Test Path

This **Developer Tools** entry deliberately separates a no-install static exhibit from the live local workflow.

## 30-second no-install exhibit

Open the verified public page:

**https://zyganali-glitch.github.io/codex-control-tower/**

GitHub Pages workflow run [`29279549424`](https://github.com/zyganali-glitch/codex-control-tower/actions/runs/29279549424) succeeded for published baseline `416d145`, and the page was verified without authentication on 2026-07-13.

1. Read **FICTIONAL SAMPLE PROJECT** and the separate **REAL EXECUTION** statement.
2. In **Overview**, inspect the recorded Evidence Reconciliation result.
3. Confirm the deterministic local verdict/statuses remain separate from `modelVerdict` and model assessments.
4. Open **Before / After** for the real deterministic scan results `25 → 88` and `16 → 1` on two prepared fictional snapshots.
5. Open **Evidence** and confirm unavailable checks remain NOT_RUN.

GitHub Pages is a static, read-only, no-install exhibit. It does not scan the judge's repository, execute Codex in the browser, or show live state from the entrant's computer.

## What the sample proves

- InvoiceFlow Mini's customer facts, actors, approval, and prepared before/after snapshots are fictional.
- The scanner really evaluates both snapshots and calculates their heuristic scores.
- Two focused Node.js fixture tests really ran on the governed snapshot.
- A recorded real `gpt-5.6-sol` run audited the bounded evidence read-only.
- GPT-5.6 did not create the snapshots, change the score from 25 to 88, run the tests, or prove production readiness.

## Full live local test

Requirements:

- Node.js 18 or newer;
- Codex desktop signed in to a ChatGPT account with `gpt-5.6-sol` access;
- internet for dependency installation and the real model step.

From the repository root:

```bash
npm install
npm run demo
npm run dashboard
```

Expected local result:

- browser opens the local dashboard without opening `index.html` directly;
- prepared before snapshot: 25 with 16 risks;
- prepared governed snapshot: 88 with one remaining risk;
- Evidence Reconciliation begins at `READY / NOT STARTED`.

Keep the local dashboard open. Create a clean **Demo Reconciliation** task for this repository in Codex desktop and paste the exact [Codex Demo Prompt](CODEX_DEMO_PROMPT.md). Codex launches `npm run demo:codex` without editing files. The separate primary build task is used only to obtain the private `/feedback` Session ID and stays off-camera.

Expected live result:

- dashboard changes from `READY` to `RUNNING` to `COMPLETE`;
- exact `gpt-5.6-sol` and read-only ChatGPT/Codex provenance are shown;
- locked claim statuses and `reconciliation.deterministicVerdict` remain local;
- separate `modelVerdict` / `modelSummary` / `modelNextSafeAction` are identified as model opinion, while the local verdict and action remain authoritative;
- claim relations show `ALIGNS_WITH_LOCKED_STATUS` or `CONFLICTS_WITH_LOCKED_STATUS`;
- `reportProvenance` shows fresh/stale comparison;
- `evidenceIntegrity` shows the SHA-256 bundle digest, file hashes, base Git commit, and bounded worktree state when available;
- unsupported citation paths are filtered from accepted citations and recorded;
- preserved NOT_RUN count and next safe action remain visible.

A separate command window running `npm run demo:codex` is a recovery option only; it is the same product command but does not provide the preferred visible Codex-desktop instruction path.

## Evidence locations

- `examples/governed-saas-after/.controltower/DETERMINISTIC_CLAIMS.json`
- `examples/governed-saas-after/.controltower/EVIDENCE_BUNDLE.md`
- `examples/governed-saas-after/.controltower/CODEX_LIVE_REVIEW_PROMPT.md`
- `examples/governed-saas-after/.controltower/codex-live-review.json`
- `examples/governed-saas-after/.controltower/codex-live-events.jsonl`
- `examples/governed-saas-after/.controltower/codex-live-review-record.json`
- `examples/demo-report/governed-test-output.txt`

## Honest boundary

- A static judge-exhibit deployment is verified; fixture/provider deployment is not.
- The health score is deterministic and reproducible but heuristic, not a security/correctness certificate.
- Local files and provenance hashes improve inspectability but are not signed, immutable attestations.
- Fixture/provider browser, load, accessibility, and independent security checks remain NOT_RUN unless a named artifact proves otherwise.
- GitHub Pages may process ordinary hosting logs under GitHub's terms; Codex Control Tower adds no analytics or telemetry.

## Fallback

If the hosted page is unavailable, judges can inspect the public repository and video, then use the local commands. A failed model run must remain FAILED or BLOCKED; it must never be replaced with fictional success. No final YouTube URL or `/feedback` Session ID is claimed in this document until the entrant actually obtains it.
