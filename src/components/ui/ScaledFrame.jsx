import React, { useEffect, useRef, useState } from 'react';

// Renders HTML in an iframe at a fixed "device" width and scales it to fit its container.
// fill=true  -> iframe height fills the container (studio preview)
// fill=false -> container keeps the aspect ratio width:height (gallery thumbnails)
export default function ScaledFrame({ html, width = 1280, height = 800, fill = false, title = 'Preview', className = '', interactive = true }) {
  const box = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(box.current);
    return () => ro.disconnect();
  }, []);

  const scale = size.w && width ? Math.min(1, size.w / width) : 1;
  const frameH = fill ? (size.h || height) / scale : height;

  return (
    <div
      ref={box}
      className={`relative overflow-hidden ${className}`}
      style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        title={title}
        srcDoc={html}
        sandbox="allow-scripts"
        loading="lazy"
        tabIndex={interactive ? 0 : -1}
        style={{
          width,
          height: frameH,
          border: 0,
          transformOrigin: '0 0',
          transform: `scale(${scale})`,
          marginLeft: fill ? Math.max(0, (size.w - width * scale) / 2) : 0,
          pointerEvents: interactive ? 'auto' : 'none',
          background: '#fff',
        }}
      />
    </div>
  );
}
