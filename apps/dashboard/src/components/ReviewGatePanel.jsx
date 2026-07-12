import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function ReviewGatePanel({ gate }) {
  if (!gate) return null;
  const approved = gate.status === 'APPROVED';
  return (
    <Panel className={`gate-panel gate-panel--${String(gate.status).toLowerCase()}`}>
      <SectionHeader eyebrow="Human boundary" title="Review Gate" description="A local, file-backed approval record." icon="lock" action={<StatusPill status={gate.status} />} />
      <div className="gate-scope"><span>{approved ? 'Approved scope' : 'Recorded scope'}</span><strong>{gate.scope || 'No scope recorded'}</strong></div>
      <div className="gate-meta">
        <div><span>{approved ? 'Reviewer' : 'Decision actor'}</span><strong>{gate.approvedBy || 'Not recorded'}</strong></div>
        <div><span>{approved ? 'Approved' : 'Last updated'}</span><strong>{gate.approvedAt ? new Date(gate.approvedAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' }) : '—'}</strong></div>
      </div>
      <div className="gate-conditions">
        {(gate.conditions || []).map((item) => <span key={item}><Icon name="check" size={13} />{item}</span>)}
      </div>
      <p className="local-note"><Icon name="lock" size={13} /> Local approval artifact — not enterprise identity verification</p>
    </Panel>
  );
}
