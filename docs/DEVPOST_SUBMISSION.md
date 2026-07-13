# Devpost Submission Draft

## Project Name

**Codex Control Tower**

## One-Liner

Mission control for AI-built software: a local-first evidence, approval, risk, context, and handoff layer for Codex-assisted changes.

## Short Description

Codex writes fast. Codex Control Tower makes delivery reviewable. It turns repository evidence into a bounded Codex mission, locks the local evidence states, asks real GPT-5.6 to audit named proof, deterministically reconciles agreement and disagreement, and leaves the final decision with the developer.

> **Codex writes. Control Tower proves. The developer decides.**

## Problem

After an AI coding session, a developer may have changed files and a confident summary but still lack durable answers:

- What mission and file boundary were agreed?
- What repository risks and dependencies mattered?
- Which tests actually ran, with what scope?
- Which checks failed or never ran?
- Was documentation synchronized?
- Was risky work explicitly approved?
- Which known mistake or stale assumption could repeat?
- Can the next Codex session continue without reconstructing chat history?

This is not a criticism of Codex. Codex is powerful; teams need an evidence and continuity layer around that power.

## Solution

Codex Control Tower turns repository state into a reviewable mission-control workflow:

1. **Align:** Phase-0 asks eight plain-language questions in English.
2. **Scan:** deterministic local rules detect governance gaps and risky areas.
3. **Understand:** Context Graph/Trace shows which files, plans, tests, docs, evidence, and memory matter and why.
4. **Decide:** Review Gate records the developer's local decision; Mistake Shield compares a proposal with risk and minefield context.
5. **Direct Codex:** Mission Prompt Generator creates a bounded next mission with scope, evidence, tests, docs, and stop rules.
6. **Lock evidence:** local code creates claims whose PASS, WARN, FAIL, NOT_RUN, and SIMULATED states cannot be replaced by model output.
7. **Audit with real GPT-5.6:** a read-only Codex run assesses each claim against named files.
8. **Reconcile and decide:** local validation rejects unsafe output, the dashboard exposes agreement/disagreement, and the human Review Gate remains authoritative.
9. **See progress:** the dashboard compares the same simulated project before and after governance.

## What It Does

- Read-only repository scan with deterministic JSON output
- Governance score out of 100 with an inspectable category breakdown
- Missing-surface and risk detection, including weak proof, stale docs, TODO/FIXME, auth, and payment signals
- Codex Context Graph plus explainable Context Trace and mission context budget
- Codex Mission Prompt generation
- Local Review Gate: AWAITING_HUMAN, APPROVED, REJECTED, BLOCKED
- Deterministic Mistake Shield: CLEAR, CAUTION, BLOCKED with reasons and a safer next action
- Memory Lens for persistent rules, minefields, architecture, environment, preferences, staleness, and continuity
- JSONL Flight Recorder for mission history
- Evidence Pack and Devpost Pack export
- Eight-tab Vite/React dashboard with a conditional Phase-0 card
- Real GPT-5.6 Evidence Reconciliation panel with READY/RUNNING/COMPLETE state
- Locked claim generation, strict structured-output validation, allowed-path filtering, agreement/disagreement, and preserved NOT_RUN
- Controlled InvoiceFlow Mini before/after demo

## What Is Technically Implemented

| Surface | Implementation | Evidence path |
| --- | --- | --- |
| CLI | CommonJS command router with init, phase0, scan, health, doctor, evidence, context-graph, review-gate, mistake-shield, memory-lens, flight-recorder, export-devpost, and demo commands | cli/index.js and cli/commands/ |
| Scanner | Local file inventory, governance detection, text/metadata heuristics, auth/payment risk rules | cli/lib/repoScanner.js |
| Scoring | Deterministic weighted score and readiness bands | cli/lib/healthScorer.js |
| Context | Local graph nodes/edges, selected items, reasons, relevance, freshness, importance, protection | cli/lib/contextGraphBuilder.js |
| Mission prompt | Target, risk, gaps, allowed scope, forbidden actions, evidence, tests, docs, gate/shield, final response | cli/lib/codexPromptBuilder.js |
| Review and prevention | Local JSON gate plus lexical risk/minefield comparison | cli/lib/reviewGate.js and cli/lib/mistakeShield.js |
| Continuity | Memory-source analysis and typed local JSONL event recorder | cli/lib/memoryLens.js and cli/lib/flightRecorder.js |
| Evidence | Twelve-file Markdown/JSON evidence export with explicit status boundary | cli/lib/evidenceCollector.js |
| Dashboard | Local Vite/React report workbench; bundled report import and local JSON load/export | apps/dashboard/ |
| Evidence Reconciliation | Five deterministic claims, real read-only `gpt-5.6-sol` audit, schema validation, status-injection rejection, citation filtering, and locked-state merge | cli/commands/codex-review.js and tests/test_codex_review.js |
| Fixtures | Fictional messy/governed InvoiceFlow Mini projects | examples/messy-saas-before and examples/governed-saas-after |

The deterministic scan does not call an AI API and remains inspectable without an API key. The explicit `codex-review` command uses the user's signed-in ChatGPT subscription to invoke real `gpt-5.6-sol` read-only. Before the call it locks five local claims. After the call it rejects malformed, incomplete, duplicate, status-injecting, execution-claiming, or unapproved-citation output. It records the prompt, events, assessment, reconciliation, model, CLI version, access type, and timestamps without changing deterministic state.

## How Codex Was Used

Codex was the coding collaborator for the new repository:

- translated a multi-part Build Week brief and overriding addenda into an ordered implementation plan;
- inspected protected sources through read-only research and transformed concepts without modifying those repositories;
- implemented the CLI, deterministic analysis engines, fixture projects, tests, dashboard, and documentation;
- checked implementation surfaces against the requested file/command contracts;
- used parallel workstreams for bounded CLI, dashboard, fixture, and narrative tasks;
- surfaced integration issues such as report/fixture/dashboard consistency;
- generated build-time workflow recommendations and converted them into product requirements;
- recorded actual verification commands and outcomes in [Codex Build Log](CODEX_BUILD_LOG.md).

Codex usage has two disclosed layers: Codex helped build the product, and the featured product flow invokes `gpt-5.6-sol` through ChatGPT subscription access for Evidence Reconciliation. No OpenAI API key is required. The deterministic scan remains available when the real audit is not run, but the Build Week demo centers the real GPT-5.6 path.

## What Codex Contributed Beyond Code

Codex did not only generate implementation files. During the build, it produced a build-time workflow analysis identifying what future Codex sessions need in order to continue safely and honestly. Those recommendations were converted into product features:

- Codex Mission Prompt Generator
- Codex Flight Recorder
- Codex Review Gate
- Codex Mistake Shield
- Codex Evidence Pack
- Codex Context Graph and Context Trace

The analysis also shaped the Phase-0 Alignment Wizard, Memory Lens, evidence-state boundary, and Before / After dashboard. This is a **Codex-generated self-assessment and agent workflow analysis**, not a claim of consciousness, self-awareness, or sentience.

Read [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md) and [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md).

## InvoiceFlow Mini Demo

InvoiceFlow Mini is a **fictional, controlled, SIMULATED DEMO PROJECT** for small-business invoice/customer/payment tracking. It is not a customer repository, production payment application, benchmark, donor repository, or competition-source repository.

The messy fixture intentionally has stale documentation, a placeholder test, TODO/FIXME markers, missing governance surfaces, and risky auth/payment examples. The governed fixture adds the Control Tower workflow and focused proof without pretending all application risks are solved.

Verified local fixture results:

| Signal | Messy before | Governed after |
| --- | ---: | ---: |
| Governance health | 25/100 | 88/100 |
| Risk flags | 16 | 1 |
| Codex instructions, plan, evidence, gate, recorder, memory | Missing | Present |
| Focused Node fixture tests | Placeholder/weak | 2 passed, 0 failed |
| Provider/browser/load/deployment/security gates | NOT_RUN | NOT_RUN |

The remaining governed risk is visible instead of hidden. Exact current CLI output remains the source of truth.

## Demo Commands

Quick path:

~~~bash
npm install
npm run demo
npm run dashboard
~~~

With the dashboard already open, run the real model layer in a second command window:

~~~bash
npm run demo:codex
~~~

The Evidence Reconciliation panel updates automatically from READY to RUNNING to COMPLETE.

Individual proof:

~~~bash
node cli/index.js scan --target examples/messy-saas-before --out tmp/before-report.json
node cli/index.js health --target examples/messy-saas-before
node cli/index.js context-graph --target examples/messy-saas-before --out tmp/before-context.json
node cli/index.js mistake-shield --target examples/messy-saas-before --action "Refactor auth and delete old tests"
node cli/index.js scan --target examples/governed-saas-after --out tmp/after-report.json
node cli/index.js health --target examples/governed-saas-after
node cli/index.js evidence --target examples/governed-saas-after --out tmp/evidence-pack
~~~

Phase-0:

~~~bash
node cli/index.js phase0 --target examples/demo-workspace --locale en --demo
~~~

For a timed recording, follow [Demo Script](DEMO_SCRIPT.md).

## What Is Real

- The Node.js CLI and command routing
- Local repository inventory and deterministic detection rules
- Health score computation and category breakdown
- Context Graph/Trace construction
- Codex Mission Prompt generation
- Local JSON Review Gate state
- Deterministic Mistake Shield and Memory Lens output
- Local JSONL Flight Recorder
- Evidence and Devpost exporters
- Vite/React dashboard and local report handling
- Files and tests in the controlled fixtures
- Local scan/test commands explicitly recorded as run in the build log
- Real Codex execution with verified `gpt-5.6-sol`, ChatGPT subscription provenance, read-only permissions, locked claims, saved structured output, and deterministic reconciliation

## What Is Simulated

- InvoiceFlow Mini and all of its customer/payment/auth records
- Demo actors, approvals, branches, commits, timestamps, and history
- Before/after outcomes as a customer story
- Any provider-backed payment verification
- Any enterprise identity-backed approval
- Any browser, load, deployment, penetration, or independent security result not explicitly executed

The real Codex response is **not simulated**. It is kept separate from the fictional InvoiceFlow Mini data and from deterministic scoring.

Simulated data is labeled in the fixtures, reports, dashboard, and narrative.

## Evidence Boundary

- **PASS** requires evidence for the exact bounded claim.
- **WARN** means partial, narrow, stale, heuristic, or review-dependent evidence.
- **FAIL** means an observed required check failed or a mandatory surface is missing.
- **NOT_RUN** means the check did not execute or no result was available.
- **SIMULATED** means controlled demo data or activity.

A test file's presence is not proof it ran. Two focused fixture tests do not establish integration, security, or production readiness.

## OpenAI Build Week Fit

The official [OpenAI Build Week page](https://openai.com/build-week/) invites developers to bring ideas to life with Codex. The official [Devpost page](https://openai.devpost.com/) lists four judging criteria: Technological Implementation, Design, Potential Impact, and Quality of the Idea.

Codex Control Tower fits as:

- a working **developer tool and workflow**, not a prompt-only rule pack;
- a **Codex-centered collaboration layer** built with Codex;
- a coherent **local product experience** from scan to decision to evidence to dashboard;
- a specific response to the real handoff/proof problem in agent-assisted software work;
- a non-obvious use of Codex: GPT-5.6 audits evidence in the live product, while local code prevents the model from owning or upgrading the evidence state.

The evidence-by-criterion mapping is in [Judging Map](JUDGING_MAP.md).

## Design Decisions

- **Local first:** repository context stays on the machine by default.
- **Deterministic core:** users can inspect why a score or verdict changed.
- **Visible developer authority:** Control Tower prepares and proves; it does not silently execute the next mission.
- **Portable artifacts:** JSON, JSONL, and Markdown remain readable outside the dashboard.
- **Evidence before polish:** UI state cannot promote an unsupported claim.
- **Controlled demo:** a small fictional SaaS demonstrates risky boundaries without exposing a donor or customer repository.

See [Architecture](ARCHITECTURE.md) and [Product Decisions](PRODUCT_DECISIONS.md).

## Lineage and Originality

Codex Control Tower acknowledges concept-level inspiration from the **Universal Agent OS family**. Family sources were studied read-only and were not modified, copied into the runtime, or used as demo targets.

The new Codex-native contribution is the integrated local path from repository scan to Context Trace, bounded Codex Mission Prompt, local decision state, mistake comparison, session recorder, evidence boundary, and before/after workbench.

- [Source Protection](SOURCE_PROTECTION.md)
- [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Originality Matrix](ORIGINALITY_MATRIX.md)

No unverified competition-placement claim is included.

## Privacy and Safety

The core has no telemetry, analytics, source upload, database, or required API key. Reports can still contain sensitive paths, plans, risks, and architecture details; users must review exports before sharing.

The Review Gate is local and unsigned. It is not enterprise identity verification. The Flight Recorder is mutable JSONL, not an immutable audit ledger. Details are in [Privacy and Security](PRIVACY_AND_SECURITY.md).

## Known Limitations

- Scanner and Context Trace results are heuristic.
- Control Tower does not prove code correctness or replace tests/review.
- The local gate does not authenticate or enforce the approver.
- Mistake Shield can miss novel phrasing or overmatch broad terms.
- Flight Recorder events depend on participating tools/agents.
- The dashboard cannot provide stronger evidence than its input report.
- Full Git ownership, cross-repository blast radius, signed evidence, and hosted team workflows are not implemented.
- This Build Week version is English-only; multilingual packs are future work.

Full list: [Limitations](LIMITATIONS.md).

## Future Roadmap

- Deeper reconciliation policies beyond the implemented five locked claims
- GitHub/GitLab PR/MR and CI adapters
- Stronger language-aware dependency and ownership mapping
- Structured command-evidence ingestion
- Signed/identity-backed review gates and evidence
- Team and cross-repository dashboards
- Multilingual packs beyond the current English-only Build Week product

These are future plans, not current claims.

## Submission Assets

- [README](../README.md)
- [Demo Script](DEMO_SCRIPT.md)
- [Judge Test Path](JUDGE_TEST_PATH.md)
- [Build Week Development Delta](BUILD_WEEK_DELTA.md)
- [User Validation](USER_VALIDATION.md)
- [Judging Map](JUDGING_MAP.md)
- [Codex Build Log](CODEX_BUILD_LOG.md)
- [Architecture](ARCHITECTURE.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
- [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Originality Matrix](ORIGINALITY_MATRIX.md)

## Submission Checklist

- [ ] Re-run the commands in the build log on the final commit.
- [ ] Confirm every PASS has current artifact/command evidence.
- [ ] Keep remaining WARN, FAIL, NOT_RUN, and SIMULATED labels visible.
- [ ] Verify the no-install GitHub Pages judge demo anonymously.
- [ ] Record the 2:45 video using the demo script.
- [ ] In the primary Codex build thread, run `/feedback` and paste the generated Session ID into the Devpost form; do not publish or invent it.
- [ ] Record real user validation only if permission-based sessions actually occurred.
- [ ] Capture dashboard screenshots with the simulated-data disclosure visible.
- [ ] Review exported files for private paths, secrets, or internal data.
- [ ] Recheck current dates, rules, tracks, and submission requirements on the official Devpost page.
- [ ] Add the final repository and video URLs only after they exist.
