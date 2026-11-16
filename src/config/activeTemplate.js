import wedding from './wedding';
import { templates } from './templates';

// The template in use: ?template=... in the address (handy for previews),
// otherwise `template` from src/config/wedding.js.
function fromAddress() {
  try {
    return new URLSearchParams(window.location.search).get('template');
  } catch {
    return null;
  }
}

const wanted = fromAddress();

export const activeTemplateId = templates[wanted]
  ? wanted
  : templates[wedding.template]
    ? wedding.template
    : 'western';
