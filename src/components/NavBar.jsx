import { T } from '../i18n';

const ITEMS = [
  ['top', 'nav.home'],
  ['details', 'nav.details'],
  ['flow', 'nav.events'],
  ['gallery', 'nav.album'],
  ['rsvp', 'nav.rsvp'],
];

// Quick links along the bottom of the screen. Shown once the envelope has been opened.
export default function NavBar({ show }) {
  return (
    <nav className={`nav${show ? ' nav--show' : ''}`} aria-label="Sections">
      {ITEMS.map(([id, key]) => (
        <a key={id} href={`#${id}`}>
          <T k={key} />
        </a>
      ))}
    </nav>
  );
}
