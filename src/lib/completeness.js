import { isValidEmail } from './utils.js';

// Transparent, rule-based score (no AI). Each rule: points + a tip shown when not met.
export function scoreProfile(p) {
  const links = Object.values(p.socials).filter((v) => v.trim()).length;
  const projectsWithText = p.projects.filter((x) => x.title.trim() && x.description.trim().length >= 30).length;
  const projectsWithLinks = p.projects.filter((x) => x.repo.trim() || x.demo.trim()).length;
  const rules = [
    { id: 'name', pts: 10, ok: p.name.trim().length > 1, tip: 'Add your name' },
    { id: 'role', pts: 8, ok: p.role.trim().length > 2, tip: 'Add a role or title (e.g. "Frontend Developer")' },
    { id: 'tagline', pts: 7, ok: p.tagline.trim().length >= 10, tip: 'Write a one-line tagline' },
    { id: 'bio', pts: 15, ok: p.bio.trim().length >= 80, tip: 'Write a bio of at least 80 characters' },
    { id: 'photo', pts: 8, ok: !!p.photo, tip: 'Upload a profile photo' },
    { id: 'email', pts: 10, ok: isValidEmail(p.email), tip: 'Add a valid contact email' },
    { id: 'skills', pts: 12, ok: p.skills.length >= 5, tip: `Add ${Math.max(0, 5 - p.skills.length)} more skill${5 - p.skills.length === 1 ? '' : 's'} (5+ looks solid)` },
    { id: 'projects', pts: 15, ok: projectsWithText >= 2, tip: 'Add 2+ projects, each with a title and a short description' },
    { id: 'plinks', pts: 5, ok: projectsWithLinks >= 1, tip: 'Add a repo or demo link to a project' },
    { id: 'socials', pts: 10, ok: links >= 2, tip: 'Add at least 2 social links' },
  ];
  const score = rules.reduce((t, r) => t + (r.ok ? r.pts : 0), 0);
  const tips = rules.filter((r) => !r.ok).sort((a, b) => b.pts - a.pts);
  return { score, rules, tips };
}

export const gradeFor = (score) =>
  score >= 90 ? 'Portfolio-ready!' : score >= 70 ? 'Looking good' : score >= 40 ? 'Getting there' : 'Just getting started';
