# Product Decisions

This document records the build-time decisions that keep Codex Control Tower small, runnable, honest, and distinct. Decisions apply to the current Build Week version unless marked future work.

## Decision summary

| ID | Decision | Why | Trade-off / boundary |
| --- | --- | --- | --- |
| PD-01 | Local-first core | Repository analysis can involve private source and should not require an upload, account, token, or network round trip. A local demo is reproducible for judges and useful after the competition. | No shared team service, hosted history, or automatic PR/MR synchronization in this version. |
| PD-02 | Deterministic scanning and scoring | The same structural inputs produce the same findings and score; timestamps and freshness metadata can change. Users can inspect which surfaces and weights affected the score. | Heuristics can miss semantic bugs and can produce false positives; the score is not a security certification. |
| PD-03 | Generate Codex missions instead of making hidden autonomous changes | A visible mission makes scope, allowed files, forbidden actions, tests, evidence, docs, and final response expectations reviewable before Codex acts. | Control Tower prepares and records work; it is not an autonomous execution engine. |
| PD-04 | Evidence states are first-class | `PASS`, `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` prevent missing proof from being flattened into “done.” | Users see unresolved work instead of a single optimistic status. |
| PD-05 | Use a local Review Gate | A JSON/Markdown gate is portable, inspectable, offline, and sufficient to demonstrate an explicit developer decision point. | It is unsigned and does not verify identity, role, or organizational policy. Signed/team gates are future work. |
| PD-06 | Keep Context Graph local and explainable | Files, plans, tests, docs, CI, markers, risks, and ownership hints provide useful context without GitLab Orbit or another remote graph. | This is static heuristic context, not a complete semantic dependency graph or live cross-repository blast radius. |
| PD-07 | Use lexical/structural relevance for the core, never fake embeddings | Explainable local signals keep the core reproducible. | Blind GPT-5.6 semantic judgment is separate model opinion; local status and deterministic verdict remain locked. |
| PD-08 | Record events as plain JSONL | Flight Recorder output is append-friendly, diffable, scriptable, and easy for the next Codex session to inspect. | JSONL is not tamper-evident, signed, or a compliance-grade audit ledger. |
| PD-09 | Keep artifacts portable | JSON and Markdown reports can be reviewed without a proprietary viewer and can feed the dashboard or a future integration. | There is no central database, retention service, or access-control layer. |
| PD-10 | Use prepared fictional before/governed snapshots | InvoiceFlow Mini makes governance gaps and improvements reproducible in under three minutes without exposing a customer or the Universal Agent OS family. | Scores are real deterministic outputs on prepared snapshots, not customer outcomes; GPT-5.6 does not create the transformation. |
| PD-11 | Adapt lineage; do not fork it | The Universal Agent OS family contains valuable workflow ideas, but the competition entry needs a new Codex-centered product and independent implementation. | Source code, templates, UI, screenshots, cloud endpoints, and platform-specific assets are excluded. Attribution remains visible. |
| PD-12 | Make network/model work explicit opt-in | Deterministic core behavior must not fail when credentials or network access are absent; the featured GPT-5.6 audit is a separately initiated step. | Future remote/PR modes require explicit enablement, a clear data boundary, and evidence separate from local checks. |
| PD-13 | Keep the Build Week version English-only | One language keeps CLI, Phase-0, dashboard, README, and judging path consistent. | Multilingual packs are future work. |
| PD-14 | Keep developer authority visible | “Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.” Review state and safer next actions should remain visible rather than silently blocking or approving. | A malicious or misconfigured external agent can ignore repository guidance; Control Tower is not an OS sandbox. |
| PD-15 | Keep local verdict/action and model opinion separate | A model can audit evidence creatively without owning repository truth. | `reconciliation.deterministicVerdict` / `nextSafeAction` remain authoritative; `modelVerdict` / `modelSummary` / `modelNextSafeAction` and alignment/conflict stay inspectable. |
| PD-16 | Record evidence integrity and freshness | SHA-256 bundle/file hashes, base commit, bounded worktree state, and stale/current comparison make later change visible. | Hashes are not signatures or immutable third-party attestation. |
| PD-17 | Separate static and live dashboard roles | GitHub Pages provides a zero-install recorded exhibit; the local server provides live `READY → RUNNING → COMPLETE`. | Pages cannot scan a visitor's repository or mirror a local run. |
| PD-18 | Withhold reconciliation targets from GPT-5.6 | Neutral claims and bounded raw evidence support semantic judgment without disclosing locked claim-status fields or expected comparison classes. | Raw evidence can contain its own status labels; “blind” applies to the reconciler's comparison target, not to deletion of relevant evidence. |
| PD-19 | Escalate policy conflict to a human | `HUMAN_REVIEW_REQUIRED` makes disagreement visible without granting model authority. | `CONTRADICTS` alone is not always conflict; comparison policy determines relation after validation. |
| PD-20 | Isolate and fail closed around the model | A read-only target workspace still exposes files and instructions. Pinned Codex CLI now runs from a new empty ephemeral workspace with user/project instructions, web, inherited environment, persistence, and approval disabled; any tool/unknown/failed/malformed event rejects the result. | This mechanically narrows access to the disclosed prompt bundle, but it is not third-party attestation and still sends that bundle to signed-in ChatGPT. |
| PD-21 | Separate structural precheck, compatible uncertainty, and semantic conflict | Local mission PASS proves the required surfaces exist, not that tests semantically cover every criterion. `INSUFFICIENT` against a negative/unexecuted local state should not be called agreement. | Dashboard and artifacts use structural-precheck labeling plus three relations: align, compatible, conflict. Human judgment remains necessary. |
| PD-22 | Resolve canonical destructive boundaries before execution | Typed strings such as `$HOME/..`, relative traversal, platform aliases, or symlinks can hide the actual target. | The documented subset returns BLOCKED/CAUTION, NOT_RUN, and human review. It is analysis, not a general shell parser or OS firewall. |
| PD-23 | Never emit destructive CLEAR | Even a specific repository subpath can contain valuable data or generated/source ambiguity. | A resolved repository subpath is CAUTION; protected, outside, dynamic, or uncertain targets are BLOCKED. Legacy Mistake Shield CLEAR keeps its narrow “no configured rule matched” meaning. |
| PD-24 | Keep optional hooks subordinate to sandbox and trust | A project `PreToolUse` decision can add defense in depth, but official interception is incomplete and hook failure may not block. | Match supported `Bash` forms only, require project/hash trust, never weaken sandbox/approvals, and publish the exact harmless verification boundary. |

## Why local-first

Control Tower reads repository metadata, filenames, governance documents, plans, and selected text markers. Those can reveal confidential architecture even when no source content is intentionally exported. Keeping scanning, scoring, graph building, mistake checks, and report generation local minimizes unnecessary disclosure and removes credentials from the default demo.

Local-first also improves evidence quality: an output file can name the target, inputs, status, and check provenance without depending on a remote service that a reviewer cannot access. The user chooses whether to share an exported pack. See [Privacy and Security](PRIVACY_AND_SECURITY.md).

## Why deterministic scoring

The health score is a prioritization aid, not a verdict from an opaque model. A deterministic scorer makes these questions answerable:

- Which required surface was found or missing?
- Which risk rule fired?
- How did each category contribute?
- Will the same repository produce the same result?
- Which improvement changed the before/after score?

The implemented real model audit may challenge evidence, but it cannot rewrite the deterministic result, the authoritative local verdict, or convert `NOT_RUN` into `PASS`.

## Why canonical destructive preflight

Review Gate answers whether a human approved a declared scope; it does not prove that a runtime target stays inside that scope. Destructive Action Preflight therefore treats target resolution as a separate deterministic question. It expands only documented expressions, verifies the Git root, canonicalizes the target, inspects symlink boundaries, and compares against filesystem root, user home/parent, repository root, `.git`, and outside-repository boundaries.

The result is evidence, not execution: `BLOCKED` or `CAUTION`, `NOT_RUN`, `executed: false`, redacted paths, reasons, and a safer next action. An APPROVED Review Gate cannot turn a protected target into CLEAR. Tests and the safety demo never run deletion.

The optional Codex hook consumes the same decision for matching `Bash` `PreToolUse`. Its real nonexistent-probe denial is retained, along with the one-off hook-trust caveat and incomplete-coverage boundary. The Codex sandbox and permission model remain primary.

## Why a Codex Mission Prompt

A generic “fix this repo” prompt leaves destructive boundaries, proof expectations, and handoff format implicit. The Mission Prompt is the product's main Codex-native control surface. It should carry:

- target and mission goal;
- selected repository context and why it matters;
- detected risks and missing governance surfaces;
- allowed files and forbidden/destructive actions;
- approval state and stop conditions;
- checks to run and evidence required;
- documentation updates and `NOT_RUN` reporting;
- expected final response shape and next safe action.

This makes the next session bounded and reviewable without pretending that Control Tower itself executed the mission.

## Why evidence matters

The difference between edited, tested, and verified must remain visible. A test command can fail; a browser check can be unavailable; a demo record can be simulated. Evidence Pack therefore maps claims to observed artifacts and status rather than relying on prose alone. It also preserves technical-debt delta, traceability, documentation state, and skipped gates for the next session.

## Why source concepts became a new product

The protected **Universal Agent OS family** explores alignment, evidence, memory, approval, context, and mistake prevention. Codex Control Tower combines only the lessons needed for preparing, governing, and proving local Codex-assisted changes.

The transformation is substantive:

- general governance templates become computed repository health and a Codex mission;
- explicit human-review semantics become an honestly limited local Review Gate;
- GitLab Orbit/context ideas become a deterministic local Context Graph/Trace;
- family recall and workbench ideas become repo-context explanations, Flight Recorder, Memory Lens, Mistake Shield, and evidence/before-after views;
- platform-specific services and branding are removed from the runtime.

The full lineage and no-copy record lives in [Source Protection](SOURCE_PROTECTION.md), [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md), [Feature Harvest](FEATURE_HARVEST.md), and [Originality Matrix](ORIGINALITY_MATRIX.md).

## Deferred decisions

These are intentionally future work, not hidden current claims:

- additional target-derived reconciliation policies and language-aware claim adapters;
- GitHub/GitLab PR/MR and CI adapters;
- signed or identity-backed review gates;
- cross-repository and team dashboards;
- semantic code graph and stronger ownership mapping;
- MCP interoperability and multi-agent shared memory;
- multilingual packs.

## Related reading

- [README](../README.md)
- [Privacy and Security](PRIVACY_AND_SECURITY.md)
- [Limitations](LIMITATIONS.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
