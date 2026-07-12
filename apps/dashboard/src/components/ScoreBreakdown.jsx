import { Panel, SectionHeader } from './Panel.jsx';

export default function ScoreBreakdown({ items = [] }) {
  return (
    <Panel>
      <SectionHeader eyebrow="Weighted model" title="Score breakdown" description="Transparent dimensions behind the health score." />
      <div className="score-list">
        {items.map((item) => (
          <div className="score-row" key={item.label}>
            <div className="score-row__head">
              <div><strong>{item.label}</strong><small>{item.detail}</small></div>
              <span>{item.score}<small>/100</small></span>
            </div>
            <div className="score-row__track"><i style={{ width: `${item.score}%` }} /></div>
            <span className="score-row__weight">{item.weight}% weight</span>
          </div>
        ))}
      </div>
    </Panel>
  );
}
