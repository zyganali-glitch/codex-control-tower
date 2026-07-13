import { Panel, SectionHeader, StatusPill } from './Panel.jsx';

const ROOT_CI_URL = 'https://github.com/zyganali-glitch/codex-control-tower/actions/workflows/ci.yml?query=branch%3Amain';

const copy = {
  READY: 'Deterministic claims are loaded, but no model run has started. Start the real GPT-5.6 evidence reconciliation to audit them.',
  RUNNING: 'A real GPT-5.6 run is auditing named evidence in read-only mode. Locked local states cannot be changed.',
  COMPLETE: 'A recorded real GPT-5.6 run was reconciled with the locked deterministic claims.',
  BLOCKED: 'Evidence reconciliation needs a valid ChatGPT sign-in before it can run.',
  FAILED: 'The model run was rejected or did not complete. Deterministic evidence remains unchanged.',
};

const executionLabel = {
  READY: 'Not started',
  RUNNING: 'Real run in progress',
  COMPLETE: 'Recorded real Codex run',
  BLOCKED: 'Blocked before execution',
  FAILED: 'Run did not complete',
};

const hasValue = (value) => value !== undefined && value !== null && value !== '';

function safePath(value) {
  if (!hasValue(value)) return null;
  const normalized = String(value).replaceAll('\\', '/');
  const anchors = ['.controltower/', 'examples/', 'docs/', 'apps/', 'tests/', 'CONTROL_TOWER_REPORT.json'];
  const anchor = anchors
    .map((candidate) => normalized.indexOf(candidate))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  if (Number.isInteger(anchor)) return normalized.slice(anchor);
  if (/^[a-z]:\//i.test(normalized) || normalized.startsWith('/')) return normalized.split('/').filter(Boolean).at(-1) || 'local artifact';
  return normalized;
}

function formatTime(value) {
  if (!hasValue(value)) return 'Not recorded';
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? String(value) : date.toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'medium' });
}

function formatBytes(value) {
  if (!hasValue(value)) return 'Size not recorded';
  const bytes = Number(value);
  if (!Number.isFinite(bytes)) return 'Size not recorded';
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function formatDuration(value) {
  if (!hasValue(value)) return 'Not recorded';
  const milliseconds = Number(value);
  if (!Number.isFinite(milliseconds)) return 'Not recorded';
  if (milliseconds < 1000) return `${milliseconds} ms`;
  if (milliseconds < 60000) return `${(milliseconds / 1000).toFixed(1)} s`;
  return `${Math.round(milliseconds / 60000)} min`;
}

function fileRecords(value) {
  if (Array.isArray(value)) return value.map((item) => typeof item === 'string' ? { path: item } : item).filter(Boolean);
  if (!value || typeof value !== 'object') return [];
  return Object.entries(value).map(([path, item]) => typeof item === 'string' ? { path, sha256: item } : { path, ...item });
}

function countRelations(audits, names) {
  return audits.filter((audit) => names.includes(String(audit.relation || audit.agreement || '').toUpperCase())).length;
}

function ClaimAudit({ audit }) {
  const relation = String(audit.relation || audit.agreement || 'UNCLASSIFIED').toUpperCase();
  const relationClass = relation.toLowerCase().replaceAll('_', '-');
  const relationLabel = ({
    ALIGNS_WITH_LOCKED_STATUS: 'ALIGNS WITH LOCKED STATUS',
    CONFLICTS_WITH_LOCKED_STATUS: 'CONFLICTS WITH LOCKED STATUS',
  })[relation] || relation;
  return (
    <div className={`reconciliation-claim reconciliation-claim--${relationClass}`}>
      <div className="reconciliation-claim__head">
        <div><span>{audit.id}</span><strong>{audit.claim}</strong></div>
        <div><StatusPill status={audit.deterministicStatus} /><StatusPill status={audit.modelAssessment} subtle /></div>
      </div>
      <p>{audit.rationale}</p>
      <div className="reconciliation-claim__meta">
        <span>{relationLabel}</span>
        <span>{(audit.citedEvidencePaths || []).length} cited file(s)</span>
        {(audit.missingEvidence || []).length > 0 && <span>{audit.missingEvidence.length} missing proof item(s)</span>}
      </div>
    </div>
  );
}

function ProofAndProvenance({ review, report }) {
  const reconciliation = review.reconciliation || {};
  const provenance = reconciliation.reportProvenance || review.provenance || reconciliation.provenance || {};
  const integrity = reconciliation.evidenceIntegrity || {};
  const bundle = integrity.bundle || {};
  const evidenceFiles = fileRecords(integrity.files || provenance.evidenceFiles || provenance.artifacts);
  const tests = fileRecords(
    reconciliation.executionEvidence?.tests?.commands
      || provenance.testEvidence
      || report?.verification?.commands,
  );
  const liveRecordPath = safePath(
    provenance.liveRecordPath
      || review.liveRecordPath
      || evidenceFiles.find((file) => String(file.path || '').includes('live-review-record'))?.path,
  );
  const warnings = [
    ...(Array.isArray(provenance.staleReasons) ? provenance.staleReasons : []),
    ...(Array.isArray(reconciliation.warnings) ? reconciliation.warnings : []),
  ];
  const metadata = [
    ['Model', review.model || 'Not selected'],
    ['Codex CLI', review.cliVersion || provenance.cliVersion || 'Not recorded'],
    ['Started', formatTime(review.startedAt)],
    ['Completed', formatTime(review.completedAt)],
    ['Report snapshot', formatTime(provenance.generatedAt || provenance.reportGeneratedAt || report?.generatedAt)],
    ['Loaded for audit', formatTime(provenance.loadedAt)],
    ['Age at audit', formatDuration(provenance.ageMs)],
    ['Snapshot freshness', hasValue(provenance.stale) ? (provenance.stale ? 'STALE' : 'FRESH') : provenance.reportFreshness || 'Not recorded'],
    ['Git commit', integrity.gitCommit || provenance.gitCommit || 'Not recorded'],
    ['Git worktree at bundle time', integrity.gitWorktreeState || 'Not recorded'],
    ['Bundle path', safePath(bundle.path) || 'Not recorded'],
    ['Bundle SHA-256', bundle.sha256 || provenance.bundleSha256 || 'Not recorded'],
    ['Bundle size', formatBytes(bundle.sizeBytes)],
    ['Digest scope', bundle.digestScope || integrity.algorithm || 'Not recorded'],
    ['Live record', liveRecordPath || 'Not recorded'],
  ];

  return (
    <details className="proof-details">
      <summary>Proof &amp; provenance <span>inspect recorded inputs and execution facts</span></summary>
      <div className="proof-details__body">
        {warnings.length > 0 && <div className="proof-warning" role="note"><strong>Provenance warning</strong>{warnings.join(' · ')}</div>}
        <dl className="proof-metadata">
          {metadata.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
        <div className="proof-section">
          <h3>Evidence files</h3>
          {evidenceFiles.length ? (
            <div className="proof-files">
              {evidenceFiles.map((file, index) => (
                <div key={`${file.path}-${index}`}>
                  <code>{safePath(file.path) || 'Path not recorded'}</code>
                  <span>SHA-256: {file.sha256 || 'not recorded'}</span>
                  <span>{file.exists === false ? 'Missing at bundle time' : formatBytes(file.sizeBytes ?? file.size ?? file.bytes)}</span>
                </div>
              ))}
            </div>
          ) : <p>No per-file digest was recorded for this snapshot.</p>}
        </div>
        <div className="proof-section">
          <h3>Test execution</h3>
          {tests.length ? tests.map((test, index) => (
            <div className="proof-test" key={`${test.command || test.path}-${index}`}>
              <code>{test.command || 'Command not recorded'}</code>
              <span>Exit {hasValue(test.exitCode) ? test.exitCode : 'not recorded'}</span>
              <span>{hasValue(test.testCount) ? `${test.testCount} test(s)` : 'Test count not recorded'}</span>
              {test.path || test.evidence ? <span>{safePath(test.path || test.evidence)}</span> : null}
            </div>
          )) : <p>No test execution record was attached to this review.</p>}
        </div>
      </div>
    </details>
  );
}

export default function CodexLiveReviewPanel({ review, report }) {
  if (!review) return null;
  const state = String(review.state || 'READY').toUpperCase();
  const reconciliation = review.reconciliation;
  const legacyAssessment = !reconciliation ? review.assessment : null;
  const audits = reconciliation?.claimAudits || [];
  const counts = reconciliation?.counts || {};
  const localVerdict = reconciliation?.localVerdict || reconciliation?.deterministicVerdict || reconciliation?.verdict;
  const modelVerdict = reconciliation?.modelVerdict || review.modelVerdict || review.assessment?.verdict;
  const agreementCount = counts.agreement ?? counts.aligned ?? countRelations(audits, ['AGREEMENT', 'ALIGNED', 'ALIGNS_WITH_LOCKED_STATUS']);
  const challengeCount = counts.challenge ?? counts.disagreement ?? countRelations(audits, ['CHALLENGE', 'DISAGREEMENT', 'CONFLICTS_WITH_LOCKED_STATUS']);
  const insufficientCount = counts.insufficient ?? audits.filter((audit) => String(audit.modelAssessment).toUpperCase() === 'INSUFFICIENT').length;
  const fixtureCi = audits.find((audit) => audit.id === 'CI_EXECUTION')?.deterministicStatus
    || report?.evidenceStatus?.ci?.status
    || 'NOT_RUN';
  const access = state === 'READY' ? 'Checked only when run starts' : review.authenticatedVia || 'Checked at run time';

  return (
    <Panel className={`codex-live codex-live--${state.toLowerCase()}`} glow={state === 'RUNNING'}>
      <SectionHeader
        eyebrow="GPT-5.6 · EVIDENCE RECONCILIATION"
        title="Evidence Reconciliation"
        description={copy[state] || review.disclosure}
        action={<div className="codex-live__badges"><StatusPill status={state} /><span>{review.model || 'Model not selected'}</span></div>}
      />
      <div className="codex-live__facts">
        <div><span>Execution</span><strong>{executionLabel[state] || 'State unknown'}</strong></div>
        <div><span>Access</span><strong>{access}</strong></div>
        <div><span>Safety</span><strong>Read-only evidence audit</strong></div>
        <div><span>Local states</span><strong>Locked</strong></div>
      </div>
      {state === 'RUNNING' && <div className="codex-live__progress"><i /><span>GPT-5.6 is comparing claims with named evidence files…</span></div>}
      {reconciliation && (
        <div className="codex-live__result">
          <div className="verdict-split" aria-label="Local and model verdicts">
            <div><span>Deterministic local verdict</span><StatusPill status={localVerdict || 'UNKNOWN'} /><p>Computed by local rules from locked evidence states.</p></div>
            <div><span>GPT-5.6 evidence opinion</span><StatusPill status={modelVerdict || 'UNKNOWN'} /><p>The model can question evidence, but cannot replace the local verdict.</p></div>
          </div>
          <div className="verdict-explanations">
            <p><strong>Local explanation:</strong> {reconciliation.summary}</p>
            <p><strong>Model explanation:</strong> {reconciliation.modelSummary || review.assessment?.summary || 'The model did not record a separate summary.'}</p>
          </div>
          <div className="reconciliation-counts">
            <div><span>Agreement</span><strong>{agreementCount}</strong></div>
            <div><span>Challenge</span><strong>{challengeCount}</strong></div>
            <div><span>Insufficient</span><strong>{insufficientCount}</strong></div>
            <div><span>NOT_RUN locked</span><strong>{counts.notRunPreserved ?? 0}</strong></div>
            <div><span>Rejected paths</span><strong>{counts.rejectedEvidencePaths ?? 0}</strong></div>
          </div>
          <div className="ci-scope-note">
            <div><span>InvoiceFlow fixture CI</span><StatusPill status={fixtureCi} /><p>The fictional sample repository intentionally has no CI workflow; this is the fixture claim above.</p></div>
            <div><span>Control Tower project CI</span><span>Public run history</span><p>The product repository has separate public GitHub Actions evidence; its current result is not inferred from the fictional fixture. <a href={ROOT_CI_URL} target="_blank" rel="noreferrer">Open workflow history</a>.</p></div>
          </div>
          <div className="reconciliation-list">{audits.map((audit) => <ClaimAudit key={audit.id} audit={audit} />)}</div>
          <div className="codex-live__next"><span>Local next safe action</span><strong>{reconciliation.nextSafeAction}</strong></div>
          {reconciliation.modelNextSafeAction && (
            <div className="codex-live__next codex-live__next--model"><span>GPT-5.6 suggestion</span><strong>{reconciliation.modelNextSafeAction}</strong></div>
          )}
          <p className="reconciliation-boundary">{reconciliation.safetyBoundary}</p>
          <ProofAndProvenance review={review} report={report} />
        </div>
      )}
      {legacyAssessment && (
        <div className="codex-live__result">
          <div className="codex-live__summary"><StatusPill status={legacyAssessment.verdict} /><p>{legacyAssessment.summary}</p></div>
          <div className="codex-live__next"><span>Recorded legacy review</span><strong>{legacyAssessment.nextSafeAction}</strong></div>
        </div>
      )}
      {review.error && <div className="codex-live__error">{review.error}</div>}
      <p className="codex-live__disclosure">{review.disclosure}</p>
    </Panel>
  );
}
