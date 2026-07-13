# Privacy and Security

Codex Control Tower is local-first. Its core scan, health, doctor, context-graph, review-gate, mistake-shield, memory-lens, flight-recorder, evidence, demo, and dashboard workflows are designed to run without uploading a repository or requiring an OpenAI API key.

This is a product boundary, not a claim of formal security certification.

## Core privacy contract

- **No telemetry.** The project does not send usage events.
- **No analytics.** The dashboard does not load an analytics SDK or tracking pixel.
- **No source upload.** Core commands analyze the user-selected local target.
- **No API key required for the core demo.** InvoiceFlow Mini, scoring, reports, and dashboard are local.
- **Real Evidence Reconciliation is explicit.** `npm run demo:codex` sends only named fictional governed-fixture evidence to Codex through the user's signed-in ChatGPT subscription. It never starts silently.
- **Read-only model boundary.** The optional command invokes `gpt-5.6-sol` with a read-only workspace and saves prompt, events, structured response, model, access type, and timestamps locally.
- **Reports stay local.** Output is written only to the requested target/output paths.
- **The user chooses what to share.** Devpost/evidence export creates local files; it does not submit or upload them.
- **No mandatory external CDN or hosted database.** The dashboard uses project dependencies and local report data.
- **Protected source repositories remain read-only.** They are never scan targets, generated-work targets, or runtime dependencies. See [Source Protection](SOURCE_PROTECTION.md).

## Local data flow

```text
user-selected target
  -> local scanner / scorer / context builders
  -> in-memory findings
  -> explicitly requested local JSON, JSONL, or Markdown output
  -> optional local dashboard display
  -> user-controlled sharing, if any
```

Control Tower may inspect filenames, paths, repository structure, package metadata, tests, plans, documentation, CI configuration, ownership hints, TODO/FIXME markers, risky-area names, and local governance/memory files. Depending on the report, selected paths, markers, or short contextual descriptions can appear in output.

## Write boundaries

Commands should follow least mutation:

| Command class | Expected behavior |
| --- | --- |
| Scan, health, doctor, context graph, status queries, and mistake checks | Read target data; write only when an explicit `--out` path is supplied. |
| Evidence and Devpost export | Create a new local output directory selected by the user; do not upload it. |
| Init | Add Control Tower governance surfaces inside the selected target; preserve unrelated application files. |
| Phase-0 | Write only `.controltower/phase0.json` and `plans/PHASE0_ALIGNMENT.md`; both include the generated mission prompt. Do not write implementation code. |
| Review Gate / Flight Recorder | Update only their declared `.controltower` state/log files in the selected target. |
| Demo | Operate only on controlled example/output directories and label generated data `SIMULATED`. |

Path checks reduce accidental writes, but this tool is not a sandbox for arbitrary plugins, dependencies, shell commands, or a malicious external agent. Review the target and output arguments before execution, especially around symlinks or shared directories.

## Secrets and sensitive output

The scanner is not a secret manager and should not be treated as one.

- Do not place API keys, access tokens, credentials, private deployment URLs, or customer data in Control Tower config, demo fixtures, recorder events, screenshots, or exported packs.
- Keep optional credentials in ignored environment variables, never committed files.
- Do not log environment-variable values or authorization headers.
- Review evidence and Devpost packs before sharing; paths, package names, risk markers, plan text, and architecture details can still be sensitive even without full source code.
- A risk finding that points to a suspected secret is not proof that the value has been redacted from every user-authored file.
- If a secret is discovered, revoke/rotate it using the owning service; deleting a local report is not remediation.

The deterministic core does not require a networked model. Evidence Reconciliation is an explicit second step, discloses that named target evidence leaves the machine for Codex, has no silent network fallback, and keeps model output distinguishable from locked deterministic results. Users should run it only on content they are permitted to send to their signed-in ChatGPT workspace; the official demo uses only fictional InvoiceFlow Mini data.

## Review Gate security boundary

The Review Gate is a collaboration control, not an identity provider:

- gate state is stored in a local file;
- it can make an expected approval visible to Codex and to the dashboard;
- it does not authenticate the approver;
- it is not signed or tamper-evident;
- it does not provide operating-system enforcement;
- an agent or process with filesystem write access can alter it.

Use repository permissions, protected branches, code review, CI, and organizational identity controls for real authorization. Signed gates and team identity integration are roadmap work.

## Flight Recorder and evidence integrity

Plain JSONL and Markdown make records inspectable but do not make them immutable. A recorder entry proves only what the local workflow recorded; it does not independently attest that an arbitrary external command ran or that its output was complete. Evidence consumers should check command, timestamp, target, exit status, artifact path, and provenance. Missing proof must remain `NOT_RUN`, not `PASS`.

For stronger assurance, use version control, CI logs, signed commits/artifacts, branch protection, and independent test reruns. A future version may add hashes or signatures, but the Build Week version does not claim a tamper-proof ledger.

## Dependency and browser considerations

- Install dependencies from the lockfile and review dependency changes.
- Run the dashboard on the local development server; do not expose it to an untrusted network without separate hardening.
- Treat imported report JSON as untrusted data and render it as text, not executable markup.
- Do not add remote scripts, fonts, analytics, or images to the core dashboard.
- Generated Markdown/JSON should not be treated as shell commands without user review.

## Demo and source safety

InvoiceFlow Mini is controlled **SIMULATED DEMO DATA**. It must contain no real customer, payment, authentication, invoice, or personal data. The intentionally risky auth/payment examples exist only to trigger local governance findings and are not deployable guidance.

The four lineage repositories were researched through public, read-only web access. No source code, screenshots, credentials, endpoints, or private evidence was imported. Competition placement claims are not used without authoritative verification.

## Before sharing an export

- [ ] Confirm the target was the intended repository.
- [ ] Remove secrets, tokens, internal hostnames, customer data, and private absolute paths.
- [ ] Confirm every simulated item is labeled `SIMULATED`.
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
