// Retro sound effects, synthesised live with the Web Audio API.
// No audio files needed — everything is generated in the browser.
import { useSyncExternalStore } from 'react';
import { getPref, setPref } from '../lib/storage.js';

let ctx = null;
let master = null;
let muted = getPref('muted', false);
const listeners = new Set();
let lastPlayed = {};

function ensure() {
  if (muted) return null;
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.5;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

// One synthesised beep. slide = end-frequency for a pitch glide.
function tone({ f = 440, type = 'square', d = 0.08, v = 0.12, slide, at = 0 }) {
  const c = ensure();
  if (!c) return;
  const t = c.currentTime + at;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(slide, t + d);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(v, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + d + 0.02);
}

function noise({ d = 0.25, v = 0.08, from = 3000, to = 300, at = 0 }) {
  const c = ensure();
  if (!c) return;
  const t = c.currentTime + at;
  const len = Math.floor(c.sampleRate * d);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'bandpass';
  f.frequency.setValueAtTime(from, t);
  f.frequency.exponentialRampToValueAtTime(to, t + d);
  const g = c.createGain();
  g.gain.setValueAtTime(v, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  src.connect(f).connect(g).connect(master);
  src.start(t);
}

const notes = (list, opts = {}) => list.forEach((f, i) => tone({ f, at: i * (opts.gap ?? 0.07), d: opts.d ?? 0.12, v: opts.v ?? 0.1, type: opts.type ?? 'square' }));
const throttle = (key, ms) => {
  const now = performance.now();
  if (now - (lastPlayed[key] || 0) < ms) return false;
  lastPlayed[key] = now;
  return true;
};

export const sfx = {
  hover: () => throttle('hover', 70) && tone({ f: 1250, d: 0.025, v: 0.025 }),
  click: () => { tone({ f: 420, slide: 760, d: 0.07, v: 0.11 }); },
  select: () => notes([523, 784], { gap: 0.055, d: 0.09 }),
  toggle: () => tone({ f: 660, type: 'triangle', d: 0.06, v: 0.14 }),
  type: () => throttle('type', 45) && tone({ f: 900 + Math.random() * 300, d: 0.02, v: 0.03, type: 'square' }),
  pop: () => tone({ f: 300, slide: 900, d: 0.11, v: 0.13, type: 'sine' }),
  remove: () => tone({ f: 500, slide: 120, d: 0.16, v: 0.12, type: 'sawtooth' }),
  error: () => { tone({ f: 160, d: 0.14, v: 0.14, type: 'sawtooth' }); tone({ f: 120, d: 0.18, v: 0.14, type: 'sawtooth', at: 0.1 }); },
  warn: () => notes([392, 330], { gap: 0.1, d: 0.14, type: 'triangle', v: 0.13 }),
  step: () => notes([659, 988], { gap: 0.06, d: 0.1, v: 0.09, type: 'triangle' }),
  whoosh: () => noise({ d: 0.3, v: 0.09 }),
  coin: () => { tone({ f: 988, d: 0.07, v: 0.1 }); tone({ f: 1319, d: 0.3, v: 0.1, at: 0.07 }); },
  success: () => notes([523, 659, 784, 1047], { gap: 0.08, d: 0.16, v: 0.1 }),
  start: () => {
    notes([262, 330, 392, 523, 392, 523, 659, 784], { gap: 0.085, d: 0.16, v: 0.1 });
    noise({ d: 0.5, v: 0.04, from: 800, to: 4000 });
  },
  fanfare: () => {
    notes([523, 523, 523, 659, 784, 659, 784, 1047], { gap: 0.09, d: 0.2, v: 0.1 });
    tone({ f: 130, d: 0.9, v: 0.1, type: 'triangle', at: 0.2 });
  },
  load: () => throttle('load', 120) && tone({ f: 200 + Math.random() * 200, d: 0.03, v: 0.04 }),
};

// ---- mute state (shared by the whole app) ----
export function isMuted() { return muted; }
export function setMuted(v) {
  muted = v;
  setPref('muted', v);
  listeners.forEach((l) => l());
  if (!v) setTimeout(() => sfx.toggle(), 30);
}
export function useMuted() {
  return useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => muted);
}

// Unlock audio on first user gesture and wire up automatic sounds:
//  hover/click on buttons & links, tiny ticks while typing.
//  Add data-sfx="select|toggle|pop|remove|success|none" to override a click sound.
export function installGlobalSfx() {
  const unlock = () => { ensure(); };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });

  const target = (e) => e.target.closest?.('button, a, [role="button"], [data-sfx], select, summary');
  document.addEventListener('pointerover', (e) => {
    const t = target(e);
    if (!t || t.dataset.sfx === 'none' || t.disabled || e.pointerType === 'touch') return;
    if (e.relatedTarget && t.contains(e.relatedTarget)) return;
    sfx.hover();
  });
  document.addEventListener('click', (e) => {
    const t = target(e);
    if (!t || t.disabled) return;
    const kind = t.dataset.sfx;
    if (kind === 'none') return;
    (sfx[kind] || sfx.click)();
  });
  document.addEventListener('input', (e) => {
    if (e.target.matches?.('input[type=text], input:not([type]), input[type=email], input[type=url], textarea')) sfx.type();
  });
}
