# Wedding invitation website

React (Vite) front end + Google Apps Script back end + Google Sheets for the data.
Templates: **Traditional Kandyan** (gold, white and silver, lotus and vine border patterns, English + Sinhala) and
**Western Sri Lankan** (ivory and gold). A **Tamil** template can be added the same way (see section 7).

Switch template in `src/config/wedding.js` (`template: 'kandyan'` or `'western'`).
To preview the other one without changing anything, add `?template=western` (or `?template=kandyan`) to the address.

All couple, date and venue details in the project are **fake sample data**. Change them in `src/config/wedding.js`.

## What the site does

| Section | What it does |
| --- | --- |
| Envelope intro | Tap to open. The tap also starts the background music (browsers block music until a tap). |
| Details | Date, time, venue, map, dress code, "Add to calendar". |
| Countdown | Live days / hours / minutes / seconds. |
| Event flow | The day, hour by hour. |
| Gallery | Pre-shoot photos with a full-screen viewer. |
| RSVP | Name, phone / WhatsApp, optional email, attending yes/no, **adults and children**. |
| After RSVP | Personalised invitation card: **download PDF**, **save image**, **send to my WhatsApp**, **share** (phones), and an **automatic email with the PDF attached** when an email was given. |
| Wishes | Guests post wishes; they appear on the wall. |
| Share your moments | Guests upload photos (funny, random, family); they appear in a grid. |

## 1. Run it on your computer

```bash
npm install
npm run dev
```

Without a Google link the site runs in **preview mode**: the RSVP, wishes and photos work on screen, but nothing is
saved or sent anywhere. That is the easiest way to check the design first.

## 2. Change the details

* `src/config/wedding.js`: template, names, date (keep the `+05:30`), venue, map link, dress code, schedule, photos, music.
* `public/music/wedding.mp3`: your background music (see the note in that folder). If it is missing the music button is hidden.
* `public/photos/`: pre-shoot photos (`preshoot-1.jpg` … `preshoot-10.jpg` are in there now). Replace them with your own
  photos at about 1600 px on the long side, or change the list in `preshoot` in `wedding.js`.
* `src/i18n/strings.js`: all fixed text (headings, buttons).
* `src/themes/western.css`: colours and fonts.

Personal links: `https://your-site/?to=Nimali` shows "For Nimali" on the envelope and pre-fills the RSVP name.
Send each guest their own link on WhatsApp.

## 3. Connect Google Sheets (saves RSVPs, wishes and photos)

1. Create a new Google Sheet.
2. **Extensions → Apps Script**, delete the sample code and paste `apps-script/Code.gs`.
3. Edit `CONFIG` at the top (couple, event text, your site address, approve settings).
4. Pick the function **`setup`** in the toolbar and click **Run**. Approve the permissions (Sheets, Drive, Mail).
   It creates the tabs `RSVP`, `Wishes`, `Photos` and the Drive folder for guest photos.
5. **Deploy → New deployment → type: Web app**, *Execute as:* **Me**, *Who has access:* **Anyone**. Copy the web app URL.
6. In the React project copy `.env.example` to `.env` and paste the URL:

   ```
   VITE_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
   ```
7. Restart `npm run dev`. Submit a test RSVP, a wish and a photo, and check the sheet.

**Every time you edit `Code.gs`** you must publish a new version: *Deploy → Manage deployments → pencil icon → Version: New version → Deploy*.
Otherwise the live URL keeps running the old code.

### Excel or PDF of the guest list

* Excel: in the sheet, **File → Download → Microsoft Excel (.xlsx)**.
* PDF: run `exportRsvpToPdf` in the Apps Script editor; the PDF is saved in your Drive.
* Total headcount: in any empty cell use `=SUMIF(E:E,"Yes",H:H)` (attending guests, adults plus children).

### Approving wishes and photos first (optional)

In `Code.gs` set `AUTO_APPROVE_WISHES` / `AUTO_APPROVE_PHOTOS` to `false` and publish a new version.
New items then arrive with `Approved = No` and show on the site once you change the cell to `Yes`.

## 4. How the invitation reaches the guest

* **Download:** the card is drawn in the guest's browser (html2canvas + jsPDF), so no server is needed.
* **Email (automatic):** the PDF goes to Apps Script with the RSVP and is emailed through your Google account (`MailApp`).
  Free Gmail accounts can send about 100 emails a day, and the script sends at most 2 emails per address.
* **WhatsApp:** a website cannot send a WhatsApp message by itself without the paid WhatsApp Business API.
  Instead the "Send to my WhatsApp" button opens a chat prefilled with the invitation link, and on phones the
  **Share…** button opens the phone's share sheet with the **PDF attached**, where the guest can pick WhatsApp.

## 5. Put it online

Netlify or Vercel (both free): push the project to GitHub, import it, set the build command to `npm run build`,
the output folder to `dist`, and add the environment variable `VITE_SCRIPT_URL`. Then put the final address in
`CONFIG.SITE_URL` (`Code.gs`, new version) and `siteUrl` (`wedding.js`).

## 6. Sinhala (and Tamil)

**English + Sinhala is ready.** A language picker (top right) offers "English" and "English + සිංහල". The second
language appears under each English line, including the dates (written out in Sinhala), the names and the
downloadable invitation card. The Kandyan template starts in English + Sinhala.

* All fixed text: `src/i18n/strings.js` (`en:` and `si:` for each line). The Sinhala was written for this sample,
  so please have a Sinhala speaker proofread it.
* Names, venue, dress code and the schedule: `src/config/wedding.js`, written as `{ en: '…', si: '…' }`.
* Language choices: `languages` in `wedding.js`. With one entry the picker is hidden.

**Tamil:** add `ta:` text next to `en:`/`si:` in `strings.js` and in `wedding.js`, then add `'en-ta'` to `languages`.
The Noto Sans Tamil font is already loaded.

## 7. Templates

| | Look |
| --- | --- |
| `kandyan` | Gold, white and silver. Lotus crest and corners, scrolling-vine border bands, an arched hero frame, double-lined gold cards, silver envelope, charcoal countdown. |
| `western` | Ivory, champagne gold and blush. Script names, falling petals, leaf corners. |

Both have exactly the same features and sections. A template is made of:

* colours, fonts and decoration: `src/themes/<name>.css` (selector `[data-template='<name>']`)
* ornaments (corner, divider, border band, crest): `src/components/Ornament.jsx`
* a line in `src/config/templates.js` (section order and starting language)

### Adding the Tamil template
1. Copy `src/themes/kandyan.css` to `src/themes/tamil.css`, change `[data-template='kandyan']` to `'tamil'`, and change the colours and fonts.
2. Import it at the top of `src/index.css`.
3. In `Ornament.jsx` add a Tamil set of corner / divider / band shapes (for example a kolam or temple-border pattern)
   and pick it when the template is `tamil`.
4. Add `tamil: { id: 'tamil', label: 'Tamil', defaultLanguage: 'en-ta', sections: ALL_SECTIONS }` to `templates.js`
   and set `template: 'tamil'` in `wedding.js`.

## Troubleshooting

* **"Failed to fetch" on submit:** the web app must be deployed with *Who has access: Anyone*, and the URL in `.env`
  must end with `/exec`. Restart `npm run dev` after editing `.env`.
* **Changes in `Code.gs` do nothing:** publish a *new version* of the deployment.
* **Guest photos do not show:** run `setup` once, and keep the Drive folder's files shared as "Anyone with the link".
* **Photo upload fails on one phone:** iPhone HEIC photos are usually converted to JPEG by Safari; if not, the guest can
  take a screenshot or pick another photo.
* **Music does not play:** check `public/music/wedding.mp3` exists; browsers also need the envelope tap first.
* **Invitation card looks different in the PDF:** make sure the Google Fonts load (internet connection) before submitting.


## 8. Languages, background picture and new sections

- **English / Sinhala:** the site, the invitation card, the WhatsApp text and the email are each fully in one language. A small `EN | සිං` button switches them. The Kandyan template starts in Sinhala (change `defaultLanguage` in `src/config/templates.js`). `languages: ['en','si','en-si']` in `wedding.js` also offers the optional mixed mode.
- **Background picture:** `heroImage` in `src/config/wedding.js` (default `public/photos/couple.png`, the Poruwa illustration). It is the full-screen first page and is dimmed behind the countdown. Set it to `''` for the plain decorated hero.
- **Cover screen (Kandyan):** mandala, names, date and an "Open invitation" button. Add `?to=Mr%20%26%20Mrs%20Silva` to a link to show "Dear Mr & Mrs Silva". Optional drum sound: `introSound` in `wedding.js`.
- **Letter, contacts, bottom menu:** `families` and `contacts` in `wedding.js` (fake data, edit them). Contact buttons call or open WhatsApp; "Save the date" adds the event to Google Calendar.
- **Emails** are sent in Sinhala when the guest used the Sinhala version (edit `COUPLE_SI` / `EVENT_TEXT_SI` in `Code.gs`). Re-deploy the script after editing.

## 9. Tamil template (dark red and gold)

- Preview it with `?template=tamil` on the address, or set `template: 'tamil'` in `src/config/wedding.js`.
- It starts in Tamil and offers `EN | தமிழ்` (see `languages` in `src/config/templates.js`). All site text, the card, WhatsApp text and dates have Tamil. The Tamil text was written for this sample, so please have a Tamil speaker proofread it.
- It uses the Kandyan layout, with its own ornaments in `src/components/Ornament.jsx`: kolam (dot-and-curve) corners, divider and round motif, a temple-step border and a kuthuvilakku lamp crest. `src/themes/tamil.css` holds the colours. Change the wine and gold colours at the top of that file.
- The cover and first page use `heroImage` (default: the Poruwa illustration). Put a picture that suits a Tamil wedding in `public/photos` and point `heroImage` to it.
- In `wedding.js`, every text can have `ta:` next to `en:` and `si:` (names, venue, address, dress code, parents, events).

## 10. Intro film, music and mandala art

- **Intro film:** `public/intro.mp4` (your video, 4 s, silent copy) plays full screen right after the guest taps "Open invitation", then fades into the site. There is a Skip button. It is used by the Kandyan and Tamil templates (`introFilm: true` in `src/config/templates.js`). To use another video, replace the file. Set `introVideo: ''` in `src/config/wedding.js` to switch it off. If the file cannot load, the site simply carries on.
- **Background music:** `public/music/wedding.mp3` (your audio converted to mp3, about 4 minutes, 3.4 MB) starts when the invitation is opened, loops, and can be muted with the round button.
- **Mandala art:** the Kandyan mandala, corners, divider, crest and border now use a layered gold lotus design (`lotusLayers` in `src/components/Ornament.jsx`): scalloped arches with dots, 12 lotus petals with a leaf eye, small star leaves, dotted rings, 16 star points and a ten-petal flower in the centre. The corner is a quarter of it, the crest is the upper half, the divider and border carry small versions.
