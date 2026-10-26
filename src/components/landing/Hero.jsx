import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Folio, Sparkle, Daisy, Pencil, Pad, Cursor, Ribbon } from '../ui/Art.jsx';

export default function Hero({ onStart }) {
  return (
    <header className="relative overflow-hidden bg-ink pb-28 pt-10 text-center md:pt-14">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-60" />

      {/* rainbow ribbon swoosh */}
      <svg className="pointer-events-none absolute left-1/2 top-[120px] w-[1500px] max-w-none -translate-x-1/2 md:top-[150px]" viewBox="0 0 1500 520" aria-hidden="true">
        <Ribbon d="M-40 120 C 260 -40, 520 40, 640 230 S 900 480, 1120 380 S 1360 190, 1560 330" width={110} />
      </svg>

      {/* floating illustrations */}
      <Daisy className="absolute left-[6%] top-[22%] hidden animate-floaty md:block" size={84} />
      <Pencil className="absolute right-[8%] top-[18%] hidden animate-floaty md:block [--r:-20deg]" size={100} />
      <Sparkle className="absolute left-[18%] top-[12%] animate-twinkle" size={30} />
      <Sparkle className="absolute right-[20%] top-[40%] animate-twinkle" size={22} color="#ff6fa8" />
      <Sparkle className="absolute left-[10%] top-[55%] animate-twinkle" size={20} color="#7fe0b4" />
      <Pad className="absolute right-[10%] bottom-[22%] hidden animate-floaty md:block [--r:10deg]" size={92} />
      <Cursor className="absolute left-[24%] bottom-[24%] hidden animate-wiggle md:block" size={34} />

      <div className="relative mx-auto max-w-5xl px-5">
        <p className="rise mx-auto mb-5 inline-block rotate-[-2deg] rounded-full border-[3px] border-cream bg-pop-purple px-4 py-1 font-pixel text-[11px] uppercase tracking-widest text-cream">
          portfolio generator 
        </p>
        <h1 className="rise font-display leading-[.9] text-cream" style={{ fontSize: 'clamp(64px, 14vw, 190px)', animationDelay: '.1s' }}>
          Your story,
          <br />
          <span className="text-pop-yellow" style={{ WebkitTextStroke: '0' }}>your style.</span>
        </h1>
        <p className="rise mx-auto mt-12 max-w-xl text-lg text-cream/80 md:text-xl" style={{ animationDelay: '.25s' }}>
          Type in your details, pick a template, tweak the look, and download a finished portfolio website as a ZIP. No code. No server. Just you.
        </p>
        <div className="rise mt-9 flex flex-wrap items-center justify-center gap-4" style={{ animationDelay: '.4s' }}>
          <button type="button" onClick={onStart} data-sfx="coin" className="pill-cta">
            Build my portfolio <ArrowRight size={22} />
          </button>
          <a href="#how" className="inline-flex items-center gap-2 rounded-full border-[3px] border-cream/70 px-6 py-3 font-display text-xl text-cream transition hover:bg-cream/10">
            <Play size={18} fill="currentColor" /> How it works
          </a>
        </div>
      </div>

      <div className="relative mt-10 flex justify-center">
        <Folio className="animate-floaty" size={130} />
      </div>

      {/* cream wave into next section */}
      <svg className="absolute bottom-[-1px] left-0 w-full" viewBox="0 0 1440 110" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 C 180 10, 360 10, 540 60 S 900 120, 1080 60 S 1340 20, 1440 50 V110 H0Z" fill="#f3ecdd" />
      </svg>
    </header>
  );
}
