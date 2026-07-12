# Codex Control Tower Adapter for GitHub Copilot

Follow the repository's Control Tower artifacts before suggesting or applying code.

- Read `.controltower/phase0.json`, `plans/master-roadmap.md`, architecture docs,
  memory rules, and the Review Gate.
- Keep suggestions inside the approved mission and named files.
- Ask for human review before destructive, security-sensitive, payment, migration,
  dependency, network, secret, or deployment work.
- Preserve unrelated changes and existing evidence history.
- Pair behavior changes with focused tests and synchronized documentation.
- Treat `PASS`, `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` as distinct states.
- Never claim an unavailable command or integration ran.
- Record verification commands, outcomes, remaining risks, and the next safe action
  in the repository's evidence and flight-recorder surfaces.

This adapter provides workflow guidance; it does not replace repository policy or
human approval.
