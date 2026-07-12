import { useState } from 'react';
import { Panel, SectionHeader, StatusPill, Meter } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function MemoryLensPanel({ memory }) {
  const [active, setActive] = useState('ALL');
  const items = memory?.items || [];
  const pillars = ['ALL', ...new Set(items.map((item) => item.pillar))];
  const shown = active === 'ALL' ? items : items.filter((item) => item.pillar === active);

  return (
    <Panel className="memory-panel">
      <SectionHeader eyebrow="Continuity layer" title="Codex Memory Lens" description="Validated lessons, constraints, and stale assumptions selected for the current mission." icon="memory" />
      <div className="memory-summary">
        {Object.entries(memory?.summary || {}).map(([label, value]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}
      </div>
      <div className="pill-tabs" aria-label="Memory pillars">
        {pillars.map((pillar) => <button className={active === pillar ? 'active' : ''} onClick={() => setActive(pillar)} key={pillar}>{pillar}</button>)}
      </div>
      <div className="memory-grid">
        {shown.map((item) => (
          <article className={`memory-card ${item.status === 'STALE' ? 'memory-card--stale' : ''}`} key={item.id}>
            <div className="memory-card__top">
              <span className="memory-pillar"><Icon name="memory" size={13} />{item.pillar}</span>
              <div>{item.protected && <span className="protected-mini"><Icon name="lock" size={11} />protected</span>}<StatusPill status={item.status} subtle /></div>
            </div>
            <span className="table-id">{item.id}</span><h3>{item.title}</h3><p>{item.detail}</p>
            <div className="memory-meters"><Meter label="Confidence" value={item.confidence} tone="violet" /><Meter label="Freshness" value={item.freshness} tone={item.freshness < 50 ? 'amber' : 'green'} /><Meter label="Importance" value={item.importance} tone="blue" /></div>
          </article>
        ))}
      </div>
      <div className="memory-honesty"><Icon name="shield" size={16} /><div><strong>Memory is guidance, not ground truth.</strong><span>Stale entries stay visible so Codex can revalidate them instead of silently treating them as current.</span></div></div>
    </Panel>
  );
}
