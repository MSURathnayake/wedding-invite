import { useLang } from '../i18n';

const SHORT = { en: 'EN', si: 'සිං', ta: 'தமிழ்' };
const LABELS = {
  en: 'English',
  si: 'සිංහල',
  ta: 'தமிழ்',
  'en-si': 'English + සිංහල',
  'en-ta': 'English + தமிழ்',
};

// Hidden while only one language is enabled in src/config/wedding.js.
// Up to three single languages show as a small toggle ("EN | සිං"); anything else as a drop-down.
export default function LanguageSwitcher() {
  const { lang, setLang, languages } = useLang();
  if (languages.length < 2) return null;

  const simple = languages.length <= 3 && languages.every((code) => SHORT[code]);
  if (simple) {
    return (
      <div className="lang">
        <div className="lang__toggle" role="group" aria-label="Language">
          {languages.map((code) => (
            <button key={code} type="button" lang={code} aria-pressed={lang === code} title={LABELS[code]} onClick={() => setLang(code)}>
              {SHORT[code]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="lang">
      <label className="sr" htmlFor="lang-select">
        Language
      </label>
      <select id="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
        {languages.map((code) => (
          <option key={code} value={code}>
            {LABELS[code] || code}
          </option>
        ))}
      </select>
    </div>
  );
}
