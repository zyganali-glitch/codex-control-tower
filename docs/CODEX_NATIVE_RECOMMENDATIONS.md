# Codex Build-Time Recommendations

These recommendations translate the [Codex-generated self-assessment](CODEX_SELF_ASSESSMENT.md) into Codex-native product behavior. They are an agent workflow analysis and implementation reflection, with no claim of consciousness, self-awareness, or sentience.

## Recommendation principles

1. Put continuation context in repository artifacts, not only in chat.
2. Keep developer authority explicit.
3. Treat evidence provenance as data.
4. Separate observed, executed, simulated, and unavailable states.
5. Generate the smallest safe next mission instead of making hidden autonomous changes.
6. Keep the default workflow local, deterministic, and inspectable.

## 1. What information should a future Codex session receive?

**Recommendation CNR-01 — Generate a Session Start Packet.**

The Mission Prompt should be paired with a machine-readable packet containing:

- mission, audience, success criteria, and non-goals;
- target/branch/commit/dirty state when available;
- allowed files, forbidden areas, and action authority;
- architecture/test/plan/evidence relationships selected by Context Trace;
- Review Gate and Mistake Shield state;
- durable memory, minefields, staleness, and contradictions;
- prior commands, outcomes, changed files, and docs-sync status;
- open risks, NOT_RUN gates, and next safe action.

**Implemented now:** Phase-0, scan report, Context Trace, mission prompt, gate/shield/memory/recorder/evidence fields cover the repository-local core.

**Future:** complete Git/diff state, concurrent-work detection, owners, and a single versioned start-packet schema.

## 2. Where should continuity loss be prevented?

**Recommendation CNR-02 — Add continuity checkpoints at every handoff.**

Control Tower should checkpoint:

| Boundary | Required record |
| --- | --- |
| Request → plan | Phase-0 goal, success, forbidden areas, risk, evidence |
| Plan → edit | Allowed files, Review Gate, selected context, non-goals |
| Edit → check | Changed files, exact commands, expected proof |
| Check → evidence | Exit status, bounded output, artifact paths, scope |
| Evidence → summary | Per-claim states, NOT_RUN, remaining risk |
| Session → next session | Flight Recorder digest and next safe mission |
| Scanner → dashboard | Versioned schema and compatibility validation |

**Implemented now:** local Phase-0/plan/gate/recorder/evidence artifacts and a dashboard normalization boundary.

**Future:** automatic checkpoints from Git/command execution and stale-report detection.

## 3. What proof should a developer require for “done”?

**Recommendation CNR-03 — Make completion claim-based, not message-based.**

Every acceptance criterion should have:

1. requirement identifier;
2. implementation path(s);
3. exact validating command or direct artifact observation;
4. result state and timestamp;
5. evidence path/provenance;
6. limitations and omitted cases;
7. reviewer/gate state where needed.

A final response should be generated from those records and include changed files, exact commands/results, review/shield state, remaining risks, and next safe action.

**Implemented now:** Traceability Matrix, Evidence Pack, evidence states, generated final-response contract.

**Future:** structured command-result ingestion, artifact hashes, rerun recipes, and automated diff-to-requirement coverage.

## 4. How should PASS, WARN, FAIL, NOT_RUN, and SIMULATED be represented?

**Recommendation CNR-04 — Attach scope and provenance to every status.**

Use:

- **PASS:** direct evidence supports the bounded claim.
- **WARN:** partial, heuristic, narrow, stale, or review-dependent evidence.
- **FAIL:** executed failure, missing mandatory surface, or contradicted requirement.
- **NOT_RUN:** no execution/result; include reason and owner/next action.
- **SIMULATED:** controlled fixture or demo; keep it separate from real local results.

Each status object should eventually include <code>claim</code>, <code>scope</code>, <code>source</code>, <code>command</code>, <code>exitCode</code>, <code>timestamp</code>, <code>artifact</code>, and <code>simulated</code>.

**Implemented now:** status vocabulary, evidence tables, fictional-sample/real-execution disclosure, visible NOT_RUN, deterministic local verdict/action, Blind GPT-5.6 model opinion/suggestion, evidence SHA-256/base-commit/bounded-worktree provenance, and freshness state.

**Implemented now:** reconciliation withholds locked claim-status fields/expected classes from the model, runs pinned Codex in an empty ephemeral workspace, rejects all tool/unknown/failed/malformed events, requires evidence-bearing decisive assessments, validates the richer provenance contract, marks stale evidence, preserves locked state, distinguishes compatible uncertainty from agreement, and raises advisory human review on policy conflict. Signed third-party attestation remains future work.

## 5. Which large-repository mistakes should the product anticipate?

**Recommendation CNR-05 — Expand Context Trace from inventory to change intelligence.**

Prioritize detection of:

- worktree overlap and uncommitted user changes;
- owner/reviewer uncertainty;
- generated files and source-of-truth counterparts;
- public API/schema/config compatibility;
- migrations and irreversible state changes;
- auth/payment/secrets/customer-data boundaries;
- test deletion or coverage reduction;
- stale plan, evidence, report, README, and architecture surfaces;
- cross-package, cross-repository, and runtime-only dependencies;
- conflicting instructions and memory;
- dependency/supply-chain changes;
- demo/real evidence leakage.

**Implemented now:** local file relationships, risk markers, large files, TODO/FIXME, weak tests, auth/payment heuristics, docs/governance gaps, and lexical mistake checks.

**Future:** language-aware adapters, Git ownership/overlap, generated-file mapping, package graph, and cross-repository integrations.

## 6. What should Control Tower record for the next session?

**Recommendation CNR-06 — Evolve Flight Recorder into a typed continuation ledger.**

Keep the inspectable JSONL format, but standardize event payloads:

| Event | Recommended fields |
| --- | --- |
| PROMPT / PLAN | mission ID, objective, allowed files, acceptance criteria |
| CHANGE | files, diff summary, reason, related requirement |
| TEST | exact command, cwd, environment, exit code, scope, output artifact |
| EVIDENCE | claim, state, path, provenance, timestamp |
| NOT_RUN | check, reason, impact, owner, next action |
| APPROVAL | gate scope, conditions, note, identity boundary |
| RISK / BLOCKED | severity, matched rule, affected files, safe rewrite |

Add a compaction summary that preserves open items instead of repeating the entire history.

**Implemented now:** typed JSONL events and dashboard timeline.

**Future:** automatic event capture, schema validation, hashes/signatures, retention/compaction, and CI/PR provenance.

## 7. What belongs in a Codex Mission Prompt?

**Recommendation CNR-07 — Treat the prompt as an executable contract for the next session.**

Required sections:

1. identity, target, and mission ID;
2. goal, acceptance criteria, and non-goals;
3. report boundary: REAL_LOCAL_SCAN or SIMULATED;
4. selected Context Trace with reasons;
5. risks, minefields, contradictions, and missing surfaces;
6. allowed files and forbidden/out-of-scope areas;
7. destructive, network, credential, dependency, and external-action rules;
8. Review Gate status/conditions and stop behavior;
9. checks to run and evidence expected;
10. docs/traceability/debt/recorder updates;
11. evidence-state rules;
12. final response structure and next safe action.

**Implemented now:** generated prompt covers target, risks, gaps, scope, forbidden actions, gate/shield, evidence, tests, docs, statuses, and response format.

**Future:** mission IDs, explicit non-goals, omitted-context reasons, token-budget enforcement, and machine-readable scope enforcement.

## 8. What should require human approval?

**Recommendation CNR-08 — Make high-consequence authority machine-readable.**

Require an APPROVED gate with bounded scope before:

- destructive filesystem or Git operations;
- auth, authorization, payments, billing, secrets, encryption, customer data, migrations, or retention changes;
- dependency additions/upgrades beyond an agreed policy;
- files outside the mission scope;
- test/evidence/control removal;
- external API calls, source upload, deployment, release, package publication, or PR/MR merge;
- accepting a critical risk or changing an evidence state by exception.

Gate approval should expire or be invalidated when scope, target, risk, or diff changes materially.

**Implemented now:** local gate states, note/timestamp, risky-action guidance, and Mistake Shield gate awareness.

**Future:** policy profiles, scope-diff invalidation, expiry enforcement, approver identity, signatures, and repository/CI enforcement.

## 9. How should the current product plan improve?

**Recommendation CNR-09 — Prioritize reliability of the evidence path over feature count.**

Recommended product-plan changes:

| Priority | Improvement | Acceptance signal |
| --- | --- | --- |
| P0 | Single versioned report schema | CLI, demo fixture, dashboard, evidence export, and tests validate the same schema |
| P0 | Deterministic demo contract | Fixture scan asserts expected score band/risk reduction and preserves SIMULATED labels |
| P0 | Evidence provenance validation | Unsupported PASS is rejected; test/CI presence alone remains NOT_RUN |
| P0 | Mission scope as structured data | Allowed/forbidden areas are parseable and shown in gate/prompt/dashboard |
| P1 | Git and concurrent-work context | Report names branch/commit/dirty/overlap state or explicitly says unavailable |
| P1 | Staleness and contradiction engine | Conflicting/latest instructions and stale generated reports raise visible findings |
| P1 | Safer output boundary | Target mutation and output-directory writes are separately previewed |
| P1 | English Phase-0 schema tests | English-only Phase-0 fields round-trip correctly and remain aligned with the judging UI |
| P2 | Stronger context adapters | Language/package/ownership signals augment, never hide, heuristic output |
| P2 | Signed/team evidence mode | Approval and evidence can be identity-backed without weakening local mode |

This build intentionally avoids adding a cloud service or hidden model dependency to solve these items.

## 10. What is implemented now, and what remains future work?

**Recommendation CNR-10 — Publish a capability ledger.**

### Implemented now

- Node.js CLI command router and local-first deterministic scanner
- Governance health score and ranked doctor output
- English-only Phase-0 alignment with a fictional sample mode
- Codex Mission Prompt Generator
- local Context Graph and dashboard Context Trace
- local Review Gate states and notes
- deterministic Mistake Shield
- Memory Lens and metrics
- JSONL Flight Recorder
- Evidence Pack and Devpost Pack exporters
- PASS/WARN/FAIL/NOT_RUN/SIMULATED boundary
- Vite/React dashboard with Overview, Risks, Context Trace, Evidence, Memory Lens, Flight Recorder, Mistake Shield, Before / After, and conditional Phase-0 card
- controlled InvoiceFlow Mini before/after fixtures
- real Blind GPT-5.6 Semantic Audit with empty-workspace isolation, fail-closed no-tool validation, structural-precheck/compatible/conflict reconciliation, and locked local authority

### Future work

- automatic Git diff/branch/commit/overlap and owner capture
- executed-command provenance and log ingestion
- a strict shared report-schema validator and migration framework
- language-aware semantic dependency/blast-radius adapters
- signed/tamper-evident evidence and identity-backed gate enforcement
- CI and PR/MR integration
- team/cross-repository continuity
- additional semantic-challenge claim packs beyond the implemented read-only GPT-5.6 flow
- full multilingual product packs beyond the English-only Build Week product

### Deliberately not claimed

- guaranteed correctness, security, compliance, or production readiness
- enterprise identity verification
- tamper-proof recording
- complete semantic blast radius
- real customer outcomes
- live provider/payment/auth verification in the demo
- hidden model, hosting, or platform integration

## Recommended next product mission

Make the report and evidence contract the single source of truth:

> Version and validate one shared report schema across scanner, demo, dashboard, Evidence Pack, and tests; require provenance for PASS; preserve NOT_RUN and SIMULATED during every transformation.

That mission has the highest leverage because every later integration depends on a reliable claim boundary.

## Related reading

- [README](../README.md)
- [Codex-Generated Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Architecture](ARCHITECTURE.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Limitations](LIMITATIONS.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Originality Matrix](ORIGINALITY_MATRIX.md)
