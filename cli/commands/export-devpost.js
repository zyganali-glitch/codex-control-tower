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
    'project-summary.md': `# ${report.projectName}\n\nCodex Control Tower is mission control where real GPT-5.6 independently challenges bounded raw evidence without seeing the reconciler's expected answer or overwriting locked local facts.\n`,
    'long-description.md': `# Codex Control Tower\n\nCodex writes. GPT-5.6 challenges the evidence. Locked local facts stay locked. The developer decides.\n\nThe product turns repository evidence into a bounded mission, locks locally derived states, invokes real GPT-5.6 through pinned Codex CLI in an empty ephemeral no-tool workspace, validates events and evidence-bearing structured output before reconciliation, distinguishes agreement, compatible uncertainty, and conflict, raises HUMAN REVIEW REQUIRED only on conflict, and leaves the final decision with the developer. CCT does not replace ESLint, CI, code review, or branch protection. It adds the evidence and handoff layer around agent-assisted work.\n\nExport boundary: **${boundary}**.\n`,
    'demo-script.md': '# 2:57 Demo\n\n1. In the first ten seconds, show the completed real GPT-5.6 blind semantic audit and say that Codex ran it while locked local facts remained immutable.\n2. Identify InvoiceFlow Mini as a FICTIONAL SAMPLE PROJECT and explain that 25/88 are real scans of prepared snapshots; GPT-5.6 did not create the score change.\n3. Show the controlled semantic challenge, its structural-precheck label, and the actual agreement/compatible/conflict result; show HUMAN REVIEW REQUIRED only if present.\n4. In a clean Codex desktop task, ask Codex to run `npm run demo:codex`, then show the empty ephemeral workspace, accepted tool events 0, refreshed dashboard, provenance, and a preserved NOT_RUN gate.\n5. Preserve the local-dashboard startup proof, then place the separate Safety Preflight exhibit after the completed audit evidence and before the repository handoff.\n6. Close on the human Review Gate and governed prepared snapshot.\n',
    'judging-map.md': '# Judging Map\n\n- **Technological Implementation:** deep Codex use, deterministic engines, a real blind GPT-5.6 semantic audit, post-response reconciliation safety, adversarial tests, and dashboard.\n- **Design:** one scan-to-mission-to-independent-challenge-to-human-decision flow.\n- **Potential Impact:** reviewable handoffs for developers using coding agents.\n- **Quality of Idea:** a black-box recorder where the model can challenge evidence but cannot control evidence state.\n',
    'install-commands.md': '# Install and Run\n\n```bash\nnpm install\nnpm test\nnpm run demo\nnpm run dashboard\n```\n\nFor the featured live path, keep the local dashboard open. Create a clean Codex desktop task named **Demo Blind Audit**, paste the exact instruction from `docs/CODEX_DEMO_PROMPT.md`, and let Codex start `npm run demo:codex`. The product itself creates the empty ephemeral read-only model workspace and rejects tool events. A separate command window is recovery only. GitHub Pages is the static no-install judge exhibit and does not show the live transition.\n\nSee `docs/JUDGE_TEST_PATH.md` and `docs/DEMO_SCRIPT.md`.\n',
    'screenshots-checklist.md': '# Screenshots Checklist\n\n- [ ] Real GPT-5.6 blind semantic audit visible in the first frame\n- [ ] FICTIONAL SAMPLE PROJECT / REAL EXECUTION boundary\n- [ ] Before / After prepared-snapshot scores\n- [ ] Separate locked local and GPT-5.6 verdicts\n- [ ] HUMAN REVIEW REQUIRED controlled challenge\n- [ ] Proof, hashes, commit, and freshness\n- [ ] Risk cards\n- [ ] Context Trace\n- [ ] Review Gate\n- [ ] Mistake Shield\n- [ ] Evidence Boundary\n- [ ] Phase-0 card\n',
    'limitations.md': '# Limitations\n\nThe scanner is heuristic, does not prove code correctness, and uses a local file gate rather than enterprise identity verification. CCT does not replace ESLint, CI, code review, or branch protection. It adds the evidence and handoff layer around agent-assisted work. InvoiceFlow Mini and its prepared snapshots are fictional sample content; scans, fixture tests, and the recorded GPT-5.6 blind audit are separately identified real executions.\n',
    'evidence-map.md': `# Evidence Map\n\n- Governance score: ${report.score}/100\n- Risks: ${report.riskFlags.length}\n- Context nodes: ${report.contextGraph.nodes.length}\n- Review Gate: ${report.reviewGate.status}\n- Mistake Shield: ${report.mistakeShield.verdict}\n- Tests observed but not executed by export: **NOT_RUN**\n`,
    'codex-build-summary.md': '# Codex Build Summary\n\nCodex was used to implement the CLI, deterministic analysis engines, test suite, dashboard, fictional sample fixtures, competition documentation, real GPT-5.6 execution, blind claim presentation, isolated no-tool model boundary, post-response reconciliation, model-event/output validation, provenance, and the controlled semantic challenge. Exact in-period changes are documented in `docs/BUILD_WEEK_DELTA.md`.\n'
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
