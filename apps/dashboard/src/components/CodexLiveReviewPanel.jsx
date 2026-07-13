import { Panel, SectionHeader, StatusPill } from './Panel.jsx';

const copy = {
  READY: 'The deterministic demo is loaded. Start the optional live review to add a real model assessment.',
  RUNNING: 'GPT-5.6 Sol is inspecting the governed fixture in read-only mode. This panel updates automatically.',
  COMPLETE: 'A real Codex model response was captured through the signed-in ChatGPT subscription.',
  BLOCKED: 'The live review needs a valid ChatGPT sign-in before it can run.',
  FAILED: 'The live model run did not complete. Deterministic demo evidence remains available.'
};

export default function CodexLiveReviewPanel({ review }) {
  if (!review) return null;
  const state = String(review.state || 'READY').toUpperCase();
  const assessment = review.assessment;
  return (
    <Panel className={`codex-live codex-live--${state.toLowerCase()}`} glow={state === 'RUNNING'}>
      <SectionHeader
        eyebrow="OPTIONAL LIVE MODEL LAYER"
        title="Real Codex Review"
        description={copy[state] || review.disclosure}
        action={<div className="codex-live__badges"><StatusPill status={state} /><span>{review.model || 'Model not selected'}</span></div>}
      />
      <div className="codex-live__facts">
        <div><span>Execution</span><strong>{review.mode === 'REAL_CODEX' ? 'Real Codex run' : review.mode || 'Not started'}</strong></div>
        <div><span>Access</span><strong>{review.authenticatedVia || 'Checked at run time'}</strong></div>
        <div><span>Safety</span><strong>Read-only workspace</strong></div>
        <div><span>Core score</span><strong>Still deterministic</strong></div>
      </div>
      {state === 'RUNNING' && <div className="codex-live__progress"><i /><span>Codex is reviewing evidence and governance files…</span></div>}
      {assessment && (
        <div className="codex-live__result">
          <div className="codex-live__summary"><StatusPill status={assessment.verdict} /><p>{assessment.summary}</p></div>
          <div className="codex-live__columns">
            <div><span>Strengths</span>{(assessment.strengths || []).slice(0, 3).map((item) => <p key={item}>{item}</p>)}</div>
            <div><span>Findings</span>{(assessment.findings || []).slice(0, 3).map((item) => <p key={`${item.severity}-${item.title}`}><b>{item.severity}</b> {item.title}</p>)}</div>
          </div>
          <div className="codex-live__next"><span>Next safe action</span><strong>{assessment.nextSafeAction}</strong></div>
        </div>
      )}
      {review.error && <div className="codex-live__error">{review.error}</div>}
      <p className="codex-live__disclosure">{review.disclosure}</p>
    </Panel>
  );
}
