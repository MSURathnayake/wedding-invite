// Templates (looks). Each template has:
//   - a CSS theme in src/themes/<id>.css  (colours + fonts + decoration, keyed by [data-template='<id>'])
//   - ornaments in src/components/Ornament.jsx (corners, dividers, border bands, mandala)
//   - a list of sections, in the order they appear on the page
//   - an optional starting language ('en', 'si', 'ta', 'en-si', 'en-ta')
//
// Switch template: set `template` in src/config/wedding.js,
// or preview another one by adding ?template=western to the address.
//
// Tamil shares the Kandyan layout and ornaments; src/themes/tamil.css turns it dark red and gold.
// A template can list its own `languages`.
// Section ids: hero, letter, details, countdown, flow, gallery, rsvp, wishes, moments, contact.

const ALL_SECTIONS = [
  'hero',
  'letter',
  'details',
  'countdown',
  'flow',
  'gallery',
  'rsvp',
  'wishes',
  'moments',
  'contact',
];

export const templates = {
  western: {
    id: 'western',
    label: 'Western Sri Lankan',
    defaultLanguage: 'en',
    sections: ALL_SECTIONS,
  },
  kandyan: {
    id: 'kandyan',
    label: 'Traditional Kandyan',
    defaultLanguage: 'si',
    introFilm: true,
    sections: ALL_SECTIONS,
  },
  tamil: {
    id: 'tamil',
    label: 'Tamil (dark red and gold)',
    defaultLanguage: 'ta',
    // Languages offered by this template (falls back to `languages` in wedding.js).
    languages: ['en', 'ta'],
    introFilm: true,
    sections: ALL_SECTIONS,
  },
};

export function getTemplate(id) {
  return templates[id] || templates.western;
}
