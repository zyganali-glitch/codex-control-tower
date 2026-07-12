import { useState } from 'react';
import { Panel, SectionHeader, StatusPill } from './Panel.jsx';
import Icon from './Icon.jsx';

export default function CodexPromptPanel({ mission }) {
  const [copied, setCopied] = useState(false);
  if (!mission) return null;

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(mission.prompt || '');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Panel className="prompt-panel panel--accent">
      <SectionHeader
        eyebrow="Next Codex run"
        title="Codex Mission Prompt"
        description={mission.title}
        icon="command"
        action={<StatusPill status={mission.status} />}
      />
      <div className="mission-objective"><span>Objective</span><strong>{mission.objective}</strong></div>
      <div className="mission-boundaries">
        <div>
          <span className="field-label">Allowed files</span>
          {(mission.allowedFiles || []).map((file) => <code key={file}>+ {file}</code>)}
        </div>
        <div>
          <span className="field-label">Forbidden actions</span>
          {(mission.forbiddenActions || []).map((item) => <span className="boundary boundary--deny" key={item}><Icon name="lock" size={12} />{item}</span>)}
        </div>
      </div>
      <div className="prompt-code">
        <div className="prompt-code__bar"><span><i /><i /><i />mission.prompt</span><button onClick={copyPrompt}><Icon name={copied ? 'check' : 'copy'} size={15} />{copied ? 'Copied' : 'Copy prompt'}</button></div>
        <p>{mission.prompt}</p>
      </div>
      <div className="required-evidence"><span className="field-label">Required closure evidence</span><div>{(mission.requiredEvidence || []).map((item) => <span key={item}><Icon name="check" size={13} />{item}</span>)}</div></div>
    </Panel>
  );
}
