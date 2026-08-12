import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function VolumeControl({ volume, muted, onChangeVolume, onToggleMute }) {
  const handleVolumeChange = (e) => {
    onChangeVolume(parseFloat(e.target.value));
  };

  return (
    <div className="flex items-center gap-3 text-retro-cream/70 select-none">
      {/* Mute/Unmute Icon Button */}
      <button
        onClick={onToggleMute}
        className="hover:text-retro-mint transition-colors duration-300 cursor-pointer p-1"
        aria-label={muted || volume === 0 ? "Unmute" : "Mute"}
      >
        {muted || volume === 0 ? (
          <VolumeX className="w-4 h-4 text-retro-teal" />
        ) : (
          <Volume2 className="w-4 h-4 text-retro-cream/80" />
        )}
      </button>

      {/* Volume Slider Rail */}
      <div className="relative group flex items-center w-16 md:w-20 h-4">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual Volume Track */}
        <div className="relative w-full h-[2px] bg-retro-teal/30 rounded-full overflow-hidden transition-all duration-300 group-hover:h-[3px]">
          <div
            className="absolute left-0 top-0 h-full bg-retro-cream"
            style={{ width: `${(muted ? 0 : volume) * 100}%` }}
          />
        </div>

        {/* Custom Visual Thumb */}
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-retro-cream opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 -ml-0.5"
          style={{ left: `${(muted ? 0 : volume) * 100}%` }}
        />
      </div>
    </div>
  );
}
