# Codex Control Tower

> **Mission control for AI-built software.**

Codex Control Tower is a local-first developer tool that turns Codex-assisted work into a bounded, reviewable delivery workflow with mission context, risk signals, approval state, evidence, and a safe handoff.

**OpenAI Build Week project · deterministic core · no API key required · simulated demo clearly labeled**

Codex is powerful. Codex Control Tower turns that power into an auditable delivery workflow.

![Codex Control Tower dashboard showing the simulated InvoiceFlow Mini governed state](docs/assets/dashboard-overview.png)

*Dashboard proof uses clearly labeled SIMULATED InvoiceFlow Mini data; no customer repository or private user path is shown.*

## 30-Second Explanation

Codex can move from request to implementation quickly. The developer still needs to know what was planned, which files were in scope, what changed, what actually ran, which checks were skipped, whether documentation stayed synchronized, and what the next session may safely do.

Control Tower scans a local repository and assembles those answers into one system: a governance health score, an explainable Context Trace, a strict next-mission prompt, a local human Review Gate, a Mistake Shield, a Flight Recorder, an Evidence Pack, and a dashboard. It is the black-box recorder and mission-control layer around the coding work—not a replacement for Codex, tests, or human review.

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
| **Phase-0 Alignment Wizard** | Eight plain-language questions, one at a time, in English or Turkish; it writes alignment files and a first mission prompt, not implementation code. |
| **Evidence Boundary Report** | PASS, WARN, FAIL, NOT_RUN, and SIMULATED remain distinct and tied to named artifacts. |
| **Before / After Dashboard** | An immediate comparison of score, risks, missing surfaces, review state, evidence, and continuity. |
| **Devpost Pack Exporter** | Submission summary, long description, demo script, judging map, command list, screenshots checklist, limitations, and evidence map. |

## Quick Start

Requires Node.js 18 or newer.

~~~bash
npm install
npm run demo
npm run dashboard
~~~

The demo prepares controlled **SIMULATED DEMO DATA** for InvoiceFlow Mini and refreshes the local dashboard report. It does not use a customer repository, a donor repository, or a competition-source repository.

## CLI Usage

The package exposes the <code>cct</code> binary. From a source checkout, run <code>npm link</code> once if you want to invoke that binary directly; every command is also available as <code>node cli/index.js &lt;command&gt;</code>.

~~~bash
cct init --target . --profile startup --codex
cct phase0 --target . --locale en|tr
cct scan --target . --out report.json
cct health --target .
cct doctor --target .
cct context-graph --target . --out context-graph.json
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

Phase-0 supports English and Turkish while the competition README, dashboard, and Devpost narrative remain English:

~~~bash
cct phase0 --target . --locale en
cct phase0 --target . --locale tr
cct phase0 --target examples/demo-workspace --locale en --demo
~~~

The <code>--demo</code> answer set is predefined for InvoiceFlow Mini and is written with a SIMULATED label. Interactive Phase-0 saves <code>.controltower/phase0.json</code> and <code>plans/PHASE0_ALIGNMENT.md</code>; it does not write product implementation code.

## Demo Walkthrough

The three-minute story uses **InvoiceFlow Mini**, a fictional invoice/customer/payment tracker created solely for this demonstration.

1. **Messy before:** <code>examples/messy-saas-before</code> contains plausible application files plus stale docs, placeholder tests, TODO/FIXME markers, and deliberately risky auth/payment examples. It has no plan, evidence report, Review Gate, Flight Recorder, Memory Lens, or Codex instructions.
2. **Scan:** the deterministic local fixture scan scores that state **25/100** with **16 risk flags**.
3. **Context and risk:** Context Trace explains which repository surfaces matter. Mistake Shield blocks or cautions on actions such as deleting tests while refactoring auth.
4. **Alignment and approval:** Phase-0 creates a first mission boundary; Review Gate makes the local human decision visible.
5. **Mission and evidence:** Control Tower generates a strict Codex Mission Prompt and exports the evidence, traceability, NOT_RUN, debt, graph, memory, shield, recorder, and report artifacts.
6. **Governed after:** <code>examples/governed-saas-after</code> represents the same simulated project with governance applied. Its verified local fixture scan scores **88/100** with **1 remaining risk flag**; **2 focused Node fixture tests passed**. Provider, browser, load, deployment, and independent security checks remain **NOT_RUN**.
7. **Dashboard:** Before / After makes the score and risk reduction legible while Evidence keeps the remaining proof gaps visible.

These numbers describe controlled local fixtures, not customer outcomes, production benchmarks, or a correctness guarantee. Re-run the commands and treat current output as the source of truth.

See the shot-by-shot [three-minute demo script](docs/DEMO_SCRIPT.md).

## Dashboard

The dashboard imports a local report at build time and can also load a local JSON report from the browser. It never uploads that report.

| Surface | What to show |
| --- | --- |
| **Overview** | Health, readiness, review state, evidence signals, next safe action, score breakdown, missing surfaces, mission prompt, and the conditional Phase-0 card. |
| **Risks** | Severity, affected area, why each finding matters, and the recommended mitigation. |
| **Context Trace** | Mission context budget, selected repository items, selection reasons, relevance, freshness, importance, and protected items. |
| **Evidence** | PASS/WARN/FAIL/NOT_RUN/SIMULATED boundary, traceability rows, technical-debt/docs state, and review status. |
| **Memory Lens** | Code-soul rules, minefield history, preferences/state when present, freshness, contradictions, and continuity metrics. |
| **Flight Recorder** | Prompt, plan, change, test, evidence, NOT_RUN, approval, and risk events in time order. |
| **Mistake Shield** | Proposed action, CLEAR/CAUTION/BLOCKED verdict, reasons, and a safer next action. |
| **Before / After** | Messy versus governed score, risks, governance surfaces, evidence, tests, Review Gate, Context Trace, and NOT_RUN visibility. |

The **Phase-0 Alignment Card** appears inside Overview only when <code>.controltower/phase0.json</code> exists. It shows goal, audience, success criteria, forbidden areas, expected evidence, and the next safe Codex mission.

## OpenAI Build Week Fit

Codex Control Tower is a developer tool, a workflow, and an AI-agent collaboration layer built with Codex. Its non-trivial implementation combines a Node.js CLI, deterministic repository analysis, generated review/evidence artifacts, a controlled before/after demonstration, and a React dashboard.

It addresses a specific audience—developers and teams using Codex who need reviewable handoffs without sending a repository to a new service. The collaboration boundary is deliberate:

> **Codex writes. Control Tower proves. The developer decides.**

That makes the project a direct expression of Build Week's invitation to show what developers and AI agents can do side by side. The mapping to the official Technological Implementation, Design, Potential Impact, and Quality of the Idea criteria is in [Judging Map](docs/JUDGING_MAP.md).

## Lineage and Inspiration

Codex Control Tower was built for OpenAI Build Week as a Codex-native developer tool.

It is inspired by the Universal Agent OS family of prior experiments:

- **Universal Agent OS** — general multi-agent governance and evidence-first delivery.
- **Universal Agent OS for UiPath** — human-in-the-loop approval, strict/mock evidence boundaries, and enterprise workflow gates.
- **Universal Agent OS GitLab Edition** — context graph, blast-radius thinking, reviewable artifacts, and refusal to fake unavailable tool results.
- **Universal Agent OS Qwen Edition** — memory workbench, mistake prevention, recall traces, timeline views, and honesty reports.

Codex Control Tower is not a direct clone of those repositories. It transforms lessons from that family into a new Codex-centered product: a local-first mission control layer with Codex Mission Prompts, Context Trace, Review Gate, Mistake Shield, Flight Recorder, Evidence Pack, and a dashboard for AI-built software.

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
      +-> local JSON report -> React dashboard
~~~

The CLI is CommonJS on Node.js. Scanning and scoring are deterministic and require no model call. The scanner reads filenames, selected text surfaces, metadata, tests/CI presence, governance artifacts, and risk markers. Generated JSON and Markdown stay portable. The Vite/React dashboard visualizes the report; it does not strengthen or replace the underlying evidence.

See [Architecture](docs/ARCHITECTURE.md) for module boundaries, data flow, write behavior, and the safety model.

## Privacy and Safety

- Core scanning, scoring, context selection, risk matching, report generation, and dashboard use are local-first.
- No telemetry or analytics are included.
- Source code is not uploaded by the core workflow.
- No OpenAI API key is required for the core demo.
- Reports remain local unless the user chooses to share them.
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
- **SIMULATED remains visible.** InvoiceFlow Mini and its actors, approvals, scores, and demo history are controlled simulated data.

See [Honest Limitations](docs/LIMITATIONS.md).

## Repository Structure

~~~text
codex-control-tower/
├── cli/
│   ├── commands/          # init, phase0, scan, gates, reports, demo
│   └── lib/               # scanner, score, graph, prompt, evidence, safety
├── apps/dashboard/        # local Vite + React report workbench
├── core/
│   ├── en/ and tr/        # Phase-0 question templates
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

- [Devpost Submission](docs/DEVPOST_SUBMISSION.md) — project narrative and real/simulated boundary
- [Three-Minute Demo Script](docs/DEMO_SCRIPT.md) — timed recording plan
- [Judging Map](docs/JUDGING_MAP.md) — official criteria mapped to implementation evidence
- [Codex Build Log](docs/CODEX_BUILD_LOG.md) — actual commands, outcomes, failures, and remaining work
- [Source Research Matrix](docs/SOURCE_RESEARCH_MATRIX.md) — read-only research record
- [Feature Harvest](docs/FEATURE_HARVEST.md) — concept-to-product transformation
- [Originality Matrix](docs/ORIGINALITY_MATRIX.md) — what is new and why it fits Build Week
- [Codex Self-Assessment](docs/CODEX_SELF_ASSESSMENT.md) — build-time workflow findings
- [Codex-Native Recommendations](docs/CODEX_NATIVE_RECOMMENDATIONS.md) — implemented and deferred product guidance

## Roadmap

- Optional OpenAI API review mode with explicit enablement and a disclosed data boundary
- GitHub/GitLab PR/MR and CI integrations
- Stronger language-aware dependency and code-ownership mapping
- Signed or identity-backed Review Gates and evidence attestations
- Team and cross-repository dashboards
- Multilingual packs beyond the current English/Turkish Phase-0 alignment flow

Roadmap items are future work, not current capability.

## License

Codex Control Tower is released under the [MIT License](LICENSE).

Universal Agent OS family concepts are acknowledged above and in the research/attribution documents. The active package, implementation, UI, demo fixtures, and product narrative are Codex Control Tower; the protected source repositories were not modified and are not required to run it.
