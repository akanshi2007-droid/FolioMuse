import React, { useRef, useState } from 'react';
import { ImagePlus, X, Plus } from 'lucide-react';
import { fileToResizedDataUrl } from '../../lib/image.js';
import { splitTags } from '../../lib/utils.js';
import { sfx } from '../../audio/sound.js';

export function Field({ label, hint, error, children, right }) {
  return (
    <label className="block">
      <span className="flex items-end justify-between">
        <span className="label">{label}</span>
        {right && <span className="mb-1 font-pixel text-[9px] text-ink/50">{right}</span>}
      </span>
      {children}
      {error ? <span role="alert" className="mt-1 block text-[13px] font-medium text-pop-red">⚠ {error}</span> : hint ? <span className="mt-1 block text-[12px] text-ink/50">{hint}</span> : null}
    </label>
  );
}

export const TextInput = ({ error, ...p }) => <input type="text" {...p} className={`field ${error ? 'field-err' : ''}`} />;
export const TextArea = ({ error, ...p }) => <textarea {...p} className={`field resize-y ${error ? 'field-err' : ''}`} />;

export function TagInput({ tags, onChange, placeholder = 'Type and press Enter', suggestions = [] }) {
  const [text, setText] = useState('');
  const add = (raw) => {
    const incoming = splitTags(raw).filter((t) => !tags.some((x) => x.toLowerCase() === t.toLowerCase()));
    if (incoming.length) { sfx.pop(); onChange([...tags, ...incoming].slice(0, 30)); }
    setText('');
  };
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-lg border-2 border-ink bg-white p-2">
        {tags.map((t) => (
          <span key={t} className="inline-flex items-center gap-1 rounded-md border-2 border-ink bg-pop-yellow px-2 py-0.5 text-[13px] font-bold text-ink">
            {t}
            <button type="button" data-sfx="remove" aria-label={`Remove ${t}`} onClick={() => onChange(tags.filter((x) => x !== t))} className="rounded hover:bg-ink/15"><X size={13} /></button>
          </span>
        ))}
        <input
          type="text"
          value={text}
          placeholder={tags.length ? 'Add another…' : placeholder}
          onChange={(e) => (e.target.value.includes(',') ? add(e.target.value) : setText(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); add(text); }
            if (e.key === 'Backspace' && !text && tags.length) onChange(tags.slice(0, -1));
          }}
          onBlur={() => text && add(text)}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-[15px] text-ink outline-none placeholder:text-ink/40"
        />
      </div>
      {suggestions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {suggestions.filter((s) => !tags.includes(s)).slice(0, 12).map((s) => (
            <button key={s} type="button" data-sfx="pop" onClick={() => add(s)} className="inline-flex items-center gap-1 rounded-md border-2 border-dashed border-ink/40 px-2 py-0.5 text-[12px] font-medium text-ink/70 hover:border-ink hover:bg-pop-yellow/50"><Plus size={11} />{s}</button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ImageUpload({ value, onChange, label = 'Image', round = false, onError }) {
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const pick = async (file) => {
    if (!file) return;
    setBusy(true);
    try { onChange(await fileToResizedDataUrl(file, round ? 700 : 1000)); sfx.success(); }
    catch (e) { sfx.error(); onError?.(e.message); }
    finally { setBusy(false); if (input.current) input.current.value = ''; }
  };
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => input.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files?.[0]); }}
        aria-label={value ? `Replace ${label}` : `Upload ${label}`}
        className={`grid h-20 w-20 shrink-0 place-items-center overflow-hidden border-2 border-dashed border-ink bg-white text-ink/50 transition hover:bg-pop-yellow/30 ${round ? 'rounded-full' : 'rounded-lg'}`}
      >
        {value ? <img src={value} alt="" className="h-full w-full object-cover" /> : <ImagePlus size={24} />}
      </button>
      <div className="text-[13px] text-ink/70">
        <p className="font-bold text-ink">{busy ? 'Resizing…' : value ? `${label} added` : `Add ${label.toLowerCase()}`}</p>
        <p>Click or drop a JPG/PNG/WebP. Resized in your browser.</p>
        {value && <button type="button" data-sfx="remove" onClick={() => onChange('')} className="mt-1 font-bold text-pop-red underline">Remove</button>}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={(e) => pick(e.target.files?.[0])} />
    </div>
  );
}
