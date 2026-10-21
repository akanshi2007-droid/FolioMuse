import { esc } from '../utils.js';
import { tagList, photoOrMono, projectImg, ext, socialLinks, foot } from './base.js';

export default {
  id: 'noir',
  name: 'Noir',
  blurb: 'Dark, cinematic and confident. Giant type, gold accents.',
  mood: 'Designers & storytellers',
  defaultAccent: '#e9b872',
  defaultFont: 'editorial',
  palettes: [
    { name: 'Ink', bg: '#0c0c0e', fg: '#f2efe8', muted: '#9a968c', card: '#151518', line: 'rgba(242,239,232,.16)' },
    { name: 'Warm Charcoal', bg: '#15110f', fg: '#f4ece2', muted: '#a39689', card: '#1e1815', line: 'rgba(244,236,226,.16)' },
    { name: 'Midnight', bg: '#080c18', fg: '#e9eefc', muted: '#8f9ab8', card: '#10162a', line: 'rgba(233,238,252,.16)' },
  ],
  render(c) {
    const skills = c.skills.map((s) => `<span>${esc(s)}</span><i>✦</i>`).join('');
    return `
<header class="nav"><a class="logo" href="#top">${esc(c.initials)}<i>.</i></a>
<nav><a href="#about">About</a>${c.projects.length ? '<a href="#work">Work</a>' : ''}<a href="#contact">Contact</a></nav></header>
<main id="top">
<section class="hero wrap">
  <div class="hero-text">
    ${c.role ? `<p class="eyebrow"><b></b>${esc(c.role)}</p>` : ''}
    <h1><span class="first">${esc(c.first)}</span>${c.rest ? ` <span class="last">${esc(c.rest)}</span>` : ''}</h1>
    ${c.tagline ? `<p class="tagline">${esc(c.tagline)}</p>` : ''}
    ${c.location ? `<p class="loc">◉ ${esc(c.location)}</p>` : ''}
  </div>
  <div class="arch">${photoOrMono(c)}</div>
</section>
${c.skills.length ? `<div class="marquee" aria-label="Skills"><div class="track">${skills}${skills}</div></div>` : ''}
<section id="about" class="wrap about">
  <h2 class="label">About</h2>
  <div class="about-body">${c.bioHtml || '<p>Tell your story in the Details tab.</p>'}</div>
</section>
${c.projects.length ? `<section id="work" class="wrap work">
  <h2 class="label">Selected work</h2>
  ${c.projects.map((p) => `<article class="row">
    <div class="num">${p.n}</div>
    <div class="info"><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <ul class="tags">${tagList(p.tech)}</ul>
    <div class="links">${ext(p.demo, 'Live demo ↗')}${ext(p.repo, 'Source ↗')}</div></div>
    <div class="shot">${projectImg(p)}</div>
  </article>`).join('')}
</section>` : ''}
<section id="contact" class="wrap contact">
  <h2>${c.email ? "Let's make<br>something." : 'Say hello.'}</h2>
  ${c.email ? `<a class="mail" href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}
  <div class="socs">${socialLinks(c)}</div>
</section>
</main>
<footer class="wrap foot">${foot(c)} <span>Built with FolioMuse</span></footer>`;
  },
  css: `
.t-noir .nav{position:fixed;inset:0 0 auto 0;z-index:20;display:flex;justify-content:space-between;align-items:center;padding:14px clamp(18px,4vw,40px);background:color-mix(in srgb,var(--bg) 78%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.t-noir .logo{font-family:var(--head);font-size:22px;text-decoration:none;font-weight:var(--headw)}
.t-noir .logo i{color:var(--accent);font-style:normal}
.t-noir .nav nav{display:flex;gap:clamp(14px,3vw,32px)}
.t-noir .nav nav a{font-size:13px;letter-spacing:.14em;text-transform:uppercase;text-decoration:none;color:var(--muted)}
.t-noir .nav nav a:hover{color:var(--accent)}
.t-noir .hero{min-height:88vh;display:grid;grid-template-columns:1.4fr .6fr;gap:clamp(20px,4vw,60px);align-items:end;padding-top:120px;padding-bottom:calc(var(--s)*56px)}
.t-noir .eyebrow{display:flex;align-items:center;gap:14px;font-size:13px;letter-spacing:.2em;text-transform:uppercase;color:var(--accent);margin-bottom:24px}
.t-noir .eyebrow b{width:44px;height:1px;background:var(--accent)}
.t-noir h1{font-size:clamp(52px,11.5vw,170px);line-height:.9;letter-spacing:-.035em;overflow-wrap:anywhere}
.t-noir h1 .last{color:transparent;-webkit-text-stroke:2px var(--fg)}
.t-noir .tagline{font-size:clamp(18px,2.2vw,26px);color:var(--muted);max-width:30ch;margin-top:28px;line-height:1.35}
.t-noir .loc{margin-top:22px;font-size:13px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.t-noir .arch{aspect-ratio:3/4;border-radius:999px 999px 0 0;overflow:hidden;outline:1px solid var(--accent);outline-offset:10px;max-width:340px;width:100%;justify-self:end;margin-bottom:10px}
.t-noir .arch img{width:100%;height:100%}
.t-noir .marquee{overflow:hidden;border-block:1px solid var(--line);padding:18px 0;background:var(--card)}
.t-noir .track{display:flex;gap:28px;width:max-content;animation:nmarq 30s linear infinite;font-family:var(--head);font-size:clamp(22px,3.4vw,40px);white-space:nowrap;align-items:center}
.t-noir .track i{color:var(--accent);font-style:normal;font-size:.6em}
@keyframes nmarq{to{transform:translateX(-50%)}}
.t-noir .label{font-family:var(--body);font-size:13px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);font-weight:600}
.t-noir .about{display:grid;grid-template-columns:.6fr 1.4fr;gap:clamp(20px,4vw,60px)}
.t-noir .about-body p{font-size:clamp(20px,2.5vw,30px);line-height:1.4;margin-bottom:1em;font-family:var(--head);font-weight:400}
.t-noir .about-body p+p{font-size:clamp(16px,1.6vw,19px);color:var(--muted);font-family:var(--body)}
.t-noir .work .label{display:block;margin-bottom:calc(var(--s)*32px)}
.t-noir .row{display:grid;grid-template-columns:auto 1fr 1fr;gap:clamp(16px,3vw,44px);align-items:center;padding:calc(var(--s)*32px) 0;border-top:1px solid var(--line)}
.t-noir .row:last-child{border-bottom:1px solid var(--line)}
.t-noir .num{font-family:var(--head);font-size:clamp(40px,6vw,84px);color:transparent;-webkit-text-stroke:1px var(--accent);line-height:1}
.t-noir .info h3{font-size:clamp(28px,3.6vw,48px);margin-bottom:12px}
.t-noir .info p{color:var(--muted);margin-bottom:16px}
.t-noir .tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px}
.t-noir .tag{font-size:12px;letter-spacing:.06em;border:1px solid var(--line);padding:4px 12px;border-radius:99px;color:var(--muted)}
.t-noir .links{display:flex;gap:18px;flex-wrap:wrap}
.t-noir .btn{font-size:14px;color:var(--accent);text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:2px}
.t-noir .btn:hover{color:var(--fg)}
.t-noir .shot{overflow:hidden;border-radius:6px;border:1px solid var(--line)}
.t-noir .shot img,.t-noir .shot .ph{width:100%;aspect-ratio:16/10;transition:transform .6s}
.t-noir .row:hover .shot img,.t-noir .row:hover .shot .ph{transform:scale(1.05)}
.t-noir .contact{text-align:center}
.t-noir .contact h2{font-size:clamp(44px,9vw,130px);letter-spacing:-.03em;margin-bottom:28px}
.t-noir .mail{display:inline-block;font-size:clamp(18px,3vw,34px);color:var(--accent);text-decoration:none;border-bottom:2px solid var(--accent);margin-bottom:40px;overflow-wrap:anywhere}
.t-noir .socs{display:flex;gap:14px 28px;justify-content:center;flex-wrap:wrap}
.t-noir .soc{font-size:13px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;color:var(--muted)}
.t-noir .soc:hover{color:var(--accent)}
.t-noir .foot{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:28px;padding-bottom:36px;border-top:1px solid var(--line);font-size:13px;color:var(--muted)}
@media (max-width:820px){
 .t-noir .hero{grid-template-columns:1fr;min-height:auto;padding-top:110px}
 .t-noir .arch{justify-self:start;max-width:240px;order:-1}
 .t-noir .about{grid-template-columns:1fr}
 .t-noir .row{grid-template-columns:1fr}
 .t-noir .num{font-size:48px}
}`,
};
