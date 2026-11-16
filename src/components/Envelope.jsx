import { useEffect, useMemo, useState } from 'react';
import wedding from '../config/wedding';
import { T, useTxt } from '../i18n';
import { activeTemplateId } from '../config/activeTemplate';
import Names from './Names';
import { Mandala, Band, Divider } from './Ornament';
import { Dt } from './DateText';

const cover = activeTemplateId === 'kandyan' || activeTemplateId === 'tamil';

// The opening screen. Tapping the envelope is also what allows the browser to start the music.
export default function Envelope({ onOpen }) {
  const txt = useTxt();
  const initial = (v) => Array.from(txt(v))[0] || '';
  const [phase, setPhase] = useState('closed'); // closed -> opening -> gone
  const guest = useMemo(
    () => (new URLSearchParams(window.location.search).get('to') || '').slice(0, 60),
    []
  );

  useEffect(() => {
    document.body.classList.add('locked');
    return () => document.body.classList.remove('locked');
  }, []);

  useEffect(() => {
    if (phase !== 'opening') return undefined;
    const timer = setTimeout(() => setPhase('gone'), 3000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase === 'gone') document.body.classList.remove('locked');
  }, [phase]);

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    onOpen();
  };

  if (phase === 'gone') return null;

  return (
    <div
      className={`intro ${cover ? 'intro--cover' : ''} ${phase === 'opening' ? 'intro--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding invitation"
    >
      {cover ? (
        <div className="cover">
          <Mandala className="cover__mandala" size={300} />
          <div className="cover__body">
            <p className="cover__eyebrow">
              <T k="intro.wedding" />
            </p>
            <Divider className="cover__divider" width={170} />
            <h1 className="cover__names">
              <Names />
            </h1>
            <p className="cover__date">
              <Dt iso={wedding.date} kind="long" />
            </p>
            <button type="button" className="cover__open" onClick={open}>
              <T k="intro.open" />
            </button>
            {guest && (
              <p className="cover__dear">
                <span>
                  <T k="intro.dear" />
                </span>
                <strong>{guest}</strong>
              </p>
            )}
          </div>
          <Band className="cover__band" />
        </div>
      ) : (
      <button type="button" className="envelope" onClick={open} aria-label="Open the invitation">
        <span className="env-back" />
        <span className="env-card">
          <span className="env-card__eyebrow">
            <T k="intro.eyebrow" />
          </span>
          <span className="env-card__names">
            <Names />
          </span>
          {guest && (
            <span className="env-card__for">
              <T k="intro.for" vars={{ name: guest }} />
            </span>
          )}
        </span>
        <span className="env-front" />
        <span className="env-flap" />
        <span className="env-seal">
          {initial(wedding.couple.first)}&amp;{initial(wedding.couple.second)}
        </span>
      </button>
      )}
      {!cover && (
        <p className="intro__hint">
          <T k="intro.tap" />
        </p>
      )}
    </div>
  );
}
