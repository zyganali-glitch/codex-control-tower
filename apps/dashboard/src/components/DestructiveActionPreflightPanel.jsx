import { Panel, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

const display = (value) => value === null || value === undefined || value === '' ? 'Not recorded' : String(value);

function Fact({ label, value, emphasis = false }) {
  return (
    <div className={`destructive-preflight__fact ${emphasis ? 'destructive-preflight__fact--emphasis' : ''}`}>
      <span>{label}</span>
      <strong>{display(value)}</strong>
    </div>
  );
}

export default function DestructiveActionPreflightPanel({ preflight }) {
  if (!preflight) return null;
  const decision = preflight.decision || 'UNKNOWN';
  const execution = preflight.executionState || (preflight.executed === false ? 'NOT_RUN' : 'UNKNOWN');
  const hookRecorded = Object.prototype.hasOwnProperty.call(preflight, 'hookOutcome');

  return (
    <Panel className={`destructive-preflight destructive-preflight--${decision.toLowerCase()}`}>
      <header className="destructive-preflight__header">
        <div className="destructive-preflight__mark"><Icon name="lock" size={32} /></div>
        <div className="destructive-preflight__heading">
          <span className="eyebrow">DESTRUCTIVE ACTION PREFLIGHT</span>
          <h2>Protected boundary decision</h2>
          <p>Deterministic analysis resolves a documented destructive-action subset before execution. Codex sandboxing and human authority remain primary.</p>
        </div>
        <div className="destructive-preflight__decision">
          <span>Decision</span>
          <StatusPill status={decision} />
        </div>
      </header>

      <div className="destructive-preflight__analysis-only">
        <Icon name="shield" size={16} />
        <strong>ANALYSIS ONLY · NO COMMAND EXECUTED</strong>
      </div>

      <div className="destructive-preflight__facts">
        <Fact label="Operation" value={preflight.operation} />
        <Fact label="Requested target" value={preflight.requestedTarget} />
        <Fact label="Resolved boundary" value={preflight.protectedBoundary || preflight.resolvedTarget} emphasis />
        <Fact label="Execution" value={execution} emphasis />
        {hookRecorded && <Fact label="Verified hook outcome" value={preflight.hookOutcome} />}
      </div>

      <div className="destructive-preflight__assurances">
        <span className={preflight.humanReviewRequired ? 'active' : ''}><Icon name="lock" size={14} />{preflight.humanReviewRequired ? 'HUMAN REVIEW REQUIRED' : 'Human review state not recorded'}</span>
        <span className={preflight.deterministic ? 'active' : ''}><Icon name="evidence" size={14} />{preflight.deterministic ? 'Deterministic policy' : 'Policy basis not recorded'}</span>
        {preflight.policyVersion && <span><Icon name="file" size={14} />Policy {preflight.policyVersion}</span>}
      </div>

      {(preflight.reasons || []).length > 0 && (
        <div className="destructive-preflight__reasons">
          <span>Why this decision</span>
          <ul>{preflight.reasons.map((reason, index) => <li key={`${preflight.reasonCodes?.[index] || 'reason'}-${index}`}>{reason}</li>)}</ul>
        </div>
      )}

      <div className="destructive-preflight__next-action">
        <div><Icon name="arrow" size={16} /><span>Safer next action</span></div>
        <strong>{display(preflight.saferNextAction)}</strong>
      </div>
    </Panel>
  );
}
