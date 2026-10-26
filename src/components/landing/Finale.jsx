import React, { useState } from 'react';
import { Maximize2, Heart } from 'lucide-react';
import PixelLandscape from '../ui/PixelLandscape.jsx';
import { Cursor, Pad, Sparkle, Folio } from '../ui/Art.jsx';
import { sfx } from '../../audio/sound.js';

export default function Finale({ onStart }) {
  const [shake, setShake] = useState(false);
  return (
    <section className="dotgrid relative overflow-hidden bg-ink px-5 py-24 text-cream">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-pixel text-xs uppercase tracking-[.3em] text-pop-yellow"> ready player one?</p>
        <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">Your work deserves a better introduction.</h2>
      </div>

      <div className="mx-auto mt-14 max-w-xl">
        <div className="win">
          <div className="win-bar"><span>LANDSCAPE.EXE</span><span className="win-x"><Maximize2 size={12} /></span></div>
          <div className="relative mx-2 mb-2 overflow-hidden border-2 border-ink/60">
            <PixelLandscape />
            <Sparkle className="absolute right-6 top-4 animate-twinkle" size={38} />
            <Sparkle className="absolute right-20 top-14 animate-twinkle" size={20} color="#fff" />
            <button
              type="button" data-sfx="none"
              onClick={() => { sfx.start(); setTimeout(onStart, 350); }}
              className="pixelated absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 border-4 border-[#2c5a22] bg-[#78b84f] px-8 py-2 font-pixel text-4xl font-bold tracking-widest text-cream transition hover:scale-105 hover:bg-[#8ad05f] active:scale-95 md:px-12 md:text-5xl"
              style={{ boxShadow: 'inset -4px -4px 0 #4f8a35, inset 4px 4px 0 #a4dd7c, 0 5px 0 #1c1920', textShadow: '3px 3px 0 #2c5a22' }}
            >START</button>
            <Cursor className="absolute right-[24%] top-[42%] animate-wiggle" size={26} />
            <Pad className="absolute bottom-3 right-3" size={72} />
            <Heart className="absolute left-[36%] top-[58%] animate-floaty text-pop-pink" fill="currentColor" size={22} />
            <div className={`absolute bottom-3 left-3 w-[56%] border-2 border-retro bg-cream shadow-[3px_3px_0_rgba(0,0,0,.35)] ${shake ? 'animate-wiggle' : ''}`}>
              <div className="flex justify-between bg-retro px-2 py-[2px] font-pixel text-[10px] text-cream"><span>WARNING</span><span>x</span></div>
              <p className="px-2 py-1 text-center font-pixel text-[10px] leading-tight text-retro">DO YOU WANT TO GO BACK?</p>
              <div className="flex justify-center gap-2 pb-2">
                <button type="button" data-sfx="whoosh" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="border border-ink bg-cream2 px-3 font-pixel text-[10px] text-ink">Yes</button>
                <button type="button" data-sfx="coin" onClick={() => { setShake(true); setTimeout(() => setShake(false), 700); }} className="border border-ink bg-cream2 px-3 font-pixel text-[10px] text-ink">No</button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center font-pixel text-[11px] uppercase tracking-widest text-cream/60">free · no login · runs in your browser</p>
      </div>

      <footer className="mx-auto mt-24 flex max-w-5xl flex-col items-center justify-between gap-4 border-t-2 border-cream/15 pt-8 text-sm text-cream/60 md:flex-row">
        <div className="flex items-center gap-3"><Folio size={34} /><span className="font-display text-xl text-cream">FolioMuse</span></div>
        <p>Aakanksha Singh &amp; Stuti Verma </p>
        <p className="font-pixel text-[10px] uppercase tracking-widest">your story · your style · your portfolio</p>
      </footer>
    </section>
  );
}
