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
    'long-description.md': `# Codex Control Tower\n\nCodex writes. Control Tower proves. The developer decides.\n\nThe product scans repositories, builds a Context Trace, scores governance health, generates a strict Codex Mission Prompt, exposes a local Review Gate and Mistake Shield, records flight events, and exports an evidence pack without uploading source code.\n\nExport boundary: **${boundary}**.\n`,
    'demo-script.md': '# Three-Minute Demo\n\n1. Show the simulated InvoiceFlow Mini messy repository.\n2. Run `cct scan` and explain the low governance score.\n3. Inspect Context Trace, risks, Review Gate, and Mistake Shield.\n4. Generate the Mission Prompt and evidence pack.\n5. Show the governed score and Before / After dashboard.\n',
    'judging-map.md': '# Judging Map\n\n- **Technological Implementation:** working deterministic CLI, report engines, and React dashboard.\n- **Design:** coherent before/after mission-control experience.\n- **Potential Impact:** reviewable handoffs for developers using coding agents.\n- **Quality of Idea:** a local black-box recorder for AI-built software.\n',
    'install-commands.md': '# Install and Run\n\n```bash\nnpm install\nnpm test\nnpm run demo\nnpm run dashboard\n```\n',
    'screenshots-checklist.md': '# Screenshots Checklist\n\n- [ ] Simulated data badge\n- [ ] Before / After scores\n- [ ] Risk cards\n- [ ] Context Trace\n- [ ] Review Gate\n- [ ] Mistake Shield\n- [ ] Evidence Boundary\n- [ ] Phase-0 card\n',
    'limitations.md': '# Limitations\n\nThe scanner is heuristic, does not prove code correctness, does not replace tests or review, and uses a local file gate rather than enterprise identity verification. Demo data is simulated and labeled.\n',
    'evidence-map.md': `# Evidence Map\n\n- Governance score: ${report.score}/100\n- Risks: ${report.riskFlags.length}\n- Context nodes: ${report.contextGraph.nodes.length}\n- Review Gate: ${report.reviewGate.status}\n- Mistake Shield: ${report.mistakeShield.verdict}\n- Tests observed but not executed by export: **NOT_RUN**\n`,
    'codex-build-summary.md': '# Codex Build Summary\n\nCodex was used to implement the CLI, deterministic analysis engines, test suite, dashboard, simulated demo, and competition documentation. Build-time workflow observations were converted into Mission Prompt, Context Trace, Flight Recorder, Review Gate, Mistake Shield, Memory Lens, and evidence features.\n'
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
