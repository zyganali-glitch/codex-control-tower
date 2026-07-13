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

The final Build Week hardening series adds:

- deterministic claim generation before any model call;
- real GPT-5.6 Evidence Reconciliation rather than an unbounded general review;
- local rejection of missing, duplicate, status-injecting, execution-claiming, or malformed model output;
- preservation of deterministic PASS, WARN, FAIL, NOT_RUN, and SIMULATED states;
- an evidence-agreement/disagreement dashboard;
- a GitHub Pages judge-demo workflow;
- explicit judge testing, platform, video, user-validation, and `/feedback` guidance;
- a shorter competition video path centered on the product's main loop.

The main hardening implementation is commit `034d53ff21c65323823e2693f9aed39374f83185` (`feat: add locked GPT-5.6 evidence reconciliation`). Git history remains the source of truth for exact timestamps and diffs.

## What judges should evaluate as new work

The Build Week contribution is not merely the existence of a deterministic scanner. The new work makes Codex and GPT-5.6 inspectable participants in the product:

1. Control Tower locks claims and statuses from local repository evidence.
2. Real GPT-5.6 audits those claims against named files in a read-only Codex run.
3. A deterministic reconciler rejects unsafe model output and preserves the original evidence states.
4. The dashboard exposes agreement, disagreement, missing proof, rejected citations, and the next safe action.
5. A human Review Gate remains the authority boundary.

## Verification sources

- `git show --stat 97b9e96`
- `git show --no-patch --format=fuller 22365dc`
- `git show --no-patch --format=fuller 97b9e96`
- [Codex Build Log](CODEX_BUILD_LOG.md)
- `.controltower/DETERMINISTIC_CLAIMS.json` in the governed fixture
- `.controltower/codex-live-review-record.json` in the governed fixture
- GitHub Actions history for the public repository

No `/feedback` Session ID is invented or stored here. The entrant must obtain it from the primary Codex build thread and paste it into the private Devpost submission field.
