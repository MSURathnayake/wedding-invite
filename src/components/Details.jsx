import wedding from '../config/wedding';
import { T, Txt } from '../i18n';
import Section from './Section';
import { googleCalendarUrl } from '../lib/format';
import { Dt, dateString } from './DateText';

export default function Details() {
  const { date, venue, dressCode, rsvpDeadline } = wedding;
  return (
    <Section id="details" titleKey="details.title" subKey="details.sub">
      <div className="cards3">
        <article className="info-card">
          <span className="info-card__icon" aria-hidden="true">
            📅
          </span>
          <h3>
            <T k="details.when" />
          </h3>
          <p className="info-card__big">
            <Dt iso={date} />
          </p>
          <p>
            <Dt iso={date} kind="time" />
          </p>
          <a className="link" href={googleCalendarUrl()} target="_blank" rel="noreferrer">
            <T k="details.addCal" />
          </a>
        </article>

        <article className="info-card">
          <span className="info-card__icon" aria-hidden="true">
            📍
          </span>
          <h3>
            <T k="details.where" />
          </h3>
          <p className="info-card__big">
            <Txt v={venue.name} />
          </p>
          <p>
            <Txt v={venue.address} />
          </p>
          <a className="link" href={venue.mapLink} target="_blank" rel="noreferrer">
            <T k="details.map" />
          </a>
        </article>

        <article className="info-card">
          <span className="info-card__icon" aria-hidden="true">
            👗
          </span>
          <h3>
            <T k="details.dress" />
          </h3>
          <p className="info-card__big">
            <Txt v={dressCode} />
          </p>
        </article>
      </div>

      {venue.mapEmbed && (
        <div className="map">
          <iframe
            title="Venue map"
            src={venue.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      )}

      {rsvpDeadline && (
        <p className="note">
          <T
            k="details.rsvpBy"
            vars={(loc) => ({ date: dateString(rsvpDeadline, 'short', loc) })}
          />
        </p>
      )}
    </Section>
  );
}
