import React from 'react';

export default function ProgressBar({ currentTime, duration, onSeek }) {
  // Format seconds into MM:SS
  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const percent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleChange = (e) => {
    onSeek(parseFloat(e.target.value));
  };

  return (
    <div className="w-full flex flex-col gap-2 font-mono text-[10px] tracking-widest text-retro-cream/60 select-none">
      <div className="relative group w-full flex items-center h-4">
        {/* Custom Progress Track styling */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual Track */}
        <div className="relative w-full h-[2px] bg-retro-teal/30 rounded-full overflow-hidden transition-all duration-300 group-hover:h-[4px]">
          {/* Active progress color */}
          <div
            className="absolute left-0 top-0 h-full bg-retro-mint rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Visual Slider Thumb on Hover */}
        <div
          className="absolute w-2 h-2 rounded-full bg-retro-cream border border-retro-bg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 -ml-1"
          style={{ left: `${percent}%` }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px]">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}
