# Devpost Screenshots

Upload these sanitized 1920 × 1080 images in the order below. InvoiceFlow Mini is fictional; the scans, focused tests, recorded GPT-5.6 run, and analysis-only safety preflight are real controlled executions.

Companion video: [public 2:59 demo on YouTube](https://youtu.be/EvtguYLSNkg).

| Order | File | Devpost title | English caption |
| --- | --- | --- | --- |
| 1 | [`DEVPOST_01_GPT56_BLIND_AUDIT.png`](DEVPOST_01_GPT56_BLIND_AUDIT.png) | **Real Blind GPT-5.6 Evidence Audit** | Real GPT-5.6 Sol performs a blind semantic audit over bounded evidence without seeing the expected local statuses. Local facts remain locked, and a recorded disagreement triggers human review instead of letting the model overwrite the evidence. |
| 2 | [`DEVPOST_02_DESTRUCTIVE_PREFLIGHT_BLOCKED.png`](DEVPOST_02_DESTRUCTIVE_PREFLIGHT_BLOCKED.png) | **Destructive Action Blocked Before Execution** | On a controlled recursive-delete request, Destructive Action Preflight resolves `$HOME/..` to the protected `<USER_HOME_PARENT>` boundary and returns `BLOCKED`. The verified pre-tool hook denies the supported request, so execution remains `NOT_RUN` and no destructive command is executed. |
| 3 | [`DEVPOST_04_BEFORE_AFTER.png`](DEVPOST_04_BEFORE_AFTER.png) | **Controlled Before / After Comparison** | The same real scanner compares prepared snapshots of the same fictional InvoiceFlow Mini fixture: governance rises from 25 to 88, risks fall from 16 to 1, and evidence coverage reaches 88%. These are controlled demo snapshots—not production or customer outcomes. GPT-5.6 did not create this score change. |
| 4 | [`DEVPOST_03_EVIDENCE_BOUNDARY.png`](DEVPOST_03_EVIDENCE_BOUNDARY.png) | **Evidence States Stay Honest** | CCT keeps evidence states separate: 7 `PASS`, 1 `FAIL`, 5 `NOT_RUN`, and 1 `SIMULATED`. A claim becomes `PASS` only when recorded proof exists; unavailable checks remain visible instead of being silently promoted. |

## Upload notes

- Use image 1 as the Devpost cover image because it makes the real GPT-5.6 role immediately visible.
- Keep the captions with images 2–4 so judges do not confuse the fictional fixture with production evidence.
- Do not describe the 25 → 88 comparison as a GPT-5.6-generated improvement. It comes from two prepared snapshots scanned by the same deterministic tool.
- Do not crop away `BLOCKED`, `NOT_RUN`, `HUMAN REVIEW REQUIRED`, or the fictional/real disclosure banner.
