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
    'demo-script.md': '# 2:45 Demo\n\n1. State the missing-evidence problem and show simulated InvoiceFlow Mini.\n2. Show the low local score and bounded Codex mission.\n3. Run real GPT-5.6 Evidence Reconciliation.\n4. Show locked NOT_RUN, agreement/disagreement, and the human Review Gate.\n5. Close on the governed Before / After result.\n',
    'judging-map.md': '# Judging Map\n\n- **Technological Implementation:** deterministic engines, real GPT-5.6 audit, local reconciliation safety, tests, and dashboard.\n- **Design:** one scan-to-mission-to-audit-to-human-decision flow.\n- **Potential Impact:** reviewable handoffs for developers using coding agents.\n- **Quality of Idea:** a black-box recorder where the model audits evidence without controlling evidence state.\n',
    'install-commands.md': '# Install and Run\n\n```bash\nnpm install\nnpm test\nnpm run demo\nnpm run dashboard\n# In a second window:\nnpm run demo:codex\n```\n\nSee `docs/JUDGE_TEST_PATH.md` for supported platforms and the no-install judge demo.\n',
    'screenshots-checklist.md': '# Screenshots Checklist\n\n- [ ] Simulated data badge\n- [ ] Before / After scores\n- [ ] Risk cards\n- [ ] Context Trace\n- [ ] Review Gate\n- [ ] Mistake Shield\n- [ ] Evidence Boundary\n- [ ] Phase-0 card\n',
    'limitations.md': '# Limitations\n\nThe scanner is heuristic, does not prove code correctness, does not replace tests or review, and uses a local file gate rather than enterprise identity verification. Demo data is simulated and labeled.\n',
    'evidence-map.md': `# Evidence Map\n\n- Governance score: ${report.score}/100\n- Risks: ${report.riskFlags.length}\n- Context nodes: ${report.contextGraph.nodes.length}\n- Review Gate: ${report.reviewGate.status}\n- Mistake Shield: ${report.mistakeShield.verdict}\n- Tests observed but not executed by export: **NOT_RUN**\n`,
    'codex-build-summary.md': '# Codex Build Summary\n\nCodex was used to implement the CLI, deterministic analysis engines, test suite, dashboard, simulated demo, competition documentation, real GPT-5.6 execution, locked claim generation, model-output validation, and Evidence Reconciliation. Exact in-period changes are documented in `docs/BUILD_WEEK_DELTA.md`.\n'
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
