import { esc, hash } from '../utils.js';
import { tagList, photoOrMono, ext, socialLinks, foot } from './base.js';

export default {
  id: 'terminal',
  name: 'Terminal',
  blurb: 'A command-line portfolio. Monospace, git-log projects, blinking cursor.',
  mood: 'Developers & hackers',
  defaultAccent: '#39ff88',
  defaultFont: 'techy',
  palettes: [
    { name: 'Matrix', bg: '#070b09', fg: '#d6f5df', muted: '#6f8f7b', card: '#0d1511', line: 'rgba(214,245,223,.16)' },
    { name: 'Dracula', bg: '#1e1f29', fg: '#f8f8f2', muted: '#8b8fa8', card: '#282a36', line: 'rgba(248,248,242,.16)' },
    { name: 'Daylight', bg: '#f6f6ef', fg: '#1a1a1a', muted: '#666666', card: '#ffffff', line: 'rgba(26,26,26,.2)' },
  ],
  render(c) {
    const user = (c.first || 'user').toLowerCase().replace(/[^a-z0-9]/g, '') || 'user';
    return `
<div class="term wrap" id="top">
  <div class="bar"><i></i><i></i><i></i><span>${esc(user)}@folio: ~/portfolio</span></div>
  <div class="screen">
    <p class="cmd"><b>${esc(user)}@folio</b>:<em>~</em>$ whoami</p>
    <div class="hero">
      <div class="who">
        <h1>${esc(c.name)}<span class="cur"></span></h1>
        ${c.role ? `<p class="role">&gt; ${esc(c.role)}</p>` : ''}
        ${c.tagline ? `<p class="tag-line"># ${esc(c.tagline)}</p>` : ''}
        ${c.location ? `<p class="mut">location: "${esc(c.location)}"</p>` : ''}
      </div>
      <div class="avatar">${photoOrMono(c)}</div>
    </div>

    <p class="cmd"><b>${esc(user)}@folio</b>:<em>~</em>$ cat about.md</p>
    <div class="out bio">${c.bioHtml || '<p>Tell your story in the Details tab.</p>'}</div>

    ${c.skills.length ? `<p class="cmd"><b>${esc(user)}@folio</b>:<em>~</em>$ ls ./skills</p>
    <ul class="out skills">${c.skills.map((s) => `<li>[${esc(s)}]</li>`).join('')}</ul>` : ''}

    ${c.projects.length ? `<p class="cmd"><b>${esc(user)}@folio</b>:<em>~</em>$ git log --projects</p>
    <div class="out">${c.projects.map((p) => `<article class="commit">
      <p class="hash">commit ${hash(p.title + p.n).slice(0, 7)} <span>(HEAD -&gt; project-${p.n})</span></p>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.desc)}</p>
      ${p.hasImage ? `<img class="shot" src="${esc(p.image)}" alt="${esc(p.title)} screenshot" loading="lazy">` : ''}
      <ul class="tags">${tagList(p.tech)}</ul>
      <p class="links">${ext(p.demo, './demo ↗', 'btn')}${ext(p.repo, 'git clone ↗', 'btn')}</p>
    </article>`).join('')}</div>` : ''}

    <p class="cmd" id="contact"><b>${esc(user)}@folio</b>:<em>~</em>$ ./contact.sh</p>
    <div class="out">
      ${c.email ? `<p>mail → <a class="ml" href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>` : ''}
      <p class="socs">${socialLinks(c, 'btn')}</p>
    </div>
    <p class="cmd end"><b>${esc(user)}@folio</b>:<em>~</em>$ <span class="cur"></span></p>
    <p class="mut copy">${foot(c)} &middot; built with FolioMuse</p>
  </div>
</div>`;
  },
  css: `
.t-terminal{font-size:15px}
.t-terminal h1,.t-terminal h2,.t-terminal h3{font-family:var(--body),ui-monospace,monospace}
.t-terminal .term{padding-top:clamp(16px,4vw,48px);padding-bottom:48px;max-width:980px}
.t-terminal .bar{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--line);border-bottom:0;border-radius:12px 12px 0 0;padding:12px 16px}
.t-terminal .bar i{width:12px;height:12px;border-radius:50%;background:#ff5f57}
.t-terminal .bar i:nth-child(2){background:#febc2e}
.t-terminal .bar i:nth-child(3){background:#28c840}
.t-terminal .bar span{margin-left:12px;font-size:12px;color:var(--muted)}
.t-terminal .screen{border:1px solid var(--line);border-radius:0 0 12px 12px;padding:calc(var(--s)*28px) clamp(16px,3vw,36px) calc(var(--s)*36px);background:linear-gradient(var(--bg),var(--bg)),var(--card);box-shadow:0 0 60px -20px var(--accent)}
.t-terminal .cmd{color:var(--muted);margin:calc(var(--s)*28px) 0 calc(var(--s)*12px);overflow-wrap:anywhere}
.t-terminal .cmd:first-child{margin-top:0}
.t-terminal .cmd b{color:var(--accent);font-weight:700}
.t-terminal .cmd em{color:#6aa7ff;font-style:normal}
.t-terminal .hero{display:grid;grid-template-columns:1fr auto;gap:24px;align-items:center}
.t-terminal h1{font-size:clamp(34px,7vw,72px);letter-spacing:-.04em;line-height:1;overflow-wrap:anywhere}
.t-terminal .cur{display:inline-block;width:.55em;height:1em;background:var(--accent);margin-left:6px;vertical-align:-.12em;animation:tcur 1s steps(1) infinite}
@keyframes tcur{50%{opacity:0}}
.t-terminal .role{color:var(--accent);font-size:clamp(16px,2vw,22px);margin-top:12px}
.t-terminal .tag-line{margin-top:8px;color:var(--muted)}
.t-terminal .mut{color:var(--muted);font-size:13px;margin-top:6px}
.t-terminal .avatar{width:150px;height:150px;border:2px solid var(--accent);border-radius:12px;overflow:hidden;box-shadow:6px 6px 0 var(--line)}
.t-terminal .avatar img{width:100%;height:100%}
.t-terminal .avatar .mono{font-size:56px}
.t-terminal .out{padding-left:16px;border-left:2px solid var(--line)}
.t-terminal .bio p{margin-bottom:.9em;max-width:70ch}
.t-terminal .skills{display:flex;flex-wrap:wrap;gap:8px 16px;color:var(--accent)}
.t-terminal .commit{padding:calc(var(--s)*14px) 0 calc(var(--s)*22px)}
.t-terminal .commit+.commit{border-top:1px dashed var(--line);padding-top:calc(var(--s)*22px)}
.t-terminal .hash{color:#e6b94d;font-size:13px}
.t-terminal .hash span{color:var(--accent)}
.t-terminal .commit h3{font-size:clamp(20px,3vw,28px);margin:6px 0;letter-spacing:-.02em}
.t-terminal .commit p{max-width:70ch}
.t-terminal .shot{width:100%;max-width:520px;aspect-ratio:16/10;border:1px solid var(--line);border-radius:8px;margin:12px 0}
.t-terminal .tags{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}
.t-terminal .tag{font-size:12px;color:var(--accent);border:1px solid var(--accent);border-radius:4px;padding:1px 8px}
.t-terminal .links,.t-terminal .socs{display:flex;flex-wrap:wrap;gap:10px}
.t-terminal .btn{border:1px solid var(--fg);padding:4px 12px;border-radius:6px;text-decoration:none;font-size:13px;transition:.15s}
.t-terminal .btn:hover{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}
.t-terminal .ml{color:var(--accent)}
.t-terminal .out p+p{margin-top:12px}
.t-terminal .copy{margin-top:28px}
@media (max-width:640px){.t-terminal .hero{grid-template-columns:1fr}.t-terminal .avatar{order:-1;width:110px;height:110px}}`,
};
