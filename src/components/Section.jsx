import { useEffect, useRef, useState } from 'react';
import { T } from '../i18n';
import { Divider } from './Ornament';

// Fades a block in the first time it scrolls into view.
export function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, shown];
}

export default function Section({ id, titleKey, subKey, tone = 'light', children }) {
  const [ref, shown] = useReveal();
  return (
    <section id={id} className={`section section--${tone}`}>
      <div ref={ref} className={`section__inner reveal ${shown ? 'in' : ''}`}>
        {titleKey && (
          <header className="section__head">
            <h2 className="section__title">
              <T k={titleKey} />
            </h2>
            <Divider className="section__divider" width={200} />
            {subKey && (
              <p className="section__sub">
                <T k={subKey} />
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
