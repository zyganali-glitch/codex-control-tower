import { Panel, SectionHeader } from './Panel.jsx';

const typeColors = {
  mission: '#b8a5ff', source: '#ff8d7f', test: '#60d9b7', memory: '#74b7ff', gate: '#d7ff70', evidence: '#ffc56d',
};

export default function ContextGraphPanel({ trace }) {
  const nodes = trace?.nodes || [];
  const edges = trace?.edges || [];
  const lookup = Object.fromEntries(nodes.map((node) => [node.id, node]));
  const sourceCount = nodes.filter((node) => node.type === 'source').length;
  const testCount = nodes.filter((node) => node.type === 'test').length;
  const governanceCount = nodes.filter((node) => ['mission', 'memory', 'gate', 'evidence'].includes(node.type)).length;
  const riskCount = nodes.filter((node) => node.risk && node.risk !== 'low').length;

  return (
    <Panel className="graph-panel">
      <SectionHeader eyebrow="Blast-radius view" title="Codex Context Graph" description="A deterministic map of what the mission touches, what constrains it, and what can prove it." icon="trace" />
      <div className="graph-stage" role="img" aria-label="Context graph connecting mission, source, tests, memory, review gate, and evidence">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs><filter id="nodeGlow"><feGaussianBlur stdDeviation="1.1" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter></defs>
          {edges.map((edge) => {
            const from = lookup[edge.from]; const to = lookup[edge.to];
            if (!from || !to) return null;
            const mx = (from.x + to.x) / 2; const my = (from.y + to.y) / 2;
            return <g key={`${edge.from}-${edge.to}`}><line className="graph-edge" x1={from.x} y1={from.y} x2={to.x} y2={to.y} /><text className="graph-edge-label" x={mx} y={my - 1}>{edge.label}</text></g>;
          })}
          {nodes.map((node) => (
            <g className={`graph-node graph-node--${node.type}`} key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <circle r={node.type === 'mission' ? 9 : 7} fill={`${typeColors[node.type] || typeColors.mission}18`} stroke={typeColors[node.type] || typeColors.mission} filter="url(#nodeGlow)" />
              <circle r="2" fill={typeColors[node.type] || typeColors.mission} />
              <text y={node.type === 'mission' ? 13 : 11}>{node.label}</text>
            </g>
          ))}
        </svg>
        <div className="graph-legend">{Object.entries(typeColors).map(([type, color]) => <span key={type}><i style={{ background: color }} />{type}</span>)}</div>
      </div>
      <div className="graph-insight">
        <span>Visible graph scope</span>
        <strong>{sourceCount} source · {testCount} test · {governanceCount} governance node(s)</strong>
        <p>{edges.length} recorded relation(s) · {riskCount} risk-linked node(s). Structural context is not proof that a command ran.</p>
      </div>
    </Panel>
  );
}
