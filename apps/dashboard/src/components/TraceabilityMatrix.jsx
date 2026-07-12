import { Panel, SectionHeader, StatusPill } from './Panel.jsx';

export default function TraceabilityMatrix({ rows = [] }) {
  return (
    <Panel>
      <SectionHeader eyebrow="Requirement chain" title="Traceability Matrix" description="Intent → implementation → evidence, without skipping the claim boundary." />
      <div className="evidence-table-wrap">
        <table className="data-table trace-table">
          <thead><tr><th>Requirement</th><th>Implementation</th><th>Evidence</th><th>Status</th></tr></thead>
          <tbody>{rows.map((row) => <tr key={row.requirement}><td><strong>{row.requirement}</strong></td><td><code>{row.implementation}</code></td><td>{row.evidence}</td><td><StatusPill status={row.status} /></td></tr>)}</tbody>
        </table>
      </div>
    </Panel>
  );
}
