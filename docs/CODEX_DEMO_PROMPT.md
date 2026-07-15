# Codex Desktop Demo Prompt

Create a clean Codex desktop task named **Demo Blind Audit** for this repository. During the video, paste the instruction below into that task. This lets judges see Codex launch the product's real GPT-5.6 path while the long primary build conversation and private `/feedback` identity stay off camera.

```text
Without editing any files, run `npm run demo:codex` for this project.

Keep the GPT-5.6 run read-only. Use the product's real Blind Semantic Audit; do not run a substitute command and do not turn a failure into simulated success.

When the command completes, report:
- the exact model and audit mode;
- confirmation that the model workspace was empty and ephemeral, user/project instructions and web access were disabled, and the accepted event stream contained no tool events;
- confirmation that the reconciler's locked claim-status fields, deterministic verdict, and expected comparison classes were withheld from GPT-5.6;
- the deterministic local verdict and the separate model verdict;
- SUPPORTS, CONTRADICTS, and INSUFFICIENT counts;
- whether HUMAN REVIEW REQUIRED was raised and which claim caused it;
- the preserved NOT_RUN count;
- evidence freshness and the bundle hash;
- counter-evidence, missing evidence, and the recommended next action for MISSION_CHANGE_TEST_ALIGNMENT;
- any filtered unsupported citation paths;
- and the evidence-record path.

If the command fails or the model is unavailable, show the real failure and stop. Do not edit the evidence, dashboard, reports, or source files.
```

## What this proves—and what it does not

- It proves that Codex desktop received the instruction and launched the repository's real `npm run demo:codex` workflow.
- That workflow verifies the signed-in ChatGPT session, invokes pinned Codex CLI and `gpt-5.6-sol` with medium reasoning in an empty ephemeral read-only workspace, rejects any tool/unknown/failed/malformed event, validates evidence-bearing structured output, and records provenance.
- GPT-5.6 receives neutral claims and bounded raw evidence while the reconciler's locked claim-status fields and expected comparison classes are withheld. Raw evidence can contain status labels as material under audit.
- `SUPPORTS`, `CONTRADICTS`, and `INSUFFICIENT` remain model opinions. When an assessment conflicts with the hidden local comparison policy, reconciliation can raise advisory `HUMAN_REVIEW_REQUIRED`; the flag cannot change locked local facts or the human Review Gate. `CONTRADICTS` alone is not always a conflict, and compatible uncertainty is not overstated as agreement.
- The mission-alignment local PASS shown after reconciliation is a structural precheck, not a deterministic claim that semantic coverage is true.
- The controlled semantic challenge's raw evidence naturally contains the mission/evidence gap, but the prompt does not label it as a challenge, direct the model to it, disclose the expected class, or force a result.
- It does not prove that GPT-5.6 created the prepared InvoiceFlow Mini snapshots, changed the score from 25 to 88, or validated production readiness.
- It does not make GitHub Pages live. Pages shows the recorded exhibit; the local workbench shows the fresh run transition.

Do not use this short demo task to obtain `/feedback`. The real private Session ID comes from the primary Codex build task and belongs only in the Devpost form.
