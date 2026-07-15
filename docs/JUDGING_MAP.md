# OpenAI Build Week Judging Map

The official [OpenAI Build Week page](https://openai.devpost.com/) and [rules](https://openai.devpost.com/rules) define a Stage One pass/fail screen followed by Stage Two judging across four equally weighted criteria: **Technological Implementation**, **Design**, **Potential Impact**, and **Quality of the Idea**. Competition details are time-sensitive; recheck the official pages immediately before submission.

## Stage One: eligibility and required story

| Requirement | Codex Control Tower response | Fast proof |
| --- | --- | --- |
| Fits the challenge and Developer Tools track | Working Codex-centered mission-control tool, not a prompt-only entry | [Judge: Start Here](../JUDGE_START_HERE.md), Pages, CLI |
| Real Codex/GPT-5.6 role | Codex built the product and visibly launches real `gpt-5.6-sol`; GPT-5.6 performs the blind semantic audit | First ten seconds of video, audit panel, `codex-review.js` |
| Under-three-minute public video | Target 2:52; spoken audio explains Codex, GPT-5.6, and human decisions | [Demo Script](DEMO_SCRIPT.md), Devpost video field |
| README explains acceleration, contributions, and human choices | Dedicated Build Week, architecture, authority, and provenance sections | [README](../README.md), [Build Log](CODEX_BUILD_LOG.md) |
| Developer-tool testing path | No-install Pages route plus reproducible local commands; no rebuild required for Pages inspection | [Judge Test Path](JUDGE_TEST_PATH.md) |
| Private feedback identity | Real Session ID from the primary build task, entered only in Devpost | Private form field; intentionally not public |

## Judge-ready summary

| Criterion | Case | Fastest evidence |
| --- | --- | --- |
| **Technological Implementation** | Codex helped build a non-trivial CLI/dashboard with deterministic analysis, real blind GPT-5.6 execution, strict validation, provenance, reconciliation, and adversarial tests. | Pages audit panel; `npm run verify`; `cli/commands/codex-review.js`; tests |
| **Design** | One coherent authority model connects mission, context, risk, human gate, locked facts, blind model judgment, reconciliation, and handoff. | Follow Overview → Audit → Evidence → Before/After |
| **Potential Impact** | Developers get durable review and continuity around agent-assisted changes without a mandatory hosted service. | Mission Prompt, Context Trace, NOT_RUN, Review Gate, Flight Recorder |
| **Quality of the Idea** | GPT-5.6 is an intentionally blind semantic challenger—not a generator, score owner, or rubber stamp—and conflict escalates to a human. | `MISSION_CHANGE_TEST_ALIGNMENT`, model/local separation, HUMAN REVIEW REQUIRED |

## 1. Technological Implementation

### Criterion interpretation

This criterion evaluates the depth and skill demonstrated in using Codex to build a working, non-trivial project. Meaningful GPT-5.6 use is also a required part of the overall submission story, but the technical criterion should not be mislabeled as only “depth of GPT-5.6 use.”

### Implementation evidence

| Capability | Evidence | Technical depth |
| --- | --- | --- |
| CLI product | `cli/index.js`, `cli/commands/` | Argument parsing, command boundaries, safe errors, read/generate workflows |
| Repository analysis | `cli/lib/repoScanner.js`, `healthScorer.js` | Bounded inventory, governance/risk rules, inspectable weighted score |
| Explainable context | `contextGraphBuilder.js` | Local relationships, selection reason, relevance, freshness, importance, protection |
| Codex mission contract | `codexPromptBuilder.js` | Allowed scope, forbidden actions, proof, tests, docs, stop/final-response rules |
| Human authority | `reviewGate.js`, `mistakeShield.js` | Scoped decision artifact and deterministic risk/minefield comparison |
| Continuity | `memoryLens.js`, `flightRecorder.js` | Persistent rules and typed JSONL session events |
| Evidence | `evidenceCollector.js` | Portable reports, traceability, NOT_RUN, debt, gate, memory, recorder, mission |
| Blind model input | `cli/commands/codex-review.js` | Neutral claims + bounded raw evidence; locked comparison targets withheld |
| Real model execution | `npm run demo:codex` | Signed-in ChatGPT, pinned Codex CLI, `gpt-5.6-sol`, medium reasoning, empty ephemeral read-only workspace |
| Fail-closed execution boundary | `codex-review.js`, `tests/test_codex_review.js` | User/project instructions, web, inherited environment, persistence, and approval disabled; every tool/unknown/failed/malformed event rejected |
| Strict output contract | `codex-review.js`, `tests/test_codex_review.js` | Exact claim coverage, enum/schema checks, status-injection rejection, allowed citation for decisive judgment, required counter/missing evidence |
| Authority-preserving reconciliation | Reconciliation record and dashboard | Separate verdicts, structural-precheck label, agreement/compatible/conflict relations, locked facts, human flag, full/included hashes, freshness/provenance |
| Product UI | `apps/dashboard/` | React/Vite workbench, report normalization, local import, static Pages exhibit |
| Reproducible fixtures | `examples/` | Controlled messy/governed comparison and bounded test output |

### How Codex accelerated the build

Codex collaborated on requirements synthesis, official-rule review, read-only lineage research, architecture, CLI/engine implementation, fixtures, tests, dashboard, integration diagnosis, deployment, documentation, and release verification. It used parallel bounded workstreams and converted discovered weaknesses into product requirements.

The most important corrections demonstrate genuine iteration. External review first revealed that the model prompt disclosed expected answer classes; a later red-team pass showed that a read-only target workspace could still permit unrelated reads. The final design withholds locked targets, runs from an empty temporary workspace with instruction/web/tool surfaces disabled, validates the event stream and evidence-bearing response fail-closed, and raises HUMAN REVIEW REQUIRED only after the model call.

The final recorded run validates this design with a non-decorative result: exact `gpt-5.6-sol` accepted zero tool events, produced 3 SUPPORTS / 3 CONTRADICTS, aligned on five evidence-state claims, and contradicted the mission-alignment structural precheck after tracing the missing durable-audit implementation and test proof. One conflict became HUMAN REVIEW REQUIRED; one NOT_RUN remained locked. The honest local/model fixture verdicts are both FAIL, while the invocation and safety contract completed successfully.

### Honest boundary

The deterministic scanner is heuristic. Two fixture tests prove only their bounded cases. GitHub Actions verifies the deterministic path, not the signed-in ChatGPT model step. Browser/load/provider/deployment/independent-security checks remain NOT_RUN unless a named artifact proves otherwise.

## 2. Design

### Coherent product journey

~~~text
plain-language Phase-0
        ↓
local scan + risks + Context Trace
        ↓
human Review Gate + bounded Codex Mission
        ↓
locked structural/execution facts
        ↓
blind GPT-5.6 semantic challenge
        ↓
local reconciliation + optional HUMAN REVIEW REQUIRED
        ↓
Flight Recorder + Evidence Pack + next safe handoff
~~~

### Design choices

| Choice | Benefit | Visible proof |
| --- | --- | --- |
| Two truth layers | Deterministic fact and semantic opinion stay distinguishable | Audit panel and record |
| Blind comparison target | Reduces answer-echoing without hiding the raw material under review | Prompt artifact and blind-input disclosure |
| Progressive disclosure | Overview works quickly; detail remains inspectable | Dashboard sections/tabs |
| Honest vocabulary | PASS, WARN, FAIL, NOT_RUN, SIMULATED, and HUMAN REVIEW REQUIRED do not collapse | Evidence + Audit |
| Human authority | Conflict becomes visible advice, compatible uncertainty stays distinct from agreement, and neither silently mutates facts | Review Gate and reconciliation relations |
| Portable artifacts | Evidence survives without the UI | JSON, JSONL, Markdown |
| Public/static plus local/live | Judges get instant access and a reproducible fresh-run route | Pages and local workbench |
| Explicit fictional/real split | Controlled sample remains useful without implying customer proof | Disclosure banners and docs |

The Devpost Pack Exporter is secondary. It packages evidence and handoff text; it is not the core product story.

## 3. Potential Impact

### Audience

- Developers using Codex across multiple sessions
- Fast-moving teams reviewing agent-assisted changes
- Maintainers working in brownfield repositories
- Technical leads who need bounded proof before release
- Agent-workflow builders who prefer portable local evidence

### Problem-to-feature map

| Workflow problem | Product response | Demonstrated value |
| --- | --- | --- |
| Mission exists only in chat | Phase-0 + Mission Prompt | Durable goal, scope, forbidden areas, proof, and next action |
| “Done” lacks evidence | Evidence Boundary + traceability | Named proof; missing execution remains NOT_RUN |
| Passing tests do not prove the mission | Blind semantic challenge | GPT-5.6 examines mission/change/test/evidence alignment |
| Context is too broad | Context Trace | Selected items explain why they matter |
| Risky work proceeds implicitly | Mistake Shield + Review Gate | Reasons, safer rewrite, visible human decision |
| Lessons vanish between sessions | Memory Lens + Flight Recorder | Minefields, constraints, events, and next action persist |
| Model confidence can overwrite nuance | Locked reconciliation | Model opinion cannot promote or erase local state |
| Private code should not require a new service | Local-first deterministic core | Scan/report/dashboard work without API key or telemetry |

The project does not claim customers, productivity percentages, incident reduction, or production deployment. Current impact evidence is a working product, reproducible controlled fixture, real model execution, and inspectable handoff—not market validation.

**CCT does not replace ESLint, CI, code review, or branch protection. It adds the evidence and handoff layer around agent-assisted work.**

## 4. Quality of the Idea

Most agent tools optimize generation. Control Tower focuses on the state around generation and uses GPT-5.6 as a constrained semantic adversary:

- deterministic code records execution and structural facts;
- GPT-5.6 judges whether the evidence semantically addresses the mission;
- local code validates and reconciles only after the answer returns;
- a conflict escalates to a human without changing truth;
- the developer retains the final gate.

### Controlled challenge

`MISSION_CHANGE_TEST_ALIGNMENT` is a repository-independent claim. In the fictional governed fixture, Phase-0 requires a durable local audit trail for rejected payments, but the bounded change/test evidence does not prove that full criterion. This gap is disclosed to judges, not to the model. The result is not forced and remains non-authoritative; the point is to expose whether GPT-5.6 adds semantic signal beyond “the test exited zero.”

### Originality and lineage

Codex Control Tower is inspired at concept level by the **Universal Agent OS family**, which was studied read-only and is not a runtime dependency or demo target. The independent transformation is the integrated bounded mission, context trace, human gate, evidence recorder, blind GPT-5.6 challenge, deterministic reconciliation, and dashboard.

See [Source Protection](SOURCE_PROTECTION.md), [Feature Harvest](FEATURE_HARVEST.md), and [Originality Matrix](ORIGINALITY_MATRIX.md).

## Video evidence path (2:52 target)

| Time | Main criterion | Proof |
| --- | --- | --- |
| 0:00–0:10 | Quality / Technology | Completed real GPT-5.6 result and authority boundary |
| 0:10–0:30 | Impact / Trust | Problem plus fictional-sample/real-execution disclosure |
| 0:30–0:48 | Technology | Reproducible prepared scan comparison |
| 0:48–1:08 | Design | Local READY, bounded mission, locked facts |
| 1:08–1:34 | Technology | Codex desktop launches real product command |
| 1:34–1:58 | Technology / Quality | Blind GPT-5.6 input and structured assessment |
| 1:58–2:28 | Quality | Controlled semantic challenge and human-review escalation |
| 2:28–2:52 | Design / Impact | Preserved NOT_RUN, human authority, concise close |

Full narration: [Demo Script](DEMO_SCRIPT.md).

## Judge verification checklist

- [ ] GPT-5.6's real role is visible in the first ten seconds.
- [ ] Codex desktop visibly launches `npm run demo:codex`.
- [ ] Exact model, pinned CLI, empty ephemeral read-only workspace, no-tool event policy, medium reasoning, and blind-comparison boundary are shown.
- [ ] Assessments use SUPPORTS / CONTRADICTS / INSUFFICIENT.
- [ ] Mission PASS is labeled a structural precheck; `COMPATIBLE` uncertainty is not shown as full agreement.
- [ ] The controlled challenge is disclosed without claiming a forced result.
- [ ] Any HUMAN REVIEW REQUIRED flag is advisory and tied to a claim.
- [ ] Locked local facts, verdict/action, and Review Gate remain separate.
- [ ] FICTIONAL SAMPLE PROJECT and REAL EXECUTION both remain visible.
- [ ] GPT-5.6 is not credited with `25 → 88`, scoring, fixture creation, or test execution.
- [ ] NOT_RUN remains visible.
- [ ] Build log identifies current verification, while old run IDs are labeled historical.
- [ ] Frozen tag, Pages, video, and private feedback field are checked before submission.

## Related assets

- [Judge: Start Here](../JUDGE_START_HERE.md)
- [Submission Manifest](SUBMISSION_MANIFEST.md)
- [README](../README.md)
- [Devpost Submission](DEVPOST_SUBMISSION.md)
- [Demo Script](DEMO_SCRIPT.md)
- [Architecture](ARCHITECTURE.md)
- [Codex Build Log](CODEX_BUILD_LOG.md)
