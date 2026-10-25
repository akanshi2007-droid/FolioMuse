# ✦ FolioMuse 

### **Your story. Your style. Your portfolio.**
FolioMuse is a **browser-based portfolio generator** that lets you enter your details, choose from **5 unique templates**, customise the design, preview it live across devices, and export a complete portfolio website as a ZIP.
**No backend. No login. No paid APIs.**

---
<img width="1892" height="912" alt="image" src="https://github.com/user-attachments/assets/c23391eb-b8c1-446e-a0af-f64bde74fb33" />
<img width="1917" height="917" alt="image" src="https://github.com/user-attachments/assets/daa44325-8733-4203-96c8-6677657111b0" />
Deployed link- https://foliomuse-five.vercel.app/

## ✦ Features
- 🎨 **5 Templates** — Noir, Volt, Paper, Terminal & Pop
- ✏️ **Customisation** — colours, fonts & layout density
- 📱 **Live Preview** — Desktop, Tablet & Mobile
- 📁 **Dynamic Projects** — add/remove projects & screenshots
- 🖼️ **Image Uploads** — profile & project images
- 💾 **Auto-Save** — drafts stored in LocalStorage
- 📦 **ZIP Export** — ready-to-use HTML, CSS & assets
- 🔊 **Interactive SFX** — Web Audio API, no audio files
- ✅ **Validation & Completeness Meter**


## ✦ How It Works
```text
Form → Profile Object → renderPortfolio()
                         ↙          ↘
                  Live Preview    ZIP Export
```

The same renderer powers both the preview and exported website, keeping them consistent.

---

## ✦ Tech Stack

**React · Vite · JavaScript · CSS · JSZip · Web Audio API · LocalStorage**

---

## ✦ Run Locally
```powershell
npm install
npm run dev
```

Open `http://localhost:5173`

For production:

```powershell
npm run build
npm run preview
```

**Requires Node.js 18+.**

---

## ✦ Export Structure

```text
portfolio.zip
├── index.html
├── styles.css
├── assets/
└── README.txt
```

Unzip → open `index.html` → your portfolio is ready.

---

## ✦ Future Scope

GitHub import · Public portfolio links · Cloud drafts · More templates · PDF/Word export

### **Your story. Your style. Your portfolio.**
