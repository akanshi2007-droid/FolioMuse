import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { gradeFor } from '../../lib/completeness.js';

// Segmented "LOADING..." style bar showing how complete the profile is.
export default function Meter({ result }) {
  const [open, setOpen] = useState(false);
  const { score, tips } = result;
  return (
    <div className="border-b-2 border-ink bg-cream2 px-4 py-3">
      <button type="button" data-sfx="toggle" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-3 text-left">
        <span className="font-pixel text-[10px] uppercase tracking-widest text-ink">Complete</span>
        <span className="flex h-4 flex-1 gap-[2px] border-2 border-retro bg-cream p-[2px]" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label="Profile completeness">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="h-full flex-1 transition-colors duration-300" style={{ background: i < score / 5 ? (score >= 80 ? '#6aa84f' : score >= 50 ? '#ffc93c' : '#ff8a3d') : 'transparent' }} />
          ))}
        </span>
        <span className="w-10 text-right font-pixel text-xs text-ink">{score}%</span>
        <ChevronDown size={16} className={`text-ink transition ${open ? 'rotate-180' : ''}`} />
      </button>
      <p className="mt-1 text-[12px] font-medium text-ink/60">{gradeFor(score)}{tips.length ? ` · next: ${tips[0].tip.toLowerCase()}` : ''}</p>
      {open && (
        <ul className="mt-2 space-y-1 text-[13px] text-ink">
          {tips.length === 0 && <li>✔ Everything on the checklist is done. Nice work.</li>}
          {tips.map((t) => <li key={t.id} className="flex justify-between gap-2"><span>○ {t.tip}</span><b className="font-pixel text-[10px] text-retro">+{t.pts}</b></li>)}
          <li className="pt-1 text-[11px] text-ink/50">Rules are simple and visible: each item is worth fixed points. No AI involved.</li>
        </ul>
      )}
    </div>
  );
}
