# Workflow: Evidence-First Delivery

Design evidence at the same time as the implementation plan.

## Before editing

For each requirement, define the observable proof, command or inspection method,
expected artifact, and honest fallback if the check cannot run. Add the mapping to
the traceability matrix before claiming coverage.

## During work

- Keep evidence close to the requirement it supports.
- Record exact commands and outcomes; do not reconstruct them from memory.
- Separate static inspection, executable tests, human review, and simulated proof.
- Append changed files and validation events to the Flight Recorder.
- When a command fails, retain the failure until a rerun produces new evidence.

## Evidence states

| State | Meaning |
| --- | --- |
| PASS | Required check ran or artifact was directly inspected and supports the claim |
| WARN | Evidence exists but a concern or limitation remains |
| FAIL | Required check ran and did not meet its acceptance condition |
| NOT_RUN | Relevant check did not run or could not run |
| SIMULATED | Result uses controlled demo or mock data and proves only that boundary |

Delivery is complete only to the extent demonstrated by the recorded evidence.
