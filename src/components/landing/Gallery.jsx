import React, { useMemo } from 'react';
import { TEMPLATE_LIST } from '../../lib/templates/index.js';
import { renderPortfolio } from '../../lib/render.js';
import { sampleProfile } from '../../lib/sample.js';
import ScaledFrame from '../ui/ScaledFrame.jsx';
import { sfx } from '../../audio/sound.js';

export default function Gallery({ onPick }) {
  const previews = useMemo(() => {
    const profile = sampleProfile();
    return TEMPLATE_LIST.map((t) => ({
      t,
      html: renderPortfolio(profile, { template: t.id, accent: t.defaultAccent, palette: 0, fontPair: 'auto', density: 'compact' }, { mode: 'preview', imageSrc: () => '' }).html,
    }));
  }, []);

  return (
    <section id="templates" className="bg-cream px-5 py-24 text-ink">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-pixel text-xs uppercase tracking-[.3em] text-retro">templates</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl leading-tight md:text-6xl">
          Five real layouts. Not one layout in five colours.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-ink/70">Each one is a live render of the same sample profile. Pick one to open it in the studio.</p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {previews.map(({ t, html }, i) => (
            <article key={t.id} className="group win !bg-retro" style={{ transform: `rotate(${[-1, 1, -0.5, 0.8, -1.2][i]}deg)` }}>
              <div className="win-bar"><span>{t.name.toUpperCase()}.EXE</span><span className="flex gap-1">{[t.defaultAccent, '#f3ecdd'].map((c) => <i key={c} className="block h-3 w-3 rounded-full border border-ink" style={{ background: c }} />)}</span></div>
              <div className="mx-2 overflow-hidden border-2 border-ink/60 bg-white">
                <ScaledFrame html={html} width={1280} height={800} interactive={false} title={`${t.name} template preview`} />
              </div>
              <div className="win-body mt-2 flex items-center justify-between gap-3 p-4">
                <div>
                  <h3 className="font-display text-2xl">{t.name}</h3>
                  <p className="text-sm text-ink/70">{t.blurb}</p>
                  <p className="mt-1 font-pixel text-[10px] uppercase tracking-widest text-retro">{t.mood}</p>
                </div>
                <button type="button" data-sfx="select" onClick={() => onPick(t.id)} className="pxbtn shrink-0 !bg-pop-yellow">Use it</button>
              </div>
            </article>
          ))}
          <article className="grid place-items-center rounded-2xl border-[3px] border-dashed border-ink/40 p-8 text-center">
            <div>
              <p className="font-display text-3xl">+ more soon</p>
              <p className="mt-2 text-sm text-ink/60">GitHub import, more templates, PDF and Word export are on the future-scope list.</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
