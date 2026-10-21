import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, Monitor, Tablet, Smartphone, Check, TriangleAlert, Eye, Pencil } from 'lucide-react';
import { DetailsPanel, SkillsPanel, ProjectsPanel, LinksPanel, StylePanel } from './Panels.jsx';
import ExportDialog from './ExportDialog.jsx';
import ScaledFrame from '../ui/ScaledFrame.jsx';
import Meter from '../ui/Meter.jsx';
import { Confirm } from '../ui/Dialog.jsx';
import SoundToggle from '../ui/SoundToggle.jsx';
import { Folio } from '../ui/Art.jsx';
import { validateProfile } from '../../lib/validate.js';
import { scoreProfile } from '../../lib/completeness.js';
import { renderPortfolio } from '../../lib/render.js';
import { TEMPLATE_LIST } from '../../lib/templates/index.js';
import { emptyProfile, sampleProfile } from '../../lib/sample.js';
import { sfx } from '../../audio/sound.js';

const TABS = [['details', 'Details'], ['skills', 'Skills'], ['projects', 'Projects'], ['links', 'Links'], ['style', 'Style']];
const DEVICES = [['desktop', Monitor, 1280, 'Desktop'], ['tablet', Tablet, 820, 'Tablet'], ['mobile', Smartphone, 390, 'Mobile']];
const tabOfError = (k) => (k.startsWith('project') ? 'projects' : k.startsWith('social') ? 'links' : 'details');

export default function Studio({ profile, style, setProfile, setStyle, save, onBack, onReset }) {
  const [tab, setTab] = useState('details');
  const [mobileView, setMobileView] = useState('edit');
  const [device, setDevice] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 'mobile' : 'desktop'));
  const [touched, setTouched] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [confirm, setConfirm] = useState(null); // 'reset' | 'sample'
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState('');

  const errors = useMemo(() => validateProfile(profile), [profile]);
  const result = useMemo(() => scoreProfile(profile), [profile]);
  const err = (k) => (touched[k] || showAll ? errors[k] : undefined);
  const touch = (k) => setTouched((t) => ({ ...t, [k]: true }));
  const patch = (p) => setProfile((old) => ({ ...old, ...p }));

  // debounce the (heavy) preview render
  const [debounced, setDebounced] = useState({ profile, style });
  useEffect(() => { const t = setTimeout(() => setDebounced({ profile, style }), 160); return () => clearTimeout(t); }, [profile, style]);
  const html = useMemo(
    () => renderPortfolio(debounced.profile, debounced.style, {
      mode: 'preview',
      imageSrc: (kind, i) => (kind === 'photo' ? debounced.profile.photo : debounced.profile.projects[i]?.image || ''),
    }).html,
    [debounced],
  );

  const flash = (m) => { setToast(m); setTimeout(() => setToast(''), 3500); };
  const hasData = profile.name || profile.bio || profile.projects.length || profile.skills.length;
  const dev = DEVICES.find((d) => d[0] === device);

  const tryExport = () => {
    setShowAll(true);
    sfx.click();
    setExporting(true);
  };
  const fixFirst = () => {
    const first = Object.keys(errors)[0];
    setExporting(false);
    if (first) { setTab(tabOfError(first)); setMobileView('edit'); sfx.error(); }
  };

  return (
    <div className="flex h-screen flex-col bg-ink text-cream">
      <header className="flex items-center justify-between gap-2 border-b-2 border-cream/10 px-3 py-2 md:px-5">
        <div className="flex items-center gap-3">
          <button type="button" onClick={onBack} aria-label="Back to home" className="pxbtn inline-flex items-center gap-1"><ArrowLeft size={14} /><span className="hidden sm:inline">Home</span></button>
          <Folio size={28} /><span className="hidden font-display text-xl sm:inline">Studio</span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <span className={`hidden items-center gap-1 font-pixel text-[10px] uppercase tracking-widest sm:inline-flex ${save === 'error' ? 'text-pop-orange' : 'text-pop-mint'}`} role="status">
            {save === 'error' ? <><TriangleAlert size={12} /> Draft too big to save</> : <><Check size={12} /> {save === 'saving' ? 'Saving…' : 'Draft saved'}</>}
          </span>
          <SoundToggle />
          <button type="button" data-sfx="none" onClick={tryExport} className="pxbtn inline-flex items-center gap-1.5 !bg-pop-mint"><Download size={14} /> Export ZIP</button>
        </div>
      </header>

      {/* mobile edit/preview switch */}
      <div className="flex border-b-2 border-cream/10 md:hidden">
        {[['edit', Pencil, 'Edit'], ['preview', Eye, 'Preview']].map(([id, I, l]) => (
          <button key={id} type="button" data-sfx="toggle" onClick={() => setMobileView(id)} className={`flex flex-1 items-center justify-center gap-2 py-2 font-pixel text-[11px] uppercase tracking-widest ${mobileView === id ? 'bg-pop-yellow text-ink' : 'text-cream/70'}`}><I size={13} />{l}</button>
        ))}
      </div>

      <main className="grid min-h-0 flex-1 gap-4 p-3 md:grid-cols-[minmax(380px,460px)_1fr] md:p-4">
        {/* EDITOR */}
        <section className={`win flex min-h-0 flex-col ${mobileView === 'edit' ? '' : 'hidden md:flex'}`}>
          <div className="win-bar"><span>EDITOR.EXE</span><span className="font-pixel text-[10px] opacity-70">{TEMPLATE_LIST.find((t) => t.id === style.template)?.name}</span></div>
          <div className="win-body flex min-h-0 flex-1 flex-col">
            <Meter result={result} />
            <div className="flex gap-1 overflow-x-auto border-b-2 border-ink bg-cream2 px-2 pt-2" role="tablist">
              {TABS.map(([id, label]) => {
                const hasErr = Object.keys(errors).some((k) => showAll && tabOfError(k) === id);
                return (
                  <button key={id} role="tab" aria-selected={tab === id} data-sfx="select" onClick={() => setTab(id)}
                    className={`whitespace-nowrap rounded-t-lg border-2 border-b-0 border-ink px-3 py-1.5 font-pixel text-[11px] uppercase tracking-wider ${tab === id ? 'bg-cream text-ink' : 'bg-cream2 text-ink/60 hover:bg-white'}`}>
                    {label}{hasErr && <span className="ml-1 text-pop-red">!</span>}
                  </button>
                );
              })}
            </div>
            <div className="ink-scroll min-h-0 flex-1 overflow-y-auto p-4">
              {tab === 'details' && <DetailsPanel p={profile} set={patch} err={err} touch={touch} onImgError={flash}
                onSample={() => (hasData ? setConfirm('sample') : (setProfile(sampleProfile()), sfx.success()))} onReset={() => setConfirm('reset')} />}
              {tab === 'skills' && <SkillsPanel p={profile} set={patch} />}
              {tab === 'projects' && <ProjectsPanel p={profile} set={patch} err={err} touch={touch} onImgError={flash} />}
              {tab === 'links' && <LinksPanel p={profile} set={patch} err={err} touch={touch} />}
              {tab === 'style' && <StylePanel style={style} setStyle={(s) => setStyle((o) => ({ ...o, ...s }))} />}
            </div>
            <div className="flex justify-between border-t-2 border-ink bg-cream2 px-3 py-2">
              <button type="button" className="pxbtn" disabled={tab === TABS[0][0]} onClick={() => setTab(TABS[Math.max(0, TABS.findIndex((t) => t[0] === tab) - 1)][0])}>← Back</button>
              <button type="button" className="pxbtn !bg-pop-yellow" disabled={tab === TABS[TABS.length - 1][0]} onClick={() => setTab(TABS[Math.min(TABS.length - 1, TABS.findIndex((t) => t[0] === tab) + 1)][0])}>Next →</button>
            </div>
          </div>
        </section>

        {/* PREVIEW */}
        <section className={`win flex min-h-0 flex-col ${mobileView === 'preview' ? '' : 'hidden md:flex'}`}>
          <div className="win-bar">
            <span>PREVIEW.EXE</span>
            <div className="flex items-center gap-1">
              {DEVICES.map(([id, I, , name]) => (
                <button key={id} type="button" data-sfx="toggle" aria-label={`${name} preview`} aria-pressed={device === id} onClick={() => setDevice(id)}
                  className={`rounded p-1 ${device === id ? 'bg-pop-yellow text-ink' : 'text-cream hover:bg-cream/20'}`}><I size={15} /></button>
              ))}
            </div>
          </div>
          <div className="flex gap-1 overflow-x-auto border-b-2 border-ink bg-cream2 px-2 py-1.5">
            {TEMPLATE_LIST.map((t) => (
              <button key={t.id} type="button" data-sfx="select" aria-pressed={style.template === t.id}
                onClick={() => setStyle((o) => ({ ...o, template: t.id, accent: t.defaultAccent, palette: 0, fontPair: 'auto' }))}
                className={`whitespace-nowrap rounded-md border-2 border-ink px-2.5 py-1 font-pixel text-[10px] uppercase tracking-wider ${style.template === t.id ? 'bg-pop-yellow text-ink' : 'bg-cream text-ink/70 hover:bg-white'}`}>{t.name}</button>
            ))}
          </div>
          <div className="min-h-0 flex-1 bg-[#d9d2c1]">
            <ScaledFrame html={html} width={dev[2]} fill className="h-full w-full" title="Live portfolio preview" />
          </div>
        </section>
      </main>

      {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[95] -translate-x-1/2 rounded-lg border-2 border-ink bg-pop-yellow px-4 py-2 text-sm font-bold text-ink" style={{ boxShadow: '4px 4px 0 #1c1920' }}>{toast}</div>}

      {confirm && (
        <Confirm
          message={confirm === 'reset' ? 'Erase everything and start over?' : 'Replace your details with the sample profile?'}
          yes={confirm === 'reset' ? 'Erase' : 'Replace'} no="Keep mine"
          onNo={() => setConfirm(null)}
          onYes={() => { if (confirm === 'reset') { onReset(); setTouched({}); setShowAll(false); } else { setProfile(sampleProfile()); sfx.success(); } setConfirm(null); }}
        />
      )}
      {exporting && <ExportDialog profile={profile} style={style} errors={errors} score={result.score} onClose={() => setExporting(false)} onFix={fixFirst} />}
    </div>
  );
}
