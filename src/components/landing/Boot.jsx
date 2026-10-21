import React, { useEffect, useState } from 'react';
import { Maximize2 } from 'lucide-react';
import PixelLandscape from '../ui/PixelLandscape.jsx';
import { Cursor, Pad, Sparkle } from '../ui/Art.jsx';
import { sfx } from '../../audio/sound.js';

// Retro "LANDSCAPE.EXE"-style loading screen. Click START to enter (also unlocks audio).
export default function Boot({ onDone }) {
  const [pct, setPct] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const ready = pct >= 100;

  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => { setPct((p) => Math.min(100, p + 3 + Math.random() * 9)); sfx.load(); }, 90);
    return () => clearTimeout(t);
  }, [pct, ready]);

  const start = () => {
    if (!ready || leaving) return;
    sfx.start();
    setLeaving(true);
    setTimeout(onDone, 650);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-cream p-4 transition-all duration-700 ${leaving ? 'scale-110 opacity-0' : ''}`}>
      <div className="w-full max-w-[440px]">
        <div className="mx-auto mb-4 h-5 w-4/5 border-2 border-retro bg-cream p-[2px]" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label="Loading">
          <div className="flex h-full gap-[2px]">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`h-full flex-1 ${i < pct / 5 ? 'bg-retro' : 'bg-transparent'}`} />
            ))}
          </div>
        </div>
        <p className="mb-3 text-center font-pixel text-sm tracking-[.3em] text-retro">{ready ? 'READY!' : 'LOADING...'}</p>

        <div className="win relative">
          <div className="win-bar"><span>FOLIOMUSE.EXE</span><span className="win-x"><Maximize2 size={12} /></span></div>
          <div className="relative mx-2 mb-2 overflow-hidden border-2 border-ink/60">
            <PixelLandscape />
            <Sparkle className="absolute right-6 top-4 animate-twinkle" size={34} />
            <Sparkle className="absolute right-16 top-12 animate-twinkle" size={18} color="#fff" />
            <button
              type="button"
              data-sfx="none"
              onClick={start}
              disabled={!ready}
              className={`pixelated absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2 border-4 border-[#2c5a22] bg-[#78b84f] px-8 py-2 font-pixel text-4xl font-bold tracking-widest text-cream transition ${ready ? 'cursor-pointer hover:scale-105 hover:bg-[#8ad05f] active:scale-95' : 'cursor-wait opacity-60 grayscale'}`}
              style={{ boxShadow: 'inset -4px -4px 0 #4f8a35, inset 4px 4px 0 #a4dd7c, 0 5px 0 #1c1920', textShadow: '3px 3px 0 #2c5a22' }}
            >
              START
            </button>
            <Cursor className={`absolute right-[22%] top-[46%] ${ready ? 'animate-wiggle' : 'opacity-0'}`} size={22} />
            <Pad className="absolute bottom-3 right-3" size={64} />
            <div className="absolute bottom-3 left-3 w-[58%] border-2 border-retro bg-cream text-[10px] shadow-[3px_3px_0_rgba(0,0,0,.35)]">
              <div className="flex justify-between bg-retro px-2 py-[2px] font-pixel text-cream"><span>WARNING</span><span>x</span></div>
              <p className="px-2 py-1 text-center font-pixel leading-tight text-retro">SKIP THE INTRO?</p>
              <div className="flex justify-center gap-2 pb-2">
                <button type="button" onClick={() => { sfx.whoosh(); setLeaving(true); setTimeout(onDone, 500); }} className="border border-ink bg-cream2 px-3 font-pixel text-ink">Yes</button>
                <button type="button" className="border border-ink bg-cream2 px-3 font-pixel text-ink">No</button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center font-pixel text-[11px] tracking-widest text-retro/80">{ready ? 'PRESS START TO BEGIN  ♪' : 'WARMING UP THE SOUND CHIP'}</p>
      </div>
    </div>
  );
}
