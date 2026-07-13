# Codex Desktop Demo Prompt

Create a clean Codex desktop task named **Demo Reconciliation** for this repository and use this instruction there during the demo. The clean task avoids exposing the long primary build conversation while making Codex visibly start the product's featured GPT-5.6 path read-only.

```text
Without editing any files, run `npm run demo:codex` for this project.

Keep the GPT-5.6 evidence review read-only. Do not run a substitute command and do not turn a failure into a simulated success.

When the command completes, report:
- the exact model;
- the deterministic local verdict;
- the separate model verdict;
- agreement and disagreement counts;
- the preserved NOT_RUN count;
- evidence freshness and the bundle hash;
- any filtered unsupported citation paths;
- and the evidence-record path.

If the command fails or the model is unavailable, show the real failure and stop. Do not edit the evidence, dashboard, reports, or source files.
```

## What this proves—and what it does not

- It proves that Codex desktop received the instruction and launched the repository's real `npm run demo:codex` workflow.
- That workflow verifies the signed-in ChatGPT session, invokes `gpt-5.6-sol` read-only, validates structured output, and records provenance.
- It does not prove that GPT-5.6 created the prepared InvoiceFlow Mini before/after snapshots or changed the score from 25 to 88.
- It does not make the static GitHub Pages exhibit live. The local dashboard shows the run transition.

Do not use this short demo task to obtain the submission `/feedback` Session ID. That private value must come from the separate primary build task where most development occurred, and it belongs only in the Devpost form.
