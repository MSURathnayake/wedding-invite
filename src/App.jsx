import { useEffect, useRef, useState } from 'react';
import wedding from './config/wedding';
import { getTemplate } from './config/templates';
import { activeTemplateId } from './config/activeTemplate';
import { LanguageProvider, T, plain } from './i18n';
import Envelope from './components/Envelope';
import IntroFilm from './components/IntroFilm';
import MusicPlayer from './components/MusicPlayer';
import LanguageSwitcher from './components/LanguageSwitcher';
import NavBar from './components/NavBar';
import Names from './components/Names';
import { Band } from './components/Ornament';
import Hero from './components/Hero';
import Letter from './components/Letter';
import Details from './components/Details';
import Countdown from './components/Countdown';
import Timeline from './components/Timeline';
import Gallery from './components/Gallery';
import Rsvp from './components/Rsvp';
import Wishes from './components/Wishes';
import GuestPhotos from './components/GuestPhotos';
import Contact from './components/Contact';

// Section id (see src/config/templates.js) -> component
const SECTIONS = {
  hero: Hero,
  letter: Letter,
  details: Details,
  countdown: Countdown,
  flow: Timeline,
  gallery: Gallery,
  rsvp: Rsvp,
  wishes: Wishes,
  moments: GuestPhotos,
  contact: Contact,
};

export default function App() {
  const template = getTemplate(activeTemplateId);
  const music = useRef(null);
  const film = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.template = template.id;
    document.title = `${plain(wedding.couple.first)} & ${plain(wedding.couple.second)} | Wedding Invitation`;
  }, [template.id]);

  const handleOpen = () => {
    setOpened(true);
    if (music.current) music.current.start();
    // The short film (if there is one for this template) plays over the opening screen.
    if (template.introFilm && wedding.introVideo && film.current) film.current.start();
    // Optional short sound (for example a drum roll) when the envelope opens.
    if (wedding.introSound) {
      try {
        const sound = new Audio(new URL(wedding.introSound, document.baseURI).href);
        sound.volume = 0.8;
        sound.play().catch(() => {});
      } catch {
        /* no sound */
      }
    }
  };

  return (
    <LanguageProvider>
      <LanguageSwitcher />
      <MusicPlayer ref={music} show={opened} />
      <Envelope onOpen={handleOpen} />
      {template.introFilm && wedding.introVideo && <IntroFilm ref={film} src={wedding.introVideo} poster={wedding.introPoster} />}
      <NavBar show={opened} />

      <main>
        {template.sections.map((id) => {
          const Component = SECTIONS[id];
          return Component ? <Component key={id} /> : null;
        })}
      </main>

      <footer className="footer">
        <Band className="footer__band" />
        <p className="footer__names">
          <Names />
        </p>
        <p>
          <T k="footer.love" />
        </p>
      </footer>
    </LanguageProvider>
  );
}
