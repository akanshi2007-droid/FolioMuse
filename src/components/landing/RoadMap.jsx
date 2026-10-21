import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserRound, LayoutTemplate, SlidersHorizontal, MonitorSmartphone, Download } from 'lucide-react';
import { Folio } from '../ui/Art.jsx';
import { sfx } from '../../audio/sound.js';

// Winding road (inspired by the REACT.gg roadmap). Scroll and Folio walks the road,
// painting it rainbow and ticking off each step.
const STEPS = [
  { n: '01', icon: UserRound, title: 'Add details', text: 'Bio, skills, projects and social links. Friendly validation keeps it tidy.', color: '#ff6fa8' },
  { n: '02', icon: LayoutTemplate, title: 'Pick a template', text: 'Noir, Volt, Paper, Terminal or Pop. Switching keeps everything you typed.', color: '#ffc93c' },
  { n: '03', icon: SlidersHorizontal, title: 'Customise', text: 'Accent colour, palette, font pairing and spacing density.', color: '#7fe0b4' },
  { n: '04', icon: MonitorSmartphone, title: 'Live preview', text: 'Watch it update instantly on desktop, tablet and mobile.', color: '#8b6cff' },
  { n: '05', icon: Download, title: 'Export ZIP', text: 'index.html, styles.css, assets/ and a README. Works anywhere, even offline.', color: '#ff8a3d' },
];
const NODES = [[250, 170], [750, 510], [250, 850], [750, 1190], [250, 1530]];
const D = 'M250 20 V170 C250 340 750 340 750 510 C750 680 250 680 250 850 C250 1020 750 1020 750 1190 C750 1360 250 1360 250 1530 V1680';

export default function RoadMap() {
  const wrap = useRef(null);
  const path = useRef(null);
  const walker = useRef(null);
  const paint = useRef([]);
  const [reached, setReached] = useState(0);
  const nodeLens = useRef([]);
  const lastReached = useRef(0);

  useEffect(() => {
    const p = path.current;
    const total = p.getTotalLength();
    // find the length along the path nearest to each node
    nodeLens.current = NODES.map(([nx, ny]) => {
      let best = 0, bd = Infinity;
      for (let l = 0; l <= total; l += 4) {
        const pt = p.getPointAtLength(l);
        const d = (pt.x - nx) ** 2 + (pt.y - ny) ** 2;
        if (d < bd) { bd = d; best = l; }
      }
      return best;
    });

    const update = () => {
      const r = wrap.current.getBoundingClientRect();
      const prog = Math.min(1, Math.max(0, (window.innerHeight * 0.62 - r.top) / r.height));
      const len = prog * total;
      const pt = p.getPointAtLength(len);
      if (walker.current) {
        walker.current.style.left = `${(pt.x / 1000) * 100}%`;
        walker.current.style.top = `${(pt.y / 1700) * 100}%`;
      }
      paint.current.forEach((el) => el && el.setAttribute('stroke-dasharray', `${len} ${total * 2}`));
      const count = nodeLens.current.filter((nl) => len >= nl - 6).length;
      if (count !== lastReached.current) {
        if (count > lastReached.current) sfx.step();
        lastReached.current = count;
        setReached(count);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  return (
    <section id="how" className="dotgrid relative bg-ink px-5 py-24 text-cream">
      <div className="mx-auto max-w-5xl">
        <p className="text-center font-pixel text-xs uppercase tracking-[.3em] text-pop-yellow">02 · the solution</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl leading-tight md:text-6xl">
          One profile. Five steps. A finished site.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-cream/70">Scroll down the road. Folio will walk you through it.</p>

        {/* desktop: winding road */}
        <div ref={wrap} className="relative mx-auto mt-16 hidden w-full md:block" style={{ aspectRatio: '1000 / 1700' }}>
          <svg viewBox="0 0 1000 1700" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <path d={D} fill="none" stroke="#f3ecdd" strokeWidth="84" strokeLinecap="round" opacity=".18" />
            <path ref={path} d={D} fill="none" stroke="#f3ecdd" strokeWidth="70" strokeLinecap="round" />
            <path d={D} fill="none" stroke="#1c1920" strokeWidth="3" strokeDasharray="16 16" opacity=".35" />
            {['#ff6fa8', '#ffc93c', '#3f6bff'].map((c, i) => (
              <path key={c} ref={(el) => (paint.current[i] = el)} d={D} fill="none" stroke={c} strokeWidth={[44, 26, 10][i]} strokeLinecap="round" strokeDasharray="0 9999" />
            ))}
            {NODES.map(([x, y], i) => (
              <g key={i} style={{ transition: 'transform .3s', transformOrigin: `${x}px ${y}px`, transform: reached > i ? 'scale(1.15)' : 'scale(1)' }}>
                <circle cx={x} cy={y} r="46" fill={reached > i ? STEPS[i].color : '#f3ecdd'} stroke="#1c1920" strokeWidth="6" />
                <text x={x} y={y + 11} textAnchor="middle" fontSize="32" fontFamily="Silkscreen, monospace" fontWeight="700" fill="#1c1920">{STEPS[i].n}</text>
              </g>
            ))}
          </svg>

          {STEPS.map((s, i) => {
            const left = NODES[i][0] < 500;
            const Icon = s.icon;
            return (
              <article
                key={s.n}
                className={`absolute w-[42%] -translate-y-1/2 rounded-2xl border-[3px] border-cream/80 bg-ink2 p-5 transition-all duration-500 ${reached > i ? 'opacity-100' : 'opacity-40'}`}
                style={{ top: `${(NODES[i][1] / 1700) * 100}%`, [left ? 'left' : 'right']: '4%', boxShadow: `6px 6px 0 ${s.color}`, ...(left ? { left: '54%', right: 'auto' } : { left: '4%', right: 'auto' }) }}
              >
                <div className="mb-2 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border-2 border-ink text-ink" style={{ background: s.color }}><Icon size={20} /></span>
                  <h3 className="font-display text-2xl">{s.title}</h3>
                </div>
                <p className="text-[15px] text-cream/75">{s.text}</p>
              </article>
            );
          })}

          <div ref={walker} className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[82%]" style={{ left: '25%', top: '1%' }}>
            <Folio walking size={64} />
          </div>
        </div>

        {/* mobile: simple vertical list */}
        <ol className="relative mx-auto mt-12 max-w-md space-y-6 md:hidden">
          <span className="absolute bottom-6 left-[27px] top-6 w-2 rounded bg-cream/80" aria-hidden="true" />
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.n} className="relative flex gap-4">
                <span className="z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border-4 border-ink font-pixel text-sm text-ink" style={{ background: s.color }}>{s.n}</span>
                <div className="rounded-2xl border-[3px] border-cream/80 bg-ink2 p-4" style={{ boxShadow: `4px 4px 0 ${s.color}` }}>
                  <h3 className="flex items-center gap-2 font-display text-xl"><Icon size={18} /> {s.title}</h3>
                  <p className="mt-1 text-sm text-cream/75">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
