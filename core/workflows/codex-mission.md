# Workflow: Codex Mission

Use this workflow to turn repository context into one bounded, reviewable Codex run.

## 1. Establish context

- Identify the target repository and active governance profile.
- Read Phase-0 answers, plans, architecture, evidence, memory, and gate state.
- Inspect current changes and list risky or missing surfaces.

## 2. Define the mission

The generated prompt must state:

- goal, audience, and success criteria;
- exact allowed files and explicitly forbidden areas;
- known risks and applicable minefield lessons;
- required tests, documentation, and evidence artifacts;
- destructive actions that are never implied;
- relevant `NOT_RUN` gates and review status;
- the required final response fields and next safe action.

## 3. Check authority

Planning and read-only inspection may proceed locally. Risky implementation may
proceed only when the local Review Gate is `APPROVED` for the same scope. A stale,
missing, or narrower approval returns the mission to human review.

## 4. Execute and record

Keep changes bounded. Append material events to the Flight Recorder. After each
verification command, record command, exit outcome, evidence location, and status.

## 5. Close honestly

Apply the closure check. Do not collapse `WARN`, `FAIL`, `NOT_RUN`, or `SIMULATED`
into success. Produce a reviewable handoff and exactly one next safe mission.
