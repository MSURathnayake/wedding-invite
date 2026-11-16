// ✏️  EDIT THIS FILE to change the wedding details.
// The site and the downloadable invitation card both read from here.
// Every name, date and place below is FAKE sample data.
//
// Any text can be a plain string, or an object with translations: { en, si, ta }.

const BASE = import.meta.env.BASE_URL || '/';

const wedding = {
  // Which look to use: 'kandyan' or 'western' (see src/config/templates.js).
  // To preview the other one without changing this, add ?template=western to the address.
  template: 'kandyan',

  // Languages offered in the language picker. Each one is complete on its own:
  //   'en'     all English
  //   'si'     all Sinhala
  //   'ta'     all Tamil (add the `ta` text in src/i18n/strings.js and here first)
  //   'en-si'  English with Sinhala under every line (optional mixed mode; same for 'en-ta')
  // With only one entry the picker is hidden. The template can pick its own starting language
  // (src/config/templates.js); `defaultLanguage` is used when it does not.
  languages: ['en', 'si'],
  defaultLanguage: 'en',

  couple: {
    first: { en: 'Amaya', si: 'අමායා', ta: 'அமாயா' },
    second: { en: 'Dilan', si: 'දිලාන්', ta: 'திலன்' },
  },

  // ISO date-time with the Sri Lanka offset (+05:30). Drives the countdown and the card.
  date: '2027-03-20T16:00:00+05:30',
  durationHours: 7,
  timeZone: 'Asia/Colombo',
  rsvpDeadline: '2027-03-01',

  venue: {
    name: { en: 'The Grand Ballroom', si: 'ද ග්‍රෑන්ඩ් බෝල්රූම්', ta: 'தி கிராண்ட் பால்ரூம்' },
    address: {
      en: '12 Galle Road, Colombo 03, Sri Lanka',
      si: '12, ගාලු පාර, කොළඹ 03, ශ්‍රී ලංකාව',
      ta: '12 காலி வீதி, கொழும்பு 03, இலங்கை',
    },
    // Link opened by the "Open in Maps" button.
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Colombo+Sri+Lanka',
    // Optional embedded map. Remove this line to hide the map.
    mapEmbed: 'https://www.google.com/maps?q=Colombo%20Sri%20Lanka&output=embed',
  },

  dressCode: {
    en: 'Traditional Sri Lankan or formal wear',
    si: 'සාම්ප්‍රදායික හෝ විධිමත් ඇඳුම්',
    ta: 'பாரம்பரிய இலங்கை அல்லது முறையான உடை',
  },

  // The two families, shown in the invitation letter.
  families: {
    bride: { parents: { en: 'Mr. & Mrs. Ranjith Silva', si: 'රංජිත් සිල්වා මහතා සහ මහත්මිය', ta: 'திரு & திருமதி ரஞ்சித் சில்வா' } },
    groom: { parents: { en: 'Mr. & Mrs. Nimal Perera', si: 'නිමල් පෙරේරා මහතා සහ මහත්මිය', ta: 'திரு & திருமதி நிமல் பெரேரா' } },
  },

  // Tap-to-call and WhatsApp buttons (fake numbers).
  contacts: [
    { name: { en: 'Amaya', si: 'අමායා', ta: 'அமாயா' }, phone: '+94 77 000 0001' },
    { name: { en: 'Dilan', si: 'දිලාන්', ta: 'திலன்' }, phone: '+94 77 000 0002' },
  ],

  // Full-screen illustration for the first screen (also dimmed behind the envelope and the countdown).
  // Put the picture in /public/photos. Set to '' for the plain decorated hero.
  heroImage: `${BASE}photos/couple.png`,
  heroAlt: 'Illustration of the couple on the Poruwa under a flower canopy',

  // Used to turn local numbers like 077 123 4567 into +94 77 123 4567 for WhatsApp.
  defaultCountryCode: '94',

  // Public address of the site, used in shared messages. Leave '' to use the current address.
  siteUrl: '',

  // Background music. Put the file in /public/music (see the README there).
  music: { src: `${BASE}music/wedding.mp3` },
  // Short film that plays full screen right after the guest opens the invitation (Kandyan and Tamil
  // templates). Replace public/intro.mp4 with your own (portrait 9:16 works best, keep it under ~2 MB).
  // Set introVideo to '' to switch it off.
  introVideo: `${BASE}intro.mp4`,
  introPoster: `${BASE}photos/intro-poster.jpg`,

  // Optional short sound played when the envelope opens, for example a drum roll: `${BASE}music/intro.mp3`.
  introSound: '',

  // How many guests one RSVP can add.
  maxAdults: 6,
  maxChildren: 6,

  // The day, hour by hour.
  events: [
    {
      time: { en: '3:30 PM', si: 'ප.ව. 3.30', ta: 'மாலை 3:30' },
      icon: '🪔',
      title: { en: 'Welcome of guests', si: 'අමුත්තන් පිළිගැනීම', ta: 'விருந்தினர் வரவேற்பு' },
      desc: { en: 'Traditional welcome with betel leaves and refreshments', si: 'බුලත් විට සහිත සාම්ප්‍රදායික පිළිගැනීම', ta: 'வெற்றிலை பாக்கு மற்றும் சிற்றுண்டியுடன் பாரம்பரிய வரவேற்பு' },
    },
    {
      time: { en: '4:00 PM', si: 'ප.ව. 4.00', ta: 'மாலை 4:00' },
      icon: '💍',
      title: { en: 'Poruwa ceremony', si: 'පෝරුව චාරිත්‍ර', ta: 'மணமேடைச் சடங்குகள்' },
      desc: { en: 'Traditional rituals on the Poruwa', si: 'පෝරුව මත සාම්ප්‍රදායික චාරිත්‍ර', ta: 'மணமேடையில் பாரம்பரிய சடங்குகள்' },
    },
    {
      time: { en: '5:00 PM', si: 'ප.ව. 5.00', ta: 'மாலை 5:00' },
      icon: '✍️',
      title: { en: 'Signing the register', si: 'විවාහ සහතිකය අත්සන් කිරීම', ta: 'பதிவேட்டில் கையொப்பமிடல்' },
      desc: { en: 'Registration of the marriage', si: 'විවාහය ලියාපදිංචි කිරීම', ta: 'திருமணத்தைப் பதிவு செய்தல்' },
    },
    {
      time: { en: '5:30 PM', si: 'ප.ව. 5.30', ta: 'மாலை 5:30' },
      icon: '📸',
      title: { en: 'Photographs', si: 'ඡායාරූප', ta: 'புகைப்படங்கள்' },
      desc: { en: 'Family and group photos', si: 'පවුල් සහ කණ්ඩායම් ඡායාරූප', ta: 'குடும்பம் மற்றும் குழுப் படங்கள்' },
    },
    {
      time: { en: '6:30 PM', si: 'ප.ව. 6.30', ta: 'மாலை 6:30' },
      icon: '🍰',
      title: { en: 'Cake cutting and toast', si: 'කේක් කැපීම සහ සුබ පැතුම්', ta: 'கேக் வெட்டுதல் மற்றும் வாழ்த்து' },
      desc: { en: 'Raise a glass to the newlyweds', si: 'අලුත් යුවළට කුසලාන ඔසවමු', ta: 'மணமக்களுக்கு வாழ்த்துக் கோப்பை உயர்த்துவோம்' },
    },
    {
      time: { en: '7:30 PM', si: 'ප.ව. 7.30', ta: 'இரவு 7:30' },
      icon: '🍽️',
      title: { en: 'Dinner', si: 'රාත්‍රී භෝජන සංග්‍රහය', ta: 'இரவு விருந்து' },
      desc: { en: 'Buffet dinner with live music', si: 'සජීවී සංගීතය සමඟ බුෆේ භෝජන සංග්‍රහය', ta: 'நேரடி இசையுடன் பஃபே இரவு உணவு' },
    },
    {
      time: { en: '9:00 PM', si: 'ප.ව. 9.00', ta: 'இரவு 9:00' },
      icon: '💃',
      title: { en: 'Dancing', si: 'නැටුම්', ta: 'நடனம்' },
      desc: { en: 'The dance floor opens', si: 'නැටුම් තට්ටුව විවෘත වේ', ta: 'நடனத் தளம் திறக்கப்படுகிறது' },
    },
    {
      time: { en: '11:00 PM', si: 'ප.ව. 11.00', ta: 'இரவு 11:00' },
      icon: '🚗',
      title: { en: 'Farewell', si: 'සමුගැනීම', ta: 'வழியனுப்புதல்' },
      desc: { en: 'A send-off for the couple', si: 'යුවළට සමුදීම', ta: 'மணமக்களுக்கான வழியனுப்பு விழா' },
    },
  ],

  // Pre-shoot gallery: files in /public/photos (see the README there).
  preshoot: Array.from({ length: 10 }, (_, i) => ({
    src: `${BASE}photos/preshoot-${i + 1}.jpg`,
    alt: `Pre-shoot photo ${i + 1}`,
  })),
};

export default wedding;
