import React from 'react';

export default function StartScreen({ onEnter }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-retro-bg text-retro-cream px-4 select-none">
      {/* Immersive ambient overlay effects */}
      <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-scanlines opacity-5 pointer-events-none" />

      {/* Content Container */}
      <div className="text-center max-w-md w-full px-6 flex flex-col items-center gap-8 animate-fade-in z-10">
        <div className="flex flex-col gap-2">
          <span className="text-xs uppercase tracking-[0.4em] text-retro-mint opacity-85 font-mono">
            Ambient Experience
          </span>
          <h1 className="text-5xl font-serif font-semibold tracking-wide text-retro-cream">
            Retro Music
          </h1>
        </div>

        <p className="text-sm font-sans text-retro-teal opacity-90 font-light tracking-wide leading-relaxed max-w-[280px]">
          Enter a calm, minimalist listening room with static sounds and curated lo-fi tunes.
        </p>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-3 rounded-full border border-retro-mint/30 bg-transparent text-retro-cream text-sm tracking-[0.2em] font-mono hover:text-retro-mint transition-colors duration-500 overflow-hidden cursor-pointer"
        >
          {/* Subtle hover background glow */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-retro-teal/20 to-retro-mint/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          
          <span className="relative z-10 flex items-center gap-2">
            ENTER SPACE
          </span>
        </button>

        <span className="text-[10px] font-mono text-retro-teal opacity-60 mt-4">
          BEST EXPERIENCED WITH HEADPHONES
        </span>
      </div>
    </div>
  );
}
