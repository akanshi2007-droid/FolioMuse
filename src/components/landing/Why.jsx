import React from 'react';
import { Clock, Palette, Copy, RefreshCw } from 'lucide-react';

const items = [
  { icon: Clock, title: 'Building from scratch takes ages', text: 'Boilerplate, layouts and responsiveness eat the hours you wanted for actual work.', bg: '#ffc93c', rot: -2 },
  { icon: Palette, title: 'Design is hard for beginners', text: 'Typography, spacing and consistent styling are easy to get wrong.', bg: '#ff6fa8', rot: 1.5 },
  { icon: Copy, title: 'Generic templates look alike', text: 'Rigid builders make every student portfolio look the same.', bg: '#7fe0b4', rot: -1 },
  { icon: RefreshCw, title: 'Updating is tedious', text: 'A new project means editing code and re-testing every screen size.', bg: '#8b6cff', rot: 2, light: true },
];

export default function Why() {
  return (
    <section className="bg-cream px-5 pb-24 pt-10 text-ink">
      <div className="mx-auto max-w-6xl">
        <p className="text-center font-pixel text-xs uppercase tracking-[.3em] text-retro">01 · the problem</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-center font-display text-4xl leading-tight md:text-6xl">
          Making a portfolio shouldn't feel like a boss fight.
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text, bg, rot, light }) => (
            <article
              key={title}
              className="rounded-3xl border-[3px] border-ink p-6 transition hover:!rotate-0 hover:-translate-y-2"
              style={{ background: bg, transform: `rotate(${rot}deg)`, boxShadow: '6px 6px 0 #1c1920', color: light ? '#fff' : '#1c1920' }}
            >
              <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-[3px] border-ink bg-cream text-ink"><Icon size={22} /></span>
              <h3 className="font-display text-2xl leading-tight">{title}</h3>
              <p className="mt-2 text-[15px] opacity-90">{text}</p>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-2xl text-center text-xl font-medium">
          FolioMuse removes all four. <span className="rounded bg-pop-yellow px-2">One profile in, five templates out.</span>
        </p>
      </div>
    </section>
  );
}
