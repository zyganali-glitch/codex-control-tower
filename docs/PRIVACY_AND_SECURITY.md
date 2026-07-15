# Privacy and Security

Codex Control Tower is local-first. Its core scan, health, doctor, context-graph, review-gate, mistake-shield, memory-lens, flight-recorder, evidence, demo, and dashboard workflows are designed to run without uploading a repository or requiring an OpenAI API key.

This is a product boundary, not a claim of formal security certification.

## Core privacy contract

- **No telemetry.** The project does not send usage events.
- **No analytics.** The dashboard does not load an analytics SDK or tracking pixel.
- **No source upload.** Core commands analyze the user-selected local target.
- **No API key required for the core demo.** InvoiceFlow Mini, scoring, reports, and dashboard are local.
- **Real Blind GPT-5.6 Semantic Audit is featured and explicit opt-in.** `npm run demo:codex` sends only the displayed bounded evidence bundle to Codex through the user's signed-in ChatGPT subscription. It never starts silently.
- **Mechanically isolated model boundary.** The command invokes pinned Codex CLI `0.144.3` and `gpt-5.6-sol` with medium reasoning from a newly created empty, ephemeral, read-only workspace. User configuration, project rules/instructions, web search, inherited subprocess environment, and approval escalation are disabled.
- **Fail-closed event and output validation.** Command, file, MCP, web-search, plan, unknown, failed, or malformed events reject the run. Decisive assessments require allowed citations; contradiction requires counter-evidence and insufficiency requires missing evidence. Only a validated response reaches reconciliation.
- **Blind reconciliation target.** The model receives neutral claims and raw evidence, which can contain evidence-state words, but not the reconciler's locked claim-status fields or expected comparison classes.
- **No model authority.** A policy conflict can set advisory `HUMAN_REVIEW_REQUIRED`; model output never changes the local status, verdict, next action, or Review Gate.
- **Local reports stay local by default.** Output is written only to requested target/output paths unless the user deliberately commits or shares it. The public GitHub Pages exhibit contains a sanitized committed snapshot.
- **The user chooses what to share.** Devpost/evidence export creates local files; it does not submit or upload them.
- **No mandatory external CDN or hosted database.** The dashboard uses project dependencies and local report data.
- **Universal Agent OS family sources remain read-only.** They are never scan targets, generated-work targets, or runtime dependencies. See [Source Protection](SOURCE_PROTECTION.md).

## Local data flow

```text
user-selected target
  -> local scanner / scorer / context builders
  -> in-memory findings
  -> explicitly requested local JSON, JSONL, or Markdown output
  -> local dashboard display
  -> user-controlled sharing, if any
```

Control Tower may inspect filenames, paths, repository structure, package metadata, tests, plans, documentation, CI configuration, ownership hints, TODO/FIXME markers, risky-area names, and local governance/memory files. Depending on the report, selected paths, markers, or short contextual descriptions can appear in output.

## Write boundaries

Commands should follow least mutation:

| Command class | Expected behavior |
| --- | --- |
| Scan, health, doctor, context graph, status queries, and mistake checks | Read target data; write only when an explicit `--out` path is supplied. |
| Evidence and secondary Devpost export | Create a new local output directory selected by the user; do not upload it. |
| Init | Add Control Tower governance surfaces inside the selected target; preserve unrelated application files. |
| Phase-0 | Write only `.controltower/phase0.json` and `plans/PHASE0_ALIGNMENT.md`; both include the generated mission prompt. Do not write implementation code. |
| Review Gate / Flight Recorder | Update only their declared `.controltower` state/log files in the selected target. |
| Demo | Operate only on controlled example/output directories; separate fictional sample content from real scan/test/model execution. |
| Codex review | Write declared `.controltower` evidence/reconciliation files, create an empty temporary model workspace, invoke the bounded model step only after explicit opt-in, reject any tool event, then delete the temporary workspace. |

Path checks reduce accidental writes, but this tool is not a sandbox for arbitrary plugins, dependencies, shell commands, or a malicious external agent. Review the target and output arguments before execution, especially around symlinks or shared directories.

## Secrets and sensitive output

The scanner is not a secret manager and should not be treated as one.

- Do not place API keys, access tokens, credentials, private deployment URLs, or customer data in Control Tower config, demo fixtures, recorder events, screenshots, or exported packs.
- Keep credentials in ignored environment variables or the official signed-in Codex session, never committed files.
- Do not log environment-variable values or authorization headers.
- Review evidence and Devpost packs before sharing; paths, package names, risk markers, plan text, and architecture details can still be sensitive even without full source code.
- A risk finding that points to a suspected secret is not proof that the value has been redacted from every user-authored file.
- If a secret is discovered, revoke/rotate it using the owning service; deleting a local report is not remediation.

The deterministic core does not require a networked model. Blind GPT-5.6 Semantic Audit is a featured explicit step, discloses that the bounded evidence bundle leaves the machine for Codex, has no silent network fallback, and keeps `modelVerdict` / `modelSummary` / `modelNextSafeAction` distinguishable from locked states, `reconciliation.deterministicVerdict`, and the local `nextSafeAction`. The empty workspace prevents repository browsing, but the disclosed bundle itself still leaves the machine. Users should run it only on content they are permitted to send to their signed-in ChatGPT workspace; the official demo bundle uses only fictional InvoiceFlow Mini content.

Raw evidence may naturally state PASS, FAIL, or NOT_RUN. Those are part of the material being challenged, not the hidden comparison target. The prompt withholds the reconciler's locked claim-status fields and expected assessment classes; local code applies that policy only after it validates the response.

## Review Gate security boundary

The Review Gate is a collaboration control, not an identity provider:

- gate state is stored in a local file;
- it can make an expected approval visible to Codex and to the dashboard;
- it does not authenticate the approver;
- it is not signed or tamper-evident;
- it does not provide operating-system enforcement;
- an agent or process with filesystem write access can alter it.

Use repository permissions, protected branches, code review, CI, and organizational identity controls for real authorization. Signed gates and team identity integration are roadmap work.

CCT does not replace ESLint, CI, code review, or branch protection. It adds the evidence and handoff layer around agent-assisted work.

## Flight Recorder and evidence integrity

Plain JSONL and Markdown make records inspectable but do not make them immutable. Reconciliation now records SHA-256 full-file and exact included-content digests, the final bundle digest, base Git commit and bounded worktree state when available, the command, and report freshness; these expose accidental or later changes but are not signatures or independent attestation. Evidence consumers should check command, timestamp, target, exit status, artifact path, digest scope, and provenance. Missing proof must remain `NOT_RUN`, not `PASS`.

For stronger assurance, use version control, CI logs, signed commits/artifacts, branch protection, and independent test reruns. The current hashes are tamper-evident comparison aids, not signed identity or a tamper-proof ledger.

## Dependency and browser considerations

- Install dependencies from the lockfile and review dependency changes.
- Run the dashboard on the local development server; do not expose it to an untrusted network without separate hardening.
- Treat imported report JSON as untrusted data and render it as text, not executable markup.
- Do not add remote scripts, fonts, analytics, or images to the core dashboard.
- Generated Markdown/JSON should not be treated as shell commands without user review.

## Demo and source safety

InvoiceFlow Mini is a **FICTIONAL SAMPLE PROJECT**. It must contain no real customer, payment, authentication, invoice, or personal data. The prepared snapshots and intentionally risky auth/payment examples exist only to trigger reproducible local governance findings and are not deployable guidance. Real scans, two focused fixture tests, evidence hashing, and GPT-5.6 reconciliation are labeled separately as REAL EXECUTION.

The Universal Agent OS family was researched through public, read-only web access. No source code, screenshots, credentials, endpoints, or private evidence was imported. Competition placement claims are not used without authoritative verification.

## Before sharing an export

- [ ] Confirm the target was the intended repository.
- [ ] Remove secrets, tokens, internal hostnames, customer data, and private absolute paths.
- [ ] Confirm fictional sample content and real execution are explicitly separated.
- [ ] Confirm unavailable checks remain `NOT_RUN`.
- [ ] Confirm no protected-source screenshot, asset, or copied code is included.
- [ ] Confirm the recipient is authorized to see plans, risks, filenames, and architecture details.
- [ ] Rerun the relevant tests independently when the consequence is material.

## Related reading

- [README](../README.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Limitations](LIMITATIONS.md)
- [Evidence and feature lineage](FEATURE_HARVEST.md)
