import { useId } from 'react';
import { activeTemplateId } from '../config/activeTemplate';

// Decorative SVGs, one set per template. All colours are set as attributes (not CSS) so they
// also render correctly when the invitation card is converted to an image / PDF.
// Exports: Corner, Divider, Band (border pattern), Finial (crest), Mandala. Band, Finial and Mandala
// draw nothing in the western template. Kandyan uses lotus petals and a vine; Tamil uses kolam
// (dot-and-curve floor art), a temple-step border and a kuthuvilakku lamp.

const isTamil = activeTemplateId === 'tamil';
const isKandyan = activeTemplateId === 'kandyan';

/* ------------------------------------------------------------------ */
/* Western                                                             */
/* ------------------------------------------------------------------ */

function WesternCorner({ size = 100, color = 'currentColor', rotate = 0, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g transform={`rotate(${rotate} 60 60)`} stroke={color} strokeWidth="1.2" strokeLinecap="round">
        <path d="M4 116V34C4 17 17 4 34 4h82" />
        <path d="M14 106V36c0-12 10-22 22-22h70" strokeOpacity=".5" />
        <path d="M30 30c11 2 19 11 21 22-11-2-19-11-21-22z" fill={color} fillOpacity=".25" />
        <path d="M52 12c7 6 9 15 7 24-7-6-9-15-7-24z" fill={color} fillOpacity=".25" />
        <path d="M12 52c9 2 17 8 19 17-9-2-17-8-19-17z" fill={color} fillOpacity=".25" />
        <circle cx="30" cy="30" r="2.5" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

function WesternDivider({ width = 200, color = 'currentColor', className }) {
  return (
    <svg className={className} width={width} height={width * 0.1} viewBox="0 0 240 24" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1">
        <line x1="0" y1="12" x2="98" y2="12" />
        <line x1="142" y1="12" x2="240" y2="12" />
      </g>
      <path d="M120 2c5 6 5 14 0 20-5-6-5-14 0-20z" fill={color} />
      <circle cx="106" cy="12" r="2" fill={color} />
      <circle cx="134" cy="12" r="2" fill={color} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Kandyan: lotus (pathma) petals, scrolling vine (liyaweta) border     */
/* ------------------------------------------------------------------ */

// A petal pointing up from (0,0); len = length, w = half width.
const petal = (len, w) =>
  `M0 0C${-w} ${-len * 0.25} ${-w} ${-len * 0.65} 0 ${-len}C${w} ${-len * 0.65} ${w} ${-len * 0.25} 0 0Z`;

// Layers of the gold lotus mandala (drawn around 0,0 with a radius of about 96). Outer to inner:
// scalloped arches with dots, 12 lotus petals with a leaf "eye", 12 small star leaves between them,
// two rings (one dotted), 16 star points and a ten-petal flower in the middle.
// Returns plain SVG elements so the same art can be a full mandala, a quarter (corner) or a half (crest).
function lotusLayers(color) {
  const rot = (n, step, start = 0) => Array.from({ length: n }, (_, i) => start + i * step);
  const dotsOnArch = [[-12, -84], [-6, -89.5], [0, -91.5], [6, -89.5], [12, -84]];
  return (
    <>
      {/* 1. scalloped arches */}
      {rot(12, 30).map((a) => (
        <g key={`arch${a}`} transform={`rotate(${a})`}>
          <path d="M-21 -78C-21 -98 21 -98 21 -78" />
          <path d="M-15.5 -79C-15.5 -92 15.5 -92 15.5 -79" strokeOpacity=".6" />
          {dotsOnArch.map(([x, y]) => (
            <circle key={x} cx={x} cy={y + 1.5} r=".9" fill={color} stroke="none" />
          ))}
        </g>
      ))}
      {/* 2. big lotus petals */}
      {rot(12, 30, 15).map((a) => (
        <g key={`petal${a}`} transform={`rotate(${a})`}>
          <path d="M0 -34C-14 -44 -17 -66 0 -84C17 -66 14 -44 0 -34Z" fill={color} fillOpacity=".06" />
          <path d="M0 -41C-8.5 -48 -10.5 -63 0 -75C10.5 -63 8.5 -48 0 -41Z" strokeOpacity=".7" />
          <path d="M0 -49C-5 -55 -5.5 -62 0 -68C5.5 -62 5 -55 0 -49Z" fill={color} stroke="none" />
          <path d="M0 -35.5Q-6 -38 -9 -44" strokeOpacity=".7" />
          <path d="M0 -35.5Q6 -38 9 -44" strokeOpacity=".7" />
          <path d="M0 -35.5V-42" strokeOpacity=".7" />
        </g>
      ))}
      {/* 3. small star leaves between the petals */}
      {rot(12, 30).map((a) => (
        <g key={`star${a}`} transform={`rotate(${a})`}>
          <path d="M0 -35L-5.5 -47L0 -61L5.5 -47Z" fill={color} fillOpacity=".12" />
          <path d="M0 -41L-2.2 -47L0 -54L2.2 -47Z" fill={color} stroke="none" fillOpacity=".8" />
        </g>
      ))}
      {/* 4. rings */}
      <circle r="34" />
      <circle r="31.5" strokeOpacity=".5" />
      <circle r="28.5" strokeWidth="1.6" strokeDasharray="0.1 3.1" strokeLinecap="round" />
      {/* 5. star points */}
      {rot(16, 22.5).map((a) => (
        <g key={`pt${a}`} transform={`rotate(${a})`}>
          <path d="M0 -15L-4.8 -22L0 -27.5L4.8 -22Z" fill={color} fillOpacity=".14" />
          <path d="M0 -18.5L0 -24.5" strokeOpacity=".8" />
        </g>
      ))}
      {rot(8, 45).map((a) => (
        <path key={`lf${a}`} transform={`rotate(${a})`} d="M0 -13C-3.4 -15.5 -3.4 -19 0 -21.5C3.4 -19 3.4 -15.5 0 -13Z" fill={color} stroke="none" fillOpacity=".55" />
      ))}
      {/* 6. centre flower */}
      <circle r="12.5" />
      <circle r="10.8" strokeWidth="1.4" strokeDasharray="0.1 2.4" strokeLinecap="round" />
      {rot(10, 36).map((a) => (
        <path key={`fl${a}`} transform={`rotate(${a})`} d="M0 -2.4C-3.2 -4.4 -3.2 -8 0 -9.6C3.2 -8 3.2 -4.4 0 -2.4Z" fill={color} stroke="none" />
      ))}
      <circle r="2" fill={color} stroke="none" />
    </>
  );
}

// Small eight-petal lotus rosette for borders and dividers (drawn around 0,0, radius about 9).
function Rosette({ color }) {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => i * 45).map((a) => (
        <path key={a} transform={`rotate(${a})`} d="M0 -2C-3 -4 -3 -7 0 -9C3 -7 3 -4 0 -2Z" fill={color} fillOpacity=".28" />
      ))}
      <circle r="1.6" fill={color} stroke="none" />
    </>
  );
}

// Corner: two fine border lines with a quarter of the lotus mandala growing out of the corner.
function KandyanCorner({ size = 100, color = 'currentColor', rotate = 0, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g transform={`rotate(${rotate} 60 60)`} stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 116V30C4 15 15 4 30 4h86" />
        <path d="M12 108V34c0-12 10-22 22-22h74" strokeOpacity=".5" />
        <g transform="translate(18 18) scale(.7)" strokeWidth="1.5">{lotusLayers(color)}</g>
        <path d="M72 4c0 9 7 13 13 9 5-3 1-9-3-6" />
        <path d="M4 72c9 0 13 7 9 13-3 5-9 1-6-3" />
      </g>
    </svg>
  );
}

// Divider: a lotus medallion with scrolls and dots on both sides.
function KandyanDivider({ width = 220, color = 'currentColor', className }) {
  return (
    <svg className={className} width={width} height={width * 0.15} viewBox="0 0 300 45" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1" strokeLinecap="round">
        <line x1="8" y1="22.5" x2="104" y2="22.5" />
        <line x1="196" y1="22.5" x2="292" y2="22.5" />
        <path d="M104 22.5c-8 0-12-6-8-10 3-3 8 0 5 4" />
        <path d="M196 22.5c8 0 12-6 8-10-3-3-8 0-5 4" />
        <path d="M118 22.5h6M176 22.5h6" strokeOpacity=".6" />
      </g>
      <circle cx="8" cy="22.5" r="2.4" fill={color} />
      <circle cx="292" cy="22.5" r="2.4" fill={color} />
      {[128, 134, 166, 172].map((x) => (
        <circle key={x} cx={x} cy="22.5" r="1.3" fill={color} />
      ))}
      <g transform="translate(150 22.5) scale(.215)" stroke={color} strokeWidth="2.6" strokeLinejoin="round">
        {lotusLayers(color)}
      </g>
    </svg>
  );
}

// Crest above the names: the upper half of the lotus mandala rising from a line.
function KandyanFinial({ color = 'currentColor', className, width = 150 }) {
  const clip = `fin${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className={className} width={width} height={width * 0.62} viewBox="0 0 150 93" fill="none" aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <rect x="0" y="0" width="150" height="80" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clip})`}>
        <g transform="translate(75 80) scale(.84)" stroke={color} strokeWidth="1.15" strokeLinejoin="round" strokeLinecap="round">
          {lotusLayers(color)}
        </g>
      </g>
      <g stroke={color} strokeWidth="1.1" strokeLinecap="round">
        <path d="M8 82H142" />
        <path d="M26 88Q75 96 124 88" strokeOpacity=".7" />
      </g>
    </svg>
  );
}

// Repeating border pattern: two fine lines, a lotus rosette between scrolls and diamonds.
// Give `width` a number for places that are turned into a PDF / image (the invitation card).
function KandyanBand({ color = 'currentColor', width = '100%', className }) {
  const patternId = `band${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className={className} width={width} height={24} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="48" height="24" patternUnits="userSpaceOnUse">
          <g stroke={color} strokeWidth="1" fill="none" strokeLinecap="round">
            <line x1="0" y1="2" x2="48" y2="2" />
            <line x1="0" y1="22" x2="48" y2="22" />
            <path d="M24 3.5L27.5 12L24 20.5L20.5 12Z" fill={color} fillOpacity=".12" />
            <path d="M0 12C4 6 9 6 12 10C13.5 12 11.5 14 10 13" />
            <path d="M48 12C44 18 39 18 36 14C34.5 12 36.5 10 38 11" />
            <g transform="translate(24 12) scale(1.05)" strokeWidth=".9">
              <Rosette color={color} />
            </g>
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${patternId})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Tamil: kolam (pulli) patterns, temple-step border, kuthuvilakku lamp */
/* ------------------------------------------------------------------ */

// A kolam diamond with curved sides, centred on (cx, cy); r = distance to the tips.
const kolamDiamond = (cx, cy, r) => {
  const k = r * 0.42;
  return (
    `M${cx} ${cy - r}C${cx + k} ${cy - r * 0.7} ${cx + r * 0.7} ${cy - k} ${cx + r} ${cy}` +
    `C${cx + r * 0.7} ${cy + k} ${cx + k} ${cy + r * 0.7} ${cx} ${cy + r}` +
    `C${cx - k} ${cy + r * 0.7} ${cx - r * 0.7} ${cy + k} ${cx - r} ${cy}` +
    `C${cx - r * 0.7} ${cy - k} ${cx - k} ${cy - r * 0.7} ${cx} ${cy - r}Z`
  );
};

function TamilCorner({ size = 100, color = 'currentColor', rotate = 0, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <g transform={`rotate(${rotate} 60 60)`} stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 116V24C4 13 13 4 24 4h92" />
        <path d="M12 108V30c0-10 8-18 18-18h78" strokeOpacity=".5" />
        {/* kolam: a curved diamond with a dot at each tip and in the middle */}
        <path d={kolamDiamond(36, 36, 20)} fill={color} fillOpacity=".18" />
        <path d={kolamDiamond(36, 36, 11)} />
        {[[36, 12], [36, 60], [12, 36], [60, 36]].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" fill={color} stroke="none" />
        ))}
        <circle cx="36" cy="36" r="2.6" fill={color} stroke="none" />
        {/* dots running out along the two edges */}
        {[78, 92, 106].map((v) => (
          <g key={v}>
            <circle cx={v} cy="8" r="1.6" fill={color} stroke="none" />
            <circle cx="8" cy={v} r="1.6" fill={color} stroke="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function TamilDivider({ width = 220, color = 'currentColor', className }) {
  return (
    <svg className={className} width={width} height={width * 0.15} viewBox="0 0 300 45" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1" strokeLinecap="round">
        <line x1="8" y1="22" x2="112" y2="22" />
        <line x1="188" y1="22" x2="292" y2="22" />
      </g>
      <path d={kolamDiamond(150, 22, 18)} stroke={color} strokeWidth="1" fill={color} fillOpacity=".22" />
      <path d={kolamDiamond(150, 22, 9)} stroke={color} strokeWidth="1" />
      <circle cx="150" cy="22" r="2.4" fill={color} />
      {[122, 132, 168, 178].map((x) => (
        <circle key={x} cx={x} cy="22" r="1.8" fill={color} />
      ))}
      <circle cx="8" cy="22" r="2.4" fill={color} />
      <circle cx="292" cy="22" r="2.4" fill={color} />
    </svg>
  );
}

// Kuthuvilakku (traditional oil lamp) with a small lamp on each side: the crest above the names.
function TamilFinial({ color = 'currentColor', className, width = 150 }) {
  const lamp = (
    <g>
      <path d="M0 -44C-6 -34 -6 -27 0 -22C6 -27 6 -34 0 -44Z" fill={color} fillOpacity=".45" />
      <path d="M-14 -20Q0 -8 14 -20Z" fill={color} fillOpacity=".2" />
      <path d="M0 -10V8" />
      <path d="M-14 28Q0 4 14 28Z" fill={color} fillOpacity=".2" />
      <path d="M-20 30H20" />
    </g>
  );
  return (
    <svg className={className} width={width} height={width * 0.6} viewBox="0 0 150 90" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(75 56)">{lamp}</g>
        <g transform="translate(28 68) scale(.62)">{lamp}</g>
        <g transform="translate(122 68) scale(.62)">{lamp}</g>
        <path d="M14 84Q75 92 136 84" />
      </g>
    </svg>
  );
}

// Border: temple steps on the lower line and a row of kolam diamonds between two fine lines.
function TamilBand({ color = 'currentColor', width = '100%', className }) {
  const patternId = `tband${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  return (
    <svg className={className} width={width} height={24} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={patternId} width="48" height="24" patternUnits="userSpaceOnUse">
          <g stroke={color} strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="0" y1="2" x2="48" y2="2" />
            <line x1="0" y1="22" x2="48" y2="22" />
            <path d={kolamDiamond(24, 12, 8)} fill={color} fillOpacity=".2" />
            <path d="M3 22L7 15L11 22" />
            <path d="M37 22L41 15L45 22" />
            <path d="M3 2L7 9L11 2" />
            <path d="M37 2L41 9L45 2" />
          </g>
          <circle cx="24" cy="12" r="1.8" fill={color} />
          <circle cx="0" cy="12" r="1.4" fill={color} />
        </pattern>
      </defs>
      <rect width="100%" height="24" fill={`url(#${patternId})`} />
    </svg>
  );
}

// Round kolam: rings of dots around a flower of curved diamonds.
function TamilMandala({ size = 180, color = 'currentColor', className }) {
  const ring = (count, radius, r) =>
    Array.from({ length: count }, (_, i) => {
      const a = (i / count) * Math.PI * 2;
      return <circle key={`${radius}-${i}`} cx={Math.cos(a) * radius} cy={Math.sin(a) * radius} r={r} fill={color} stroke="none" />;
    });
  const angles = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg className={className} width={size} height={size} viewBox="-100 -100 200 200" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1" strokeLinejoin="round">
        <circle r="96" />
        {ring(32, 90, 1.6)}
        {ring(24, 74, 2)}
        <g fill={color} fillOpacity=".12">
          {angles.map((a) => (
            <path key={a} transform={`rotate(${a})`} d={kolamDiamond(0, -48, 22)} />
          ))}
        </g>
        <g fill={color} fillOpacity=".24">
          {angles.map((a) => (
            <path key={a} transform={`rotate(${a + 22.5})`} d={kolamDiamond(0, -30, 11)} />
          ))}
        </g>
        <path d={kolamDiamond(0, 0, 16)} fill={color} fillOpacity=".3" />
        <circle r="3.5" fill={color} stroke="none" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Public components: they pick the set that matches the template      */
/* ------------------------------------------------------------------ */

function KandyanMandala({ size = 180, color = 'currentColor', className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="-100 -100 200 200" fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round">
        {lotusLayers(color)}
      </g>
    </svg>
  );
}

export function Mandala(props) {
  if (isTamil) return <TamilMandala {...props} />;
  return isKandyan ? <KandyanMandala {...props} /> : null;
}

export function Corner(props) {
  if (isTamil) return <TamilCorner {...props} />;
  return isKandyan ? <KandyanCorner {...props} /> : <WesternCorner {...props} />;
}

export function Divider(props) {
  if (isTamil) return <TamilDivider {...props} />;
  return isKandyan ? <KandyanDivider {...props} /> : <WesternDivider {...props} />;
}

export function Band(props) {
  if (isTamil) return <TamilBand {...props} />;
  return isKandyan ? <KandyanBand {...props} /> : null;
}

export function Finial(props) {
  if (isTamil) return <TamilFinial {...props} />;
  return isKandyan ? <KandyanFinial {...props} /> : null;
}
