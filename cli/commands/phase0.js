'use strict';

const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline/promises');
const { buildCodexPrompt } = require('../lib/codexPromptBuilder');
const { resolveTarget, writeFileSafe, writeJsonSafe } = require('../lib/safeFs');

const FALLBACK_QUESTIONS = {
  en: [
    ['goal', 'What do you want to build or change?'],
    ['audience', 'Who is this for?'],
    ['successCriteria', 'What would make this successful?'],
    ['forbiddenAreas', 'Which files, features, or areas should Codex avoid unless you approve?'],
    ['risk', 'What is the biggest risk or mistake you want to prevent?'],
    ['expectedEvidence', 'What proof do you want before Codex says the task is done?'],
    ['profile', 'Should Codex use a light, startup, enterprise, or regulated workflow?'],
    ['nextMission', 'What should the next safe Codex mission be?']
  ],
  tr: [
    ['goal', 'Ne yapmak veya değiştirmek istiyorsun?'],
    ['audience', 'Bu proje kim için?'],
    ['successCriteria', 'Bu işin başarılı olduğunu nasıl anlayacağız?'],
    ['forbiddenAreas', 'Codex hangi dosyalara, özelliklere veya bölümlere onay almadan dokunmasın?'],
    ['risk', 'Önlemek istediğin en büyük hata veya risk nedir?'],
    ['expectedEvidence', 'Codex “bitti” demeden önce hangi kanıtı görmek istersin?'],
    ['profile', 'Hafif, startup, enterprise veya regulated çalışma düzeninden hangisi uygun?'],
    ['nextMission', 'Codex’in bir sonraki güvenli görevi ne olsun?']
  ]
};

const DEMO_ANSWERS = {
  goal: 'Govern InvoiceFlow Mini without changing unrelated product behavior.',
  audience: 'Small-business SaaS developers using Codex.',
  successCriteria: 'A reviewable plan, reduced risk flags, a working test, and an honest evidence pack.',
  forbiddenAreas: 'Authentication token semantics and payment settlement behavior without explicit approval.',
  risk: 'Do not create an auth bypass, accept unverified payment state, or delete tests.',
  expectedEvidence: 'Changed files, exact commands, test output, traceability, NOT_RUN gates, and remaining risks.',
  profile: 'startup',
  nextMission: 'Add the smallest governance surfaces and tests needed for an auditable handoff.'
};

function loadQuestions(locale) {
  const file = path.resolve(__dirname, '..', '..', 'core', locale, 'phase0-questions.json');
  if (!fs.existsSync(file)) return FALLBACK_QUESTIONS[locale];
  try {
    const value = JSON.parse(fs.readFileSync(file, 'utf8'));
    const questions = Array.isArray(value) ? value : value.questions;
    return questions.map((item) => Array.isArray(item) ? item : [item.key, item.question]);
  } catch {
    return FALLBACK_QUESTIONS[locale];
  }
}

function alignmentMarkdown(data) {
  const labels = {
    en: ['Phase-0 Alignment', 'Simulated demo data', 'Goal', 'Audience', 'Success criteria', 'Forbidden areas', 'Biggest risk', 'Expected evidence', 'Workflow profile', 'Next safe Codex mission', 'First Codex Mission Prompt'],
    tr: ['Phase-0 Uyumlandırma', 'Simüle demo verisi', 'Hedef', 'Hedef kitle', 'Başarı ölçütü', 'Yasak alanlar', 'En büyük risk', 'Beklenen kanıt', 'Çalışma profili', 'Sonraki güvenli Codex görevi', 'İlk Codex Görev İstemi']
  }[data.locale];
  return [
    `# ${labels[0]}`, '',
    data.simulated ? `> **${labels[1]}**` : '',
    `Generated: ${data.generatedAt}`,
    `## ${labels[2]}\n\n${data.goal}`,
    `## ${labels[3]}\n\n${data.audience}`,
    `## ${labels[4]}\n\n${data.successCriteria}`,
    `## ${labels[5]}\n\n${data.forbiddenAreas}`,
    `## ${labels[6]}\n\n${data.risk}`,
    `## ${labels[7]}\n\n${data.expectedEvidence}`,
    `## ${labels[8]}\n\n${data.profile}`,
    `## ${labels[9]}\n\n${data.nextMission}`,
    `## ${labels[10]}\n\n${data.codexMissionPrompt}`
  ].filter(Boolean).join('\n\n') + '\n';
}

async function phase0Command(args) {
  const target = resolveTarget(args.target || '.');
  const locale = String(args.locale || 'en').toLowerCase();
  if (!FALLBACK_QUESTIONS[locale]) throw new Error('Phase-0 locale must be en or tr.');
  const questions = loadQuestions(locale);
  const answers = {};
  if (args.demo) {
    Object.assign(answers, DEMO_ANSWERS);
  } else {
    if (!process.stdin.isTTY) throw new Error('Interactive Phase-0 requires a terminal. Use --demo for non-interactive simulated output.');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
      for (const [key, question] of questions) answers[key] = (await rl.question(`${question}\n> `)).trim();
    } finally {
      rl.close();
    }
  }
  const data = {
    schemaVersion: 1,
    locale,
    simulated: Boolean(args.demo),
    simulatedDataLabel: args.demo ? 'SIMULATED — InvoiceFlow Mini demo answers' : null,
    generatedAt: new Date().toISOString(),
    ...answers
  };
  data.codexMissionPrompt = buildCodexPrompt({
    targetPath: target,
    riskFlags: [{ severity: 'HIGH', issue: data.risk }],
    missingSurfaces: [],
    reviewGate: { status: 'AWAITING_HUMAN' },
    mistakeShield: { verdict: 'CAUTION' },
    phase0: data,
    hasTestScript: false
  });
  writeJsonSafe(target, '.controltower/phase0.json', data, { overwrite: true, backup: true });
  writeFileSafe(target, 'plans/PHASE0_ALIGNMENT.md', alignmentMarkdown(data), { overwrite: true, backup: true });
  console.log(`Phase-0 alignment written in ${locale}: .controltower/phase0.json and plans/PHASE0_ALIGNMENT.md`);
  if (args.demo) console.log('Boundary: SIMULATED demo data for InvoiceFlow Mini.');
  const riskyExisting = fs.readdirSync(target).some((name) => ['src', 'lib', 'app', 'payments', 'auth'].some((riskName) => name.toLowerCase().includes(riskName)));
  if (riskyExisting) {
    console.log('Existing implementation files were detected. Recommended next commands:');
    console.log('cct scan --target .');
    console.log('cct review-gate --target . --status');
  }
  return data;
}

module.exports = { DEMO_ANSWERS, FALLBACK_QUESTIONS, phase0Command };
