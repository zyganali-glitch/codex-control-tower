import { Panel, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function ScoreHero({ health, repository }) {
  const score = Number(health?.score || 0);
  const tone = score >= 75 ? 'healthy' : score >= 45 ? 'caution' : 'danger';

  return (
    <Panel className="score-hero" glow>
      <div className="score-hero__main">
        <div className={`score-ring score-ring--${tone}`} style={{ '--score': `${score * 3.6}deg` }}>
          <div className="score-ring__inside">
            <span className="score-ring__value">{score}</span>
            <span className="score-ring__unit">/ 100</span>
          </div>
        </div>
        <div className="score-hero__copy">
          <span className="eyebrow">Governance health</span>
          <h1>{health?.grade || 'Unscored'}</h1>
          <p>{health?.summary || 'Run a local scan to establish the evidence boundary.'}</p>
          <div className="score-hero__meta">
            <StatusPill status={score >= 75 ? 'PASS' : score >= 45 ? 'WARN' : 'FAIL'} />
            {health?.trend != null && <span className="trend"><Icon name="arrow" size={14} /> +{health.trend} from before</span>}
          </div>
        </div>
      </div>
      <div className="score-hero__stats">
        <div><span>Profile</span><strong>{repository?.profile || 'unassigned'}</strong></div>
        <div><span>Files scanned</span><strong>{repository?.filesScanned ?? '—'}</strong></div>
        <div><span>Branch</span><strong>{repository?.branch || 'local'}</strong></div>
      </div>
    </Panel>
  );
}
