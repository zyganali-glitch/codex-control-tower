# Originality Matrix

Codex Control Tower acknowledges its lineage while making a different product bet: turn the state of a local repository into an explainable, bounded mission for the next Codex run, then preserve the evidence and review state needed for the next handoff. It is not a renamed Universal Agent OS distribution and does not depend on any protected source at runtime.

| Prior concept | Why it mattered | What is new in Codex Control Tower | Why it fits OpenAI Build Week |
| ------------- | --------------- | ---------------------------------- | ----------------------------- |
| Phase-0 interview discipline | Early alignment reduces premature implementation and hidden assumptions. | A lightweight `cct phase0 --locale en|tr` produces a machine-readable alignment file, Markdown contract, and first Codex Mission Prompt without writing implementation code. | It makes human/Codex collaboration visible and beginner-accessible. |
| Plan before code | A durable plan prevents scope drift between agent sessions. | The scanner converts observed repo gaps into an executable next-mission contract: allowed files, forbidden actions, evidence, tests, docs, risks, and final-response format. | It demonstrates a Codex-native workflow rather than a passive policy document. |
| Evidence-first closure | A confident summary is not proof that checks ran. | Evidence Pack, Black Box report, traceability, tech-debt delta, and persistent `NOT_RUN` states form one local handoff package. | It strengthens technological implementation and makes the demo auditable. |
| Universal memory pillars | Architecture, mistakes, preferences, and environment knowledge should survive a session. | Memory Lens discovers and scores local project-memory surfaces, flags stale/missing context, and feeds only relevant items into the next mission. | It addresses a specific continuity problem for AI-assisted development. |
| UiPath human approval | Risky automation should pause for a developer decision. | Review Gate is a transparent local JSON/Markdown state machine integrated with mission generation and the dashboard. Its unsigned, file-based limit is explicit. | It creates a runnable human/Codex side-by-side decision point without cloud setup. |
| UiPath real/mock boundary | Demo convenience must not masquerade as production evidence. | One evidence vocabulary (`PASS`, `WARN`, `FAIL`, `NOT_RUN`, `SIMULATED`) is carried through reports, dashboard, demo data, and export. | Judges can distinguish observed behavior from simulated narrative immediately. |
| GitLab Orbit/context graph | Agents need context and impact signals before acting. | Context Graph is built locally from files, plans, tests, docs, CI, markers, risk areas, and ownership hints; Context Trace explains why items were selected for Codex. | It is a non-trivial, runnable developer tool with no external account requirement. |
| GitLab blast-radius thinking | Overlapping work and downstream impact can make a locally small edit risky. | A deterministic local approximation correlates risky files, open plans, tests, docs, owners, and TODO/FIXME markers and labels uncertainty. | It makes risk concrete in the three-minute before/after experience. |
| GitLab reviewable artifacts | Agent work should remain inspectable in normal developer workflows. | Flight Recorder, Review Gate, reports, and prompts are plain local JSON/JSONL/Markdown artifacts, not hidden model state. | The repository itself becomes evidence of the collaboration workflow. |
| Qwen explainable recall | Selected context is more trustworthy when users can see why it was chosen. | Context Trace and Mission Context Budget explain selected and omitted repo context using deterministic structural/lexical signals—no fake embeddings. | It provides product-quality UX around Codex context preparation. |
| Qwen timeline and analytics | Cross-session history needs more than one summary blob. | Flight Recorder Timeline records mission, command, check, approval, risk, and evidence events; Memory Lens reports continuity gaps. | It makes Codex-assisted changes reviewable across sessions. |
| Qwen mistake prevention | Known project lessons should affect a proposed action before execution. | Mistake Shield evaluates an explicit action against local minefield lessons and returns a reasoned `CLEAR`, `CAUTION`, or `BLOCKED` plus a safer next action. | It converts project memory into a clear developer decision surface. |
| Qwen baseline comparison | A visible baseline makes the value of memory easier to judge. | Before/After compares governance state for controlled, clearly simulated InvoiceFlow Mini repositories; it does not claim an LLM-quality benchmark. | It gives judges an immediate, coherent product story grounded in reproducible local artifacts. |
| Competition evidence manifests | Claims are easier to review when proof is linked. | Devpost Pack Exporter derives submission narrative, judging map, demo checklist, commands, limitations, and evidence map from Control Tower outputs. | It directly supports a complete competition submission while remaining useful outside the event. |

## Codex-native product test

The product is distinct only if all of these remain true:

1. **Codex is the explicit next-action target.** The central output is a bounded Codex Mission Prompt, not a universal rules bundle.
2. **Repository state is computed.** Scanner, scorer, Context Graph, and risk checks create new local analysis instead of installing donor prose.
3. **The developer remains the decision-maker.** Review Gate and Mistake Shield expose reasons and safe next actions; they do not silently authorize execution.
4. **The handoff is durable.** Flight Recorder and Evidence Pack preserve what actually happened and what did not run.
5. **The experience is runnable without donor or cloud services.** No source repository, UiPath tenant, GitLab token, Qwen endpoint, OpenAI API key, telemetry service, or database is required for the core demo.
6. **The demo is independent.** InvoiceFlow Mini is purpose-built, controlled, and visibly marked as simulated.

## Originality guardrails

- Write code, report schemas, UI components, tests, examples, and narrative from scratch for Codex Control Tower.
- Use protected-source URLs and short factual labels only for attribution/research.
- Do not import or imitate donor file trees where they do not serve the new product architecture.
- Do not copy protected frontend styling, screenshots, algorithms, sample data, cloud endpoints, or competition language into the active product.
- Do not call local analysis “Orbit,” local rules “Qwen recall,” or the file gate “UiPath approval.”
- Treat a permissive source license as a legal condition, not as proof of product originality.
- Preserve uncertainty: a local heuristic is not a dependency graph, a file approval is not verified identity, and a simulated score is not customer evidence.

## Build Week alignment

The official [OpenAI Build Week](https://openai.com/build-week/) and [Devpost challenge](https://openai.devpost.com/) pages emphasize projects built with Codex and evaluate technological implementation, design, potential impact, and quality of idea. Codex Control Tower addresses those dimensions with a working local analyzer, a coherent before/after dashboard, a specific audience of Codex-assisted development teams, and an original mission/evidence/handoff loop.

No source-repository competition placement is used as evidence for this entry.

## Related reading

- [README](../README.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
