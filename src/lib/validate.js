import { isValidEmail, isValidUrl } from './utils.js';

// Returns { fieldKey: "friendly message" }. Empty object = all good.
export function validateProfile(p) {
  const e = {};
  if (!p.name.trim()) e.name = 'Add your name so visitors know whose portfolio this is.';
  else if (p.name.length > 60) e.name = 'That name is quite long — keep it under 60 characters.';
  if (p.role.length > 70) e.role = 'Keep your role under 70 characters.';
  if (p.tagline.length > 120) e.tagline = 'A tagline works best under 120 characters.';
  if (p.bio.length > 900) e.bio = 'Your bio is over 900 characters. Shorter reads better.';
  if (p.email && !isValidEmail(p.email)) e.email = "That email doesn't look right. Try name@example.com.";
  Object.entries(p.socials).forEach(([k, v]) => {
    if (k === 'website' && v && !isValidUrl(v)) e['social.website'] = 'Enter a link like myname.dev or https://myname.dev.';
    if (k !== 'website' && v && /\s/.test(v.trim())) e['social.' + k] = 'Use a username or a link — no spaces.';
  });
  p.projects.forEach((pr, i) => {
    if (!pr.title.trim()) e[`project.${i}.title`] = 'Give this project a title.';
    if (pr.repo && !isValidUrl(pr.repo)) e[`project.${i}.repo`] = "That repo link doesn't look right.";
    if (pr.demo && !isValidUrl(pr.demo)) e[`project.${i}.demo`] = "That demo link doesn't look right.";
    if (pr.description.length > 400) e[`project.${i}.description`] = 'Keep project descriptions under 400 characters.';
  });
  return e;
}
