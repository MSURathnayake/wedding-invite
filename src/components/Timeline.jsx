import wedding from '../config/wedding';
import { Txt } from '../i18n';
import Section from './Section';

export default function Timeline() {
  return (
    <Section id="flow" tone="alt" titleKey="flow.title" subKey="flow.sub">
      <ol className="timeline">
        {wedding.events.map((event, i) => (
          <li className="tl" key={i}>
            <span className="tl__dot" aria-hidden="true">
              {event.icon}
            </span>
            <div className="tl__body">
              <p className="tl__time">
                <Txt v={event.time} />
              </p>
              <h3 className="tl__title">
                <Txt v={event.title} />
              </h3>
              {event.desc && (
                <p className="tl__desc">
                  <Txt v={event.desc} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
