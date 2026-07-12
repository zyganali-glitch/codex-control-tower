'use strict';

const path = require('node:path');
const fs = require('node:fs');
const { readText } = require('./safeFs');

const MEMORY_FILES = [
  'AGENT_MEMORY_AND_LESSONS.md',
  'AGENT_ARCHITECTURE_AND_PATTERNS.md',
  'AGENT_ENVIRONMENT_AND_API.md',
  'AGENT_USER_PREFERENCES.md',
  'docs/MEMORY_LENS.md',
  'TECH_DEBT_AND_SECURITY.md',
  'README.md'
];

function usefulLines(text, matcher, limit = 8) {
  return text.split(/\r?\n/)
    .map((line) => line.replace(/^\s*[-*#>]\s*/, '').trim())
    .filter((line) => line.length > 8 && matcher.test(line))
    .slice(0, limit);
}

function analyzeMemory(target) {
  const sources = [];
  const combined = [];
  for (const relative of MEMORY_FILES) {
    const absolute = path.join(target, relative);
    if (!fs.existsSync(absolute)) continue;
    const text = readText(absolute);
    const ageDays = Math.floor((Date.now() - fs.statSync(absolute).mtimeMs) / 86400000);
    sources.push({ relative, ageDays, stale: ageDays > 180, bytes: Buffer.byteLength(text) });
    combined.push(`# ${relative}\n${text}`);
  }
  const corpus = combined.join('\n');
  const persistentRules = usefulLines(corpus, /\b(must|never|do not|required|preserve|only)\b/i);
  const neverForgetRisks = usefulLines(corpus, /\b(risk|minefield|security|debt|danger|avoid|mistake|auth|payment)\b/i);
  const architecturePrinciples = usefulLines(corpus, /\b(architecture|pattern|module|local-first|boundary|dependency)\b/i);
  const environmentConstraints = usefulLines(corpus, /\b(node|runtime|environment|offline|api|port|windows|linux|network)\b/i);
  const userPreferences = usefulLines(corpus, /\b(prefer|preference|style|language|user wants)\b/i);
  const staleSections = sources.filter((source) => source.stale).map((source) => source.relative);
  const missingSources = MEMORY_FILES.filter((relative) => !sources.some((source) => source.relative === relative));
  const selectedItems = [
    ...persistentRules.map((text) => ({ pillar: 'Code Soul', text, reason: 'Durable rule', protected: true })),
    ...neverForgetRisks.map((text) => ({ pillar: 'Minefield', text, reason: 'Risk prevention', protected: true })),
    ...architecturePrinciples.map((text) => ({ pillar: 'Architecture', text, reason: 'Design continuity', protected: false }))
  ].slice(0, 16).map((item, index) => ({
    ...item,
    relevance: Number((1 - index * 0.025).toFixed(2)),
    freshness: staleSections.length ? 'mixed' : 'fresh',
    importance: item.protected ? 'high' : 'medium'
  }));

  return {
    generatedAt: new Date().toISOString(),
    generatedLocally: true,
    sources,
    persistentRules,
    neverForgetRisks,
    architecturePrinciples,
    environmentConstraints,
    userPreferences,
    staleSections,
    missingSources,
    contradictions: [],
    selectedItems,
    metrics: {
      sourcesFound: sources.length,
      protectedItems: selectedItems.filter((item) => item.protected).length,
      staleSources: staleSections.length,
      continuityCoverage: Math.round((sources.length / MEMORY_FILES.length) * 100)
    }
  };
}

module.exports = { MEMORY_FILES, analyzeMemory };
