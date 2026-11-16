import wedding from '../config/wedding';
import { plain } from './text';

export function formatDate(iso, options, locale = 'en-GB') {
  return new Intl.DateTimeFormat(locale, { timeZone: wedding.timeZone, ...options }).format(new Date(iso));
}

export const longDate = (iso) =>
  formatDate(iso, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const timeText = (iso) =>
  formatDate(iso, { hour: 'numeric', minute: '2-digit', hour12: true }, 'en-US');

export function getSiteUrl() {
  return wedding.siteUrl || `${window.location.origin}${window.location.pathname}`;
}

// 077 123 4567 -> 94771234567, +94 77 123 4567 -> 94771234567
export function toIntlPhone(raw) {
  let digits = String(raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('00')) digits = digits.slice(2);
  else if (digits.startsWith('0')) digits = wedding.defaultCountryCode + digits.slice(1);
  return digits;
}

export function googleCalendarUrl() {
  const { couple, venue, date, durationHours } = wedding;
  const start = new Date(date);
  const end = new Date(start.getTime() + durationHours * 3600 * 1000);
  const stamp = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${plain(couple.first)} & ${plain(couple.second)}'s Wedding`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details: `Wedding of ${plain(couple.first)} & ${plain(couple.second)}`,
    location: `${plain(venue.name)}, ${plain(venue.address)}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
