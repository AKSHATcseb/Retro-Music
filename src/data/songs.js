/**
 * Curated list of tracks for Retro Music.
 * 
 * Default URLs point to SoundHelix testing streams, which support 
 * HTTP Range requests and seeking natively.
 * 
 * To host your own music:
 * 1. Upload your MP3 files to your Cloudflare R2 bucket.
 * 2. Configure CORS in Cloudflare R2 (see implementation_plan.md).
 * 3. Replace the `url` values below with your R2 public URLs or custom domain:
 *    e.g., "https://music.yourdomain.com/songs/track-01.mp3"
 */
export const songs = [
  {
    id: "retro-01",
    title: "Late Night Drive",
    artist: "Lofi Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork: null
  },
  {
    id: "retro-02",
    title: "Neon Horizon",
    artist: "Synth Waves",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork: null
  },
  {
    id: "retro-03",
    title: "Quiet Coffee",
    artist: "Barista Beats",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork: null
  },
  {
    id: "retro-04",
    title: "Midnight Rain",
    artist: "Cozy Ambient",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    artwork: null
  }
];
