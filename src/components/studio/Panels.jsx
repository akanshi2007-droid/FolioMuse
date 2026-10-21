import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { Field, TextInput, TextArea, TagInput, ImageUpload } from '../ui/Fields.jsx';
import { newProject } from '../../lib/sample.js';
import { TEMPLATE_LIST } from '../../lib/templates/index.js';
import { FONT_PAIRS, ACCENTS, DENSITIES } from '../../lib/options.js';
import { sfx } from '../../audio/sound.js';

const SKILL_IDEAS = ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Node.js', 'Python', 'Java', 'SQL', 'Git', 'Figma', 'UI Design', 'MongoDB', 'TypeScript'];

export function DetailsPanel({ p, set, err, touch, onSample, onReset, onImgError }) {
  const e = (k) => err(k);
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="pxbtn inline-flex items-center gap-1.5 !bg-pop-yellow" onClick={onSample}><Sparkles size={13} /> Fill sample</button>
        <button type="button" className="pxbtn" onClick={onReset}>Reset all</button>
      </div>
      <Field label="Profile photo"><ImageUpload round label="Photo" value={p.photo} onChange={(v) => set({ photo: v })} onError={onImgError} /></Field>
      <Field label="Full name *" error={e('name')}>
        <TextInput value={p.name} error={e('name')} maxLength={80} placeholder="Ada Rao" onChange={(ev) => set({ name: ev.target.value })} onBlur={() => touch('name')} />
      </Field>
      <Field label="Role / title" error={e('role')}>
        <TextInput value={p.role} error={e('role')} placeholder="Frontend Developer & Designer" onChange={(ev) => set({ role: ev.target.value })} onBlur={() => touch('role')} />
      </Field>
      <Field label="Tagline" right={`${p.tagline.length}/120`} error={e('tagline')}>
        <TextInput value={p.tagline} error={e('tagline')} placeholder="One line that sums you up" onChange={(ev) => set({ tagline: ev.target.value })} onBlur={() => touch('tagline')} />
      </Field>
      <Field label="About you" right={`${p.bio.length}/900`} error={e('bio')} hint="Leave a blank line to start a new paragraph.">
        <TextArea rows={6} value={p.bio} error={e('bio')} placeholder="A short story about who you are and what you build…" onChange={(ev) => set({ bio: ev.target.value })} onBlur={() => touch('bio')} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Location"><TextInput value={p.location} placeholder="Chennai, India" onChange={(ev) => set({ location: ev.target.value })} /></Field>
        <Field label="Email" error={e('email')}><TextInput type="email" value={p.email} error={e('email')} placeholder="you@example.com" onChange={(ev) => set({ email: ev.target.value })} onBlur={() => touch('email')} /></Field>
      </div>
    </div>
  );
}

export function SkillsPanel({ p, set }) {
  return (
    <div className="space-y-4">
      <Field label={`Skills (${p.skills.length})`} hint="Press Enter or type a comma after each skill. 5+ looks solid.">
        <TagInput tags={p.skills} onChange={(skills) => set({ skills })} placeholder="e.g. React" suggestions={SKILL_IDEAS} />
      </Field>
    </div>
  );
}

function ProjectCard({ pr, i, total, open, onToggle, update, remove, move, err, touch, onImgError }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-ink bg-white" style={{ boxShadow: '3px 3px 0 #1c1920' }}>
      <div className="flex items-center gap-2 bg-pop-yellow px-3 py-2">
        <button type="button" data-sfx="toggle" onClick={onToggle} className="flex-1 truncate text-left font-bold text-ink" aria-expanded={open}>
          <span className="mr-2 font-pixel text-[10px]">{String(i + 1).padStart(2, '0')}</span>{pr.title || 'Untitled project'}
        </button>
        <button type="button" aria-label="Move up" disabled={i === 0} onClick={() => move(-1)} className="rounded p-1 text-ink hover:bg-ink/10 disabled:opacity-30"><ChevronUp size={16} /></button>
        <button type="button" aria-label="Move down" disabled={i === total - 1} onClick={() => move(1)} className="rounded p-1 text-ink hover:bg-ink/10 disabled:opacity-30"><ChevronDown size={16} /></button>
        <button type="button" data-sfx="remove" aria-label="Delete project" onClick={remove} className="rounded p-1 text-pop-red hover:bg-ink/10"><Trash2 size={16} /></button>
      </div>
      {open && (
        <div className="space-y-3 p-3">
          <Field label="Project title *" error={err(`project.${i}.title`)}>
            <TextInput value={pr.title} error={err(`project.${i}.title`)} placeholder="CampusLive" onChange={(e) => update({ title: e.target.value })} onBlur={() => touch(`project.${i}.title`)} />
          </Field>
          <Field label="Description" right={`${pr.description.length}/400`} error={err(`project.${i}.description`)}>
            <TextArea rows={3} value={pr.description} error={err(`project.${i}.description`)} placeholder="What it does and why it's cool" onChange={(e) => update({ description: e.target.value })} />
          </Field>
          <Field label="Tech used"><TagInput tags={pr.tech} onChange={(tech) => update({ tech })} placeholder="React, Node…" /></Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Repo link" error={err(`project.${i}.repo`)}><TextInput value={pr.repo} error={err(`project.${i}.repo`)} placeholder="github.com/you/repo" onChange={(e) => update({ repo: e.target.value })} onBlur={() => touch(`project.${i}.repo`)} /></Field>
            <Field label="Live demo" error={err(`project.${i}.demo`)}><TextInput value={pr.demo} error={err(`project.${i}.demo`)} placeholder="myapp.vercel.app" onChange={(e) => update({ demo: e.target.value })} onBlur={() => touch(`project.${i}.demo`)} /></Field>
          </div>
          <Field label="Screenshot"><ImageUpload label="Screenshot" value={pr.image} onChange={(image) => update({ image })} onError={onImgError} /></Field>
        </div>
      )}
    </div>
  );
}

export function ProjectsPanel({ p, set, err, touch, onImgError }) {
  const [openId, setOpenId] = useState(p.projects[0]?.id);
  const upd = (id, patch) => set({ projects: p.projects.map((x) => (x.id === id ? { ...x, ...patch } : x)) });
  const add = () => { const np = newProject(); set({ projects: [...p.projects, np] }); setOpenId(np.id); };
  const move = (i, d) => { const a = [...p.projects]; [a[i], a[i + d]] = [a[i + d], a[i]]; set({ projects: a }); sfx.select(); };
  return (
    <div className="space-y-3">
      {p.projects.length === 0 && <p className="rounded-lg border-2 border-dashed border-ink/40 p-4 text-center text-sm text-ink/60">No projects yet. Add your best two or three first.</p>}
      {p.projects.map((pr, i) => (
        <ProjectCard key={pr.id} pr={pr} i={i} total={p.projects.length} open={openId === pr.id} onToggle={() => setOpenId(openId === pr.id ? null : pr.id)}
          update={(patch) => upd(pr.id, patch)} remove={() => set({ projects: p.projects.filter((x) => x.id !== pr.id) })} move={(d) => move(i, d)} err={err} touch={touch} onImgError={onImgError} />
      ))}
      <button type="button" data-sfx="pop" onClick={add} disabled={p.projects.length >= 8} className="pxbtn inline-flex w-full items-center justify-center gap-2 !bg-pop-mint"><Plus size={14} /> Add project {p.projects.length >= 8 ? '(max 8)' : ''}</button>
    </div>
  );
}

const SOCIALS = [
  ['github', 'GitHub', 'username or link'], ['linkedin', 'LinkedIn', 'username or link'], ['twitter', 'X / Twitter', '@handle or link'],
  ['instagram', 'Instagram', '@handle or link'], ['website', 'Website', 'myname.dev'],
];
export function LinksPanel({ p, set, err, touch }) {
  return (
    <div className="space-y-4">
      {SOCIALS.map(([k, label, ph]) => (
        <Field key={k} label={label} error={err(`social.${k}`)}>
          <TextInput value={p.socials[k]} error={err(`social.${k}`)} placeholder={ph} onChange={(e) => set({ socials: { ...p.socials, [k]: e.target.value } })} onBlur={() => touch(`social.${k}`)} />
        </Field>
      ))}
    </div>
  );
}

export function StylePanel({ style, setStyle }) {
  const tpl = TEMPLATE_LIST.find((t) => t.id === style.template) || TEMPLATE_LIST[0];
  const accent = style.accent || tpl.defaultAccent;
  return (
    <div className="space-y-6">
      <div>
        <span className="label">Template</span>
        <div className="grid grid-cols-2 gap-2">
          {TEMPLATE_LIST.map((t) => (
            <button key={t.id} type="button" data-sfx="select" onClick={() => setStyle({ template: t.id, accent: t.defaultAccent, palette: 0, fontPair: 'auto' })} aria-pressed={style.template === t.id}
              className={`rounded-lg border-2 border-ink p-2 text-left transition ${style.template === t.id ? 'bg-pop-yellow' : 'bg-white hover:bg-cream'}`}
              style={{ boxShadow: style.template === t.id ? '3px 3px 0 #1c1920' : 'none' }}>
              <span className="flex items-center gap-1.5"><i className="block h-3 w-3 rounded-full border border-ink" style={{ background: t.defaultAccent }} /><b className="font-display text-lg leading-none text-ink">{t.name}</b></span>
              <span className="mt-1 block text-[11px] leading-tight text-ink/60">{t.mood}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Accent colour</span>
        <div className="flex flex-wrap items-center gap-2">
          {ACCENTS.map((c) => (
            <button key={c} type="button" data-sfx="toggle" aria-label={`Accent ${c}`} aria-pressed={accent.toLowerCase() === c} onClick={() => setStyle({ accent: c })}
              className={`h-8 w-8 rounded-full border-2 border-ink transition hover:scale-110 ${accent.toLowerCase() === c ? 'ring-2 ring-ink ring-offset-2 ring-offset-cream' : ''}`} style={{ background: c }} />
          ))}
          <label className="relative grid h-8 w-8 cursor-pointer place-items-center rounded-full border-2 border-dashed border-ink text-xs font-bold text-ink" title="Custom colour">
            +<input type="color" value={accent} onChange={(e) => setStyle({ accent: e.target.value })} className="absolute inset-0 cursor-pointer opacity-0" aria-label="Custom accent colour" />
          </label>
        </div>
      </div>

      <div>
        <span className="label">Background palette</span>
        <div className="grid grid-cols-3 gap-2">
          {tpl.palettes.map((pl, i) => (
            <button key={pl.name} type="button" data-sfx="select" aria-pressed={style.palette === i} onClick={() => setStyle({ palette: i })}
              className={`rounded-lg border-2 border-ink p-2 text-center text-[12px] font-bold text-ink ${style.palette === i ? 'bg-pop-yellow' : 'bg-white'}`}>
              <span className="mx-auto mb-1 flex h-6 w-full overflow-hidden rounded border border-ink"><i className="flex-1" style={{ background: pl.bg }} /><i className="flex-1" style={{ background: pl.card }} /><i className="flex-1" style={{ background: pl.fg }} /></span>
              {pl.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Font pairing</span>
        <div className="space-y-1.5">
          {[{ id: 'auto', name: `Template default`, head: '' }, ...FONT_PAIRS].map((f) => (
            <button key={f.id} type="button" data-sfx="select" aria-pressed={style.fontPair === f.id} onClick={() => setStyle({ fontPair: f.id })}
              className={`flex w-full items-center justify-between rounded-lg border-2 border-ink px-3 py-2 text-left text-sm text-ink ${style.fontPair === f.id ? 'bg-pop-yellow' : 'bg-white hover:bg-cream'}`}>
              <b>{f.name}</b><span className="text-[11px] text-ink/60">{f.head ? `${f.head} + ${f.body}` : tplFont(tpl)}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="label">Spacing density</span>
        <div className="grid grid-cols-3 gap-2">
          {DENSITIES.map((d) => (
            <button key={d.id} type="button" data-sfx="select" aria-pressed={style.density === d.id} onClick={() => setStyle({ density: d.id })}
              className={`rounded-lg border-2 border-ink py-2 text-sm font-bold text-ink ${style.density === d.id ? 'bg-pop-yellow' : 'bg-white'}`}>{d.name}</button>
          ))}
        </div>
      </div>
    </div>
  );
}
const tplFont = (tpl) => FONT_PAIRS.find((f) => f.id === tpl.defaultFont)?.name || '';
