# Architecture

Codex Control Tower is a local-first Node.js CLI plus a Vite/React report dashboard. The core path is deterministic: it reads a target repository, derives a report from visible files and rules, and writes portable JSON/Markdown only when the user selects a generating command.

It does not require an OpenAI API key, a database, a hosted service, a donor repository, or a competition-source repository.

## System view

~~~text
                         read-only analysis
target repository ------------------------------------------+
      |                                                     |
      v                                                     |
cli/index.js -> command -> repoScanner -> healthScorer       |
                         |       |                           |
                         |       +-> readiness + breakdown   |
                         +-> contextGraphBuilder              |
                         +-> memoryLens -> mistakeShield      |
                         +-> reviewGate + flightRecorder      |
                         +-> codexPromptBuilder               |
                                  |                          |
                                  v                          |
                         CONTROL_TOWER_REPORT.json <---------+
                                  |
             +--------------------+---------------------+
             |                                          |
             v                                          v
     Evidence/Devpost packs                    Vite + React dashboard
      Markdown + JSON                         local report visualization
~~~

## Runtime components

| Component | Implementation | Responsibility | Boundary |
| --- | --- | --- | --- |
| CLI command router | cli/index.js | Parse command/flag pairs, show help, dispatch to a command module, surface useful errors. | No repository analysis is embedded in the router. |
| Command layer | cli/commands/ | Validate command-specific arguments, call a library, print a concise result, and choose an output destination. | Commands do not claim tests ran unless they receive execution evidence. |
| Safe filesystem layer | cli/lib/safeFs.js | Resolve targets, reject paths outside a declared root for target-relative writes, skip heavy/generated directories, preserve existing files, and confine demo resets. | Path checks reduce accidental writes; they are not an OS sandbox. |
| Repository scanner | cli/lib/repoScanner.js | Inventory files, detect governance surfaces, tests/CI, TODO/FIXME and large-file signals, stale README state, and risky auth/payment patterns. | Static and heuristic; it does not execute application code. |
| Health scorer | cli/lib/healthScorer.js | Convert detected facts into an inspectable score out of 100 and PASS/WARN/FAIL readiness. | Product-defined weighting, not a certification or correctness probability. |
| Context Graph builder | cli/lib/contextGraphBuilder.js | Classify files, create local relationships, attach risk/selection metadata, and assemble a bounded context selection. | Local structural approximation, not a semantic whole-program graph or GitLab Orbit. |
| Mission Prompt builder | cli/lib/codexPromptBuilder.js | Turn scan state into an explicit Codex mission: risks, gaps, allowed scope, forbidden actions, evidence, tests, docs, gate state, and response contract. | Generates a prompt; it does not execute or enforce the mission. |
| Review Gate | cli/lib/reviewGate.js | Persist AWAITING_HUMAN, APPROVED, REJECTED, or BLOCKED with scope, allowed files, forbidden actions, note, and timestamp. | Local unsigned JSON; identity is not verified, and incomplete scope cannot authorize risky work. |
| Mistake Shield | cli/lib/mistakeShield.js | Compare proposed text with destructive verbs, high-risk areas, Review Gate state, detected risks, and remembered minefields. | Deterministic lexical matching; CLEAR is not a safety guarantee. |
| Memory Lens | cli/lib/memoryLens.js | Read known memory/lesson surfaces and report durable rules, risks, architecture, environment, preferences, staleness, and missing sources. | Quality is limited by the repository's recorded memory. |
| Flight Recorder | cli/lib/flightRecorder.js | Append and read local JSONL events for prompts, plans, changes, tests, evidence, skipped checks, approvals, risks, and blocks. | Mutable local history, not a tamper-evident ledger. |
| Evidence collector | cli/lib/evidenceCollector.js | Export evidence, traceability, NOT_RUN, debt, prompt, graph, gate, memory, shield, recorder, Devpost summary, and the machine report. | Artifact presence can be PASS; unexecuted target tests/CI stay NOT_RUN. |
| Dashboard | apps/dashboard/ | Normalize and render a local report across eight workbench tabs; allow local JSON load/export. | A visualization of report evidence, not additional verification. |

## Command and write model

Commands are deliberately separated by mutation level.

| Command | Reads target | Writes target | Writes chosen output |
| --- | ---: | ---: | ---: |
| health, doctor | Yes | No | No |
| scan | Yes | No | Optional JSON file |
| context-graph | Yes | No | Optional JSON file |
| memory-lens | Yes | No | Optional JSON file |
| mistake-shield | Yes | No | No |
| init | Yes | Minimal governance files only | No |
| phase0 | Yes | .controltower/phase0.json and plans/PHASE0_ALIGNMENT.md only | No |
| review-gate | Yes | .controltower/review-gate.json | No |
| flight-recorder | Yes | .controltower/flight-recorder.jsonl | No |
| evidence | Yes | No, unless output is inside target by user choice | Evidence directory |
| export-devpost | Yes | No, unless output is inside target by user choice | Devpost directory |
| demo | Controlled fixtures only | examples/demo-workspace and generated reports | Dashboard sample report |

The <code>init</code> command preserves an existing README and existing governance documents. New required files are created only when absent. A replaced Control Tower configuration is backed up under <code>.controltower-backups/&lt;timestamp&gt;/</code>. Demo reset logic refuses to delete any directory whose basename is not <code>demo-workspace</code>.

## Scan pipeline

1. **Resolve target.** Confirm the path exists and is a directory.
2. **Inventory safely.** Walk regular files; skip symlinks, <code>.git</code>, dependencies, build output, coverage, and Control Tower backups.
3. **Read bounded text surfaces.** Analyze supported text files up to the scanner's size threshold; collect metadata for every detected file.
4. **Derive facts.** Detect instructions, config, plan, evidence, traceability, NOT_RUN, debt, memory, shield, architecture, Phase-0, tests, CI, and review/recorder surfaces.
5. **Raise risk flags.** Apply explicit rules for missing governance, weak proof, TODO/FIXME, large files, stale README, and suspicious auth/payment patterns.
6. **Build continuity context.** Construct graph nodes/edges, selected Context Trace items, Memory Lens findings, Review Gate state, and Flight Recorder events.
7. **Evaluate the proposed action.** Mistake Shield emits CLEAR, CAUTION, or BLOCKED plus reasons and a safer next action.
8. **Score and prompt.** Health Scorer computes category contributions; Mission Prompt Builder converts the full state into the next bounded Codex mission.
9. **Return the report.** The caller prints it, writes JSON, exports a pack, or feeds the dashboard.

## Health model

The score totals 100 points:

| Category | Maximum |
| --- | ---: |
| Planning surfaces | 12 |
| Codex readiness | 12 |
| Evidence pack | 16 |
| Test/CI proof | 12 |
| Documentation sync | 8 |
| Brownfield safety | 8 |
| Memory/handoff continuity | 10 |
| Review Gate | 8 |
| Context Graph | 6 |
| Mistake Shield | 5 |
| Risk hygiene | 3 |

The score is a prioritization signal. Evidence states carry more meaning than the aggregate:

- **PASS** — the declared check has named supporting evidence.
- **WARN** — partial or ambiguous support needs review.
- **FAIL** — a required surface or proof is missing or contradicted.
- **NOT_RUN** — an executable or external check did not run.
- **SIMULATED** — a controlled demo artifact, actor, event, or result.

## Report contract

The scanner's machine report includes:

- project and target identity, generation time, and REAL_LOCAL_SCAN/SIMULATED boundary;
- aggregate score, category breakdown, and Codex readiness;
- missing surfaces, risk flags, detected files, and suggested next actions;
- generated Codex Mission Prompt and traceability rows;
- evidence status;
- Context Graph/Trace;
- Review Gate, Memory Lens, Mistake Shield, Phase-0, and Flight Recorder state.

The dashboard has a normalization boundary so generated CLI reports and the richer bundled demo report can feed the same views. Full-detail cards require the corresponding report fields; absent optional fields render as unavailable rather than becoming fabricated proof.

## Phase-0 alignment

Phase-0 is intentionally separate from implementation:

~~~bash
cct phase0 --target . --locale en|tr
~~~

The command asks eight plain-language questions one at a time and writes only:

- <code>.controltower/phase0.json</code>
- <code>plans/PHASE0_ALIGNMENT.md</code>

It then embeds goal, audience, success criteria, forbidden areas, the largest risk, expected evidence, workflow profile, and the next safe mission into a first Codex Mission Prompt. Demo mode uses predefined InvoiceFlow Mini answers and labels them SIMULATED.

## Dashboard information architecture

The dashboard is a local report workbench with eight tabs:

1. Overview
2. Risks
3. Context Trace
4. Evidence
5. Memory Lens
6. Flight Recorder
7. Mistake Shield
8. Before / After

When Phase-0 data exists, Overview also renders a conditional Phase-0 Alignment Card. The report is imported from <code>apps/dashboard/src/sample-report.json</code> for the bundled demo. A user may select a local JSON file in the browser; the UI reads it locally and does not upload it.

## Local-first and network model

Core code makes no OpenAI, Qwen, GitLab, UiPath, telemetry, analytics, database, or upload call. Dependency installation can require network access; after dependencies are present, scanning/reporting does not.

An optional OpenAI-assisted review mode is roadmap work. If added, it must be explicitly enabled, disclose exactly which content leaves the machine, keep remote evidence separate from deterministic local results, and never silently change NOT_RUN to PASS.

## Safety and trust boundaries

- Generated Markdown/JSON may contain sensitive filenames, paths, plans, risks, and architecture. The user must review exports before sharing.
- Review Gate and Flight Recorder files can be changed by any process with filesystem write access.
- A generated mission prompt cannot force another agent to follow it; repository permissions, branch protection, CI, and human review remain necessary.
- Scanner and Mistake Shield rules may miss semantic defects, generated behavior, reflection, external dependencies, or novel phrasing.
- Protected source repositories were read-only research inputs. They are not runtime dependencies, scan targets, demo targets, or write destinations.

## Design rationale and related evidence

- [README](../README.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Privacy and Security](PRIVACY_AND_SECURITY.md)
- [Honest Limitations](LIMITATIONS.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
