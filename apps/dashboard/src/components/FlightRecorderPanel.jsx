import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

const icons = { MISSION: 'command', PROMPT: 'command', GATE: 'lock', APPROVAL: 'lock', COMMAND: 'recorder', CHANGE: 'trace', TEST: 'evidence', EVIDENCE: 'evidence', REPORT: 'file' };

export default function FlightRecorderPanel({ events = [] }) {
  return (
    <Panel className="recorder-panel">
      <SectionHeader eyebrow="Append-only session view" title="Codex Flight Recorder" description="What was requested, approved, executed, skipped, and written — in order." icon="recorder" action={<span className="live-local"><i />LOCAL LOG</span>} />
      <div className="recorder-layout">
        <div className="timeline">
          {events.map((event, index) => (
            <article className="timeline-event" key={event.id}>
              <div className="timeline-event__rail"><span className={`timeline-event__node timeline-event__node--${event.status.toLowerCase()}`}><Icon name={icons[event.type] || 'file'} size={15} /></span>{index < events.length - 1 && <i />}</div>
              <div className="timeline-event__time"><span>{new Date(event.at).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span><small>{new Date(event.at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</small></div>
              <div className="timeline-event__content">
                <div><span className="event-type">{event.type} · {event.id}</span><h3>{event.title}</h3><p>{event.detail}</p><small>Actor: {event.actor}</small></div>
                <StatusPill status={event.status} />
              </div>
            </article>
          ))}
        </div>
        <aside className="recorder-aside">
          <span className="eyebrow">Session closure</span>
          <h3>Carry the recorded trail between runs.</h3>
          <div className="closure-stat"><span>Events recorded</span><strong>{events.length}</strong></div>
          <div className="closure-stat"><span>NOT_RUN preserved</span><strong>{events.filter((event) => event.status === 'NOT_RUN').length}</strong></div>
          <div className="closure-stat"><span>Human gate events</span><strong>{events.filter((event) => ['GATE', 'APPROVAL'].includes(event.type)).length}</strong></div>
          <p><Icon name="lock" size={13} /> Local JSONL is visible and portable, not tamper-proof or identity-verified.</p>
        </aside>
      </div>
    </Panel>
  );
}
