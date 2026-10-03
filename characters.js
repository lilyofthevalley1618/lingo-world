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
const COLORS = {
  pink: { name: 'Pastel Pink', price: 60, fill: '#ffb3d1' }, mint: { name: 'Mint', price: 60, fill: '#9fe6c8' },
  lavender: { name: 'Lavender', price: 60, fill: '#c7b3ff' }, sky: { name: 'Sky Blue', price: 60, fill: '#9fd3ff' },
  lemon: { name: 'Lemon', price: 60, fill: '#ffe066' }, midnight: { name: 'Periwinkle', price: 80, fill: '#a7b2ff' },
  rainbow: { name: 'Rainbow', price: 150, grad: ['#ff8fab', '#ffd166', '#9fe6c8', '#9fd3ff', '#c7b3ff'] },
  gold: { name: 'Shiny Gold', price: 200, grad: ['#fff1a8', '#ffd23f', '#e0a800'] },
};
// Outfits are clipped to the character's body so they fit any shape. y = top of outfit.
const OUTFITS = {
  hoodie: { name: 'Cozy Hoodie', price: 90, draw: y => `<rect x="0" y="${y}" width="200" height="120" fill="#ffb8dc"/><path d="M70 ${y} Q100 ${y + 16} 130 ${y}" stroke="#ffc2e0" stroke-width="6" fill="none"/>
      <rect x="72" y="${y + 24}" width="56" height="22" rx="8" fill="#ff9fcd"/><path d="M90 ${y + 4} v18 M110 ${y + 4} v18" stroke="#fff" stroke-width="3" stroke-linecap="round"/>` },
  dress: { name: 'Polka Dress', price: 100, draw: y => `<rect x="0" y="${y}" width="200" height="120" fill="#cdbcff"/>
      ${[[60,y+20],[100,y+30],[140,y+20],[80,y+46],[120,y+46],[50,y+50],[150,y+50]].map(([a,b]) => `<circle cx="${a}" cy="${b}" r="4" fill="#fff"/>`).join('')}
      <circle cx="90" cy="${y}" r="10" fill="#fff"/><circle cx="110" cy="${y}" r="10" fill="#fff"/>` },
  chef: { name: 'Chef Coat', price: 110, draw: y => `<rect x="0" y="${y}" width="200" height="120" fill="#fff" stroke="#ddd" stroke-width="2"/>
      ${[14, 30, 46].map(d => `<circle cx="88" cy="${y + d}" r="3.5" fill="#bbb"/><circle cx="112" cy="${y + d}" r="3.5" fill="#bbb"/>`).join('')}
      <path d="M84 ${y} L116 ${y} L100 ${y + 14}Z" fill="#ff8f8f"/>` },
  kimono: { name: 'Kimono Top', price: 130, draw: y => `<rect x="0" y="${y}" width="200" height="120" fill="#ffa3b8"/>
      ${[[50,y+24],[150,y+30],[70,y+56]].map(([a,b]) => `<circle cx="${a}" cy="${b}" r="5" fill="#ffd6e0"/>`).join('')}
      <path d="M66 ${y} L100 ${y + 38} M134 ${y} L100 ${y + 38}" stroke="#fff" stroke-width="8"/><rect x="0" y="${y + 34}" width="200" height="14" fill="#ffe3a0"/>` },
  overalls: { name: 'Denim Overalls', price: 90, draw: y => `<rect x="0" y="${y + 22}" width="200" height="120" fill="#a3c4ff"/><rect x="72" y="${y}" width="56" height="30" rx="4" fill="#a3c4ff"/>
      <circle cx="80" cy="${y + 6}" r="4" fill="#ffd166"/><circle cx="120" cy="${y + 6}" r="4" fill="#ffd166"/><rect x="88" y="${y + 10}" width="24" height="14" rx="3" fill="#8fb3f5"/>` },
  sweater: { name: 'Stripy Sweater', price: 80, draw: y => `<rect x="0" y="${y}" width="200" height="120" fill="#ffeeb0"/>
      ${[10, 30, 50, 70].map(d => `<rect x="0" y="${y + d}" width="200" height="8" fill="#ffb8c9"/>`).join('')}` },
};
// Accessories: one per slot (head, face, neck, back). draw(c, clipUrl) -> svg; back(c) drawn behind body.
const ACCS = {
  bow: { name: 'Pink Bow', slot: 'head', price: 30, draw: c => `<g transform="translate(128 ${c.top + 2}) rotate(15)"><path d="M0 0 L-22 -14 L-22 14Z M0 0 L22 -14 L22 14Z" fill="#ffa3cf" stroke="#f07fb2" stroke-width="2" stroke-linejoin="round"/><circle r="6" fill="#ffc4e2"/></g>` },
  beret: { name: 'Artist Beret', slot: 'head', price: 50, draw: c => `<ellipse cx="96" cy="${c.top}" rx="42" ry="14" fill="#ff9e9e"/><rect x="92" y="${c.top - 20}" width="6" height="10" rx="3" fill="#ff9e9e"/>` },
  party: { name: 'Party Hat', slot: 'head', price: 40, draw: c => `<path d="M80 ${c.top + 4} L100 ${c.top - 42} L120 ${c.top + 4}Z" fill="#b9a8ff"/><path d="M86 ${c.top - 10} L114 ${c.top - 10} M92 ${c.top - 26} L108 ${c.top - 26}" stroke="#ffd166" stroke-width="5"/><circle cx="100" cy="${c.top - 44}" r="7" fill="#ff5fa2"/>` },
  flowers: { name: 'Flower Crown', slot: 'head', price: 80, draw: c => [64, 82, 100, 118, 136].map((x, i) => { const y = c.top + 6 - (i === 2 ? 6 : i % 2 ? 4 : 0), col = ['#ff8fab', '#ffd166', '#c7b3ff', '#9fd3ff', '#ff8fab'][i];
      return `<g transform="translate(${x} ${y})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${7 * Math.cos(a * Math.PI / 180)}" cy="${7 * Math.sin(a * Math.PI / 180)}" r="5.5" fill="${col}"/>`).join('')}<circle r="4" fill="#fff6c2"/></g>`; }).join('') },
  crown: { name: 'Royal Crown', slot: 'head', price: 150, draw: c => { const t = c.top; return `<path d="M70 ${t + 4} L70 ${t - 18} L85 ${t - 6} L100 ${t - 26} L115 ${t - 6} L130 ${t - 18} L130 ${t + 4}Z" fill="#ffd23f" stroke="#e0a800" stroke-width="3" stroke-linejoin="round"/><circle cx="100" cy="${t - 4}" r="4" fill="#ff5fa2"/><circle cx="82" cy="${t - 2}" r="3" fill="#5bc0ff"/><circle cx="118" cy="${t - 2}" r="3" fill="#5bc0ff"/>`; } },
  glasses: { name: 'Round Glasses', slot: 'face', price: 40, draw: c => `<g fill="rgba(255,255,255,.25)" stroke="#2b2350" stroke-width="3"><circle cx="80" cy="${c.fy}" r="14"/><circle cx="120" cy="${c.fy}" r="14"/><path d="M94 ${c.fy} Q100 ${c.fy - 4} 106 ${c.fy}" fill="none"/></g>` },
  hearts: { name: 'Heart Shades', slot: 'face', price: 60, draw: c => [80, 120].map(x => `<path transform="translate(${x} ${c.fy - 2})" d="M0 12 C-20 0 -16 -14 -6 -14 C-2 -14 0 -10 0 -8 C0 -10 2 -14 6 -14 C16 -14 20 0 0 12Z" fill="#ff3d7f" stroke="#c2185b" stroke-width="2"/>`).join('') + `<path d="M92 ${c.fy - 6} H108" stroke="#c2185b" stroke-width="3"/>` },
  scarf: { name: 'Cozy Scarf', slot: 'neck', price: 50, draw: (c, clip) => `<g clip-path="${clip}"><rect x="0" y="${c.fy + 26}" width="200" height="14" fill="#ff9e9e"/><rect x="0" y="${c.fy + 31}" width="200" height="4" fill="#fff" opacity=".6"/></g>
      <rect x="118" y="${c.fy + 32}" width="14" height="34" rx="4" fill="#ff9e9e" transform="rotate(10 125 ${c.fy + 32})"/>` },
  backpack: { name: 'Mini Backpack', slot: 'back', price: 80, back: c => `<rect x="138" y="${c.fy - 10}" width="46" height="66" rx="14" fill="#b9a8ff"/><rect x="146" y="${c.fy + 20}" width="30" height="18" rx="6" fill="#d3c8ff"/>`,
    draw: (c, clip) => `<g clip-path="${clip}"><rect x="58" y="${c.fy + 18}" width="9" height="90" fill="#9d8af0"/><rect x="133" y="${c.fy + 18}" width="9" height="90" fill="#9d8af0"/></g>` },
  wings: { name: 'Angel Wings', slot: 'back', price: 150, back: c => [1, -1].map(s => `<path transform="translate(100 ${c.fy + 10}) scale(${s} 1)" d="M50 0 Q96 -40 98 -6 Q100 20 76 30 Q90 34 70 46 Q60 40 50 30Z" fill="#fff" stroke="#c9d6ff" stroke-width="3"/>`).join('') },
};

// Funny faces: original simple line-art expressions, drawn around the eye line y (=fy). Replace the default kawaii face.
const K = 'stroke="#2b2350" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
const blush = y => `<ellipse cx="64" cy="${y + 14}" rx="8" ry="4.5" fill="#ff9fb8" opacity=".6"/><ellipse cx="136" cy="${y + 14}" rx="8" ry="4.5" fill="#ff9fb8" opacity=".6"/>`;
const FACES = {
  skeptic: { name: 'Side-Eye Skeptic', price: 50, draw: y => `<path d="M66 ${y - 15} L92 ${y - 13}" ${K} fill="none"/><path d="M108 ${y - 13} Q120 ${y - 24} 134 ${y - 17}" ${K} fill="none"/>
    <ellipse cx="80" cy="${y}" rx="11" ry="7" fill="#fff" ${K}/><circle cx="87" cy="${y + 1}" r="3.5" fill="#2b2350"/><path d="M69 ${y - 2} H91" ${K}/>
    <ellipse cx="120" cy="${y}" rx="11" ry="7" fill="#fff" ${K}/><circle cx="127" cy="${y + 1}" r="3.5" fill="#2b2350"/><path d="M88 ${y + 20} Q98 ${y + 14} 114 ${y + 18}" ${K} fill="none"/>` },
  derp: { name: 'Derpy Googly', price: 40, draw: y => `<circle cx="78" cy="${y}" r="13" fill="#fff" ${K}/><circle cx="72" cy="${y + 5}" r="4" fill="#2b2350"/>
    <circle cx="122" cy="${y - 2}" r="8" fill="#fff" ${K}/><circle cx="126" cy="${y - 6}" r="3" fill="#2b2350"/><path d="M94 ${y + 18} Q100 ${y + 23} 106 ${y + 18}" ${K} fill="none"/>` },
  smug: { name: 'Smug Smirk', price: 50, draw: y => `<path d="M68 ${y - 11} Q80 ${y - 15} 92 ${y - 11} M108 ${y - 11} Q120 ${y - 15} 132 ${y - 11}" ${K} fill="none"/>
    <path d="M68 ${y} Q80 ${y + 9} 92 ${y}Z M108 ${y} Q120 ${y + 9} 132 ${y}Z" fill="#fff" ${K}/><circle cx="82" cy="${y + 3}" r="2.8" fill="#2b2350"/><circle cx="122" cy="${y + 3}" r="2.8" fill="#2b2350"/>
    <path d="M86 ${y + 18} Q102 ${y + 21} 114 ${y + 11}" ${K} fill="none"/>` },
  heh: { name: 'Toothy Heh', price: 50, draw: y => `<path d="M70 ${y + 2} Q80 ${y - 8} 90 ${y + 2} M110 ${y + 2} Q120 ${y - 8} 130 ${y + 2}" ${K} fill="none"/>
    <path d="M82 ${y + 12} Q100 ${y + 32} 118 ${y + 12}Z" fill="#fff" ${K}/><path d="M91 ${y + 13} V${y + 20} M100 ${y + 13} V${y + 22} M109 ${y + 13} V${y + 20}" stroke="#2b2350" stroke-width="2"/>` },
  dude: { name: 'DUDE Stare', price: 60, draw: y => `<circle cx="80" cy="${y - 2}" r="14" fill="#fff" ${K}/><circle cx="120" cy="${y - 2}" r="14" fill="#fff" ${K}/>
    <circle cx="80" cy="${y - 2}" r="2.5" fill="#2b2350"/><circle cx="120" cy="${y - 2}" r="2.5" fill="#2b2350"/><ellipse cx="100" cy="${y + 21}" rx="6" ry="5" fill="#ffb3c6" ${K}/><ellipse cx="100" cy="${y + 21}" rx="2" ry="1.5" fill="#2b2350"/>` },
  sob: { name: 'Big Sob', price: 60, draw: y => `<path d="M70 ${y - 6} L88 ${y - 1} L70 ${y + 4} M130 ${y - 6} L112 ${y - 1} L130 ${y + 4}" ${K} fill="none"/>
    <path d="M74 ${y + 6} Q69 ${y + 26} 74 ${y + 44} M126 ${y + 6} Q131 ${y + 26} 126 ${y + 44}" stroke="#7cc8ff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>
    <path d="M84 ${y + 12} Q100 ${y + 42} 116 ${y + 12} Q100 ${y + 18} 84 ${y + 12}Z" fill="#2b2350" ${K}/>` },
  happytears: { name: 'Happy Tears', price: 60, draw: y => `<path d="M70 ${y + 2} Q80 ${y - 8} 90 ${y + 2} M110 ${y + 2} Q120 ${y - 8} 130 ${y + 2}" ${K} fill="none"/>
    <path d="M67 ${y + 4} Q61 ${y + 14} 67 ${y + 19} Q73 ${y + 14} 67 ${y + 4}Z M133 ${y + 4} Q127 ${y + 14} 133 ${y + 19} Q139 ${y + 14} 133 ${y + 4}Z" fill="#9ad8ff" stroke="#5fb4ea" stroke-width="2"/>
    <path d="M86 ${y + 12} Q100 ${y + 30} 114 ${y + 12}Z" fill="#ff8fab" ${K}/>` },
  shock: { name: 'Shook & Sweaty', price: 60, draw: y => `<path d="M68 ${y - 16} Q80 ${y - 22} 92 ${y - 16} M108 ${y - 16} Q120 ${y - 22} 132 ${y - 16}" ${K} fill="none"/>
    <circle cx="80" cy="${y}" r="10" fill="#fff" ${K}/><circle cx="120" cy="${y}" r="10" fill="#fff" ${K}/><circle cx="80" cy="${y}" r="3.5" fill="#2b2350"/><circle cx="120" cy="${y}" r="3.5" fill="#2b2350"/>
    <ellipse cx="100" cy="${y + 21}" rx="7" ry="9" fill="#2b2350"/><path d="M142 ${y - 26} Q134 ${y - 12} 142 ${y - 7} Q150 ${y - 12} 142 ${y - 26}Z" fill="#9ad8ff" stroke="#5fb4ea" stroke-width="2"/>` },
  thumbs: { name: 'Thumbs-Up Sparkle', price: 70, draw: y => `<ellipse cx="80" cy="${y}" rx="9" ry="11" fill="#2b2350"/><ellipse cx="120" cy="${y}" rx="9" ry="11" fill="#2b2350"/>
    <circle cx="83" cy="${y - 4}" r="3" fill="#fff"/><circle cx="77" cy="${y + 4}" r="1.6" fill="#fff"/><circle cx="123" cy="${y - 4}" r="3" fill="#fff"/><circle cx="117" cy="${y + 4}" r="1.6" fill="#fff"/>
    <path d="M86 ${y + 13} Q100 ${y + 28} 114 ${y + 13}" ${K} fill="none"/>${blush(y)}
    <g transform="translate(150 ${y + 16})"><rect x="-9" y="0" width="18" height="16" rx="5" fill="#fff" ${K}/><path d="M-5 1 V-11 Q-5 -16 0 -16 Q5 -16 5 -11 V1" fill="#fff" ${K}/></g>` },
  trolly: { name: 'Mischief Grin', price: 80, draw: y => `<path d="M66 ${y - 14} L90 ${y - 6} M134 ${y - 14} L110 ${y - 6}" ${K} fill="none"/>
    <path d="M70 ${y} Q80 ${y - 5} 90 ${y + 1} M110 ${y + 1} Q120 ${y - 5} 130 ${y}" ${K} fill="none"/><circle cx="84" cy="${y + 2}" r="2.5" fill="#2b2350"/><circle cx="116" cy="${y + 2}" r="2.5" fill="#2b2350"/>
    <path d="M64 ${y + 8} Q100 ${y + 46} 136 ${y + 8} Q100 ${y + 20} 64 ${y + 8}Z" fill="#fff" ${K}/>
    <path d="M70 ${y + 16} Q100 ${y + 30} 130 ${y + 16} M80 ${y + 15} V${y + 28} M90 ${y + 17} V${y + 31} M100 ${y + 18} V${y + 33} M110 ${y + 17} V${y + 31} M120 ${y + 15} V${y + 28}" stroke="#2b2350" stroke-width="2" fill="none"/>` },
  rage: { name: 'RAGE Scream', price: 80, draw: y => `<path d="M64 ${y - 16} L90 ${y - 5} M136 ${y - 16} L110 ${y - 5}" stroke="#2b2350" stroke-width="4.5" stroke-linecap="round"/>
    <circle cx="82" cy="${y + 1}" r="3.5" fill="#2b2350"/><circle cx="118" cy="${y + 1}" r="3.5" fill="#2b2350"/>
    <path d="M76 ${y + 10} L124 ${y + 10} L115 ${y + 38} L85 ${y + 38}Z" fill="#2b2350" ${K}/><rect x="79" y="${y + 11}" width="42" height="6" fill="#fff"/><rect x="86" y="${y + 31}" width="28" height="5" fill="#fff"/>
    <path d="M136 ${y - 30} l7 7 m0 -7 l-7 7" stroke="#ff6b6b" stroke-width="3" stroke-linecap="round"/>` },
  silly: { name: 'Silly Tongue', price: 40, draw: y => `<path d="M70 ${y + 1} Q80 ${y - 6} 90 ${y + 1}" ${K} fill="none"/><ellipse cx="120" cy="${y}" rx="7" ry="9" fill="#2b2350"/><circle cx="123" cy="${y - 4}" r="2.5" fill="#fff"/>
    <path d="M86 ${y + 14} Q100 ${y + 22} 114 ${y + 14}" ${K} fill="none"/><path d="M95 ${y + 18} Q95 ${y + 32} 101.5 ${y + 32} Q108 ${y + 32} 108 ${y + 18}" fill="#ff8fab" ${K}/>${blush(y)}` },
  cat: { name: 'Kitty :3', price: 40, draw: y => `<ellipse cx="80" cy="${y}" rx="5" ry="6" fill="#2b2350"/><ellipse cx="120" cy="${y}" rx="5" ry="6" fill="#2b2350"/>
    <path d="M97 ${y + 8} L103 ${y + 8} L100 ${y + 11}Z" fill="#2b2350"/><path d="M90 ${y + 14} Q95 ${y + 20} 100 ${y + 13} Q105 ${y + 20} 110 ${y + 14}" ${K} fill="none"/>
    <path d="M58 ${y + 8} L74 ${y + 11} M58 ${y + 16} L74 ${y + 15} M142 ${y + 8} L126 ${y + 11} M142 ${y + 16} L126 ${y + 15}" stroke="#2b2350" stroke-width="2" stroke-linecap="round"/>${blush(y)}` },
  hearts: { name: 'Heart Eyes', price: 70, draw: y => [80, 120].map(x => `<path transform="translate(${x} ${y - 1})" d="M0 9 C-16 0 -12 -11 -5 -11 C-2 -11 0 -8 0 -6 C0 -8 2 -11 5 -11 C12 -11 16 0 0 9Z" fill="#ff6f9c" ${K}/>`).join('') +
    `<path d="M86 ${y + 12} Q100 ${y + 30} 114 ${y + 12}Z" fill="#ff8fab" ${K}/>${blush(y)}` },
};
const SHOP_CATS = { chars: ['Characters', CHARS], colors: ['Colors', COLORS], faces: ['Faces', FACES], outfits: ['Outfits', OUTFITS], accs: ['Accessories', ACCS] };

let _svgId = 0;
function face(fy, mood) {
  const eye = x => mood === 'cheer' ? `<path d="M${x - 8} ${fy + 3} Q${x} ${fy - 8} ${x + 8} ${fy + 3}" stroke="#2b2350" stroke-width="4" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${x}" cy="${fy}" rx="7" ry="9" fill="#2b2350"/><circle cx="${x + 3}" cy="${fy - 4}" r="2.6" fill="#fff"/>`;
  const mouth = mood === 'cheer' ? `<path d="M91 ${fy + 11} Q100 ${fy + 25} 109 ${fy + 11}Z" fill="#e8476b"/>`
    : mood === 'sad' ? `<ellipse cx="100" cy="${fy + 16}" rx="4" ry="5" fill="#e8476b"/>`
    : `<path d="M93 ${fy + 12} Q96.5 ${fy + 17} 100 ${fy + 12} Q103.5 ${fy + 17} 107 ${fy + 12}" stroke="#2b2350" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return eye(80) + eye(120) + `<ellipse cx="64" cy="${fy + 14}" rx="9" ry="5" fill="#ff8fab" opacity=".65"/><ellipse cx="136" cy="${fy + 14}" rx="9" ry="5" fill="#ff8fab" opacity=".65"/>` + mouth;
}
// eq = {char, color, face, outfit, acc:{head,face,neck,back}}
function charSVG(eq, mood = 'happy', size = 120, cls = '') {
  const c = CHARS[eq.char] || CHARS.strawberry, id = 'lw' + (++_svgId), clip = `url(#${id}c)`;
  const col = eq.color && COLORS[eq.color];
  let defs = `<clipPath id="${id}c"><path d="${c.clip}"/></clipPath>`, fill = c.base;
  if (col && col.grad) { defs += `<linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1">${col.grad.map((g, i) => `<stop offset="${i / (col.grad.length - 1)}" stop-color="${g}"/>`).join('')}</linearGradient>`; fill = `url(#${id}g)`; }
  else if (col) fill = col.fill;
  const acc = eq.acc || {}, A = s => acc[s] && ACCS[acc[s]];
  const backs = ['back'].map(s => A(s) && A(s).back ? A(s).back(c) : '').join('');
  const outfit = eq.outfit && OUTFITS[eq.outfit] ? `<g clip-path="${clip}">${OUTFITS[eq.outfit].draw(c.fy + 26)}</g>` : '';
  const fronts = ['back', 'neck', 'face', 'head'].map(s => A(s) && A(s).draw ? A(s).draw(c, clip) : '').join('');
  return `<svg class="mascot ${cls}" viewBox="0 -20 200 215" width="${size}" height="${size}" role="img" aria-label="${c.name}"><defs>${defs}</defs>${backs}${c.draw(fill, c)}${outfit}${eq.face && FACES[eq.face] ? FACES[eq.face].draw(c.fy) : face(c.fy, mood)}${fronts}</svg>`;
}
