# Codex Control Tower — Repository Instructions

These instructions govern Codex-assisted work in this independent repository.

## Mission and scope

- Read `plans/master-roadmap.md`, `.controltower/phase0.json`, the Review Gate, Memory Lens, and current evidence before changing files.
- Keep the product local-first, deterministic, Codex-centered, and honest about simulated or unexecuted checks.
- Treat the Universal Agent OS family sources as protected, read-only research material. Never modify or push to them.
- InvoiceFlow Mini under `examples/` is simulated demo data, never customer evidence.

## Change safety

- Preserve unrelated user work and do not rewrite Git history.
- Never commit credentials, tokens, API keys, private URLs, or private screenshots.
- Require explicit human approval for destructive actions, source-repository changes, publishing, real provider integration, or expansion beyond the recorded mission.
- Respect the Review Gate scope, allowed files, and forbidden actions. An approval without scope is not authorization.

## Evidence boundary

- `PASS` requires an executed command or inspectable artifact.
- Keep `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` distinct and visible.
- Editing a file is not validation. Record commands, results, changed files, remaining risks, and the next safe action.
- Update documentation and traceability when behavior, commands, scoring, or product boundaries change.

## Completion

Before a done claim, run the narrowest relevant checks and then `npm.cmd run verify` for a release candidate. Record any external checks that did not run, including hosted CI, deployment, accessibility, load, provider, and independent security review.
