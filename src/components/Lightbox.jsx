import { useCallback, useEffect } from 'react';

// Full-screen photo viewer. items: [{ src, full?, alt?, caption? }]
export default function Lightbox({ items, index, onClose, onIndex }) {
  const count = items.length;
  const prev = useCallback(() => onIndex((index - 1 + count) % count), [index, count, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % count), [index, count, onIndex]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose, prev, next]);

  const item = items[index];
  if (!item) return null;

  const stop = (handler) => (e) => {
    e.stopPropagation();
    handler();
  };

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={onClose}>
      <button type="button" className="lightbox__btn lightbox__close" onClick={stop(onClose)} aria-label="Close">
        ×
      </button>
      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__prev" onClick={stop(prev)} aria-label="Previous photo">
          ‹
        </button>
      )}
      <img src={item.full || item.src} alt={item.alt || ''} onClick={(e) => e.stopPropagation()} />
      {count > 1 && (
        <button type="button" className="lightbox__btn lightbox__next" onClick={stop(next)} aria-label="Next photo">
          ›
        </button>
      )}
      {item.caption && <p className="lightbox__caption">{item.caption}</p>}
    </div>
  );
}
