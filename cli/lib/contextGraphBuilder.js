'use strict';

const path = require('node:path');

const TODO_COMMENT_PATTERN = /(?:\/\/|\/\*|#)\s*(TODO|FIXME)\b/gi;

function classify(relative) {
  const lower = relative.toLowerCase();
  if (lower.includes('agents.md')) return 'instruction';
  if (lower.startsWith('plans/')) return 'plan';
  if (lower.includes('evidence') || lower.includes('traceability') || lower.includes('not_run')) return 'evidence';
  if (/(^|\/)(tests?|__tests__)(\/|$)|\.(test|spec)\./.test(lower)) return 'test';
  if (lower.startsWith('.github/workflows/') || lower.includes('gitlab-ci')) return 'ci';
  if (lower === 'readme.md') return 'readme';
  if (lower.endsWith('.md')) return 'documentation';
  if (/\.(js|jsx|mjs|cjs|ts|tsx|py|go|rs|java)$/.test(lower)) return 'source';
  if (lower.startsWith('.controltower/')) return 'control';
  return 'file';
}

function importanceFor(type) {
  return ({ instruction: 1, plan: 0.95, evidence: 0.95, control: 0.9, ci: 0.88, test: 0.86, readme: 0.82, documentation: 0.75, source: 0.7 })[type] || 0.45;
}

function freshnessFor(modifiedAt) {
  const ageDays = Math.max(0, (Date.now() - new Date(modifiedAt).getTime()) / 86400000);
  if (ageDays <= 30) return 'fresh';
  if (ageDays <= 180) return 'aging';
  return 'stale';
}

function codeownerMatches(pattern, file) {
  const normalized = pattern.replace(/^\//, '');
  const doubleStar = '__CCT_DOUBLE_STAR__';
  const escaped = normalized
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, doubleStar)
    .replace(/\*/g, '[^/]*')
    .replaceAll(doubleStar, '.*');
  return new RegExp(`^${escaped}${normalized.endsWith('/') ? '.*' : ''}$`).test(file);
}

function buildContextGraph({ files, contents = new Map(), riskFlags = [] }) {
  const riskPaths = new Set(riskFlags.flatMap((flag) => flag.files || []));
  const nodes = files.map((file) => {
    const type = classify(file.relative);
    const text = contents.get(file.relative) || '';
    const markers = (text.match(TODO_COMMENT_PATTERN) || []).length;
    const risk = riskPaths.has(file.relative) || markers > 0 || (type === 'source' && file.lines > 400);
    const importance = importanceFor(type);
    return {
      id: `file:${file.relative}`,
      label: file.relative,
      type,
      lines: file.lines,
      bytes: file.bytes,
      risk,
      markers,
      relevance: Number(Math.min(1, importance + (risk ? 0.12 : 0)).toFixed(2)),
      importance,
      freshness: freshnessFor(file.modifiedAt),
      protected: type === 'instruction' || /minefield|memory|security/i.test(file.relative),
      reason: risk
        ? 'Selected because the file contains or is connected to a detected risk.'
        : `Selected as a ${type} surface for Codex mission context.`
    };
  });

  const edges = [];
  const nodeIds = new Set(nodes.map((node) => node.id));
  const addEdge = (from, to, relation) => {
    if (nodeIds.has(from) && nodeIds.has(to) && !edges.some((edge) => edge.from === from && edge.to === to && edge.relation === relation)) {
      edges.push({ from, to, relation });
    }
  };

  for (const node of nodes) {
    if (node.type === 'test') {
      const stem = path.basename(node.label).replace(/\.(test|spec)?\.[^.]+$/, '').replace(/\.test$|\.spec$/, '');
      const source = nodes.find((candidate) => candidate.type === 'source' && path.basename(candidate.label, path.extname(candidate.label)) === stem);
      if (source) addEdge(node.id, source.id, 'tests');
    }
    if (node.type === 'source') {
      const text = contents.get(node.label) || '';
      const importMatches = [...text.matchAll(/(?:require\(|from\s+)["']([^"']+)["']/g)];
      for (const match of importMatches) {
        if (!match[1].startsWith('.')) continue;
        const sourceDir = path.posix.dirname(node.label);
        const candidatePath = path.posix.normalize(path.posix.join(sourceDir, match[1])).replace(/^\.\//, '');
        const candidate = nodes.find((entry) => entry.label === candidatePath || entry.label === `${candidatePath}.js` || entry.label === `${candidatePath}.jsx`);
        if (candidate) addEdge(node.id, candidate.id, 'imports');
      }
    }
    if (node.type === 'plan') {
      const planText = contents.get(node.label) || '';
      for (const candidate of nodes.filter((entry) => ['source', 'test', 'documentation'].includes(entry.type))) {
        if (planText.includes(candidate.label)) addEdge(node.id, candidate.id, 'plans-change');
      }
    }
  }

  const plan = nodes.find((node) => node.label === 'plans/master-roadmap.md');
  const evidence = nodes.find((node) => node.label === 'docs/EVIDENCE_REPORT.md');
  const traceability = nodes.find((node) => node.label === 'docs/TRACEABILITY_MATRIX.md');
  if (plan && evidence) addEdge(plan.id, evidence.id, 'requires-evidence');
  if (plan && traceability) addEdge(plan.id, traceability.id, 'traced-by');
  const readme = nodes.find((node) => node.label === 'README.md');
  const architecture = nodes.find((node) => node.label === 'docs/ARCHITECTURE.md');
  if (readme && architecture) addEdge(readme.id, architecture.id, 'explained-by');

  const selected = [...nodes]
    .sort((a, b) => b.relevance - a.relevance || a.label.localeCompare(b.label))
    .slice(0, 24);
  const codeownersText = contents.get('.github/CODEOWNERS') || contents.get('CODEOWNERS') || '';
  const ownershipHints = codeownersText.split(/\r?\n/)
    .map((line) => line.replace(/\s+#.*$/, '').trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [pattern, ...owners] = line.split(/\s+/);
      return { pattern, owners };
    });
  for (const node of nodes) {
    node.owners = ownershipHints.filter((hint) => codeownerMatches(hint.pattern, node.label)).flatMap((hint) => hint.owners);
  }
  const missingOwners = nodes.filter((node) => node.type === 'source' && node.owners.length === 0).map((node) => node.label);
  const plannedTargets = new Map();
  for (const edge of edges.filter((item) => item.relation === 'plans-change')) {
    const plans = plannedTargets.get(edge.to) || [];
    plans.push(edge.from);
    plannedTargets.set(edge.to, plans);
  }
  const overlappingPlans = [...plannedTargets.entries()]
    .filter(([, plans]) => plans.length > 1)
    .map(([file, plans]) => ({ file, plans }));

  return {
    generatedAt: new Date().toISOString(),
    generatedLocally: true,
    algorithm: 'deterministic lexical and repository-surface analysis',
    nodes,
    edges,
    ownershipHints,
    missingOwners,
    overlappingPlans,
    stats: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
      riskNodeCount: nodes.filter((node) => node.risk).length,
      todoFixmeCount: nodes.reduce((sum, node) => sum + node.markers, 0)
    },
    contextTrace: selected,
    contextBudget: {
      maxItems: 24,
      selectedItems: selected.length,
      availableItems: nodes.length,
      estimatedTokens: selected.reduce((sum, node) => sum + Math.ceil(Math.min(node.bytes, 16000) / 4), 0)
    }
  };
}

module.exports = { buildContextGraph, classify };
