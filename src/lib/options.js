// Style options offered in the Style tab.

export const FONT_PAIRS = [
  { id: 'bagel', name: 'Bold & Friendly', head: 'Bagel Fat One', body: 'DM Sans', headWeight: 400, google: 'family=Bagel+Fat+One&family=DM+Sans:wght@400;500;700' },
  { id: 'editorial', name: 'Classic Editorial', head: 'Playfair Display', body: 'Inter', headWeight: 700, google: 'family=Playfair+Display:ital,wght@0,600;0,800;1,500&family=Inter:wght@400;500;600' },
  { id: 'techy', name: 'Techy', head: 'Space Grotesk', body: 'JetBrains Mono', headWeight: 700, google: 'family=Space+Grotesk:wght@500;700&family=JetBrains+Mono:wght@400;500;700' },
  { id: 'modern', name: 'Clean Modern', head: 'Sora', body: 'Inter', headWeight: 700, google: 'family=Sora:wght@500;700;800&family=Inter:wght@400;500;600' },
  { id: 'quirky', name: 'Quirky', head: 'Syne', body: 'Work Sans', headWeight: 800, google: 'family=Syne:wght@600;800&family=Work+Sans:wght@400;500;600' },
];

export const ACCENTS = [
  '#ff6fa8', '#ff8a3d', '#ffc93c', '#c8ff00', '#39ff88', '#7fe0b4',
  '#3f6bff', '#8b6cff', '#e9b872', '#b4452c', '#e5324b', '#111111',
];

export const DENSITIES = [
  { id: 'compact', name: 'Compact', value: 0.75 },
  { id: 'comfortable', name: 'Comfortable', value: 1 },
  { id: 'spacious', name: 'Spacious', value: 1.3 },
];

export const getFontPair = (id) => FONT_PAIRS.find((f) => f.id === id) || FONT_PAIRS[0];
export const getDensity = (id) => DENSITIES.find((d) => d.id === id) || DENSITIES[1];
