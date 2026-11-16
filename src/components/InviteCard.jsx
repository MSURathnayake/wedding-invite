import { forwardRef } from 'react';
import wedding from '../config/wedding';
import { T, Txt } from '../i18n';
import { Corner, Divider, Band } from './Ornament';
import { Dt } from './DateText';
import Names from './Names';
import { getSiteUrl } from '../lib/format';
import { activeTemplateId } from '../config/activeTemplate';

const ornate = activeTemplateId === 'kandyan' || activeTemplateId === 'tamil';
const GOLD = ornate ? '#b8923f' : '#b08d57';

// The personalised invitation (720 x 1000 px). It is rendered off-screen and converted to a
// PDF / image after the RSVP. Keep it simple: no viewport units, no CSS transforms.
const InviteCard = forwardRef(function InviteCard({ guest }, ref) {
  const { venue, date, dressCode } = wedding;
  const scale = ornate ? 0.86 : 1;
  const nameSize = Math.round((guest.name.length > 28 ? 34 : guest.name.length > 18 ? 44 : 56) * scale);

  const party = [];
  if (guest.adults > 0) {
    party.push(guest.adults === 1 ? <T key="a" k="card.adult1" /> : <T key="a" k="card.adultN" vars={{ n: guest.adults }} />);
  }
  if (guest.children > 0) {
    party.push(guest.children === 1 ? <T key="c" k="card.child1" /> : <T key="c" k="card.childN" vars={{ n: guest.children }} />);
  }

  return (
    <div className="card" ref={ref}>
      <div className="card__frame card__frame--outer" />
      <div className="card__frame card__frame--inner" />
      <Corner className="card__corner card__corner--tl" size={96} color={GOLD} rotate={0} />
      <Corner className="card__corner card__corner--tr" size={96} color={GOLD} rotate={90} />
      <Corner className="card__corner card__corner--br" size={96} color={GOLD} rotate={180} />
      <Corner className="card__corner card__corner--bl" size={96} color={GOLD} rotate={270} />
      <Band className="card__band card__band--top" color={GOLD} width={420} />
      <Band className="card__band card__band--bottom" color={GOLD} width={420} />

      <div className="card__body">
        <p className="card__eyebrow">
          <T k="card.eyebrow" />
        </p>
        <p className="card__names">
          <Names />
        </p>
        <p className="card__small">
          <T k="card.request" />
        </p>
        <p className="card__guest" style={{ fontSize: nameSize }}>
          {guest.name}
        </p>
        {party.length > 0 && (
          <p className="card__party">
            {party.map((part, i) => (
              <span key={i} className="card__party-item">
                {part}
              </span>
            ))}
          </p>
        )}
        <Divider width={220} color={GOLD} />
        <p className="card__small">
          <T k="card.celebrate" />
        </p>
        <p className="card__date">
          <Dt iso={date} />
        </p>
        <p className="card__time">
          <Dt iso={date} kind="time" />
        </p>
        <p className="card__venue">
          <Txt v={venue.name} />
        </p>
        <p className="card__address">
          <Txt v={venue.address} />
        </p>
        <p className="card__dress">
          <span className="card__dress-label">
            <T k="card.dress" />
          </span>
          <Txt v={dressCode} />
        </p>
        <p className="card__foot">{getSiteUrl()}</p>
      </div>
    </div>
  );
});

export default InviteCard;
