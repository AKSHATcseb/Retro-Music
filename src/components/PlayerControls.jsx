import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, HelpCircle } from 'lucide-react';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default function PlayerControls({
  currentSong,
  playing,
  currentTime,
  duration,
  volume,
  muted,
  loading,
  error,
  togglePlay,
  next,
  prev,
  seek,
  changeVolume,
  toggleMute,
}) {
  const [visible, setVisible] = useState(true);
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const timeoutRef = useRef(null);

  // Auto-hiding controls on inactivity
  const resetInactivityTimeout = () => {
    setVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (playing) {
        setVisible(false);
        setShowKeyboardHelp(false); // Hide help overlay on auto-hide
      }
    }, 4000); // Hide after 4 seconds of inactivity
  };

  useEffect(() => {
    // Enable auto-hide only when playing
    if (playing) {
      resetInactivityTimeout();
    } else {
      setVisible(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }

    const handleMouseMove = () => resetInactivityTimeout();
    const handleKeyPress = () => resetInactivityTimeout();
    const handleTouchStart = () => resetInactivityTimeout();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('touchstart', handleTouchStart);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [playing]);

  return (
    <>
      {/* Keyboard Shortcuts Help Overlay */}
      {showKeyboardHelp && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-retro-bg/85 backdrop-blur-sm transition-opacity duration-500 text-retro-cream select-none px-4">
          <div className="bg-retro-bg border border-retro-teal/30 p-6 md:p-8 rounded-2xl max-w-sm w-full font-mono text-xs flex flex-col gap-6 shadow-2xl relative">
            <h3 className="text-sm font-semibold tracking-wider text-retro-mint border-b border-retro-teal/20 pb-3 flex items-center justify-between">
              <span>KEYBOARD SHORTCUTS</span>
              <button 
                onClick={() => setShowKeyboardHelp(false)}
                className="text-retro-cream/50 hover:text-retro-mint transition-colors cursor-pointer text-base leading-none p-1"
              >
                &times;
              </button>
            </h3>
            <ul className="flex flex-col gap-4 text-retro-cream/80">
              <li className="flex justify-between border-b border-retro-teal/10 pb-1.5">
                <span>Space</span>
                <span className="text-retro-mint">Play / Pause</span>
              </li>
              <li className="flex justify-between border-b border-retro-teal/10 pb-1.5">
                <span>&larr; / &rarr;</span>
                <span className="text-retro-mint">Prev / Next Track</span>
              </li>
              <li className="flex justify-between border-b border-retro-teal/10 pb-1.5">
                <span>&uarr; / &darr;</span>
                <span className="text-retro-mint">Volume Up / Down</span>
              </li>
              <li className="flex justify-between pb-1">
                <span>M</span>
                <span className="text-retro-mint">Mute Toggle</span>
              </li>
            </ul>
            <p className="text-[10px] text-retro-teal text-center mt-2 leading-relaxed">
              Press any key or click outside to dismiss.
            </p>
          </div>
        </div>
      )}

      {/* Main Floating Player Dock */}
      <div
        className={`fixed bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-lg transition-all duration-1000 transform select-none ${
          visible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="relative overflow-hidden bg-retro-bg/60 backdrop-blur-md border border-retro-teal/25 rounded-2xl p-5 md:p-6 shadow-2xl flex flex-col gap-4">
          
          {/* Subtle glow border overlay */}
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-retro-mint/30 to-transparent" />

          {/* Top Row: Track Metadata & Help Icon */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col min-w-0">
              <h2 className="text-sm font-medium tracking-wide text-retro-cream truncate font-sans">
                {currentSong ? currentSong.title : 'No Track Loaded'}
              </h2>
              <p className="text-xs text-retro-teal font-mono tracking-wider truncate mt-0.5">
                {currentSong ? currentSong.artist : 'Unknown Artist'}
              </p>
            </div>

            {/* Quick Status / Loading / Error Indicators */}
            <div className="flex items-center gap-3">
              {loading && (
                <span className="text-[10px] font-mono text-retro-mint animate-pulse-subtle">
                  buffering...
                </span>
              )}
              {error && (
                <span className="text-[10px] font-mono text-red-400 bg-red-950/20 px-2 py-0.5 rounded border border-red-900/30">
                  {error}
                </span>
              )}
              <button
                onClick={() => setShowKeyboardHelp(true)}
                className="text-retro-teal hover:text-retro-mint transition-colors duration-300 cursor-pointer p-1"
                title="Keyboard Shortcuts"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar Component */}
          <ProgressBar
            currentTime={currentTime}
            duration={duration}
            onSeek={seek}
          />

          {/* Bottom Controls Row: Playback Buttons and Volume */}
          <div className="flex justify-between items-center mt-1">
            
            {/* Playback Actions */}
            <div className="flex items-center gap-6">
              <button
                onClick={prev}
                className="text-retro-cream hover:text-retro-mint transition-colors duration-300 cursor-pointer p-1"
                aria-label="Previous Song"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-retro-cream hover:bg-retro-mint hover:shadow-lg hover:shadow-retro-mint/10 flex items-center justify-center text-retro-bg transition-all duration-300 transform active:scale-95 cursor-pointer"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? (
                  <Pause className="w-4 h-4 fill-retro-bg stroke-[2.5]" />
                ) : (
                  <Play className="w-4 h-4 fill-retro-bg translate-x-[1px] stroke-[2.5]" />
                )}
              </button>

              <button
                onClick={next}
                className="text-retro-cream hover:text-retro-mint transition-colors duration-300 cursor-pointer p-1"
                aria-label="Next Song"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume Actions */}
            <VolumeControl
              volume={volume}
              muted={muted}
              onChangeVolume={changeVolume}
              onToggleMute={toggleMute}
            />
          </div>

        </div>
      </div>
    </>
  );
}
