import { useMemo, useState } from 'react';
import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

const states = ['ALL', 'PASS', 'WARN', 'FAIL', 'NOT_RUN', 'SIMULATED'];

export default function EvidencePanel({ boundary }) {
  const [filter, setFilter] = useState('ALL');
  const checks = boundary?.checks || [];
  const filtered = useMemo(() => filter === 'ALL' ? checks : checks.filter((item) => item.status === filter), [checks, filter]);

  return (
    <Panel className="evidence-panel">
      <SectionHeader eyebrow="Honesty contract" title="Evidence Boundary" description="PASS requires a recorded proof. Unavailable checks remain visible as NOT_RUN." icon="evidence" />
      <div className="evidence-summary">
        {states.slice(1).map((status) => (
          <button onClick={() => setFilter(filter === status ? 'ALL' : status)} className={`evidence-stat evidence-stat--${status.toLowerCase()} ${filter === status ? 'active' : ''}`} key={status}>
            <span>{status.replace('_', ' ')}</span><strong>{boundary?.summary?.[status] || 0}</strong>
          </button>
        ))}
      </div>
      <div className="evidence-table-wrap">
        <table className="data-table evidence-table">
          <thead><tr><th>Check</th><th>Status</th><th>Recorded evidence</th><th>Source</th></tr></thead>
          <tbody>{filtered.map((check) => (
            <tr key={check.id}>
              <td><span className="table-id">{check.id}</span><strong>{check.name}</strong></td>
              <td><StatusPill status={check.status} /></td>
              <td>{check.evidence}</td>
              <td><span className="source-chip"><Icon name="file" size={12} />{check.source}</span></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </Panel>
  );
}
