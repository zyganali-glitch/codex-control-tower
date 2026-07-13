import { Panel, SectionHeader, StatusPill } from './Panel.jsx';

const copy = {
  READY: 'The deterministic claims are loaded. Start the real GPT-5.6 evidence reconciliation to audit them.',
  RUNNING: 'GPT-5.6 Sol is auditing named evidence in read-only mode. Locked local states cannot be changed.',
  COMPLETE: 'A real GPT-5.6 audit was reconciled with the locked deterministic claims.',
  BLOCKED: 'Evidence reconciliation needs a valid ChatGPT sign-in before it can run.',
  FAILED: 'The model run was rejected or did not complete. Deterministic evidence remains unchanged.'
};

function ClaimAudit({ audit }) {
  return (
    <div className={`reconciliation-claim reconciliation-claim--${String(audit.agreement).toLowerCase()}`}>
      <div className="reconciliation-claim__head">
        <div><span>{audit.id}</span><strong>{audit.claim}</strong></div>
        <div><StatusPill status={audit.deterministicStatus} /><StatusPill status={audit.modelAssessment} subtle /></div>
      </div>
      <p>{audit.rationale}</p>
      <div className="reconciliation-claim__meta">
        <span>{audit.agreement}</span>
        <span>{(audit.citedEvidencePaths || []).length} cited file(s)</span>
        {(audit.missingEvidence || []).length > 0 && <span>{audit.missingEvidence.length} missing proof item(s)</span>}
      </div>
    </div>
  );
}

export default function CodexLiveReviewPanel({ review }) {
  if (!review) return null;
  const state = String(review.state || 'READY').toUpperCase();
  const reconciliation = review.reconciliation;
  const legacyAssessment = !reconciliation ? review.assessment : null;
  return (
    <Panel className={`codex-live codex-live--${state.toLowerCase()}`} glow={state === 'RUNNING'}>
      <SectionHeader
        eyebrow="REAL GPT-5.6 · EVIDENCE RECONCILIATION"
        title="Evidence Reconciliation"
        description={copy[state] || review.disclosure}
        action={<div className="codex-live__badges"><StatusPill status={state} /><span>{review.model || 'Model not selected'}</span></div>}
      />
      <div className="codex-live__facts">
        <div><span>Execution</span><strong>{review.mode === 'REAL_CODEX_EVIDENCE_RECONCILIATION' ? 'Real Codex run' : review.mode || 'Not started'}</strong></div>
        <div><span>Access</span><strong>{review.authenticatedVia || 'Checked at run time'}</strong></div>
        <div><span>Safety</span><strong>Read-only evidence audit</strong></div>
        <div><span>Local states</span><strong>Locked</strong></div>
      </div>
      {state === 'RUNNING' && <div className="codex-live__progress"><i /><span>GPT-5.6 is comparing claims with named evidence files…</span></div>}
      {reconciliation && (
        <div className="codex-live__result">
          <div className="codex-live__summary"><StatusPill status={reconciliation.verdict} /><p>{reconciliation.summary}</p></div>
          <div className="reconciliation-counts">
            <div><span>Agreement</span><strong>{reconciliation.counts?.agreement ?? 0}</strong></div>
            <div><span>Disagreement</span><strong>{reconciliation.counts?.disagreement ?? 0}</strong></div>
            <div><span>NOT_RUN locked</span><strong>{reconciliation.counts?.notRunPreserved ?? 0}</strong></div>
            <div><span>Rejected paths</span><strong>{reconciliation.counts?.rejectedEvidencePaths ?? 0}</strong></div>
          </div>
          <div className="reconciliation-list">{(reconciliation.claimAudits || []).map((audit) => <ClaimAudit key={audit.id} audit={audit} />)}</div>
          <div className="codex-live__next"><span>Next safe action</span><strong>{reconciliation.nextSafeAction}</strong></div>
          <p className="reconciliation-boundary">{reconciliation.safetyBoundary}</p>
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
