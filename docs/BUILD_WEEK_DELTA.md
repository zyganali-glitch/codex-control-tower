# OpenAI Build Week Development Delta

Codex Control Tower had a working foundation before the OpenAI Build Week submission period. It is therefore entered as an existing project that was meaningfully extended with Codex and GPT-5.6 during the official submission period. This record separates the two scopes instead of presenting all repository history as competition-period work.

## Official timing boundary

- Submission period start: **2026-07-13 09:00 PDT** (`2026-07-13T16:00:00Z`, `2026-07-13 19:00 Europe/Istanbul`).
- Submission deadline: **2026-07-21 17:00 PDT** (`2026-07-22 00:00:00Z`, `2026-07-22 03:00 Europe/Istanbul`).
- Source: [OpenAI Build Week Official Rules](https://openai.devpost.com/rules).

## Before the submission period

The last pre-period foundation commit is:

| Commit | Time | Scope |
| --- | --- | --- |
| `22365dcdc33f0c533994d7c1a9d41d46122f138f` | `2026-07-12T23:54:27+03:00` | Existing CLI, deterministic repository analysis, fixtures, evidence artifacts, dashboard, tests, CI, and competition narrative foundation. |

This foundation is disclosed as prior work. It is not represented as having been created after the submission period opened.

## Meaningful extension inside the submission period

The first major in-period extension is:

| Commit | Time | New competition-period work |
| --- | --- | --- |
| `97b9e96672b114fd7756dc0516671ee73e098eea` | `2026-07-13T20:55:01+03:00` | Real ChatGPT-authenticated `gpt-5.6-sol` execution, read-only Codex command, model/catalog verification, structured output, provenance files, live dashboard state, English-only Phase-0 cleanup, updated demo, and additional tests. |

That commit changed 63 files, adding approximately 3,690 lines and removing approximately 746 lines. Its real model run was recorded separately from deterministic scoring.

The Build Week hardening series adds:

- target-derived deterministic claim generation before any model call;
- real GPT-5.6 reconciliation rather than an unbounded general review;
- local rejection of missing, duplicate, status-injecting, execution-claiming, or malformed model output;
- preservation of deterministic PASS, WARN, FAIL, NOT_RUN, and SIMULATED states;
- a deterministic local verdict plus separately labeled model opinion;
- semantic align/compatible/conflict relations rather than treating every non-SUPPORTS answer as disagreement or overstating uncertainty as agreement;
- SHA-256 bundle/file integrity, base-commit plus bounded-worktree context, and report freshness/staleness provenance;
- filtered and recorded unsupported citation paths;
- a Blind GPT-5.6 Semantic Audit dashboard with truthful READY/RUNNING/COMPLETE state;
- a GitHub Pages judge-demo workflow;
- explicit judge testing, platform, video, user-validation, and `/feedback` guidance;
- a shorter competition video path where a clean Codex desktop task visibly launches the product command;
- an explicit GitHub Pages static-exhibit versus local live-workbench boundary;
- a fictional-sample versus real-execution boundary that does not credit GPT-5.6 with the prepared `25 → 88` snapshot difference.

The final blind-audit redesign additionally adds:

- neutral claims and bounded raw evidence while withholding the reconciler's locked claim-status fields and expected comparison classes;
- `SUPPORTS`, `CONTRADICTS`, and `INSUFFICIENT` model assessments plus counter-evidence, missing evidence, and recommended next action;
- pinned Codex CLI `0.144.3`, medium model reasoning, and an empty ephemeral read-only workspace with user/project instructions, web search, subprocess environment inheritance, and approval escalation disabled;
- fail-closed JSONL event validation that rejects command, file, MCP, web-search, plan, failed, malformed, and unknown events before accepting model output;
- decisive-answer evidence rules: allowed citations for `SUPPORTS`/`CONTRADICTS`, counter-evidence for `CONTRADICTS`, and missing evidence for `INSUFFICIENT`;
- repository-independent `MISSION_CHANGE_TEST_ALIGNMENT` across Phase-0 mission, change evidence, test source/output, and evidence records;
- a controlled fictional-fixture gap whose raw records are visible but whose challenge role and expected class are not disclosed to the model;
- policy-based `HUMAN_REVIEW_REQUIRED`, where `CONTRADICTS` alone is not automatically conflict, `INSUFFICIENT` can be merely `COMPATIBLE`, mission `PASS` is labeled a structural precheck rather than semantic truth, and no model response changes locked facts;
- a judge-first README/Pages/video opening, frozen-version manifest, and `JUDGE_START_HERE.md` discovery path.

The initial locked-reconciliation implementation is commit `034d53ff21c65323823e2693f9aed39374f83185` (`feat: add locked GPT-5.6 evidence reconciliation`). Later in-period commits contain the blind-audit redesign and judge hardening. The frozen `openai-build-week-final` tag and Git history are the sources of truth for exact timestamps and diffs.

## What judges should evaluate as new work

The Build Week contribution is not merely the existence of a deterministic scanner. The new work makes Codex and GPT-5.6 inspectable participants in the product:

1. Control Tower derives neutral target-appropriate claims and independently locks structural/execution states plus the authoritative local verdict.
2. Real GPT-5.6 receives bounded raw evidence in an empty ephemeral read-only Codex workspace while user/project instructions, web access, and tool events are disabled and locked reconciliation targets/expected classes are withheld.
3. GPT-5.6 judges mission/change/test/evidence alignment and returns assessment, citations, counter-evidence, missing evidence, and a recommendation.
4. A deterministic reconciler rejects unsafe output, filters/records unsupported citations, applies hidden comparison policy, and raises human review on conflict without changing facts.
5. The dashboard exposes both layers, provenance, and missing proof; a human Review Gate remains authoritative.

## Verification sources

- `git show --stat 97b9e96`
- `git show --no-patch --format=fuller 22365dc`
- `git show --no-patch --format=fuller 97b9e96`
- [Codex Build Log](CODEX_BUILD_LOG.md)
- `.controltower/DETERMINISTIC_CLAIMS.json` in the governed fixture
- `.controltower/codex-live-review-record.json` in the governed fixture
- GitHub Actions history for the public repository

No `/feedback` Session ID is invented or stored here. For submission-readiness scoring, the real primary-task ID and under-three-minute video are treated as completed Devpost form assets. The private ID remains intentionally absent from the public repository.
