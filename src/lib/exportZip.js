import JSZip from 'jszip';
import { renderPortfolio } from './render.js';
import { slugify } from './utils.js';

const dataUrlToBase64 = (d) => d.split(',')[1] || '';

// Builds the standalone website folder as a ZIP:
//   index.html, styles.css, assets/ (uploaded images), README.txt
export async function buildZip(profile, style) {
  const assets = []; // { path, base64 }
  const imageSrc = (kind, index) => {
    const dataUrl = kind === 'photo' ? profile.photo : profile.projects[index]?.image;
    if (!dataUrl) return '';
    const path = kind === 'photo' ? 'assets/photo.jpg' : `assets/project-${index + 1}.jpg`;
    if (!assets.find((a) => a.path === path)) assets.push({ path, base64: dataUrlToBase64(dataUrl) });
    return path;
  };

  const { html, css, templateName } = renderPortfolio(profile, style, { mode: 'export', imageSrc });

  const zip = new JSZip();
  const root = zip.folder(`${slugify(profile.name)}-portfolio`);
  root.file('index.html', html);
  root.file('styles.css', css);
  assets.forEach((a) => root.file(a.path, a.base64, { base64: true }));
  if (!assets.length) root.folder('assets').file('.gitkeep', '');
  root.file('README.txt', readme(profile.name, templateName, assets.length));

  const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
  const files = ['index.html', 'styles.css', ...assets.map((a) => a.path), 'README.txt'];
  return { blob, filename: `${slugify(profile.name)}-portfolio.zip`, files, bytes: blob.size };
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function readme(name, templateName, imageCount) {
  return `${name || 'Your'} — Portfolio
=============================
Made with FolioMuse (template: ${templateName}).

WHAT'S INSIDE
  index.html   your portfolio page
  styles.css   all the styling
  assets/      your uploaded images (${imageCount} file${imageCount === 1 ? '' : 's'})

HOW TO USE IT
  1. Unzip this folder.
  2. Double-click index.html — it opens in your browser. No server, no install.

HOW TO PUT IT ONLINE (free)
  Netlify Drop : go to app.netlify.com/drop and drag this folder onto the page.
  GitHub Pages : create a repo, upload these files, then Settings > Pages > Deploy from branch.
  Vercel       : run "vercel" inside this folder, or drag it into the Vercel dashboard.

HOW TO EDIT
  Open index.html in any text editor (VS Code, Notepad). Change the text between the tags.
  Open styles.css to change colours: look for the --accent and --bg lines at the very top.

NOTE
  Fonts load from Google Fonts, so they need an internet connection. Offline, your browser
  falls back to a similar system font.
`;
}
