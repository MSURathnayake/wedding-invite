import { useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import wedding from '../config/wedding';
import { T, useT, useTxt, useLang, tx } from '../i18n';
import Section from './Section';
import InviteCard from './InviteCard';
import { submitRsvp, isDemo } from '../lib/api';
import {
  captureCard,
  canvasToPdf,
  pdfToBase64,
  pdfToFile,
  downloadCanvasPng,
  safeFileName,
} from '../lib/inviteCard';
import { getSiteUrl, toIntlPhone } from '../lib/format';
import { dateString } from './DateText';

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function Stepper({ id, label, hint, value, min, max, onChange }) {
  return (
    <div className="stepper-field">
      <div>
        <span id={`${id}-label`} className="stepper-field__label">
          {label}
        </span>
        {hint && <span className="field__hint">{hint}</span>}
      </div>
      <div className="stepper" role="group" aria-labelledby={`${id}-label`}>
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="Decrease">
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="Increase">
          +
        </button>
      </div>
    </div>
  );
}

const emptyForm = (name = '') => ({
  name,
  phone: '',
  email: '',
  attending: 'Yes',
  adults: 1,
  children: 0,
  message: '',
  website: '', // honeypot: real guests never see or fill this
});

export default function Rsvp() {
  const tt = useT();
  const { primary } = useLang();
  const txt = useTxt();
  // A personal link such as  https://your-site/?to=Nimali  pre-fills the name.
  const nameFromLink = useMemo(
    () => (new URLSearchParams(window.location.search).get('to') || '').slice(0, 60),
    []
  );

  const [form, setForm] = useState(() => emptyForm(nameFromLink));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [result, setResult] = useState(null);
  const [cardGuest, setCardGuest] = useState(null);
  const cardRef = useRef(null);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setNum = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  function validate() {
    const found = {};
    if (form.name.trim().length < 2) found.name = 'err.name';
    if (toIntlPhone(form.phone).length < 9) found.phone = 'err.phone';
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) found.email = 'err.email';
    return found;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    const attending = form.attending === 'Yes';
    const guest = { name: form.name.trim(), adults: attending ? form.adults : 0, children: attending ? form.children : 0 };

    try {
      let canvas = null;
      let pdf = null;
      let pdfBase64 = '';
      let cardFailed = false;

      if (attending) {
        // Draw the card off-screen, then turn it into a picture and a PDF.
        flushSync(() => setCardGuest(guest));
        try {
          canvas = await captureCard(cardRef.current);
          pdf = canvasToPdf(canvas);
          pdfBase64 = pdfToBase64(pdf);
        } catch (err) {
          console.warn('Could not create the invitation card', err);
          cardFailed = true;
        }
      }

      const res = await submitRsvp({
        name: guest.name,
        phone: form.phone.trim(),
        email: form.email.trim(),
        attending: attending ? 'Yes' : 'No',
        adults: guest.adults,
        children: guest.children,
        message: form.message.trim(),
        website: form.website,
        lang: primary,
        pdf: form.email.trim() ? pdfBase64 : '', // only needed for the email attachment
      });

      const fileName = `Invitation-${safeFileName(guest.name)}`;
      const file = pdf ? pdfToFile(pdf, `${fileName}.pdf`) : null;
      setResult({
        ...res,
        attending,
        cardFailed,
        canvas,
        pdf,
        file,
        fileName,
        previewUrl: canvas ? canvas.toDataURL('image/jpeg', 0.85) : '',
        canShare: Boolean(file && navigator.canShare && navigator.canShare({ files: [file] })),
      });
      setStatus('done');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  function reset() {
    setForm(emptyForm(nameFromLink));
    setErrors({});
    setResult(null);
    setCardGuest(null);
    setStatus('idle');
  }

  const first = form.name.trim().split(/\s+/)[0] || '';
  const siteLink = `${getSiteUrl()}?to=${encodeURIComponent(form.name.trim())}`;
  const names = `${txt(wedding.couple.first)} & ${txt(wedding.couple.second)}`;
  const waText =
    `${tx('wa.line', { names }, primary)}\n` +
    `${dateString(wedding.date, 'long', primary)}\n${txt(wedding.venue.name)}\n${siteLink}`;
  const waUrl = `https://wa.me/${toIntlPhone(form.phone)}?text=${encodeURIComponent(waText)}`;

  async function shareFile() {
    try {
      await navigator.share({ files: [result.file], title: tx('share.title', null, primary), text: waText });
    } catch {
      /* the guest closed the share sheet */
    }
  }

  return (
    <Section id="rsvp" tone="alt" titleKey="rsvp.title" subKey="rsvp.sub">
      {status === 'done' && result ? (
        <div className="thanks">
          <h3 className="thanks__title">
            <T k="thanks.title" vars={{ name: first }} />
          </h3>
          <p>{result.attending ? <T k="thanks.yes" /> : <T k="thanks.no" />}</p>

          {result.previewUrl && <img className="thanks__card" src={result.previewUrl} alt="Your personalised invitation" />}
          {result.cardFailed && (
            <p className="note">
              <T k="thanks.cardFailed" />
            </p>
          )}
          {result.attending && form.email.trim() && !result.demo && (
            <p className="note">
              {result.emailed ? <T k="thanks.emailSent" vars={{ email: form.email.trim() }} /> : <T k="thanks.emailFailed" />}
            </p>
          )}
          {result.demo && (
            <p className="note note--demo">
              <T k="thanks.demo" />
            </p>
          )}

          {result.attending && (
            <div className="btn-row">
              {result.pdf && (
                <button type="button" className="btn" onClick={() => result.pdf.save(`${result.fileName}.pdf`)}>
                  <T k="thanks.downloadPdf" />
                </button>
              )}
              {result.canvas && (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => downloadCanvasPng(result.canvas, `${result.fileName}.png`)}
                >
                  <T k="thanks.savePng" />
                </button>
              )}
              <a className="btn btn--wa" href={waUrl} target="_blank" rel="noreferrer">
                <T k="thanks.whatsapp" />
              </a>
              {result.canShare && (
                <button type="button" className="btn btn--ghost" onClick={shareFile}>
                  <T k="thanks.share" />
                </button>
              )}
            </div>
          )}
          <button type="button" className="link link--btn" onClick={reset}>
            <T k="thanks.another" />
          </button>
        </div>
      ) : (
        <form className="form" onSubmit={onSubmit} noValidate>
          <label className="field">
            <span>
              <T k="rsvp.name" />
            </span>
            <input
              type="text"
              autoComplete="name"
              maxLength={60}
              value={form.name}
              onChange={set('name')}
              placeholder={tt('rsvp.namePh')}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && (
              <em className="field__error">
                <T k={errors.name} />
              </em>
            )}
          </label>

          <label className="field">
            <span>
              <T k="rsvp.phone" />
            </span>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={30}
              value={form.phone}
              onChange={set('phone')}
              placeholder="07X XXX XXXX"
              aria-invalid={Boolean(errors.phone)}
            />
            <small className="field__hint">
              <T k="rsvp.phoneHint" />
            </small>
            {errors.phone && (
              <em className="field__error">
                <T k={errors.phone} />
              </em>
            )}
          </label>

          <label className="field">
            <span>
              <T k="rsvp.email" />
            </span>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={120}
              value={form.email}
              onChange={set('email')}
              placeholder="name@example.com"
              aria-invalid={Boolean(errors.email)}
            />
            <small className="field__hint">
              <T k="rsvp.emailHint" />
            </small>
            {errors.email && (
              <em className="field__error">
                <T k={errors.email} />
              </em>
            )}
          </label>

          <fieldset className="choice">
            <legend>
              <T k="rsvp.attending" />
            </legend>
            {['Yes', 'No'].map((value) => (
              <label key={value} className={`choice__opt ${form.attending === value ? 'is-on' : ''}`}>
                <input type="radio" name="attending" value={value} checked={form.attending === value} onChange={set('attending')} />
                <span>
                  <T k={value === 'Yes' ? 'rsvp.yes' : 'rsvp.no'} />
                </span>
              </label>
            ))}
          </fieldset>

          {form.attending === 'Yes' && (
            <div className="guests">
              <Stepper
                id="adults"
                label={<T k="rsvp.adults" />}
                hint={<T k="rsvp.adultsHint" />}
                value={form.adults}
                min={1}
                max={wedding.maxAdults}
                onChange={setNum('adults')}
              />
              <Stepper
                id="children"
                label={<T k="rsvp.children" />}
                hint={<T k="rsvp.childrenHint" />}
                value={form.children}
                min={0}
                max={wedding.maxChildren}
                onChange={setNum('children')}
              />
            </div>
          )}

          <label className="field">
            <span>
              <T k="rsvp.message" />
            </span>
            <textarea rows={3} maxLength={500} value={form.message} onChange={set('message')} placeholder={tt('rsvp.messagePh')} />
          </label>

          <input
            className="hp"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.website}
            onChange={set('website')}
          />

          {status === 'error' && (
            <p className="field__error" role="alert">
              <T k="rsvp.error" />
            </p>
          )}

          <button type="submit" className="btn btn--wide" disabled={status === 'sending'}>
            {status === 'sending' ? <T k="rsvp.sending" /> : <T k="rsvp.submit" />}
          </button>
        </form>
      )}

      {/* Off-screen copy of the card that gets turned into the PDF / image. */}
      {cardGuest && (
        <div className="capture" id="invite-capture" aria-hidden="true">
          <InviteCard ref={cardRef} guest={cardGuest} />
        </div>
      )}
    </Section>
  );
}
