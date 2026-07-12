import { Panel, SectionHeader, StatusPill } from './Panel.jsx';

export default function MissingSurfaces({ items = [] }) {
  return (
    <Panel className="missing-panel">
      <SectionHeader eyebrow="Coverage gaps" title="Missing surfaces" description="Known gaps are kept actionable and visible." />
      <div className="surface-list">
        {items.map((item) => (
          <div className="surface-row" key={item.name}>
            <div><strong>{item.name}</strong><span>{item.impact}</span></div>
            <StatusPill status={item.priority} subtle />
          </div>
        ))}
      </div>
    </Panel>
  );
}
