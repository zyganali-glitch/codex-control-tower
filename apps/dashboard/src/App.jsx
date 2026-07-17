import { useEffect, useMemo, useRef, useState } from 'react';
import sampleReport from './sample-report.json';
import normalizeReport from './reportAdapter.js';
import Icon from './components/Icon.jsx';
import { Panel, SectionHeader, StatusPill } from './components/Panel.jsx';
import ScoreHero from './components/ScoreHero.jsx';
import ScoreBreakdown from './components/ScoreBreakdown.jsx';
import RiskCards from './components/RiskCards.jsx';
import MissingSurfaces from './components/MissingSurfaces.jsx';
import PhaseZeroCard from './components/PhaseZeroCard.jsx';
import CodexPromptPanel from './components/CodexPromptPanel.jsx';
import CodexLiveReviewPanel from './components/CodexLiveReviewPanel.jsx';
import ReviewGatePanel from './components/ReviewGatePanel.jsx';
import EvidencePanel from './components/EvidencePanel.jsx';
import TraceabilityMatrix from './components/TraceabilityMatrix.jsx';
import ContextBudgetPanel from './components/ContextBudgetPanel.jsx';
import ContextGraphPanel from './components/ContextGraphPanel.jsx';
import MemoryLensPanel from './components/MemoryLensPanel.jsx';
import FlightRecorderPanel from './components/FlightRecorderPanel.jsx';
import DestructiveActionPreflightPanel from './components/DestructiveActionPreflightPanel.jsx';
import MistakeShieldPanel from './components/MistakeShieldPanel.jsx';
import BeforeAfterPanel from './components/BeforeAfterPanel.jsx';

const tabs = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'risks', label: 'Risks', icon: 'risks' },
  { id: 'context', label: 'Context Trace', icon: 'trace' },
  { id: 'evidence', label: 'Evidence', icon: 'evidence' },
  { id: 'memory', label: 'Memory Lens', icon: 'memory' },
  { id: 'recorder', label: 'Flight Recorder', icon: 'recorder' },
  { id: 'shield', label: 'Safety Preflight', icon: 'shield' },
  { id: 'compare', label: 'Before / After', icon: 'compare' },
];

const pageCopy = {
  overview: ['Blind GPT-5.6 evidence challenge', "GPT-5.6 reads neutral claims and bounded raw evidence in an empty ephemeral no-tool workspace; locked local states stay authoritative."],
  risks: ['Risk intelligence', 'Prioritized findings with explicit mitigations and no silent blockers.'],
  context: ['Context Trace', 'See what context Codex receives, why it was selected, and how much of the budget it consumes.'],
  evidence: ['Evidence & review', 'Separate verified claims from warnings, failures, unavailable checks, and simulated proof.'],
  memory: ['Memory Lens', 'Carry validated lessons forward while keeping stale assumptions visible.'],
  recorder: ['Flight Recorder', 'A chronological, local record of missions, gates, commands, evidence, and skipped checks.'],
  shield: ['Safety preflight', 'Resolve destructive targets against protected boundaries, then keep the legacy action-text compatibility check visible.'],
  compare: ['Before / After', 'Prepared starting and governed snapshots of the same fictional project, scanned by the same real tool.'],
};

const isHostedPages = window.location.hostname.endsWith('.github.io');

function publicProvenance(report) {
  const reconciliation = report.codexLiveReview?.reconciliation || {};
  const version = report.submission?.version
    || report.submissionVersion
    || report.release?.tag
    || report.releaseTag
    || report.build?.version
    || null;
  const commit = report.submission?.commit
    || report.gitCommit
    || reconciliation.evidenceIntegrity?.gitCommit
    || reconciliation.reportProvenance?.gitCommit
    || report.codexLiveReview?.provenance?.gitCommit
    || null;
  return {
    version: version || (report.schemaVersion ? `report schema ${report.schemaVersion}` : null),
    commit,
  };
}

function getInitialTab() {
  const hash = window.location.hash.replace('#', '');
  return tabs.some((tab) => tab.id === hash) ? hash : 'overview';
}

function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [report, setReport] = useState(() => normalizeReport(sampleReport));
  const [navOpen, setNavOpen] = useState(false);
  const [notice, setNotice] = useState('');
  const [liveEnabled, setLiveEnabled] = useState(true);
  const fileInput = useRef(null);
  const title = pageCopy[activeTab];

  useEffect(() => {
    const onHash = () => setActiveTab(getInitialTab());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (!liveEnabled) return undefined;
    let active = true;
    async function refreshLiveReport() {
      try {
        const response = await fetch(`./live-report.json?t=${Date.now()}`, { cache: 'no-store' });
        if (!response.ok) return;
        const raw = await response.json();
        if (active && raw.codexLiveReview) setReport(normalizeReport(raw));
      } catch {
        // The bundled report remains usable before the live reconciliation file exists.
      }
    }
    refreshLiveReport();
    const timer = isHostedPages ? null : window.setInterval(refreshLiveReport, 1500);
    return () => {
      active = false;
      if (timer) window.clearInterval(timer);
    };
  }, [liveEnabled]);

  const evidenceCount = useMemo(() => Object.values(report.evidenceBoundary?.summary || {}).reduce((sum, count) => sum + Number(count), 0), [report]);

  function navigate(id) {
    setActiveTab(id);
    setNavOpen(false);
    window.history.replaceState(null, '', `#${id}`);
    document.querySelector('.workspace')?.focus({ preventScroll: true });
  }

  async function loadLocalReport(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (!(parsed.repository || parsed.project || parsed.targetPath) || !(parsed.health || parsed.score != null)) throw new Error('Missing project or health fields');
      setReport(normalizeReport(parsed));
      setLiveEnabled(false);
      setNotice(`Loaded ${file.name} locally`);
    } catch (error) {
      setNotice(`Could not load report: ${error.message}`);
    }
    event.target.value = '';
    window.setTimeout(() => setNotice(''), 3200);
  }

  function exportReport() {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'CONTROL_TOWER_REPORT.json';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const isFictionalSample = report.sampleContext?.fictional || report.mode === 'SIMULATED';
  const disclosureLabel = isFictionalSample ? 'FICTIONAL SAMPLE PROJECT' : report.mode || 'LOCAL';
  const environmentLabel = isHostedPages ? 'Static recorded demo' : 'Local live session';
  const dataFlowLabel = isHostedPages ? 'Recorded JSON snapshot' : 'Local files + Codex';
  const privacyCopy = isHostedPages
    ? 'A JSON you load is parsed only in this browser tab'
    : 'A JSON you load stays on this device';
  const provenance = publicProvenance(report);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to dashboard content</a>
      <aside className={`sidebar ${navOpen ? 'sidebar--open' : ''}`}>
        <div className="brand">
          <div className="brand-mark"><span /><span /><span /><i /></div>
          <div><strong>Codex</strong><span>CONTROL TOWER</span></div>
          <button className="sidebar-close" onClick={() => setNavOpen(false)} aria-label="Close navigation"><Icon name="close" /></button>
        </div>
        <div className="sidebar-label">MISSION CONTROL</div>
        <nav className="sidebar-nav" aria-label="Dashboard views">
          {tabs.map((tab) => (
            <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => navigate(tab.id)} aria-current={activeTab === tab.id ? 'page' : undefined}>
              <Icon name={tab.icon} size={18} /><span>{tab.label}</span>
              {tab.id === 'risks' && <em>{report.risks?.filter((risk) => risk.status === 'OPEN').length || 0}</em>}
              {tab.id === 'evidence' && <em>{evidenceCount}</em>}
            </button>
          ))}
        </nav>
        <div className="sidebar-system">
          <div className="system-head"><span>{environmentLabel.toUpperCase()}</span><i /></div>
          <div><span>Scanner</span><strong>Ready</strong></div>
          <div><span>GPT-5.6 blind audit</span><strong>{report.codexLiveReview?.state || 'Ready'}</strong></div>
          <div><span>Data flow</span><strong>{dataFlowLabel}</strong></div>
        </div>
        <div className="sidebar-foot"><Icon name="lock" size={13} /><span>{privacyCopy}</span></div>
      </aside>
      {navOpen && <button className="nav-scrim" aria-label="Close navigation" onClick={() => setNavOpen(false)} />}

      <div className="main-shell">
        <div className={`disclosure disclosure--${String(report.mode).toLowerCase()}`}>
          <Icon name="spark" size={13} />
          {isFictionalSample ? (
            <>
              <strong>FICTIONAL SAMPLE PROJECT</strong>
              <span className="disclosure__detail">prepared InvoiceFlow Mini snapshots</span>
              <i className="disclosure__separator" aria-hidden="true" />
              <strong className="disclosure__real">REAL EXECUTION</strong>
              <span className="disclosure__detail">scans, two tests, hashes, and a recorded blind GPT-5.6 semantic audit</span>
            </>
          ) : (
            <><strong>{disclosureLabel}</strong><span>{report.disclosure || 'Local report data'}</span></>
          )}
        </div>
        <header className="topbar">
          <button className="menu-button" onClick={() => setNavOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button>
          <div className="repo-select">
            <div className="repo-icon"><Icon name="command" size={17} /></div>
            <div><span>ACTIVE REPOSITORY</span><strong>{report.repository?.name || 'Unnamed repository'}</strong></div>
            <StatusPill status={report.repository?.profile || 'local'} subtle />
          </div>
          <div className="topbar-actions">
            <span className="scan-time"><i />Scanned {new Date(report.generatedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</span>
            <input ref={fileInput} className="visually-hidden" type="file" accept="application/json,.json" onChange={loadLocalReport} />
            <button className="button button--ghost" onClick={() => fileInput.current?.click()}><Icon name="file" size={15} />Load report</button>
            <button className="button button--primary" onClick={exportReport}><Icon name="download" size={15} />Export JSON</button>
          </div>
        </header>

        <main className="workspace" id="main-content" tabIndex="-1">
          <header className="page-heading">
            <div><span className="eyebrow">{report.repository?.path}</span><h1>{title[0]}</h1><p>{title[1]}</p></div>
            <div className="heading-chips public-provenance" aria-label="Public report provenance">
              <span><i className="dot dot--green" />{environmentLabel}</span>
              {provenance.version && <span title="Recorded release or report version">Version {provenance.version}</span>}
              {provenance.commit && <span title={provenance.commit}>Commit {String(provenance.commit).slice(0, 12)}</span>}
            </div>
          </header>

          {activeTab === 'overview' && <Overview report={report} navigate={navigate} />}
          {activeTab === 'risks' && <Risks report={report} />}
          {activeTab === 'context' && <Context report={report} />}
          {activeTab === 'evidence' && <Evidence report={report} />}
          {activeTab === 'memory' && <MemoryLensPanel memory={report.memoryLens} />}
          {activeTab === 'recorder' && <FlightRecorderPanel events={report.flightRecorder} />}
          {activeTab === 'shield' && (
            <div className="view-stack">
              <DestructiveActionPreflightPanel preflight={report.destructiveActionPreflight} />
              <MistakeShieldPanel shield={report.mistakeShield} />
            </div>
          )}
          {activeTab === 'compare' && <BeforeAfterPanel comparison={report.comparison} />}
        </main>
      </div>
      {notice && <div className="toast"><Icon name="file" size={15} />{notice}</div>}
    </div>
  );
}

function Overview({ report, navigate }) {
  const boundary = report.evidenceBoundary?.summary || {};
  return (
    <div className="view-stack">
      <CodexLiveReviewPanel review={report.codexLiveReview} report={report} />
      <ScoreHero health={report.health} repository={report.repository} />
      <div className="signal-strip">
        <button onClick={() => navigate('risks')}><span className="signal-icon signal-icon--risk"><Icon name="risks" /></span><span><small>Open risk flags</small><strong>{report.risks?.filter((risk) => risk.status === 'OPEN').length || 0}</strong></span><Icon name="chevron" size={15} /></button>
        <button onClick={() => navigate('evidence')}><span className="signal-icon signal-icon--pass"><Icon name="evidence" /></span><span><small>Evidence checks passed</small><strong>{boundary.PASS || 0}</strong></span><Icon name="chevron" size={15} /></button>
        <button onClick={() => navigate('evidence')}><span className="signal-icon signal-icon--notrun"><Icon name="recorder" /></span><span><small>Visible NOT_RUN gates</small><strong>{boundary.NOT_RUN || 0}</strong></span><Icon name="chevron" size={15} /></button>
        <button onClick={() => navigate('shield')}><span className="signal-icon signal-icon--shield"><Icon name="shield" /></span><span><small>{report.destructiveActionPreflight ? 'Destructive preflight' : 'Mistake Shield'}</small><strong>{report.destructiveActionPreflight?.decision || report.mistakeShield?.status || '—'}</strong></span><Icon name="chevron" size={15} /></button>
      </div>
      <div className="two-column two-column--wide"><ScoreBreakdown items={report.scoreBreakdown} /><MissingSurfaces items={report.missingSurfaces} /></div>
      <PhaseZeroCard phase0={report.phase0} />
      <CodexPromptPanel mission={report.missionPrompt} />
      <div className="two-column"><ReviewGatePanel gate={report.reviewGate} /><RiskCards risks={report.risks} compact /></div>
    </div>
  );
}

function Risks({ report }) {
  const high = report.risks?.filter((risk) => ['CRITICAL', 'HIGH'].includes(risk.severity)).length || 0;
  const beforeRisks = report.comparison?.before?.riskFlags;
  const afterRisks = report.comparison?.after?.riskFlags;
  const reduction = Number.isFinite(beforeRisks) && Number.isFinite(afterRisks) ? beforeRisks - afterRisks : null;
  return <div className="view-stack"><div className="risk-stats"><Panel><span>High severity</span><strong>{high}</strong><small>Requires explicit follow-up</small></Panel><Panel><span>Risk reduction</span><strong>{reduction ?? '—'}</strong><small>{reduction == null ? 'No before snapshot recorded' : 'Flags removed since before state'}</small></Panel><Panel><span>Accepted</span><strong>{report.risks?.filter((risk) => risk.status === 'ACCEPTED').length || 0}</strong><small>Visible, documented trade-offs</small></Panel></div><RiskCards risks={report.risks} /><MissingSurfaces items={report.missingSurfaces} /></div>;
}

function Context({ report }) {
  return <div className="view-stack"><ContextBudgetPanel trace={report.contextTrace} /><ContextGraphPanel trace={report.contextTrace} /></div>;
}

function Evidence({ report }) {
  return <div className="view-stack"><EvidencePanel boundary={report.evidenceBoundary} /><TraceabilityMatrix rows={report.traceability} /><ReviewGatePanel gate={report.reviewGate} /></div>;
}

export default App;
