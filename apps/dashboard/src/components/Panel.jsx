import Icon from './Icon.jsx';

export function Panel({ children, className = '', glow = false }) {
  return <section className={`panel ${glow ? 'panel--glow' : ''} ${className}`}>{children}</section>;
}

export function SectionHeader({ eyebrow, title, description, action, icon }) {
  return (
    <header className="section-header">
      <div className="section-header__copy">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <div className="section-header__title-row">
          {icon && <span className="section-header__icon"><Icon name={icon} size={17} /></span>}
          <h2>{title}</h2>
        </div>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="section-header__action">{action}</div>}
    </header>
  );
}

export function StatusPill({ status, subtle = false }) {
  const normalized = String(status || 'UNKNOWN').toUpperCase().replaceAll(' ', '_');
  return <span className={`status-pill status-pill--${normalized.toLowerCase()} ${subtle ? 'status-pill--subtle' : ''}`}><i />{normalized.replaceAll('_', ' ')}</span>;
}

export function EmptyState({ title, detail }) {
  return <div className="empty-state"><Icon name="file" size={22} /><strong>{title}</strong><span>{detail}</span></div>;
}

export function Meter({ value, label, tone = 'violet' }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="meter" title={`${label}: ${safe}%`}>
      <div className="meter__head"><span>{label}</span><strong>{safe}</strong></div>
      <div className="meter__track"><i className={`meter__fill meter__fill--${tone}`} style={{ width: `${safe}%` }} /></div>
    </div>
  );
}
