import React, { useEffect, useRef } from 'react';

// A tiny pixel-art landscape painted on a low-res canvas, then scaled up crisp.
export default function PixelLandscape({ className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current;
    const W = 128, H = 96;
    c.width = W; c.height = H;
    const x = c.getContext('2d');
    let seed = 7;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const px = (col, a, b, w = 1, h = 1) => { x.fillStyle = col; x.fillRect(a, b, w, h); };

    // sky bands
    ['#243a8f', '#2f4ca8', '#3f63c0', '#5782d0', '#7ba2de', '#a3c1ea', '#c8dbf0', '#e6e8e6'].forEach((col, i) => px(col, 0, i * 6, W, 6));
    // dithered band edges
    for (let i = 1; i < 8; i++) for (let a = i % 2; a < W; a += 2) px(['#243a8f', '#2f4ca8', '#3f63c0', '#5782d0', '#7ba2de', '#a3c1ea', '#c8dbf0', '#e6e8e6'][i - 1], a, i * 6, 1, 1);
    px('#e6e8e6', 0, 48, W, H - 48);
    // clouds
    const cloud = (cx, cy, s) => {
      [[0, 2, 10 * s, 3 * s], [2 * s, 0, 6 * s, 3 * s], [5 * s, 1, 7 * s, 3 * s]].forEach(([a, b, w, h]) => px('#f6f0e6', cx + a, cy + b, w, h));
      px('#c9c8e0', cx, cy + 2 + 3 * s - 1, 10 * s, 1);
    };
    cloud(8, 14, 2); cloud(70, 8, 2); cloud(96, 26, 1); cloud(40, 30, 1);
    // far mountains
    for (let a = 0; a < W; a++) {
      const h = 22 + Math.sin(a / 11) * 7 + Math.sin(a / 4.3) * 2;
      px('#5a6fa6', a, 50 - h + 24, 1, h);
      px('#7587b8', a, 50 - h + 24, 1, 2);
    }
    // rolling hills
    const hill = (base, amp, f, col, hi) => {
      for (let a = 0; a < W; a++) {
        const y = Math.round(base + Math.sin(a / f) * amp);
        px(col, a, y, 1, H - y);
        px(hi, a, y, 1, 1);
      }
    };
    hill(60, 4, 9, '#4f7d3a', '#7fb35a');
    hill(70, 5, 7, '#5e9142', '#92c868');
    hill(80, 3, 5, '#3f7a35', '#6fae4e');
    // grass tufts & flowers
    for (let i = 0; i < 160; i++) {
      const a = Math.floor(rnd() * W), b = 66 + Math.floor(rnd() * 30);
      px(rnd() > 0.5 ? '#2f5d2a' : '#9bd16f', a, b, 1, 2);
    }
    for (let i = 0; i < 16; i++) {
      const a = Math.floor(rnd() * W), b = 72 + Math.floor(rnd() * 22);
      const col = ['#ff6fa8', '#ffc93c', '#fff'][i % 3];
      px(col, a, b); px('#2f5d2a', a, b + 1);
    }
    // a pixel tree
    px('#6b4a2b', 100, 56, 2, 8);
    px('#2f6b2f', 96, 48, 10, 8); px('#3f8a3f', 98, 44, 6, 6); px('#5fae52', 99, 45, 3, 2);
  }, []);
  return <canvas ref={ref} className={`pixelated block w-full ${className}`} aria-hidden="true" style={{ aspectRatio: '128 / 96' }} />;
}
