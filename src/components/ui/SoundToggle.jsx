import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMuted, setMuted } from '../../audio/sound.js';

export default function SoundToggle({ className = '' }) {
  const muted = useMuted();
  return (
    <button
      type="button"
      data-sfx="none"
      onClick={() => setMuted(!muted)}
      aria-pressed={!muted}
      aria-label={muted ? 'Turn sound effects on' : 'Turn sound effects off'}
      className={`pxbtn inline-flex items-center gap-2 ${className}`}
    >
      {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
      <span>SFX {muted ? 'OFF' : 'ON'}</span>
    </button>
  );
}
