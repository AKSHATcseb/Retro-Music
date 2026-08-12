import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none bg-retro-bg pointer-events-none">
      {/* The Master Generated Static Image */}
      <img
        src="/bg6.jpg"
        alt="Retro Listening Room"
        className="w-full h-full object-cover object-center select-none filter contrast-[1.02] brightness-[0.98]"
        draggable="false"
      />

      {/* Retro Vignette Overlay for Depth & Focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(6,32,43,0.92)_100%)] z-10" />

      {/* Subtle Soft Glow Overlay that flickers slightly (Lofi warmth) */}
      <div className="absolute inset-0 bg-retro-cream/5 mix-blend-color-dodge opacity-30 animate-pulse-subtle z-10" />

      {/* CRT Scanline and Noise Overlay for analogue fidelity */}
      <div className="absolute inset-0 bg-scanlines opacity-[0.03] pointer-events-none z-20" />
      <div className="absolute inset-0 bg-noise opacity-[0.015] pointer-events-none z-20" />
    </div>
  );
}
