# Codex Control Tower

[![CI](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/ci.yml/badge.svg)](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/ci.yml)

> **Mission control for AI-built software.**

Codex Control Tower is a local-first developer tool that turns Codex-assisted work into a bounded, reviewable delivery workflow with mission context, risk signals, approval state, evidence, and a safe handoff.

**OpenAI Build Week Developer Tools entry · deterministic claims + real GPT-5.6 Evidence Reconciliation · no API key required · fictional sample clearly separated from real execution**

Codex is powerful. Codex Control Tower turns that power into an auditable delivery workflow.

![Codex Control Tower dashboard showing the fictional InvoiceFlow Mini governed state](docs/assets/dashboard-overview.png)

*InvoiceFlow Mini is a fictional sample project. Its prepared before/after snapshots are not customer evidence. The scanner, two fixture tests, evidence bundle, provenance checks, and recorded GPT-5.6 reconciliation shown beside it are real tool outputs.*

## 30-Second Explanation

Codex can move from request to implementation quickly. The developer still needs to know what was planned, which files were in scope, what changed, what actually ran, which checks were skipped, whether documentation stayed synchronized, and what the next session may safely do.

Control Tower turns repository evidence into one bounded Codex mission, locks the local evidence states, asks real GPT-5.6 to audit the named proof, deterministically reconciles agreement and disagreement, and leaves the final decision with the developer. It is the black-box recorder and mission-control layer around coding work—not a replacement for Codex, tests, or human review.

**Main loop:** local scan → bounded mission → real GPT-5.6 evidence audit → locked-state reconciliation → human decision → evidence handoff.

## Why This Exists

Fast implementation and trustworthy delivery are different concerns. A confident summary cannot, by itself, prove that a test ran, a risky file stayed untouched, a review happened, or a skipped gate remained visible.

Teams using coding agents need a durable answer to six questions:

- What was the agreed mission and file boundary?
- Which repository risks and dependencies mattered?
- What did the developer approve?
- Which claims have evidence, and which remain WARN, FAIL, NOT_RUN, or SIMULATED?
- What context and lessons must survive the session boundary?
- What is the next safe Codex action?

Control Tower makes these questions part of the repository instead of leaving them in a transient chat.

## What It Does

- Scans a repository without modifying it and detects missing governance surfaces.
- Scores governance health across planning, Codex readiness, evidence, tests/CI, documentation, brownfield safety, continuity, review, context, and risk hygiene.
- Builds a deterministic Codex Context Graph and presents its selected mission context as a Context Trace.
- Detects risky auth/payment areas, stale or tiny documentation, TODO/FIXME markers, weak tests, oversized files, and missing handoff records.
- Generates a bounded Codex Mission Prompt with allowed scope, forbidden actions, evidence expectations, tests, docs, gate state, and final-response format.
- Creates and reads a local Review Gate with AWAITING_HUMAN, APPROVED, REJECTED, and BLOCKED states; risky approval is useful only when scope, allowed files, forbidden actions, note, and decision time are complete.
- Compares proposed actions with detected risks and remembered minefields through Mistake Shield.
- Records prompt, plan, change, test, evidence, approval, risk, blocked, and NOT_RUN events as local JSONL.
- Exports an Evidence Pack and Devpost-ready narrative assets.
- Runs real, read-only GPT-5.6 Evidence Reconciliation through the user's signed-in ChatGPT subscription, rejects unsafe model output, and records model/run provenance.
- Presents the result in a responsive, local dashboard.

## Core Features

| Feature | What the developer gets |
| --- | --- |
| **Codex Mission Prompt Generator** | A concrete next mission built from repository state, risk, scope, evidence, and approval requirements. |
| **Codex Context Trace** | Selected files, plans, tests, evidence, and memory with a reason, relevance, freshness, importance, and protected-context signal. |
| **Codex Review Gate** | A visible local decision artifact; risky work can wait for an explicit human choice. |
| **Codex Mistake Shield** | CLEAR, CAUTION, or BLOCKED with matched risks and a safer rewrite—never a silent block. |
| **Codex Flight Recorder** | A chronological JSONL handoff across prompts, plans, changes, tests, evidence, approvals, risks, and skipped checks. |
| **Codex Memory Lens** | Durable rules, minefields, architecture principles, environment constraints, preferences, stale sources, and continuity metrics. |
| **Phase-0 Alignment Wizard** | Eight plain-language English questions, one at a time; it writes alignment files and a first mission prompt, not implementation code. |
| **GPT-5.6 Evidence Reconciliation** | Real `gpt-5.6-sol` audits target-derived locked claims through the signed-in ChatGPT subscription; a local reconciler preserves deterministic states, computes semantic agreement, and keeps the model opinion separate from the local verdict. |
| **Evidence Boundary Report** | PASS, WARN, FAIL, NOT_RUN, and SIMULATED remain distinct and tied to named artifacts. |
| **Before / After Dashboard** | An immediate comparison of score, risks, missing surfaces, review state, evidence, and continuity. |
| **Devpost Pack Exporter** | Submission summary, long description, demo script, judging map, command list, screenshots checklist, limitations, and evidence map. |

## Live Demo

**[Open the no-install live judge demo](https://zyganali-glitch.github.io/codex-control-tower/)**

The GitHub Pages deployment and anonymous HTTP access were verified on 2026-07-13. See [Judge Test Path](docs/JUDGE_TEST_PATH.md) for the exact hosted and local verification boundaries.

The GitHub Pages dashboard is a static, read-only, no-install judge exhibit. It shows sanitized fictional sample data and a recorded real GPT-5.6 run; it does not scan a visitor's repository, execute Codex in the browser, or update when a local run starts. The local dashboard is the live workbench used to show `READY → RUNNING → COMPLETE` during the recording.

## 30-Second Judge Path

1. Open the verified hosted dashboard above.
2. Read the visible **FICTIONAL SAMPLE PROJECT** disclosure and its separate **REAL EXECUTION** statement.
3. Inspect **Evidence Reconciliation**: local PASS, FAIL, NOT_RUN, and SIMULATED states remain locked beside GPT-5.6's assessment, while the local verdict remains authoritative.
4. Open **Before / After** for `25 → 88` and `16 → 1` on the controlled fixture.
5. Open **Evidence** and confirm unavailable checks remain NOT_RUN.

## Installation

Requires Node.js 18 or newer.

~~~bash
npm install
npm run demo
npm run dashboard
~~~

The dashboard command opens the live local workbench automatically. For the featured recording path, keep it open, create a clean Codex desktop task named **Demo Reconciliation** for this same repository, and ask Codex to run the real GPT-5.6 reconciliation layer without editing files:

~~~text
Without editing any files, run `npm run demo:codex` for this project. Keep the run read-only. When it completes, report the exact model, the deterministic local verdict, the separate model verdict, agreement and disagreement counts, the preserved NOT_RUN count, evidence freshness, and the evidence-record path. If it fails, show the real failure and do not replace it with simulated success.
~~~

Codex then executes `npm run demo:codex` through the product's featured, explicit opt-in path. The command performs a **REAL CODEX RUN** with `gpt-5.6-sol` against bounded evidence in read-only mode. It uses the ChatGPT subscription session already signed in to Codex, not an API key. Local code derives target-appropriate claims, records evidence hashes and Git provenance, filters and records unsupported citation paths, rejects malformed output, and keeps every deterministic state and the final local verdict outside model control.

For a click-by-click, beginner-safe Turkish recording guide, use [Türkçe Demo Çekim Rehberi](docs/DEMO_REHBERI_TR.md).

## Supported Platforms

| Platform | Status | Evidence / boundary |
| --- | --- | --- |
| Windows 10 Pro | **VERIFIED** | Full root tests, dashboard build, ChatGPT-authenticated Codex CLI, and real `gpt-5.6-sol` run executed locally. |
| Ubuntu (`ubuntu-latest`) | **VERIFIED for deterministic path** | GitHub Actions installs dependencies, runs tests and demo, and builds the dashboard. The real ChatGPT-authenticated model step is not executed in CI. |
| macOS | **NOT_RUN** | Node/Vite portability is expected, but this Build Week version has no named macOS execution artifact. |

Node.js 18 or newer is required. The deterministic path needs no OpenAI API key. The real reconciliation step requires Codex installed by this package and a ChatGPT account signed in to Codex with `gpt-5.6-sol` access.

## Sample Data

**FICTIONAL SAMPLE PROJECT:** InvoiceFlow Mini is a fictional invoice/customer/payment tracker created only for this repository. Its actors, approval, customer facts, and prepared before/after repository snapshots are controlled sample data. The snapshots let judges reproduce the same comparison; GPT-5.6 did not transform the score from 25 to 88.

**REAL EXECUTION:** Control Tower really scans both snapshots, calculates the heuristic scores, runs two focused Node.js fixture tests, constructs and hashes an evidence bundle, checks provenance/freshness, invokes real `gpt-5.6-sol` read-only, validates the response, and records the reconciliation. These bounded results are tool evidence, not proof of customer use, production readiness, or full application correctness.

## Real Repository Dogfood

The product also scans its own repository rather than relying only on InvoiceFlow Mini. The committed [portable root scan](docs/ROOT_REPO_SCAN.json) records `REAL_LOCAL_SCAN`, no simulated-data flag, score `100/100`, zero detected risks, zero missing governance surfaces, base commit `079a604`, and a clean worktree at scan time. Reproduce it with `npm run evidence:self`. This is structural governance evidence, not a correctness or security certificate.

## Demo Recording Path

Prepare the live local workbench:

~~~bash
npm install
npm run demo
npm run dashboard
~~~

Then follow the [2:45 Demo Script](docs/DEMO_SCRIPT.md). In the clean **Demo Reconciliation** task inside Codex desktop, paste the supplied read-only instruction and let Codex run `npm run demo:codex`. Return to the local dashboard to show `RUNNING` and `COMPLETE`. A separate command window is documented only as a recovery route. GitHub Pages remains the static no-install exhibit and cannot display this live local transition. The private `/feedback` Session ID must still come from the separate primary build task where most development occurred.

## CLI Usage

The package exposes the <code>cct</code> binary. From a source checkout, run <code>npm link</code> once if you want to invoke that binary directly; every command is also available as <code>node cli/index.js &lt;command&gt;</code>.

~~~bash
cct init --target . --profile startup --codex
cct phase0 --target .
cct scan --target . --out report.json
cct health --target .
cct doctor --target .
cct context-graph --target . --out context-graph.json
cct codex-review --target . --model gpt-5.6-sol
cct review-gate --target . --status
cct mistake-shield --target . --action "Refactor auth and delete old tests"
cct memory-lens --target . --out memory-lens.json
cct flight-recorder --target . --event TEST --message "Focused test command completed"
cct evidence --target . --out evidence-pack
cct export-devpost --target . --out devpost-pack
~~~

For a scoped approval that can authorize risky work, record the boundary explicitly:

~~~bash
cct review-gate --target . --approve --note "Reviewed bounded auth tests" --scope "Review authentication only" --allow "src/auth.js,tests/auth.test.js" --forbid "delete tests,change payment behavior"
~~~

An `APPROVED` value without this scope remains incomplete and Mistake Shield will not treat it as authorization for risky or destructive work.

Phase-0 is English-only in this Build Week version:

~~~bash
cct phase0 --target .
cct phase0 --target examples/demo-workspace --demo
~~~

The <code>--demo</code> answer set is predefined for InvoiceFlow Mini and is written with a SIMULATED label. Interactive Phase-0 saves <code>.controltower/phase0.json</code> and <code>plans/PHASE0_ALIGNMENT.md</code>; it does not write product implementation code.

## Demo Walkthrough

The 2:45 story uses **InvoiceFlow Mini**, a fictional invoice/customer/payment tracker created solely for this demonstration. The two repository states are prepared snapshots; the demo scans and tests them but does not claim that GPT-5.6 created the `25 → 88` transformation during the recording.

1. **Messy before:** <code>examples/messy-saas-before</code> contains plausible application files plus stale docs, placeholder tests, TODO/FIXME markers, and deliberately risky auth/payment examples. It has no plan, evidence report, Review Gate, Flight Recorder, Memory Lens, or Codex instructions.
2. **Scan:** the deterministic local fixture scan scores that state **25/100** with **16 risk flags**.
3. **Bounded mission:** Control Tower selects context, records the human gate, and generates the allowed scope, forbidden actions, required proof, and next safe Codex mission.
4. **Locked claims:** local code derives target-appropriate claims whose PASS, FAIL, NOT_RUN, and SIMULATED states cannot be replaced by model output.
5. **Real GPT-5.6 reconciliation:** Codex desktop is instructed to run `npm run demo:codex`. The command verifies ChatGPT sign-in and the model catalog, runs `gpt-5.6-sol` read-only, validates the structured response, filters and records unsupported citations, rejects status injection, checks evidence freshness, and exposes semantic agreement/disagreement. The deterministic local verdict and the model verdict remain visibly separate.
6. **Governed prepared snapshot:** <code>examples/governed-saas-after</code> represents the same fictional sample with governance surfaces applied. Its real deterministic scan scores **88/100** with **1 remaining risk flag**; **2 focused Node fixture tests passed**. GPT-5.6 did not create this snapshot. Browser, load, fixture deployment, and independent security checks remain **NOT_RUN**.
7. **Human decision and handoff:** Review Gate remains authoritative; the dashboard and Evidence Pack preserve the next safe action and missing proof.

These numbers describe controlled local fixtures, not customer outcomes, production benchmarks, or a correctness guarantee. Re-run the commands and treat current output as the source of truth.

See the shot-by-shot [2:45 demo script](docs/DEMO_SCRIPT.md).

## Dashboard

The local dashboard imports a report at build time, can load a local JSON report, and watches the explicit Evidence Reconciliation record while open. It is the live `READY → RUNNING → COMPLETE` workbench and never uploads a report itself. The real audit sends only the bounded evidence bundle to Codex after explicit opt-in. The GitHub Pages build is different: it is a static snapshot of sanitized sample and recorded run data for no-install judging.

| Surface | What to show |
| --- | --- |
| **Overview** | Health, readiness, review state, evidence signals, next safe action, score breakdown, missing surfaces, mission prompt, and the conditional Phase-0 card. |
| **Evidence Reconciliation** | READY/RUNNING/COMPLETE state, exact model, ChatGPT provenance, deterministic local verdict, separate model verdict, locked statuses, semantic agreement/disagreement, evidence hashes/freshness, filtered citation paths, and next safe action. |
| **Risks** | Severity, affected area, why each finding matters, and the recommended mitigation. |
| **Context Trace** | Mission context budget, selected repository items, selection reasons, relevance, freshness, importance, and protected items. |
| **Evidence** | PASS/WARN/FAIL/NOT_RUN/SIMULATED boundary, traceability rows, technical-debt/docs state, and review status. |
| **Memory Lens** | Code-soul rules, minefield history, preferences/state when present, freshness, contradictions, and continuity metrics. |
| **Flight Recorder** | Prompt, plan, change, test, evidence, NOT_RUN, approval, and risk events in time order. |
| **Mistake Shield** | Proposed action, CLEAR/CAUTION/BLOCKED verdict, reasons, and a safer next action. |
| **Before / After** | Messy versus governed score, risks, governance surfaces, evidence, tests, Review Gate, Context Trace, and NOT_RUN visibility. |

The **Phase-0 Alignment Card** appears inside Overview only when <code>.controltower/phase0.json</code> exists. It shows goal, audience, success criteria, forbidden areas, expected evidence, and the next safe Codex mission.

## OpenAI Build Week Fit

Codex Control Tower is a developer tool and AI-agent collaboration layer built with Codex. Its non-trivial implementation combines a Node.js CLI, deterministic repository analysis, locked claim generation, real GPT-5.6 evidence auditing, local output reconciliation, generated evidence artifacts, a controlled before/after demonstration, and a React dashboard.

It addresses a specific audience—developers and teams using Codex who need reviewable handoffs without sending a repository to a new service. The collaboration boundary is deliberate:

> **Codex writes. Control Tower proves. The developer decides.**

That makes the project a direct expression of Build Week's invitation to show what developers and AI agents can do side by side. The mapping to the official Technological Implementation, Design, Potential Impact, and Quality of the Idea criteria is in [Judging Map](docs/JUDGING_MAP.md).

## How Codex Accelerated the Build

Codex helped synthesize requirements, inspect the Universal Agent OS family read-only, implement the CLI and deterministic engines, build the fixtures and React dashboard, diagnose integration failures, write tests, run verification, and turn its own workflow gaps into product features. During the official submission period, Codex also implemented and verified the real GPT-5.6 path, then hardened it into locked-claim Evidence Reconciliation.

Concrete acceleration is recorded in the [Codex Build Log](docs/CODEX_BUILD_LOG.md), commit history, test output, generated prompt, JSONL events, model output, and reconciliation record. Before submission, a real `/feedback` Session ID must be obtained from the primary build task where most development occurred and supplied only in the private Devpost form; it is not stored here.

## Key Human Decisions

The developer retained authority over the decisions that define the product:

- keep the deterministic core inspectable and usable without an API key;
- make GPT-5.6 meaningful without letting it overwrite evidence states;
- use a fictional fixture instead of customer or donor data;
- preserve PASS, FAIL, NOT_RUN, and SIMULATED as distinct meanings;
- require a visible human Review Gate for risky scope;
- disclose pre-existing work and isolate the official Build Week delta;
- publish only verified test, model, deployment, and user-validation claims.

## How GPT-5.6 Is Integrated

`npm run demo:codex` invokes real `gpt-5.6-sol` through the official Codex CLI and the user's signed-in ChatGPT subscription. Before the call, local code derives locked claims from the target report, builds a bounded evidence bundle, records SHA-256 hashes plus the base Git commit, bounded worktree state, and command provenance, and computes the deterministic local verdict. GPT-5.6 may return SUPPORTS, QUESTIONS, or INSUFFICIENT for each claim and must cite named files. After the call, local code rejects missing or duplicate claims, injected status fields, malformed data, and statements that imply the model executed tests; unsupported citation paths are filtered out and recorded for inspection. The dashboard shows semantic agreement beside the unchanged local states, keeps the model verdict and suggested next action separate from their authoritative local counterparts, and marks stale evidence instead of silently presenting it as current.

## Build Week Development Delta

The project had a foundation before the submission window and was meaningfully extended after the official start. Exact commits, timestamps, scope separation, and verification sources are documented in [OpenAI Build Week Development Delta](docs/BUILD_WEEK_DELTA.md). Judges should evaluate the in-period Codex/GPT-5.6 integration, locked reconciliation engine, judge demo, tests, and submission hardening as the new work.

## Lineage and Inspiration

Codex Control Tower was built for OpenAI Build Week as a Codex-native developer tool.

It is inspired by the **Universal Agent OS family**: prior experiments in alignment, evidence-first delivery, human review, context, continuity, and mistake prevention.

Codex Control Tower is not a direct clone of the family. It transforms those lessons into a new Codex-centered product: a local-first mission control layer with bounded missions, locked evidence claims, real GPT-5.6 Evidence Reconciliation, human Review Gate, and a dashboard for AI-built software.

The source repositories were studied read-only, were not modified, are not runtime dependencies, and are never used as the demo target. The no-copy and transformation record is documented in [Source Protection](docs/SOURCE_PROTECTION.md), [Source Research Matrix](docs/SOURCE_RESEARCH_MATRIX.md), [Feature Harvest](docs/FEATURE_HARVEST.md), and [Originality Matrix](docs/ORIGINALITY_MATRIX.md). No unverified competition-placement claim is made.

## Codex Build-Time Self-Assessment

During the build, Codex generated a build-time workflow assessment: what future Codex sessions need before safely continuing a project, where agent-built work loses continuity, what evidence should be required before trusting a “done” claim, and which actions should require human review.

Those recommendations shaped the core product features:

- Codex Mission Prompt Generator
- Codex Context Trace
- Codex Review Gate
- Codex Mistake Shield
- Codex Flight Recorder
- Codex Evidence Pack
- Phase-0 Alignment Wizard
- Before / After Governance Dashboard

This is a **Codex-generated self-assessment and agent workflow analysis**, not a claim of consciousness, self-awareness, or sentience. Read the full [Self-Assessment](docs/CODEX_SELF_ASSESSMENT.md) and [Codex-Native Recommendations](docs/CODEX_NATIVE_RECOMMENDATIONS.md).

## Architecture

~~~text
target repository
      |
      v
cct command router -> safe filesystem boundary
      |
      +-> scanner -> health scorer -> report + Codex Mission Prompt
      |      |            |
      |      +-> Context Graph / Trace
      |      +-> Memory Lens -> Mistake Shield
      |      +-> Review Gate + Flight Recorder
      |
      +-> Evidence Pack / Devpost Pack
      |
      +-> locked claims -> React dashboard <-> reconciliation report
                                      ^
                                      |
         local reconciler <- Codex CLI <- gpt-5.6-sol (read-only)
~~~

The CLI is CommonJS on Node.js. Scanning and scoring are deterministic and require no model call. The scanner reads filenames, selected text surfaces, metadata, tests/CI presence, governance artifacts, and risk markers. Generated JSON and Markdown stay portable. `codex-review` verifies ChatGPT authentication and model availability, writes deterministic claims, invokes `gpt-5.6-sol` read-only, validates the structured result, and reconciles it without allowing model output to replace local status. The Vite/React dashboard visualizes both layers; it does not strengthen or replace the underlying evidence.

See [Architecture](docs/ARCHITECTURE.md) for module boundaries, data flow, write behavior, and the safety model.

## Privacy and Safety

- Core scanning, scoring, context selection, risk matching, report generation, and dashboard use are local-first.
- No telemetry or analytics are included.
- Source code is not uploaded by the core workflow.
- No OpenAI API key is required for the core demo.
- Real Evidence Reconciliation is a featured explicit opt-in path and sends only the displayed bounded evidence bundle to Codex under the signed-in ChatGPT account.
- Local reports remain on the device unless the user chooses to share or publish them. The public GitHub Pages exhibit intentionally contains a sanitized, committed snapshot and may be subject to GitHub's ordinary hosting logs.
- Generated packs can contain sensitive filenames, plans, paths, and risk descriptions; review them before sharing.
- Protected lineage repositories remain read-only and outside the product/demo write boundary.

Detailed boundaries: [Privacy and Security](docs/PRIVACY_AND_SECURITY.md).

## Honest Boundaries

- Control Tower does **not** guarantee code correctness, security, compliance, or production readiness.
- It does **not** replace tests, code review, domain validation, CI, or repository permissions.
- Scanner findings and the health score are deterministic heuristics; false positives and false negatives are possible.
- The Review Gate is a local, unsigned file-based approval artifact—not enterprise identity verification or OS-level enforcement.
- The Flight Recorder is inspectable JSONL, not a tamper-proof ledger.
- A Mistake Shield CLEAR means no configured deterministic rule matched; it does not mean an action is risk-free.
- A dashboard card is a visualization of the report, not independent proof.
- **PASS requires named evidence.** An edited file is not automatically a validated file.
- **NOT_RUN remains visible.** Missing or unavailable execution is never silently promoted to PASS.
- **FICTIONAL SAMPLE stays separate from REAL EXECUTION.** InvoiceFlow Mini's actors, customer facts, approvals, and prepared snapshots are controlled sample data; scanner, test, provenance, and recorded GPT-5.6 outputs are separately identified real executions.

See [Honest Limitations](docs/LIMITATIONS.md).

## Repository Structure

~~~text
codex-control-tower/
├── cli/
│   ├── commands/          # init, phase0, scan, gates, reports, demo
│   └── lib/               # scanner, score, graph, prompt, evidence, safety
├── apps/dashboard/        # local Vite + React report workbench
├── core/
│   ├── en/                # English-only Phase-0 question templates
│   ├── adapters/          # Codex and other instruction adapters
│   ├── templates/         # portable governance artifacts
│   └── workflows/         # mission, evidence, review, recorder guidance
├── examples/
│   ├── messy-saas-before/
│   ├── governed-saas-after/
│   ├── demo-workspace/    # generated only by the demo
│   └── demo-report/       # generated local reports and evidence
├── docs/                  # competition, lineage, product, and safety docs
└── tests/                 # deterministic Node.js test suite
~~~

## Devpost Assets

- [Devpost Submission](docs/DEVPOST_SUBMISSION.md) — project narrative and fictional-sample/real-execution boundary
- [2:45 Demo Script](docs/DEMO_SCRIPT.md) — timed recording and English narration plan
- [Codex Demo Prompt](docs/CODEX_DEMO_PROMPT.md) — exact read-only instruction for the clean demo task
- [Judge Test Path](docs/JUDGE_TEST_PATH.md) — no-install and full local evaluation paths
- [Build Week Development Delta](docs/BUILD_WEEK_DELTA.md) — pre-existing versus in-period work with timestamps
- [User Validation](docs/USER_VALIDATION.md) — honest permission-based observation template
- [Judging Map](docs/JUDGING_MAP.md) — official criteria mapped to implementation evidence
- [Codex Build Log](docs/CODEX_BUILD_LOG.md) — actual commands, outcomes, failures, and remaining work
- [Source Research Matrix](docs/SOURCE_RESEARCH_MATRIX.md) — read-only research record
- [Feature Harvest](docs/FEATURE_HARVEST.md) — concept-to-product transformation
- [Originality Matrix](docs/ORIGINALITY_MATRIX.md) — what is new and why it fits Build Week
- [Codex Self-Assessment](docs/CODEX_SELF_ASSESSMENT.md) — build-time workflow findings
- [Codex-Native Recommendations](docs/CODEX_NATIVE_RECOMMENDATIONS.md) — implemented and deferred product guidance

## Roadmap

- Additional target-derived reconciliation policies and language-aware claim adapters
- GitHub/GitLab PR/MR and CI integrations
- Stronger language-aware dependency and code-ownership mapping
- Signed or identity-backed Review Gates and evidence attestations
- Team and cross-repository dashboards
- Multilingual packs are future work

Roadmap items are future work, not current capability.

## License

Codex Control Tower is released under the [MIT License](LICENSE).

Universal Agent OS family concepts are acknowledged above and in the research/attribution documents. The active package, implementation, UI, demo fixtures, and product narrative are Codex Control Tower; the protected source repositories were not modified and are not required to run it.
