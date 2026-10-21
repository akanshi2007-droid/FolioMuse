import { esc } from '../utils.js';
import { tagList, photoOrMono, projectImg, ext, socialLinks, foot } from './base.js';

export default {
  id: 'paper',
  name: 'Paper',
  blurb: 'A quiet magazine page. Serif headlines, generous whitespace.',
  mood: 'Writers & researchers',
  defaultAccent: '#b4452c',
  defaultFont: 'editorial',
  palettes: [
    { name: 'Cream', bg: '#faf6ee', fg: '#1d1a16', muted: '#6b645a', card: '#f2ecdf', line: 'rgba(29,26,22,.2)' },
    { name: 'Bright', bg: '#ffffff', fg: '#161616', muted: '#6a6a6a', card: '#f5f5f5', line: 'rgba(22,22,22,.18)' },
    { name: 'Sage', bg: '#eef1e6', fg: '#1b2217', muted: '#5d6755', card: '#e3e8d8', line: 'rgba(27,34,23,.2)' },
  ],
  render(c) {
    return `
<div class="page" id="top">
<header class="mast">
  <div class="rule"></div>
  <div class="mast-row"><span>The Portfolio</span><span>Vol. 01 &middot; ${c.year}</span><span>${esc(c.location || 'Worldwide')}</span></div>
  <div class="rule thin"></div>
</header>
<section class="intro">
  ${c.role ? `<p class="kicker">${esc(c.role)}</p>` : ''}
  <h1>${esc(c.name)}</h1>
  ${c.tagline ? `<p class="deck">${esc(c.tagline)}</p>` : ''}
  ${c.photo ? `<figure><div class="fig">${photoOrMono(c)}</div><figcaption>${esc(c.name)}${c.location ? ', ' + esc(c.location) : ''}</figcaption></figure>` : ''}
</section>
<section class="about"><h2 class="sec">About</h2><div class="bio">${c.bioHtml || '<p>Tell your story in the Details tab.</p>'}</div></section>
${c.skills.length ? `<section><h2 class="sec">Skills &amp; tools</h2><p class="skills">${c.skills.map((s) => `<span>${esc(s)}</span>`).join('<i>,</i> ')}.</p></section>` : ''}
${c.projects.length ? `<section id="work"><h2 class="sec">Selected projects</h2>
${c.projects.map((p) => `<article class="item">
  <span class="idx">${p.n}</span>
  <div>
    <h3>${esc(p.title)}</h3>
    <p class="d">${esc(p.desc)}</p>
    ${p.hasImage ? `<div class="pimg">${projectImg(p)}</div>` : ''}
    <p class="meta">${p.tech.map(esc).join(' &middot; ')}</p>
    <p class="links">${ext(p.demo, 'View live →', 'lnk')}${ext(p.repo, 'Read the code →', 'lnk')}</p>
  </div>
</article>`).join('')}
</section>` : ''}
<section id="contact" class="contact">
  <h2 class="sec">Correspondence</h2>
  <p class="big">${c.email ? `Write to me at <a href="mailto:${esc(c.email)}">${esc(c.email)}</a>.` : 'Say hello.'}</p>
  <p class="socs">${socialLinks(c, 'lnk')}</p>
</section>
<footer class="end"><div class="rule thin"></div><p>${foot(c)} &middot; Built with FolioMuse</p></footer>
</div>`;
  },
  css: `
.t-paper .page{max-width:760px;margin:0 auto;padding:0 clamp(18px,4vw,32px) 40px}
.t-paper section{padding:calc(var(--s)*40px) 0}
.t-paper .rule{height:5px;border-block:1px solid var(--fg);margin-top:28px}
.t-paper .rule.thin{height:1px;border:0;background:var(--fg);margin-top:10px}
.t-paper .mast-row{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font-size:11px;letter-spacing:.2em;text-transform:uppercase;padding-top:10px;color:var(--muted)}
.t-paper .intro{padding-top:calc(var(--s)*56px)}
.t-paper .kicker{font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);font-weight:600;margin-bottom:18px}
.t-paper h1{font-size:clamp(48px,10vw,104px);letter-spacing:-.035em;line-height:.95;overflow-wrap:anywhere}
.t-paper .deck{font-family:var(--head);font-style:italic;font-weight:500;font-size:clamp(20px,3vw,30px);line-height:1.3;margin-top:22px;color:var(--muted)}
.t-paper figure{margin-top:36px}
.t-paper .fig{aspect-ratio:16/10;overflow:hidden;filter:grayscale(.15) contrast(1.02)}
.t-paper .fig img{width:100%;height:100%;object-position:center 25%}
.t-paper figcaption{font-size:12px;color:var(--muted);margin-top:8px;font-style:italic;border-top:1px solid var(--line);padding-top:6px}
.t-paper .sec{font-family:var(--body);font-size:11px;letter-spacing:.24em;text-transform:uppercase;font-weight:600;color:var(--muted);margin-bottom:18px;display:flex;align-items:center;gap:14px}
.t-paper .sec::after{content:'';flex:1;height:1px;background:var(--line)}
.t-paper .bio p{font-size:clamp(17px,2vw,20px);margin-bottom:1em}
.t-paper .bio p:first-child::first-letter{float:left;font-family:var(--head);font-size:4.6em;line-height:.82;padding:.06em .1em 0 0;color:var(--accent)}
.t-paper .skills{font-family:var(--head);font-size:clamp(20px,3vw,28px);line-height:1.4}
.t-paper .skills i{font-style:normal;color:var(--accent)}
.t-paper .item{display:grid;grid-template-columns:56px 1fr;gap:12px;padding:calc(var(--s)*24px) 0;border-top:1px solid var(--line)}
.t-paper .idx{font-family:var(--head);font-style:italic;font-size:26px;color:var(--accent)}
.t-paper .item h3{font-size:clamp(26px,4vw,38px);letter-spacing:-.02em;margin-bottom:8px}
.t-paper .d{margin-bottom:12px}
.t-paper .pimg{margin:14px 0;overflow:hidden}
.t-paper .pimg img,.t-paper .pimg .ph{width:100%;aspect-ratio:16/9}
.t-paper .meta{font-style:italic;color:var(--muted);font-size:14px;margin-bottom:8px}
.t-paper .links{display:flex;gap:20px;flex-wrap:wrap}
.t-paper .lnk{color:var(--accent);text-decoration:none;border-bottom:1px solid currentColor;font-weight:500;font-size:15px}
.t-paper .lnk:hover{color:var(--fg)}
.t-paper .big{font-family:var(--head);font-size:clamp(24px,4vw,40px);line-height:1.2;margin-bottom:22px;overflow-wrap:anywhere}
.t-paper .big a{color:var(--accent)}
.t-paper .socs{display:flex;gap:10px 26px;flex-wrap:wrap}
.t-paper .end p{font-size:12px;color:var(--muted);margin-top:14px;text-align:center;letter-spacing:.06em}
@media (max-width:520px){.t-paper .item{grid-template-columns:1fr}}`,
};
