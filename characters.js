/* Lingo World mascots: layered inline SVG (no external assets) */
const CHARS = {
  strawberry: { name: 'Berry the Strawberry', price: 0, base: '#ff94a6', stroke: '#e86f86', fy: 112, top: 50,
    clip: 'M100 52 C150 40 178 80 170 120 C162 160 125 188 100 188 C75 188 38 160 30 120 C22 80 50 40 100 52Z',
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${[[60,85],[140,85],[48,125],[152,125],[70,160],[130,160],[100,175],[100,70]].map(([x,y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="4.5" fill="#ffe08a"/>`).join('')}
      <path d="M100 56 Q70 48 64 62 Q86 66 100 58 Q114 66 136 62 Q130 48 100 56Z" fill="#7fd69a"/><path d="M100 58 L96 34 Q100 30 104 34Z" fill="#5cbf7c"/>` },
  avocado: { name: 'Avo the Avocado', price: 150, base: '#93d47c', stroke: '#62a84d', fy: 108, top: 42,
    clip: 'M100 38 C128 38 138 70 148 96 C166 138 152 188 100 188 C48 188 34 138 52 96 C62 70 72 38 100 38Z',
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      <path d="${c.clip}" fill="#e6f6b8" transform="translate(100 120) scale(.8) translate(-100 -120)"/>
      <circle cx="100" cy="152" r="22" fill="#c4925f"/><circle cx="93" cy="145" r="6" fill="#d8ab7c"/>` },
  peach: { name: 'Pea the Peach', price: 150, base: '#ffc6ab', stroke: '#f3a383', fy: 118, top: 52,
    clip: 'M100 50 C150 50 175 85 175 120 C175 160 140 188 100 188 C60 188 25 160 25 120 C25 85 50 50 100 50Z',
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      <circle cx="70" cy="85" r="26" fill="#fff" opacity=".22"/><path d="M100 54 Q84 88 96 118" stroke="${c.stroke}" stroke-width="3" fill="none" opacity=".6"/>
      <path d="M102 52 Q118 28 144 34 Q130 58 102 52Z" fill="#8fd68f"/>` },
  boba: { name: 'Bobo the Boba Tea', price: 180, base: '#f2d6b8', stroke: '#d4ae88', fy: 110, top: 54,
    clip: 'M46 72 L154 72 L141 184 Q100 192 59 184Z',
    draw: (f, c) => `<rect x="110" y="14" width="13" height="56" rx="5" fill="#ffa3c6" transform="rotate(12 116 40)"/>
      <path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${[[70,174],[88,178],[106,178],[124,174],[80,162],[98,165],[116,162],[132,164]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#7a5646"/>`).join('')}
      <path d="M42 72 Q100 34 158 72Z" fill="#fff" opacity=".75" stroke="#ddd" stroke-width="2"/><rect x="40" y="68" width="120" height="9" rx="4" fill="#fff" stroke="#ddd" stroke-width="2"/>` },
  dumpling: { name: 'Dumpy the Dumpling', price: 160, base: '#fbf3e4', stroke: '#d9c6a3', fy: 128, top: 66,
    clip: 'M25 160 C25 95 60 62 100 62 C140 62 175 95 175 160 C175 182 140 188 100 188 C60 188 25 182 25 160Z',
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${['M72 74 Q80 86 76 100', 'M88 66 Q94 80 90 96', 'M112 66 Q106 80 110 96', 'M128 74 Q120 86 124 100'].map(d => `<path d="${d}" stroke="${c.stroke}" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}` },
  sushi: { name: 'Suki the Sushi', price: 180, base: '#ffb08f', stroke: '#ddd6cc', fy: 138, top: 70,
    clip: 'M34 112 Q34 92 58 92 L142 92 Q166 92 166 112 L166 168 Q166 188 142 188 L58 188 Q34 188 34 168Z',
    draw: (f, c) => `<path d="${c.clip}" fill="#fff" stroke="${c.stroke}" stroke-width="3"/>
      <path d="M26 104 Q30 68 100 70 Q170 68 174 104 Q170 116 100 112 Q30 116 26 104Z" fill="${f}"/>
      ${['M60 76 Q66 92 58 108', 'M90 72 Q96 90 88 110', 'M120 72 Q126 90 118 110', 'M148 78 Q152 92 146 106'].map(d => `<path d="${d}" stroke="#fff" stroke-width="5" fill="none" opacity=".6" stroke-linecap="round"/>`).join('')}` },
  taco: { name: 'Tako the Taco', price: 170, base: '#ffe08f', stroke: '#e6bd55', fy: 130, top: 54,
    clip: 'M18 178 C18 104 58 62 100 62 C142 62 182 104 182 178Z',
    draw: (f, c) => `<path d="M26 128 Q34 68 100 52 Q166 68 174 128" stroke="#93dc93" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="20 4"/>
      <circle cx="66" cy="72" r="9" fill="#ff9191"/><circle cx="134" cy="72" r="9" fill="#ff9191"/>
      <path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${[[50,150],[150,150],[70,100],[130,100],[100,168]].map(([x,y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${c.stroke}" opacity=".5"/>`).join('')}` },
  croissant: { name: 'Coco the Croissant', price: 160, base: '#f7c680', stroke: '#d9a155', fy: 116, top: 72,
    clip: 'M18 150 C26 96 64 70 100 70 C136 70 174 96 182 150 C168 162 152 150 140 156 C122 170 78 170 60 156 C48 150 32 162 18 150Z',
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${['M62 82 Q74 120 62 156', 'M138 82 Q126 120 138 156', 'M40 104 Q50 128 40 150', 'M160 104 Q150 128 160 150'].map(d => `<path d="${d}" stroke="${c.stroke}" stroke-width="3" fill="none" opacity=".55"/>`).join('')}` },
};
// ---- more food mascots (added round 5) ----
const circ = (cx, cy, r) => `M${cx} ${cy - r} A${r} ${r} 0 1 1 ${cx - .01} ${cy - r}Z`;
const leaf = (x, y, rot = -20, col = '#8fd68f') => `<path transform="translate(${x} ${y}) rotate(${rot})" d="M0 0 Q14 -16 32 -6 Q16 8 0 0Z" fill="${col}"/>`;
const body = (f, c) => `<path d="${c.clip}" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>`;
Object.assign(CHARS, {
  banana: { name: 'Nana the Banana', price: 160, base: '#ffeb99', stroke: '#e8c552', fy: 112, top: 50,
    clip: 'M62 58 Q100 40 138 58 Q156 110 150 168 Q100 198 50 168 Q44 110 62 58Z',
    draw: (f, c) => `<rect x="93" y="30" width="14" height="20" rx="5" fill="#b8925e"/>${body(f, c)}<path d="M76 66 Q68 120 76 170 M124 66 Q132 120 124 170" stroke="${c.stroke}" stroke-width="2.5" fill="none" opacity=".6"/>` },
  cherry: { name: 'Chéri the Cherry', price: 150, base: '#ffa3b1', stroke: '#e5707f', fy: 122, top: 62,
    clip: circ(100, 125, 63),
    draw: (f, c) => `<path d="M100 64 Q104 30 128 12" stroke="#7fbf6a" stroke-width="5" fill="none" stroke-linecap="round"/>${leaf(122, 16, -10)}${body(f, c)}<ellipse cx="72" cy="96" rx="12" ry="18" fill="#fff" opacity=".35" transform="rotate(25 72 96)"/>` },
  watermelon: { name: 'Mel the Watermelon', price: 170, base: '#ffadbb', stroke: '#79c487', fy: 112, top: 78,
    clip: 'M18 80 L182 80 Q182 192 100 192 Q18 192 18 80Z',
    draw: (f, c) => `<path d="M18 80 Q18 192 100 192 Q182 192 182 80" fill="none" stroke="#9fdca8" stroke-width="16"/><path d="${c.clip}" fill="${f}" stroke="#79c487" stroke-width="3"/><path d="M30 84 Q32 176 100 178 Q168 176 170 84" fill="none" stroke="#f3fff0" stroke-width="5"/>
      ${[[46,100],[154,100],[60,150],[140,150],[100,165]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3" ry="5" fill="#5b4a5e"/>`).join('')}` },
  lemon: { name: 'Lulu the Lemon', price: 150, base: '#fff3a3', stroke: '#e8d060', fy: 116, top: 54,
    clip: 'M100 54 C150 54 176 88 180 118 C176 150 150 186 100 186 C50 186 24 150 20 118 C24 88 50 54 100 54Z',
    draw: (f, c) => `<ellipse cx="18" cy="118" rx="8" ry="10" fill="${f}" stroke="${c.stroke}" stroke-width="3"/><ellipse cx="182" cy="118" rx="8" ry="10" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>${body(f, c)}${leaf(100, 56, -40)}` },
  pineapple: { name: 'Pina the Pineapple', price: 190, base: '#ffdc7a', stroke: '#e3b347', fy: 126, top: 46,
    clip: 'M100 72 C140 72 162 100 162 132 C162 166 136 190 100 190 C64 190 38 166 38 132 C38 100 60 72 100 72Z',
    draw: (f, c) => `${['M100 76 L86 30 L98 50 L100 22 L104 50 L116 30Z', 'M100 78 L66 44 L92 62Z', 'M100 78 L134 44 L108 62Z'].map(d => `<path d="${d}" fill="#8fd68f" stroke="#6cbf72" stroke-width="2" stroke-linejoin="round"/>`).join('')}${body(f, c)}
      <clipPath id="lwPineC"><path d="${c.clip}"/></clipPath><g clip-path="url(#lwPineC)" opacity=".3" stroke="${c.stroke}" stroke-width="2.5">${[-60, -30, 0, 30, 60].map(o => `<path d="M${70 + o} 80 L${150 + o} 190 M${130 - o} 80 L${50 - o} 190"/>`).join('')}</g>` },
  grape: { name: 'Gigi the Grape', price: 160, base: '#d6c2ff', stroke: '#a68ee6', fy: 124, top: 62,
    clip: circ(100, 128, 60),
    draw: (f, c) => `<path d="M100 66 Q98 40 108 26" stroke="#9c7a5a" stroke-width="5" fill="none" stroke-linecap="round"/>${leaf(106, 32, -30)}${[[58, 80], [142, 80], [100, 70]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="22" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>`).join('')}${body(f, c)}<circle cx="76" cy="100" r="9" fill="#fff" opacity=".35"/>` },
  kiwi: { name: 'Kiki the Kiwi', price: 160, base: '#c9ee94', stroke: '#a37b55', fy: 116, top: 50,
    clip: circ(100, 120, 70),
    draw: (f, c) => `<path d="${c.clip}" fill="${f}" stroke="#b58a62" stroke-width="8"/><ellipse cx="100" cy="122" rx="20" ry="14" fill="#f5fbe2" opacity=".9"/>
      ${Array.from({ length: 16 }, (_, i) => { const a = i / 16 * Math.PI * 2, x = 100 + 56 * Math.cos(a), y = 120 + 56 * Math.sin(a); return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="2" ry="4" fill="#4a3c3c" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('')}` },
  mango: { name: 'Mango Tango', price: 170, base: '#ffcd80', stroke: '#eba24d', fy: 118, top: 52,
    clip: 'M110 50 C160 56 178 110 166 145 C154 180 120 192 92 188 C52 182 26 150 30 112 C34 76 70 46 110 50Z',
    draw: (f, c) => `${body(f, c)}<ellipse cx="136" cy="80" rx="26" ry="20" fill="#ff9f8f" opacity=".35"/>${leaf(108, 52, -50)}` },
  blueberry: { name: 'Bloo the Blueberry', price: 150, base: '#b5cbff', stroke: '#7f9ee8', fy: 124, top: 60,
    clip: circ(100, 124, 64),
    draw: (f, c) => `${body(f, c)}<path d="M100 64 l6 10 l11 -2 l-5 10 l7 8 l-11 1 l-3 11 l-5 -10 l-5 10 l-3 -11 l-11 -1 l7 -8 l-5 -10 l11 2Z" fill="#8ca8ee" transform="translate(0 -6) scale(1 .7) translate(0 30)"/><circle cx="72" cy="98" r="10" fill="#fff" opacity=".35"/>` },
  onigiri: { name: 'Oni the Onigiri', price: 170, base: '#fffdf7', stroke: '#ddd3c0', fy: 116, top: 48,
    clip: 'M100 40 C118 40 180 138 180 160 C180 184 160 188 100 188 C40 188 20 184 20 160 C20 138 82 40 100 40Z',
    draw: (f, c) => `${body(f, c)}<path d="M70 152 L130 152 L130 186 Q100 189 70 186Z" fill="#3e4a4a"/>` },
  mochi: { name: 'Mimi the Mochi', price: 160, base: '#ffdbe8', stroke: '#f0b0c8', fy: 130, top: 72,
    clip: 'M22 165 C22 105 58 70 100 70 C142 70 178 105 178 165 C178 186 140 190 100 190 C60 190 22 186 22 165Z',
    draw: (f, c) => `${body(f, c)}<ellipse cx="74" cy="92" rx="16" ry="8" fill="#fff" opacity=".45" transform="rotate(-20 74 92)"/>${[[60, 168], [140, 170], [100, 180], [40, 150], [160, 148]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}` },
  donut: { name: 'Dodo the Donut', price: 180, base: '#ffc0d8', stroke: '#e89ab8', fy: 130, top: 44,
    clip: circ(100, 118, 74),
    draw: (f, c) => `<path d="${circ(100, 118, 74)} ${circ(100, 70, 13)}" fill="#f6d09c" stroke="#d9a866" stroke-width="3" fill-rule="evenodd"/>
      <path d="M100 52 C140 50 166 74 168 106 C170 124 158 132 150 124 C142 140 128 128 120 142 C110 152 92 150 82 140 C72 132 60 142 52 128 C40 132 30 122 32 104 C36 72 62 52 100 52Z ${circ(100, 70, 15)}" fill="${f}" stroke="${c.stroke}" stroke-width="2.5" fill-rule="evenodd"/>
      ${[[64, 74, 30, '#9fd3ff'], [136, 74, -30, '#fff3a3'], [52, 104, 70, '#a9e8c8'], [150, 102, -60, '#c7b3ff'], [118, 52, 10, '#fff'], [82, 52, -15, '#a9e8c8']].map(([x, y, r, col]) => `<rect x="${x - 6}" y="${y - 2}" width="12" height="4" rx="2" fill="${col}" transform="rotate(${r} ${x} ${y})"/>`).join('')}` },
  cupcake: { name: 'Cuppy the Cupcake', price: 180, base: '#ffc8de', stroke: '#eea2c2', fy: 102, top: 44,
    clip: 'M30 124 C18 100 38 80 58 78 C60 52 88 40 108 50 C130 42 152 60 146 80 C168 84 184 104 170 124 L148 188 L52 188Z',
    draw: (f, c) => `<path d="M38 120 L162 120 L148 188 L52 188Z" fill="#cfe8ff" stroke="#9cc8ee" stroke-width="3" stroke-linejoin="round"/>${[66, 84, 100, 116, 134].map(x => `<path d="M${x} 124 L${x + (x - 100) * .12} 186" stroke="#9cc8ee" stroke-width="2.5"/>`).join('')}
      <path d="M30 124 C18 100 38 80 58 78 C60 52 88 40 108 50 C130 42 152 60 146 80 C168 84 184 104 170 124 Q100 136 30 124Z" fill="${f}" stroke="${c.stroke}" stroke-width="3"/><circle cx="104" cy="40" r="10" fill="#ff7f9a"/><path d="M104 30 Q108 18 116 14" stroke="#7fbf6a" stroke-width="3" fill="none"/>` },
  macaron: { name: 'Maca the Macaron', price: 170, base: '#c8f0dc', stroke: '#9bd6bb', fy: 90, top: 54,
    clip: 'M22 118 C22 74 58 52 100 52 C142 52 178 74 178 118 L178 140 C178 172 142 186 100 186 C58 186 22 172 22 140Z',
    draw: (f, c) => `<path d="M22 140 L178 140 C178 172 142 186 100 186 C58 186 22 172 22 140Z" fill="${f}" stroke="${c.stroke}" stroke-width="3"/><rect x="20" y="116" width="160" height="26" rx="13" fill="#fff6e6" stroke="#eadcc4" stroke-width="3"/>
      <path d="M22 118 C22 74 58 52 100 52 C142 52 178 74 178 118Z" fill="${f}" stroke="${c.stroke}" stroke-width="3"/><path d="M26 118 Q34 112 42 118 Q50 112 58 118 Q66 112 74 118 Q82 112 90 118 Q98 112 106 118 Q114 112 122 118 Q130 112 138 118 Q146 112 154 118 Q162 112 170 118" fill="none" stroke="${c.stroke}" stroke-width="2"/>` },
  eggtart: { name: 'Tarty the Egg Tart', price: 170, base: '#ffe27a', stroke: '#d9a055', fy: 134, top: 72,
    clip: 'M26 96 L174 96 L156 182 Q100 192 44 182Z',
    draw: (f, c) => `<path d="M26 96 L174 96 L156 182 Q100 192 44 182Z" fill="#f4c886" stroke="${c.stroke}" stroke-width="3" stroke-linejoin="round"/>${[44, 62, 80, 98, 116, 134, 152].map(x => `<path d="M${x + 4} 100 L${x + (x - 100) * -.1 + 4} 180" stroke="${c.stroke}" stroke-width="2" opacity=".45"/>`).join('')}
      <ellipse cx="100" cy="96" rx="78" ry="18" fill="#f4c886" stroke="${c.stroke}" stroke-width="3"/><ellipse cx="100" cy="94" rx="64" ry="12" fill="${f}"/><ellipse cx="80" cy="92" rx="8" ry="3" fill="#e9a94e" opacity=".6"/><ellipse cx="122" cy="96" rx="6" ry="2.5" fill="#e9a94e" opacity=".6"/>` },
  bao: { name: 'Bao Bao', price: 160, base: '#fff8ee', stroke: '#e2d3b8', fy: 130, top: 66,
    clip: 'M24 150 C24 92 60 66 100 66 C140 66 176 92 176 150 C176 180 140 190 100 190 C60 190 24 180 24 150Z',
    draw: (f, c) => `${body(f, c)}<path d="M84 80 Q100 62 116 80 M90 76 Q100 70 106 78 M70 90 Q84 78 92 74 M130 90 Q116 78 108 74" stroke="${c.stroke}" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="100" cy="74" r="4" fill="#ff9fb3"/>` },
  ramen: { name: 'Rami the Ramen', price: 220, base: '#ffd6e0', stroke: '#eaa8ba', fy: 138, top: 66,
    clip: 'M18 104 L182 104 C182 160 146 190 100 190 C54 190 18 160 18 104Z',
    draw: (f, c) => `<rect x="120" y="14" width="7" height="96" rx="3" fill="#d9b48a" transform="rotate(22 124 60)"/><rect x="134" y="16" width="7" height="96" rx="3" fill="#cfa77a" transform="rotate(30 138 60)"/>
      <path d="M26 104 Q34 78 56 84 Q66 70 84 80 Q100 66 116 80 Q134 70 146 84 Q168 80 174 104Z" fill="#ffe9a8"/><path d="M40 100 Q50 88 60 100 Q70 88 80 100 Q90 88 100 100 Q110 88 120 100 M70 96 Q80 84 90 96" stroke="#f2c86a" stroke-width="3" fill="none"/>
      <ellipse cx="62" cy="92" rx="16" ry="11" fill="#fff"/><ellipse cx="62" cy="93" rx="8" ry="6" fill="#ffc94d"/><circle cx="146" cy="92" r="11" fill="#fff" stroke="#ffb0c4" stroke-width="2"/><path d="M141 92 Q146 86 151 92 Q146 98 141 92" fill="none" stroke="#ff8fb0" stroke-width="2"/>
      ${body(f, c)}<path d="M30 116 L170 116" stroke="${c.stroke}" stroke-width="2.5"/>${[44, 156].map(x => `<path d="M${x - 8} 128 l8 8 l8 -8" stroke="${c.stroke}" stroke-width="2.5" fill="none"/>`).join('')}` },
  pancake: { name: 'Panny the Pancakes', price: 190, base: '#f8d094', stroke: '#d9a35f', fy: 126, top: 70,
    clip: 'M24 96 Q24 84 40 84 L160 84 Q176 84 176 96 L176 176 Q176 188 160 188 L40 188 Q24 188 24 176Z',
    draw: (f, c) => `${[150, 116, 82].map(y => `<rect x="24" y="${y}" width="152" height="38" rx="18" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>`).join('')}
      <path d="M34 92 Q100 76 166 92 Q168 104 156 104 Q150 124 142 104 Q100 110 60 104 Q54 120 46 104 Q32 104 34 92Z" fill="#f1a94c" opacity=".85"/><rect x="88" y="70" width="26" height="16" rx="4" fill="#fff4b8" stroke="#ead27a" stroke-width="2"/>` },
  cookie: { name: 'Chip the Cookie', price: 150, base: '#f4cd98', stroke: '#d29d5c', fy: 118, top: 52,
    clip: 'M100 50 C142 48 172 80 172 120 C172 160 142 190 100 190 C58 190 28 160 28 120 C28 80 58 52 100 50Z',
    draw: (f, c) => `${body(f, c)}${[[60, 82], [138, 78], [46, 128], [154, 130], [70, 166], [128, 168], [100, 64]].map(([x, y]) => `<path d="M${x} ${y - 6} q7 1 6 7 q-2 6 -8 4 q-5 -3 -4 -7 q1 -4 6 -4Z" fill="#7a5040"/>`).join('')}` },
  cheese: { name: 'Chez the Cheese', price: 160, base: '#ffe796', stroke: '#e7c35a', fy: 130, top: 72,
    clip: 'M20 100 L170 60 Q184 58 182 74 L182 176 Q182 188 170 188 L32 188 Q20 188 20 176Z',
    draw: (f, c) => `${body(f, c)}<path d="M20 100 L170 60 Q184 58 182 74 L182 92 L22 104Z" fill="#fff3bd" opacity=".7"/>${[[42, 170, 9], [160, 112, 8], [150, 170, 11], [36, 126, 6]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#f2cf63"/>`).join('')}` },
  carrot: { name: 'Caro the Carrot', price: 150, base: '#ffbb85', stroke: '#ec8f51', fy: 96, top: 54,
    clip: 'M40 70 Q100 56 160 70 Q152 130 108 190 Q100 196 92 190 Q48 130 40 70Z',
    draw: (f, c) => `${['M100 64 Q92 36 74 26', 'M100 64 Q100 30 100 18', 'M100 64 Q110 36 128 28'].map(d => `<path d="${d}" stroke="#86d08a" stroke-width="10" fill="none" stroke-linecap="round"/>`).join('')}${body(f, c)}${['M58 120 L74 118', 'M126 136 L142 134', 'M80 160 L94 158'].map(d => `<path d="${d}" stroke="${c.stroke}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`).join('')}` },
  broccoli: { name: 'Brocco Lee', price: 160, base: '#ade3a4', stroke: '#7cbf72', fy: 92, top: 44,
    clip: 'M40 112 C20 102 24 66 54 66 C58 40 90 34 104 48 C120 32 156 40 152 70 C178 72 184 108 160 116 L128 120 L132 186 Q100 192 68 186 L72 120Z',
    draw: (f, c) => `<path d="M72 112 L128 112 L132 186 Q100 192 68 186Z" fill="#dff3c6" stroke="#a9d68e" stroke-width="3"/><path d="M40 112 C20 102 24 66 54 66 C58 40 90 34 104 48 C120 32 156 40 152 70 C178 72 184 108 160 116 C150 132 50 132 40 112Z" fill="${f}" stroke="${c.stroke}" stroke-width="3"/>
      ${[[56, 80], [140, 76], [100, 54], [44, 104], [158, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="${c.stroke}" opacity=".35"/>`).join('')}` },
  corn: { name: 'Cornelia the Corn', price: 170, base: '#ffe885', stroke: '#e6c24e', fy: 106, top: 40,
    clip: 'M100 36 C138 36 150 80 150 120 C150 160 132 188 100 188 C68 188 50 160 50 120 C50 80 62 36 100 36Z',
    draw: (f, c) => `${body(f, c)}<clipPath id="lwCornC"><path d="${c.clip}"/></clipPath><g clip-path="url(#lwCornC)" opacity=".3" fill="${c.stroke}">${Array.from({ length: 30 }, (_, i) => { const x = 66 + (i % 5) * 17, y = 54 + Math.floor(i / 5) * 22; return `<ellipse cx="${x}" cy="${y}" rx="6" ry="8"/>`; }).join('')}</g>
      <path d="M50 130 Q36 170 92 192 Q60 160 62 120Z M150 130 Q164 170 108 192 Q140 160 138 120Z" fill="#9ddc8f" stroke="#7cbf72" stroke-width="2.5"/>` },
});

// ---- colors: light pastel shade families ----
const COLORS = {
  blush: { name: 'Blush', price: 40, fill: '#ffe0ea' }, pink: { name: 'Petal Pink', price: 40, fill: '#ffcade' }, rose: { name: 'Rose Milk', price: 40, fill: '#ffd3da' }, bubblegum: { name: 'Bubblegum', price: 50, fill: '#ffbcd6' },
  apricot: { name: 'Apricot', price: 40, fill: '#ffdcc6' }, peachy: { name: 'Peach Fuzz', price: 40, fill: '#ffcfb6' }, coral: { name: 'Soft Coral', price: 50, fill: '#ffc6b8' },
  butter: { name: 'Butter', price: 40, fill: '#fff2c0' }, lemon: { name: 'Lemon Cream', price: 40, fill: '#fff0a8' }, honey: { name: 'Honey', price: 50, fill: '#ffe4a8' },
  mint: { name: 'Mint', price: 40, fill: '#c9f3df' }, pistachio: { name: 'Pistachio', price: 40, fill: '#dcf3c8' }, seafoam: { name: 'Seafoam', price: 50, fill: '#bff0e2' },
  aqua: { name: 'Aqua', price: 40, fill: '#c0efea' }, teal: { name: 'Soft Teal', price: 50, fill: '#ade5de' },
  sky: { name: 'Sky', price: 40, fill: '#cce7ff' }, babyblue: { name: 'Baby Blue', price: 40, fill: '#dbeeff' }, ice: { name: 'Ice', price: 50, fill: '#e6f5ff' },
  midnight: { name: 'Periwinkle', price: 50, fill: '#c8cfff' }, cornflower: { name: 'Cornflower', price: 50, fill: '#bac8ff' },
  lavender: { name: 'Lavender', price: 40, fill: '#e0d4ff' }, lilac: { name: 'Lilac', price: 40, fill: '#ead8ff' }, orchid: { name: 'Orchid', price: 50, fill: '#f2d0f6' }, wisteria: { name: 'Wisteria', price: 50, fill: '#d8caf4' },
  cream: { name: 'Cream', price: 40, fill: '#fff7e4' }, vanilla: { name: 'Vanilla', price: 40, fill: '#fdf1da' }, latte: { name: 'Latte', price: 50, fill: '#f3e0ca' }, cloud: { name: 'Cloud', price: 40, fill: '#fbfbff' },
  cotton: { name: 'Cotton Candy', price: 120, grad: ['#ffcade', '#cce7ff'] }, sunset: { name: 'Sunset', price: 120, grad: ['#ffdcc6', '#ffcade', '#ead8ff'] },
  mermaid: { name: 'Mermaid', price: 120, grad: ['#bff0e2', '#c8cfff', '#f2d0f6'] },
  rainbow: { name: 'Rainbow', price: 150, grad: ['#ffc6d8', '#ffeaa8', '#c9f3df', '#cce7ff', '#e0d4ff'] },
  gold: { name: 'Shiny Gold', price: 200, grad: ['#fff6c8', '#ffe27a', '#f2c64a'] },
};
// ---- accessories: head & face only ----
const ACCS = {
  bow: { name: 'Pink Bow', slot: 'head', price: 30, draw: c => `<g transform="translate(128 ${c.top + 2}) rotate(15)"><path d="M0 0 L-22 -14 L-22 14Z M0 0 L22 -14 L22 14Z" fill="#ffa3cf" stroke="#f07fb2" stroke-width="2" stroke-linejoin="round"/><circle r="6" fill="#ffc4e2"/></g>` },
  beret: { name: 'Artist Beret', slot: 'head', price: 50, draw: c => `<ellipse cx="96" cy="${c.top}" rx="42" ry="14" fill="#ff9e9e"/><rect x="92" y="${c.top - 20}" width="6" height="10" rx="3" fill="#ff9e9e"/>` },
  party: { name: 'Party Hat', slot: 'head', price: 40, draw: c => `<path d="M80 ${c.top + 4} L100 ${c.top - 42} L120 ${c.top + 4}Z" fill="#b9a8ff"/><path d="M86 ${c.top - 10} L114 ${c.top - 10} M92 ${c.top - 26} L108 ${c.top - 26}" stroke="#ffd166" stroke-width="5"/><circle cx="100" cy="${c.top - 44}" r="7" fill="#ff5fa2"/>` },
  flowers: { name: 'Flower Crown', slot: 'head', price: 80, draw: c => [64, 82, 100, 118, 136].map((x, i) => { const y = c.top + 6 - (i === 2 ? 6 : i % 2 ? 4 : 0), col = ['#ff8fab', '#ffd166', '#c7b3ff', '#9fd3ff', '#ff8fab'][i];
      return `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${7 * Math.cos(a * Math.PI / 180)}" cy="${7 * Math.sin(a * Math.PI / 180)}" r="5.5" fill="${col}"/>`).join('')}<circle r="4" fill="#fff6c2"/></g>`; }).join('') },
  crown: { name: 'Royal Crown', slot: 'head', price: 150, draw: c => { const t = c.top; return `<path d="M70 ${t + 4} L70 ${t - 18} L85 ${t - 6} L100 ${t - 26} L115 ${t - 6} L130 ${t - 18} L130 ${t + 4}Z" fill="#ffd23f" stroke="#e0a800" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="${t - 4}" r="4" fill="#ff5fa2"/><circle cx="82" cy="${t - 2}" r="3" fill="#5bc0ff"/><circle cx="118" cy="${t - 2}" r="3" fill="#5bc0ff"/>`; } },
  catears: { name: 'Kitty Ears', slot: 'head', price: 60, draw: c => [[64, -1], [136, 1]].map(([x, s]) => `<path d="M${x - 16} ${c.top + 10} L${x + s * 2} ${c.top - 24} L${x + 16} ${c.top + 10}Z" fill="#e8dcff" stroke="#b9a8e8" stroke-width="3" stroke-linejoin="round"/><path d="M${x - 8} ${c.top + 6} L${x + s * 2} ${c.top - 12} L${x + 8} ${c.top + 6}Z" fill="#ffc6dc"/>`).join('') },
  bunnyears: { name: 'Bunny Ears', slot: 'head', price: 70, draw: c => [[78, -12], [122, 12]].map(([x, r]) => `<g transform="rotate(${r} ${x} ${c.top + 8})"><ellipse cx="${x}" cy="${c.top - 22}" rx="11" ry="30" fill="#fff" stroke="#e2d6ee" stroke-width="3"/><ellipse cx="${x}" cy="${c.top - 20}" rx="5" ry="20" fill="#ffd0e2"/></g>`).join('') },
  halo: { name: 'Angel Halo', slot: 'head', price: 90, draw: c => `<ellipse cx="100" cy="${c.top - 22}" rx="30" ry="8" fill="none" stroke="#ffe27a" stroke-width="6"/><ellipse cx="100" cy="${c.top - 22}" rx="30" ry="8" fill="none" stroke="#fff6c8" stroke-width="2"/>` },
  sprout: { name: 'Lucky Sprout', slot: 'head', price: 30, draw: c => `<path d="M100 ${c.top + 4} Q98 ${c.top - 10} 100 ${c.top - 20}" stroke="#7fbf6a" stroke-width="4" fill="none"/><path d="M100 ${c.top - 18} Q84 ${c.top - 34} 74 ${c.top - 22} Q88 ${c.top - 12} 100 ${c.top - 18}Z M100 ${c.top - 18} Q116 ${c.top - 34} 126 ${c.top - 22} Q112 ${c.top - 12} 100 ${c.top - 18}Z" fill="#a9e8a0" stroke="#7fbf6a" stroke-width="2"/>` },
  starclips: { name: 'Star Clips', slot: 'head', price: 40, draw: c => [[66, c.top + 14, -15], [134, c.top + 14, 15]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M0 -11 L3 -3 L11 -3 L5 2 L7 10 L0 5 L-7 10 L-5 2 L-11 -3 L-3 -3Z" fill="#ffe27a" stroke="#e8b84a" stroke-width="2" stroke-linejoin="round"/>`).join('') },
  headphones: { name: 'Comfy Headphones', slot: 'head', price: 110, draw: c => `<path d="M44 ${c.fy} Q44 ${c.top - 26} 100 ${c.top - 26} Q156 ${c.top - 26} 156 ${c.fy}" fill="none" stroke="#c8cfff" stroke-width="9" stroke-linecap="round"/><rect x="30" y="${c.fy - 18}" width="22" height="36" rx="10" fill="#ffc6dc" stroke="#e89ab8" stroke-width="2"/><rect x="148" y="${c.fy - 18}" width="22" height="36" rx="10" fill="#ffc6dc" stroke="#e89ab8" stroke-width="2"/>` },
  horns: { name: 'Lil Devil Horns', slot: 'head', price: 70, draw: c => [[72, -1], [128, 1]].map(([x, d]) => `<path d="M${x - 10} ${c.top + 8} Q${x + d * 4} ${c.top - 6} ${x + d * 10} ${c.top - 22} Q${x + d * 12} ${c.top - 2} ${x + 10} ${c.top + 8}Z" fill="#ffb0c4" stroke="#e8879f" stroke-width="2.5" stroke-linejoin="round"/>`).join('') },
  beanie: { name: 'Cozy Beanie', slot: 'head', price: 80, draw: c => `<path d="M58 ${c.top + 10} Q58 ${c.top - 30} 100 ${c.top - 30} Q142 ${c.top - 30} 142 ${c.top + 10}Z" fill="#c8cfff" stroke="#a3acec" stroke-width="2.5"/><rect x="54" y="${c.top}" width="92" height="14" rx="7" fill="#e0d4ff" stroke="#a3acec" stroke-width="2.5"/>${[66, 78, 90, 102, 114, 126, 136].map(x => `<path d="M${x} ${c.top + 3} v8" stroke="#a3acec" stroke-width="2"/>`).join('')}<circle cx="100" cy="${c.top - 32}" r="9" fill="#ffc9dc" stroke="#ec9ab8" stroke-width="2"/>` },
  chefhat: { name: 'Chef Hat', slot: 'head', price: 90, draw: c => `<rect x="74" y="${c.top - 12}" width="52" height="20" rx="4" fill="#fff" stroke="#ddd6cc" stroke-width="2.5"/><path d="M74 ${c.top - 10} C56 ${c.top - 14} 58 ${c.top - 42} 78 ${c.top - 38} C80 ${c.top - 56} 120 ${c.top - 56} 122 ${c.top - 38} C142 ${c.top - 42} 144 ${c.top - 14} 126 ${c.top - 10}Z" fill="#fff" stroke="#ddd6cc" stroke-width="2.5"/>` },
  cherryclips: { name: 'Cherry Clips', slot: 'head', price: 50, draw: c => [64, 136].map(x => `<path d="M${x - 4} ${c.top + 14} Q${x} ${c.top - 4} ${x + 6} ${c.top - 8} M${x + 6} ${c.top + 14} Q${x + 6} ${c.top} ${x + 6} ${c.top - 8}" stroke="#7fbf6a" stroke-width="2.5" fill="none"/><circle cx="${x - 4}" cy="${c.top + 16}" r="6" fill="#ff8fa6" stroke="#e56f86" stroke-width="2"/><circle cx="${x + 7}" cy="${c.top + 17}" r="6" fill="#ff8fa6" stroke="#e56f86" stroke-width="2"/>`).join('') },
  tophat: { name: 'Mini Top Hat', slot: 'head', price: 100, draw: c => `<g transform="rotate(-10 112 ${c.top})"><ellipse cx="112" cy="${c.top + 2}" rx="26" ry="7" fill="#9d8af0" stroke="#7e6ad6" stroke-width="2.5"/><rect x="96" y="${c.top - 30}" width="32" height="32" rx="4" fill="#b9a8ff" stroke="#7e6ad6" stroke-width="2.5"/><rect x="96" y="${c.top - 8}" width="32" height="7" fill="#ffc9dc"/></g>` },
  daisy: { name: 'Daisy Clip', slot: 'head', price: 40, draw: c => `<g transform="translate(134 ${c.top + 12})">${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse rx="4.5" ry="9" fill="#fff" stroke="#e8e0d0" stroke-width="1.5" transform="rotate(${a}) translate(0 -8)"/>`).join('')}<circle r="6" fill="#ffe27a" stroke="#e8b84a" stroke-width="1.5"/></g>` },
  tiara: { name: 'Sparkle Tiara', slot: 'head', price: 130, draw: c => { const t = c.top + 6; return `<path d="M68 ${t} Q100 ${t - 10} 132 ${t} L126 ${t - 10} L114 ${t - 6} L100 ${t - 24} L86 ${t - 6} L74 ${t - 10}Z" fill="#fff2c0" stroke="#e8c96a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="100" cy="${t - 12}" r="4.5" fill="#cce7ff" stroke="#8fc0ee" stroke-width="1.5"/><circle cx="80" cy="${t - 5}" r="2.5" fill="#ffc9dc"/><circle cx="120" cy="${t - 5}" r="2.5" fill="#ffc9dc"/>`; } },
  blushies: { name: 'Rosy Blush Stickers', slot: 'face', price: 30, draw: c => [62, 138].map(x => `<g transform="translate(${x} ${c.fy + 16})"><path d="M0 7 C-12 0 -9 -9 -4 -9 C-1 -9 0 -6 0 -5 C0 -6 1 -9 4 -9 C9 -9 12 0 0 7Z" fill="#ffadc6" opacity=".9"/><path d="M-3 -4 l2 -2" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></g>`).join('') },
  freckles: { name: 'Cute Freckles', slot: 'face', price: 25, draw: c => [[62, 0], [70, 4], [66, 8], [138, 0], [130, 4], [134, 8]].map(([x, d]) => `<circle cx="${x}" cy="${c.fy + 12 + d}" r="1.8" fill="#d99a7a"/>`).join('') },
  boba: { name: 'Boba Buddy (prop)', slot: 'prop', price: 90, draw: c => `<g transform="translate(166 ${c.fy + 26}) rotate(8)"><rect x="3" y="-34" width="5" height="22" rx="2" fill="#ffa3c6"/><path d="M-12 -14 L18 -14 L14 22 Q3 25 -8 22Z" fill="#f6e2cc" stroke="#d9b48f" stroke-width="2"/>${[[-4, 16], [4, 18], [10, 15], [0, 10], [8, 9]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#7a5646"/>`).join('')}<rect x="-14" y="-17" width="34" height="5" rx="2" fill="#fff" stroke="#ddd" stroke-width="1.5"/></g>` },
  balloon: { name: 'Heart Balloon (prop)', slot: 'prop', price: 70, draw: c => `<path d="M160 ${c.fy + 30} Q172 ${c.fy - 10} 166 ${c.top - 6}" stroke="#b9a8e8" stroke-width="1.6" fill="none"/><path transform="translate(166 ${c.top - 26})" d="M0 20 C-26 4 -20 -18 -8 -18 C-3 -18 0 -14 0 -11 C0 -14 3 -18 8 -18 C20 -18 26 4 0 20Z" fill="#ffc0d6" stroke="#ec9ab8" stroke-width="2"/><path d="M158 ${c.top - 38} q-4 4 -3 9" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>` },
  wand: { name: 'Star Wand (prop)', slot: 'prop', price: 110, draw: c => `<g transform="translate(164 ${c.fy + 34}) rotate(20)"><rect x="-2.5" y="-40" width="5" height="44" rx="2.5" fill="#e0d4ff" stroke="#b9a8e8" stroke-width="1.5"/><path d="M0 -60 L5 -49 L17 -48 L8 -40 L11 -28 L0 -34 L-11 -28 L-8 -40 L-17 -48 L-5 -49Z" fill="#fff2a8" stroke="#e8c96a" stroke-width="2" stroke-linejoin="round"/></g><path d="M178 ${c.fy - 26} l3 0 M179.5 ${c.fy - 27.5} l0 3 M150 ${c.fy - 34} l3 0 M151.5 ${c.fy - 35.5} l0 3" stroke="#e8c96a" stroke-width="1.6"/>` },
  glasses: { name: 'Round Glasses', slot: 'face', price: 40, draw: c => `<g fill="rgba(255,255,255,.25)" stroke="#2b2350" stroke-width="3"><circle cx="80" cy="${c.fy}" r="14"/><circle cx="120" cy="${c.fy}" r="14"/><path d="M94 ${c.fy} Q100 ${c.fy - 4} 106 ${c.fy}" fill="none"/></g>` },
  hearts: { name: 'Heart Shades', slot: 'face', price: 60, draw: c => [80, 120].map(x => `<path transform="translate(${x} ${c.fy - 2})" d="M0 12 C-20 0 -16 -14 -6 -14 C-2 -14 0 -10 0 -8 C0 -10 2 -14 6 -14 C16 -14 20 0 0 12Z" fill="#ff3d7f" stroke="#c2185b" stroke-width="2"/>`).join('') + `<path d="M92 ${c.fy - 6} H108" stroke="#c2185b" stroke-width="3"/>` },
  sunnies: { name: 'Cool Sunnies', slot: 'face', price: 70, draw: c => `<path d="M62 ${c.fy - 9} H96 V${c.fy + 1} Q96 ${c.fy + 11} 82 ${c.fy + 11} Q64 ${c.fy + 11} 62 ${c.fy}Z M104 ${c.fy - 9} H138 V${c.fy} Q136 ${c.fy + 11} 118 ${c.fy + 11} Q104 ${c.fy + 11} 104 ${c.fy + 1}Z" fill="#2b2350"/><path d="M96 ${c.fy - 6} H104" stroke="#2b2350" stroke-width="3"/><path d="M68 ${c.fy - 5} l6 0" stroke="#fff" stroke-width="2" opacity=".7"/>` },
};
// removed in round 5 (characters have no body): refunded once on load
const REMOVED_ITEMS = { outfits: { hoodie: 90, dress: 100, chef: 110, kimono: 130, overalls: 90, sweater: 80 }, accs: { scarf: 50, backpack: 80, wings: 150 } };

// Funny faces: hand-drawn rage-comic-style ink line art (original drawings), around the eye line y (=fy). Replace the default kawaii face.
const INK = '#1d1b26';
// ink(d, w, fill): a bold stroke plus a thin offset echo stroke, for a sketchy hand-drawn look
const ink = (d, w = 3, fill = 'none') => `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="${(w * .4).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" transform="translate(.9 .7)" opacity=".5"/>`;
const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}"/>`;
const eyeO = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="2.8"/><path d="M${x - r * .9} ${y - r * .45} A${r} ${r} 0 0 1 ${x + r * .7} ${y - r * .75}" fill="none" stroke="${INK}" stroke-width="1.2" transform="translate(.8 -1.2)" opacity=".6"/>`;
const tear = (x, y) => `<path d="M${x} ${y} Q${x - 4} ${y + 6} ${x} ${y + 9} Q${x + 4} ${y + 6} ${x} ${y}Z" fill="#7fd0ff" stroke="#3aa6e0" stroke-width="1.5"/>`;
const blush = y => `<ellipse cx="64" cy="${y + 14}" rx="8" ry="4.5" fill="#ff9fb8" opacity=".55"/><ellipse cx="136" cy="${y + 14}" rx="8" ry="4.5" fill="#ff9fb8" opacity=".55"/>`;
const FACES = {
  skeptic: { name: 'Are You Serious', price: 50, draw: y =>
    `<path d="M66 ${y - 4} L93 ${y - 1} Q88 ${y + 9} 78 ${y + 9} Q67 ${y + 8} 66 ${y - 4}Z" fill="#fff"/>${ink(`M66 ${y - 4} Q67 ${y + 8} 78 ${y + 9} Q88 ${y + 9} 93 ${y - 1}`, 2.8)}<path d="M75 ${y - 2.5} Q81 ${y + 6} 88 ${y - 1}Z" fill="${INK}"/>
    ${ink(`M62 ${y - 9} L90 ${y - 4} Q96 ${y - 8} 95 ${y - 16}`, 4)}
    <path d="M108 ${y} L134 ${y + 3} Q130 ${y + 12} 120 ${y + 12} Q109 ${y + 11} 108 ${y}Z" fill="#fff"/>${ink(`M108 ${y} Q109 ${y + 11} 120 ${y + 12} Q130 ${y + 12} 134 ${y + 3}`, 2.8)}<path d="M117 ${y + 1} Q123 ${y + 9} 130 ${y + 2.5}Z" fill="${INK}"/>
    ${ink(`M105 ${y - 4} L137 ${y + 2} M137 ${y + 2} Q140 ${y - 4} 138 ${y - 9}`, 4)}
    ${ink(`M84 ${y + 25} Q85 ${y + 21} 90 ${y + 21} L116 ${y + 25} L117 ${y + 30}`, 3.4)}${ink(`M91 ${y + 27} Q103 ${y + 26} 111 ${y + 30}`, 1.8)}
    ${ink(`M75 ${y + 16} Q70 ${y + 23} 75 ${y + 30} M127 ${y + 27} Q129 ${y + 33} 122 ${y + 37}`, 2.4)}` },
  derp: { name: 'Derp', price: 40, draw: y =>
    `${eyeO(78, y + 1, 12)}${dot(70.5, y + 1, 4.5)}${eyeO(121, y - 3, 13)}${dot(124, y - 11, 4.5)}
    ${ink(`M65 ${y - 9} Q76 ${y - 17} 89 ${y - 9} M108 ${y - 13} Q121 ${y - 22} 134 ${y - 12}`, 1.6)}
    ${ink(`M95 ${y + 16} Q95 ${y + 26} 103 ${y + 26} Q111 ${y + 26} 111 ${y + 15}`, 3.4)}` },
  smug: { name: 'Pfft, Sure', price: 50, draw: y =>
    `<ellipse cx="80" cy="${y}" rx="13" ry="9" fill="#fff" stroke="${INK}" stroke-width="2.8"/><ellipse cx="120" cy="${y}" rx="13" ry="9" fill="#fff" stroke="${INK}" stroke-width="2.8"/>
    <path d="M83 ${y - 1} Q88 ${y + 7} 93 ${y - 1}Z M123 ${y - 1} Q128 ${y + 7} 133 ${y - 1}Z" fill="${INK}"/>
    ${ink(`M66 ${y - 1} Q80 ${y - 4} 94 ${y - 1} M106 ${y - 1} Q120 ${y - 4} 134 ${y - 1}`, 3)}
    ${ink(`M84 ${y + 23} Q101 ${y + 24} 119 ${y + 18}`, 3.2)}` },
  heh: { name: 'I See What You Did', price: 50, draw: y =>
    `${ink(`M70 ${y - 12} Q78 ${y - 17} 87 ${y - 13} M113 ${y - 13} Q122 ${y - 17} 130 ${y - 12}`, 3.4)}
    <path d="M68 ${y} Q80 ${y - 8} 92 ${y - 1} Q80 ${y + 5} 68 ${y}Z M108 ${y - 1} Q120 ${y - 8} 132 ${y} Q120 ${y + 5} 108 ${y - 1}Z" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(86, y - 1, 3.4)}${dot(126, y - 1, 3.4)}
    <path d="M80 ${y + 14} Q100 ${y + 8} 122 ${y + 13} Q118 ${y + 34} 100 ${y + 34} Q84 ${y + 33} 80 ${y + 14}Z" fill="${INK}"/>
    <path d="M84 ${y + 15} Q100 ${y + 11} 118 ${y + 14} L117 ${y + 21} Q100 ${y + 18} 85 ${y + 22}Z" fill="#fff"/><path d="M90 ${y + 14} V${y + 21} M96 ${y + 13} V${y + 20} M102 ${y + 13} V${y + 19} M108 ${y + 13} V${y + 19} M113 ${y + 14} V${y + 20}" stroke="${INK}" stroke-width="1.4"/>
    ${ink(`M80 ${y + 14} Q100 ${y + 8} 122 ${y + 13} Q118 ${y + 34} 100 ${y + 34} Q84 ${y + 33} 80 ${y + 14}Z M75 ${y + 11} l3 4 M125 ${y + 10} l-3 4`, 2.6)}` },
  dude: { name: 'DUDE', price: 60, draw: y =>
    `${eyeO(78, y - 2, 14)}${eyeO(121, y - 2, 14)}${dot(82, y - 1, 8)}${dot(125, y - 1, 8)}<circle cx="85" cy="${y - 4}" r="2.5" fill="#fff"/><circle cx="128" cy="${y - 4}" r="2.5" fill="#fff"/>
    <path d="M96 ${y + 17} Q89 ${y + 21} 95 ${y + 26} Q102 ${y + 30} 105 ${y + 23} Q109 ${y + 17} 100 ${y + 16}Z" fill="#fff"/>${ink(`M96 ${y + 17} Q89 ${y + 21} 95 ${y + 26} Q102 ${y + 30} 105 ${y + 23} Q109 ${y + 17} 100 ${y + 16}Z M96 ${y + 22} Q100 ${y + 20} 103 ${y + 22}`, 2.6)}
    ${ink(`M64 ${y + 12} Q62 ${y + 20} 69 ${y + 25}`, 2)}` },
  sob: { name: 'Big Ugly Cry', price: 60, draw: y =>
    `${ink(`M64 ${y - 15} Q78 ${y - 10} 92 ${y - 17} M108 ${y - 17} Q122 ${y - 10} 136 ${y - 15}`, 3.6)}
    ${ink(`M66 ${y - 2} Q79 ${y + 5} 92 ${y - 4} M108 ${y - 4} Q121 ${y + 5} 134 ${y - 2} M71 ${y - 9} l5 4 M80 ${y - 11} l2 6 M129 ${y - 9} l-5 4 M120 ${y - 11} l-2 6`, 3)}
    <path d="M66 ${y + 2} Q59 ${y + 22} 63 ${y + 46} M134 ${y + 2} Q141 ${y + 22} 137 ${y + 46}" stroke="#4fc3f7" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="59" cy="${y - 4}" r="2.5" fill="#4fc3f7"/><circle cx="142" cy="${y - 5}" r="2.5" fill="#4fc3f7"/><circle cx="55" cy="${y + 2}" r="1.8" fill="#4fc3f7"/><circle cx="146" cy="${y + 1}" r="1.8" fill="#4fc3f7"/>
    <path d="M76 ${y + 10} Q100 ${y + 2} 124 ${y + 10} Q128 ${y + 40} 100 ${y + 42} Q72 ${y + 40} 76 ${y + 10}Z" fill="${INK}"/>
    <path d="M80 ${y + 11} Q100 ${y + 5} 120 ${y + 11} L118 ${y + 17} Q100 ${y + 12} 82 ${y + 17}Z M87 ${y + 37} Q100 ${y + 33} 113 ${y + 37} L111 ${y + 40} Q100 ${y + 42} 89 ${y + 40}Z" fill="#fff"/>
    ${ink(`M76 ${y + 10} Q100 ${y + 2} 124 ${y + 10} Q128 ${y + 40} 100 ${y + 42} Q72 ${y + 40} 76 ${y + 10}Z`, 2.6)}` },
  happytears: { name: 'So Much Win', price: 60, draw: y =>
    `${ink(`M67 ${y - 17} Q78 ${y - 21} 90 ${y - 14} M110 ${y - 14} Q122 ${y - 21} 133 ${y - 17}`, 3)}
    ${eyeO(80, y, 12)}${eyeO(120, y, 12)}${dot(80, y + 1, 8.5)}${dot(120, y + 1, 8.5)}<circle cx="83" cy="${y - 3}" r="3.4" fill="#fff"/><circle cx="77" cy="${y + 4}" r="1.6" fill="#fff"/><circle cx="123" cy="${y - 3}" r="3.4" fill="#fff"/><circle cx="117" cy="${y + 4}" r="1.6" fill="#fff"/>
    ${tear(70, y + 12)}${tear(130, y + 12)}
    <path d="M78 ${y + 16} Q100 ${y + 18} 124 ${y + 12} Q118 ${y + 37} 98 ${y + 37} Q82 ${y + 35} 78 ${y + 16}Z" fill="#fff"/>
    ${ink(`M78 ${y + 16} Q100 ${y + 18} 124 ${y + 12} Q118 ${y + 37} 98 ${y + 37} Q82 ${y + 35} 78 ${y + 16}Z`, 2.8)}${ink(`M81 ${y + 25} Q100 ${y + 29} 121 ${y + 22} M87 ${y + 18} V${y + 33} M94 ${y + 18} V${y + 35} M101 ${y + 18} V${y + 36} M108 ${y + 17} V${y + 35} M115 ${y + 15} V${y + 32}`, 1.5)}` },
  shock: { name: 'Oh Crap', price: 60, draw: y =>
    `${ink(`M65 ${y - 18} Q78 ${y - 23} 91 ${y - 17} M109 ${y - 17} Q122 ${y - 23} 135 ${y - 18} M97 ${y - 32} l2 8 M103 ${y - 33} l-1 9`, 3)}
    ${eyeO(79, y, 13)}${eyeO(121, y, 13)}${dot(80, y + 1, 2.6)}${dot(121, y + 1, 2.6)}
    <path d="M88 ${y + 21} Q100 ${y + 15} 113 ${y + 20} Q109 ${y + 32} 99 ${y + 31} Q90 ${y + 30} 88 ${y + 21}Z" fill="${INK}"/><path d="M91 ${y + 20} l3 5 l3 -6 l3 6 l3 -6 l3 6 l3 -5Z" fill="#fff"/>
    ${ink(`M88 ${y + 21} Q100 ${y + 15} 113 ${y + 20} Q109 ${y + 32} 99 ${y + 31} Q90 ${y + 30} 88 ${y + 21}Z`, 2.4)}${tear(60, y - 18)}${tear(141, y - 14)}${tear(66, y - 30)}` },
  thumbs: { name: 'Okay, Nice!', price: 70, draw: y =>
    `${eyeO(80, y, 10)}${eyeO(120, y, 10)}${dot(80, y, 4)}${dot(120, y, 4)}
    ${ink(`M78 ${y + 14} Q100 ${y + 34} 123 ${y + 12} M76 ${y + 12} l3 3 M125 ${y + 10} l-3 3`, 3.2)}
    <g transform="translate(152 ${y + 14})"><path d="M-10 0 h18 a5 5 0 0 1 0 6 a5 5 0 0 1 0 6 a5 5 0 0 1 0 6 h-18Z M-4 0 V-12 Q-4 -18 2 -17 Q5 -16 4 -9 L3 0" fill="#fff"/>${ink('M-10 0 h18 a5 5 0 0 1 0 6 a5 5 0 0 1 0 6 a5 5 0 0 1 0 6 h-18Z M-4 0 V-12 Q-4 -18 2 -17 Q5 -16 4 -9 L3 0', 2.4)}${ink('M-12 -22 l2 5 M-2 -28 v6 M8 -24 l-2 5', 1.8)}</g>` },
  trolly: { name: 'Mischief Grin', price: 80, draw: y =>
    `${ink(`M65 ${y - 9} L90 ${y - 4} M110 ${y - 13} Q122 ${y - 23} 135 ${y - 14}`, 4)}
    ${ink(`M69 ${y + 2} Q80 ${y - 4} 91 ${y + 2}`, 3)}${dot(85, y + 1, 3)}
    <ellipse cx="121" cy="${y - 2}" rx="11" ry="7" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(126, y - 1, 3.4)}${ink(`M110 ${y - 3} Q121 ${y - 6} 132 ${y - 3}`, 2)}
    <path d="M84 ${y + 20} Q104 ${y + 25} 126 ${y + 9} Q124 ${y + 25} 109 ${y + 29} Q95 ${y + 29} 84 ${y + 20}Z" fill="#fff"/>
    ${ink(`M84 ${y + 20} Q104 ${y + 25} 126 ${y + 9} Q124 ${y + 25} 109 ${y + 29} Q95 ${y + 29} 84 ${y + 20}Z M127 ${y + 6} q5 1 3 6`, 2.8)}${ink(`M108 ${y + 22} V${y + 28} M114 ${y + 19} V${y + 27} M119 ${y + 16} V${y + 24}`, 1.5)}` },
  rage: { name: 'FFFUUU Rage', price: 80, draw: y =>
    `${ink(`M63 ${y - 18} L92 ${y - 6} M137 ${y - 18} L108 ${y - 6}`, 5)}${ink(`M95 ${y - 36} l4 6 l-3 3 l5 6 M88 ${y - 28} l3 4`, 2)}
    ${eyeO(80, y + 1, 11)}${eyeO(120, y + 1, 11)}${dot(81, y + 2, 2.4)}${dot(119, y + 2, 2.4)}
    <path d="M74 ${y + 13} Q100 ${y + 5} 126 ${y + 13} L120 ${y + 45} Q100 ${y + 49} 80 ${y + 45}Z" fill="${INK}"/>
    <path d="M78 ${y + 14} Q100 ${y + 7} 122 ${y + 14} l-3 6 l-4 -4 l-4 6 l-4 -5 l-4 6 l-3 -6 l-4 6 l-4 -5 l-4 6 l-4 -6 l-3 5Z" fill="#fff"/>
    <path d="M84 ${y + 44} l3 -6 l4 4 l4 -6 l4 5 l4 -6 l4 5 l4 -6 l4 5 l3 -5 l2 6 Q100 ${y + 47} 84 ${y + 44}Z" fill="#fff"/>
    ${ink(`M74 ${y + 13} Q100 ${y + 5} 126 ${y + 13} L120 ${y + 45} Q100 ${y + 49} 80 ${y + 45}Z M68 ${y + 14} l4 6 M132 ${y + 14} l-4 6`, 2.6)}` },
  silly: { name: 'Herp Tongue', price: 40, draw: y =>
    `${eyeO(79, y, 12)}${eyeO(121, y, 12)}${dot(82, y - 6, 4)}${dot(124, y - 6, 4)}
    <path d="M94 ${y + 19} Q93 ${y + 33} 99 ${y + 33} Q105 ${y + 33} 104 ${y + 19}" fill="#ff9fb8"/>${ink(`M88 ${y + 18} Q100 ${y + 21} 113 ${y + 16} M94 ${y + 19} Q93 ${y + 33} 99 ${y + 33} Q105 ${y + 33} 104 ${y + 19}`, 2.8)}${ink(`M99 ${y + 22} V${y + 28}`, 1.4)}` },
  cat: { name: 'Kitty :3', price: 40, draw: y =>
    `${ink(`M71 ${y + 4} L79 ${y - 7} L87 ${y + 4} M113 ${y + 4} L121 ${y - 7} L129 ${y + 4}`, 3.2)}
    ${ink(`M87 ${y + 14} Q92 ${y + 25} 100 ${y + 15} Q108 ${y + 25} 113 ${y + 14}`, 3)}${blush(y)}` },
  hearts: { name: 'Heart Eyes', price: 70, draw: y => [80, 120].map(x => `<g transform="translate(${x} ${y - 1})">${ink('M0 9 C-16 0 -12 -11 -5 -11 C-2 -11 0 -8 0 -6 C0 -8 2 -11 5 -11 C12 -11 16 0 0 9Z', 2.6, '#ff6f9c')}</g>`).join('') +
    `<path d="M84 ${y + 13} Q100 ${y + 33} 116 ${y + 13}Z" fill="#fff"/>${ink(`M84 ${y + 13} Q100 ${y + 33} 116 ${y + 13}Z M84 ${y + 13} Q100 ${y + 19} 116 ${y + 13}`, 2.6)}${blush(y)}` },
  okay: { name: 'Okay… (sad)', price: 50, draw: y =>
    `${ink(`M66 ${y - 10} Q78 ${y - 8} 90 ${y - 14} M110 ${y - 14} Q122 ${y - 8} 134 ${y - 10}`, 3)}
    <ellipse cx="80" cy="${y + 1}" rx="9" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="120" cy="${y + 1}" rx="9" ry="8" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(80, y + 4, 3.4)}${dot(120, y + 4, 3.4)}
    ${ink(`M71 ${y - 3} Q80 ${y - 7} 89 ${y - 3} M111 ${y - 3} Q120 ${y - 7} 129 ${y - 3}`, 1.6)}${ink(`M93 ${y + 24} Q100 ${y + 20} 107 ${y + 24}`, 3)}` },
  nervous: { name: 'Uhh… Nervous', price: 50, draw: y =>
    `${ink(`M66 ${y - 14} Q76 ${y - 18} 89 ${y - 12} M111 ${y - 13} Q124 ${y - 20} 134 ${y - 15}`, 3)}
    ${eyeO(79, y, 11)}${eyeO(121, y, 12)}${dot(77, y + 1, 3.6)}${dot(119, y + 1, 3.6)}
    <path d="M84 ${y + 21} Q90 ${y + 16} 96 ${y + 21} Q102 ${y + 26} 108 ${y + 20} Q113 ${y + 16} 117 ${y + 21} L114 ${y + 26} Q100 ${y + 30} 86 ${y + 26}Z" fill="#fff"/>
    ${ink(`M84 ${y + 21} Q90 ${y + 16} 96 ${y + 21} Q102 ${y + 26} 108 ${y + 20} Q113 ${y + 16} 117 ${y + 21} L114 ${y + 26} Q100 ${y + 30} 86 ${y + 26}Z`, 2.6)}${ink(`M93 ${y + 22} v6 M101 ${y + 23} v6 M109 ${y + 21} v6`, 1.3)}${tear(140, y - 20)}` },
};
// ---- more meme-style ink faces (original drawings, no real people) ----
const star5 = (x, y, r) => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + (x + rr * Math.cos(a)).toFixed(1) + ' ' + (y + rr * Math.sin(a)).toFixed(1) + ' '; } return d + 'Z'; };
Object.assign(FACES, {
  notbad: { name: 'Not Bad', price: 60, draw: y =>
    `${ink(`M66 ${y - 14} Q78 ${y - 20} 91 ${y - 13} M109 ${y - 13} Q122 ${y - 20} 134 ${y - 14}`, 3.2)}
    <ellipse cx="80" cy="${y}" rx="10" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="120" cy="${y}" rx="10" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(80, y + 1, 3.2)}${dot(120, y + 1, 3.2)}
    ${ink(`M70 ${y - 4} Q80 ${y - 7} 90 ${y - 4} M110 ${y - 4} Q120 ${y - 7} 130 ${y - 4}`, 1.8)}
    ${ink(`M84 ${y + 26} Q92 ${y + 17} 100 ${y + 18} Q108 ${y + 17} 116 ${y + 26}`, 3.6)}${ink(`M92 ${y + 33} Q100 ${y + 36} 108 ${y + 33} M80 ${y + 22} l-2 6 M120 ${y + 22} l2 6`, 2)}` },
  poker: { name: 'Poker Face', price: 50, draw: y =>
    `${ink(`M66 ${y - 10} L92 ${y - 10} M108 ${y - 10} L134 ${y - 10}`, 3.4)}
    <ellipse cx="80" cy="${y + 1}" rx="10" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/><ellipse cx="120" cy="${y + 1}" rx="10" ry="6" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(80, y + 1, 3)}${dot(120, y + 1, 3)}
    ${ink(`M70 ${y - 3} L90 ${y - 3} M110 ${y - 3} L130 ${y - 3}`, 2.4)}${ink(`M82 ${y + 24} L118 ${y + 24}`, 3.4)}${ink(`M72 ${y + 14} Q70 ${y + 22} 74 ${y + 28} M128 ${y + 14} Q130 ${y + 22} 126 ${y + 28}`, 1.8)}` },
  yuno: { name: 'Y U NO', price: 70, draw: y =>
    `${ink(`M64 ${y - 18} L92 ${y - 8} M136 ${y - 18} L108 ${y - 8}`, 4.6)}
    ${eyeO(80, y + 1, 9)}${eyeO(120, y + 1, 9)}${dot(82, y + 2, 2.6)}${dot(118, y + 2, 2.6)}
    <ellipse cx="100" cy="${y + 30}" rx="17" ry="15" fill="${INK}"/><path d="M88 ${y + 38} Q100 ${y + 30} 112 ${y + 38} Q100 ${y + 46} 88 ${y + 38}Z" fill="#ff8fab"/><path d="M88 ${y + 20} Q100 ${y + 16} 112 ${y + 20} L110 ${y + 24} Q100 ${y + 21} 90 ${y + 24}Z" fill="#fff"/>
    ${ink(`M83 ${y + 30} Q83 ${y + 15} 100 ${y + 15} Q117 ${y + 15} 117 ${y + 30} Q117 ${y + 45} 100 ${y + 45} Q83 ${y + 45} 83 ${y + 30}Z`, 2.6)}<text x="100" y="${y - 30}" text-anchor="middle" font-size="13" font-weight="900" font-family="Comic Sans MS,Chalkboard SE,cursive" fill="${INK}">Y U NO</text>` },
  challenge: { name: 'Challenge Accepted', price: 80, draw: y =>
    `${ink(`M64 ${y - 8} L92 ${y - 4} M108 ${y - 4} L136 ${y - 10}`, 4)}
    <path d="M68 ${y - 1} L92 ${y + 1} Q86 ${y + 8} 78 ${y + 7} Q70 ${y + 6} 68 ${y - 1}Z M108 ${y + 1} L132 ${y - 1} Q130 ${y + 6} 122 ${y + 7} Q114 ${y + 8} 108 ${y + 1}Z" fill="#fff" stroke="${INK}" stroke-width="2.6"/>${dot(84, y + 3, 2.8)}${dot(116, y + 3, 2.8)}
    <path d="M74 ${y + 16} Q100 ${y + 22} 128 ${y + 12} Q122 ${y + 36} 100 ${y + 36} Q80 ${y + 34} 74 ${y + 16}Z" fill="#fff"/>
    ${ink(`M74 ${y + 16} Q100 ${y + 22} 128 ${y + 12} Q122 ${y + 36} 100 ${y + 36} Q80 ${y + 34} 74 ${y + 16}Z M77 ${y + 24} Q100 ${y + 30} 125 ${y + 21}`, 2.6)}${ink(`M86 ${y + 19} V${y + 33} M95 ${y + 20} V${y + 35} M104 ${y + 20} V${y + 35} M113 ${y + 18} V${y + 33} M68 ${y + 12} l4 6 M134 ${y + 8} l-4 6`, 1.5)}` },
  foreveralone: { name: 'Forever Alone', price: 70, draw: y =>
    `${ink(`M66 ${y - 10} Q78 ${y - 18} 90 ${y - 14} M110 ${y - 14} Q122 ${y - 18} 134 ${y - 10}`, 3)}
    <path d="M68 ${y - 2} Q80 ${y - 9} 92 ${y - 2} Q80 ${y + 4} 68 ${y - 2}Z M108 ${y - 2} Q120 ${y - 9} 132 ${y - 2} Q120 ${y + 4} 108 ${y - 2}Z" fill="#fff" stroke="${INK}" stroke-width="2.4"/>${dot(80, y - 2, 2.6)}${dot(120, y - 2, 2.6)}
    ${ink(`M70 ${y + 6} Q80 ${y + 9} 90 ${y + 6} M110 ${y + 6} Q120 ${y + 9} 130 ${y + 6}`, 1.4)}${tear(72, y + 8)}${tear(128, y + 8)}
    <path d="M72 ${y + 18} Q100 ${y + 26} 128 ${y + 18} Q124 ${y + 34} 100 ${y + 36} Q76 ${y + 34} 72 ${y + 18}Z" fill="#fff"/>
    ${ink(`M72 ${y + 18} Q100 ${y + 26} 128 ${y + 18} Q124 ${y + 34} 100 ${y + 36} Q76 ${y + 34} 72 ${y + 18}Z M74 ${y + 25} Q100 ${y + 31} 126 ${y + 25}`, 2.4)}${ink(`M82 ${y + 21} V${y + 32} M91 ${y + 22} V${y + 34} M100 ${y + 23} V${y + 35} M109 ${y + 22} V${y + 34} M118 ${y + 21} V${y + 32}`, 1.3)}` },
  megusta: { name: 'Mmm, I Like', price: 80, draw: y =>
    `${ink(`M64 ${y - 18} Q78 ${y - 22} 92 ${y - 16} M108 ${y - 16} Q122 ${y - 22} 136 ${y - 18}`, 3)}
    ${eyeO(79, y, 12)}${eyeO(121, y, 12)}<path d="M67 ${y - 1} Q79 ${y - 6} 91 ${y - 1} L91 ${y - 12} L67 ${y - 12}Z M109 ${y - 1} Q121 ${y - 6} 133 ${y - 1} L133 ${y - 12} L109 ${y - 12}Z" fill="#fff"/>${ink(`M67 ${y - 1} Q79 ${y - 6} 91 ${y - 1} M109 ${y - 1} Q121 ${y - 6} 133 ${y - 1}`, 2.8)}${dot(79, y + 4, 4)}${dot(121, y + 4, 4)}
    ${ink(`M68 ${y + 15} Q79 ${y + 19} 90 ${y + 15} M110 ${y + 15} Q121 ${y + 19} 132 ${y + 15} M70 ${y + 19} Q79 ${y + 22} 88 ${y + 19} M112 ${y + 19} Q121 ${y + 22} 130 ${y + 19}`, 1.4)}
    <path d="M88 ${y + 30} Q94 ${y + 24} 100 ${y + 28} Q106 ${y + 24} 112 ${y + 30} Q100 ${y + 36} 88 ${y + 30}Z" fill="#fff"/>${ink(`M88 ${y + 30} Q94 ${y + 24} 100 ${y + 28} Q106 ${y + 24} 112 ${y + 30} Q100 ${y + 36} 88 ${y + 30}Z M88 ${y + 30} L112 ${y + 30}`, 2.4)}` },
  cereal: { name: 'Spit-Take Shock', price: 80, draw: y =>
    `${ink(`M64 ${y - 18} Q78 ${y - 24} 91 ${y - 17} M109 ${y - 17} Q122 ${y - 24} 136 ${y - 18}`, 3)}
    ${eyeO(79, y, 13)}${eyeO(121, y, 13)}${dot(80, y, 2.4)}${dot(122, y, 2.4)}
    <ellipse cx="96" cy="${y + 28}" rx="11" ry="9" fill="${INK}"/>${ink(`M85 ${y + 28} Q85 ${y + 19} 96 ${y + 19} Q107 ${y + 19} 107 ${y + 28} Q107 ${y + 37} 96 ${y + 37} Q85 ${y + 37} 85 ${y + 28}Z`, 2.4)}
    <g fill="#fff" stroke="#9fd3ff" stroke-width="2">${[[118, y + 22, 4], [128, y + 30, 5], [140, y + 22, 3.5], [138, y + 36, 4], [150, y + 30, 3]].map(([a, b, r]) => `<circle cx="${a}" cy="${b}" r="${r}"/>`).join('')}</g>${ink(`M112 ${y + 26} l14 -4 M112 ${y + 30} l18 2 M110 ${y + 34} l12 6`, 1.6)}` },
  truestory: { name: 'True Story', price: 70, draw: y =>
    `<path d="M62 ${y - 8} H96 V${y + 1} Q95 ${y + 9} 82 ${y + 9} Q64 ${y + 9} 62 ${y}Z M104 ${y - 8} H138 V${y} Q136 ${y + 9} 118 ${y + 9} Q105 ${y + 9} 104 ${y + 1}Z" fill="${INK}"/>${ink(`M56 ${y - 8} H144`, 3)}<path d="M68 ${y - 4} l8 0 M110 ${y - 4} l8 0" stroke="#fff" stroke-width="2" opacity=".7"/>
    ${ink(`M84 ${y + 24} Q104 ${y + 28} 120 ${y + 16} M120 ${y + 16} l3 -3`, 3.2)}${ink(`M122 ${y + 22} q4 2 3 6`, 1.8)}` },
  lol: { name: 'LOL Laugh', price: 70, draw: y =>
    `${ink(`M68 ${y + 2} Q80 ${y - 10} 92 ${y + 2} M108 ${y + 2} Q120 ${y - 10} 132 ${y + 2} M66 ${y - 14} Q78 ${y - 20} 90 ${y - 16} M110 ${y - 16} Q122 ${y - 20} 134 ${y - 14}`, 3.2)}${tear(64, y + 6)}${tear(136, y + 6)}
    <path d="M70 ${y + 12} Q100 ${y + 8} 130 ${y + 12} Q128 ${y + 46} 100 ${y + 46} Q72 ${y + 46} 70 ${y + 12}Z" fill="${INK}"/><path d="M74 ${y + 13} Q100 ${y + 9} 126 ${y + 13} L125 ${y + 20} Q100 ${y + 17} 75 ${y + 20}Z" fill="#fff"/><path d="M86 ${y + 40} Q100 ${y + 32} 114 ${y + 40} Q100 ${y + 46} 86 ${y + 40}Z" fill="#ff8fab"/>
    ${ink(`M70 ${y + 12} Q100 ${y + 8} 130 ${y + 12} Q128 ${y + 46} 100 ${y + 46} Q72 ${y + 46} 70 ${y + 12}Z`, 2.6)}` },
  sleepy: { name: 'Sleepy Zzz', price: 50, draw: y =>
    `${ink(`M68 ${y} Q80 ${y + 8} 92 ${y} M108 ${y} Q120 ${y + 8} 132 ${y}`, 3.2)}${ink(`M70 ${y + 4} l-3 4 M80 ${y + 6} v5 M120 ${y + 6} v5 M130 ${y + 4} l3 4`, 1.5)}
    <ellipse cx="100" cy="${y + 24}" rx="6" ry="7" fill="#fff"/>${ink(`M94 ${y + 24} Q94 ${y + 17} 100 ${y + 17} Q106 ${y + 17} 106 ${y + 24} Q106 ${y + 31} 100 ${y + 31} Q94 ${y + 31} 94 ${y + 24}Z`, 2.6)}
    <text x="138" y="${y - 18}" font-size="16" font-weight="900" fill="#8f86c8" font-family="Comic Sans MS,cursive">z</text><text x="150" y="${y - 32}" font-size="12" font-weight="900" fill="#b3abe0" font-family="Comic Sans MS,cursive">z</text>${tear(110, y + 30)}` },
  starstruck: { name: 'Starstruck', price: 80, draw: y =>
    [80, 120].map(x => `<path d="${star5(x, y, 13)}" fill="#ffe27a" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`).join('') +
    `<path d="M82 ${y + 16} Q100 ${y + 38} 118 ${y + 16}Z" fill="#fff"/>${ink(`M82 ${y + 16} Q100 ${y + 38} 118 ${y + 16}Z`, 2.6)}<path d="M90 ${y + 26} Q100 ${y + 34} 110 ${y + 26} Q100 ${y + 30} 90 ${y + 26}Z" fill="#ff8fab"/>${blush(y)}` },
  sus: { name: 'Sus Squint', price: 60, draw: y =>
    `${ink(`M66 ${y - 6} L92 ${y - 2} M108 ${y - 8} Q120 ${y - 14} 134 ${y - 9}`, 3.6)}
    <path d="M68 ${y + 2} Q80 ${y - 2} 92 ${y + 2} Q80 ${y + 6} 68 ${y + 2}Z M108 ${y + 1} Q120 ${y - 3} 132 ${y + 1} Q120 ${y + 5} 108 ${y + 1}Z" fill="#fff" stroke="${INK}" stroke-width="2.4"/>${dot(72, y + 2, 2.6)}${dot(112, y + 1, 2.6)}
    ${ink(`M90 ${y + 24} Q100 ${y + 22} 112 ${y + 26}`, 3)}${ink(`M114 ${y + 24} l3 2`, 1.6)}` },
  wink: { name: 'Cheeky Wink', price: 50, draw: y =>
    `${ink(`M68 ${y + 2} Q80 ${y - 6} 92 ${y + 2} M66 ${y - 12} Q78 ${y - 16} 90 ${y - 12}`, 3.2)}${eyeO(120, y, 10)}${dot(121, y + 1, 4)}<circle cx="123" cy="${y - 2}" r="1.6" fill="#fff"/>${ink(`M110 ${y - 16} Q122 ${y - 22} 134 ${y - 15}`, 3)}
    ${ink(`M86 ${y + 18} Q102 ${y + 30} 118 ${y + 16}`, 3.2)}<path d="M104 ${y + 24} Q106 ${y + 34} 112 ${y + 33} Q117 ${y + 31} 114 ${y + 21}" fill="#ff9fb8"/>${ink(`M104 ${y + 24} Q106 ${y + 34} 112 ${y + 33} Q117 ${y + 31} 114 ${y + 21}`, 2.2)}${blush(y)}` },
});

// ---- pets: little buddies that sit next to the character (viewBox 0 0 100 100) ----
const PI_ = '#4a3f63';
const pf = (cx = 50, cy = 54, g = 10) => `<circle cx="${cx - g}" cy="${cy}" r="3.6" fill="${PI_}"/><circle cx="${cx + g}" cy="${cy}" r="3.6" fill="${PI_}"/><circle cx="${cx - g + 1.3}" cy="${cy - 1.4}" r="1.2" fill="#fff"/><circle cx="${cx + g + 1.3}" cy="${cy - 1.4}" r="1.2" fill="#fff"/>
  <ellipse cx="${cx - g - 6}" cy="${cy + 6}" rx="4.5" ry="2.6" fill="#ff9fb8" opacity=".6"/><ellipse cx="${cx + g + 6}" cy="${cy + 6}" rx="4.5" ry="2.6" fill="#ff9fb8" opacity=".6"/>
  <path d="M${cx - 4} ${cy + 6} Q${cx - 2} ${cy + 9} ${cx} ${cy + 6} Q${cx + 2} ${cy + 9} ${cx + 4} ${cy + 6}" stroke="${PI_}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
const P = (d, fill, st) => `<path d="${d}" fill="${fill}" stroke="${st}" stroke-width="2.5" stroke-linejoin="round"/>`;
const E = (cx, cy, rx, ry, fill, st) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}"${st ? ` stroke="${st}" stroke-width="2.5"` : ''}/>`;
const feet = (fill, st) => E(38, 92, 8, 5, fill, st) + E(62, 92, 8, 5, fill, st);
const PETS = {
  dino: { name: 'Dino', price: 120, draw: () => `${P('M70 80 Q92 80 96 64 Q90 74 72 70Z', '#b8ecc4', '#7fcf95')}${[[36, 26], [50, 21], [64, 26]].map(([x, y]) => P(`M${x - 6} ${y + 8} L${x} ${y - 4} L${x + 6} ${y + 8}Z`, '#ffd0a8', '#f0a878')).join('')}${E(50, 78, 22, 16, '#b8ecc4', '#7fcf95')}${E(50, 52, 26, 23, '#b8ecc4', '#7fcf95')}${E(50, 80, 12, 9, '#e6fbe9')}${feet('#b8ecc4', '#7fcf95')}${pf()}` },
  puppy: { name: 'Puppy', price: 120, draw: () => `${E(50, 78, 21, 15, '#f8e6cc', '#dcbf98')}${E(50, 52, 26, 23, '#f8e6cc', '#dcbf98')}${P('M28 36 Q14 44 20 66 Q30 64 32 46Z', '#d9b48f', '#bf9670')}${P('M72 36 Q86 44 80 66 Q70 64 68 46Z', '#d9b48f', '#bf9670')}${E(62, 46, 7, 6, '#ecd2b0')}${feet('#f8e6cc', '#dcbf98')}${pf()}${E(50, 58, 3.2, 2.4, PI_)}` },
  kitty: { name: 'Kitty', price: 120, draw: () => `${P('M70 84 Q94 82 90 58', 'none', '#b9aee0')}${P('M28 40 L30 18 L46 32Z', '#e6e0f6', '#b9aee0')}${P('M72 40 L70 18 L54 32Z', '#e6e0f6', '#b9aee0')}${P('M32 34 L32 24 L40 31Z', '#ffc6dc', 'none')}${P('M68 34 L68 24 L60 31Z', '#ffc6dc', 'none')}${E(50, 78, 21, 15, '#e6e0f6', '#b9aee0')}${E(50, 52, 26, 22, '#e6e0f6', '#b9aee0')}${feet('#e6e0f6', '#b9aee0')}${pf()}<path d="M22 56 L32 58 M22 62 L32 61 M78 56 L68 58 M78 62 L68 61" stroke="${PI_}" stroke-width="1.4" stroke-linecap="round"/>` },
  bunny: { name: 'Bunny', price: 120, draw: () => `${E(40, 20, 7, 18, '#fff', '#e2d6ee')}${E(60, 20, 7, 18, '#fff', '#e2d6ee')}${E(40, 21, 3, 12, '#ffd0e2')}${E(60, 21, 3, 12, '#ffd0e2')}${E(50, 78, 21, 15, '#fff', '#e2d6ee')}${E(50, 54, 25, 21, '#fff', '#e2d6ee')}${E(74, 84, 6, 6, '#fff', '#e2d6ee')}${feet('#fff', '#e2d6ee')}${pf()}` },
  hamster: { name: 'Hamster', price: 110, draw: () => `${E(30, 34, 7, 7, '#ffd9b3', '#ebb586')}${E(70, 34, 7, 7, '#ffd9b3', '#ebb586')}${E(50, 64, 30, 28, '#ffd9b3', '#ebb586')}${E(50, 74, 20, 16, '#fff6ea')}${E(32, 62, 8, 6, '#fff6ea')}${E(68, 62, 8, 6, '#fff6ea')}${feet('#ffd9b3', '#ebb586')}${pf(50, 54, 9)}` },
  panda: { name: 'Panda', price: 150, draw: () => `${E(30, 32, 8, 8, '#4a4458')}${E(70, 32, 8, 8, '#4a4458')}${E(50, 78, 21, 15, '#fff', '#d6d2e0')}${E(36, 84, 7, 8, '#4a4458')}${E(64, 84, 7, 8, '#4a4458')}${E(50, 52, 26, 22, '#fff', '#d6d2e0')}${E(39, 53, 7, 8, '#4a4458')}${E(61, 53, 7, 8, '#4a4458')}<circle cx="40" cy="52" r="2.6" fill="#fff"/><circle cx="60" cy="52" r="2.6" fill="#fff"/>${E(30, 60, 4.5, 2.6, '#ffb3c6')}${E(70, 60, 4.5, 2.6, '#ffb3c6')}${E(50, 60, 3, 2.2, '#4a4458')}` },
  penguin: { name: 'Penguin', price: 130, draw: () => `${E(50, 60, 27, 32, '#a9b8e4', '#8094cc')}${P('M24 56 Q14 70 22 80 Q28 72 28 62Z', '#a9b8e4', '#8094cc')}${P('M76 56 Q86 70 78 80 Q72 72 72 62Z', '#a9b8e4', '#8094cc')}${E(50, 66, 19, 24, '#fff')}${E(50, 46, 17, 13, '#fff')}${P('M45 58 L55 58 L50 64Z', '#ffbf6e', '#f29e44')}${feet('#ffbf6e', '#f29e44')}${pf(50, 50, 8).replace(/<path[^>]*\/>$/, '')}` },
  duckling: { name: 'Duckling', price: 110, draw: () => `${P('M48 26 Q46 14 54 12 Q52 20 56 24', '#fff0a0', '#e6cf5c')}${E(50, 76, 24, 17, '#fff3a8', '#e6cf5c')}${P('M70 70 Q84 66 80 80Z', '#fff3a8', '#e6cf5c')}${E(50, 50, 24, 22, '#fff3a8', '#e6cf5c')}${E(50, 60, 9, 4.5, '#ffbf6e', '#f29e44')}${feet('#ffbf6e', '#f29e44')}${pf(50, 50, 10).replace(/<path[^>]*\/>$/, '')}` },
  frog: { name: 'Froggy', price: 110, draw: () => `${E(50, 76, 24, 16, '#c4eca8', '#8fcf6e')}${E(50, 56, 28, 20, '#c4eca8', '#8fcf6e')}${E(34, 38, 11, 11, '#c4eca8', '#8fcf6e')}${E(66, 38, 11, 11, '#c4eca8', '#8fcf6e')}<circle cx="34" cy="38" r="5" fill="${PI_}"/><circle cx="66" cy="38" r="5" fill="${PI_}"/><circle cx="36" cy="36" r="1.8" fill="#fff"/><circle cx="68" cy="36" r="1.8" fill="#fff"/>
      ${E(28, 60, 5, 3, '#ff9fb8')}${E(72, 60, 5, 3, '#ff9fb8')}<path d="M38 60 Q50 70 62 60" stroke="${PI_}" stroke-width="2" fill="none" stroke-linecap="round"/>${E(50, 80, 13, 8, '#eafbe0')}${feet('#c4eca8', '#8fcf6e')}` },
  axolotl: { name: 'Axolotl', price: 160, draw: () => `${[[-1, 0], [1, 0]].map(([s]) => [36, 46, 56].map((y, i) => P(`M${50 + s * 24} ${y} Q${50 + s * (38 + (i === 1 ? 4 : 0))} ${y - 8} ${50 + s * 40} ${y + 2} Q${50 + s * 32} ${y + 4} ${50 + s * 24} ${y + 4}Z`, '#ff9fc0', '#ef7fa6')).join('')).join('')}${P('M68 82 Q92 86 94 70 Q84 78 70 74Z', '#ffd0e2', '#f0a8c4')}${E(50, 78, 21, 14, '#ffd0e2', '#f0a8c4')}${E(50, 52, 27, 21, '#ffd0e2', '#f0a8c4')}${feet('#ffd0e2', '#f0a8c4')}${pf(50, 52, 12)}` },
  fox: { name: 'Fox', price: 150, draw: () => `${P('M68 84 Q96 86 92 60 Q84 74 70 74Z', '#ffc79e', '#eea070')}<path d="M88 64 Q92 62 92 60 Q94 70 88 74Z" fill="#fff"/>${P('M26 42 L28 16 L46 32Z', '#ffc79e', '#eea070')}${P('M74 42 L72 16 L54 32Z', '#ffc79e', '#eea070')}${E(50, 78, 20, 15, '#ffc79e', '#eea070')}${E(50, 52, 27, 22, '#ffc79e', '#eea070')}${P('M24 56 Q38 52 50 66 Q62 52 76 56 Q72 74 50 74 Q28 74 24 56Z', '#fff4ea', 'none')}${feet('#ffc79e', '#eea070')}${pf()}${E(50, 60, 3, 2.2, PI_)}` },
  koala: { name: 'Koala', price: 140, draw: () => `${E(24, 40, 13, 13, '#dcdde8', '#aeb0c6')}${E(76, 40, 13, 13, '#dcdde8', '#aeb0c6')}${E(24, 40, 7, 7, '#fff')}${E(76, 40, 7, 7, '#fff')}${E(50, 78, 21, 15, '#dcdde8', '#aeb0c6')}${E(50, 54, 27, 22, '#dcdde8', '#aeb0c6')}${feet('#dcdde8', '#aeb0c6')}${pf(50, 52, 12).replace(/<path[^>]*\/>$/, '')}${E(50, 60, 6, 7, '#6f6884')}` },
  bear: { name: 'Bear Cub', price: 130, draw: () => `${E(30, 32, 9, 9, '#e6c8a8', '#c9a27e')}${E(70, 32, 9, 9, '#e6c8a8', '#c9a27e')}${E(30, 32, 4.5, 4.5, '#ffd6c8')}${E(70, 32, 4.5, 4.5, '#ffd6c8')}${E(50, 78, 21, 15, '#e6c8a8', '#c9a27e')}${E(50, 52, 26, 22, '#e6c8a8', '#c9a27e')}${E(50, 61, 10, 7, '#f8e8d6')}${feet('#e6c8a8', '#c9a27e')}${pf(50, 50, 10).replace(/<path[^>]*\/>$/, '')}${E(50, 58, 3.2, 2.4, PI_)}<path d="M47 63 Q50 66 53 63" stroke="${PI_}" stroke-width="1.6" fill="none"/>` },
  unicorn: { name: 'Unicorn', price: 200, draw: () => `${P('M50 34 L46 8 L56 32Z', '#ffe27a', '#e8b84a')}${E(50, 78, 21, 15, '#fff', '#e2d6ee')}${E(50, 54, 25, 22, '#fff', '#e2d6ee')}${P('M28 42 Q22 30 34 26 Q34 36 40 38Z', '#fff', '#e2d6ee')}${P('M30 30 Q40 20 52 30 Q44 34 36 46 Q26 46 30 30Z', '#ffc6dc', '#f0a0c0')}${P('M52 30 Q64 22 72 34 Q66 36 62 44 Q58 34 52 30Z', '#cce7ff', '#9cc8ee')}${P('M70 76 Q90 80 86 94 Q80 84 70 84Z', '#e0d4ff', '#bba8ee')}${feet('#fff', '#e2d6ee')}${pf(50, 56)}` },
  dragon: { name: 'Baby Dragon', price: 220, draw: () => `${P('M26 58 Q6 46 10 70 Q18 64 28 70Z', '#ffe0ea', '#f0a8c4')}${P('M74 58 Q94 46 90 70 Q82 64 72 70Z', '#ffe0ea', '#f0a8c4')}${P('M36 34 L32 18 L44 30Z', '#fff3c0', '#e8c97a')}${P('M64 34 L68 18 L56 30Z', '#fff3c0', '#e8c97a')}${E(50, 78, 21, 15, '#dccaff', '#b39ee8')}${E(50, 54, 25, 22, '#dccaff', '#b39ee8')}${E(50, 80, 11, 9, '#fff3c0')}${feet('#dccaff', '#b39ee8')}${pf()}<circle cx="44" cy="62" r="1" fill="${PI_}"/><circle cx="56" cy="62" r="1" fill="${PI_}"/>` },
  hedgehog: { name: 'Hedgehog', price: 130, draw: () => `${P(Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (0.95 + i * 1.1 / 12), r1 = 34, r2 = 26, a2 = a + 0.045 * Math.PI; return `${i ? 'L' : 'M'}${(50 + r1 * Math.cos(a)).toFixed(1)} ${(62 + r1 * Math.sin(a)).toFixed(1)} L${(50 + r2 * Math.cos(a2)).toFixed(1)} ${(62 + r2 * Math.sin(a2)).toFixed(1)}`; }).join(' ') + ' L84 70 L16 70Z', '#c9a27e', '#a47e5a')}${E(50, 66, 27, 22, '#f6e2c8', '#d9b48f')}${feet('#f6e2c8', '#d9b48f')}${pf(50, 62, 10)}${E(50, 68, 3, 2.2, PI_)}` },
  otter: { name: 'Otter', price: 150, draw: () => `${P('M68 84 Q90 92 94 76 Q84 82 70 78Z', '#ddbc9c', '#b8916c')}${E(28, 38, 6, 6, '#ddbc9c', '#b8916c')}${E(72, 38, 6, 6, '#ddbc9c', '#b8916c')}${E(50, 78, 21, 15, '#ddbc9c', '#b8916c')}${E(50, 54, 26, 21, '#ddbc9c', '#b8916c')}${E(50, 62, 15, 10, '#f8ecdc')}${feet('#ddbc9c', '#b8916c')}${pf(50, 52, 10).replace(/<path[^>]*\/>$/, '')}${E(50, 59, 3.4, 2.4, PI_)}<path d="M47 64 Q50 67 53 64 M32 60 L40 61 M32 65 L40 64 M68 60 L60 61 M68 65 L60 64" stroke="${PI_}" stroke-width="1.4" fill="none" stroke-linecap="round"/>` },
};
function petSVG(id, size = 60, cls = '') {
  const p = PETS[id]; if (!p) return '';
  return `<svg class="pet ${cls}" viewBox="0 0 100 100" width="${size}" height="${size}" role="img" aria-label="${p.name}">${p.draw()}</svg>`;
}

const SHOP_CATS = { chars: ['Characters', CHARS], colors: ['Colors', COLORS], faces: ['Faces', FACES], accs: ['Accessories', ACCS], pets: ['Pets', PETS] };

let _svgId = 0;
function face(fy, mood) {
  const eye = x => mood === 'cheer' ? `<path d="M${x - 8} ${fy + 3} Q${x} ${fy - 8} ${x + 8} ${fy + 3}" stroke="#2b2350" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="${fy}" rx="7" ry="9" fill="#2b2350"/><circle cx="${x + 3}" cy="${fy - 4}" r="2.6" fill="#fff"/>`;
  const mouth = mood === 'cheer' ? `<path d="M91 ${fy + 11} Q100 ${fy + 25} 109 ${fy + 11}Z" fill="#e8476b"/>`
    : mood === 'sad' ? `<ellipse cx="100" cy="${fy + 16}" rx="4" ry="5" fill="#e8476b"/>`
    : `<path d="M93 ${fy + 12} Q96.5 ${fy + 17} 100 ${fy + 12} Q103.5 ${fy + 17} 107 ${fy + 12}" stroke="#2b2350" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return eye(80) + eye(120) + `<ellipse cx="64" cy="${fy + 14}" rx="9" ry="5" fill="#ff8fab" opacity=".65"/><ellipse cx="136" cy="${fy + 14}" rx="9" ry="5" fill="#ff8fab" opacity=".65"/>` + mouth;
}
// eq = {char, color, face, acc:{head,face,prop}, pet}
function charSVG(eq, mood = 'happy', size = 120, cls = '') {
  const c = CHARS[eq.char] || CHARS.strawberry, id = 'lw' + (++_svgId), clip = `url(#${id}c)`;
  const col = eq.color && COLORS[eq.color];
  let defs = `<clipPath id="${id}c"><path d="${c.clip}"/></clipPath>`, fill = c.base;
  if (col && col.grad) { defs += `<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">${col.grad.map((g, i) => `<stop offset="${i / (col.grad.length - 1)}" stop-color="${g}"/>`).join('')}</linearGradient>`; fill = `url(#${id}g)`; }
  else if (col) fill = col.fill;
  const acc = eq.acc || {}, A = s => acc[s] && ACCS[acc[s]];
  const backs = ['back'].map(s => A(s) && A(s).back ? A(s).back(c) : '').join('');
  const fronts = ['back', 'neck', 'face', 'head', 'prop'].map(s => A(s) && A(s).draw ? A(s).draw(c, clip) : '').join('');
  return `<svg class="mascot ${cls}" viewBox="0 -20 200 215" width="${size}" height="${size}" role="img" aria-label="${c.name}"><defs>${defs}</defs>${backs}${c.draw(fill, c)}${eq.face && FACES[eq.face] ? `<g transform="translate(100 ${c.fy}) scale(1.15) translate(-100 ${-c.fy})">${FACES[eq.face].draw(c.fy)}</g>` : face(c.fy, mood)}${fronts}</svg>`;
}
