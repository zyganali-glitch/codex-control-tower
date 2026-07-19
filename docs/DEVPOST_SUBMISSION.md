# Devpost Submission Draft

## Project name

**Codex Control Tower**

## Track

**Developer Tools**

## One-liner

Codex writes. GPT-5.6 independently challenges the evidence. Control Tower locks local facts and blocks dangerous targets before execution. The developer decides.

## Short description

Codex Control Tower is built for developers and small teams using Codex on long-running, brownfield, or high-risk repositories. It turns agent-assisted changes into a bounded, reviewable workflow with mission context, execution evidence, and locked local facts.

Real `gpt-5.6-sol` independently checks whether the mission, changes, tests, and evidence align. We hide the expected answer, so the model cannot merely agree. Its opinion can raise **HUMAN REVIEW REQUIRED**, but it can never overwrite PASS, WARN, FAIL, NOT_RUN, SIMULATED, the deterministic verdict, or the human Review Gate.

In the recorded run, GPT-5.6 found a specific mission gap: a durable rejected-payment audit trail was required, but its implementation and focused test proof were missing. That honest `FAIL` is the product working; the GPT-5.6 invocation and product CI both completed successfully.

Destructive Action Preflight separately resolves supported destructive targets against protected boundaries before execution. Protected or uncertain targets are blocked, remain NOT_RUN, execute no command, and require human review.

## The problem

- What mission and file boundary were agreed?
- What changed, what ran, and which checks were skipped?
- Do passing tests actually prove the mission?
- Can the next Codex session continue safely without trusting a confident summary?

A test exit code proves execution, not semantic coverage. A model opinion adds reasoning, but it should not own repository truth. A typed destructive target also needs a separate boundary check before execution.

## The solution

1. **Align and bound:** record the mission, allowed scope, forbidden actions, risks, approval, and required proof.
2. **Scan and preflight:** detect governance gaps and resolve supported destructive targets against protected boundaries before execution.
3. **Lock facts:** record structural and execution states locally before the model call.
4. **Challenge blindly:** give real GPT-5.6 neutral claims and bounded evidence while withholding the expected answer.
5. **Validate and reconcile:** reject tool events or malformed output, require bounded citations, then compare the model opinion with locked local policy.
6. **Escalate and hand off:** raise HUMAN REVIEW REQUIRED on disagreement; preserve local truth, human authority, history, and the next safe action.

**CCT does not replace the Codex sandbox/permission system, operating-system security, ESLint, CI, code review, or branch protection. It adds a project-level decision, evidence, and handoff layer around agent-assisted work.**

## Why now

A [public accidental-deletion report](https://x.com/thsottiaux/status/2077630111499882637) provides a concrete motivation, while OpenAI's official [sandboxing](https://learn.chatgpt.com/docs/sandboxing), [auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review), [hooks](https://learn.chatgpt.com/docs/hooks), and [GPT-5.6 safety](https://deploymentsafety.openai.com/gpt-5-6) materials define the honest boundary. Sandboxing and permissions are primary. Codex `PreToolUse` hooks can add a second project decision point, but official coverage is incomplete.

The implemented hook therefore makes only a bounded claim: a matching supported `Bash` event can be denied when preflight returns BLOCKED. The real verification used a nonexistent harmless probe, read-only sandboxing, pinned Codex CLI `0.144.3`, and `gpt-5.6-sol`; denial occurred before execution. It used a one-off vetted hook-trust bypass only, not an approval or sandbox bypass. Normal project/hash trust and complete interception were not verified.

## Why GPT-5.6 is central and non-obvious

The product does not use GPT-5.6 to generate a decorative summary, calculate the deterministic score, or rubber-stamp a disclosed answer. It uses the model where semantic reasoning is valuable and deterministic code is weak: whether a mission, implementation change, test source, test output, and evidence record genuinely support one another.

The blind boundary matters. GPT-5.6 may encounter status words inside raw evidence because those words are part of the material under review, but it never receives the reconciler's hidden claim-status fields or the expected assessment class. Local comparison begins only after a validated response returns.

For each claim GPT-5.6 must provide:

- `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT`;
- bounded citations and reasoning;
- counter-evidence;
- missing evidence;
- a recommended next action.

The model's recommendation stays separate from the local next safe action. If semantic judgment conflicts with the hidden local comparison policy, Control Tower raises HUMAN REVIEW REQUIRED. `INSUFFICIENT` against an already negative/unexecuted state is labeled `COMPATIBLE`, not overstated as agreement. The human sees why; no evidence state changes silently.

## Controlled Semantic Challenge

The fictional governed fixture contains an openly disclosed test case for semantic value. Its Phase-0 success criteria include a durable local audit trail for rejected payment attempts. The bounded change/test evidence demonstrates some focused behavior but does not prove that complete criterion.

The raw records naturally contain the success criterion and the missing implementation evidence. The prompt does not label that row as a challenge, direct GPT-5.6 to the gap, or provide the desired classification. It presents the same neutral mission/change/test/evidence relationship used for another repository. If the model relates those records and identifies the mismatch, the result demonstrates why a blind semantic challenger adds value. If it does not, that real answer remains visible. The test is controlled, not forced; it is not customer evidence and cannot change local truth.

### Recorded submission run

The final committed exhibit records a real completed run through signed-in ChatGPT, pinned `codex-cli 0.144.3`, and exact `gpt-5.6-sol`. The model worked from an empty ephemeral workspace; user/project instructions, web access, inherited subprocess environment, and approval escalation were disabled; the accepted event stream contained zero tool events. The pre-run worktree was clean at `587ddbd7b43e122d21598194e29a818a20c3f6a3`. The recorded report was older than 24 hours, so `reportProvenance.status` remains `WARN` and `stale: true`; a fresh scan still matched its score, risk flags, and changed-file set.

GPT-5.6 returned 3 `SUPPORTS` and 3 `CONTRADICTS`. Five assessments aligned with the local comparison policy. On `MISSION_CHANGE_TEST_ALIGNMENT`, GPT-5.6 independently traced the durable rejected-payment audit criterion and contradicted the local structural precheck because no implementation or focused test proof existed. That single conflict raised **HUMAN REVIEW REQUIRED** while the locked `NOT_RUN` remained unchanged. Both the local controlled-fixture verdict and separate model verdict are honestly `FAIL`; the model invocation itself completed successfully. This is the product's central result: semantic reasoning found a mission-coverage gap that a passing test and structural precheck did not establish.

## What is implemented

| Surface | Implementation | Evidence |
| --- | --- | --- |
| CLI | CommonJS command router for initialization, Phase-0, scan, health, evidence, context, gates, shield, memory, recorder, model audit, and demo | `cli/index.js`, `cli/commands/` |
| Scanner and scoring | Local inventory, governance/risk detection, weighted 100-point health model | `cli/lib/repoScanner.js`, `cli/lib/healthScorer.js` |
| Bounded Codex mission | Context Graph/Trace plus explicit allowed scope, forbidden actions, proof, tests, and stop rules | `cli/lib/contextGraphBuilder.js`, `cli/lib/codexPromptBuilder.js` |
| Human authority | Scoped local Review Gate plus deterministic Mistake Shield | `cli/lib/reviewGate.js`, `cli/lib/mistakeShield.js` |
| Destructive Action Preflight | Canonical protected-boundary analysis, sanitized BLOCKED/CAUTION/NOT_RUN output, CLI, safety demo, recorder integration | `cli/lib/destructiveActionPreflight.js`, `cli/commands/destructive-preflight.js` |
| Optional pre-tool adapter | Matching `Bash` `PreToolUse` deny for the documented command subset; harmless real probe evidence and explicit incomplete-coverage boundary | `.codex/hooks.json`, `.codex/hooks/destructive-preflight.js`, `.controltower/CODEX_HOOK_VERIFICATION.json` |
| Continuity | Memory Lens and typed local JSONL Flight Recorder | `cli/lib/memoryLens.js`, `cli/lib/flightRecorder.js` |
| Blind GPT-5.6 audit | Neutral claims, bounded raw evidence, hidden reconciliation targets, pinned Codex CLI, real `gpt-5.6-sol`, medium reasoning, empty ephemeral read-only workspace | `cli/commands/codex-review.js` |
| Model boundary and reconciliation safety | Disabled config/rules/web/environment/approval, fail-closed no-tool JSONL validation, decisive-evidence rules, citation allowlist, separate full/included hashes, freshness/provenance, locked-state preservation, HUMAN REVIEW REQUIRED | `cli/commands/codex-review.js`, `tests/test_codex_review.js` |
| Dashboard | React/Vite workbench plus static GitHub Pages judge exhibit | `apps/dashboard/` |
| Controlled fixture | Fictional messy/governed InvoiceFlow Mini snapshots | `examples/messy-saas-before`, `examples/governed-saas-after` |
| Evidence handoff | Portable JSON/JSONL/Markdown Evidence Pack; secondary Devpost Pack export | `cli/lib/evidenceCollector.js`, `cli/commands/export-devpost.js` |

The deterministic path requires no OpenAI API key. The featured explicit-opt-in audit uses the ChatGPT account already signed in to Codex. The command verifies model availability, runs `gpt-5.6-sol` with medium reasoning in an isolated empty workspace, rejects any tool event, and has no simulated-success fallback. The Codex CLI is pinned to `0.144.3` so the validated event contract cannot silently change under a floating dependency.

## How Codex was used to build it

Codex was the primary coding collaborator throughout the official build period. It:

- translated the competition brief and later rule details into implementation and evidence requirements;
- inspected the Universal Agent OS family read-only and transformed concept-level lessons into an independent product;
- implemented the CLI, deterministic engines, fixtures, tests, React dashboard, GitHub Pages deployment, and documentation;
- used bounded parallel workstreams for engine, dashboard, narrative, and release tasks;
- diagnosed failing tests, report/UI drift, deployment warnings, and misleading evidence states;
- ran verification and recorded both failures and recoveries;
- challenged the first GPT-5.6 design after an external review exposed that the model could see expected answer classes;
- redesigned it as a blind semantic audit with an explicit model/local authority boundary.

This produced two visible Codex contributions: Codex accelerated the product's construction, and Codex is the execution surface that launches the real GPT-5.6 audit in the product demo.

Build provenance: [Codex Build Log](CODEX_BUILD_LOG.md) and [Build Week Delta](BUILD_WEEK_DELTA.md).

## Key human decisions

The developer retained authority over product-defining choices:

- keep the deterministic core inspectable and usable without an API key;
- use GPT-5.6 for semantic challenge, not as owner of the evidence state;
- withhold locked reconciliation targets and expected classes from the model;
- raise a visible human-review flag on disagreement rather than silently auto-fix;
- use a fictional fixture instead of customer data;
- preserve PASS, WARN, FAIL, NOT_RUN, and SIMULATED as distinct meanings;
- require scoped human approval for risky work;
- publish only verified execution, deployment, model, and validation claims.

## Demo: real versus fictional

InvoiceFlow Mini is a **FICTIONAL SAMPLE PROJECT**. Its customer/payment/auth records, approvals, actors, and prepared snapshots are not customer evidence.

Real executions on that controlled sample are:

| Signal | Messy prepared snapshot | Governed prepared snapshot |
| --- | ---: | ---: |
| Governance health | 25/100 | 88/100 |
| Risk flags | 16 | 1 |
| Governance/continuity surfaces | Missing | Present |
| Focused Node fixture tests | Placeholder/weak | 2 passed, 0 failed |
| Provider/browser/load/deployment/independent security | NOT_RUN | NOT_RUN |

Control Tower really scans, scores, tests, hashes the bounded bundle, records provenance/freshness, invokes real GPT-5.6, validates the response, and reconciles the two layers. GPT-5.6 did not prepare the snapshots, calculate the score, run the fixture tests itself, or cause `25 → 88`.

## Fast public judge route

1. Watch the [public 2:59 YouTube demo](https://youtu.be/EvtguYLSNkg).
2. Read [Judge: Start Here](../JUDGE_START_HERE.md).
3. Open the [no-install GitHub Pages exhibit](https://zyganali-glitch.github.io/codex-control-tower/).
4. Inspect the completed Blind GPT-5.6 Semantic Audit and evidence boundary.
5. Use [Judge Test Path](JUDGE_TEST_PATH.md) for the fresh local run.
6. Use the immutable [openai-build-week-final-v2 release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final-v2) as the canonical submitted source. The existing [openai-build-week-final](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final) tag remains an untouched v0.1 baseline.

The public Pages site is a static recorded exhibit. It does not execute a visitor's repository or update when a local run begins. A fresh run uses the local workbench and Codex desktop.

## Demo commands

~~~bash
npm install
npm run demo
npm run demo:safety
npm run dashboard
~~~

In a clean Codex desktop task for this repository, paste [Codex Demo Prompt](CODEX_DEMO_PROMPT.md). Codex visibly launches:

~~~bash
npm run demo:codex
~~~

The local panel moves through READY → RUNNING → COMPLETE. A separate command window is documented only as recovery.

`npm run demo:safety` does not run a deletion command. It analyzes `$HOME/..`, prints `BLOCKED` and `NOT_RUN`, and writes a sanitized generated record under `tmp/`.

## Evidence boundary

- **PASS:** named evidence supports the exact bounded local claim.
- **WARN:** support is partial, narrow, stale, heuristic, or review-dependent.
- **FAIL:** an observed required check failed or a mandatory surface is missing.
- **NOT_RUN:** the check did not execute or no result was available.
- **SIMULATED:** controlled fixture fact or activity.
- **HUMAN REVIEW REQUIRED:** advisory reconciliation flag; not a new evidence state and not permission to proceed.
- **BLOCKED (preflight):** a protected, outside, unresolved, dynamic, wildcard, uncertain, or symlink boundary; execution remains NOT_RUN.
- **CAUTION (preflight):** a specific repository subpath still requiring inspection and scoped human approval; execution remains NOT_RUN.
- **CLEAR (legacy Mistake Shield only):** no configured lexical rule matched; never a safety guarantee and never emitted as destructive clearance.

A test file does not prove a test ran. A zero exit code does not prove complete mission coverage. A model opinion is not independent third-party attestation.

## Official Build Week fit

The official competition uses a Stage One eligibility/theme check and Stage Two judging across Technological Implementation, Design, Potential Impact, and Quality of the Idea. The detailed mapping is in [Judging Map](JUDGING_MAP.md).

- **Theme and required technology:** a working Codex-centered developer tool with a real GPT-5.6 runtime role.
- **Technological Implementation:** deep Codex-assisted construction, real model execution, strict contract validation, deterministic reconciliation, provenance, adversarial tests, and a reproducible no-rebuild route.
- **Design:** one coherent authority story across CLI, Codex desktop, dashboard, evidence states, and human gate.
- **Potential Impact:** makes agent-assisted work easier to review, continue, and challenge without introducing a mandatory hosted service.
- **Quality of the Idea:** non-obvious division of labor—deterministic code records facts, GPT-5.6 challenges semantic sufficiency, and the human decides.

## Lineage and originality

Codex Control Tower is an independent product with concept-level inspiration from the **Universal Agent OS family**. The family was studied read-only, is not a runtime dependency, and is not used as a demo target. The new contribution is the integrated Codex mission-control path and blind GPT-5.6 semantic challenge.

See [Source Protection](SOURCE_PROTECTION.md), [Source Research Matrix](SOURCE_RESEARCH_MATRIX.md), [Feature Harvest](FEATURE_HARVEST.md), and [Originality Matrix](ORIGINALITY_MATRIX.md).

## Privacy and limitations

- Deterministic scanning/scoring is local-first and has no telemetry.
- The real model step is explicit opt-in and sends only the disclosed bounded bundle through the signed-in ChatGPT session; the model process is isolated from the target repository and any tool event rejects the result.
- Reports can contain sensitive paths, plans, and risks; users must review before sharing.
- Review Gate is a local unsigned artifact, not identity verification or OS enforcement.
- Flight Recorder is mutable JSONL, not a tamper-proof ledger.
- Scanner and model output can both be wrong.
- Preflight covers a documented operation/command subset. It is not a general shell parser, OS firewall, malware detector, or replacement for Codex sandboxing.
- The optional project hook matches `Bash` only, requires trust, has incomplete interception, cannot force an ask decision for CAUTION, and may fail without blocking the tool workflow.
- CCT does not prove code correctness, security, compliance, production readiness, or user demand.
- This Build Week product is English-only; multilingual product packs are future work.

Details: [Privacy and Security](PRIVACY_AND_SECURITY.md) and [Limitations](LIMITATIONS.md).

## Submission media and private field

The [public YouTube demo](https://youtu.be/EvtguYLSNkg) is **PUBLIC** and displays as **2:59**. Its audible English narration explicitly covers Codex, real GPT-5.6, the blind evidence challenge, deterministic authority, Safety Preflight, and the developer's final decision. The audited editor timeline remains 2:57 across 13 source clips; the published encode displays as 2:59 and stays under the three-minute limit.

The real `/feedback` Session ID comes from the primary development task and belongs only in Devpost's private field. The private ID is intentionally absent from the public repository.

## Submission assets

- [Devpost Screenshot Pack](../DEVPOST_SCREENSHOTS.md)
- [Judge: Start Here](../JUDGE_START_HERE.md)
- [Submission Manifest](SUBMISSION_MANIFEST.md)
- [Under-3-minute Demo Script](DEMO_SCRIPT.md)
- [Beginner-safe Turkish Recording Guide](DEMO_REHBERI_TR.md)
- [Codex Demo Prompt](CODEX_DEMO_PROMPT.md)
- [Judge Test Path](JUDGE_TEST_PATH.md)
- [Judging Map](JUDGING_MAP.md)
- [Build Week Delta](BUILD_WEEK_DELTA.md)
- [Codex Build Log](CODEX_BUILD_LOG.md)
- [Architecture](ARCHITECTURE.md)
