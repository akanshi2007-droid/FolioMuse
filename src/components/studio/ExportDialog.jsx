import React, { useEffect, useState } from 'react';
import { Download, FileCode, FileText, Folder, Image as ImageIcon, PartyPopper } from 'lucide-react';
import Dialog from '../ui/Dialog.jsx';
import { buildZip, downloadBlob } from '../../lib/exportZip.js';
import { sfx } from '../../audio/sound.js';

const iconFor = (f) => (f.endsWith('.html') || f.endsWith('.css') ? FileCode : f.endsWith('.txt') ? FileText : f.startsWith('assets') ? ImageIcon : Folder);
const kb = (n) => (n > 1024 * 1024 ? `${(n / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(n / 1024))} KB`);

export default function ExportDialog({ profile, style, errors, score, onClose, onFix }) {
  const [state, setState] = useState({ status: 'building' });
  const [done, setDone] = useState(false);
  const blocking = Object.entries(errors);

  useEffect(() => {
    if (blocking.length) return;
    let alive = true;
    buildZip(profile, style)
      .then((r) => alive && setState({ status: 'ready', ...r }))
      .catch(() => alive && setState({ status: 'error' }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const download = () => {
    downloadBlob(state.blob, state.filename);
    sfx.fanfare();
    setDone(true);
  };

  return (
    <Dialog title="EXPORT.EXE" wide onClose={onClose}>
      {blocking.length > 0 ? (
        <div>
          <h3 className="font-display text-2xl text-ink">Almost there!</h3>
          <p className="mt-1 text-sm text-ink/70">Fix these first, then export:</p>
          <ul className="mt-3 space-y-1.5 text-[14px] text-ink">
            {blocking.slice(0, 6).map(([k, m]) => <li key={k} className="rounded-md border-2 border-pop-red bg-white px-3 py-1.5">⚠ {m}</li>)}
          </ul>
          <button type="button" className="pxbtn mt-5 !bg-pop-yellow" onClick={onFix}>Take me to the problem</button>
        </div>
      ) : state.status === 'building' ? (
        <p className="py-8 text-center font-pixel text-sm uppercase tracking-widest text-retro">Packing your ZIP<span className="animate-blink">_</span></p>
      ) : state.status === 'error' ? (
        <p className="text-pop-red">Something went wrong building the ZIP. Try again.</p>
      ) : (
        <div>
          <h3 className="font-display text-3xl leading-tight text-ink">{done ? 'Portfolio downloaded! 🎉' : 'Your portfolio is ready.'}</h3>
          <p className="mt-1 text-sm text-ink/70">
            <b className="font-mono text-ink">{state.filename}</b> · {kb(state.bytes)} · completeness {score}%
          </p>
          {score < 60 && <p className="mt-2 rounded-md border-2 border-pop-orange bg-pop-yellow/40 px-3 py-1.5 text-[13px] text-ink">Heads up: your profile is only {score}% complete. You can still export, then come back to add more.</p>}
          <ul className="mt-4 rounded-lg border-2 border-ink bg-white p-3 font-mono text-[13px] text-ink">
            <li className="flex items-center gap-2 font-bold"><Folder size={15} /> {state.filename.replace('.zip', '')}/</li>
            {state.files.map((f) => { const I = iconFor(f); return <li key={f} className="ml-5 flex items-center gap-2"><I size={14} className="text-retro" />{f}</li>; })}
          </ul>
          {done ? (
            <div className="mt-4 space-y-2 text-sm text-ink">
              <p className="font-bold">What now?</p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Unzip it and double-click <b>index.html</b> to open it.</li>
                <li>To put it online free: drag the folder onto <b>app.netlify.com/drop</b>.</li>
                <li>Or upload to a GitHub repo and turn on GitHub Pages.</li>
              </ol>
            </div>
          ) : null}
          <div className="mt-5 flex flex-wrap gap-3">
            <button type="button" data-sfx="none" onClick={download} className="pxbtn inline-flex items-center gap-2 !bg-pop-mint"><Download size={14} /> {done ? 'Download again' : 'Download ZIP'}</button>
            <button type="button" className="pxbtn" onClick={onClose}>Keep editing</button>
          </div>
        </div>
      )}
    </Dialog>
  );
}
