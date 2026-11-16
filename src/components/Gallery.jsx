import { useState } from 'react';
import wedding from '../config/wedding';
import Section from './Section';
import Lightbox from './Lightbox';

export default function Gallery() {
  const [open, setOpen] = useState(null);
  const items = wedding.preshoot;

  return (
    <Section id="gallery" titleKey="gallery.title" subKey="gallery.sub">
      <div className="masonry">
        {items.map((photo, i) => (
          <button
            type="button"
            key={i}
            className="masonry__item"
            onClick={() => setOpen(i)}
            aria-label={`Open photo ${i + 1} of ${items.length}`}
          >
            <img src={photo.src} alt={photo.alt || `Pre-shoot photo ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </Section>
  );
}
