# Judge Test Path

This Developer Tools entry has a no-install public route and an optional full local route.

## Route A: no installation, about 30 seconds

Open the verified public exhibit:

**https://zyganali-glitch.github.io/codex-control-tower/**

1. Read **FICTIONAL SAMPLE PROJECT** and the separate **REAL EXECUTION** statement.
2. Inspect **Blind GPT-5.6 Semantic Audit**.
3. Confirm the page identifies real `gpt-5.6-sol`, the empty ephemeral/no-tool execution boundary, the blind reconciliation boundary, separate model/local verdicts, evidence provenance, and any HUMAN REVIEW REQUIRED flag.
4. Open **Safety Preflight**, where **Destructive Action Preflight** should show `recursive_delete`, `$HOME/..`, `<USER_HOME_PARENT>`, `BLOCKED`, `NOT_RUN`, and **ANALYSIS ONLY · NO COMMAND EXECUTED**.
5. Open **Before / After** for the deterministic `25 → 88` score and `16 → 1` risk comparison on prepared fictional snapshots.
6. Open **Evidence** and confirm unavailable checks remain NOT_RUN.

GitHub Pages is a static, sanitized, no-install exhibit. It does not scan a judge's repository, execute Codex in the browser, or show a new run from the entrant's computer. Use the [current Pages workflow history](https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/pages.yml) and moving `main` branch for the v0.2.0 candidate. The existing [openai-build-week-final](https://github.com/zyganali-glitch/codex-control-tower/tree/openai-build-week-final) tag is an untouched v0.1 baseline; v2 is pending the real public YouTube URL.

## What the exhibit proves

- The working dashboard can render the committed sanitized evidence record without installation.
- Deterministic scans really calculate the displayed fixture scores.
- Two focused Node.js fixture tests really ran on the governed prepared snapshot.
- A recorded real `gpt-5.6-sol` run reviewed bounded raw evidence from an empty ephemeral read-only workspace.
- Local code rejected tool/unknown/failed/malformed events, validated the evidence-bearing model result, and reconciled it without granting model authority over locked facts.
- The committed final record accepted 0 tool events, returned 3 SUPPORTS / 3 CONTRADICTS, aligned on five local comparison outcomes, raised one HUMAN REVIEW REQUIRED mission conflict, and preserved one locked NOT_RUN. Its local/model fixture verdicts are both honestly FAIL; the real invocation completed successfully.
- The preflight exhibit deterministically resolves a supported target against protected canonical boundaries, publishes only redacted paths, and keeps execution NOT_RUN.
- A separate real Codex hook verification denied a nonexistent harmless probe before execution. That proof is limited to matching supported `Bash` `PreToolUse`; sandboxing remained primary.

## What it does not prove

- InvoiceFlow Mini is not a customer project; its actors, records, approvals, and prepared snapshots are fictional.
- GPT-5.6 did not create the snapshots, calculate the scores, run the tests itself, or cause `25 → 88`.
- The exhibit is not production, provider, browser, load, accessibility, penetration, or independent security validation.
- A recorded model opinion is not third-party attestation.
- Destructive Action Preflight is not a general shell parser, OS firewall, malware detector, or replacement for the Codex sandbox, permissions, review, or CI.
- Official Codex `PreToolUse` coverage is incomplete; project trust, unsupported/nested commands, other tools, and hook failures remain outside the bounded denial proof.

## Route B: full local reproduction

Requirements:

- Node.js 18 or newer;
- internet for dependency installation;
- for the real model step, Codex desktop signed in to a ChatGPT account with `gpt-5.6-sol` access.

From the repository root:

```bash
npm install
npm run verify
npm run demo
npm run demo:safety
npm run dashboard
```

Expected deterministic result:

- browser opens the local workbench; do not open `apps/dashboard/index.html` directly;
- messy prepared snapshot: 25/100 and 16 risks;
- governed prepared snapshot: 88/100 and one remaining risk;
- two focused governed-fixture tests pass;
- browser/load/deployment/provider/independent-security gates remain NOT_RUN;
- Blind GPT-5.6 Semantic Audit begins at READY / NOT STARTED.
- the safety demo prints BLOCKED / NOT_RUN for `$HOME/..`, writes only a sanitized generated preflight JSON under `tmp/`, and executes no deletion command.

Keep the local workbench open. Create a clean **Demo Blind Audit** task for this repository in Codex desktop and paste [Codex Demo Prompt](CODEX_DEMO_PROMPT.md). Codex launches `npm run demo:codex` without editing files.

Expected model-path behavior:

- dashboard changes READY → RUNNING → COMPLETE, or preserves the real FAILED/BLOCKED result;
- exact `gpt-5.6-sol`, pinned Codex CLI, medium reasoning, signed-in ChatGPT access, empty ephemeral read-only workspace, no-tool event policy, and `REAL_CODEX_BLIND_SEMANTIC_AUDIT` are recorded;
- user/project configuration and instructions, web search, inherited subprocess environment, persistence, and approval escalation are disabled;
- any command, file, MCP, web-search, plan, unknown, failed, or malformed event rejects the run instead of producing accepted evidence;
- GPT-5.6 receives neutral claims and bounded raw evidence, while the reconciler's locked claim-status fields and expected comparison classes are withheld;
- assessments use `SUPPORTS`, `CONTRADICTS`, or `INSUFFICIENT`;
- decisive assessments require an allowed citation; contradiction requires counter-evidence and insufficiency requires missing evidence;
- citations, counter-evidence, missing evidence, and recommended next action are inspectable;
- unsupported citation paths are removed from accepted citations and separately recorded;
- the local deterministic verdict, local next safe action, evidence states, and Review Gate remain authoritative;
- an assessment that conflicts with the hidden local comparison policy can raise advisory `HUMAN_REVIEW_REQUIRED` without changing those facts; `CONTRADICTS` alone is not always a conflict, while compatible insufficiency is not overstated as agreement;
- mission-alignment local PASS is explicitly a structural precheck, not deterministic semantic truth;
- full-file SHA-256 hashes and exact included-content hashes, Git base commit, bounded worktree state, command provenance, and evidence freshness are recorded;
- preserved NOT_RUN remains visible.

The controlled `MISSION_CHANGE_TEST_ALIGNMENT` claim asks whether mission, change, tests, output, and evidence prove every Phase-0 criterion. The fictional fixture openly lacks proof of a durable local audit trail for rejected payment attempts. Raw records contain that information, but the prompt neither labels it as the challenge nor supplies the expected class; the real result must be shown as returned.

## Optional hook verification boundary

The repository includes a project `.codex/hooks.json` entry matching `^Bash$`. For supported parsed intent, BLOCKED returns the documented `PreToolUse` deny object; CAUTION only adds context because the event does not provide a forced-ask decision. The retained verification record uses:

- pinned Codex CLI `0.144.3` and exact `gpt-5.6-sol`;
- a read-only sandbox and no approval bypass;
- nonexistent harmless probe `cct-preflight-probe --operation recursive_delete --path $HOME/..`;
- a one-off vetted hook-trust bypass only for the probe;
- observed decision DENIED before execution, `NOT_RUN`, `executed: false`.

This is not normal setup proof. A normal project hook runs only after the project and hook configuration are trusted. The official hooks documentation states that interception is incomplete, and a hook command failure may allow the tool workflow to continue. Do not weaken sandbox or approval settings to use it.

## Evidence locations

- `examples/governed-saas-after/.controltower/DETERMINISTIC_CLAIMS.json`
- `examples/governed-saas-after/.controltower/EVIDENCE_BUNDLE.md`
- `examples/governed-saas-after/.controltower/CODEX_LIVE_REVIEW_PROMPT.md`
- `examples/governed-saas-after/.controltower/codex-live-review.json`
- `examples/governed-saas-after/.controltower/codex-live-events.jsonl`
- `examples/governed-saas-after/.controltower/codex-live-review-record.json`
- `examples/demo-report/governed-test-output.txt`

Current regenerated output is authoritative for a fresh checkout. The committed sample report is the Pages/public-exhibit snapshot and may represent an earlier recorded execution until the repository is regenerated and republished.

## Fallback

If Pages is temporarily unavailable, inspect [Judge: Start Here](../JUDGE_START_HERE.md), the public repository, and current workflow history, then use the local commands. The public YouTube URL and v2 tag/release remain PENDING until real. A failed model or safety run must remain failed; it must never be replaced with fictional success.
