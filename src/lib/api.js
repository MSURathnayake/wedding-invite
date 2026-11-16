// Talks to the Google Apps Script web app (apps-script/Code.gs).
// If VITE_SCRIPT_URL is empty the site runs in PREVIEW MODE: wishes are kept in this
// browser only, photos live in memory, and nothing is sent anywhere.

const SCRIPT_URL = import.meta.env.VITE_SCRIPT_URL || '';
export const isDemo = !SCRIPT_URL;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: ignore */
    }
  },
};

const DEMO_WISHES = [
  { name: 'Nimali', message: 'Wishing you a lifetime of love, laughter and happy mornings together!', ts: 3 },
  { name: 'Uncle Sarath', message: 'May every day be as beautiful as this one. Congratulations!', ts: 2 },
  { name: 'Kasun & Ishara', message: 'So happy for you both. Cannot wait to dance the night away!', ts: 1 },
];
const demoPhotos = [];

// Apps Script answers cross-origin requests when the body is sent as text/plain
// (this avoids the browser's CORS pre-flight request).
async function post(payload) {
  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Request failed');
  return data;
}

async function get(params) {
  const res = await fetch(`${SCRIPT_URL}?${new URLSearchParams(params).toString()}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function submitRsvp(payload) {
  if (isDemo) {
    await sleep(700);
    return { ok: true, emailed: false, demo: true };
  }
  return post({ action: 'rsvp', ...payload });
}

export async function submitWish(payload) {
  if (isDemo) {
    await sleep(400);
    const wish = { name: payload.name, message: payload.message, ts: Date.now() };
    store.set('demo_wishes', [wish, ...store.get('demo_wishes', DEMO_WISHES)]);
    return { ok: true, approved: true, demo: true };
  }
  return post({ action: 'wish', ...payload });
}

export async function fetchWishes() {
  if (isDemo) return store.get('demo_wishes', DEMO_WISHES);
  const data = await get({ action: 'wishes' });
  return data.wishes || [];
}

export async function uploadPhoto({ uploader, mimeType, base64, dataUrl, filename }) {
  if (isDemo) {
    await sleep(500);
    demoPhotos.unshift({ url: dataUrl, full: dataUrl, uploader });
    return { ok: true, approved: true, demo: true };
  }
  return post({ action: 'photo', uploader, mimeType, data: base64, filename });
}

export async function fetchPhotos() {
  if (isDemo) return [...demoPhotos];
  const data = await get({ action: 'photos' });
  return data.photos || [];
}
