# OpenAI Build Week Judging Map

This map uses the four criteria currently published on the official [OpenAI Build Week Devpost page](https://openai.devpost.com/): **Technological Implementation**, **Design**, **Potential Impact**, and **Quality of the Idea**. The official [Build Week FAQ](https://openai.com/build-week/#faq) describes strong submissions as thoughtful Codex/GPT-5.6 use with a clearly communicated problem, solution, and approach.

Competition details are time-sensitive. Recheck the official pages before submission.

## Judge-ready summary

| Criterion | One-sentence case | Fastest proof |
| --- | --- | --- |
| Technological Implementation | Codex helped build a non-trivial local developer tool: CLI, deterministic analysis engines, generated artifacts, tests, demo fixtures, and React dashboard. | Run the demo, inspect CLI output and generated Evidence Pack, then open the dashboard. |
| Design | One coherent flow moves from alignment and scan through context, approval, mission, evidence, and before/after handoff. | Follow the eight dashboard tabs and conditional Phase-0 card. |
| Potential Impact | Developers using coding agents need durable proof and continuity without uploading private repositories. | Show a risky proposed action, visible NOT_RUN gates, and the generated next mission. |
| Quality of the Idea | GPT-5.6 audits locked evidence claims while local code prevents it from replacing evidence state. | Run `npm run demo:codex` and inspect agreement, disagreement, preserved NOT_RUN, and provenance. |

## Technological Implementation

### What the official criterion asks

The criterion evaluates the depth and skill of GPT-5.6 use and whether the result reflects genuine effort as a working, non-trivial implementation.

### Codex Control Tower case

| Implemented capability | Technical evidence | What it demonstrates |
| --- | --- | --- |
| Command-line product | cli/index.js and cli/commands/ | A real command surface, argument parsing, error handling, read-only and generating workflows |
| Deterministic repository analysis | cli/lib/repoScanner.js and cli/lib/healthScorer.js | File inventory, governance detection, risk rules, evidence states, and inspectable weighted scoring |
| Explainable context | cli/lib/contextGraphBuilder.js | Local graph relationships and selected context with reason, relevance, freshness, importance, and protection |
| Codex-native mission generation | cli/lib/codexPromptBuilder.js | Repository state becomes an explicit next-Codex execution contract |
| Human decision and risk comparison | cli/lib/reviewGate.js and cli/lib/mistakeShield.js | Local gate states plus deterministic CLEAR/CAUTION/BLOCKED reasoning |
| Cross-session continuity | cli/lib/memoryLens.js and cli/lib/flightRecorder.js | Persistent rules/minefields plus typed JSONL events |
| Portable evidence | cli/lib/evidenceCollector.js | Markdown/JSON evidence, traceability, NOT_RUN, debt, graph, gate, memory, shield, recorder, and mission artifacts |
| Beginner alignment | cli/commands/phase0.js and core/en/ | One-question-at-a-time English alignment and non-interactive simulated mode |
| Product UI | apps/dashboard/ | Vite/React workbench with local report import, normalization, eight tabs, and conditional Phase-0 card |
| Reproducible demonstration | examples/messy-saas-before and examples/governed-saas-after | The same fictional codebase exposes meaningful before/after governance behavior |

### How Codex was used

Codex collaborated across requirements synthesis, read-only source research, CLI and engine implementation, fixtures/tests, dashboard, integration, verification, and competition documentation. The build-time agent workflow analysis was converted into concrete product features rather than remaining prose.

The deterministic scanner makes no AI API call, so judges can reproduce its score without credentials. The featured Build Week flow locks five claims, verifies ChatGPT authentication and the `gpt-5.6-sol` catalog entry, runs Codex read-only, rejects unsafe model output, reconciles only allowed citations, and updates the dashboard without replacing local states. Actual commands and outcomes are recorded in [Codex Build Log](CODEX_BUILD_LOG.md).

### Live judge proof

~~~bash
npm install
npm run demo
npm run dashboard
~~~

Then show:

- generated before/after local reports;
- Context Trace selection reasons;
- a BLOCKED/CAUTION Mistake Shield result;
- Review Gate state;
- generated Codex Mission Prompt;
- Evidence Pack with NOT_RUN entries;
- dashboard comparison.

### Honest boundary

The scanner is heuristic and does not prove semantic correctness. The fixture's two focused Node tests prove only their bounded cases. Root-suite, dashboard-build, and other final verification results must be read from the current build log; browser, load, deployment, and independent security checks remain NOT_RUN unless separately executed.

## Design

### What the official criterion asks

The criterion looks for a runnable, complete, coherent product experience rather than an isolated technical proof of concept.

### Coherent product journey

~~~text
plain-language Phase-0
        ↓
local repository scan
        ↓
health + risks + missing surfaces
        ↓
Context Trace + Memory Lens
        ↓
Mistake Shield + human Review Gate
        ↓
bounded Codex Mission Prompt
        ↓
Flight Recorder + Evidence Pack
        ↓
reviewable handoff + Before / After dashboard
~~~

### Design evidence

| Design choice | Product benefit | Visible proof |
| --- | --- | --- |
| One local vocabulary | Score, risk, scope, gate, evidence, memory, and next action stay consistent from CLI to dashboard | CLI output, generated files, dashboard labels |
| Progressive disclosure | Overview works in seconds; deeper tabs expose risk, context, evidence, memory, chronology, prevention, and comparison | Eight dashboard tabs |
| Honest status language | PASS, WARN, FAIL, NOT_RUN, and SIMULATED never collapse into one optimistic state | Evidence tab and generated reports |
| Explainable context | Context is not a mystery list; each selection has a reason and quality signals | Context Trace |
| Developer authority | The human decision remains visible and separate from Codex implementation | Review Gate panel |
| Beginner and expert paths | Phase-0 avoids jargon; CLI reports and artifact exports support deeper inspection | Phase-0 card plus JSON/Markdown |
| Local privacy | No account, hosted service, analytics, telemetry, source upload, or API key is required | Architecture/privacy docs and network-free core |
| Portable handoff | Reports remain inspectable without the UI | JSON, JSONL, and Markdown outputs |

### Demo design proof

The controlled InvoiceFlow Mini story is small enough to understand in 2:45 but realistic enough to surface auth/payment risk, weak tests, stale docs, evidence disagreement, and continuity gaps. The same simulated project moves from a 25/100 scan with 16 risks to 88/100 with one remaining risk, while omitted checks stay visible.

### Honest boundary

The dashboard does not create stronger proof than the report. Simulated labels must remain visible in every screenshot and video shot. The UI is a local workbench, not a hosted multi-user service.

## Potential Impact

### What the official criterion asks

The criterion tests whether the project makes a credible, specific case for a real problem and audience and whether the demonstrated solution addresses that problem.

### Audience

- Individual developers using Codex across multiple sessions
- Startup teams moving quickly with coding agents
- Maintainers accepting agent-assisted changes in brownfield repositories
- Technical leads who need an auditable handoff before review or release
- AI-agent workflow builders who need portable, local evidence contracts

### Problem-to-feature fit

| Real workflow problem | Control Tower response | Demonstrated outcome |
| --- | --- | --- |
| Mission lives only in chat | Phase-0 files and generated Mission Prompt | Next session receives a durable goal, risk, evidence, and forbidden scope |
| “Done” lacks proof | Evidence Pack and traceability | Claims are mapped to artifacts; missing execution remains NOT_RUN |
| Repository context is too broad | Context Graph/Trace and budget | Selected files/docs/plans/memory explain why they matter |
| Risky work proceeds implicitly | Mistake Shield and Review Gate | Destructive/high-risk proposals show reasons and wait for a visible decision |
| Lessons disappear between sessions | Memory Lens and Flight Recorder | Minefields, constraints, events, and next action remain local |
| Teams cannot see improvement | Health score and Before / After | Governance gaps and residual risk are legible without claiming code correctness |
| Private code should not be uploaded | Local deterministic core | Scan, score, reports, and dashboard run without an API key or source upload |

### Credibility of impact

The project does not claim user counts, customer deployments, productivity percentages, incident reduction, or production outcomes. The current evidence is a working local implementation and controlled simulated before/after fixture. The credible near-term impact is better reviewability and continuity for a developer who chooses to adopt the workflow.

### Honest boundary

Control Tower cannot force an external agent to obey the prompt, authenticate a reviewer, or replace repository permissions, tests, CI, security review, and domain expertise. Its impact is an explicit evidence and coordination layer.

## Quality of the Idea

### What the official criterion asks

The criterion considers whether the GPT-5.6 use is creative/non-obvious and whether the team understands the problem space.

### What is non-obvious

Most agent tooling optimizes generation. Codex Control Tower focuses on the **state around generation**:

- what Codex should know before acting;
- which files and lessons deserve limited context;
- what the developer has actually approved;
- what proof exists after acting;
- what did not run;
- what the next Codex session may safely do.

Codex helped analyze its own build workflow and turn those observations into product logic: Mission Prompt, Context Trace, Review Gate, Mistake Shield, Flight Recorder, Evidence Pack, Phase-0, and Before / After.

This is a Codex-generated build-time assessment—not an anthropomorphic claim.

### Codex-native originality

| Prior broad idea | New Codex Control Tower transformation |
| --- | --- |
| Governance rules | Computed local health and a generated next-Codex mission |
| Context/blast-radius thinking | Local repository Context Graph plus explainable mission Context Trace |
| Approval workflow | Honest local file gate surfaced directly in the mission and dashboard |
| Memory workbench | Memory Lens plus selected-context reasons and Flight Recorder continuity |
| Mistake prevention | Proposed-action comparison with gate/risk/minefield reasons and a safe rewrite |
| Evidence manifest | Generated evidence boundary, traceability, NOT_RUN gates, and black-box-style handoff |
| Before/after demo | Same fictional SaaS scanned as messy and governed, without donor/customer data |

The **Universal Agent OS family** is acknowledged and protected. Family code, UI, screenshots, and runtimes are not copied into this product. See [Source Protection](SOURCE_PROTECTION.md), [Feature Harvest](FEATURE_HARVEST.md), and [Originality Matrix](ORIGINALITY_MATRIX.md).

### Demonstrated understanding

The product explicitly distinguishes:

- presence from execution;
- edited from validated;
- local approval from identity verification;
- lexical context from semantic certainty;
- recorder history from immutable attestation;
- simulated demo proof from customer/production evidence;
- Codex implementation from developer authority.

Those distinctions are the core idea, not footnotes.

### Honest boundary

Real read-only GPT-5.6 Sol Evidence Reconciliation with locked states is implemented. Signed gates, PR/MR integration, team dashboards, and semantic code graphs remain roadmap work.

## 2:45 evidence path

| Time | Criterion emphasized | Proof |
| --- | --- | --- |
| 0:00–0:25 | Potential Impact / Quality of Idea | Missing-evidence problem and simulated InvoiceFlow Mini |
| 0:25–0:55 | Technological Implementation | Real local scan and low score |
| 0:55–1:25 | Design | Bounded mission and locked evidence claims |
| 1:25–2:15 | Technological Implementation / Quality of Idea | Real GPT-5.6 reconciliation, disagreement, and preserved NOT_RUN |
| 2:15–2:35 | Design / Impact | Human gate and governed Before / After |
| 2:35–2:45 | Potential Impact | Reviewable handoff and closing line |

Full narration: [Demo Script](DEMO_SCRIPT.md).

## Judge verification checklist

- [ ] CLI help lists the full command surface.
- [ ] Messy fixture scan reports 25/100 and visible governance/risk gaps.
- [ ] Governed fixture scan reports 88/100 and one remaining risk.
- [ ] Simulated label is visible.
- [ ] Context Trace explains selection.
- [ ] Review Gate states its local identity boundary.
- [ ] Mistake Shield gives reasons and a safer next action.
- [ ] Mission Prompt includes scope, evidence, tests, docs, statuses, and final response.
- [ ] Evidence Pack preserves NOT_RUN.
- [ ] Dashboard shows all eight tabs and conditional Phase-0 card.
- [ ] Build log names the actual final commands and outcomes.
- [ ] Lineage and limitations remain explicit.

## Related assets

- [README](../README.md)
- [Devpost Submission](DEVPOST_SUBMISSION.md)
- [Demo Script](DEMO_SCRIPT.md)
- [Architecture](ARCHITECTURE.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex Build Log](CODEX_BUILD_LOG.md)
