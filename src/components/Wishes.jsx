import { useCallback, useEffect, useState } from 'react';
import { T, useT } from '../i18n';
import Section from './Section';
import { fetchWishes, submitWish } from '../lib/api';

const PAGE = 9;

export default function Wishes() {
  const tt = useT();
  const [wishes, setWishes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState({ name: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | pending | error
  const [visible, setVisible] = useState(PAGE);

  const load = useCallback(async () => {
    try {
      setWishes(await fetchWishes());
    } catch (err) {
      console.warn('Could not load wishes', err);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    load();
    const timer = setInterval(load, 60000); // pick up new wishes from other guests
    return () => clearInterval(timer);
  }, [load]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    const found = {};
    if (form.name.trim().length < 2) found.name = 'err.wishName';
    if (form.message.trim().length < 2) found.message = 'err.wishMsg';
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const wish = { name: form.name.trim(), message: form.message.trim() };
      const res = await submitWish({ ...wish, website: form.website });
      if (res.approved) setWishes((list) => [{ ...wish, ts: Date.now() }, ...list]);
      setStatus(res.approved ? 'sent' : 'pending');
      setForm((f) => ({ ...f, message: '' }));
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  return (
    <Section id="wishes" titleKey="wishes.title" subKey="wishes.sub">
      <form className="form form--narrow" onSubmit={onSubmit} noValidate>
        <label className="field">
          <span>
            <T k="wishes.name" />
          </span>
          <input type="text" maxLength={60} autoComplete="name" value={form.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} />
          {errors.name && (
            <em className="field__error">
              <T k={errors.name} />
            </em>
          )}
        </label>
        <label className="field">
          <span>
            <T k="wishes.message" />
          </span>
          <textarea
            rows={3}
            maxLength={280}
            value={form.message}
            onChange={set('message')}
            placeholder={tt('wishes.messagePh')}
            aria-invalid={Boolean(errors.message)}
          />
          {errors.message && (
            <em className="field__error">
              <T k={errors.message} />
            </em>
          )}
        </label>
        <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} />

        {status === 'sent' && (
          <p className="note note--ok" role="status">
            <T k="wishes.sent" />
          </p>
        )}
        {status === 'pending' && (
          <p className="note note--ok" role="status">
            <T k="wishes.pending" />
          </p>
        )}
        {status === 'error' && (
          <p className="field__error" role="alert">
            <T k="wishes.error" />
          </p>
        )}

        <button type="submit" className="btn btn--wide" disabled={status === 'sending'}>
          {status === 'sending' ? <T k="wishes.sending" /> : <T k="wishes.send" />}
        </button>
      </form>

      {loaded && wishes.length === 0 && (
        <p className="note">
          <T k="wishes.empty" />
        </p>
      )}

      {wishes.length > 0 && (
        <div className="wishes">
          {wishes.slice(0, visible).map((wish, i) => (
            <figure className="wish" key={`${wish.ts}-${i}`} style={{ '--tilt': `${(((i * 7) % 5) - 2) * 0.5}deg` }}>
              <blockquote>{wish.message}</blockquote>
              <figcaption>{wish.name}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {wishes.length > visible && (
        <div className="center">
          <button type="button" className="btn btn--ghost" onClick={() => setVisible((v) => v + PAGE)}>
            <T k="wishes.more" />
          </button>
        </div>
      )}
    </Section>
  );
}
