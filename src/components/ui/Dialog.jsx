import React, { useEffect } from 'react';

// Retro Windows-style dialog used for confirmations and the export window.
export default function Dialog({ title = 'WARNING', children, onClose, wide = false }) {
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-ink/70 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}>
      <div role="dialog" aria-modal="true" aria-label={title} className={`win animate-popin w-full ${wide ? 'max-w-xl' : 'max-w-sm'}`}>
        <div className="win-bar"><span>{title}</span><button type="button" onClick={onClose} aria-label="Close" className="win-x" data-sfx="none">✕</button></div>
        <div className="win-body max-h-[80vh] overflow-y-auto p-5 ink-scroll">{children}</div>
      </div>
    </div>
  );
}

export function Confirm({ message, yes = 'Yes', no = 'No', onYes, onNo }) {
  return (
    <Dialog title="WARNING" onClose={onNo}>
      <p className="mb-5 text-center font-pixel text-[13px] uppercase leading-relaxed tracking-wide text-retro">{message}</p>
      <div className="flex justify-center gap-3">
        <button type="button" data-sfx="remove" className="pxbtn !bg-pop-pink" onClick={onYes}>{yes}</button>
        <button type="button" data-sfx="select" className="pxbtn" onClick={onNo}>{no}</button>
      </div>
    </Dialog>
  );
}
