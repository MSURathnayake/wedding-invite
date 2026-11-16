import wedding from '../config/wedding';
import { useLang } from '../i18n';

const choose = (value, locale) => (typeof value === 'string' ? value : (value && (value[locale] || value.en)) || '');

// "Amaya & Dilan" on one line (in the chosen language), with the second language on the line below.
export default function Names() {
  const { primary, secondary } = useLang();
  const { first, second } = wedding.couple;
  const a = secondary && typeof first !== 'string' ? first[secondary] : '';
  const b = secondary && typeof second !== 'string' ? second[secondary] : '';
  return (
    <>
      {choose(first, primary)} &amp; {choose(second, primary)}
      {a && b ? (
        <span className="t-sub" lang={secondary}>
          {a} &amp; {b}
        </span>
      ) : null}
    </>
  );
}
