# Workflow: Codex Review Gate

The Review Gate is a local, file-based human decision. It is not enterprise identity
verification and does not silently authorize work outside its named scope.

## States

- `AWAITING_HUMAN`: proposal is ready; risky implementation must wait.
- `APPROVED`: the named scope, files, and actions may proceed.
- `REJECTED`: the proposal must not proceed; record the reason.
- `BLOCKED`: a policy or unresolved dependency prevents safe execution.

## Gate contents

Record status, mission summary, allowed files, forbidden actions, decision reason,
reviewer label, timestamp, and whether the record is simulated. Never place secrets
or personal credentials in the gate file.

## Enforcement

1. Compare proposed action and files with gate scope.
2. Treat missing, invalid, stale, or narrower approval as `AWAITING_HUMAN`.
3. Move the gate back to review when scope materially changes.
4. Append checks and transitions to the Flight Recorder.
5. Keep rejected and blocked reasons visible in the final handoff.
