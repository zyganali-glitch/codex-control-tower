# Feature Harvest

Codex Control Tower uses the Universal Agent OS family as attributed concept research, not as an implementation base. “Borrowed idea” below means an idea studied and independently re-specified; it does **not** mean source code, UI, templates, screenshots, or assets were copied. See [Source Protection](SOURCE_PROTECTION.md) and the detailed [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md).

Status meanings in this document:

- **YES** — included in the current product scope and must be backed by the linked local surface/tests.
- **PARTIAL** — a deliberately narrower deterministic version is included; the excluded behavior is named.
- **FUTURE** — not claimed as implemented; it remains roadmap work.

## Harvest matrix

| Source | Borrowed idea | Codex Control Tower transformation | Implemented now? | Evidence |
| ------ | ------------- | ---------------------------------- | ---------------- | -------- |
| [Universal Agent OS](https://github.com/zyganali-glitch/Universal-Agent-OS) | Beginner Phase-0, one question at a time | `cct phase0 --target <dir> --locale en|tr` writes only the alignment contract and first bounded Codex mission; demo answers are visibly simulated. | **YES** | `cli` Phase-0 command; `.controltower/phase0.json`; `plans/PHASE0_ALIGNMENT.md`; Phase-0 tests and dashboard card |
| Universal Agent OS | Plan before code | Repository findings become a next-mission prompt with allowed scope, forbidden actions, required evidence, tests, docs, and `NOT_RUN` reporting. | **YES** | Codex prompt builder, scan report, Mission Prompt panel, plan template |
| Universal Agent OS | Evidence-first closure | The evidence pack separates a completion narrative from observed checks and preserves missing gates. | **YES** | Evidence command/collector; evidence report, traceability, tech-debt delta, and `NOT_RUN` outputs |
| Universal Agent OS | Honesty boundary | Normalize checks to `PASS`, `WARN`, `FAIL`, `NOT_RUN`, or `SIMULATED`; editing never implies validation. | **YES** | Report schema, dashboard Evidence view, demo data labels, tests |
| Universal Agent OS | Four collective-memory documents | Memory Lens discovers local minefield lessons, architecture rules, environment constraints, preferences, and stale/missing memory. | **PARTIAL** — deterministic document discovery, not an autonomous memory service | Memory Lens command/library, templates, dashboard Memory Lens view |
| Universal Agent OS | Brownfield quarantine, anti-monolith and TODO/FIXME warnings | Scan an existing repository without overwriting it; flag large/risky files and markers as context and risk signals. | **YES** | Safe filesystem layer, repository scanner, risk rules, Context Trace |
| Universal Agent OS | Governance profiles | `solo`, `startup`, `enterprise`, and `regulated` are recorded in installed configuration while preserving one report schema. Profile-specific thresholds are deferred. | **PARTIAL** | Init/config profile handling; shared deterministic scoring in this release |
| Universal Agent OS | English/Turkish locale packs | Keep the judge-facing README/dashboard in English while supporting the explicitly requested Phase-0 questions in English and Turkish. | **PARTIAL** — bilingual Phase-0 only, not full UI localization | Phase-0 question templates and locale tests |
| Universal Agent OS | Agent adapters | Generate a Codex-specific `.codex/AGENTS.md`; keep other adapters secondary and clearly separated from core runtime. | **YES** for Codex adapter | `core/adapters/codex/AGENTS.md`, init command, generated governed demo |
| [UiPath edition](https://github.com/zyganali-glitch/universal-agent-os-uipath) | Real/mock disclosure | Replace platform mode claims with evidence-state provenance: simulated demo values remain `SIMULATED`, unavailable checks remain `NOT_RUN`. | **YES** | Evidence Boundary report, sample report labels, demo artifacts |
| UiPath edition | Human approval with explicit states | Local Review Gate uses `AWAITING_HUMAN`, `APPROVED`, `REJECTED`, and `BLOCKED` and never silently unlocks work. | **YES** | Review-gate command/library, `.controltower/review-gate.json`, dashboard panel, tests |
| UiPath edition | API-backed approval rather than trusting chat | Treat the gate file—not a conversational claim—as the local source of truth. Do **not** present this as enterprise identity verification. | **PARTIAL** — file-backed local state, unsigned | Review-gate status command and [limitations](LIMITATIONS.md) |
| UiPath edition | Claim-to-evidence manifest | Export a local evidence pack that maps claim, status, proof path, and notes. | **YES** | Evidence pack generator and report templates/tests |
| UiPath edition | Beginner begins with one plain sentence | Phase-0 avoids architecture jargon and persists each answer before creating a mission. | **YES** | English/Turkish question templates; demo Phase-0 fixture |
| [GitLab edition](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition) | “True context” and graph-oriented reasoning | Build a local Context Graph and present an explainable Context Trace over files, plans, tests, docs, CI, risks, owners, and markers. | **YES** | Context-graph command/builder, dashboard Context Trace, tests |
| GitLab edition | Blast-radius and overlapping-work thinking | Approximate local impact with deterministic references, touched plans, ownership hints, risky areas, and overlapping TODO/FIXME markers. | **PARTIAL** — local heuristic, not GitLab Orbit or a full semantic graph | Context Graph risk edges and scanner findings; [limitations](LIMITATIONS.md) |
| GitLab edition | Reviewable generated artifacts | Mission, gate, recorder, evidence, and report remain inspectable local JSON/Markdown files. | **YES** | `.controltower/`, evidence-pack output, `CONTROL_TOWER_REPORT.json` |
| GitLab edition | Refuse to fake unavailable tools/results | A missing or unexecuted signal becomes `NOT_RUN`; no remote CI, MR, security, or ownership result is invented. | **YES** | Status model, `NOT_RUN_GATES.md`, evidence tests |
| GitLab edition | Chaptered proof-oriented demo | Use a three-minute InvoiceFlow Mini before/after walkthrough with each visible claim tied to a local artifact. | **YES** | `docs/DEMO_SCRIPT.md`, controlled examples, demo report |
| [Qwen edition](https://gitlab.com/zyganali/universal-agent-os-qwen) | Explainable recall trace | Context Trace shows selected repository items, why each was selected, relevance, freshness, importance, and protection where known. | **PARTIAL** — deterministic lexical/structural signals, no embeddings | Context Graph/Trace report schema and dashboard view |
| Qwen edition | Context budget | Bound the next Codex mission’s context and show selected versus omitted items rather than dumping the repository. | **YES** | Mission prompt builder, context-budget report/panel |
| Qwen edition | Memory timeline | Reframe memory events as a Codex Flight Recorder Timeline for prompts, plans, changes, tests, evidence, approvals, risks, and `NOT_RUN`. | **YES** | Flight-recorder command/library, JSONL file, dashboard timeline |
| Qwen edition | Memory analytics | Reframe counts/freshness/protection as Memory Lens Metrics over local project memory surfaces. | **PARTIAL** — local document metrics only | Memory Lens report and dashboard metrics |
| Qwen edition | Mistake-prevention verdict | Mistake Shield compares a proposed action with minefield lessons and returns `CLEAR`, `CAUTION`, or `BLOCKED`, with reasons and a safer next step. | **YES** | Mistake-shield command/library, dashboard view, tests |
| Qwen edition | Stateless versus memory-assisted baseline | Compare messy and governed InvoiceFlow Mini repositories as a Before/After governance view. | **YES** — governance comparison, not model-quality benchmark | Demo reports and Before/After dashboard tab |
| Qwen edition | Honesty report | Evidence Boundary separates planned, implemented, verified, simulated, and `NOT_RUN` claims. | **YES** | Evidence report schema and dashboard Evidence view |
| Qwen edition | Confidence gating, duplicate and cross-pillar consistency | Use deterministic warnings for ambiguous/duplicate memory; do not claim semantic confidence without a model. | **PARTIAL** | Memory Lens warnings; no embedding or “AI confidence” claim |
| Qwen edition | MCP and multi-agent shared memory | Keep as optional future interoperability after the local single-repository contract is stable. | **FUTURE** | [Product Decisions](PRODUCT_DECISIONS.md) and [Limitations](LIMITATIONS.md) |

## Qwen workbench-to-dashboard mapping

The Qwen edition's public workbench was especially useful as information-design research. The mapping below is conceptual; its HTML/CSS/JavaScript, Python implementation, data, and screenshots were not copied.

| Qwen workbench concept | Codex Control Tower surface | Codex-specific data shown | Boundary |
| --- | --- | --- | --- |
| Tabbed inspector | Overview, Risks, Context Trace, Evidence, Memory Lens, Flight Recorder, Mistake Shield, Before/After | Repository governance and next-action data | New React information architecture, not a visual clone |
| Recall Trace | **Codex Context Trace** | Selected files/docs/plans/tests, reason, relevance, freshness, importance, protection | Local deterministic selection; no Qwen or embeddings |
| Context budget | **Codex Mission Context Budget** | Selected/omitted mission context and capacity use | A prompt-scope control, not token billing or model introspection |
| Memory Timeline | **Codex Flight Recorder Timeline** | Prompts, plans, changes, commands, checks, approvals, evidence, risks | Local JSONL event record; not a Qwen conversation history |
| Memory Analytics | **Memory Lens Metrics** | Found/missing/stale memory surfaces and protected lessons | Heuristic document metadata, not semantic analytics |
| Mistake Prevention | **Codex Mistake Shield** | Proposed action, verdict, matching minefield rules, safer action | Explainable local rule/lexical check |
| Baseline | **Before/After Governance Comparison** | Score, risks, missing surfaces, and evidence delta | Simulated InvoiceFlow Mini governance demo, not an LLM benchmark |
| Honesty report | **Evidence Boundary** | Planned, implemented, verified, simulated, and `NOT_RUN` | Proof-status view; no deployment claim inferred |
| Phase-0 status | **Phase-0 Alignment Card** | Goal, audience, success criteria, forbidden areas, evidence, next mission | English/Turkish input; main dashboard copy remains English |
| Export/import controls | **Evidence/Devpost export controls** | Local reports and competition materials | Export only; no remote upload |

## Explicitly not harvested

- No UiPath, GitLab Orbit/Duo, Qwen, Alibaba Cloud, or donor runtime dependency.
- No source repository code, templates, frontend, screenshots, test data, cloud endpoint, or credentials.
- No fake embeddings, remote graph results, deployment proof, enterprise authorization, or competition award claim.
- No use of a protected repository as a demo target.

## Related reading

- [README](../README.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md)
- [Originality Matrix](ORIGINALITY_MATRIX.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
