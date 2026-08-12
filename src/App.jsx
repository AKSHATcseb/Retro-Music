import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import AmbientBackground from './components/AmbientBackground';
import PlayerControls from './components/PlayerControls';
import Clock from './components/Clock';
import { useAudioPlayer } from './hooks/useAudioPlayer';

export default function App() {
  const [entered, setEntered] = useState(false);
  const player = useAudioPlayer();

  // Handle entering space
  const handleEnter = () => {
    setEntered(true);
    // Explicit trigger of play to start track on first user gesture
    player.play();
  };

  // Keyboard Shortcuts listener (only active after entering the space)
  useEffect(() => {
    if (!entered) return;

    const handleKeyDown = (e) => {
      // Avoid intercepting shortcuts if user is somehow typing in an input element
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault(); // Stop page scrolling
          player.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          player.prev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          player.next();
          break;
        case 'ArrowUp':
          e.preventDefault();
          player.changeVolume(player.volume + 0.05);
          break;
        case 'ArrowDown':
          e.preventDefault();
          player.changeVolume(player.volume - 0.05);
          break;
        case 'KeyM':
          e.preventDefault();
          player.toggleMute();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [entered, player]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-retro-bg font-sans select-none">
      
      {/* Show Start/Overlay Screen if not entered */}
      {!entered ? (
        <StartScreen onEnter={handleEnter} />
      ) : (
        <div className="relative w-full h-full animate-fade-in">
          {/* Static Ambient Vector Art Background */}
          <AmbientBackground />

          {/* Minimal Real-World Clock */}
          <Clock />

          {/* Minimal Floating Player Controls */}
          <PlayerControls
            currentSong={player.currentSong}
            playing={player.playing}
            currentTime={player.currentTime}
            duration={player.duration}
            volume={player.volume}
            muted={player.muted}
            loading={player.loading}
            error={player.error}
            togglePlay={player.togglePlay}
            next={player.next}
            prev={player.prev}
            seek={player.seek}
            changeVolume={player.changeVolume}
            toggleMute={player.toggleMute}
          />
        </div>
      )}

    </main>
  );
}
