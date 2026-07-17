# Changelog

## 0.2.0 candidate - 2026-07-17

- Added analysis-only Destructive Action Preflight with deterministic `BLOCKED`/`CAUTION`, `NOT_RUN`, `executed: false`, human review, and safer-next-action output.
- Added canonical boundary checks for filesystem roots, user home and its parent, verified repository root, `.git`, outside-repository targets, symlinks, unresolved variables, substitution, chaining, wildcards, and path-inspection uncertainty.
- Added portable redaction tokens such as `<USER_HOME>`, `<USER_HOME_PARENT>`, and `<REPOSITORY_ROOT>` so reports, dashboard views, and recording assets do not expose a personal path.
- Integrated the preflight into the backward-compatible Mistake Shield and Flight Recorder without turning legacy `CLEAR` into a safety claim.
- Added `cct destructive-preflight` and `npm run demo:safety`; both analyze intent and never execute a deletion command. Generated JSON is restricted to named preflight files under `.controltower/` or `tmp/`.
- Added an optional Codex project `PreToolUse` hook for the supported `Bash` command subset. A real denial was verified with pinned Codex CLI `0.144.3`, `gpt-5.6-sol`, a read-only sandbox, and a nonexistent harmless probe. The verification used a one-off vetted hook-trust bypass only; normal project/hash trust was not verified.
- Documented that Codex hook interception is incomplete, CAUTION can add context but cannot force an ask decision, hook failure is not fail-closed enforcement, and sandboxing/permissions remain primary.
- Added no-delete regression coverage for POSIX/Windows expressions, path traversal, repository and `.git` boundaries, raw command forms, redaction, output confinement, recorder integration, and the harmless hook denial path.
- Corrected the audited recording plan to use all 13 source clips in `2:57`: old clip 03 retains the terminal/local-start proof, the separate Safety Preflight capture follows clip 10, only clip 05's idle wait is shortened, and existing clip 11 remains unchanged. The public YouTube URL and immutable `openai-build-week-final-v2` tag/release remain pending.

## Unreleased - 2026-07-13

- Replaced answer-leaking reconciliation prompts with a blind GPT-5.6 semantic
  challenge: the model receives neutral claims and bounded raw evidence, never
  locked local states or expected assessment classes.
- Replaced `QUESTIONS` with `CONTRADICTS`, added counter-evidence and
  `HUMAN_REVIEW_REQUIRED`, and kept every local evidence state and verdict
  immutable when the two layers disagree.
- Added a repository-agnostic mission/change/test/evidence alignment claim and a
  transparently controlled fictional challenge with one intentionally unproven
  success criterion.
- Made the real GPT-5.6 role visible in the first judge-facing screen, static page
  metadata, immutable release path, and first ten seconds of the video script.
- Replaced the earlier free-form model review with a featured explicit opt-in, read-only GPT-5.6 Evidence Reconciliation path through the signed-in Codex application/ChatGPT subscription.
- Locked deterministic `PASS`, `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` states so model output can support, question, or mark evidence insufficient without rewriting facts.
- Added a bounded local evidence bundle, strict structured-output validation, reconciliation provenance, adversarial tests, and a live dashboard panel.
- Added a GitHub Pages deployment workflow, a 30-second judge path, a Build Week delta record, and the earlier recording script later reconciled against the actual capture inventory.
- Added an honest user-validation template; no users, quotes, or outcomes are fabricated.
- Generalized evidence claims beyond InvoiceFlow-specific wording, separated the deterministic local verdict from model opinion, added semantic alignment, and recorded SHA-256/Git/freshness provenance.
- Clarified GitHub Pages as the static recorded judge exhibit and the local dashboard as the live workbench; moved the featured recording action into a clean Codex desktop demo task.
- Reframed InvoiceFlow Mini as prepared fictional snapshots with real scan/test/model execution, without crediting GPT-5.6 for the `25 → 88` difference.
- Split the local next safe action from the model suggestion, recorded base-commit worktree state, and blocked command-like or symbolic-link evidence paths.
- Moved the governed fixture's raw test output into the selected target after GPT-5.6 exposed the earlier missing-artifact path.
- Made portable evidence-path sanitization independent of the host operating system and added mixed Windows/Unix path regression tests after Linux CI exposed the mismatch.
- Moved the pinned Codex CLI run into a newly created empty ephemeral workspace; disabled user/project instructions, web search, inherited subprocess environment, persistence, and approval escalation; and added fail-closed rejection of tool, unknown, failed, or malformed events.
- Required allowed citations for decisive model judgments, counter-evidence for contradiction, and missing evidence for insufficiency; separated full-file hashes from the exact included-content hashes shown to the model.
- Labeled mission-alignment PASS as a structural precheck and added `COMPATIBLE_WITH_LOCKED_STATUS` so uncertainty is not overstated as agreement or mislabeled as conflict.

## 0.1.0 - 2026-07-12

- Initial OpenAI Build Week competition build.
- Added deterministic repository scanning, governance scoring, Codex Mission Prompts, Context Trace, Review Gate, Mistake Shield, Memory Lens, Flight Recorder, Phase-0 alignment, evidence export, Devpost export, and a local dashboard.
- Added prepared fictional InvoiceFlow Mini before/governed snapshots with real deterministic scan output and visible disclosure.
- Added the first explicit opt-in real `gpt-5.6-sol` read-only review through signed-in ChatGPT subscription access, with structured provenance and live dashboard updates.
- Made the Build Week product English-only and added a beginner-safe Turkish demo-recording guide.
- Simplified public lineage wording to “Universal Agent OS family.”
