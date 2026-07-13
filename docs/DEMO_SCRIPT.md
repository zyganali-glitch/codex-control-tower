# Three-Minute Demo Script

## Demo promise

In three minutes, show one complete story:

> A fictional SaaS repository moves from an ambiguous Codex handoff to a bounded mission with visible risk, human review state, continuity context, and honest evidence.

InvoiceFlow Mini is **SIMULATED DEMO DATA**. Say that on camera and keep the dashboard disclosure visible. Do not describe it as a customer project, production application, benchmark, or live payment/auth system.

## Preflight — not part of the three minutes

Run these on the final commit and record the real outcomes in [Codex Build Log](CODEX_BUILD_LOG.md):

~~~bash
npm install
npm test
npm run demo
npm run demo:codex
npm run dashboard:build
~~~

Then start the dashboard:

~~~bash
npm run dashboard
~~~

Prepare:

- Terminal at the repository root, large readable font.
- Editor open to <code>examples/messy-saas-before</code>.
- Browser opened automatically by `npm run dashboard`.
- A second command window at the repository root, ready to run `npm run demo:codex` while the dashboard remains open.
- Dashboard disclosure banner and Before / After tab visible.
- A second editor tab ready for <code>tmp/demo-evidence/CODEX_MISSION_PROMPT.md</code> after generation.

Pre-type or keep these commands in terminal history:

~~~bash
node cli/index.js scan --target examples/messy-saas-before --out tmp/demo-before.json
node cli/index.js health --target examples/messy-saas-before
node cli/index.js mistake-shield --target examples/messy-saas-before --action "Refactor auth and delete old tests"
node cli/index.js review-gate --target examples/governed-saas-after --status
node cli/index.js evidence --target examples/governed-saas-after --out tmp/demo-evidence
node cli/index.js health --target examples/governed-saas-after
~~~

The verified controlled fixture result at documentation time is:

- messy scan: **25/100**, **16 risk flags**;
- governed scan: **88/100**, **1 risk flag**;
- governed fixture tests: **2 focused Node tests passed, 0 failed**;
- browser, load, deployment, and independent security checks: **NOT_RUN**;
- optional live layer: a **REAL** read-only `gpt-5.6-sol` run through the signed-in ChatGPT subscription.

If final output differs, use the current output and update the narrative. Never edit a score into the video or claim a command ran when it did not.

## 0:00–0:20 — The problem

### Screen

Start on the dashboard hero or a clean title slide:

**Codex Control Tower — Mission control for AI-built software**

### Narration

“Codex can move from request to code fast. But a developer still needs to know: what was in scope, what changed, which tests actually ran, what did not run, who approved risky work, and whether the next Codex session can continue safely. Codex Control Tower is the local evidence and handoff layer around that work.”

### Judge signal

Potential Impact + Quality of the Idea: a specific continuity/proof problem for developers using coding agents.

## 0:20–0:45 — The messy repository

### Screen

Show the tree under <code>examples/messy-saas-before</code>, then briefly open:

- the stale README;
- <code>src/auth.js</code>;
- <code>src/payments.js</code>;
- <code>tests/placeholder.test.js</code>.

Keep the simulated-data label in view.

### Narration

“This is InvoiceFlow Mini, a controlled fictional invoice SaaS—not customer code. It looks plausible, but its README is stale, the test is only a placeholder, TODO/FIXME markers are untracked, and auth and payment logic contain deliberate risk signals. There is no Codex instruction file, plan, evidence report, Review Gate, Flight Recorder, or Memory Lens.”

### Do not say

- “The application is insecure” as a proven conclusion.
- “Control Tower found every bug.”
- “This is production code.”

Say “heuristic risk signal” or “intentionally risky demo pattern.”

## 0:45–1:10 — Run the scan

### Screen and command

~~~bash
node cli/index.js scan --target examples/messy-saas-before --out tmp/demo-before.json
node cli/index.js health --target examples/messy-saas-before
~~~

Pause on the terminal summary.

### Narration

“The scan is deterministic and local. It does not upload source and does not call an AI API. This simulated fixture scores 25 out of 100. The score is not code quality or a security certification—it summarizes visible planning, evidence, test, documentation, review, memory, and risk-hygiene surfaces.”

If time permits, point to:

- Codex Readiness: FAIL;
- evidence/docs warning;
- Review Gate: AWAITING_HUMAN;
- next action.

### Evidence boundary

The scan observes files. It does **not** execute target tests or CI.

## 1:10–1:35 — Show the low score in the dashboard

### Screen

Open **Before / After** and focus on the left “messy before” column. Then briefly open **Risks**.

### Narration

“The dashboard turns the report into a reviewable workbench. Before governance, we have 25 out of 100 and 16 risk flags. Risks explain the affected area, why the signal matters, and a recommended fix. The red number is not the product's final answer; the goal is a safer next mission with visible proof.”

### Visual checklist

- SIMULATED disclosure visible
- 25 before score visible
- 16 before risks visible
- missing Review Gate, Mistake Shield, Context Trace, and proof surfaces visible

## 1:35–1:55 — Codex Context Trace

### Screen

Open **Context Trace**. Point to:

- mission context budget;
- selected auth/payment/test/plan/evidence items;
- selection reason;
- relevance, freshness, importance;
- protected/never-forget indicator;
- graph relationships.

### Narration

“Context Trace answers a second question: what should the next Codex session read, and why? Selection is local and explainable—risk, relevance, freshness, importance, and protected minefields—not a fake embedding or hidden cloud result. The graph connects implementation, tests, plans, evidence, memory, and review state.”

### Honest boundary

“This is a heuristic local context graph, not a complete semantic blast-radius proof.”

## 1:55–2:15 — Review Gate and Mistake Shield

### Screen and command

~~~bash
node cli/index.js mistake-shield --target examples/messy-saas-before --action "Refactor auth and delete old tests"
~~~

Show the **Mistake Shield** tab, then the Review Gate panel on Overview or Evidence. If useful:

~~~bash
node cli/index.js review-gate --target examples/governed-saas-after --status
~~~

### Narration

“Before Codex acts, Mistake Shield compares the proposed action with destructive verbs, high-risk areas, remembered minefields, and gate state. It gives reasons and a safer rewrite; it never blocks silently. Review Gate records AWAITING_HUMAN, APPROVED, REJECTED, or BLOCKED locally. It is deliberately a file-based collaboration checkpoint, not enterprise identity verification.”

### Judge signal

Technological Implementation + Design: deterministic safety logic tied to a visible developer decision.

## 2:15–2:35 — Run the real GPT-5.6 Sol review

### Screen and command

~~~bash
npm run demo:codex
~~~

Run this in the second command window while the dashboard stays open. Return immediately to **Overview** and show the Real Codex Review panel moving from READY to RUNNING and then COMPLETE. Point to `gpt-5.6-sol`, ChatGPT subscription access, read-only safety, the structured verdict, and the evidence paths.

### Narration

“This is the optional real model layer. Control Tower verifies the signed-in ChatGPT subscription and that GPT-5.6 Sol is available, then invokes Codex in read-only mode with a structured review contract. The deterministic score remains independent. InvoiceFlow Mini is simulated, but this Codex response is real and its model, run state, prompt, events, and final assessment are recorded.”

### Evidence files worth flashing

- `.controltower/CODEX_LIVE_REVIEW_PROMPT.md`
- `.controltower/codex-live-review.json`
- `.controltower/codex-live-events.jsonl`
- `.controltower/codex-live-review-record.json`

Do not imply the model produced the 88 score or executed the fixture tests. The live review assesses the repository evidence; deterministic code computes the score and the demo command runs the two focused fixture tests.

## 2:35–2:50 — Governed result

### Screen

Return to **Before / After** and focus on the governed column. If needed, show:

~~~bash
node cli/index.js health --target examples/governed-saas-after
~~~

### Narration

“The same simulated project now scores 88, with risk flags reduced from 16 to 1. Two focused Node fixture tests passed in the verified fixture run. The remaining risk plus browser, load, deployment, and independent security gates are still visible—not converted into a victory claim.”

### Visual checklist

- 88 after score visible
- 1 remaining risk visible
- Review Gate visible
- Context Trace ready
- focused test result scoped
- NOT_RUN visible

## 2:50–3:00 — Close with impact

### Screen

Return to Overview with health, the completed Real Codex Review, Review Gate, Mistake Shield, and next safe action visible.

### Narration

“Codex is powerful. Control Tower turns that power into a reviewable delivery workflow: context before action, developer authority, evidence after action, and continuity for the next session. Codex writes. Control Tower proves. The developer decides.”

## Screenshot checklist

Capture these after the recording with the SIMULATED disclosure visible:

1. Overview — score, readiness, gate, shield, next action
2. Risks — auth/payment example and mitigation
3. Context Trace — selected items and context budget
4. Evidence — PASS/WARN/FAIL/NOT_RUN/SIMULATED boundary
5. Memory Lens — protected minefield and stale memory
6. Flight Recorder — approval, test/evidence, and NOT_RUN events
7. Mistake Shield — verdict, reasons, safer rewrite
8. Before / After — 25 → 88 and 16 → 1
9. Phase-0 card — goal, audience, evidence, forbidden areas, next mission
10. Terminal — evidence pack generation and local-only boundary
11. Real Codex Review — COMPLETE, `gpt-5.6-sol`, ChatGPT subscription, read-only mode, verdict, and evidence paths

## Recovery notes

- If the dashboard sample is stale, stop recording, run <code>npm run demo</code>, restart the dashboard, and confirm the disclosure and current scores.
- Never open `apps/dashboard/index.html` directly; start the dashboard with `npm run dashboard`, which opens the correct browser address automatically.
- If the live review is blocked, confirm the Codex app is signed in with ChatGPT and rerun `npm run demo:codex`. Never replace a failed live run with a simulated success.
- If a command fails, keep the failure as FAIL, fix it, rerun it, and update the build log before recording again.
- If a screenshot omits the SIMULATED label, retake it.
- If an output claims PASS without a named artifact or executed command, do not use that shot.
- Never substitute a donor repository, competition-source repository, or real customer project for InvoiceFlow Mini.

## Related assets

- [README](../README.md)
- [Devpost Submission](DEVPOST_SUBMISSION.md)
- [Judging Map](JUDGING_MAP.md)
- [Architecture](ARCHITECTURE.md)
- [Codex Build Log](CODEX_BUILD_LOG.md)
- [Beginner-safe Turkish recording guide](DEMO_REHBERI_TR.md)
