import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import wedding from '../config/wedding';

const SoundOn = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5z" />
    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    <path d="M18.5 5.5a9 9 0 0 1 0 13" />
  </svg>
);

const SoundOff = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M11 5 6 9H3v6h3l5 4V5z" />
    <path d="m16 9 5 6" />
    <path d="m21 9-5 6" />
  </svg>
);

// Background music. The parent calls ref.current.start() from the envelope tap
// (browsers only allow sound after a tap or click).
const MusicPlayer = forwardRef(function MusicPlayer({ show }, ref) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(Boolean(wedding.music && wedding.music.src));

  useImperativeHandle(
    ref,
    () => ({
      start() {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.6;
        audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
      },
    }),
    []
  );

  if (!available) return null;

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={wedding.music.src} loop preload="auto" onError={() => setAvailable(false)} />
      <button
        type="button"
        className={`music ${show ? 'music--show' : ''} ${playing ? 'is-on' : ''}`}
        onClick={toggle}
        aria-label={playing ? 'Mute the music' : 'Play the music'}
        aria-pressed={playing}
      >
        {playing ? <SoundOn /> : <SoundOff />}
      </button>
    </>
  );
});

export default MusicPlayer;
