# 2:45 OpenAI Build Week Demo Script

## Demo promise

In less than three minutes, show one complete product loop:

> local evidence → bounded Codex mission → locked claims → real GPT-5.6 audit → deterministic reconciliation → human decision → reviewable handoff

InvoiceFlow Mini, its approval, score, risks, and history are **SIMULATED DEMO DATA**. The GPT-5.6 Sol response is a **REAL CODEX RUN** and is separately labeled. The model does not compute the score or execute the fixture tests.

## Preflight — not part of the recording

From the repository root:

```bash
npm install
npm test
npm run demo
npm run dashboard
```

Expected deterministic demo output:

- Before: `25/100`, `16` risks
- After: `88/100`, `1` risk
- Governed fixture: `2` focused Node tests passed
- Browser, load, deployment, and independent security gates: `NOT_RUN`

Keep the dashboard and its first command window open. Prepare a second command window in the same repository for:

```bash
npm run demo:codex
```

Before recording:

- verify Codex is signed in with the intended ChatGPT account;
- run `npm run demo:codex` once as a rehearsal;
- run `npm run demo` again so the dashboard begins at READY;
- confirm the SIMULATED disclosure is visible;
- close private tabs, messages, absolute-path views, secrets, and unrelated applications;
- keep the primary Codex build thread ready for a brief on-screen shot;
- do not show or publish the `/feedback` Session ID.

## 0:00–0:20 — Problem and product

### Screen

Show **Overview**, the SIMULATED disclosure, and the READY Evidence Reconciliation panel.

### Narration

“Codex can build software quickly, but scope, proof, skipped checks, and the next safe action can disappear inside a chat. Codex Control Tower turns that missing state into a reviewable workflow. InvoiceFlow Mini is a fully simulated demo project.”

## 0:20–0:45 — Messy starting state

### Screen

Open **Before / After** and point to the before score and risk count.

### Narration

“The local scan finds a score of twenty-five and sixteen risk flags. This is not a security certificate. It shows missing plans, evidence, approval, and continuity around the coding work.”

## 0:45–1:10 — Bounded mission and locked evidence

### Screen

Return to **Overview**. Show the next bounded Codex mission, allowed files, forbidden actions, and the READY Evidence Reconciliation panel.

### Narration

“Control Tower selects the mission context and creates a bounded Codex instruction with allowed files, forbidden actions, and required proof. Before any model call, local code locks five evidence claims as PASS, FAIL, NOT_RUN, or SIMULATED.”

## 1:10–1:25 — How Codex accelerated the build

### Screen

Briefly show the primary project thread in the Codex desktop app. Do not show private task names, unrelated conversations, personal data, or the `/feedback` Session ID.

### Narration

“I used Codex in the desktop app to turn evidence-loss problems into the scanner, bounded mission, dashboard, tests, and reconciliation safety rules. My key product decision was that GPT-5.6 must never replace local evidence state.”

## 1:25–1:55 — Run real GPT-5.6

### Screen

In the second command window run:

```bash
npm run demo:codex
```

Immediately return to **Overview**. Show READY changing to RUNNING, the exact `gpt-5.6-sol` model, ChatGPT subscription access, read-only audit, and locked local states.

### Narration

“Now this real command verifies my signed-in ChatGPT session and GPT-5.6 Sol, then runs Codex read-only against named fictional evidence. GPT-5.6 can support, question, or find a claim insufficient, but it cannot change the locked status.”

If the run takes longer, keep speaking and show the visible RUNNING safety facts. Never replace a failed run with simulated success.

## 1:55–2:20 — Reconcile disagreement and preserve NOT_RUN

### Screen

Show COMPLETE, agreement/disagreement counts, a claim row with both locked state and model assessment, and the NOT_RUN locked count. Then open **Evidence** and point to a NOT_RUN row.

### Narration

“The local reconciler rejects missing claims, status injection, unsupported evidence paths, malformed output, and any statement that the model ran tests. Agreement and disagreement stay visible, while browser, load, deployment, and independent security checks remain NOT_RUN.”

## 2:20–2:35 — Human decision and governed result

### Screen

Show the local Review Gate, then open **Before / After** and point to `88` and `1`.

### Narration

“The developer remains the decision-maker. The governed fixture reaches eighty-eight with one remaining risk, while two focused fixture tests passed and every unavailable check stays visible.”

## 2:35–2:45 — Close

### Screen

Return to **Overview** with completed Evidence Reconciliation visible.

### Narration

“Codex writes. Control Tower proves. The developer decides.”

## Recording acceptance checklist

- Final duration is between `2:35` and `2:50`, never `3:00` or longer.
- Video is public on YouTube.
- Audio clearly explains what was built, how Codex accelerated it, the key human decision, and what GPT-5.6 does in the product.
- The working product is visible, not just slides.
- The Codex app appears briefly as supporting build evidence.
- Real `gpt-5.6-sol` state and provenance are visible.
- InvoiceFlow Mini is called simulated.
- The model is not credited with the score or fixture tests.
- At least one locked NOT_RUN state is visible.
- No secrets, personal paths, private task names, or `/feedback` Session ID appear.
- No copyrighted background music is used.

## Recovery notes

- Never open `apps/dashboard/index.html` directly. Use `npm run dashboard`, which starts the required local service and opens the correct address.
- If the browser does not open, copy the `Local:` address printed by the dashboard command into the browser.
- If the page is stale, stop the dashboard, run `npm run demo`, restart it, and refresh the browser.
- If Codex is blocked, sign in with ChatGPT and rerun `npm run demo:codex`.
- If `gpt-5.6-sol` is unavailable, do not claim a real run.
- If structured output is rejected, preserve FAILED, inspect the named error, fix the contract, and rerun before recording.

## Related assets

- [README](../README.md)
- [Beginner-safe Turkish recording guide](DEMO_REHBERI_TR.md)
- [Judge Test Path](JUDGE_TEST_PATH.md)
- [Build Week Development Delta](BUILD_WEEK_DELTA.md)
- [Devpost Submission](DEVPOST_SUBMISSION.md)
- [Judging Map](JUDGING_MAP.md)
