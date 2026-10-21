// Original illustrated bits: mascot "Folio", sparkles, flower, pencil, pixel gamepad, cursor, ribbon.
import React from 'react';

export function Folio({ className = '', walking = false, size = 120 }) {
  return (
    <svg viewBox="0 0 120 140" width={size} height={size * 1.166} className={className} aria-hidden="true">
      <g stroke="#1c1920" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
        {/* legs */}
        <g style={walking ? { transformOrigin: '45px 108px', animation: 'wiggle .5s ease-in-out infinite' } : undefined}>
          <path d="M45 108v20" fill="none" /><ellipse cx="42" cy="131" rx="11" ry="6" fill="#f3ecdd" />
        </g>
        <g style={walking ? { transformOrigin: '75px 108px', animation: 'wiggle .5s ease-in-out infinite reverse' } : undefined}>
          <path d="M75 108v20" fill="none" /><ellipse cx="78" cy="131" rx="11" ry="6" fill="#f3ecdd" />
        </g>
        {/* arms */}
        <path d="M18 70q-14 6-12 24" fill="none" /><circle cx="6" cy="96" r="8" fill="#f3ecdd" />
        <path d="M102 70q14-8 14-28" fill="none" /><circle cx="116" cy="38" r="8" fill="#f3ecdd" />
        {/* folder body */}
        <path d="M14 36a10 10 0 0 1 10-10h28l8 10h36a10 10 0 0 1 10 10v54a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10z" fill="#ff8a3d" />
        {/* hair tuft */}
        <path d="M44 28q-4-20 14-24 6 8 2 14 12-4 14 10" fill="#3f6bff" />
        {/* face */}
        <circle cx="46" cy="66" r="5" fill="#1c1920" stroke="none" /><circle cx="76" cy="66" r="5" fill="#1c1920" stroke="none" />
        <circle cx="47.5" cy="64.5" r="1.6" fill="#fff" stroke="none" /><circle cx="77.5" cy="64.5" r="1.6" fill="#fff" stroke="none" />
        <path d="M50 80q11 10 22 0" fill="#e5324b" />
        <ellipse cx="34" cy="78" rx="6" ry="4" fill="#ff6fa8" stroke="none" opacity=".8" />
        <ellipse cx="88" cy="78" rx="6" ry="4" fill="#ff6fa8" stroke="none" opacity=".8" />
      </g>
    </svg>
  );
}

export const Sparkle = ({ className = '', color = '#ffc93c', size = 28 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
    <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" fill={color} />
  </svg>
);

export const Daisy = ({ className = '', size = 90 }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={className} aria-hidden="true">
    <g stroke="#1c1920" strokeWidth="3">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="20" rx="12" ry="18" fill="#fff" transform={`rotate(${i * 45} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="19" fill="#ffc93c" />
      <circle cx="43" cy="47" r="2.6" fill="#1c1920" stroke="none" /><circle cx="57" cy="47" r="2.6" fill="#1c1920" stroke="none" />
      <path d="M42 56q8 8 16 0" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

export const Pencil = ({ className = '', size = 90 }) => (
  <svg viewBox="0 0 100 40" width={size} height={size * 0.4} className={className} aria-hidden="true">
    <g stroke="#1c1920" strokeWidth="3" strokeLinejoin="round">
      <path d="M6 20l14-12h62v24H20z" fill="#ffc93c" />
      <path d="M82 8h10a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H82z" fill="#ff6fa8" />
      <path d="M6 20l14-12v24z" fill="#f3ecdd" /><path d="M6 20l6-5v10z" fill="#1c1920" />
      <path d="M62 8v24" />
    </g>
  </svg>
);

export const Pad = ({ className = '', size = 90 }) => (
  <svg viewBox="0 0 24 16" width={size} height={size * 0.667} className={`${className} pixelated`} shapeRendering="crispEdges" aria-hidden="true">
    <path d="M3 2h18v1h1v9h-1v1h-5v-1h-1v-1H9v1H8v1H3v-1H2V3h1z" fill="#f3ecdd" /><path d="M3 2h18v1H3zM2 3h1v9H2z" fill="#fff" />
    <path d="M5 5h1v1h1v1H6v1H5V7H4V6h1z" fill="#1c1920" />
    <rect x="15" y="5" width="2" height="2" fill="#e5324b" /><rect x="18" y="7" width="2" height="2" fill="#3f6bff" />
    <rect x="15" y="9" width="2" height="2" fill="#6aa84f" /><rect x="12" y="7" width="2" height="2" fill="#ffc93c" />
  </svg>
);

export const Cursor = ({ className = '', size = 40, flip }) => (
  <svg viewBox="0 0 12 19" width={size} height={size * 1.58} className={`${className} pixelated`} shapeRendering="crispEdges" style={flip ? { transform: 'scaleX(-1)' } : undefined} aria-hidden="true">
    <path d="M0 0h1v15h1v-1h1v-1h1v-1h1l2 5h2l-2-5h4V9h-1V8h-1V7h-1V6h-1V5H7V4H6V3H5V2H4V1H3V0z" fill="#fff" />
    <path d="M1 2v11h1v-1h1v-1h1v-1h1l2 5h1l-2-5h5L1 2z" fill="#1c1920" opacity="0" />
    <path d="M1 1h1v1h1v1h1v1h1v1h1v1h1v1h1v1h1v1H8v1l2 5H9l-2-5H6v1H5v1H4v1H3v1H1z" fill="#1c1920" />
  </svg>
);

// Rainbow ribbon made of nested strokes (like a painted road).
export function Ribbon({ d, className = '', draw = true, width = 120 }) {
  const cols = ['#ff6fa8', '#ff8a3d', '#ffc93c', '#8b6cff', '#3f6bff'];
  return (
    <g className={className} fill="none" strokeLinecap="round" strokeLinejoin="round">
      {cols.map((c, i) => (
        <path key={c} d={d} stroke={c} strokeWidth={width - i * (width / 5.5)} pathLength="1" strokeDasharray={draw ? 1 : undefined}
          style={draw ? { strokeDashoffset: 1, animation: `ribbon 2.2s ${0.15 * i}s cubic-bezier(.6,.1,.2,1) forwards` } : undefined} />
      ))}
    </g>
  );
}
