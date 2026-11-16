import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { T } from '../i18n';

// Short film that plays full screen right after the invitation is opened, then fades into the site.
// It is downloaded quietly while the guest looks at the opening screen. If it cannot be loaded the
// site simply carries on without it. The parent calls ref.current.start() from the tap that opens
// the invitation (this returns false when there is no film to play).
const IntroFilm = forwardRef(function IntroFilm({ src, poster }, ref) {
  const video = useRef(null);
  const ready = useRef(false);
  const [state, setState] = useState('idle'); // idle -> playing -> ending -> gone

  const finish = () => {
    setState((current) => (current === 'playing' ? 'ending' : current));
    setTimeout(() => setState('gone'), 900);
  };

  useImperativeHandle(ref, () => ({
    start() {
      const el = video.current;
      if (!el || !ready.current) return false;
      el.currentTime = 0;
      el.muted = true;
      setState('playing');
      el.play().catch(() => finish());
      return true;
    },
  }));

  // Keep the page from scrolling behind the film.
  useEffect(() => {
    if (state !== 'playing') return undefined;
    document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, [state]);

  if (state === 'gone') return null;

  return (
    <div className={`film film--${state}`} aria-hidden={state === 'idle'}>
      <video
        ref={video}
        src={src}
        poster={poster}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => {
          ready.current = true;
        }}
        onError={() => {
          ready.current = false;
        }}
        onEnded={finish}
      />
      {state === 'playing' && (
        <button type="button" className="film__skip" onClick={finish}>
          <T k="intro.skip" /> ›
        </button>
      )}
    </div>
  );
});

export default IntroFilm;
