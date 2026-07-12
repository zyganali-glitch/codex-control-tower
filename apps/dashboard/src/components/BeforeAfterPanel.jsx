import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

function ScoreOrb({ value, variant }) {
  const score = Number.isFinite(value) ? value : null;
  return <div className={`compare-score compare-score--${variant}`} style={{ '--score': `${(score || 0) * 3.6}deg` }}><span>{score ?? '—'}</span><small>/ 100</small></div>;
}

export default function BeforeAfterPanel({ comparison }) {
  if (!comparison) return null;
  const { before, after } = comparison;
  const display = (value) => value === null || value === undefined ? '—' : value;
  const percent = (value) => Number.isFinite(value) ? `${value}%` : '—';
  const yesNoUnknown = (value) => value === true ? 'YES' : value === false ? 'NO' : 'UNKNOWN';
  const delta = Number.isFinite(before.score) && Number.isFinite(after.score) ? after.score - before.score : null;
  const riskChangeAvailable = Number.isFinite(before.riskFlags) && Number.isFinite(after.riskFlags);
  const rows = [
    ['Risk flags', display(before.riskFlags), display(after.riskFlags), 'number'],
    ['Governance surfaces', display(before.governanceSurfaces), display(after.governanceSurfaces), 'number'],
    ['Evidence coverage', percent(before.evidenceCoverage), percent(after.evidenceCoverage), 'number'],
    ['Review Gate', before.reviewGate, after.reviewGate, 'status'],
    ['Mistake Shield', before.mistakeShield, after.mistakeShield, 'status'],
    ['Context Trace', before.contextTrace, after.contextTrace, 'status'],
    ['Working tests', before.tests, after.tests, 'status'],
    ['NOT_RUN visible', yesNoUnknown(before.notRunVisible), yesNoUnknown(after.notRunVisible), 'plain'],
  ];

  return (
    <Panel className="comparison-panel">
      <SectionHeader eyebrow="Recorded snapshots" title="Before / After governance comparison" description="Values come from recorded report data; missing values remain unknown." icon="compare" action={<StatusPill status={comparison.mode || 'UNKNOWN'} />} />
      <div className="compare-hero">
        <div className="compare-side compare-side--before"><ScoreOrb value={before.score} variant="before" /><div><span>BEFORE</span><h3>{before.label}</h3><code>{before.path}</code></div></div>
        <div className="compare-delta"><span>{delta == null ? '—' : `${delta >= 0 ? '+' : ''}${delta}`}</span><small>governance points</small><Icon name="arrow" size={24} /></div>
        <div className="compare-side compare-side--after"><ScoreOrb value={after.score} variant="after" /><div><span>AFTER</span><h3>{after.label}</h3><code>{after.path}</code></div></div>
      </div>
      <div className="comparison-table">
        <div className="comparison-table__head"><span>Signal</span><span>Before</span><span>Change</span><span>After</span></div>
        {rows.map(([label, oldValue, newValue, type]) => (
          <div className="comparison-row" key={label}>
            <strong>{label}</strong>
            <span>{type === 'status' ? <StatusPill status={oldValue} subtle /> : oldValue}</span>
            <Icon name="arrow" size={15} />
            <span>{type === 'status' ? <StatusPill status={newValue} subtle /> : newValue}</span>
          </div>
        ))}
      </div>
      {riskChangeAvailable && <div className="comparison-outcome">
        <div><Icon name="shield" size={18} /><span><strong>Recorded risk change</strong>{before.riskFlags} flags → {after.riskFlags} flags</span></div>
      </div>}
    </Panel>
  );
}
