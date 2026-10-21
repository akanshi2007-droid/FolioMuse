# FolioMuse — Your story, your style, your portfolio

A web app where you type in your details, pick one of **5 templates**, customise the look, preview it live on
desktop / tablet / mobile, and **download a finished portfolio website as a ZIP** (`index.html`, `styles.css`,
`assets/`, `README.txt`). No backend, no login, no paid API. Team 2 · Aakanksha Singh & Stuti Verma · SRM Insider.

## Run it (Windows PowerShell)

```powershell
npm install
npm run dev
```

Open the link it prints (usually http://localhost:5173). To make a production build: `npm run build`, then `npm run preview`.
Needs Node 18+.

## What's inside

| Feature | Where |
|---|---|
| Retro LOADING → START intro, rainbow hero, winding scroll road, template gallery, pixel finale | `src/components/landing/` |
| Studio: Details / Skills / Projects / Links / Style tabs, live preview, device toggle | `src/components/studio/` |
| 5 templates: **Noir, Volt, Paper, Terminal, Pop** | `src/lib/templates/` |
| One renderer used by BOTH the preview and the ZIP (so they always match) | `src/lib/render.js` |
| ZIP export with JSZip | `src/lib/exportZip.js` |
| Validation, completeness meter (visible rules, no AI), LocalStorage drafts, image resize | `src/lib/` |
| Sound effects (synthesised with Web Audio, no audio files) | `src/audio/sound.js` |

## Sound effects

Click **START** on the intro to unlock audio. Hover and click blips, typing ticks, "step" jingles on the road,
a fanfare on export. Toggle with the **SFX ON/OFF** button (saved in LocalStorage). To change which sound a button
plays, add `data-sfx="select | toggle | pop | remove | coin | whoosh | none"` to it.

## Data flow (one-way)

`form → one shared profile object → renderPortfolio() → live preview (iframe) AND ZIP exporter`

## Manual test checklist

- [ ] Intro loads, START plays a jingle, SFX toggle mutes everything
- [ ] Studio: empty name shows a friendly error and blocks export
- [ ] Fill sample → completeness jumps; tips explain what's missing
- [ ] Switch all 5 templates; your data stays
- [ ] Accent, palette, font pairing, density all change the preview
- [ ] Upload a photo + project screenshot; they appear in preview and in `assets/`
- [ ] Refresh the page: draft is still there (LocalStorage)
- [ ] Reset asks for confirmation
- [ ] Export ZIP → unzip → double-click `index.html` works without a server; resize window to check responsive
- [ ] Preview on Desktop / Tablet / Mobile buttons

## Notes

- Fonts in the exported site load from Google Fonts (needs internet; falls back to system fonts offline).
- Drafts with large images can exceed the browser's LocalStorage limit; the app shows a warning instead of crashing.
- Future scope (planned, not built): GitHub import, public links, accounts and cloud drafts, more templates, PDF/Word export.
