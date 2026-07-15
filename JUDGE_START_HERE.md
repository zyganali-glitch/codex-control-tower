# Judge: Start Here

## The ten-second version

Codex Control Tower gives real GPT-5.6 a **blind semantic challenge**: the model receives neutral claims and bounded raw evidence inside an empty, ephemeral, read-only workspace. User/project instructions and web search are disabled; any tool event is rejected; the reconciler's locked claim-status fields and expected comparison classes are withheld. Raw evidence may contain status labels as material to audit; those labels are not disclosed as the target answer. GPT-5.6 can return `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT`. Local code compares only the validated result with its hidden policy. A conflict may raise **HUMAN REVIEW REQUIRED**, but the model can never rewrite the locked facts.

> **Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.**

## Fastest evaluation route

1. Open the [no-install GitHub Pages exhibit](https://zyganali-glitch.github.io/codex-control-tower/).
2. Read the separate **FICTIONAL SAMPLE PROJECT** and **REAL EXECUTION** labels.
3. Inspect **Blind GPT-5.6 Semantic Audit** for the exact model, empty ephemeral workspace, accepted tool events `0`, blind-input disclosure, structural-precheck label, assessment, citations, missing/counter-evidence, reconciliation relation, and human-review state.
4. Open **Before / After** to see the reproducible `25 → 88` governance score and `16 → 1` risk comparison on prepared InvoiceFlow Mini snapshots.
5. Open **Evidence** and confirm that browser, load, deployment, provider, and independent security checks remain NOT_RUN.

The Pages site is a static recorded exhibit. For a fresh run, follow [Judge Test Path](docs/JUDGE_TEST_PATH.md); Codex desktop launches `npm run demo:codex`, and the local workbench shows READY → RUNNING → COMPLETE.

## Why GPT-5.6 is necessary here

Deterministic code can reliably record that a test command exited zero, a file exists, or a gate did not run. Those facts do not answer whether the test and change actually prove the mission. GPT-5.6 is used for that semantic relationship.

The controlled `MISSION_CHANGE_TEST_ALIGNMENT` challenge includes one openly disclosed gap in the fictional governed fixture: the Phase-0 success criteria require a durable local audit trail for rejected payment attempts, while the bounded change/test evidence does not prove that full behavior. The raw records naturally expose both the criterion and the missing implementation evidence, but the prompt does not label this as a challenge, direct GPT-5.6 to the gap, or disclose the expected classification. If its assessment conflicts with the local comparison policy—for this structurally present claim, a `CONTRADICTS` result does—Control Tower raises **HUMAN REVIEW REQUIRED**. If it does not, the result remains inspectable. This is a controlled test of model value—not customer evidence, a forced outcome, or permission for the model to change local truth.

## What is real

- Working Node.js CLI and React dashboard
- Real deterministic scans of both prepared fixture snapshots
- Two focused Node.js fixture tests and their bounded output
- Real signed-in Codex CLI execution with `gpt-5.6-sol`, medium reasoning, an empty ephemeral workspace, disabled web search/config/rules, and read-only/no-approval enforcement
- Fail-closed event validation, structured result validation, decisive-answer citation requirements, evidence hashes, Git provenance, and local reconciliation
- Locked evidence states and visible NOT_RUN boundaries

## What is fictional

- InvoiceFlow Mini, its users, customer/payment records, approvals, and history
- The prepared before/governed snapshots as a customer transformation
- Any provider, browser, load, deployment, penetration, or independent security result not explicitly executed

GPT-5.6 did not create the snapshots or cause `25 → 88`. Real tools run on controlled fictional inputs.

## Authority map

| Question | Authority |
| --- | --- |
| Did a named command run? | Local recorded execution evidence |
| What is PASS, WARN, FAIL, NOT_RUN, or SIMULATED? | Locked deterministic state |
| Does the bounded evidence semantically prove the mission? | Blind GPT-5.6 opinion, preserved separately |
| Does a conflict require attention? | Local reconciler raises advisory HUMAN REVIEW REQUIRED |
| May work proceed? | Human Review Gate and repository controls |

**CCT does not replace ESLint, CI, code review, or branch protection. It adds the evidence and handoff layer around agent-assisted work.**

## Stable submission links

- [Repository](https://github.com/zyganali-glitch/codex-control-tower)
- [Frozen Build Week tag](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final)
- [Build Week release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final)
- [Submission manifest](docs/SUBMISSION_MANIFEST.md)
- [Devpost narrative](docs/DEVPOST_SUBMISSION.md)
- [Official judging map](docs/JUDGING_MAP.md)
- [Build provenance](docs/BUILD_WEEK_DELTA.md)
- [Architecture and authority boundary](docs/ARCHITECTURE.md)

The public under-three-minute video and the private `/feedback` Session ID are submission-form assets. The private ID is intentionally absent from the repository. The repository does not invent either value; the Devpost entry is the authority for the submitted video URL and private field.

If an external preview shows an older “deterministic only” description, it is stale. This page, the frozen tag, the release, and the version/provenance shown in the dashboard identify the submitted GPT-5.6 build.
