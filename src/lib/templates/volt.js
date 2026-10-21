import { esc } from '../utils.js';
import { tagList, photoOrMono, projectImg, ext, socialLinks, foot } from './base.js';

export default {
  id: 'volt',
  name: 'Volt',
  blurb: 'Neo-brutalist bento grid. Thick borders, hard shadows, electric accent.',
  mood: 'Developers & makers',
  defaultAccent: '#c8ff00',
  defaultFont: 'modern',
  palettes: [
    { name: 'Paper', bg: '#f4f1e8', fg: '#111111', muted: '#55524a', card: '#ffffff', line: '#111111' },
    { name: 'Night', bg: '#111111', fg: '#f4f1e8', muted: '#b0ada2', card: '#1c1c1c', line: '#f4f1e8' },
    { name: 'Lilac', bg: '#e6defc', fg: '#111111', muted: '#4a4560', card: '#ffffff', line: '#111111' },
  ],
  render(c) {
    return `
<main class="bento wrap" id="top">
  <section class="tile acc t-intro">
    ${c.role ? `<p class="chip">${esc(c.role)}</p>` : ''}
    <h1>${esc(c.name)}</h1>
    ${c.tagline ? `<p class="lead">${esc(c.tagline)}</p>` : ''}
  </section>
  <section class="tile t-photo">${photoOrMono(c)}</section>
  <section class="tile t-about"><h2>About me</h2><div class="bio">${c.bioHtml || '<p>Tell your story in the Details tab.</p>'}</div></section>
  <section class="tile t-info">
    ${c.location ? `<p class="kv"><b>Based in</b>${esc(c.location)}</p>` : ''}
    ${c.email ? `<p class="kv"><b>Email</b><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>` : ''}
    <div class="socs">${socialLinks(c, 'pill')}</div>
  </section>
  ${c.skills.length ? `<section class="tile t-skills"><h2>Stack</h2><ul class="tags">${tagList(c.skills, 'chip2')}</ul></section>` : ''}
  ${c.projects.length ? `<h2 class="sect">Projects <small>(${c.projects.length})</small></h2>` : ''}
  ${c.projects.map((p, i) => `<article class="tile proj ${i % 3 === 0 ? 'wide' : ''}">
    <div class="shot">${projectImg(p)}</div>
    <div class="pbody"><span class="n">${p.n}</span><h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
    <ul class="tags">${tagList(p.tech, 'chip2')}</ul>
    <div class="links">${ext(p.demo, 'Live ↗', 'btn')}${ext(p.repo, 'Code ↗', 'btn ghost')}</div></div>
  </article>`).join('')}
  <footer class="tile acc t-foot"><span>${foot(c)}</span><span>Built with FolioMuse ⚡</span></footer>
</main>`;
  },
  css: `
.t-volt .bento{display:grid;grid-template-columns:repeat(12,1fr);gap:calc(var(--s)*20px);padding-top:calc(var(--s)*28px);padding-bottom:calc(var(--s)*40px)}
.t-volt .tile{border:3px solid var(--fg);box-shadow:6px 6px 0 var(--fg);background:var(--card);padding:calc(var(--s)*26px);border-radius:20px;overflow:hidden;min-width:0}
.t-volt .acc{background:var(--accent);color:var(--on-accent);border-color:var(--fg)}
.t-volt .t-intro{grid-column:span 8;display:flex;flex-direction:column;justify-content:flex-end;min-height:340px}
.t-volt .t-photo{grid-column:span 4;padding:0;min-height:300px}
.t-volt .t-photo img,.t-volt .t-photo .mono{width:100%;height:100%}
.t-volt h1{font-size:clamp(44px,8vw,112px);letter-spacing:-.04em;line-height:.92;overflow-wrap:anywhere;margin:14px 0}
.t-volt .lead{font-size:clamp(17px,2vw,24px);font-weight:500;max-width:32ch;line-height:1.3}
.t-volt .chip{display:inline-block;align-self:flex-start;background:var(--fg);color:var(--bg);padding:6px 14px;border-radius:99px;font-size:13px;font-weight:700;letter-spacing:.04em}
.t-volt h2{font-size:clamp(24px,3vw,34px);margin-bottom:14px;letter-spacing:-.02em}
.t-volt .t-about{grid-column:span 7}
.t-volt .t-info{grid-column:span 5;display:flex;flex-direction:column;gap:14px}
.t-volt .bio p{margin-bottom:.8em;color:var(--muted)}
.t-volt .bio p:first-child{color:var(--fg);font-size:1.1em;font-weight:500}
.t-volt .kv{display:flex;flex-direction:column;font-size:17px;font-weight:600;overflow-wrap:anywhere}
.t-volt .kv b{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:700}
.t-volt .socs{display:flex;flex-wrap:wrap;gap:10px;margin-top:auto}
.t-volt .pill{border:2px solid var(--fg);border-radius:99px;padding:6px 16px;font-size:14px;font-weight:700;text-decoration:none;background:var(--bg);transition:transform .15s,background .15s}
.t-volt .pill:hover{background:var(--accent);color:var(--on-accent);transform:translate(-2px,-2px)}
.t-volt .t-skills{grid-column:span 12}
.t-volt .tags{display:flex;flex-wrap:wrap;gap:10px}
.t-volt .chip2{border:2px solid var(--fg);border-radius:10px;padding:5px 12px;font-weight:700;font-size:14px;background:var(--bg)}
.t-volt .t-skills .chip2:nth-child(3n+1){background:var(--accent);color:var(--on-accent)}
.t-volt .sect{grid-column:1/-1;font-size:clamp(34px,6vw,72px);margin-top:calc(var(--s)*20px);letter-spacing:-.04em}
.t-volt .sect small{font-size:.4em;color:var(--muted);vertical-align:top}
.t-volt .proj{grid-column:span 6;padding:0;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}
.t-volt .proj.wide{grid-column:span 12;flex-direction:row}
.t-volt .proj:hover{transform:translate(-3px,-3px);box-shadow:9px 9px 0 var(--fg)}
.t-volt .proj .shot{border-bottom:3px solid var(--fg)}
.t-volt .proj.wide .shot{width:48%;border-bottom:0;border-right:3px solid var(--fg);flex:none}
.t-volt .shot img,.t-volt .shot .ph{width:100%;height:100%;min-height:200px;aspect-ratio:16/10}
.t-volt .pbody{padding:calc(var(--s)*24px);display:flex;flex-direction:column;gap:10px;flex:1}
.t-volt .n{font-weight:800;font-size:13px;color:var(--muted)}
.t-volt .pbody h3{font-size:clamp(24px,3vw,36px);letter-spacing:-.03em}
.t-volt .pbody p{color:var(--muted)}
.t-volt .links{display:flex;gap:10px;margin-top:auto;padding-top:8px;flex-wrap:wrap}
.t-volt .btn{background:var(--fg);color:var(--bg);text-decoration:none;font-weight:700;padding:8px 18px;border-radius:10px;font-size:14px;border:2px solid var(--fg)}
.t-volt .btn.ghost{background:transparent;color:var(--fg)}
.t-volt .btn:hover{background:var(--accent);color:var(--on-accent)}
.t-volt .t-foot{grid-column:span 12;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-weight:700;padding:18px 26px}
@media (max-width:820px){
 .t-volt .t-intro,.t-volt .t-photo,.t-volt .t-about,.t-volt .t-info,.t-volt .proj,.t-volt .proj.wide{grid-column:span 12}
 .t-volt .proj.wide{flex-direction:column}
 .t-volt .proj.wide .shot{width:100%;border-right:0;border-bottom:3px solid var(--fg)}
 .t-volt .t-photo{min-height:260px;max-height:320px}
 .t-volt .t-intro{min-height:260px}
}`,
};
