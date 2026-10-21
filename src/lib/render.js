import { esc, socialUrl, SOCIAL_LABELS, readableOn, initials } from './utils.js';
import { getTemplate } from './templates/index.js';
import { baseCss, rootVars } from './templates/base.js';
import { getFontPair, getDensity } from './options.js';

const paragraphs = (text) =>
  String(text || '')
    .split(/\n{2,}/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => `<p>${esc(t).replace(/\n/g, '<br>')}</p>`)
    .join('');

// Turn raw profile data into display-ready content.
// `imageSrc(kind, index)` decides where images point (data URL in preview, assets/ path in export).
export function buildContent(profile, imageSrc) {
  const name = profile.name.trim() || 'Your Name';
  const [first, ...restParts] = name.split(/\s+/);
  const links = Object.entries(profile.socials)
    .map(([k, v]) => ({ key: k, label: SOCIAL_LABELS[k], url: socialUrl(k, v) }))
    .filter((l) => l.url);
  const projects = profile.projects
    .filter((p) => p.title.trim())
    .map((p, i) => {
      const image = p.image ? imageSrc('project', profile.projects.indexOf(p)) : '';
      return {
        n: String(i + 1).padStart(2, '0'),
        title: p.title.trim(),
        desc: p.description.trim(),
        tech: p.tech,
        repo: socialUrl('website', p.repo),
        demo: socialUrl('website', p.demo),
        image,
        hasImage: !!image,
      };
    });
  return {
    name,
    first,
    rest: restParts.join(' '),
    initials: initials(name),
    role: profile.role.trim(),
    tagline: profile.tagline.trim(),
    bioHtml: paragraphs(profile.bio),
    location: profile.location.trim(),
    email: profile.email.trim(),
    photo: profile.photo ? imageSrc('photo', 0) : '',
    skills: profile.skills,
    projects,
    links,
    year: new Date().getFullYear(),
  };
}

export function renderPortfolio(profile, style, { mode = 'preview', imageSrc }) {
  const tpl = getTemplate(style.template);
  const pair = getFontPair(style.fontPair === 'auto' ? tpl.defaultFont : style.fontPair);
  const palette = tpl.palettes[style.palette] || tpl.palettes[0];
  const accent = style.accent || tpl.defaultAccent;
  const density = getDensity(style.density).value;
  const content = buildContent(profile, imageSrc);

  const css =
    rootVars({ accent, onAccent: readableOn(accent), palette, pair, density }) + baseCss + '\n' + tpl.css;
  const body = tpl.render(content);
  const title = `${content.name}${content.role ? ' — ' + content.role : ''}`;
  const desc = content.tagline || `Portfolio of ${content.name}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${pair.google}&display=swap" rel="stylesheet">
${mode === 'preview' ? `<style>${css}</style>` : '<link rel="stylesheet" href="styles.css">'}
</head>
<body class="t-${tpl.id}">
${body}
</body>
</html>`;
  return { html, css, templateName: tpl.name };
}
