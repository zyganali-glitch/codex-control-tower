import { useMemo, useState } from 'react';
import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

const order = { CRITICAL: -1, HIGH: 0, MEDIUM: 1, LOW: 2 };

export default function RiskCards({ risks = [], compact = false }) {
  const [filter, setFilter] = useState('ALL');
  const visible = useMemo(() => risks
    .filter((risk) => filter === 'ALL' || risk.severity === filter)
    .sort((a, b) => (order[a.severity] ?? 99) - (order[b.severity] ?? 99)), [risks, filter]);
  const shown = compact ? visible.slice(0, 2) : visible;

  return (
    <Panel>
      <SectionHeader
        eyebrow="Risk register"
        title="Risks that still deserve attention"
        description="Flags are findings, not hidden verdicts. Every item keeps its mitigation beside it."
        icon="risks"
        action={!compact && (
          <div className="segmented" aria-label="Filter risks">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}
          </div>
        )}
      />
      <div className="risk-list">
        {shown.map((risk) => (
          <article className={`risk-card risk-card--${risk.severity.toLowerCase()}`} key={risk.id}>
            <div className="risk-card__icon"><Icon name="risks" size={19} /></div>
            <div className="risk-card__body">
              <div className="risk-card__top">
                <div><span className="risk-id">{risk.id} · {risk.area}</span><h3>{risk.title}</h3></div>
                <div className="risk-card__badges"><StatusPill status={risk.severity} subtle /><StatusPill status={risk.status} subtle /></div>
              </div>
              <p>{risk.detail}</p>
              <div className="mitigation"><Icon name="shield" size={15} /><span><strong>Mitigation</strong>{risk.mitigation}</span></div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
