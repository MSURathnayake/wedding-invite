// Config text can be a plain string or { en, si, ta }. `plain` returns the English text.
export const plain = (v) => (typeof v === 'string' ? v : (v && v.en) || '');
