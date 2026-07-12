import { Panel, SectionHeader, Meter } from './Panel.jsx';
import Icon from './Icon.jsx';

function scoreTone(value) {
  if (value >= 90) return 'green';
  if (value >= 75) return 'violet';
  return 'amber';
}

export default function ContextBudgetPanel({ trace }) {
  const budget = trace?.budget || {};
  const usedPercent = budget.limit
    ? Math.round((budget.used / budget.limit) * 100)
    : budget.maxItems ? Math.round((budget.selected / budget.maxItems) * 100) : 0;
  return (
    <Panel className="context-budget">
      <SectionHeader eyebrow="Codex-native recall" title="Context budget & selection trace" description="Every selected item explains why it earned space in the next mission." icon="trace" />
      <div className="budget-hero">
        <div className="budget-usage"><span>{budget.limit ? 'Context used' : 'Estimated context'}</span><strong>{Number(budget.used || 0).toLocaleString()} <small>{budget.limit ? `/ ${Number(budget.limit).toLocaleString()} ` : ''}{budget.unit || 'tokens'}</small></strong><div className="budget-track"><i style={{ width: `${Math.min(100, usedPercent)}%` }} /></div></div>
        <div className="budget-stat"><strong>{budget.selected || 0}</strong><span>selected{budget.maxItems ? ` / ${budget.maxItems} max` : ''}</span></div>
        <div className="budget-stat"><strong>{budget.candidates || 0}</strong><span>candidates</span></div>
      </div>
      <p className="selection-policy"><Icon name="spark" size={14} />{trace?.selectionPolicy}</p>
      <div className="context-items">
        {(trace?.selected || []).map((item, index) => (
          <article className="context-item" key={item.id}>
            <div className="context-item__rank">{String(index + 1).padStart(2, '0')}</div>
            <div className="context-item__content">
              <div className="context-item__head">
                <div><span>{item.kind}</span><h3>{item.label}</h3><code>{item.path}</code></div>
                <div className="context-item__tokens">{item.tokens} <small>tokens</small></div>
              </div>
              <p><strong>Selected because</strong> {item.reason}</p>
              <div className="context-scores">
                <Meter label="Relevance" value={item.relevance} tone={scoreTone(item.relevance)} />
                <Meter label="Freshness" value={item.freshness} tone={scoreTone(item.freshness)} />
                <Meter label="Importance" value={item.importance} tone={scoreTone(item.importance)} />
                <span className={`protected-flag ${item.protected ? 'active' : ''}`}><Icon name={item.protected ? 'lock' : 'file'} size={13} />{item.protected ? 'Protected' : 'Budgeted'}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
