import React, { useEffect, useRef, useState } from 'react';
import Landing from './components/landing/Landing.jsx';
import Studio from './components/studio/Studio.jsx';
import { loadDraft, saveDraft, clearDraft } from './lib/storage.js';
import { emptyProfile, sampleProfile } from './lib/sample.js';
import { sfx } from './audio/sound.js';

const DEFAULT_STYLE = { template: 'pop', accent: '#ff6fa8', palette: 0, fontPair: 'auto', density: 'comfortable' };

function initial() {
  const d = loadDraft();
  if (d && d.profile && d.style) {
    return { profile: { ...emptyProfile(), ...d.profile, socials: { ...emptyProfile().socials, ...d.profile.socials } }, style: { ...DEFAULT_STYLE, ...d.style } };
  }
  return { profile: emptyProfile(), style: DEFAULT_STYLE };
}

export default function App() {
  const init = useRef(null);
  if (!init.current) init.current = initial();
  const [view, setView] = useState(() => (window.location.hash === '#studio' ? 'studio' : 'landing'));
  const [profile, setProfile] = useState(init.current.profile);
  const [style, setStyle] = useState(init.current.style);
  const [save, setSave] = useState('saved');
  const first = useRef(true);

  // autosave drafts (debounced)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setSave('saving');
    const t = setTimeout(() => setSave(saveDraft({ profile, style }) ? 'saved' : 'error'), 500);
    return () => clearTimeout(t);
  }, [profile, style]);

  useEffect(() => {
    const onHash = () => setView(window.location.hash === '#studio' ? 'studio' : 'landing');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (v) => {
    sfx.whoosh();
    window.location.hash = v === 'studio' ? 'studio' : '';
    setView(v);
    window.scrollTo(0, 0);
  };

  const pickTemplate = (id) => {
    const empty = !profile.name && !profile.bio && !profile.projects.length;
    if (empty) setProfile(sampleProfile());
    setStyle((s) => ({ ...s, template: id, accent: { noir: '#e9b872', volt: '#c8ff00', paper: '#b4452c', terminal: '#39ff88', pop: '#ff6fa8' }[id], palette: 0, fontPair: 'auto' }));
    go('studio');
  };

  if (view === 'studio') {
    return (
      <Studio profile={profile} style={style} setProfile={setProfile} setStyle={setStyle} save={save}
        onBack={() => go('landing')} onReset={() => { clearDraft(); setProfile(emptyProfile()); setStyle(DEFAULT_STYLE); }} />
    );
  }
  return <Landing onStudio={() => go('studio')} onPickTemplate={pickTemplate} />;
}
