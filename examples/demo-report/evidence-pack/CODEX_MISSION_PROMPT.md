# Codex Control Tower Mission

Target repository: .\examples\demo-workspace
Mission goal: Add the smallest governance surfaces and tests needed for an auditable handoff.
Review gate: APPROVED (scoped)
Review gate scope: Install and record Control Tower governance surfaces in the controlled demo workspace.
Mistake Shield: CAUTION

## Detected risks
- [CRITICAL] Evidence report has no substantial proof boundary
- [HIGH] Tests are missing or only placeholders
- [HIGH] Architecture documentation is missing
- [MEDIUM] 6 TODO/FIXME marker(s) detected
- [HIGH] README is missing, tiny, or marked stale
- [CRITICAL] Risky authentication logic detected
- [CRITICAL] Risky payment state logic detected

## Missing surfaces
- docs/ARCHITECTURE.md
- working tests
- evidence-backed docs/EVIDENCE_REPORT.md

## Allowed files
- .codex/**
- .controltower/**
- plans/**
- docs/**
- TECH_DEBT_AND_SECURITY.md

## Forbidden actions
- Do not delete tests, history, user data, or unrelated legacy code.
- Do not overwrite existing files without a backup and explicit need.
- Do not push, publish, deploy, or upload source unless the APPROVED scoped Review Gate explicitly authorizes the exact action and destination. Never expose secrets.
- Do not expand scope beyond the mission or bypass a non-approved review gate.
- Review Gate forbids: delete tests
- Review Gate forbids: change auth behavior
- Review Gate forbids: change payment behavior
- Review Gate forbids: write outside the demo workspace
- Do not touch without approval: Authentication token semantics and payment settlement behavior without explicit approval.

## Required evidence
- Changed files, exact commands, test output, traceability, NOT_RUN gates, and remaining risks.
- List every changed file and every command actually run.
- Attach concrete output or artifact paths for every PASS claim.
- Keep WARN, FAIL, NOT_RUN, and SIMULATED labels visible.

## Tests to run
- Run the repository test command discovered in package metadata.

## Documentation to update
- README.md when behavior or commands change
- docs/EVIDENCE_REPORT.md
- docs/TRACEABILITY_MATRIX.md
- docs/NOT_RUN_GATES.md

## Execution contract
You are Codex working under Codex Control Tower. Fix only the listed gaps. Read instructions and plans before editing. Stop before risky implementation unless the local gate is APPROVED, fully scoped, and the proposed action stays within that scope. PASS requires evidence; an edited file is not a validated file. If a check cannot run, label it NOT_RUN and explain why.

## Final response format
1. Summary
2. Changed files
3. Commands and evidence with PASS/WARN/FAIL/NOT_RUN/SIMULATED
4. Review gate and Mistake Shield state
5. Remaining risks
6. Next safe action
