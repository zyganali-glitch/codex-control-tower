import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function MistakeShieldPanel({ shield }) {
  if (!shield) return null;
  return (
    <Panel className={`shield-panel shield-panel--${shield.status.toLowerCase()}`}>
      <div className="shield-hero">
        <div className="shield-mark"><Icon name="shield" size={42} /><span>{shield.score}</span></div>
        <div><span className="eyebrow">Preflight action analysis</span><h2>Codex Mistake Shield</h2><p>{shield.summary}</p></div>
        <StatusPill status={shield.status} />
      </div>
      <div className="proposed-action"><span>Proposed action</span><strong>“{shield.action}”</strong></div>
      <div className="shield-matches">
        {(shield.matches || []).map((match) => (
          <article className={`shield-match shield-match--${match.severity.toLowerCase()}`} key={match.rule}>
            <div className="shield-match__mark"><Icon name={match.severity === 'BLOCKING' ? 'lock' : match.severity === 'CAUTION' ? 'risks' : 'evidence'} size={18} /></div>
            <div><span>{match.rule} · {match.severity}</span><h3>{match.title}</h3><p>{match.explanation}</p><small>Matched from {match.source}</small></div>
          </article>
        ))}
      </div>
      <div className="safe-rewrite"><div><Icon name="spark" size={18} /><span>Safe rewrite</span></div><strong>{shield.safeRewrite}</strong><button onClick={() => navigator.clipboard?.writeText(shield.safeRewrite)}><Icon name="copy" size={14} />Copy</button></div>
      <p className="shield-note">The shield never blocks silently. It names the rule, source, and a narrower next action.</p>
    </Panel>
  );
}
