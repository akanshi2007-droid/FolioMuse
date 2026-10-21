import { esc } from '../utils.js';
import { tagList, photoOrMono, projectImg, ext, socialLinks, foot } from './base.js';

const wave = (fill) => `<svg class="wave" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V60 H0Z" fill="${fill}"/></svg>`;

export default {
  id: 'pop',
  name: 'Pop',
  blurb: 'Playful colour blocks, stickers and wobbly shapes. Pure imagination.',
  mood: 'Creatives & first-timers',
  defaultAccent: '#ff6fa8',
  defaultFont: 'bagel',
  palettes: [
    { name: 'Cream', bg: '#fff4df', fg: '#1c1920', muted: '#5f5a66', card: '#ffffff', line: '#1c1920' },
    { name: 'Lilac', bg: '#ece3ff', fg: '#1c1920', muted: '#5b5470', card: '#ffffff', line: '#1c1920' },
    { name: 'Mint', bg: '#dcf7ea', fg: '#12231b', muted: '#466657', card: '#ffffff', line: '#12231b' },
  ],
  render(c) {
    return `
<main id="top">
<section class="hero wrap">
  <div class="blob">${photoOrMono(c)}</div>
  <div class="htext">
    ${c.role ? `<p class="sticker">${esc(c.role)}</p>` : ''}
    <h1>Hi, I'm <mark>${esc(c.first)}</mark>${c.rest ? ' ' + esc(c.rest) : ''}!</h1>
    ${c.tagline ? `<p class="lead">${esc(c.tagline)}</p>` : ''}
    ${c.location ? `<p class="loc">📍 ${esc(c.location)}</p>` : ''}
    <p class="cta"><a class="big" href="${c.projects.length ? '#work' : '#contact'}">${c.projects.length ? 'See my work' : 'Say hi'} ↓</a></p>
  </div>
</section>
${wave('var(--card)')}
<section class="about"><div class="wrap two">
  <div><h2>A little about me</h2><div class="bio">${c.bioHtml || '<p>Tell your story in the Details tab.</p>'}</div></div>
  ${c.skills.length ? `<div><h2>Things I do</h2><ul class="pills">${tagList(c.skills, 'pill')}</ul></div>` : ''}
</div></section>
${c.projects.length ? `<section id="work" class="work wrap"><h2 class="wt">My projects</h2>
<div class="grid">${c.projects.map((p, i) => `<article class="card c${i % 5}">
  <div class="shot">${projectImg(p)}</div>
  <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
  <ul class="tags">${tagList(p.tech, 'tg')}</ul>
  <p class="links">${ext(p.demo, 'Try it ↗', 'btn')}${ext(p.repo, 'Code ↗', 'btn alt')}</p>
</article>`).join('')}</div></section>` : ''}
<section id="contact" class="contact wrap">
  <h2>Let's be friends 👋</h2>
  ${c.email ? `<a class="mail" href="mailto:${esc(c.email)}">${esc(c.email)}</a>` : ''}
  <p class="socs">${socialLinks(c, 'btn alt')}</p>
</section>
</main>
<footer class="foot">${foot(c)} &middot; Made with FolioMuse ✨</footer>`;
  },
  css: `
.t-pop{background-image:radial-gradient(color-mix(in srgb,var(--fg) 12%,transparent) 1.5px,transparent 1.5px);background-size:22px 22px}
.t-pop .hero{display:grid;grid-template-columns:.8fr 1.2fr;gap:clamp(20px,5vw,70px);align-items:center;padding-top:calc(var(--s)*64px);padding-bottom:calc(var(--s)*64px)}
.t-pop .blob{aspect-ratio:1;border:4px solid var(--line);box-shadow:8px 8px 0 var(--line);border-radius:60% 40% 55% 45%/50% 60% 40% 50%;overflow:hidden;background:var(--accent);animation:blobby 9s ease-in-out infinite;max-width:420px;width:100%}
.t-pop .blob img{width:100%;height:100%}
@keyframes blobby{50%{border-radius:42% 58% 40% 60%/58% 42% 58% 42%}}
.t-pop .sticker{display:inline-block;background:#ffc93c;color:#1c1920;border:3px solid var(--line);padding:6px 16px;border-radius:99px;font-weight:700;transform:rotate(-3deg);box-shadow:3px 3px 0 var(--line);margin-bottom:18px}
.t-pop h1{font-size:clamp(40px,7vw,92px);letter-spacing:-.02em;overflow-wrap:anywhere}
.t-pop h1 mark{background:linear-gradient(transparent 58%,var(--accent) 58% 92%,transparent 92%);color:inherit;padding:0 .08em}
.t-pop .lead{font-size:clamp(18px,2.2vw,26px);margin-top:18px;max-width:30ch;font-weight:500;line-height:1.35}
.t-pop .loc{margin-top:12px;color:var(--muted);font-weight:600}
.t-pop .cta{margin-top:26px}
.t-pop .big,.t-pop .btn{display:inline-block;background:var(--accent);color:var(--on-accent);border:3px solid var(--line);box-shadow:4px 4px 0 var(--line);border-radius:99px;font-weight:700;text-decoration:none;padding:8px 20px;transition:transform .15s,box-shadow .15s}
.t-pop .big{padding:12px 28px;font-size:18px}
.t-pop .btn.alt{background:var(--card);color:var(--fg)}
.t-pop .big:hover,.t-pop .btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0 var(--line)}
.t-pop .wave{display:block;width:100%;height:42px;margin-bottom:-1px}
.t-pop .about{background:var(--card);border-bottom:4px solid var(--line)}
.t-pop .about{margin-top:-1px}
.t-pop .two{display:grid;grid-template-columns:1.3fr 1fr;gap:clamp(20px,5vw,64px)}
.t-pop h2{font-size:clamp(28px,4vw,46px);margin-bottom:18px}
.t-pop .bio p{margin-bottom:.9em;font-size:1.08em}
.t-pop .pills{display:flex;flex-wrap:wrap;gap:10px}
.t-pop .pill{border:3px solid var(--line);border-radius:99px;padding:5px 16px;font-weight:700;background:#ffc93c;color:#1c1920;box-shadow:3px 3px 0 var(--line)}
.t-pop .pill:nth-child(4n+2){background:var(--accent);color:var(--on-accent);transform:rotate(-2deg)}
.t-pop .pill:nth-child(4n+3){background:#7fe0b4;color:#1c1920;transform:rotate(2deg)}
.t-pop .pill:nth-child(4n){background:#8b6cff;color:#fff}
.t-pop .wt{text-align:center;margin-bottom:calc(var(--s)*40px)}
.t-pop .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:calc(var(--s)*28px)}
.t-pop .card{border:4px solid var(--line);box-shadow:7px 7px 0 var(--line);border-radius:26px;padding:20px;display:flex;flex-direction:column;gap:10px;transition:transform .2s}
.t-pop .card:nth-child(odd){transform:rotate(-1deg)}
.t-pop .card:nth-child(even){transform:rotate(1deg)}
.t-pop .card:hover{transform:rotate(0) translateY(-6px)}
.t-pop .c0{background:var(--accent);color:var(--on-accent)}
.t-pop .c1{background:#ffc93c;color:#1c1920}
.t-pop .c2{background:#7fe0b4;color:#1c1920}
.t-pop .c3{background:#8b6cff;color:#fff}
.t-pop .c4{background:#ff8a3d;color:#1c1920}
.t-pop .shot{border:3px solid var(--line);border-radius:16px;overflow:hidden;background:#fff}
.t-pop .shot img,.t-pop .shot .ph{width:100%;aspect-ratio:16/10}
.t-pop .card h3{font-size:clamp(24px,3vw,32px)}
.t-pop .tags{display:flex;flex-wrap:wrap;gap:6px}
.t-pop .tg{background:rgba(255,255,255,.55);color:#1c1920;border:2px solid #1c1920;border-radius:99px;padding:1px 10px;font-size:12px;font-weight:700}
.t-pop .links{display:flex;gap:10px;flex-wrap:wrap;margin-top:auto;padding-top:6px}
.t-pop .contact{text-align:center}
.t-pop .contact h2{font-size:clamp(36px,7vw,84px)}
.t-pop .mail{display:inline-block;font-size:clamp(18px,3vw,32px);font-weight:700;background:#ffc93c;color:#1c1920;border:3px solid var(--line);padding:6px 20px;border-radius:99px;box-shadow:4px 4px 0 var(--line);text-decoration:none;margin-bottom:28px;overflow-wrap:anywhere}
.t-pop .socs{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.t-pop .foot{text-align:center;padding:24px;border-top:4px solid var(--line);background:var(--card);font-weight:600}
@media (max-width:820px){.t-pop .hero{grid-template-columns:1fr;text-align:center}.t-pop .blob{margin:0 auto;max-width:280px}.t-pop .lead{margin-inline:auto}.t-pop .two{grid-template-columns:1fr}}`,
};
