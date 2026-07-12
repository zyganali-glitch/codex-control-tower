# Honest Limitations

Codex Control Tower is an evidence and workflow layer for Codex-assisted development. It improves visibility and handoff quality; it does not guarantee correctness, safety, compliance, or successful delivery.

## Current boundaries

| Area | Limitation | Honest interpretation |
| --- | --- | --- |
| Scanner | Findings are filename, structure, marker, metadata, and document heuristics. False positives and false negatives are possible. | A finding is a review lead, not proof of a defect. |
| Health score | Weights are product-defined and calibrated for useful comparison, including the controlled demo. They are not an industry standard, probability of success, or certification. | Use category detail and evidence, not the number alone. |
| Code correctness | Control Tower does not prove business logic, security, performance, accessibility, data integrity, or production readiness. | Relevant tests, review, and domain validation remain required. |
| Tests | The scanner can detect test surfaces and record commands, but presence or a passing exit code does not establish complete coverage. | Inspect what ran, scope, output, and omitted cases. |
| Context Graph / Trace | The graph is a local static approximation. It may miss runtime coupling, reflection, generated code, external services, cross-repository dependencies, or unrecorded work. | It is not GitLab Orbit or a full semantic code graph. |
| Blast radius | Local references, plans, owners, tests, and risk markers are incomplete proxies for impact. | Treat blast-radius findings as prompts for review, not exhaustive dependency proof. |
| Mission Prompt | A bounded prompt can reduce ambiguity but cannot force an external Codex session to obey it. | Filesystem, branch, CI, and human controls still matter. |
| Review Gate | Gate state is a local, unsigned file. It does not authenticate an approver or enforce enterprise policy. | It is a visible collaboration checkpoint, not identity verification. |
| Mistake Shield | Verdicts rely on available minefield rules and deterministic matching. Paraphrases or novel risks may be missed; broad words may overmatch. | `CLEAR` means no configured rule matched, not “safe.” |
| Memory Lens | It can only analyze memory/lesson surfaces present in the repository. Those documents may be stale, incomplete, contradictory, or themselves unsafe. | Review selected memory before trusting it. |
| Flight Recorder | JSONL is inspectable but mutable. Events can be omitted by tools that do not use the recorder. | It is not a tamper-proof black box or compliance ledger. |
| Evidence Pack | Evidence is limited to artifacts and command results the workflow can observe. It cannot validate an unsupported external claim. | Missing provenance stays `NOT_RUN`; a report is not independent attestation. |
| Review status | `PASS` means the declared check produced supporting evidence in this run; it does not imply all relevant checks passed. | Read check scope and artifact paths. |
| Dashboard | The UI visualizes report data; it does not create stronger proof than the underlying files. | A polished card is not an additional validation step. |
| Privacy | Core processing is local, but generated reports can contain sensitive paths, plans, markers, or architecture details. Automatic redaction is not guaranteed. | Review every export before sharing. |
| Security enforcement | Safe path handling reduces accidental writes but is not an OS sandbox, policy engine, malware scanner, or secret manager. | Use normal repository and operating-system security controls. |
| Team workflows | No hosted synchronization, enterprise RBAC, signed approvals, cross-repo view, or automatic PR/MR comments are included. | These are future integrations, not hidden features. |
| AI/cloud review | No OpenAI API or other model is required or used for the deterministic core. | Optional OpenAI-powered review is future, explicit opt-in work. |
| Localization | The Phase-0 wizard supports English and Turkish as required. The main Build Week README, dashboard, CLI narrative, and Devpost materials are English. | This is bilingual alignment, not full multilingual localization. |

## Demo boundary

InvoiceFlow Mini is **SIMULATED DEMO DATA** created for a controlled three-minute before/after demonstration. It is not a real customer repository, payment product, authentication reference, benchmark corpus, or production sample.

- The messy repository intentionally contains weak tests, stale docs, TODO/FIXME markers, and risky auth/payment examples.
- The governed repository demonstrates improved governance surfaces; it does not prove that every application risk is remediated.
- Before/after score targets demonstrate scorer behavior and are not customer impact metrics.
- Any command or gate not executed during the demo must remain `NOT_RUN`.

## Lineage and claim boundary

The four protected Universal Agent OS repositories were studied for concepts only and were not modified or used as demo targets. Source-authored statements about their deployments, test counts, integrations, or readiness were not independently rerun for this project. The reported second-place result for the GitLab edition was not confirmed by an authoritative results page during research, so Codex Control Tower makes no award claim.

## What still requires human judgment

- Approving destructive changes, auth/payment/security work, dependency upgrades, releases, or edits outside the agreed scope.
- Deciding whether a finding is relevant and whether the score threshold is appropriate for the project.
- Reviewing the exact diff and rerunning material checks in a trusted environment.
- Confirming evidence provenance and deciding what can be shared.
- Resolving contradictory plans, ownership, memory, policy, or test signals.
- Determining regulatory, contractual, privacy, licensing, and security requirements.

## Roadmap, not current capability

- Optional OpenAI-assisted review with explicit data consent.
- GitHub/GitLab PR/MR and CI integrations.
- Stronger language-aware dependency and ownership analysis.
- Signed/tamper-evident gates and evidence.
- Team and cross-repository dashboards.
- MCP and multi-agent continuity.
- Full locale packs beyond English/Turkish Phase-0.

## Related reading

- [README](../README.md)
- [Privacy and Security](PRIVACY_AND_SECURITY.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
