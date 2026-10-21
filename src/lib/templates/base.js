import { esc } from '../utils.js';

// ---------- shared HTML builders ----------
export const tagList = (tech, cls = 'tag') => tech.map((t) => `<li class="${cls}">${esc(t)}</li>`).join('');

export const monogram = (c) => `<div class="mono"><span>${esc(c.initials)}</span></div>`;

export const photoOrMono = (c) =>
  c.photo ? `<img src="${esc(c.photo)}" alt="Portrait of ${esc(c.name)}">` : monogram(c);

export const projectImg = (pr) =>
  pr.image
    ? `<img src="${esc(pr.image)}" alt="${esc(pr.title)} screenshot" loading="lazy">`
    : `<div class="ph"><span>${esc((pr.title || '?').trim()[0]?.toUpperCase() || '?')}</span></div>`;

export const ext = (url, label, cls = 'btn') =>
  url ? `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : '';

export const socialLinks = (c, cls = 'soc') =>
  c.links.map((l) => `<a class="${cls}" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.label)}</a>`).join('');

export const foot = (c) => `&copy; ${c.year} ${esc(c.name)}`;

// ---------- shared CSS ----------
export const baseCss = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
body{background:var(--bg);color:var(--fg);font-family:var(--body),system-ui,-apple-system,"Segoe UI",sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{max-width:100%;display:block}
ul{list-style:none}
a{color:inherit}
h1,h2,h3{font-family:var(--head),Georgia,serif;font-weight:var(--headw);line-height:1.05}
.wrap{width:100%;max-width:1120px;margin-inline:auto;padding-inline:clamp(18px,4vw,40px)}
section{padding:calc(var(--s) * clamp(44px,8vw,96px)) 0}
.ph{aspect-ratio:16/10;display:grid;place-items:center;background:var(--accent);background:repeating-linear-gradient(135deg,var(--accent) 0 16px,color-mix(in srgb,var(--accent) 84%,#000) 16px 32px);color:var(--on-accent);font-family:var(--head),serif;font-weight:var(--headw);font-size:clamp(48px,9vw,96px)}
.mono{width:100%;height:100%;display:grid;place-items:center;background:var(--accent);color:var(--on-accent);font-family:var(--head),serif;font-weight:var(--headw);font-size:clamp(56px,10vw,120px)}
img{object-fit:cover}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px}
@media (prefers-reduced-motion:reduce){*{animation:none!important;scroll-behavior:auto!important}}
`;

export function rootVars({ accent, onAccent, palette, pair, density }) {
  return `:root{--accent:${accent};--on-accent:${onAccent};--bg:${palette.bg};--fg:${palette.fg};--muted:${palette.muted};--card:${palette.card};--line:${palette.line};--head:'${pair.head}';--body:'${pair.body}';--headw:${pair.headWeight};--s:${density}}\n`;
}
