# Technical Debt and Security Quarantine

Codex Control Tower is a new independent repository, but release and scanner surfaces still require brownfield-style caution because they traverse arbitrary local files and publish evidence.

## Quarantined areas

- Filesystem traversal, symlink handling, generated-output isolation, and configured excludes require focused tests before behavioral changes.
- Git publication, history rewriting, dependency changes, and workflow permissions require explicit human scope.
- Real authentication, payment providers, credentials, external APIs, telemetry, and source upload are outside the competition build.
- The deliberately risky auth/payment code under `examples/` is simulated fixture data and must not be reused as production logic.

## Approval and evidence requirements

Destructive work, protected-source changes, real provider integration, and publication outside the recorded repository are blocked without a new scoped Review Gate. Security claims require executed checks; local heuristics do not replace independent review, and unrun external checks remain `NOT_RUN`.
