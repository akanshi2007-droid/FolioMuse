import React, { useEffect, useState } from 'react';
import Boot from './Boot.jsx';
import Hero from './Hero.jsx';
import Why from './Why.jsx';
import RoadMap from './RoadMap.jsx';
import Gallery from './Gallery.jsx';
import Finale from './Finale.jsx';
import SoundToggle from '../ui/SoundToggle.jsx';
import { Folio } from '../ui/Art.jsx';

export default function Landing({ onStudio, onPickTemplate }) {
  const [booted, setBooted] = useState(() => {
    try { return sessionStorage.getItem('foliomuse.booted') === '1'; } catch { return false; }
  });
  const finishBoot = () => {
    try { sessionStorage.setItem('foliomuse.booted', '1'); } catch { /* ignore */ }
    setBooted(true);
  };

  useEffect(() => { document.body.style.overflow = booted ? '' : 'hidden'; return () => { document.body.style.overflow = ''; }; }, [booted]);

  return (
    <>
      {!booted && <Boot onDone={finishBoot} />}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b-2 border-cream/10 bg-ink/85 px-4 py-2.5 backdrop-blur md:px-8">
        <a href="#top" className="flex items-center gap-2"><Folio size={30} /><span className="font-display text-2xl text-cream">FolioMuse</span></a>
        <div className="flex items-center gap-2 md:gap-4">
          <a href="#how" className="hidden font-pixel text-[11px] uppercase tracking-widest text-cream/70 hover:text-pop-yellow md:inline">How it works</a>
          <a href="#templates" className="hidden font-pixel text-[11px] uppercase tracking-widest text-cream/70 hover:text-pop-yellow md:inline">Templates</a>
          <SoundToggle />
          <button type="button" onClick={onStudio} data-sfx="coin" className="pxbtn !bg-pop-yellow">Studio</button>
        </div>
      </nav>
      <Hero onStart={onStudio} />
      <Why />
      <RoadMap />
      <Gallery onPick={onPickTemplate} />
      <Finale onStart={onStudio} />
    </>
  );
}
