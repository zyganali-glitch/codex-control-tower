# Judge Test Path

This project is submitted to the **Developer Tools** track. The judge path deliberately separates a no-install read-only product tour from the full local developer-tool workflow.

## 30-second no-install tour

Open the verified public judge demo:

**https://zyganali-glitch.github.io/codex-control-tower/**

GitHub Actions run `29275636867` deployed the page successfully, and anonymous HTTP access returned `200` on 2026-07-13.

Judge path:

1. Open the public judge-demo URL.
2. Read the amber disclosure: InvoiceFlow Mini is **SIMULATED DEMO DATA**.
3. In **Overview**, inspect the locked deterministic score and Evidence Reconciliation panel.
4. Confirm the recorded model layer says **REAL GPT-5.6** and **RECORDED REAL CODEX RUN** or shows a current real run state.
5. Confirm claim rows keep their deterministic PASS, FAIL, NOT_RUN, or SIMULATED state beside the model assessment.
6. Open **Before / After** to see `25 → 88` and `16 → 1` for the controlled fixture.
7. Open **Evidence** and confirm unavailable checks remain NOT_RUN.

The hosted tour does not scan the judge's repository and does not pretend to execute Codex in the browser. It visualizes sanitized sample data plus a recorded real GPT-5.6 evidence audit.

## Full local test

Requirements:

- Node.js 18 or newer.
- A desktop computer.
- Internet only for dependency installation and the real Codex/GPT-5.6 step.
- A ChatGPT account signed in to Codex for `npm run demo:codex`.

Commands:

```bash
npm install
npm run demo
npm run dashboard
```

Expected result:

- the browser opens automatically;
- the dashboard appears without opening `index.html` directly;
- the simulated before score is 25 with 16 risks;
- the simulated governed score is 88 with one remaining risk;
- the Evidence Reconciliation panel initially says READY.

Keep the dashboard open. In a second command window run:

```bash
npm run demo:codex
```

Expected result:

- Codex verifies the signed-in ChatGPT session;
- Codex verifies that `gpt-5.6-sol` is available;
- a read-only real model run audits five locked claims;
- the dashboard updates to COMPLETE;
- agreement, disagreement, preserved NOT_RUN count, rejected evidence paths, and next safe action become visible.

## Evidence locations

- `examples/governed-saas-after/.controltower/DETERMINISTIC_CLAIMS.json`
- `examples/governed-saas-after/.controltower/CODEX_LIVE_REVIEW_PROMPT.md`
- `examples/governed-saas-after/.controltower/codex-live-review.json`
- `examples/governed-saas-after/.controltower/codex-live-events.jsonl`
- `examples/governed-saas-after/.controltower/codex-live-review-record.json`
- `examples/demo-report/governed-test-output.txt`

## Honest boundary

- InvoiceFlow Mini, its approvals, its score, and its history are simulated.
- The committed Codex response is from a real, separately labeled GPT-5.6 Sol run.
- The model does not compute or change the deterministic score.
- The model does not run the fixture tests.
- The static judge-demo deployment is verified. Fixture/provider deployment, browser accessibility, load, and independent security checks remain NOT_RUN unless a named artifact proves otherwise.
- GitHub Pages may process ordinary hosting access logs under GitHub's own terms; Codex Control Tower adds no analytics or telemetry.

## Fallback

If the hosted page is unavailable, judges can inspect the public repository and video without rebuilding, then use the three local commands above for the full test. A failed live model run must remain FAILED or BLOCKED; it must never be replaced with simulated success.
