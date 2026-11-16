import { useMemo } from 'react';
import wedding from '../config/wedding';
import { T, Txt } from '../i18n';
import { Corner, Band, Finial } from './Ornament';
import { Dt } from './DateText';

// With `heroImage` set in src/config/wedding.js the first screen is that picture, with the
// names on a frosted plate at the top and the date and place on a plate at the bottom.
// Without it the hero is a plain decorated page.
export default function Hero() {
  const { couple, venue, date, heroImage, heroAlt } = wedding;
  const art = Boolean(heroImage);

  // Falling petals: positions are fixed once so they do not jump on re-render.
  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        left: (i * 37) % 100,
        delay: (i * 1.3) % 9,
        duration: 9 + (i % 5) * 2,
        size: 10 + (i % 4) * 5,
      })),
    []
  );

  return (
    <section className={`hero${art ? ' hero--art' : ''}`} id="top">
      {art && (
        <>
          <div className="hero__backdrop" aria-hidden="true" />
          <div className="hero__art" role="img" aria-label={heroAlt || ''} />
        </>
      )}
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.3,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <Corner className="corner corner--tl" size={110} rotate={0} />
      <Corner className="corner corner--tr" size={110} rotate={90} />
      <Corner className="corner corner--br" size={110} rotate={180} />
      <Corner className="corner corner--bl" size={110} rotate={270} />
      <Band className="hero__band hero__band--top" />
      <Band className="hero__band hero__band--bottom" />

      <div className="hero__content">
        <div className="hero__top">
          <Finial className="hero__finial" />
          <p className="hero__eyebrow">
            <T k="hero.together" />
          </p>
          <h1 className="hero__names">
            <span>
              <Txt v={couple.first} />
            </span>
            <span className="hero__amp">&amp;</span>
            <span>
              <Txt v={couple.second} />
            </span>
          </h1>
          <p className="hero__invite">
            <T k="hero.invite" />
          </p>
        </div>
        <div className="hero__bottom">
          <p className="hero__date">
            <Dt iso={date} />
          </p>
          <p className="hero__venue">
            <Txt v={venue.name} />
          </p>
          <a className="scroll-cue" href="#letter" aria-label="Scroll down">
            ↓
          </a>
        </div>
      </div>
    </section>
  );
}
