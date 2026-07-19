# Codex Control Tower

[![CI](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/ci.yml/badge.svg)](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/ci.yml)

> **Mission control for AI-built software.**

> **Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.**

**v0.2.0 final submission**

Codex Control Tower is built for developers and small teams using Codex on long-running, brownfield, or high-risk repositories.

It turns Codex-assisted work into a bounded, reviewable delivery workflow. Local code records the mission, execution evidence, and locked facts. Real GPT-5.6 then independently checks whether the mission, changes, tests, and evidence actually align—without seeing the expected answer and without being able to overwrite local truth.

Before supported destructive work, **Destructive Action Preflight** resolves the requested target against protected filesystem and repository boundaries. Protected or uncertain targets are blocked before execution, remain **NOT_RUN**, and require human review.

> **The recorded audit caught a real mission gap: the fixture required a durable rejected-payment audit trail, but the implementation and focused test proof were missing. That `FAIL` is the product working—not a failed GPT-5.6 run or failed product CI.**

**OpenAI Build Week Developer Tools entry · real Blind GPT-5.6 Semantic Audit · deterministic Destructive Action Preflight · human authority · fictional sample separated from real execution**

**[Watch the public 2:59 demo](https://youtu.be/EvtguYLSNkg)** · **[Open the no-install judge demo](https://zyganali-glitch.github.io/codex-control-tower/)** · **[Judge: start here](JUDGE_START_HERE.md)** · **[Devpost screenshot pack](DEVPOST_SCREENSHOTS.md)**

[![Real GPT-5.6 blind semantic audit exposing a mission-coverage gap while locked local facts remain authoritative](DEVPOST_01_GPT56_BLIND_AUDIT.png)](DEVPOST_01_GPT56_BLIND_AUDIT.png)

*InvoiceFlow Mini is a fictional sample project. Its prepared before/after snapshots are not customer evidence. The scans, two fixture tests, hashed evidence bundle, provenance checks, and recorded GPT-5.6 run are real tool outputs.*

## 30-Second Explanation

AI coding sessions can end with changed files and a confident summary but no durable answer to what actually ran, what was skipped, or whether passing tests prove the mission.

Control Tower locks locally derived facts, then asks real GPT-5.6 a separate question: does the bounded evidence actually support the stated mission? The expected answer is withheld, so the model cannot simply agree. It must return `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT` with bounded citations.

Only after that answer returns does local code compare it with the hidden local policy. A disagreement raises **HUMAN REVIEW REQUIRED**; it never changes PASS, WARN, FAIL, NOT_RUN, SIMULATED, the deterministic verdict, or the developer's Review Gate.

**Main loop:** local scan → bounded Codex mission → locked facts → blind GPT-5.6 challenge → local reconciliation → human decision → evidence handoff.

## Recorded Submission Result

The committed exhibit contains a completed real run from 2026-07-16, not a mocked model card:

- signed-in ChatGPT subscription, pinned `codex-cli 0.144.3`, exact model `gpt-5.6-sol`, medium reasoning;
- empty ephemeral workspace, read-only sandbox, web/user/project instructions disabled, no inherited subprocess environment, no approval escalation;
- fail-closed event result: one completed model message, one completed turn, **0 accepted tool events**;
- clean pre-run worktree at source commit `587ddbd7b43e122d21598194e29a818a20c3f6a3`; the recorded report was older than 24 hours, so provenance remains visibly `WARN` / `stale: true`, while a fresh scan matched its score, risks, and changed-file set;
- completed audit result: local fixture verdict `FAIL`, separate GPT-5.6 verdict `FAIL`, 3 `SUPPORTS`, 3 `CONTRADICTS`, 5 policy alignments, 1 semantic conflict, 1 locked `NOT_RUN`, and **HUMAN REVIEW REQUIRED**;
- the conflict is substantive: local code found the mission/test/evidence surfaces structurally present, while GPT-5.6 traced the stated durable rejected-payment audit requirement and showed that neither implementation nor focused test proof existed.

`FAIL` here is the honest controlled-fixture evidence verdict, not a failed model invocation or failed Control Tower CI run. The model run completed successfully and exposed the intended mission-coverage gap without changing any local state. Inspect the [recorded audit](examples/governed-saas-after/.controltower/codex-live-review-record.json), [exact model input](examples/governed-saas-after/.controltower/CODEX_LIVE_REVIEW_PROMPT.md), and [accepted JSONL lifecycle events](examples/governed-saas-after/.controltower/codex-live-events.jsonl).

The v0.2.0 safety exhibit is separate from that model run. A structured `recursive_delete` request for `$HOME/..` resolves to `<USER_HOME_PARENT>`, returns `BLOCKED`, keeps `executionState: NOT_RUN` and `executed: false`, and exposes a safer next action. Tests use injected fixture homes and harmless paths; they never perform deletion. A real Codex `PreToolUse` denial was also verified with a deliberately nonexistent probe executable in a read-only sandbox. That bounded hook result is not complete enforcement; Codex sandboxing and permissions remain the primary protection.

## Submission Screenshots

These sanitized 1920 × 1080 images are prepared for the Devpost gallery. See the [upload order and exact English captions](DEVPOST_SCREENSHOTS.md).

| Real Blind GPT-5.6 Evidence Audit | Destructive Action Blocked Before Execution |
| --- | --- |
| [![Recorded real GPT-5.6 Sol blind semantic audit with locked local facts and human review](DEVPOST_01_GPT56_BLIND_AUDIT.png)](DEVPOST_01_GPT56_BLIND_AUDIT.png) | [![Destructive Action Preflight blocking a protected home-parent boundary before execution](DEVPOST_02_DESTRUCTIVE_PREFLIGHT_BLOCKED.png)](DEVPOST_02_DESTRUCTIVE_PREFLIGHT_BLOCKED.png) |
| **Controlled Before / After Comparison** | **Evidence States Stay Honest** |
| [![Prepared fictional InvoiceFlow Mini snapshots scanned by the same deterministic tool](DEVPOST_04_BEFORE_AFTER.png)](DEVPOST_04_BEFORE_AFTER.png) | [![Evidence boundary keeping PASS, FAIL, NOT_RUN, and SIMULATED states separate](DEVPOST_03_EVIDENCE_BOUNDARY.png)](DEVPOST_03_EVIDENCE_BOUNDARY.png) |

## Why This Is Different

A model that sees “the answer should be PASS” can merely echo it. Control Tower deliberately withholds that answer. The Blind Semantic Challenge asks GPT-5.6 to reason about the relationship among the mission, changes, tests, test output, and evidence. The local layer is good at facts such as “this command exited zero” or “this gate did not run”; GPT-5.6 is used for the different question: “does this proof actually support the stated mission?”

The `MISSION_CHANGE_TEST_ALIGNMENT` challenge is repository-independent. It compares Phase-0 goals and success criteria with change evidence, test source, test output, and the evidence record. If a narrow passing test does not prove the broader mission, GPT-5.6 can contradict the claim and trigger human review. Its answer is useful precisely because it cannot promote or erase local evidence.

**CCT does not replace the Codex sandbox/permissions, operating-system security, ESLint, CI, code review, or branch protection. It adds a project-level decision, evidence, and handoff layer around agent-assisted work.**

## Why Now?

A [public report about an accidental deletion during an agent run](https://x.com/thsottiaux/status/2077630111499882637) makes the boundary concrete, but it does not establish that any one product can prevent every destructive path. OpenAI's official guidance keeps [Codex sandboxing](https://learn.chatgpt.com/docs/sandboxing) and [auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review) as primary controls. [Codex hooks](https://learn.chatgpt.com/docs/hooks) can add a project-level decision point, but their `PreToolUse` coverage is explicitly incomplete. The [GPT-5.6 safety card](https://deploymentsafety.openai.com/gpt-5-6) provides the wider model-safety context.

Control Tower therefore makes a narrower claim: it deterministically analyzes a documented destructive-command subset, fails closed on ambiguous targets, records `BLOCKED` or `CAUTION`, and can deny supported `Bash` tool calls through an optional trusted project hook. It is an additional decision and evidence layer, not a replacement for sandboxing, permissions, review, CI, or operating-system security.

## Core Features

| Feature | What the developer gets |
| --- | --- |
| **Blind GPT-5.6 Semantic Audit** | Real `gpt-5.6-sol` reviews neutral claims and bounded raw evidence in an empty ephemeral no-tool workspace while locked claim-status fields and expected comparison classes are withheld. |
| **Deterministic Reconciliation** | The model's `SUPPORTS / CONTRADICTS / INSUFFICIENT` opinion is compared only after it returns; local facts and verdicts stay locked. |
| **Human Review Required** | A visible advisory flag when semantic model judgment conflicts with local structural evidence; it never silently changes evidence state. |
| **Codex Mission Prompt** | A concrete next mission built from repository state, risks, allowed scope, forbidden actions, tests, evidence, and approval requirements. |
| **Context Trace** | Selected files, plans, tests, evidence, and memory with reasons, relevance, freshness, importance, and protection signals. |
| **Review Gate** | A visible local AWAITING_HUMAN, APPROVED, REJECTED, or BLOCKED decision artifact with explicit scope. |
| **Destructive Action Preflight** | Analysis-only canonical target resolution with `BLOCKED`/`CAUTION`, `NOT_RUN`, redacted boundaries, and a safer next action; no destructive `CLEAR` is emitted. |
| **Mistake Shield** | Backward-compatible action-text checks plus the structured preflight. Legacy `CLEAR` means only that no configured rule matched; it never means safe. |
| **Flight Recorder** | Local JSONL history across prompts, plans, changes, tests, evidence, approvals, risks, and skipped checks. |
| **Memory Lens** | Durable rules, minefields, architecture principles, environment constraints, preferences, and continuity signals. |
| **Evidence Boundary** | PASS, WARN, FAIL, NOT_RUN, and SIMULATED remain distinct and tied to named artifacts. |
| **Before / After Dashboard** | Reproducible comparison of governance score, risk, evidence, approval, and continuity on a fictional fixture. |
| **Devpost Pack Exporter** | A secondary evidence/handoff output: submission text, demo plan, judging map, command list, limitations, and evidence map. |

## Fast Judge Path

1. Read [Judge: Start Here](JUDGE_START_HERE.md).
2. Open the [GitHub Pages dashboard](https://zyganali-glitch.github.io/codex-control-tower/); no installation is required.
3. Read the separate **FICTIONAL SAMPLE PROJECT** and **REAL EXECUTION** disclosures.
4. Inspect **Blind GPT-5.6 Semantic Audit**: exact model, empty ephemeral workspace, accepted tool events `0`, structural precheck, independent assessment, evidence citations, reconciliation, and **HUMAN REVIEW REQUIRED**.
5. Open **Safety Preflight** and inspect **Destructive Action Preflight**: `recursive_delete`, `$HOME/..`, `<USER_HOME_PARENT>`, `BLOCKED`, `NOT_RUN`, and **ANALYSIS ONLY · NO COMMAND EXECUTED**.
6. Open **Before / After** for the reproducible `25 → 88` score and `16 → 1` risk comparison.
7. Open **Evidence** and confirm unavailable gates remain NOT_RUN.

The Pages site is a static, read-only judge exhibit. It shows sanitized fictional sample content and a committed record of a real GPT-5.6 execution. It cannot scan a visitor's repository or show a new local run. The full evaluation route is in [Judge Test Path](docs/JUDGE_TEST_PATH.md).

### Version and cache safety

Some external preview tools cache a previously opened README. The canonical submitted source is the immutable [`openai-build-week-final-v2` tag and release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final-v2). The existing [`openai-build-week-final` tag](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final) remains an untouched v0.1 baseline. [Submission Manifest](docs/SUBMISSION_MANIFEST.md) records the distinction.

## Quick Start

Requires Node.js 18 or newer.

~~~bash
npm install
npm run demo
npm run demo:safety
npm run dashboard
~~~

The deterministic path requires no OpenAI API key. The featured model path uses the ChatGPT account already signed in to Codex and requires access to `gpt-5.6-sol`.

`npm run demo:safety` only analyzes the recorded `$HOME/..` example and writes a sanitized JSON result under `tmp/`; it never invokes a deletion command. Expected result: `BLOCKED`, `NOT_RUN`, `executed: false`, `<USER_HOME_PARENT>`.

For the real run, open this repository in the Codex desktop app and give Codex this instruction:

~~~text
Without editing any files, run `npm run demo:codex` for this project. Keep the run read-only. When it completes, report the exact model, empty-workspace and no-tool-event proof, the deterministic local verdict, the separate GPT-5.6 verdict, SUPPORTS / CONTRADICTS / INSUFFICIENT counts, whether HUMAN REVIEW REQUIRED was raised, the preserved NOT_RUN count, evidence freshness, and the evidence-record path. If it fails, show the real failure and do not replace it with simulated success.
~~~

`npm run demo:codex` verifies the signed-in ChatGPT session and model catalog, then invokes real `gpt-5.6-sol` with medium reasoning inside an empty temporary workspace. The run is read-only and ephemeral; user configuration, project rules/instructions, web search, and approval escalation are disabled. Local code rejects any command, file, MCP, web-search, plan, unknown, failed, or malformed Codex event. It also validates the structured result, requires allowed citations for decisive assessments, records hashes and Git provenance, and performs the local reconciliation. The Codex dependency is pinned to `0.144.3` so this fail-closed event contract cannot silently drift. There is no hidden fallback to deterministic or simulated output.

For the exact Codex instruction, see [Codex Demo Prompt](docs/CODEX_DEMO_PROMPT.md). For a click-by-click Turkish guide written for someone new to computers, see [Türkçe Demo Çekim Rehberi](docs/DEMO_REHBERI_TR.md).

## What Is Real and What Is Fictional

**FICTIONAL SAMPLE PROJECT:** InvoiceFlow Mini is a controlled invoice/customer/payment example created only for this repository. Its actors, approvals, customer facts, and prepared before/governed snapshots are fictional. GPT-5.6 did not create the snapshots and did not cause the score change.

**REAL EXECUTION:** Control Tower really scans both snapshots, calculates the heuristic scores, runs two focused Node.js fixture tests, builds and hashes evidence, records provenance/freshness, and invokes real `gpt-5.6-sol` in an empty ephemeral read-only no-tool workspace. These are bounded tool outputs—not customer validation, production readiness, a correctness guarantee, or independent security review.

The prepared comparison is reproducible:

| Signal | Messy prepared snapshot | Governed prepared snapshot |
| --- | ---: | ---: |
| Governance score | 25/100 | 88/100 |
| Risk flags | 16 | 1 |
| Focused Node fixture tests | Placeholder/weak | 2 passed, 0 failed |
| Browser, load, deployment, provider, independent security | NOT_RUN | NOT_RUN |

The product also scans its own repository with `npm run evidence:self`. The committed [root scan](docs/ROOT_REPO_SCAN.json) is structural governance evidence only; it is not a correctness or security certificate. Regenerate it to assess the current checkout.

## Blind GPT-5.6 Audit: Exact Authority Boundary

`npm run demo:codex` performs this sequence:

1. Local code derives neutral, target-appropriate claims and collects only the allowlisted raw evidence.
2. Local code independently computes and locks structural/execution states and the deterministic verdict. For `MISSION_CHANGE_TEST_ALIGNMENT`, local `PASS` is labeled only as a **structural precheck**; it is not a deterministic claim that semantic coverage is true.
3. Codex runs in an empty temporary workspace with user configuration, project instructions/rules, web search, and approval escalation disabled. The prompt contains the bounded bundle but withholds the reconciler's locked claim-status fields, deterministic verdict, and expected comparison classes. Raw evidence may still contain its own status labels because those labels are part of the material being challenged.
4. GPT-5.6 returns one assessment per claim: `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT`, with citations, reasoning, counter-evidence, missing evidence, and a recommended next action.
5. Local validation rejects every tool-use event, missing/duplicate claim, injected local status field, malformed record, decisive answer without an allowed citation, `CONTRADICTS` without counter-evidence, `INSUFFICIENT` without missing evidence, unsupported citation, and statement implying the model itself executed a test.
6. Only after the event stream and structured response are accepted does the reconciler compare semantic judgment with the hidden local comparison policy. `INSUFFICIENT` can be marked `COMPATIBLE` with a negative/unexecuted local state without being overstated as full agreement.
7. When the model assessment conflicts with that policy, reconciliation raises `HUMAN_REVIEW_REQUIRED`. A `CONTRADICTS` answer is not automatically a conflict—for example, it can align with a locked FAIL. The flag is advisory: evidence states, local verdict, local next safe action, and human Review Gate remain authoritative.

This is an independent challenge inside the product, not an independent third-party attestation. A model opinion can be wrong; the dashboard preserves both layers so the developer can inspect the disagreement.

## Published Demo

The [public YouTube demo](https://youtu.be/EvtguYLSNkg) displays as **2:59** and includes audible English explanations of Codex, GPT-5.6, the blind evidence challenge, deterministic authority, destructive-action preflight, and the human decision boundary. Its audited editor plan uses 13 source clips totaling 2:57; the published encode displays as 2:59 and remains under the competition's three-minute limit.

The completed recording plan and exact narration remain in the [Demo Script](docs/DEMO_SCRIPT.md). The private `/feedback` Session ID comes from the primary Codex build task and belongs only in the Devpost form; it is intentionally never committed to this public repository.

## CLI

The package exposes the `cct` binary. Every command is also available as `node cli/index.js <command>`.

~~~bash
cct init --target . --profile startup --codex
cct phase0 --target .
cct scan --target . --out report.json
cct health --target .
cct doctor --target .
cct context-graph --target . --out context-graph.json
cct codex-review --target . --model gpt-5.6-sol
cct review-gate --target . --status
cct destructive-preflight --target . --operation recursive_delete --path '$HOME/..' --recursive --force
cct mistake-shield --target . --action "Refactor auth and delete old tests"
cct memory-lens --target . --out memory-lens.json
cct flight-recorder --target . --event TEST --message "Focused test command completed"
cct evidence --target . --out evidence-pack
cct export-devpost --target . --out devpost-pack
~~~

Phase-0 is English-only in this Build Week version. Multilingual product packs are future work. The Turkish file in `docs/` is recording help for the project owner, not an active product locale.

## Dashboard Surfaces

| Surface | What it proves or displays |
| --- | --- |
| **Overview** | Health, readiness, review state, next safe action, score, mission prompt, and Phase-0 context. |
| **Blind GPT-5.6 Semantic Audit** | READY/RUNNING/COMPLETE, exact model/access/mode, neutral claims, independent assessments, citations, counter-evidence, missing evidence, reconciliation, and human-review flag. |
| **Risks** | Severity, affected area, why a finding matters, and mitigation. |
| **Context Trace** | Selected repository items and the reason each entered the bounded mission context. |
| **Evidence** | PASS/WARN/FAIL/NOT_RUN/SIMULATED boundary and named proof. |
| **Memory Lens** | Durable rules, minefields, preferences, staleness, and continuity. |
| **Flight Recorder** | Prompt, plan, change, test, evidence, approval, and risk events. |
| **Mistake Shield** | Destructive Action Preflight first, then the legacy action-text compatibility check, with reasons and a safer next action. |
| **Before / After** | Controlled messy/governed fixture comparison. |

The local dashboard can load a local JSON report and watch the explicit audit record. It never uploads a report by itself. The Pages build is a static sanitized snapshot and cannot observe local state changes.

## OpenAI Build Week Fit

Codex Control Tower is a working developer tool and AI-agent collaboration layer built with Codex. It combines a Node.js CLI, deterministic repository analysis, canonical destructive-target preflight, bounded context and mission generation, real GPT-5.6 semantic reasoning, strict structured-output validation, an authority-preserving reconciler, portable evidence artifacts, controlled fixtures, and a React dashboard.

Codex accelerated requirements synthesis, architecture, implementation, test creation, failure diagnosis, documentation, and release verification. GPT-5.6 also has a visible runtime role: it is a deliberately blind semantic challenger rather than a score generator or a rubber stamp. The developer made and retained the product-defining decisions about evidence authority, scope, safety, disclosure, and publication.

The detailed official-criteria mapping is in [Judging Map](docs/JUDGING_MAP.md), and the build provenance is in [Codex Build Log](docs/CODEX_BUILD_LOG.md) and [Build Week Development Delta](docs/BUILD_WEEK_DELTA.md).

## Supported and Verified Boundaries

| Platform | Status | Boundary |
| --- | --- | --- |
| Windows 10 Pro | VERIFIED | Full tests, dashboard build, signed-in Codex CLI, and real `gpt-5.6-sol` execution were run locally. |
| Ubuntu (`ubuntu-latest`) | VERIFIED for deterministic path | GitHub Actions installs, tests, runs the deterministic demo, and builds the dashboard. The signed-in model step is not run in CI. |
| macOS | NOT_RUN | Portability is expected but no named macOS execution artifact exists for this version. |

The optional project hook was verified only for a supported `Bash` `PreToolUse` event with a nonexistent harmless probe, pinned Codex CLI `0.144.3`, `gpt-5.6-sol`, and a read-only sandbox. The run used a one-off vetted hook-trust bypass because normal project/hash trust was not part of that verification; it did not bypass approvals or sandboxing. Hook failures, unsupported command forms, other tools, nested interpreters, and incomplete Codex interception remain outside that proof.

## Lineage and Originality

Codex Control Tower is an independent Codex-native product inspired at concept level by the **Universal Agent OS family**: alignment, evidence-first delivery, human review, context, continuity, and mistake prevention. The family was studied read-only, is not a runtime dependency, and is never used as the demo target. This product transforms those lessons into a bounded mission-control workflow and blind GPT-5.6 evidence challenge.

The transformation and no-copy record is in [Source Protection](docs/SOURCE_PROTECTION.md), [Source Research Matrix](docs/SOURCE_RESEARCH_MATRIX.md), [Feature Harvest](docs/FEATURE_HARVEST.md), and [Originality Matrix](docs/ORIGINALITY_MATRIX.md).

## Privacy, Safety, and Honest Limits

- Deterministic scanning, scoring, context selection, and report generation are local-first and have no telemetry.
- The real GPT-5.6 step is explicit opt-in and sends only the displayed bounded evidence bundle through the signed-in ChatGPT session. Its empty ephemeral workspace and fail-closed event policy reject file, command, MCP, web-search, plan, and unknown tool events.
- Generated reports can include sensitive filenames, paths, plans, and risks; review before sharing.
- Scanner findings and scores are heuristics and can have false positives or false negatives.
- Review Gate is a local unsigned file, not identity verification or OS enforcement.
- Flight Recorder is inspectable JSONL, not a tamper-proof ledger.
- Destructive Action Preflight blocks filesystem root, user home/parent, repository root, `.git`, outside-repository, unresolved/dynamic/wildcard, uncertain, and symlink-boundary targets. A specific repository subpath is still only CAUTION and requires human review.
- Preflight compares the canonical resolved boundary, not merely the typed text, and publishes redacted tokens such as `<USER_HOME>` and `<REPOSITORY_ROOT>`.
- A legacy Mistake Shield CLEAR result means only that no configured rule matched; it does not mean an action is risk-free.
- The optional Codex hook covers only the documented subset of matching `Bash` events. Official `PreToolUse` coverage is incomplete, project trust is required, and sandboxing remains primary.
- PASS requires named evidence. A file's existence does not prove a command ran.
- NOT_RUN never becomes PASS because a model sounds confident.
- SIMULATED fixture facts remain separate from real executions on the fixture.

See [Architecture](docs/ARCHITECTURE.md), [Privacy and Security](docs/PRIVACY_AND_SECURITY.md), and [Honest Limitations](docs/LIMITATIONS.md).

## Submission Assets

- [Judge: Start Here](JUDGE_START_HERE.md)
- [Submission Manifest](docs/SUBMISSION_MANIFEST.md)
- [Devpost Submission Draft](docs/DEVPOST_SUBMISSION.md)
- [Under-3-minute Demo Script](docs/DEMO_SCRIPT.md)
- [Türkçe Demo Çekim Rehberi](docs/DEMO_REHBERI_TR.md)
- [Codex Demo Prompt](docs/CODEX_DEMO_PROMPT.md)
- [Judge Test Path](docs/JUDGE_TEST_PATH.md)
- [Judging Map](docs/JUDGING_MAP.md)
- [Build Week Development Delta](docs/BUILD_WEEK_DELTA.md)
- [Codex Build Log](docs/CODEX_BUILD_LOG.md)

## Roadmap

- More target-derived challenge policies and language-aware claim adapters
- GitHub/GitLab PR/MR and CI integrations
- Signed or identity-backed Review Gates and evidence attestations
- Team and cross-repository dashboards
- Multilingual product packs

Roadmap items are future work, not current capability.

## License

Codex Control Tower is released under the [MIT License](LICENSE).
