// All fixed text on the site: `en` (English), `si` (Sinhala) and `ta` (Tamil).
// Switching languages on:
//   - 'en-si' is already listed in `languages` in src/config/wedding.js
//   - for Tamil, add `ta:` text to the entries below and put 'en-ta' in `languages`
// The language picker shows English with the second language underneath each line.
// {name}, {date} and similar are filled in automatically: keep them in the translation.
// The Sinhala was written for this sample, so please have a Sinhala speaker proofread it.

export const strings = {
  // Opening envelope
  'intro.tap': { en: 'Tap to open', si: 'විවෘත කිරීමට ස්පර්ශ කරන්න', ta: "திறக்க தொடவும்" },
  'intro.eyebrow': { en: 'You are invited', si: 'ඔබට ආරාධනා කරමු', ta: "உங்களுக்கு அழைப்பு" },
  'intro.for': { en: 'For {name}', si: '{name} සඳහා', ta: "{name} அவர்களுக்கு" },

  // Hero
  'hero.together': { en: 'Together with their families', si: 'ඔවුන්ගේ පවුල් සමඟ එක්ව', ta: "குடும்பத்தினருடன் இணைந்து" },
  'hero.invite': {
    en: 'invite you to celebrate their wedding',
    si: 'ඔවුන්ගේ විවාහ මංගල්‍යය සමරන්නට ඔබට ආරාධනා කරති',
    ta: "தங்களின் திருமண விழாவைக் கொண்டாட உங்களை அன்புடன் அழைக்கிறார்கள்",
  },
  'hero.scroll': { en: 'Scroll down', si: 'පහළට යන්න', ta: "கீழே செல்லவும்" },

  // Details
  'details.title': { en: 'The Details', si: 'මංගල්‍ය විස්තර', ta: "விழா விவரங்கள்" },
  'details.sub': { en: 'Everything you need to know about the day', si: 'දවස ගැන දැනගත යුතු සියල්ල', ta: "அந்த நாளைப் பற்றி நீங்கள் அறிய வேண்டிய அனைத்தும்" },
  'details.when': { en: 'When', si: 'කවදාද', ta: "எப்போது" },
  'details.where': { en: 'Where', si: 'කොහෙද', ta: "எங்கே" },
  'details.dress': { en: 'Dress code', si: 'ඇඳුම් රීතිය', ta: "ஆடைக் குறிப்பு" },
  'details.map': { en: 'Open in Maps', si: 'සිතියමේ බලන්න', ta: "வரைபடத்தில் திறக்க" },
  'details.addCal': { en: 'Add to calendar', si: 'දින දර්ශනයට එක් කරන්න', ta: "நாட்காட்டியில் சேர்க்க" },
  'details.rsvpBy': { en: 'Kindly reply by {date}', si: '{date} දිනට පෙර දන්වන්න', ta: "{date} க்குள் பதிலளிக்கவும்" },

  // Countdown
  'countdown.title': { en: 'Counting down to our big day', si: 'අපේ විශේෂ දිනයට තව', ta: "எங்கள் பெருநாளுக்கான கணக்கீடு" },
  'countdown.sub': { en: 'Every second brings us closer', si: 'සෑම තත්පරයක්ම අපව සමීප කරයි', ta: "ஒவ்வொரு நொடியும் நம்மை நெருக்கமாக்குகிறது" },
  'countdown.days': { en: 'Days', si: 'දින', ta: "நாட்கள்" },
  'countdown.hours': { en: 'Hours', si: 'පැය', ta: "மணி" },
  'countdown.minutes': { en: 'Minutes', si: 'මිනිත්තු', ta: "நிமிடம்" },
  'countdown.seconds': { en: 'Seconds', si: 'තත්පර', ta: "விநாடி" },
  'countdown.done': { en: 'The big day is here!', si: 'විශේෂ දිනය පැමිණ ඇත!', ta: "பெருநாள் வந்துவிட்டது!" },

  // Event flow
  'flow.title': { en: 'The day, hour by hour', si: 'දවසේ වැඩසටහන', ta: "நாளின் நிகழ்ச்சி நிரல்" },
  'flow.sub': {
    en: 'A little glimpse of how the celebration will unfold',
    si: 'සැමරුම ගලා යන ආකාරය පිළිබඳ කුඩා දැක්මක්',
    ta: "கொண்டாட்டம் எவ்வாறு நடைபெறும் என்பதற்கான ஒரு பார்வை",
  },

  // Gallery
  'gallery.title': { en: 'Our story in pictures', si: 'අපේ කතාව පින්තූර වලින්', ta: "படங்களில் எங்கள் கதை" },
  'gallery.sub': {
    en: 'A few moments from our pre-wedding shoot',
    si: 'විවාහ පූර්ව ඡායාරූප ගත කිරීමේ මොහොත කිහිපයක්',
    ta: "திருமணத்திற்கு முந்தைய படப்பிடிப்பின் சில தருணங்கள்",
  },

  // RSVP
  'rsvp.title': { en: 'Will you join us?', si: 'ඔබ අප සමඟ එක් වෙනවාද?', ta: "நீங்கள் வருவீர்களா?" },
  'rsvp.sub': {
    en: 'Let us know if you can make it. Your invitation card will be ready to download right after.',
    si: 'ඔබට පැමිණිය හැකිදැයි දන්වන්න. ඉන් පසු ඔබේ ආරාධනා පත්‍රය බාගත කළ හැක.',
    ta: "வர முடியுமா என்பதைத் தெரிவிக்கவும். உங்கள் அழைப்பிதழ் உடனே பதிவிறக்கத் தயாராக இருக்கும்.",
  },
  'rsvp.name': { en: 'Your name', si: 'ඔබේ නම', ta: "உங்கள் பெயர்" },
  'rsvp.namePh': { en: 'Full name', si: 'සම්පූර්ණ නම', ta: "முழுப் பெயர்" },
  'rsvp.phone': { en: 'Phone / WhatsApp number', si: 'දුරකථන / WhatsApp අංකය', ta: "தொலைபேசி / வாட்ஸ்அப் எண்" },
  'rsvp.phoneHint': {
    en: 'Add your WhatsApp number if you have one.',
    si: 'WhatsApp අංකයක් තිබේ නම් එය ලබා දෙන්න.',
    ta: "வாட்ஸ்அப் எண் இருந்தால் அதைக் கொடுக்கவும்.",
  },
  'rsvp.email': { en: 'Email address (optional)', si: 'ඊමේල් ලිපිනය (අවශ්‍ය නම්)', ta: "மின்னஞ்சல் முகவரி (விருப்பம்)" },
  'rsvp.emailHint': {
    en: 'Add it and we will email your invitation card too.',
    si: 'එය ලබා දුන්නොත් ඔබේ ආරාධනා පත්‍රය ඊමේල් මඟින්ද එවන්නෙමු.',
    ta: "கொடுத்தால் உங்கள் அழைப்பிதழை மின்னஞ்சலிலும் அனுப்புவோம்.",
  },
  'rsvp.attending': { en: 'Will you attend?', si: 'ඔබ සහභාගී වෙනවාද?', ta: "நீங்கள் கலந்துகொள்வீர்களா?" },
  'rsvp.yes': { en: 'Joyfully accept', si: 'සතුටින් සහභාගී වෙමි', ta: "மகிழ்ச்சியுடன் ஏற்கிறேன்" },
  'rsvp.no': { en: 'Regretfully decline', si: 'කණගාටුවෙන් සහභාගී විය නොහැක', ta: "வருந்துகிறேன், வர இயலாது" },
  'rsvp.adults': { en: 'Adults', si: 'වැඩිහිටියන්', ta: "பெரியவர்கள்" },
  'rsvp.adultsHint': { en: 'Including you', si: 'ඔබත් ඇතුළුව', ta: "உங்களையும் சேர்த்து" },
  'rsvp.children': { en: 'Children', si: 'ළමුන්', ta: "குழந்தைகள்" },
  'rsvp.childrenHint': { en: 'Under 12 years', si: 'වයස අවුරුදු 12ට අඩු', ta: "12 வயதுக்குக் கீழ்" },
  'rsvp.message': { en: 'A note for the couple (optional)', si: 'යුවළට සටහනක් (අවශ්‍ය නම්)', ta: "தம்பதியினருக்கான குறிப்பு (விருப்பம்)" },
  'rsvp.messagePh': {
    en: 'Dietary needs, a message, anything you would like us to know',
    si: 'ආහාර අවශ්‍යතා, පණිවිඩයක් හෝ අප දැනගත යුතු දෙයක්',
    ta: "உணவுத் தேவைகள், ஒரு செய்தி, நாங்கள் தெரிந்துகொள்ள வேண்டியவை",
  },
  'rsvp.submit': { en: 'Send RSVP', si: 'RSVP යවන්න', ta: "பதிலை அனுப்பு" },
  'rsvp.sending': { en: 'Sending…', si: 'යවමින්…', ta: "அனுப்புகிறது…" },
  'rsvp.error': {
    en: 'Something went wrong. Please check your connection and try again.',
    si: 'යම් දෙයක් වැරදිණි. ඔබේ සම්බන්ධතාව පරීක්ෂා කර නැවත උත්සාහ කරන්න.',
    ta: "ஏதோ தவறு நடந்தது. இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
  },
  'err.name': { en: 'Please enter your name.', si: 'කරුණාකර ඔබේ නම ඇතුළත් කරන්න.', ta: "உங்கள் பெயரை உள்ளிடவும்." },
  'err.phone': { en: 'Please enter a valid phone number.', si: 'කරුණාකර නිවැරදි දුරකථන අංකයක් ඇතුළත් කරන්න.', ta: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்." },
  'err.email': { en: 'Please enter a valid email address.', si: 'කරුණාකර නිවැරදි ඊමේල් ලිපිනයක් ඇතුළත් කරන්න.', ta: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்." },

  // After the RSVP
  'thanks.title': { en: 'Thank you, {name}!', si: 'ස්තූතියි {name}!', ta: "நன்றி, {name}!" },
  'thanks.yes': {
    en: 'We have saved your seats. We cannot wait to celebrate with you.',
    si: 'ඔබේ ආසන වෙන් කර ඇත. ඔබ සමඟ සැමරීමට අපි බලාපොරොත්තුවෙන් සිටිමු.',
    ta: "உங்கள் இருக்கைகளைப் பதிவு செய்துவிட்டோம். உங்களுடன் கொண்டாட ஆவலாக இருக்கிறோம்.",
  },
  'thanks.no': {
    en: 'We will miss you. Thank you for letting us know.',
    si: 'අපි ඔබ අතපසු කරමු. දැනුම් දීම ගැන ස්තූතියි.',
    ta: "உங்களை மிகவும் தவறவிடுவோம். தெரிவித்ததற்கு நன்றி.",
  },
  'thanks.downloadPdf': { en: 'Download invitation (PDF)', si: 'ආරාධනා පත්‍රය බාගන්න (PDF)', ta: "அழைப்பிதழைப் பதிவிறக்கு (PDF)" },
  'thanks.savePng': { en: 'Save as image', si: 'රූපයක් ලෙස සුරකින්න', ta: "படமாகச் சேமி" },
  'thanks.whatsapp': { en: 'Send to my WhatsApp', si: 'මගේ WhatsApp වෙත යවන්න', ta: "என் வாட்ஸ்அப்புக்கு அனுப்பு" },
  'thanks.share': { en: 'Share…', si: 'බෙදාගන්න…', ta: "பகிர்…" },
  'thanks.emailSent': {
    en: 'We have also emailed your invitation to {email}.',
    si: 'ඔබේ ආරාධනා පත්‍රය {email} වෙත ඊමේල් කර ඇත.',
    ta: "உங்கள் அழைப்பிதழை {email} க்கு மின்னஞ்சலிலும் அனுப்பியுள்ளோம்.",
  },
  'thanks.emailFailed': {
    en: 'We could not email your invitation. Please use the download button instead.',
    si: 'ඔබේ ආරාධනා පත්‍රය ඊමේල් කිරීමට නොහැකි විය. කරුණාකර බාගත කිරීමේ බොත්තම භාවිත කරන්න.',
    ta: "உங்கள் அழைப்பிதழை மின்னஞ்சலில் அனுப்ப முடியவில்லை. பதிவிறக்க பொத்தானைப் பயன்படுத்தவும்.",
  },
  'thanks.cardFailed': {
    en: 'We could not create your invitation card this time, but your RSVP was received.',
    si: 'මෙවර ආරාධනා පත්‍රය සෑදීමට නොහැකි විය, නමුත් ඔබේ RSVP ලැබුණි.',
    ta: "இம்முறை அழைப்பிதழ் அட்டையை உருவாக்க முடியவில்லை, ஆனால் உங்கள் பதில் பெறப்பட்டது.",
  },
  'thanks.another': { en: 'Submit another RSVP', si: 'තවත් RSVP එකක් යවන්න', ta: "மற்றொரு பதிலைச் சமர்ப்பி" },
  'thanks.demo': {
    en: 'Preview mode: nothing was saved or sent because the Google Apps Script link is not set up yet.',
    si: 'පෙරදසුන් ආකාරය: Google Apps Script සබැඳිය තවම සකසා නැති නිසා කිසිවක් සුරකිණි හෝ යැවුණි නැත.',
    ta: "முன்னோட்ட முறை: Google Apps Script இணைப்பு இன்னும் அமைக்கப்படாததால் எதுவும் சேமிக்கப்படவோ அனுப்பப்படவோ இல்லை.",
  },

  // Invitation card (PDF / image)
  'card.eyebrow': { en: 'Together with their families', si: 'ඔවුන්ගේ පවුල් සමඟ එක්ව', ta: "குடும்பத்தினருடன் இணைந்து" },
  'card.request': { en: 'request the pleasure of the company of', si: 'ආදරයෙන් ආරාධනා කරන්නේ', ta: "மதிப்பிற்குரிய" },
  'card.celebrate': { en: 'at the celebration of their wedding', si: 'ඔවුන්ගේ විවාහ මංගල්‍ය උත්සවයට', ta: "அவர்களை எங்கள் திருமண விழாவிற்கு அன்புடன் அழைக்கிறோம்" },
  'card.adult1': { en: '1 adult', si: 'වැඩිහිටියෙක් 1', ta: "1 பெரியவர்" },
  'card.adultN': { en: '{n} adults', si: 'වැඩිහිටියන් {n}', ta: "{n} பெரியவர்கள்" },
  'card.child1': { en: '1 child', si: 'ළමයෙක් 1', ta: "1 குழந்தை" },
  'card.childN': { en: '{n} children', si: 'ළමුන් {n}', ta: "{n} குழந்தைகள்" },
  'card.dress': { en: 'Dress code', si: 'ඇඳුම් රීතිය', ta: "ஆடைக் குறிப்பு" },

  // Wishes
  'wishes.title': { en: 'Wishes for the couple', si: 'යුවළට සුබ පැතුම්', ta: "தம்பதியினருக்கு வாழ்த்துகள்" },
  'wishes.sub': {
    en: 'Leave a few kind words for the happy couple.',
    si: 'සතුටුදායක යුවළට කාරුණික වචන කිහිපයක් තබන්න.',
    ta: "மணமக்களுக்கு சில அன்பான வார்த்தைகளை எழுதுங்கள்.",
  },
  'wishes.name': { en: 'Your name', si: 'ඔබේ නම', ta: "உங்கள் பெயர்" },
  'wishes.message': { en: 'Your wish', si: 'ඔබේ සුබ පැතුම', ta: "உங்கள் வாழ்த்து" },
  'wishes.messagePh': { en: 'Write your wishes here…', si: 'ඔබේ සුබ පැතුම මෙහි ලියන්න…', ta: "உங்கள் வாழ்த்துகளை இங்கே எழுதுங்கள்…" },
  'wishes.send': { en: 'Send wishes', si: 'සුබ පැතුම යවන්න', ta: "வாழ்த்துகளை அனுப்பு" },
  'wishes.sending': { en: 'Sending…', si: 'යවමින්…', ta: "அனுப்புகிறது…" },
  'wishes.sent': {
    en: 'Thank you! Your wish is now on the wall.',
    si: 'ස්තූතියි! ඔබේ සුබ පැතුම දැන් බිත්තියේ ඇත.',
    ta: "நன்றி! உங்கள் வாழ்த்து இப்போது சுவரில் உள்ளது.",
  },
  'wishes.pending': {
    en: 'Thank you! Your wish will appear once it has been approved.',
    si: 'ස්තූතියි! අනුමත වූ පසු ඔබේ සුබ පැතුම පෙන්වනු ඇත.',
    ta: "நன்றி! உங்கள் வாழ்த்து அனுமதிக்கப்பட்டதும் தோன்றும்.",
  },
  'wishes.error': {
    en: 'Could not send your wish. Please try again.',
    si: 'ඔබේ සුබ පැතුම යැවීමට නොහැකි විය. නැවත උත්සාහ කරන්න.',
    ta: "வாழ்த்தை அனுப்ப முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
  },
  'wishes.empty': { en: 'Be the first to leave a wish.', si: 'සුබ පැතුමක් තබන පළමුවැන්නා ඔබ වන්න.', ta: "முதல் வாழ்த்தைத் தெரிவிப்பவராக இருங்கள்." },
  'wishes.more': { en: 'Show more wishes', si: 'තවත් සුබ පැතුම් පෙන්වන්න', ta: "மேலும் வாழ்த்துகளைக் காட்டு" },
  'err.wishName': { en: 'Please enter your name.', si: 'කරුණාකර ඔබේ නම ඇතුළත් කරන්න.', ta: "உங்கள் பெயரை உள்ளிடவும்." },
  'err.wishMsg': { en: 'Please write a message.', si: 'කරුණාකර පණිවිඩයක් ලියන්න.', ta: "ஒரு செய்தியை எழுதவும்." },

  // Guest photos
  'moments.title': { en: 'Share your moments', si: 'ඔබේ මතක බෙදාගන්න', ta: "உங்கள் தருணங்களைப் பகிருங்கள்" },
  'moments.sub': {
    en: 'Funny, candid, family: add your favourite photos from the big day for everyone to enjoy.',
    si: 'හාස්‍යජනක, සරල, පවුලේ: විශේෂ දිනයේ ඔබේ ප්‍රියතම ඡායාරූප සැමට බලන්න එක් කරන්න.',
    ta: "வேடிக்கையான, இயல்பான, குடும்பப் படங்கள்: பெருநாளின் உங்களுக்குப் பிடித்த படங்களை அனைவரும் ரசிக்கச் சேர்க்கவும்.",
  },
  'moments.name': { en: 'Your name (optional)', si: 'ඔබේ නම (අවශ්‍ය නම්)', ta: "உங்கள் பெயர் (விருப்பம்)" },
  'moments.choose': { en: 'Choose photos', si: 'ඡායාරූප තෝරන්න', ta: "படங்களைத் தேர்ந்தெடு" },
  'moments.hint': { en: 'Up to 5 photos at a time', si: 'එකවර ඡායාරූප 5ක් දක්වා', ta: "ஒரே நேரத்தில் 5 படங்கள் வரை" },
  'moments.uploading': { en: 'Uploading…', si: 'උඩුගත කරමින්…', ta: "பதிவேற்றுகிறது…" },
  'moments.done': { en: 'Added', si: 'එක් කළා', ta: "சேர்க்கப்பட்டது" },
  'moments.failed': { en: 'Could not upload', si: 'උඩුගත කළ නොහැකි විය', ta: "பதிவேற்ற முடியவில்லை" },
  'moments.pending': {
    en: 'Thank you! Your photos will appear once they have been approved.',
    si: 'ස්තූතියි! අනුමත වූ පසු ඔබේ ඡායාරූප පෙන්වනු ඇත.',
    ta: "நன்றி! உங்கள் படங்கள் அனுமதிக்கப்பட்டதும் தோன்றும்.",
  },
  'moments.empty': { en: 'No photos yet. Add the first one!', si: 'තවම ඡායාරූප නැත. පළමුවැන්නා එක් කරන්න!', ta: "இன்னும் படங்கள் இல்லை. முதல் படத்தைச் சேருங்கள்!" },

  // Invitation letter, navigation, contact, sharing
  'intro.skip': { en: 'Skip', si: 'මඟ හරින්න', ta: 'தவிர்' },
  'intro.open': { en: 'Open invitation', si: 'ආරාධනාව විවෘත කරන්න', ta: "அழைப்பிதழைத் திற" },
  'intro.wedding': { en: 'The wedding of', si: 'විවාහ මංගල්‍යය', ta: "திருமண விழா" },
  'intro.dear': { en: 'Dear', si: 'ආදරණීය', ta: "அன்புடையீர்" },
  'letter.title': { en: 'With joy in our hearts', si: 'සතුටින් පිරි හදවතින්', ta: "மகிழ்ச்சி நிறைந்த மனதுடன்" },
  'letter.body': {
    en: 'With the blessings of our families, we are joyfully inviting you to share in the happiest day of our lives.',
    si: 'අපගේ දෙපාර්ශවයේ පවුල්වල ආශීර්වාදයෙන්, අපගේ ජීවිතයේ සතුටුම දවස බෙදාගන්නට ඔබට ආදරයෙන් ආරාධනා කරමු.',
    ta: "எங்கள் இரு குடும்பங்களின் ஆசீர்வாதத்துடன், எங்கள் வாழ்வின் மிக மகிழ்ச்சியான நாளில் பங்கேற்க உங்களை அன்புடன் அழைக்கிறோம்.",
  },
  'letter.bride': { en: 'Daughter of', si: 'දියණිය', ta: "புதல்வி" },
  'letter.groom': { en: 'Son of', si: 'පුත්‍රයා', ta: "புதல்வன்" },
  'nav.home': { en: 'Home', si: 'මුල් පිටුව', ta: "முகப்பு" },
  'nav.details': { en: 'Details', si: 'විස්තර', ta: "விவரங்கள்" },
  'nav.events': { en: 'Events', si: 'වැඩසටහන', ta: "நிகழ்வுகள்" },
  'nav.album': { en: 'Album', si: 'ඡායාරූප', ta: "படங்கள்" },
  'nav.rsvp': { en: 'RSVP', si: 'ඔබේ පිළිතුර', ta: "பதில்" },
  'contact.title': { en: 'Contact us', si: 'අපව අමතන්න', ta: "எங்களைத் தொடர்பு கொள்ள" },
  'contact.sub': { en: 'Questions about the day? We are happy to help.', si: 'දිනය ගැන ප්‍රශ්න තිබේද? අපි සතුටින් උදව් කරමු.', ta: "அந்த நாள் குறித்து கேள்விகள் உள்ளனவா? உதவ மகிழ்ச்சி." },
  'contact.call': { en: 'Call', si: 'අමතන්න', ta: "அழை" },
  'contact.whatsapp': { en: 'WhatsApp', si: 'WhatsApp', ta: "WhatsApp" },
  'contact.save': { en: 'Save the date', si: 'දිනය සටහන් කරගන්න', ta: "தேதியைச் சேமி" },
  'contact.signoff': { en: 'We cannot wait to celebrate with you!', si: 'ඔබ සමඟ සැමරීමට අපි බලාපොරොත්තුවෙන් සිටිමු!', ta: "உங்களுடன் கொண்டாட ஆவலாக இருக்கிறோம்!" },
  'wa.line': { en: "You are invited to {names}'s wedding", si: '{names}ගේ විවාහ මංගල්‍යයට ඔබට ආරාධනා කරමු', ta: "{names} திருமண விழாவுக்கு உங்களை அன்புடன் அழைக்கிறோம்" },
  'share.title': { en: 'Wedding invitation', si: 'විවාහ ආරාධනා පත්‍රය', ta: "திருமண அழைப்பிதழ்" },

  // Footer
  'footer.love': { en: 'With love and gratitude', si: 'ආදරයෙන් සහ කෘතවේදීව', ta: "அன்புடனும் நன்றியுடனும்" },
};
