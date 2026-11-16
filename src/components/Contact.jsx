import wedding from '../config/wedding';
import { T, Txt } from '../i18n';
import Section from './Section';
import { Divider } from './Ornament';
import { googleCalendarUrl, toIntlPhone } from '../lib/format';

// Tap-to-call and WhatsApp for the couple, then a closing line and "save the date".
export default function Contact() {
  const { contacts } = wedding;
  return (
    <Section id="contact" tone="alt" titleKey="contact.title" subKey="contact.sub">
      <div className="contacts">
        {contacts.map((person, i) => {
          const digits = toIntlPhone(person.phone);
          return (
            <article className="info-card" key={i}>
              <p className="info-card__big">
                <Txt v={person.name} />
              </p>
              <p>{person.phone}</p>
              <div className="btn-row">
                <a className="btn" href={`tel:+${digits}`}>
                  <T k="contact.call" />
                </a>
                <a className="btn btn--wa" href={`https://wa.me/${digits}`} target="_blank" rel="noreferrer">
                  <T k="contact.whatsapp" />
                </a>
              </div>
            </article>
          );
        })}
      </div>

      <div className="signoff">
        <Divider className="section__divider" width={200} />
        <p className="signoff__text">
          <T k="contact.signoff" />
        </p>
        <a className="btn btn--ghost" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
          <T k="contact.save" />
        </a>
      </div>
    </Section>
  );
}
