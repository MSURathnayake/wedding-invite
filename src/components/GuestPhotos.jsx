import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { T, useT } from '../i18n';
import Section from './Section';
import Lightbox from './Lightbox';
import { fetchPhotos, uploadPhoto } from '../lib/api';
import { compressImage } from '../lib/imageCompress';

const MAX_BATCH = 5;

export default function GuestPhotos() {
  const tt = useT();
  const inputRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [uploader, setUploader] = useState('');
  const [queue, setQueue] = useState([]); // { id, name, status: pending | uploading | done | error }
  const [needsApproval, setNeedsApproval] = useState(false);
  const [open, setOpen] = useState(null);

  const load = useCallback(async () => {
    try {
      setPhotos(await fetchPhotos());
    } catch (err) {
      console.warn('Could not load photos', err);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 45000); // pick up photos added by other guests
    return () => clearInterval(timer);
  }, [load]);

  const updateItem = (id, status) =>
    setQueue((q) => q.map((item) => (item.id === id ? { ...item, status } : item)));

  async function onFiles(e) {
    const files = Array.from(e.target.files || [])
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, MAX_BATCH);
    e.target.value = '';
    if (!files.length) return;

    const stamp = Date.now();
    const items = files.map((file, i) => ({ id: `${stamp}-${i}`, name: file.name, status: 'pending' }));
    setQueue(items);
    setNeedsApproval(false);

    for (let i = 0; i < files.length; i += 1) {
      const id = items[i].id;
      updateItem(id, 'uploading');
      try {
        const image = await compressImage(files[i]);
        const res = await uploadPhoto({
          uploader: uploader.trim() || 'Guest',
          mimeType: image.mimeType,
          base64: image.base64,
          dataUrl: image.dataUrl,
          filename: files[i].name,
        });
        if (res.approved === false) setNeedsApproval(true);
        updateItem(id, 'done');
      } catch (err) {
        console.error(err);
        updateItem(id, 'error');
      }
    }
    load();
  }

  const lightboxItems = useMemo(
    () =>
      photos.map((photo) => ({
        src: photo.url,
        full: photo.full || photo.url,
        alt: `Photo shared by ${photo.uploader || 'a guest'}`,
        caption: photo.uploader ? `Shared by ${photo.uploader}` : '',
      })),
    [photos]
  );

  const busy = queue.some((item) => item.status === 'pending' || item.status === 'uploading');

  return (
    <Section id="moments" tone="alt" titleKey="moments.title" subKey="moments.sub">
      <div className="upload">
        <label className="field field--center">
          <span>
            <T k="moments.name" />
          </span>
          <input type="text" maxLength={60} autoComplete="name" value={uploader} onChange={(e) => setUploader(e.target.value)} placeholder={tt('moments.name')} />
        </label>

        <input ref={inputRef} className="sr" id="photo-input" type="file" accept="image/*" multiple onChange={onFiles} disabled={busy} />
        <button type="button" className="btn" onClick={() => inputRef.current && inputRef.current.click()} disabled={busy}>
          <T k="moments.choose" />
        </button>
        <p className="field__hint">
          <T k="moments.hint" />
        </p>

        {queue.length > 0 && (
          <ul className="upload__list" aria-live="polite">
            {queue.map((item) => (
              <li key={item.id} className={`upload__item upload__item--${item.status}`}>
                <span className="upload__name">{item.name}</span>
                <span className="upload__state">
                  {item.status === 'done' && <T k="moments.done" />}
                  {item.status === 'error' && <T k="moments.failed" />}
                  {(item.status === 'uploading' || item.status === 'pending') && <T k="moments.uploading" />}
                </span>
              </li>
            ))}
          </ul>
        )}
        {needsApproval && (
          <p className="note note--ok">
            <T k="moments.pending" />
          </p>
        )}
      </div>

      {photos.length === 0 ? (
        <p className="note">
          <T k="moments.empty" />
        </p>
      ) : (
        <div className="moments">
          {photos.map((photo, i) => (
            <button type="button" key={`${photo.url}-${i}`} className="moments__item" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1} of ${photos.length}`}>
              <img src={photo.url} alt={`Photo shared by ${photo.uploader || 'a guest'}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {open !== null && (
        <Lightbox items={lightboxItems} index={Math.min(open, lightboxItems.length - 1)} onClose={() => setOpen(null)} onIndex={setOpen} />
      )}
    </Section>
  );
}
