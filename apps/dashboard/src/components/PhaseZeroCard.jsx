import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function PhaseZeroCard({ phase0 }) {
  if (!phase0) return null;
  const fields = [
    ['Goal', phase0.goal],
    ['Audience', phase0.audience],
    ['Success criteria', phase0.successCriteria],
    ['Biggest risk', phase0.biggestRisk],
  ];

  return (
    <Panel className="phase-card panel--accent">
      <SectionHeader eyebrow="Beginner alignment" title="Phase-0 brief" description="Plain-language intent captured before implementation." icon="spark" action={<StatusPill status={phase0.mode || 'READY'} />} />
      <div className="phase-grid">
        {fields.map(([label, value]) => <div className="phase-field" key={label}><span>{label}</span><p>{value}</p></div>)}
      </div>
      <div className="phase-lists">
        <div><span className="field-label">Forbidden without approval</span>{(phase0.forbiddenAreas || []).map((item) => <span className="constraint" key={item}><Icon name="lock" size={13} />{item}</span>)}</div>
        <div><span className="field-label">Expected evidence</span>{(phase0.expectedEvidence || []).map((item) => <span className="constraint constraint--evidence" key={item}><Icon name="check" size={13} />{item}</span>)}</div>
      </div>
      <div className="next-mission"><span>Next safe Codex mission</span><strong>{phase0.nextMission}</strong><Icon name="arrow" size={18} /></div>
    </Panel>
  );
}
