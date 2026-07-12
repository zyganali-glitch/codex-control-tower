# Source Research Matrix

This is a read-only, concept-level research record for Codex Control Tower. Public repository pages, selected public files, and the official OpenAI Build Week pages were reviewed on 2026-07-12. No protected repository was modified, cloned into the active workspace, or used as demo data. See [Source Protection](SOURCE_PROTECTION.md).

## Competition reference: OpenAI Build Week

| Official source | Verified observation | Product implication |
| --- | --- | --- |
| [OpenAI Build Week](https://openai.com/build-week/) | OpenAI describes a week of building with Codex and invites projects built with Codex. The page lists challenge dates and says submissions should communicate the project and approach. | Make Codex participation visible, but make the delivered artifact independently runnable and understandable. |
| [OpenAI Build Week Devpost](https://openai.devpost.com/) | The public page accepts apps, agents, developer tools, and workflows. It lists technological implementation, design, potential impact, and quality of idea as judging criteria. | Ship a working developer tool with a coherent dashboard, a credible user problem, and a distinct Codex-native idea—not only governance prose. |
| [OpenAI Build Week FAQ](https://openai.com/build-week/#faq) | The official FAQ says a submission should include a project description, demo video, code repository, and any additional required materials. | Keep the demo, judging map, evidence, limitations, and repository narrative cross-linked and audit-friendly. |

These pages were still time-sensitive at review time. Dates, tracks, prizes, and submission details should be rechecked on the official pages before final submission.

## 1. Universal Agent OS

| Required field | Research finding |
| --- | --- |
| Source repo name | Universal Agent OS |
| Source URL | [GitHub repository](https://github.com/zyganali-glitch/Universal-Agent-OS) |
| Competition context | General donor/source-of-truth governance framework rather than the Codex Control Tower competition entry. The public README describes consultation-first governance for multiple coding agents. |
| Strongest reusable ideas | One-question-at-a-time Phase-0 alignment; plan-before-code; evidence-first closure; explicit honesty states; persistent project memory; English/Turkish locale support; agent adapters; brownfield handling; anti-monolith and TODO/FIXME warnings; governance profiles. |
| Files or surfaces worth studying | [README](https://github.com/zyganali-glitch/Universal-Agent-OS#readme), [`en/.codex/AGENTS.md`](https://github.com/zyganali-glitch/Universal-Agent-OS/blob/main/en/.codex/AGENTS.md), [`docs/INSTALLATION_MANIFEST.md`](https://github.com/zyganali-glitch/Universal-Agent-OS/blob/main/docs/INSTALLATION_MANIFEST.md), memory templates visible in the [repository tree](https://github.com/zyganali-glitch/Universal-Agent-OS), CLI/verification surfaces, tests, and VS Code workflow descriptions. |
| What to borrow conceptually | The sequence “align, plan, execute, prove,” visible `NOT_RUN` and simulated states, durable handoff context, profile-sensitive governance, and safe brownfield onboarding. |
| What **not** to copy directly | Donor rules/templates, registry hierarchy, adapter text, installer logic, README language, visual identity, screenshots, and the broad multi-agent product framing. |
| Codex-specific transformation | A small `cct` CLI scans an existing repository, produces a Codex Mission Prompt, records evidence and session events, and visualizes readiness. Phase-0 supports `en|tr`; the main competition README/dashboard remains English. |
| Originality risk | **High** if the result becomes another installed markdown rule pack or keeps donor terminology and file topology. **Controlled** by independent Node/React implementation, repo analysis, Codex-specific outputs, and a distinct simulated demo. |
| Final decision | **ADAPT** — use the workflow discipline only; exclude the donor implementation and product shell. |

## 2. Universal Agent OS for UiPath

| Required field | Research finding |
| --- | --- |
| Source repo name | Universal Agent OS for UiPath |
| Source URL | [GitHub repository](https://github.com/zyganali-glitch/universal-agent-os-uipath) |
| Competition context | A UiPath-focused competition prototype combining repository instructions, a coded connector, and UiPath orchestration. The README explicitly separates mock/offline surfaces from strict real tenant behavior. |
| Strongest reusable ideas | Human-in-the-loop approval; gate state verified from a system of record rather than chat; strict-real/mock disclosure; claim-to-evidence manifest; one-question beginner flow; four durable memory pillars; visible `AWAITING_HUMAN`, `APPROVED`, rejected, and blocked outcomes. |
| Files or surfaces worth studying | [README reality disclosure](https://github.com/zyganali-glitch/universal-agent-os-uipath#reality--demo-mode-disclosure), [`docs/evidence_manifest.md`](https://github.com/zyganali-glitch/universal-agent-os-uipath/blob/main/docs/evidence_manifest.md), [`backend/labs_smoke_test.py`](https://github.com/zyganali-glitch/universal-agent-os-uipath/blob/main/backend/labs_smoke_test.py), [`backend/phase0_interview.py`](https://github.com/zyganali-glitch/universal-agent-os-uipath/blob/main/backend/phase0_interview.py), [`uipath_project/workflows/`](https://github.com/zyganali-glitch/universal-agent-os-uipath/tree/main/uipath_project/workflows), and the public repository tree. |
| What to borrow conceptually | Approval is explicit state; evidence must identify its provenance; simulated behavior must remain visibly simulated; a beginner should not need architecture jargon before alignment. |
| What **not** to copy directly | UiPath connector/BPMN code, Action Center/Data Service schemas, cloud credentials/configuration, UiPath UI, screenshots, enterprise claims, or competition-specific identity. |
| Codex-specific transformation | A local JSON Review Gate, Evidence Boundary, Phase-0 files, and dashboard status panels. The local gate is intentionally described as file-based collaboration—not API-backed enterprise identity verification. |
| Originality risk | **Medium-high** if a local file is presented as “Action Center” or as enterprise-grade authorization. **Controlled** by distinct naming, honest enforcement limits, and no UiPath dependency. |
| Final decision | **ADAPT** — use evidence boundaries and gate-state semantics; exclude UiPath-specific runtime and branding. |

## 3. Universal Agent OS GitLab Edition

| Required field | Research finding |
| --- | --- |
| Source repo name | Universal Agent OS GitLab Edition |
| Source URL | [GitLab repository](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition) |
| Competition context | The README identifies it as a GitLab Transcend Hackathon Showcase entry centered on “Give AI true context,” GitLab Duo, Orbit, and reviewable GitLab artifacts. A [Devpost gallery listing](https://gitlab-transcend.devpost.com/project-gallery) confirms the project was submitted; no authoritative placement result was located in this review. |
| Strongest reusable ideas | Context before action; blast-radius thinking; overlapping-work detection; reviewable issues/MRs; refusal to invent unavailable tool results; approval before risky execution; metadata as a source of truth; concise, chaptered demo proof. |
| Files or surfaces worth studying | [README and demo walkthrough](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition/-/blob/main/README.md), [`tools/orbit_client.py`](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition/-/blob/main/tools/orbit_client.py), [`tools/orbit_cli.py`](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition/-/blob/main/tools/orbit_cli.py), [Orbit skills](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition/-/tree/main/skills), [demo screenshots](https://gitlab.com/zyganali/universal-agent-os-gitlab-edition/-/tree/main/media/screenshots), and [public tree API](https://gitlab.com/api/v4/projects/zyganali%2Funiversal-agent-os-gitlab-edition/repository/tree?recursive=true&per_page=100). |
| What to borrow conceptually | Make selected context and change risk explainable; identify overlapping plans/markers; keep generated work reviewable; say `NOT_RUN` or unavailable when a signal cannot be obtained. |
| What **not** to copy directly | Orbit GraphQL/client code, GitLab Duo/catalog metadata, fabricated sample graph output, GitLab-specific artifacts, screenshots, or claims that local static analysis is live Orbit data. |
| Codex-specific transformation | A deterministic local Context Trace over files, tests, plans, docs, ownership hints, TODO/FIXME markers, and risk areas; a Mission Prompt consumes that trace; the dashboard explains why each context item matters. |
| Originality risk | **High** if the product claims “Orbit” or live blast radius without remote graph evidence. **Controlled** by local-only terminology, heuristic disclosure, and explicit unavailable/`NOT_RUN` states. |
| Final decision | **ADAPT** — use context and reviewability principles; exclude platform-specific integration and unverified result claims. |

## 4. Universal Agent OS Qwen Edition

| Required field | Research finding |
| --- | --- |
| Source repo name | Universal Agent OS — Qwen Cloud MemoryAgent Edition |
| Source URL | [GitLab repository](https://gitlab.com/zyganali/universal-agent-os-qwen) |
| Competition context | The README presents a Qwen Cloud MemoryAgent hackathon entry with a persistent memory layer, hybrid retrieval, a static workbench, and cloud-backed model/embedding modes. |
| Strongest reusable ideas | Explainable selection; keyword/semantic/freshness/importance signals; context budgets; selected and omitted context reasons; memory timeline and analytics; confidence-gated extraction; duplicate/cross-pillar checks; `CLEAR`/`CAUTION`/`BLOCKED`; baseline comparison; honesty report. |
| Files or surfaces worth studying | [README](https://gitlab.com/zyganali/universal-agent-os-qwen/-/blob/main/README.md), [`docs/architecture.md`](https://gitlab.com/zyganali/universal-agent-os-qwen/-/blob/main/docs/architecture.md), [`docs/evidence_manifest.md`](https://gitlab.com/zyganali/universal-agent-os-qwen/-/blob/main/docs/evidence_manifest.md), [`frontend/index.html`](https://gitlab.com/zyganali/universal-agent-os-qwen/-/blob/main/frontend/index.html), [`backend/ranker.py`](https://gitlab.com/zyganali/universal-agent-os-qwen/-/blob/main/backend/ranker.py), memory/mistake/honesty modules visible in the [public tree API](https://gitlab.com/api/v4/projects/zyganali%2Funiversal-agent-os-qwen/repository/tree?recursive=true&per_page=100). |
| What to borrow conceptually | Context selection should be bounded and explainable; memory should expose freshness/importance/protection; risk checks should show reasons and a safer next action; before/after comparison should be visible. |
| What **not** to copy directly | Python/FastAPI implementation, BM25 or hybrid-ranker code, Qwen clients, embeddings, cloud endpoints, data files, frontend HTML/CSS, screenshots, test fixtures, or Qwen competition branding. |
| Codex-specific transformation | Context Trace, Mission Context Budget, Memory Lens Metrics, Flight Recorder Timeline, Mistake Shield, Evidence Boundary, and Before/After tabs, all computed locally with deterministic JavaScript and no fake embeddings. |
| Originality risk | **High** for a visual or algorithmic clone of the Qwen workbench. **Controlled** by a new information architecture, repo-governance data model, React components, deterministic signals, and Codex mission/evidence outputs. |
| Final decision | **ADAPT** — use explainable workbench patterns; exclude the Qwen/cloud runtime and source implementation. |

## Cross-source decision summary

| Decision | Rationale |
| --- | --- |
| Use concepts, not implementation | The strongest lineage is the discipline and information model. Reusing code, templates, UI, screenshots, or package topology would add originality and provenance risk without helping the local-first goal. |
| Keep the default runtime offline | OpenAI Build Week values a working experience. A deterministic local demo is easier to run, audit, and reproduce than a credentialed cloud integration. |
| Preserve claim states | `PASS`, `WARN`, `FAIL`, `NOT_RUN`, and `SIMULATED` stop missing proof from being flattened into a confident summary. |
| Make Codex the next-action consumer | The original product contribution is not another universal agent policy pack; it is a scanner that turns repository state into a bounded Codex mission and an evidence-bearing handoff. |
| Limit bilingual scope deliberately | The final requirement makes Phase-0 available in English and Turkish (`--locale en|tr`), while the Build Week README and main dashboard remain English for a consistent judging experience. |

## Research limitations

- Repository statements about implementation, deployment, test counts, or competition status were not rerun and are not independently certified here.
- GitLab pages expose some content dynamically; public raw files and repository-tree APIs were used where the normal tree was sparse.
- No protected-source test suite, cloud connector, tokened endpoint, or deployment was executed.
- The GitLab edition's reported second-place result remains unverified and is intentionally omitted from product claims.

## Related reading

- [README](../README.md)
- [Source Protection](SOURCE_PROTECTION.md)
- [Feature Harvest](FEATURE_HARVEST.md)
- [Originality Matrix](ORIGINALITY_MATRIX.md)
- [Product Decisions](PRODUCT_DECISIONS.md)
- [Codex Self-Assessment](CODEX_SELF_ASSESSMENT.md)
- [Codex-Native Recommendations](CODEX_NATIVE_RECOMMENDATIONS.md)
