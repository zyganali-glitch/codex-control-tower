# Workflow: Closure Check

Run this checklist before reporting a Codex mission as complete.

## Scope and change review

- [ ] The delivered behavior maps to an approved requirement and plan item.
- [ ] Changed files are inside the allowed scope.
- [ ] Unrelated user changes were preserved.
- [ ] No hidden dependency, network, deployment, or destructive action occurred.

## Evidence review

- [ ] Every `PASS` row cites an actual command, assertion, or inspected artifact.
- [ ] Failed checks remain `FAIL`; concerns remain `WARN`.
- [ ] Relevant skipped checks are listed as `NOT_RUN` with reasons.
- [ ] Demo or mock results are labeled `SIMULATED`.
- [ ] Test and tool output is not invented or inferred from edited code.

## Continuity review

- [ ] Traceability links requirements, plan, implementation, tests, and docs.
- [ ] Architecture and README match changed behavior.
- [ ] Flight Recorder includes files, commands, results, risk, and next action.
- [ ] Memory Lens and Mistake Shield reflect any new lesson or minefield.
- [ ] Review Gate state is visible and still matches delivered scope.

If any required item is absent, report `WARN`, `FAIL`, or `NOT_RUN` rather than a
blanket completion claim.
