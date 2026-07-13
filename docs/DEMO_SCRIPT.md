# 2:45 OpenAI Build Week Demo Script

## Demo promise

In less than three minutes, show one complete product loop:

> local evidence → bounded Codex mission → locked claims → Codex desktop instruction → real GPT-5.6 audit → deterministic reconciliation → human decision → reviewable handoff

Two surfaces have deliberately different jobs:

- **GitHub Pages** is the static, no-install judge exhibit. It shows a sanitized committed snapshot and a recorded real GPT-5.6 run. It cannot display a new run from the entrant's computer.
- **The local dashboard** is the live workbench used in the video. It shows `READY → RUNNING → COMPLETE` while Codex executes the product command.

**FICTIONAL SAMPLE PROJECT:** InvoiceFlow Mini, its customer facts, approval, actors, and prepared before/after repository snapshots are fictional. GPT-5.6 does not create the `25 → 88` transformation.

**REAL EXECUTION:** Control Tower really scans the snapshots, calculates the heuristic scores, runs two focused Node.js fixture tests, builds and hashes the evidence bundle, invokes real `gpt-5.6-sol` read-only, validates the response, and records the reconciliation.

## Preflight — not part of the recording

From the repository root:

```bash
npm install
npm test
npm run demo
npm run dashboard
```

Expected deterministic demo output:

- Before prepared snapshot: `25/100`, `16` risks
- Governed prepared snapshot: `88/100`, `1` risk
- Governed fixture: `2` focused Node.js tests passed
- Fixture/provider browser, load, deployment, and independent security gates: `NOT_RUN`

Keep the local dashboard and its command window open. Create a clean Codex desktop task named **Demo Reconciliation** for the same repository and prepare the exact instruction from [Codex Demo Prompt](CODEX_DEMO_PROMPT.md). Codex—not a separate command window—is the featured route that starts `npm run demo:codex`.

Before recording:

- verify Codex is signed in with the intended ChatGPT account;
- paste the demo instruction into Codex and complete one rehearsal;
- run `npm run demo` again so the local dashboard begins at `READY / NOT STARTED`;
- confirm **FICTIONAL SAMPLE PROJECT** and **REAL EXECUTION** are both visible;
- close private tabs, messages, absolute-path views, secrets, and unrelated applications;
- keep the clean Demo Reconciliation task ready, with only the safe demo instruction visible;
- do not show or publish the `/feedback` Session ID.

## 0:00–0:20 — Problem and product

### Screen

Show **Overview**, the fictional-sample/real-execution disclosure, and the `READY / NOT STARTED` Evidence Reconciliation panel in the **local dashboard**.

### Narration

“Codex can build software quickly, but scope, proof, skipped checks, and the next safe action can disappear inside a chat. Codex Control Tower turns that missing state into a reviewable workflow. InvoiceFlow Mini is a fictional sample project; the scans, tests, and recorded model run are real tool outputs.”

## 0:20–0:45 — Prepared starting state

### Screen

Open **Before / After** and point to the before score and risk count.

### Narration

“These are prepared before and governed snapshots of the same fictional project. The local scanner scores the starting snapshot at twenty-five and finds sixteen risk flags. This is not a security certificate, and GPT-5.6 did not turn twenty-five into eighty-eight. The comparison makes missing plans, evidence, approval, and continuity reproducible.”

## 0:45–1:10 — Bounded mission and locked evidence

### Screen

Return to **Overview**. Show the next bounded Codex mission, allowed files, forbidden actions, and the `READY / NOT STARTED` Evidence Reconciliation panel.

### Narration

“Control Tower selects mission context and creates a bounded Codex instruction with allowed files, forbidden actions, and required proof. Before any model call, local code derives target-appropriate claims and locks their PASS, FAIL, NOT_RUN, or SIMULATED states. It also computes the authoritative local verdict.”

## 1:10–1:35 — Instruct Codex to run the product

### Screen

Switch to the clean **Demo Reconciliation** task in the Codex desktop app. Paste the exact prompt from [Codex Demo Prompt](CODEX_DEMO_PROMPT.md) and send it. Keep the line asking Codex to run `npm run demo:codex` visible. Let Codex start the command; do not use a separate PowerShell window in the main story. Do not open the long primary build task on camera.

### Narration

“I used Codex in the desktop app to build and verify this workflow. Now I am asking Codex itself to run the product's featured read-only GPT-5.6 reconciliation. My key human decision is that the model may assess evidence, but it can never replace local evidence state or the deterministic local verdict.”

## 1:35–2:00 — Real GPT-5.6 and live state

### Screen

Return to the local dashboard. Show `RUNNING`, the exact `gpt-5.6-sol` model, ChatGPT subscription access, read-only scope, locked local states, and current evidence freshness. If completion arrives, show `COMPLETE`.

### Narration

“The command verifies my signed-in ChatGPT session and GPT-5.6 Sol, then runs Codex read-only against a bounded evidence bundle. GPT-5.6 can support, question, or find a claim insufficient. Local code validates the structure, hashes the evidence, and keeps model opinion separate from deterministic fact.”

If the run takes longer, continue showing the visible `RUNNING` safety facts. Never replace a failed run with simulated success.

## 2:00–2:25 — Reconciliation and preserved limits

### Screen

Show `COMPLETE`, deterministic local verdict, separate model verdict, agreement/disagreement counts, evidence freshness/hash, and one claim row. Show any filtered citation path record if present. Then open **Evidence** and point to a NOT_RUN row.

### Narration

“The reconciler rejects missing claims, status injection, malformed output, and statements that the model ran tests. Unsupported citation paths are filtered and recorded. Semantic agreement stays visible, while the authoritative local verdict and every unavailable check remain unchanged.”

## 2:25–2:38 — Human decision and governed snapshot

### Screen

Show the local Review Gate, then open **Before / After** and point to `88`, `1`, and the two focused test results.

### Narration

“The developer remains the decision-maker. The governed prepared snapshot scores eighty-eight with one remaining risk, and two focused fixture tests really passed. This is reproducible sample evidence, not a claim that GPT-5.6 rewrote the project or proved production readiness.”

## 2:38–2:45 — Close

### Screen

Return to **Overview** with completed Evidence Reconciliation visible.

### Narration

“Codex writes. Control Tower proves. The developer decides.”

## Recording acceptance checklist

- Final duration is below `3:00`; the target is `2:45`.
- Video is public on YouTube.
- Audio clearly explains what was built, how Codex accelerated it, the key human decision, and what GPT-5.6 does in the product.
- The working product is visible, not just slides.
- Codex desktop visibly receives the instruction and starts `npm run demo:codex`.
- The local dashboard—not GitHub Pages—shows the live `READY → RUNNING → COMPLETE` path.
- GitHub Pages is described only as the static no-install judge exhibit.
- Real `gpt-5.6-sol`, the deterministic local verdict, separate model verdict, evidence provenance, and at least one locked NOT_RUN state are visible.
- InvoiceFlow Mini is called a fictional sample project with prepared snapshots.
- GPT-5.6 is not credited with the `25 → 88` transformation, score calculation, or fixture tests.
- No secrets, personal paths, private task names, or `/feedback` Session ID appear.
- No copyrighted background music is used.

## Recovery notes

- Never open `apps/dashboard/index.html` directly. Use `npm run dashboard`, which starts the required local service and opens the correct address.
- If the local browser does not open, copy the `Local:` address printed by the dashboard command into the browser.
- If the page is stale, stop the dashboard, run `npm run demo`, restart it, and refresh the browser.
- If Codex desktop cannot start the command, a separate command window running `npm run demo:codex` is an emergency recovery route. If used, say clearly that it is the same product command normally launched from Codex.
- If Codex is blocked, sign in with ChatGPT and retry the exact prompt.
- If `gpt-5.6-sol` is unavailable, do not claim a real run.
- If structured output is rejected, preserve FAILED, inspect the named error, fix the contract, and rerun before recording.

## Related assets

- [Codex Demo Prompt](CODEX_DEMO_PROMPT.md)
- [README](../README.md)
- [Beginner-safe Turkish recording guide](DEMO_REHBERI_TR.md)
- [Judge Test Path](JUDGE_TEST_PATH.md)
- [Build Week Development Delta](BUILD_WEEK_DELTA.md)
- [Devpost Submission](DEVPOST_SUBMISSION.md)
- [Judging Map](JUDGING_MAP.md)
