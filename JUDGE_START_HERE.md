# Judge: Start Here

## The ten-second version

Codex Control Tower gives real GPT-5.6 a **blind semantic challenge**: the model receives neutral claims and bounded raw evidence inside an empty, ephemeral, read-only workspace. User/project instructions and web search are disabled; any tool event is rejected; the reconciler's locked claim-status fields and expected comparison classes are withheld. Raw evidence may contain status labels as material to audit; those labels are not disclosed as the target answer. GPT-5.6 can return `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT`. Local code compares only the validated result with its hidden policy. A conflict may raise **HUMAN REVIEW REQUIRED**, but the model can never rewrite the locked facts.

The v0.2.0 candidate adds **Destructive Action Preflight** without moving GPT-5.6 out of the product center. Before execution, it resolves supported destructive targets against canonical protected boundaries. The recorded `$HOME/..` example becomes `<USER_HOME_PARENT>`, `BLOCKED`, and `NOT_RUN`; no command executes. A repository subpath is at most `CAUTION`, never a destructive safety clearance.

> **Codex writes. GPT-5.6 challenges. Control Tower locks the facts. The developer decides.**

## Fastest evaluation route

1. Open the [no-install GitHub Pages exhibit](https://zyganali-glitch.github.io/codex-control-tower/).
2. Read the separate **FICTIONAL SAMPLE PROJECT** and **REAL EXECUTION** labels.
3. Inspect **Blind GPT-5.6 Semantic Audit** for the exact model, empty ephemeral workspace, accepted tool events `0`, blind-input disclosure, structural-precheck label, assessment, citations, missing/counter-evidence, reconciliation relation, and human-review state.
4. Open **Mistake Shield** and inspect **Destructive Action Preflight** for `recursive_delete`, `$HOME/..`, `<USER_HOME_PARENT>`, `BLOCKED`, `NOT_RUN`, and **ANALYSIS ONLY · NO COMMAND EXECUTED**.
5. Open **Before / After** to see the reproducible `25 → 88` governance score and `16 → 1` risk comparison on prepared InvoiceFlow Mini snapshots.
6. Open **Evidence** and confirm that browser, load, deployment, provider, and independent security checks remain NOT_RUN.

The Pages site is a static recorded exhibit. For a fresh run, follow [Judge Test Path](docs/JUDGE_TEST_PATH.md); Codex desktop launches `npm run demo:codex`, and the local workbench shows READY → RUNNING → COMPLETE.

## Why GPT-5.6 is necessary here

Deterministic code can reliably record that a test command exited zero, a file exists, or a gate did not run. Those facts do not answer whether the test and change actually prove the mission. GPT-5.6 is used for that semantic relationship.

The controlled `MISSION_CHANGE_TEST_ALIGNMENT` challenge includes one openly disclosed gap in the fictional governed fixture: the Phase-0 success criteria require a durable local audit trail for rejected payment attempts, while the bounded change/test evidence does not prove that full behavior. The raw records naturally expose both the criterion and the missing implementation evidence, but the prompt does not label this as a challenge, direct GPT-5.6 to the gap, or disclose the expected classification. If its assessment conflicts with the local comparison policy—for this structurally present claim, a `CONTRADICTS` result does—Control Tower raises **HUMAN REVIEW REQUIRED**. If it does not, the result remains inspectable. This is a controlled test of model value—not customer evidence, a forced outcome, or permission for the model to change local truth.

**Recorded final exhibit:** the real run completed with `gpt-5.6-sol`, accepted 0 tool events, used a clean pre-run worktree, returned 3 `SUPPORTS` and 3 `CONTRADICTS`, aligned with five local comparison outcomes, and independently contradicted the structural mission-alignment precheck. The resulting single conflict raised **HUMAN REVIEW REQUIRED** while the locked `NOT_RUN` remained unchanged. Both the local fixture verdict and separate model verdict are honestly `FAIL`; that is the controlled evidence result, not a failed model invocation or failed product CI run.

## What is real

- Working Node.js CLI and React dashboard
- Real deterministic scans of both prepared fixture snapshots
- Two focused Node.js fixture tests and their bounded output
- Real signed-in Codex CLI execution with `gpt-5.6-sol`, medium reasoning, an empty ephemeral workspace, disabled web search/config/rules, and read-only/no-approval enforcement
- Fail-closed event validation, structured result validation, decisive-answer citation requirements, evidence hashes, Git provenance, and local reconciliation
- Deterministic Destructive Action Preflight with canonical repository, home, root, `.git`, outside, and symlink boundaries; redacted output; and no deletion execution
- A bounded real `PreToolUse` denial record using a nonexistent harmless probe; sandboxing remained read-only and primary
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
| Does a supported destructive target cross a protected boundary? | Deterministic Destructive Action Preflight; `BLOCKED`/`CAUTION` and `NOT_RUN` only |
| May work proceed? | Human Review Gate and repository controls |

**CCT does not replace the Codex sandbox/permissions, operating-system security, ESLint, CI, code review, or branch protection. It adds a project-level decision, evidence, and handoff layer around agent-assisted work.**

## Version and submission links

- [Repository](https://github.com/zyganali-glitch/codex-control-tower)
- [Moving v0.2.0 development source](https://github.com/zyganali-glitch/codex-control-tower/tree/main)
- [Untouched v0.1 baseline tag](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final)
- [Untouched v0.1 baseline release](https://github.com/zyganali-glitch/codex-control-tower/releases/tag/openai-build-week-final)
- [Submission manifest](docs/SUBMISSION_MANIFEST.md)
- [Devpost narrative](docs/DEVPOST_SUBMISSION.md)
- [Official judging map](docs/JUDGING_MAP.md)
- [Build provenance](docs/BUILD_WEEK_DELTA.md)
- [Architecture and authority boundary](docs/ARCHITECTURE.md)

The real public YouTube URL is still pending. Until it is verified and added to the public submission documents, `openai-build-week-final-v2` and its release must not be created and replacement clip 11 must not be recorded. The private `/feedback` Session ID remains a Devpost-only field and is intentionally absent from the repository. No placeholder is invented for either value.

If an external preview omits v0.2.0 or Destructive Action Preflight, it is stale. The current `main` branch and Pages workflow history identify the moving candidate; the old frozen tag remains historical until the real v2 release exists.
