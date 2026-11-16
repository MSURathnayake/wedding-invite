import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import wedding from '../config/wedding';
import { strings } from './strings';
import { plain } from '../lib/text';
import { getTemplate } from '../config/templates';
import { activeTemplateId } from '../config/activeTemplate';

export { plain };

// Language codes:
//   'en' | 'si' | 'ta'   one language only (the whole site, the card and the messages)
//   'en-si' | 'en-ta'    English with a second language under each line
function parts(lang) {
  const [primary, secondary] = String(lang).split('-');
  return { primary: primary || 'en', secondary: secondary || null };
}

// The template can ask for its own starting language (Kandyan starts in Sinhala).
const LANGUAGES = getTemplate(activeTemplateId).languages || wedding.languages;

function startingLanguage() {
  const wanted = getTemplate(activeTemplateId).defaultLanguage;
  return LANGUAGES.includes(wanted) ? wanted : LANGUAGES[0] || wedding.defaultLanguage;
}

const LangContext = createContext({
  lang: 'en',
  primary: 'en',
  secondary: null,
  setLang: () => {},
  languages: ['en'],
});

// {name}, {date}... can come from an object, or from a function of the language.
function fill(text, vars, locale) {
  const values = typeof vars === 'function' ? vars(locale) : vars;
  return values ? text.replace(/\{(\w+)\}/g, (_, key) => (values[key] ?? '')) : text;
}

function pick(key, locale, vars) {
  const entry = strings[key];
  const text = entry && entry[locale];
  return text ? fill(text, vars, locale) : '';
}

// Text in one language (English if missing). For messages and titles outside the page.
export function tx(key, vars, locale = 'en') {
  return pick(key, locale, vars) || pick(key, 'en', vars) || key;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      const saved = localStorage.getItem('wedding-lang');
      if (saved && LANGUAGES.includes(saved)) return saved;
    } catch {
      /* storage unavailable */
    }
    return startingLanguage();
  });

  const setLang = useCallback((next) => {
    setLangState(next);
    try {
      localStorage.setItem('wedding-lang', next);
    } catch {
      /* ignore */
    }
  }, []);

  const { primary, secondary } = parts(lang);

  // Lets the browser pick the right font and hyphenation, and screen readers the right voice.
  useEffect(() => {
    document.documentElement.lang = primary;
  }, [primary]);

  const value = useMemo(
    () => ({ lang, primary, secondary, setLang, languages: LANGUAGES }),
    [lang, primary, secondary, setLang]
  );
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

// <T k="rsvp.title" />  ->  the text in the chosen language (plus the second language underneath if any).
export function T({ k, vars }) {
  const { primary, secondary } = useLang();
  const main = pick(k, primary, vars) || pick(k, 'en', vars);
  const second = secondary ? pick(k, secondary, vars) : '';
  return (
    <>
      {main}
      {second ? (
        <span className="t-sub" lang={secondary}>
          {second}
        </span>
      ) : null}
    </>
  );
}

// For attributes such as placeholders: returns plain text.
export function useT() {
  const { primary, secondary } = useLang();
  return useCallback(
    (k, vars) => {
      const main = pick(k, primary, vars) || pick(k, 'en', vars);
      const second = secondary ? pick(k, secondary, vars) : '';
      return second ? `${main} / ${second}` : main;
    },
    [primary, secondary]
  );
}

const choose = (value, locale) => (value == null ? '' : typeof value === 'string' ? value : value[locale] || value.en || '');

// Text from src/config/wedding.js (a string, or { en, si, ta }) as a plain string in the chosen language.
export function useTxt() {
  const { primary } = useLang();
  return useCallback((value) => choose(value, primary), [primary]);
}

// Same, as a component (with the second language underneath if one is selected).
export function Txt({ v }) {
  const { primary, secondary } = useLang();
  if (v == null) return null;
  if (typeof v === 'string') return v;
  const second = secondary ? v[secondary] : '';
  return (
    <>
      {choose(v, primary)}
      {second ? (
        <span className="t-sub" lang={secondary}>
          {second}
        </span>
      ) : null}
    </>
  );
}
