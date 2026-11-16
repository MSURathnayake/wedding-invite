import wedding from '../config/wedding';
import { T, Txt } from '../i18n';
import Section from './Section';
import { Mandala } from './Ornament';

// The invitation "letter": a warm line, then the two families.
export default function Letter() {
  const { couple, families } = wedding;
  return (
    <Section id="letter" titleKey="letter.title">
      <div className="letter">
        <Mandala className="letter__mandala" />
        <p className="letter__body">
          <T k="letter.body" />
        </p>
        <div className="letter__families">
          <div className="letter__person">
            <h3 className="letter__name">
              <Txt v={couple.first} />
            </h3>
            <p className="letter__role">
              <T k="letter.bride" />
            </p>
            <p className="letter__parents">
              <Txt v={families.bride.parents} />
            </p>
          </div>
          <span className="letter__amp" aria-hidden="true">
            &amp;
          </span>
          <div className="letter__person">
            <h3 className="letter__name">
              <Txt v={couple.second} />
            </h3>
            <p className="letter__role">
              <T k="letter.groom" />
            </p>
            <p className="letter__parents">
              <Txt v={families.groom.parents} />
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
