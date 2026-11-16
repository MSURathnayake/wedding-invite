import wedding from '../config/wedding';
import { useLang } from '../i18n';
import { formatDate } from '../lib/format';

const FORMATS = {
  long: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  short: { day: 'numeric', month: 'long', year: 'numeric' },
  time: { hour: 'numeric', minute: '2-digit', hour12: true },
};

// Sinhala and Tamil are written out by hand so they look the same on every phone and browser
// (some browsers ship without that date data).
const SI_MONTHS = ['ජනවාරි', 'පෙබරවාරි', 'මාර්තු', 'අප්‍රේල්', 'මැයි', 'ජූනි', 'ජූලි', 'අගෝස්තු', 'සැප්තැම්බර්', 'ඔක්තෝබර්', 'නොවැම්බර්', 'දෙසැම්බර්'];
const SI_DAYS = ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'];
const TA_MONTHS = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
const TA_DAYS = ['ஞாயிற்றுக்கிழமை', 'திங்கட்கிழமை', 'செவ்வாய்க்கிழமை', 'புதன்கிழமை', 'வியாழக்கிழமை', 'வெள்ளிக்கிழமை', 'சனிக்கிழமை'];
const EN_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function parts(iso) {
  const found = new Intl.DateTimeFormat('en-US', {
    timeZone: wedding.timeZone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date(iso));
  return (type) => (found.find((p) => p.type === type) || {}).value;
}

function tamil(iso, kind) {
  const get = parts(iso);
  if (kind === 'time') {
    const hour = Number(get('hour')) % 24;
    const period = hour < 12 ? 'காலை' : hour < 15 ? 'மதியம்' : hour < 19 ? 'மாலை' : 'இரவு';
    return `${period} ${hour % 12 || 12}:${get('minute')}`;
  }
  const date = `${Number(get('day'))} ${TA_MONTHS[Number(get('month')) - 1]} ${get('year')}`;
  return kind === 'short' ? date : `${TA_DAYS[EN_DAYS.indexOf(get('weekday'))]}, ${date}`;
}

function sinhala(iso, kind) {
  const get = parts(iso);
  if (kind === 'time') {
    const hour = Number(get('hour')) % 24;
    return `${hour < 12 ? 'පෙ.ව.' : 'ප.ව.'} ${hour % 12 || 12}.${get('minute')}`;
  }
  const date = `${get('year')} ${SI_MONTHS[Number(get('month')) - 1]} ${Number(get('day'))}`;
  return kind === 'short' ? date : `${date}, ${SI_DAYS[EN_DAYS.indexOf(get('weekday'))]}`;
}

// A date in one language, or '' when this browser cannot write that language.
function localized(iso, kind, locale) {
  try {
    if (locale === 'si') return sinhala(iso, kind);
    if (locale === 'ta') return tamil(iso, kind);
    return formatDate(iso, FORMATS[kind], kind === 'time' ? 'en-US' : 'en-GB');
  } catch {
    return '';
  }
}

// kind: 'long' (Saturday, 20 March 2027) | 'short' (20 March 2027) | 'time' (4:00 PM)
export function dateString(iso, kind, locale = 'en') {
  return localized(iso, kind, locale) || localized(iso, kind, 'en');
}

// A date or time in the chosen language, with the second language underneath when one is selected.
export function Dt({ iso, kind = 'long' }) {
  const { primary, secondary } = useLang();
  const main = dateString(iso, kind, primary);
  const second = secondary ? localized(iso, kind, secondary) : '';
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
