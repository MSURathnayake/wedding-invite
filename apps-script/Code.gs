/**
 * Wedding website backend (Google Apps Script, bound to your Google Sheet).
 *
 * Setup (details in README.md):
 *   1. Open your Google Sheet -> Extensions -> Apps Script, paste this file.
 *   2. Edit CONFIG below.
 *   3. Run `setup` once and approve the permissions (Sheets, Drive, Mail).
 *   4. Deploy -> New deployment -> Web app -> Execute as: Me, Who has access: Anyone.
 *   5. Copy the web app URL into VITE_SCRIPT_URL in the React project.
 *
 * After EVERY change to this file: Deploy -> Manage deployments -> Edit -> New version -> Deploy.
 */

const CONFIG = {
  // Show new wishes / photos on the website straight away.
  // Set to false to approve them first: change "Approved" to Yes in the sheet to publish one.
  AUTO_APPROVE_WISHES: true,
  AUTO_APPROVE_PHOTOS: true,

  // Used in the invitation email.
  COUPLE: 'Amaya & Dilan',
  EVENT_TEXT: 'Saturday, 20 March 2027 · 4:00 PM · The Grand Ballroom, Colombo',
  // Used when the guest filled the form in Sinhala.
  COUPLE_SI: 'අමායා සහ දිලාන්',
  EVENT_TEXT_SI: '2027 මාර්තු 20, සෙනසුරාදා · ප.ව. 4.00 · ද ග්‍රෑන්ඩ් බෝල්රූම්, කොළඹ',
  SITE_URL: 'https://your-wedding-site.netlify.app',
  FROM_NAME: 'Amaya & Dilan',

  // Drive folder that receives the guests' photos (created automatically).
  PHOTO_FOLDER_NAME: 'Wedding Guest Photos',

  MAX_PHOTO_BYTES: 5 * 1024 * 1024,
  MAX_PDF_BYTES: 3 * 1024 * 1024,
  MAX_EMAILS_PER_ADDRESS: 2,
  MAX_WISHES_RETURNED: 200,
  MAX_PHOTOS_RETURNED: 300,
};

const SHEETS = {
  RSVP: ['Timestamp', 'Name', 'Phone', 'Email', 'Attending', 'Adults', 'Children', 'Total guests', 'Message', 'Emailed'],
  Wishes: ['Timestamp', 'Name', 'Message', 'Approved'],
  Photos: ['Timestamp', 'Uploader', 'File ID', 'Link', 'Approved'],
};

/* ------------------------------------------------------------------ */
/* One-time setup                                                      */
/* ------------------------------------------------------------------ */

/** Run this once from the editor. It creates the tabs and asks for the permissions. */
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  Object.keys(SHEETS).forEach(function (name) {
    const headers = SHEETS[name];
    const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(headers);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    }
  });
  getPhotoFolder_();
  Logger.log('Emails you can still send today: ' + MailApp.getRemainingDailyQuota());
  Logger.log('Setup finished. Now deploy as a web app.');
}

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

function doGet(e) {
  try {
    const action = e && e.parameter ? e.parameter.action : '';
    if (action === 'wishes') return json_({ ok: true, wishes: cached_('wishes', 60, listWishes_) });
    if (action === 'photos') return json_({ ok: true, photos: cached_('photos', 60, listPhotos_) });
    return json_({ ok: true, status: 'The wedding backend is running.' });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    if (body.website) return json_({ ok: true }); // honeypot: bots fill this hidden field
    switch (body.action) {
      case 'rsvp':
        return json_(handleRsvp_(body));
      case 'wish':
        return json_(handleWish_(body));
      case 'photo':
        return json_(handlePhoto_(body));
      default:
        return json_({ ok: false, error: 'Unknown action' });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

/* ------------------------------------------------------------------ */
/* Handlers                                                            */
/* ------------------------------------------------------------------ */

function handleRsvp_(b) {
  const name = clean_(b.name, 80);
  const phone = String(b.phone || '').replace(/[^\d+\-\s()]/g, '').trim().slice(0, 30);
  const email = clean_(b.email, 120).toLowerCase();
  if (!name) throw new Error('Name is required');
  if (!phone) throw new Error('Phone number is required');
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Invalid email address');

  const attending = b.attending === 'Yes' ? 'Yes' : 'No';
  const adults = attending === 'Yes' ? clampInt_(b.adults, 1, 20) : 0;
  const children = attending === 'Yes' ? clampInt_(b.children, 0, 20) : 0;
  const message = clean_(b.message, 500);

  // Email the personalised invitation (PDF made in the guest's browser).
  let emailed = false;
  if (attending === 'Yes' && email && emailCount_(email) < CONFIG.MAX_EMAILS_PER_ADDRESS) {
    try {
      sendInvitationEmail_(email, name, adults, children, b.pdf, b.lang === 'si' ? 'si' : 'en');
      emailed = true;
    } catch (err) {
      console.error('Email failed: ' + err);
    }
  }

  appendRow_('RSVP', [
    new Date(),
    safeCell_(name),
    safeCell_(phone),
    safeCell_(email),
    attending,
    adults,
    children,
    adults + children,
    safeCell_(message),
    emailed ? 'Yes' : 'No',
  ]);
  return { ok: true, emailed: emailed };
}

function handleWish_(b) {
  const name = clean_(b.name, 60) || 'A friend';
  const message = clean_(b.message, 280);
  if (!message) throw new Error('Message is required');
  const approved = CONFIG.AUTO_APPROVE_WISHES ? 'Yes' : 'No';
  appendRow_('Wishes', [new Date(), safeCell_(name), safeCell_(message), approved]);
  CacheService.getScriptCache().remove('wishes');
  return { ok: true, approved: approved === 'Yes' };
}

function handlePhoto_(b) {
  const mime = String(b.mimeType || '');
  if (!/^image\/(jpeg|png|webp|gif)$/.test(mime)) throw new Error('Unsupported image type');
  const bytes = Utilities.base64Decode(String(b.data || ''));
  if (!bytes.length) throw new Error('Empty image');
  if (bytes.length > CONFIG.MAX_PHOTO_BYTES) throw new Error('Image is too large');

  const uploader = clean_(b.uploader, 60) || 'Guest';
  const ext = { 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif' }[mime] || 'jpg';
  const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyyMMdd-HHmmss');
  const fileName = stamp + '-' + slug_(uploader) + '.' + ext;

  const file = getPhotoFolder_().createFile(Utilities.newBlob(bytes, mime, fileName));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  const approved = CONFIG.AUTO_APPROVE_PHOTOS ? 'Yes' : 'No';
  appendRow_('Photos', [new Date(), safeCell_(uploader), file.getId(), file.getUrl(), approved]);
  CacheService.getScriptCache().remove('photos');
  return { ok: true, approved: approved === 'Yes' };
}

/* ------------------------------------------------------------------ */
/* Email                                                               */
/* ------------------------------------------------------------------ */

function sendInvitationEmail_(to, name, adults, children, pdfBase64, lang) {
  if (lang === 'si') {
    const partySi = [];
    if (adults) partySi.push('වැඩිහිටියන් ' + adults);
    if (children) partySi.push('ළමයින් ' + children);
    const htmlSi =
      '<div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#3b3430;line-height:1.7">' +
      '<h2 style="color:#8a6a3a;font-weight:normal">' + esc_(CONFIG.COUPLE_SI) + '</h2>' +
      '<p>ආදරණීය ' + esc_(name) + ',</p>' +
      '<p>ඔබේ පිළිතුරට ස්තූතියි. ' + esc_(partySi.join(' සහ ')) + ' සඳහා ස්ථානයක් වෙන් කර ඇත.</p>' +
      '<p><strong>' + esc_(CONFIG.EVENT_TEXT_SI) + '</strong></p>' +
      '<p>ඔබේ පෞද්ගලික ආරාධනා පත්‍රය අමුණා ඇත. අපගේ <a href="' + esc_(CONFIG.SITE_URL) + '">මංගල වෙබ් අඩවියටද</a> පිවිසිය හැක.</p>' +
      '<p>ආදරයෙන්,<br>' + esc_(CONFIG.COUPLE_SI) + '</p></div>';
    const optionsSi = {
      to: to,
      subject: CONFIG.COUPLE_SI + 'ගේ විවාහ මංගල්‍යයට ඔබේ ආරාධනාව',
      body: 'ආදරණීය ' + name + ', ' + CONFIG.EVENT_TEXT_SI + '. ' + CONFIG.SITE_URL,
      htmlBody: htmlSi,
      name: CONFIG.FROM_NAME,
    };
    if (pdfBase64) {
      const rawSi = String(pdfBase64).replace(/^data:application\/pdf;[^,]*base64,/, '');
      const bytesSi = Utilities.base64Decode(rawSi);
      if (bytesSi.length > 0 && bytesSi.length <= CONFIG.MAX_PDF_BYTES) {
        optionsSi.attachments = [Utilities.newBlob(bytesSi, 'application/pdf', 'Invitation-' + slug_(name) + '.pdf')];
      }
    }
    MailApp.sendEmail(optionsSi);
    return;
  }
  const party = [];
  if (adults) party.push(adults + (adults === 1 ? ' adult' : ' adults'));
  if (children) party.push(children + (children === 1 ? ' child' : ' children'));

  const html =
    '<div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#3b3430;line-height:1.6">' +
    '<h2 style="color:#8a6a3a;font-weight:normal">' + esc_(CONFIG.COUPLE) + '</h2>' +
    '<p>Dear ' + esc_(name) + ',</p>' +
    '<p>Thank you for your RSVP. We have saved a place for ' + esc_(party.join(' and ')) + '.</p>' +
    '<p><strong>' + esc_(CONFIG.EVENT_TEXT) + '</strong></p>' +
    '<p>Your personal invitation is attached. You can also visit our ' +
    '<a href="' + esc_(CONFIG.SITE_URL) + '">wedding website</a>.</p>' +
    '<p>With love,<br>' + esc_(CONFIG.COUPLE) + '</p></div>';

  const options = {
    to: to,
    subject: 'Your invitation to ' + CONFIG.COUPLE + "'s wedding",
    body: 'Dear ' + name + ', thank you for your RSVP. ' + CONFIG.EVENT_TEXT + '. ' + CONFIG.SITE_URL,
    htmlBody: html,
    name: CONFIG.FROM_NAME,
  };

  if (pdfBase64) {
    const raw = String(pdfBase64).replace(/^data:application\/pdf;[^,]*base64,/, '');
    const bytes = Utilities.base64Decode(raw);
    if (bytes.length > 0 && bytes.length <= CONFIG.MAX_PDF_BYTES) {
      options.attachments = [Utilities.newBlob(bytes, 'application/pdf', 'Invitation-' + slug_(name) + '.pdf')];
    }
  }
  MailApp.sendEmail(options);
}

function emailCount_(email) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP');
  if (!sheet || sheet.getLastRow() < 2) return 0;
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, SHEETS.RSVP.length).getValues();
  let count = 0;
  rows.forEach(function (row) {
    if (String(row[3]).toLowerCase() === email && row[9] === 'Yes') count += 1;
  });
  return count;
}

/* ------------------------------------------------------------------ */
/* Lists shown on the website                                          */
/* ------------------------------------------------------------------ */

function listWishes_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Wishes');
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  return rows
    .filter(function (row) { return row[3] === 'Yes'; })
    .reverse()
    .slice(0, CONFIG.MAX_WISHES_RETURNED)
    .map(function (row) {
      return { name: String(row[1]), message: String(row[2]), ts: new Date(row[0]).getTime() };
    });
}

function listPhotos_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Photos');
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, 5).getValues();
  return rows
    .filter(function (row) { return row[4] === 'Yes' && row[2]; })
    .reverse()
    .slice(0, CONFIG.MAX_PHOTOS_RETURNED)
    .map(function (row) {
      const id = String(row[2]);
      return {
        uploader: String(row[1]),
        url: 'https://drive.google.com/thumbnail?id=' + id + '&sz=w600',
        full: 'https://drive.google.com/thumbnail?id=' + id + '&sz=w1600',
      };
    });
}

/* ------------------------------------------------------------------ */
/* Optional: save the RSVP list as a PDF in your Drive                  */
/* (For Excel: in the sheet use File -> Download -> Microsoft Excel.)   */
/* ------------------------------------------------------------------ */

function exportRsvpToPdf() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('RSVP');
  const url =
    'https://docs.google.com/spreadsheets/d/' + ss.getId() + '/export?format=pdf&portrait=false&size=A4&fitw=true' +
    '&gid=' + sheet.getSheetId();
  const blob = UrlFetchApp.fetch(url, {
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() },
  }).getBlob().setName('RSVP-list.pdf');
  const file = DriveApp.createFile(blob);
  Logger.log('Saved: ' + file.getUrl());
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function appendRow_(sheetName, row) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) throw new Error('Run setup() first: the "' + sheetName + '" tab is missing.');
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
}

function getPhotoFolder_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty('PHOTO_FOLDER_ID');
  if (savedId) {
    try {
      return DriveApp.getFolderById(savedId);
    } catch (err) {
      /* folder was deleted: create a new one below */
    }
  }
  const folder = DriveApp.createFolder(CONFIG.PHOTO_FOLDER_NAME);
  props.setProperty('PHOTO_FOLDER_ID', folder.getId());
  return folder;
}

// Keeps the busiest requests (the wishes / photos lists) from hitting Apps Script limits
// when many guests open the site at the same moment.
function cached_(key, seconds, producer) {
  const cache = CacheService.getScriptCache();
  const hit = cache.get(key);
  if (hit) return JSON.parse(hit);
  const value = producer();
  const text = JSON.stringify(value);
  if (text.length < 90000) cache.put(key, text, seconds);
  return value;
}

function clean_(value, max) {
  return String(value == null ? '' : value).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
}

// Stops spreadsheet formulas typed by a guest (for example "=IMPORTXML(...)") from running.
function safeCell_(text) {
  const s = String(text);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function clampInt_(value, min, max) {
  const n = parseInt(value, 10);
  if (isNaN(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function slug_(text) {
  return String(text).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 30) || 'guest';
}

function esc_(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
