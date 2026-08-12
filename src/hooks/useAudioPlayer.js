import { useState, useEffect, useRef } from 'react';
import { songs } from '../data/songs';

export function useAudioPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7); // Default to 70% volume
  const [muted, setMuted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const audioRef = useRef(null);
  const currentSong = songs[currentIndex];

  // Initialize audio object once
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Load initial source
    audio.src = currentSong.url;
    audio.volume = volume;
    audio.muted = muted;

    return () => {
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Sync track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = playing;
    setError(null);
    setLoading(true);
    audio.src = currentSong.url;
    
    // Maintain volume & mute state
    audio.volume = volume;
    audio.muted = muted;

    if (wasPlaying) {
      audio.play().catch(err => {
        console.error("Playback failed on track change:", err);
        setError("Playback failed. Click play to resume.");
        setPlaying(false);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }

    // Update Media Session API
    updateMediaSession();
  }, [currentIndex]);

  // Handle play/pause commands
  const play = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setError(null);
    setLoading(true);
    audio.play()
      .then(() => {
        setPlaying(true);
        setLoading(false);
      })
      .catch(err => {
        console.error("Playback failed:", err);
        setError("Audio play blocked or R2 file unavailable.");
        setPlaying(false);
        setLoading(false);
      });
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    if (playing) {
      pause();
    } else {
      play();
    }
  };

  // Next & Previous
  const next = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
  };

  // Seek
  const seek = (time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  // Sync Volume
  const changeVolume = (val) => {
    const audio = audioRef.current;
    if (!audio) return;
    const clampedVal = Math.max(0, Math.min(1, val));
    audio.volume = clampedVal;
    setVolume(clampedVal);
    if (clampedVal > 0 && muted) {
      audio.muted = false;
      setMuted(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !muted;
    audio.muted = nextMuted;
    setMuted(nextMuted);
  };

  // Update System Media Session
  const updateMediaSession = () => {
    if ('mediaSession' in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: 'Retro Space',
        artwork: [
          { src: '/retro_ambient_bg.jpg', sizes: '512x512', type: 'image/jpeg' }
        ]
      });

      // Media Session Handlers
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('previoustrack', prev);
      navigator.mediaSession.setActionHandler('nexttrack', next);
    }
  };

  // Listen for audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration);
    const onWaiting = () => setLoading(true);
    const onPlaying = () => {
      setLoading(false);
      setPlaying(true);
    };
    const onPause = () => setPlaying(false);
    const onEnded = () => next();
    
    const onError = (e) => {
      console.error("HTML5 Audio Error:", e);
      setError("Track unavailable. Auto-advancing in 3s...");
      setLoading(false);
      setPlaying(false);

      // Auto-advance to next song after 3 seconds on error
      const timer = setTimeout(() => {
        next();
      }, 3000);
      return () => clearTimeout(timer);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('durationchange', onDurationChange);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, [currentIndex]);

  // Sync volume state from external commands
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  return {
    currentSong,
    playing,
    currentTime,
    duration,
    volume,
    muted,
    loading,
    error,
    play,
    pause,
    togglePlay,
    next,
    prev,
    seek,
    changeVolume,
    toggleMute,
  };
}
