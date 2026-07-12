# Root Repository Technical Debt Delta

Status: **WARN** — release-preflight debt is visible and bounded.

## Reduced now

- Fixed implicit simulated-mode inference that could label a real repository as demo data merely because README discussed the demo.
- Added configured scan exclusions so deliberately risky fixtures do not contaminate the product's own risk report while remaining directly scannable.
- Replaced broad stale/TODO substring checks with explicit markers to reduce self-referential false positives.
- Added root mission, Review Gate, evidence, traceability, NOT_RUN, memory, mistake, and flight records.
- Added regression assertions for root scan mode, fixture isolation, stale README behavior, and minimum governed score.

## Remaining risk and debt

- Scanner rules remain heuristic and can still produce false positives or false negatives.
- Review Gate approval is local and unsigned; identity is not cryptographically verified.
- Codex build provenance is documented but not yet a standardized signed session receipt.
- No PR/MR integration, Codex hook/plugin packaging, real user validation, or hosted team workflow exists.
- Final competition screenshots/video and official rule review are pending.

These items remain roadmap work; none is silently promoted to `PASS`.
