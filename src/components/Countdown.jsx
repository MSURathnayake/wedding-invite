import { useEffect, useMemo, useState } from 'react';
import wedding from '../config/wedding';
import { T } from '../i18n';
import Section from './Section';

function remaining(target) {
  const ms = Math.max(0, target - Date.now());
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
    done: ms === 0,
  };
}

const UNITS = [
  ['days', 'countdown.days'],
  ['hours', 'countdown.hours'],
  ['minutes', 'countdown.minutes'],
  ['seconds', 'countdown.seconds'],
];

export default function Countdown() {
  const target = useMemo(() => new Date(wedding.date).getTime(), []);
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    const timer = setInterval(() => setLeft(remaining(target)), 1000);
    return () => clearInterval(timer);
  }, [target]);

  return (
    <Section id="countdown" tone="dark" titleKey="countdown.title" subKey="countdown.sub">
      {left.done ? (
        <p className="cd__done">
          <T k="countdown.done" />
        </p>
      ) : (
        <div className="cd" role="timer" aria-label="Time left until the wedding">
          {UNITS.map(([unit, labelKey]) => (
            <div className="cd__tile" key={unit}>
              <span className="cd__num">{String(left[unit]).padStart(2, '0')}</span>
              <span className="cd__label">
                <T k={labelKey} />
              </span>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
