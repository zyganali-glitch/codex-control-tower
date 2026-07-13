'use strict';

const path = require('node:path');
const { scanRepository } = require('../lib/repoScanner');
const { ensureDirectory, resolveTarget } = require('../lib/safeFs');
const { writeJson, writeMarkdown } = require('../lib/reportWriter');

async function exportDevpostCommand(args) {
  const target = resolveTarget(args.target || '.');
  const out = path.resolve(args.out || path.join(target, 'devpost-pack'));
  ensureDirectory(out);
  const report = scanRepository(target);
  writeJson(path.join(out, '.controltower-generated.json'), { product: 'Codex Control Tower', artifactType: 'devpost-pack', generatedAt: report.generatedAt, simulatedData: report.simulatedData });
  const boundary = report.simulatedData ? 'SIMULATED demo data' : 'real local scan metadata';
  const files = {
    'project-summary.md': `# ${report.projectName}\n\nCodex Control Tower is mission control for AI-built software: a local evidence, approval, risk, and handoff layer for Codex-assisted work.\n`,
    'long-description.md': `# Codex Control Tower\n\nCodex writes. Control Tower proves. The developer decides.\n\nThe product turns repository evidence into a bounded mission, locks deterministic states, invokes real GPT-5.6 through Codex for a named-file audit, rejects unsafe model output, exposes agreement/disagreement, and leaves the final decision with the developer.\n\nExport boundary: **${boundary}**.\n`,
    'demo-script.md': '# 2:45 Demo\n\n1. State the missing-evidence problem and show InvoiceFlow Mini as a FICTIONAL SAMPLE PROJECT.\n2. Explain that 25/88 are real scans of prepared snapshots; GPT-5.6 did not create the score change.\n3. In a clean Codex desktop task, ask Codex to run `npm run demo:codex` read-only.\n4. Return to the local dashboard and show the real run, locked local states, separate model opinion, provenance, and a NOT_RUN gate.\n5. Close on the human Review Gate and governed prepared snapshot.\n',
    'judging-map.md': '# Judging Map\n\n- **Technological Implementation:** deterministic engines, real GPT-5.6 audit, local reconciliation safety, tests, and dashboard.\n- **Design:** one scan-to-mission-to-audit-to-human-decision flow.\n- **Potential Impact:** reviewable handoffs for developers using coding agents.\n- **Quality of Idea:** a black-box recorder where the model audits evidence without controlling evidence state.\n',
    'install-commands.md': '# Install and Run\n\n```bash\nnpm install\nnpm test\nnpm run demo\nnpm run dashboard\n```\n\nFor the featured live path, keep the local dashboard open. Create a clean Codex desktop task named **Demo Reconciliation**, paste the exact read-only instruction from `docs/CODEX_DEMO_PROMPT.md`, and let Codex start `npm run demo:codex`. A separate command window is recovery only. GitHub Pages is the static no-install judge exhibit and does not show the live transition.\n\nSee `docs/JUDGE_TEST_PATH.md` and `docs/DEMO_SCRIPT.md`.\n',
    'screenshots-checklist.md': '# Screenshots Checklist\n\n- [ ] FICTIONAL SAMPLE PROJECT disclosure\n- [ ] Real-execution explanation\n- [ ] Before / After prepared-snapshot scores\n- [ ] Separate deterministic and GPT-5.6 verdicts\n- [ ] Proof and provenance\n- [ ] Risk cards\n- [ ] Context Trace\n- [ ] Review Gate\n- [ ] Mistake Shield\n- [ ] Evidence Boundary\n- [ ] Phase-0 card\n',
    'limitations.md': '# Limitations\n\nThe scanner is heuristic, does not prove code correctness, does not replace tests or review, and uses a local file gate rather than enterprise identity verification. InvoiceFlow Mini and its prepared snapshots are fictional sample content; scans, fixture tests, and the recorded GPT-5.6 reconciliation are separately identified real executions.\n',
    'evidence-map.md': `# Evidence Map\n\n- Governance score: ${report.score}/100\n- Risks: ${report.riskFlags.length}\n- Context nodes: ${report.contextGraph.nodes.length}\n- Review Gate: ${report.reviewGate.status}\n- Mistake Shield: ${report.mistakeShield.verdict}\n- Tests observed but not executed by export: **NOT_RUN**\n`,
    'codex-build-summary.md': '# Codex Build Summary\n\nCodex was used to implement the CLI, deterministic analysis engines, test suite, dashboard, fictional sample fixtures, competition documentation, real GPT-5.6 execution, locked claim generation, model-output validation, provenance, and Evidence Reconciliation. Exact in-period changes are documented in `docs/BUILD_WEEK_DELTA.md`.\n'
  };
  const stampedFiles = Object.fromEntries(Object.entries(files).map(([name, content]) => {
    const lines = content.split('\n');
    lines.splice(2, 0, `Generated: ${report.generatedAt}`, '');
    return [name, lines.join('\n')];
  }));
  const written = Object.entries(stampedFiles).map(([name, content]) => writeMarkdown(path.join(out, name), content));
  console.log(`Devpost pack written: ${out}`);
  return { outDir: out, files: written, report };
}

module.exports = { exportDevpostCommand };
