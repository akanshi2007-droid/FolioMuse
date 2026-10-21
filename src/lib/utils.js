// Small helpers shared by the app and by the portfolio renderers.

export const uid = () => Math.random().toString(36).slice(2, 9);

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Only allow http(s) and mailto links — blocks javascript: and data: URLs.
export function safeUrl(input) {
  const v = String(input || '').trim();
  if (!v) return '';
  if (/^(https?:\/\/|mailto:)/i.test(v)) return v;
  if (/^[\w-]+(\.[\w-]+)+(\/.*)?$/i.test(v)) return 'https://' + v;
  return '';
}

export function isValidUrl(input) {
  const v = String(input || '').trim();
  if (!v) return true;
  return safeUrl(v) !== '';
}

export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim());

// A social field can hold a username ("ada") or a full URL.
const SOCIAL_BASE = {
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/in/',
  twitter: 'https://x.com/',
  instagram: 'https://instagram.com/',
};
export function socialUrl(kind, value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (kind === 'website') return safeUrl(v);
  const asUrl = safeUrl(v);
  if (asUrl && /\//.test(v)) return asUrl;
  if (/^[\w.-]+$/.test(v.replace(/^@/, ''))) return SOCIAL_BASE[kind] + v.replace(/^@/, '');
  return asUrl;
}

export const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  twitter: 'X / Twitter',
  instagram: 'Instagram',
  website: 'Website',
};

export const slugify = (s) =>
  String(s || 'my')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'my';

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0');
}

// Pick black or white text that reads on a given hex colour.
export function readableOn(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#111111';
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.42 ? '#111111' : '#ffffff';
}

export const initials = (name) =>
  String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'FM';

export const splitTags = (str) =>
  String(str || '')
    .split(/[,\n]/)
    .map((t) => t.trim())
    .filter(Boolean);
