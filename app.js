/* Lingo World: speaking-first language app. Vanilla JS, no dependencies. */
const LANGS = ['es', 'fr', 'zh', 'yue', 'ja', 'ko'];
const META = {
  es: ['🇪🇸', 'Spanish', 'Español', '#ffd3b8'], fr: ['🇫🇷', 'French', 'Français', '#bfe0ff'],
  zh: ['🇹🇼', 'Chinese (Taiwan)', '中文 · 臺灣華語', '#ffcde0'], yue: ['🇭🇰', 'Cantonese', '廣東話', '#ffeaa8'],
  ja: ['🇯🇵', 'Japanese', '日本語', '#ddd2ff'], ko: ['🇰🇷', 'Korean', '한국어', '#c4efe0'] };
const EMOJI = { Hello: '👋', 'Good morning': '🌅', 'Good afternoon': '☀️', 'Good evening': '🌆', 'Good night': '🌙', Goodbye: '👋', 'See you later': '🙋', 'How are you?': '🙂', "I'm fine": '😊', 'Thank you': '🙏', "You're welcome": '🤗', Please: '🥺', 'Excuse me': '🙋‍♀️', Sorry: '😔', 'Nice to meet you': '🤝',
  Zero: '0️⃣', One: '1️⃣', Two: '2️⃣', Three: '3️⃣', Four: '4️⃣', Five: '5️⃣', Six: '6️⃣', Seven: '7️⃣', Eight: '8️⃣', Nine: '9️⃣', Ten: '🔟', Eleven: '11', Twenty: '20', 'One hundred': '💯', 'One thousand': '1000',
  'Ice cream': '🍦', Potato: '🥔', 'Bubble tea': '🧋', Taxi: '🚕', 'MRT (metro)': '🚇', Bicycle: '🚲', Trash: '🗑️',
  Water: '💧', Bread: '🍞', Rice: '🍚', Apple: '🍎', Banana: '🍌', Egg: '🥚', Milk: '🥛', Coffee: '☕', Tea: '🍵', Meat: '🥩', Chicken: '🍗', Fish: '🐟', Vegetables: '🥦', Cheese: '🧀', Soup: '🍲',
  Red: '🔴', Blue: '🔵', Green: '🟢', Yellow: '🟡', Orange: '🟠', Purple: '🟣', Pink: '🌸', Black: '⚫', White: '⚪', Gray: '🩶', Brown: '🟤', Gold: '🥇', Silver: '🥈', Color: '🎨', Rainbow: '🌈',
  Family: '👨‍👩‍👧', Mother: '👩', Father: '👨', Parents: '👫', 'Older brother': '👦⬆️', 'Younger brother': '👦⬇️', 'Older sister': '👧⬆️', 'Younger sister': '👧⬇️', Grandmother: '👵', Grandfather: '👴', Son: '👦', Daughter: '👧', Husband: '🤵', Wife: '👰', Baby: '👶', Friend: '🧑‍🤝‍🧑',
  Yes: '✅', No: '❌', "What's your name?": '📛', 'My name is …': '🙋', "I don't understand": '🤔', 'Please speak slowly': '🐢', 'Do you speak English?': '🇬🇧', 'Where is the bathroom?': '🚻', 'How much is this?': '💰', "I'm hungry": '😋', "It's delicious!": '😍', "I don't know": '🤷', "Let's go!": '🏃', 'Good luck!': '🍀', 'Cheers!': '🥂' };
const NUMVAL = { Zero: 0, One: 1, Two: 2, Three: 3, Four: 4, Five: 5, Six: 6, Seven: 7, Eight: 8, Nine: 9, Ten: 10, Eleven: 11, Twenty: 20, 'One hundred': 100, 'One thousand': 1000 };
const QUIZ_LEN = 10, PER_TOPIC = 4;
const app = document.getElementById('app');
const cache = {};

/* ---------- saved progress ---------- */
const KEY = 'lingoWorld.v1';
const S = Object.assign({ xp: 0, streak: 0, lastDay: null, known: {}, best: {}, done: {}, srs: {}, blingos: 30, slow: false, owned: {}, equip: {} }, JSON.parse(localStorage.getItem(KEY) || '{}'));
S.owned = Object.assign({ chars: ['strawberry'], colors: [], outfits: [], accs: [], faces: [] }, S.owned);
S.lang = S.lang || null;
S.equip = Object.assign({ char: 'strawberry', color: null, outfit: null, face: null, acc: {} }, S.equip);
const save = () => localStorage.setItem(KEY, JSON.stringify(S));
const dayStr = d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
function liveStreak() { const y = new Date(); y.setDate(y.getDate() - 1); return (S.lastDay === dayStr(new Date()) || S.lastDay === dayStr(y)) ? S.streak : 0; }
function activity(xp) {
  const today = dayStr(new Date());
  if (S.lastDay !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    S.streak = S.lastDay === dayStr(y) ? S.streak + 1 : 1; S.lastDay = today;
    earn(5 + (S.streak % 7 === 0 ? 25 : 0), S.streak % 7 === 0 ? `🔥 ${S.streak}-day streak bonus!` : '🔥 daily streak');
  }
  S.xp += xp; save(); updateStats();
}
function earn(n, why) { if (!n) return; S.blingos += n; save(); updateStats(); toast(`<span class="coin">B</span> +${n} Blingos${why ? ' · ' + why : ''}`); }
function updateStats() {
  document.getElementById('streak').textContent = liveStreak();
  document.getElementById('xp').textContent = S.xp;
  document.getElementById('bl').textContent = S.blingos >= 100000 ? Math.floor(S.blingos / 1000) + 'k' : S.blingos;
  document.getElementById('avatar').innerHTML = charSVG(S.equip, 'happy', 40) + `<span class="lv">Lv${Math.floor(S.xp / 100) + 1}</span>`;
  document.getElementById('tabchar').innerHTML = charSVG(S.equip, 'happy', 30);
}
let toastT;
function toast(html) { const t = document.getElementById('toast'); t.innerHTML = html; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }

/* ---------- spaced repetition (Leitner boxes) ---------- */
const SRS_GAP = [10 * 60e3, 864e5, 3 * 864e5, 7 * 864e5, 14 * 864e5, 30 * 864e5];
function srsMark(code, w, ok) {
  const k = kKey(code, w.tid, w.i), had = S.srs[k], c = had || { box: 0 };
  c.box = ok ? Math.min(had ? c.box + 1 : 1, 5) : 0;
  c.due = Date.now() + (ok ? SRS_GAP[c.box] : 0);
  S.srs[k] = c; save();
}
const srsKeys = code => Object.keys(S.srs).filter(k => k.startsWith(code + '|'));
const dueKeys = code => srsKeys(code).filter(k => S.srs[k].due <= Date.now()).sort((a, b) => S.srs[a].due - S.srs[b].due);

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const rom = x => (x.r || '') + (S.zhuyin && x.z ? '\u2002' + x.z : '');
function split(t) { const m = t.match(/^(.*?)（(.+?)）$/); return m ? { main: m[1], kana: m[2] } : { main: t, kana: '' }; } // "水（みず）"
const kKey = (code, tid, i) => code + '|' + tid + '|' + i;
async function load(code) {
  if (!cache[code]) { const L = await (await fetch('data/' + code + '.json')).json(); L.color = META[code][3]; L.all = L.topics.flatMap(t => t.words.map((w, i) => ({ ...w, tid: t.id, i }))); cache[code] = L; }
  return cache[code];
}
const wordByKey = (L, k) => { const [, tid, i] = k.split('|'); return L.all.find(w => w.tid === tid && w.i === +i); };
const sayable = w => !w.t.includes('…') && !w.en.includes('…');
const mascot = (mood, size, cls) => charSVG(S.equip, mood, size, cls);

/* ---------- speech out (TTS) ---------- */
let voices = [];
const synth = window.speechSynthesis;
if (synth) { const lv = () => voices = synth.getVoices(); lv(); synth.onvoiceschanged = lv; }
const vnorm = v => v.lang.replace('_', '-').toLowerCase();
function pickVoice(lang) {
  const l = lang.toLowerCase(), exact = voices.find(v => vnorm(v) === l);
  if (exact) return exact;
  if (l === 'zh-hk') return voices.find(v => /yue|zh-hk|cantonese/i.test(vnorm(v) + ' ' + v.name)); // never fall back to Mandarin
  if (l === 'zh-tw') return voices.find(v => /zh-tw|taiwan/i.test(vnorm(v) + ' ' + v.name)) || voices.find(v => vnorm(v) === 'zh-cn' || vnorm(v) === 'zh-sg' || /^cmn/.test(vnorm(v))); // Mandarin only, never Cantonese
  return voices.find(v => vnorm(v).startsWith(l.slice(0, 2)));
}
function speak(text, lang, o = {}) {
  if (!synth || !text) { if (o.onend) o.onend(); return; }
  const s = split(text);
  const u = new SpeechSynthesisUtterance((s.kana || s.main).replace(/…/g, '').replace(/\s\/\s/g, ', '));
  u.lang = lang; u.rate = (o.slow ?? S.slow) ? 0.6 : 0.9;
  const v = pickVoice(lang); if (v) u.voice = v;
  if (o.onend) u.onend = o.onend;
  synth.cancel(); synth.speak(u);
}

/* ---------- speech in (recognition) ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
function listen(lang, { interim = false, onResult, onError, onEnd }) {
  if (!SR) return null;
  const rec = new SR(); rec.lang = lang; rec.interimResults = interim; rec.maxAlternatives = 5;
  rec.onresult = e => { const r = e.results[e.results.length - 1]; onResult([...r].map(a => a.transcript), r.isFinal); };
  rec.onerror = e => onError && onError(e.error);
  rec.onend = () => onEnd && onEnd();
  try { rec.start(); } catch (_) {}
  return rec;
}
const micMsg = err => err === 'not-allowed' || err === 'service-not-allowed' ? 'Microphone is blocked. Allow it in browser settings, or skip.' : err === 'language-not-supported' ? 'This browser can\'t recognize this language yet. Skip for now.' : 'Didn\'t catch that, tap the mic and try again!';

/* ---------- answer checking (lenient) ---------- */
const SYN = { mom: 'mother', mum: 'mother', dad: 'father', hi: 'hello', bye: 'goodbye', thanks: 'thank you', grey: 'gray', veggies: 'vegetables', restroom: 'bathroom', toilet: 'bathroom' };
function alts(str) {
  const out = [];
  for (let a of String(str).split('/')) { a = a.trim(); if (!a) continue; if (/\(.*?\)/.test(a)) { out.push(a.replace(/\s*\(.*?\)/g, '')); out.push(a.replace(/[()]/g, '')); } else out.push(a); }
  return out;
}
function nrm(s, lang) {
  s = String(s).toLowerCase().replace(/[’`]/g, "'").replace(/œ/g, 'oe').replace(/æ/g, 'ae').normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').trim();
  if (lang === 'en') {
    s = s.replace(/'m\b/g, ' am').replace(/n't\b/g, ' not').replace(/'re\b/g, ' are').replace(/'s\b/g, ' is');
    s = s.split(/\s+/).map(x => SYN[x.replace(/[^a-z]/g, '')] || x).join(' ').replace(/^(the|a|an|to) /, '');
  }
  s = s.replace(/[^\p{L}\p{N}]/gu, '');
  if (lang === 'ja') s = s.replace(/ou/g, 'o').replace(/([aiueo])\1/g, '$1');
  return s;
}
function lev(a, b) {
  const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
function judge(input, cands, lang) { // typed answers -> {ok, typo}
  const x = nrm(input, lang); if (!x) return { ok: false };
  let typo = false;
  for (const c of cands) {
    const y = nrm(c, lang); if (!y) continue;
    if (x === y) return { ok: true };
    const tol = y.length >= 8 ? 2 : y.length >= 4 ? 1 : 0;
    if (/^[a-z0-9]+$/.test(y) && lev(x, y) <= tol) typo = true;
  }
  return typo ? { ok: true, typo: true } : { ok: false };
}
const tCands = w => { const s = split(w.t), c = alts(s.main); if (s.kana) c.push(s.kana); if (w.r) c.push(...alts(w.r).map(r => r.replace(/[1-6]/g, ''))); return c; };
function similar(a, b) { const x = nrm(a), y = nrm(b); if (!x || !y) return 0; if (x.includes(y)) return 1; return 1 - lev(x, y) / Math.max(x.length, y.length); }
function spokenScore(heard, item) { // 0..1, lenient
  const cands = item.tiles ? [item.t, (item.r || '').replace(/[1-6]/g, '')] : tCands(item);
  if (!item.tiles && NUMVAL[item.en] != null && heard.some(h => h.replace(/\D/g, '') === String(NUMVAL[item.en]))) return 1;
  return Math.min(1, Math.max(0, ...heard.flatMap(h => cands.filter(Boolean).map(c => similar(h, c) + (/\d/.test(h) ? 0.2 : 0)))));
}
const PASS = 0.6;

/* ---------- views: language picker ---------- */
const GREET = ['Ready to practice speaking? 🗣️', 'Say it out loud, it sticks better! ✨', 'A few minutes a day keeps the streak alive 🔥', 'You\'re doing amazing! 💖', 'Let\'s learn something cute today 🌸'];
const level = () => Math.floor(S.xp / 100) + 1;
function langsView() {
  let html = `<section class="hero card"><div class="hero-m">${mascot('happy', 120, 'bob')}</div><div class="hero-t">
    <div class="bubble">${GREET[Math.floor(Math.random() * GREET.length)]}</div><p class="sub" style="margin:0">Pick a language to learn. You can switch any time.</p></div></section><div class="grid">`;
  for (const c of LANGS) {
    const [flag, name, native, color] = META[c];
    const done = Object.keys(S.done).filter(k => k.startsWith(c + '|')).length, due = dueKeys(c).length;
    html += `<a class="card lang ${S.lang === c ? 'sel' : ''}" style="--c:${color}" href="#/${c}"><span class="flag">${flag}</span><span class="nm">${name}</span><span class="nt">${native}</span>
      <div class="bar"><i style="width:${Math.round(done / 24 * 100)}%"></i></div><span class="nt">${done}/24 lessons${due ? ` · <b>${due} to review</b>` : ''}</span></a>`;
  }
  app.innerHTML = html + '</div>';
}

/* ---------- views: course path (soft wavy trail with lesson cards) ---------- */
const TOPIC_COLORS = { greetings: '#b7c0ff', numbers: '#a3e6d2', food: '#ffd0b3', colors: '#ffc6dd', family: '#d9ccff', phrases: '#ffe8a6' };
const LESSON_INFO = {
  greetings: [['Hello & times of day', '👋'], ['Goodbyes & how are you', '🙋'], ['Polite words', '🙏']],
  numbers: [['Counting 0–4', '🔢'], ['Counting 5–9', '🖐️'], ['Big numbers', '💯']],
  food: [['Basics & fruit', '🍎'], ['Breakfast & drinks', '☕'], ['Dinner time', '🍲']],
  colors: [['Rainbow colors', '🌈'], ['More colors', '🎨'], ['Shiny & special', '✨']],
  family: [['Parents & brothers', '👨‍👩‍👦'], ['Sisters & grandparents', '👵'], ['Partners & friends', '🧑‍🤝‍🧑']],
  phrases: [['Yes, no & names', '📛'], ['Getting around', '🗺️'], ['Fun phrases', '🥳']] };
const lessons = Object.fromEntries(Object.entries(LESSON_INFO).map(([k, v]) => [k, [...v, ['Treasure review', '🎁']]]));
const isDone = (code, id) => !!S.done[code + '|' + id];
const lessonOrder = L => L.topics.flatMap(t => [0, 1, 2, 3].map(k => t.id + '|' + k));
function isUnlocked(L, id) { const o = lessonOrder(L), i = o.indexOf(id); return i === 0 || (i > 0 && isDone(L.code, o[i - 1])); }
function ring(pct) {
  const r = 18, c = 2 * Math.PI * r;
  return `<svg class="ring" viewBox="0 0 48 48" width="54" height="54" aria-label="${pct}% complete"><circle cx="24" cy="24" r="${r}" fill="rgba(255,255,255,.6)" stroke="rgba(255,255,255,.75)" stroke-width="5"/>
    <circle cx="24" cy="24" r="${r}" fill="none" stroke="#5a64c8" stroke-width="5" stroke-linecap="round" stroke-dasharray="${c * pct / 100} ${c}" transform="rotate(-90 24 24)"/>
    <text x="24" y="28" text-anchor="middle" font-size="11" font-weight="800" fill="#36305c">${pct}%</text></svg>`;
}
function chestSVG(open) {
  return `<svg viewBox="0 0 64 56" width="64" height="56" aria-hidden="true"><rect x="6" y="24" width="52" height="28" rx="6" fill="#f7c08f" stroke="#d99a63" stroke-width="3"/>${open ? '<path d="M8 24 L14 6 L56 10 L56 24Z" fill="#ffd8ae" stroke="#d99a63" stroke-width="3" stroke-linejoin="round"/><circle cx="20" cy="18" r="4" fill="#ffe08f"/><circle cx="32" cy="16" r="4" fill="#ffe08f"/><circle cx="44" cy="18" r="4" fill="#ffe08f"/>' : '<path d="M6 24 Q6 8 22 8 L42 8 Q58 8 58 24Z" fill="#ffd8ae" stroke="#d99a63" stroke-width="3"/>'}<rect x="6" y="30" width="52" height="6" fill="#ffe08f"/><rect x="27" y="27" width="10" height="12" rx="3" fill="#ffd36e" stroke="#c9932e" stroke-width="2"/></svg>`;
}
async function langView(code) {
  const L = await load(code); S.lang = code; save(); setTabs();
  const order = lessonOrder(L), current = order.find(id => !isDone(code, id)), due = dueKeys(code).length;
  const noVoice = synth && voices.length && !pickVoice(L.speech);
  let html = `<div class="course-top"><a class="langchip" href="#/langs">${L.flag} ${META[code][1]} <span>▾</span></a>${code === 'zh' ? `<button class="zychip ${S.zhuyin ? 'on' : ''}" id="zy" title="Show Zhuyin (bopomofo) under pinyin">ㄅㄆㄇ ${S.zhuyin ? 'on' : 'off'}</button>` : ''}${due ? `<a class="duechip" href="#/${code}/practice/review">🔁 ${due} to review</a>` : ''}</div>
    ${noVoice ? `<div class="note">🔈 This device has no ${L.name} voice installed, so audio may be silent or sound wrong. ${code === 'yue' ? 'iPhone: Settings → Accessibility → Spoken Content → Voices → Chinese (Hong Kong). Android: Google Text-to-speech → install Cantonese (Hong Kong).' : 'You can add one in your device\'s text-to-speech settings.'}</div>` : ''}
    ${!SR ? '<div class="note">🎤 This browser can\'t check your speaking (try Chrome or Safari). You can still say things out loud and self-check.</div>' : ''}`;
  let y = 0, items = '', pts = [], n = 0;
  L.topics.forEach((t, ti) => {
    const col = TOPIC_COLORS[t.id], nDone = [0, 1, 2, 3].filter(k => isDone(code, t.id + '|' + k)).length;
    items += `<div class="sec-banner" style="top:${y}px;--c:${col}"><div class="sec-l"><div class="sec-n">Section ${ti + 1} · ${META[code][1]}</div><div class="sec-t">${t.icon} ${t.name}</div>
      <div class="sec-links"><a href="#/${code}/${t.id}/cards">🃏 Flashcards</a><a href="#/${code}/${t.id}/quiz">❓ Quiz</a></div></div>${ring(Math.round(nDone / PER_TOPIC * 100))}</div>`;
    y += 124;
    for (let k = 0; k < PER_TOPIC; k++) {
      const id = t.id + '|' + k, done = isDone(code, id), open = isUnlocked(L, id), cur = id === current, chest = k === 3, side = n++ % 2 ? 'right' : 'left';
      const [title, icon] = lessons[t.id][k], h = cur ? 128 : 112;
      pts.push([cur ? 50 : side === 'left' ? 30 : 70, y + h / 2]);
      const cls = `lcard ${cur ? 'current' : side}${done ? ' done' : ''}${!open ? ' locked' : ''}${chest ? ' chest' : ''}`;
      const inner = cur ? `<div class="lc-m">${mascot('happy', 82, 'bob')}</div><div class="lc-txt"><div class="lc-start">Start here</div><div class="lc-title">${title}</div></div><span class="timechip">⚡ ${chest ? 2 : 3} MIN</span>`
        : `<div class="lc-title">${title}</div><div class="lc-ico">${chest ? chestSVG(done) : icon}</div>${done ? '<span class="lc-done">★</span>' : ''}${!open ? '<span class="lc-lock">🔒</span>' : ''}`;
      const style = `top:${y}px;height:${h}px;--c:${col}`;
      items += open ? `<a class="${cls}" style="${style}" href="#/${code}/${t.id}/lesson/${k}">${inner}</a>` : `<div class="${cls}" style="${style}" title="Finish the card before to unlock">${inner}</div>`;
      y += h + 26;
    }
    y += 10;
  });
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let j = 1; j < pts.length; j++) { const [x0, y0] = pts[j - 1], [x1, y1] = pts[j], m = (y0 + y1) / 2; d += ` C${x0} ${m} ${x1} ${m} ${x1} ${y1}`; }
  html += `<div class="trail2" style="height:${y}px"><svg class="trail2-svg" viewBox="0 0 100 ${y}" preserveAspectRatio="none" width="100%" height="${y}" aria-hidden="true">
    <path d="${d}" fill="none" stroke="#ece4f8" stroke-width="30" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${d}" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 16" vector-effect="non-scaling-stroke"/></svg>${items}</div>
    <a class="talk-fab" href="#/${code}/practice/chat" title="Conversation practice">💬<span>Talk</span></a>`;
  app.innerHTML = html;
  if (document.getElementById('zy')) document.getElementById('zy').onclick = () => { S.zhuyin = !S.zhuyin; save(); langView(code); };
  const cur = app.querySelector('.lcard.current');
  if (cur && order.indexOf(current) > 1) setTimeout(() => cur.scrollIntoView({ block: 'center', behavior: 'smooth' }), 150);
}

/* ---------- practice hub (tab) ---------- */
async function practiceHub() {
  const code = S.lang || 'es', L = await load(code), due = dueKeys(code).length;
  app.innerHTML = `<div class="course-top"><a class="langchip" href="#/langs">${L.flag} ${META[code][1]} <span>▾</span></a></div>
    <h1>Practice</h1><p class="sub">Speaking first! Pick a way to practice.</p>
    <div class="practice">
      <a class="pcard big" style="--c:#ffc6dd" href="#/${code}/practice/chat"><span>💬</span><b>Conversation</b><small>Role-play real chats out loud</small></a>
      <a class="pcard" style="--c:#d9ccff" href="#/${code}/practice/shadow"><span>🗣️</span><b>Shadowing</b><small>Hear it, repeat it</small></a>
      <a class="pcard" style="--c:#ffd0b3" href="#/${code}/practice/fast"><span>⚡</span><b>Say it fast</b><small>Speed recall</small></a>
      <a class="pcard" style="--c:#a3e6d2" href="#/${code}/practice/review"><span>🔁</span><b>Review</b><small>${due ? due + ' words due' : 'All caught up'}</small></a>
      <a class="pcard" style="--c:#b7c0ff" href="#/${code}/all/quiz"><span>🎯</span><b>Quiz</b><small>Mixed topics</small></a></div>
    <h2>Flashcards</h2><div class="fc-list">${L.topics.map(t => `<a class="fc" style="--c:${TOPIC_COLORS[t.id]}" href="#/${code}/${t.id}/cards"><span>${t.icon}</span>${t.name}</a>`).join('')}</div>`;
}

/* ---------- profile (tab) ---------- */
function profile() {
  const total = LANGS.reduce((a, c) => a + Object.keys(S.done).filter(k => k.startsWith(c + '|')).length, 0);
  app.innerHTML = `<div class="stage card">${mascot('cheer', 140, 'bob')}<div><h1>Your profile</h1><div class="lvl">Level ${level()}</div>
      <div class="bar"><i style="width:${S.xp % 100}%"></i></div><div class="sub">${100 - S.xp % 100} XP to level ${level() + 1}</div></div></div>
    <div class="res-stats"><div><b>🔥 ${liveStreak()}</b><span>day streak</span></div><div><b>🏆 ${S.xp}</b><span>total XP</span></div><div><b><span class="coin">B</span> ${S.blingos.toLocaleString()}</b><span>Blingos</span></div><div><b>📚 ${total}</b><span>lessons</span></div></div>
    <h2>Languages</h2><div class="plist">${LANGS.map(c => { const d = Object.keys(S.done).filter(k => k.startsWith(c + '|')).length; return `<a class="prow" href="#/${c}"><span>${META[c][0]} ${META[c][1]}</span><div class="bar"><i style="width:${d / 24 * 100}%"></i></div><small>${d}/24</small></a>`; }).join('')}</div>
    <h2>Settings</h2><div class="card settings"><label class="chk"><input type="checkbox" id="slowset" ${S.slow ? 'checked' : ''}> 🐢 Slow audio by default</label><label class="chk"><input type="checkbox" id="zyset" ${S.zhuyin ? 'checked' : ''}> ㄅㄆㄇ Show Zhuyin for Chinese (Taiwan)</label>
      <div class="row"><a class="btn alt small" href="#/me">👗 My Character</a><a class="btn alt small" href="#/shop">🛍️ Shop</a></div></div>
    <p class="center"><button class="linkbtn" id="redeem">Redeem code</button></p>`;
  document.getElementById('slowset').onchange = e => { S.slow = e.target.checked; save(); };
  document.getElementById('zyset').onchange = e => { S.zhuyin = e.target.checked; save(); };
  document.getElementById('redeem').onclick = redeem;
}

/* ---------- conversation practice (role-play) ---------- */
// refs: 'w:topic:index' = word, 's:topic:index' = sentence. 'p' = partner line, 'u' = your reply (spoken).
const SCENES = [
  { id: 'meet', title: 'Meeting a new friend', icon: '🤝', partner: 'dumpling', turns: [['p', 'w:greetings:0'], ['u', 'w:greetings:0'], ['p', 'w:phrases:2'], ['u', 's:phrases:0'], ['p', 'w:greetings:14'], ['u', 'w:greetings:14'], ['p', 's:greetings:0'], ['u', 's:greetings:1'], ['p', 's:greetings:2'], ['u', 'w:greetings:5']] },
  { id: 'snack', title: 'Snack time', icon: '🍜', partner: 'taco', turns: [['p', 'w:phrases:9'], ['u', 'w:phrases:12'], ['p', 's:food:0'], ['u', 's:food:1'], ['p', 's:food:3'], ['u', 'w:phrases:10'], ['p', 'w:phrases:14'], ['u', 'w:phrases:14']] },
  { id: 'family', title: 'Family photos', icon: '📸', partner: 'peach', turns: [['p', 's:family:0'], ['u', 'w:greetings:14'], ['p', 's:numbers:2'], ['u', 's:family:3'], ['p', 's:family:2'], ['u', 'w:greetings:0']] },
  { id: 'city', title: 'Out in the city', icon: '🏙️', partner: 'sushi', turns: [['u', 'w:greetings:12'], ['p', 'w:phrases:0'], ['u', 's:phrases:1'], ['p', 'w:phrases:11'], ['u', 'w:greetings:9'], ['p', 'w:greetings:10']] },
];
async function chat(code, sceneId) {
  const L = await load(code), $ = id => document.getElementById(id);
  if (!sceneId) {
    app.innerHTML = `<a class="back" href="#/${code}">← ${META[code][1]}</a><h1>💬 Conversation practice</h1><p class="sub">Chat with a mascot friend. Listen to them, then say your reply out loud. +3 Blingos per spoken reply!</p>
      <div class="scenes">${SCENES.map(s => `<a class="scene card" href="#/${code}/practice/chat/${s.id}">${charSVG({ char: s.partner, acc: {} }, 'happy', 70)}<div><b>${s.icon} ${s.title}</b><small>${s.turns.filter(t => t[0] === 'u').length} replies to say</small></div></a>`).join('')}</div>`;
    return;
  }
  const sc = SCENES.find(s => s.id === sceneId); if (!sc) return go(`#/${code}/practice/chat`);
  const ref = r => { const [kind, tid, i] = r.split(':'), T = L.topics.find(t => t.id === tid); return kind === 'w' ? { ...T.words[+i], tid, i: +i } : T.sentences[+i]; };
  const turns = sc.turns.map(([who, r]) => ({ who, item: ref(r) })), partner = { char: sc.partner, acc: {} }, said = [];
  let ti = 0, spoke = 0;
  app.innerHTML = `<div class="lesson chatwrap"><div class="lbar"><a class="x" href="#/${code}/practice/chat" aria-label="Quit">✕</a><div class="progress"><i id="cprog" style="width:0%"></i></div><span class="hearts">💬</span></div>
    <div class="pill-label">${sc.icon} ${sc.title}</div><div class="chat" id="chat"></div></div><div class="checkbar" id="reply"></div>`;
  const chatEl = $('chat');
  chatEl.onclick = e => { const b = e.target.closest('[data-i]'); if (b) speak(said[+b.dataset.i], L.speech); };
  const bubble = (who, it, extra = '') => {
    const s = split(it.t); said.push(it.t);
    chatEl.insertAdjacentHTML('beforeend', `<div class="msg ${who}">${who === 'them' ? `<div class="av">${charSVG(partner, 'happy', 44)}</div>` : ''}<div class="bub"><div class="bt">${esc(s.main)}</div>${it.r ? `<div class="br">${esc(rom(it))}</div>` : ''}<div class="be">${esc(it.en)}</div>
      <button class="mini" data-i="${said.length - 1}" aria-label="Play">🔊</button>${extra}</div>${who === 'me' ? `<div class="av">${mascot('happy', 44)}</div>` : ''}</div>`);
    chatEl.lastElementChild.scrollIntoView({ block: 'end', behavior: 'smooth' });
  };
  const step = () => {
    $('cprog').style.width = (ti / turns.length * 100) + '%';
    if (ti >= turns.length) return end();
    const { who, item } = turns[ti];
    if (who === 'p') {
      $('reply').innerHTML = '<div class="checkbar-in"><div class="typing">💬 typing…</div></div>';
      bubble('them', item);
      let moved = false; const adv = () => { if (moved) return; moved = true; ti++; setTimeout(step, 350); };
      speak(item.t, L.speech, { onend: adv }); setTimeout(adv, 2200 + item.t.length * 90);
      return;
    }
    const s = split(item.t);
    $('reply').innerHTML = `<div class="checkbar-in col"><div class="yourturn"><div class="pill-label">Your turn · say:</div><div class="yt-t">${esc(s.main)}</div>${item.r ? `<div class="br">${esc(rom(item))}</div>` : ''}<div class="be">${esc(item.en)}</div><div id="heard" class="sub"></div></div>
      <div class="row center-row"><button class="spk" id="hear" title="Hear it">🔊</button>${SR ? '<button class="mic sm" id="mic">🎤</button>' : '<button class="bigbtn" id="self">I SAID IT ✓</button>'}<button class="roundbtn" id="skipc" title="Skip">⏭</button></div></div>`;
    $('hear').onclick = () => speak(item.t, L.speech);
    const ok = (pct) => { bubble('me', item, pct != null ? `<span class="okchip">✓ ${pct}%</span>` : ''); ti++; step(); };
    $('skipc').onclick = () => ok(null);
    if ($('self')) $('self').onclick = () => { earn(1, '💬 practice'); ok(null); };
    if ($('mic')) $('mic').onclick = () => {
      if (synth) synth.cancel();
      $('mic').classList.add('on'); $('heard').textContent = 'Listening…';
      listen(L.speech, {
        onResult: heard => { const sc2 = spokenScore(heard, item); if (sc2 >= PASS) { spoke++; activity(2); earn(3, '💬 spoken reply'); ok(Math.round(sc2 * 100)); } else $('heard').textContent = `I heard “${heard[0]}”. Try again!`; },
        onError: err => { if ($('heard')) $('heard').textContent = micMsg(err); },
        onEnd: () => { if ($('mic')) $('mic').classList.remove('on'); },
      });
    };
  };
  const end = () => {
    earn(5, 'conversation done'); activity(5);
    $('reply').innerHTML = `<div class="checkbar-in col"><div class="fb-row"><div class="fb-m">${mascot('cheer', 58)}</div><div class="fb-text"><div class="fb-head">Great chat! 🎉</div><div class="fb-def">You said ${spoke} of ${turns.filter(t => t.who === 'u').length} replies out loud.</div></div></div>
      <div class="row"><a class="bigbtn" href="#/${code}/practice/chat">MORE CHATS</a></div></div>`;
  };
  routeCleanup = () => { if (synth) synth.cancel(); };
  step();
}

/* ---------- lesson plans (speaking-first: 7 of 12 are speak/listen) ---------- */
function lessonPlan(T, k) {
  const words = T.words.map((w, i) => ({ ...w, tid: T.id, i }));
  const size = Math.ceil(words.length / 3);
  const F = k === 3 ? shuffle(words).slice(0, 6) : words.slice(k * size, (k + 1) * size);
  const f = j => F[j % F.length], sw0 = F.filter(sayable), sw = j => sw0.length ? sw0[j % sw0.length] : f(j);
  const uniq = arr => arr.filter((x, i) => arr.findIndex(y => y.t === x.t || y.en === x.en) === i);
  let ws = uniq(F).slice(0, 5); if (ws.length < 4) ws = uniq([...ws, ...shuffle(words)]).slice(0, 5);
  const s1 = T.sentences[k % 4], s2 = T.sentences[(k + 1) % 4], s3 = T.sentences[(k + 2) % 4], num = T.id === 'numbers';
  return [
    { type: 'listen_pick', w: f(0) }, { type: 'speak_repeat', w: sw(0) }, { type: 'mc_t', w: f(1) }, { type: 'listen_respond', w: f(2) },
    { type: 'match', ws }, { type: 'speak_recall', w: sw(1) }, { type: 'build_t', s: s1 },
    num ? { type: 'speak_repeat', w: sw(2) } : { type: 'shadow', s: s1 },
    { type: 'fill', s: s2 }, { type: 'listen_build', s: s2 },
    k % 2 ? { type: 'type_en', w: sw(3) } : { type: 'listen_respond', w: f(4) },
    num ? { type: 'speak_recall', w: sw(3) } : { type: 'speak_read', s: s3 },
  ];
}
function reviewPlan(ws) {
  const types = ['speak_recall', 'listen_respond', 'speak_repeat', 'mc_t', 'listen_pick'];
  return ws.map((w, j) => ({ type: !sayable(w) && types[j % 5].startsWith('speak') ? 'listen_respond' : types[j % 5], w }));
}

/* ---------- session runner (lessons + review) ---------- */
let keyHandler = null, routeCleanup = null;
function runSession(L, cfg) {
  const code = L.code, pool = cfg.pool, allSent = L.topics.flatMap(t => t.sentences);
  const sep = (code === 'zh' || code === 'yue' || code === 'ja') ? '' : ' ';
  const queue = cfg.plan.map(e => ({ ...e })), unique = queue.length;
  let pos = 0, hearts = 5, solved = 0, firstTry = 0, mistakes = 0, spoke = 0;
  const say = (t, o) => speak(t, L.speech, o);
  const $ = id => document.getElementById(id);
  const wordHtml = w => { const s = split(w.t); return `<span class="tw">${esc(s.main)}</span>${s.kana ? `<small>${esc(s.kana)}</small>` : ''}${w.r ? `<small class="r">${esc(rom(w))}</small>` : ''}`; };
  const defWord = w => { const s = split(w.t); return `<b>${esc(s.main)}</b>${s.kana ? ' (' + esc(s.kana) + ')' : ''}${w.r ? ' · <i>' + esc(rom(w)) + '</i>' : ''} = ${esc(w.en)}${w.tip ? `<div class="tip">💡 ${esc(w.tip)}</div>` : ''}`; };
  const defSent = s => `<b>${esc(s.t)}</b>${s.r ? '<br><i>' + esc(rom(s)) + '</i>' : ''}<br>= ${esc(s.en)}`;
  const pick = (w, n) => { const out = []; for (const d of shuffle(pool)) { if (out.length >= n) break; if (d.t === w.t || d.en === w.en || out.some(o => o.t === d.t || o.en === d.en)) continue; out.push(d); } return out; };
  const slowBtn = () => `<button class="spk ${S.slow ? 'on' : ''}" id="slow" title="Slow audio">🐢</button>`;
  const audioRow = () => `<div class="row center-row"><button class="spk" id="spk">🔊</button>${slowBtn()}</div>`;
  const bigAudio = () => `<div class="listen"><button class="spk big" id="spk">🔊</button>${slowBtn()}</div>`;

  function frame(ex, title, body, speakEx) {
    app.innerHTML = `<div class="lesson"><div class="lbar"><a class="x" href="#/${code}" aria-label="Quit">✕</a>
      <div class="progress"><i style="width:${solved / unique * 100}%"></i></div><span class="hearts">❤️ ${hearts}</span></div>
      ${ex.retry ? '<span class="pill-label warm">🔁 Let\'s fix this one</span>' : ''}${speakEx ? '<span class="pill-label">🎤 Speaking · +3 Blingos</span>' : ''}
      <h2 class="ex-title">${title}</h2><div class="ex-body">${body}</div></div>
      <div class="checkbar" id="checkbar"><div class="checkbar-in">${speakEx ? `<button class="bigbtn alt" id="skip">CAN'T SPEAK NOW</button>${!SR ? '<button class="bigbtn" id="selfok">I SAID IT ✓</button>' : ''}`
        : '<button class="roundbtn" id="skip" title="Skip" aria-label="Skip">⏭</button><button class="bigbtn" id="check" disabled>CHECK</button>'}</div></div>`;
    if ($('slow')) $('slow').onclick = () => { S.slow = !S.slow; save(); $('slow').classList.toggle('on', S.slow); };
  }
  const setReady = r => { if ($('check')) $('check').disabled = !r; };
  const choiceList = (opts, render) => `<div class="choices">${opts.map((o, j) => `<button class="choice" data-j="${j}">${render(o)}</button>`).join('')}</div>`;
  function wireChoices(opts, onPick) {
    let sel = null;
    app.querySelectorAll('.choice').forEach(b => b.onclick = () => { app.querySelectorAll('.choice').forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sel = opts[+b.dataset.j]; if (onPick) onPick(sel); setReady(true); });
    return () => sel;
  }
  const tileUI = tiles => `<div class="answer-line" id="ans"></div><div class="bank" id="bank">${tiles.map((t, j) => `<button class="tile" data-j="${j}">${esc(t.txt)}${t.rom ? `<small>${esc(t.rom)}</small>` : ''}</button>`).join('')}</div>`;
  function wireTiles(tiles) {
    const picked = [], ans = $('ans'), bank = $('bank');
    bank.querySelectorAll('.tile').forEach(b => b.onclick = () => {
      if (b.classList.contains('used')) return;
      b.classList.add('used'); picked.push(+b.dataset.j);
      const c = b.cloneNode(true); c.classList.remove('used');
      c.onclick = () => { const j = +c.dataset.j; picked.splice(picked.indexOf(j), 1); c.remove(); bank.querySelector(`[data-j="${j}"]`).classList.remove('used'); setReady(picked.length > 0); };
      ans.appendChild(c); setReady(true);
    });
    return () => picked.map(j => tiles[j].txt);
  }
  function targetTiles(s) {
    const extra = shuffle([...new Set(allSent.flatMap(x => x.tiles.map((t, j) => t + '\u0000' + (x.tr ? x.tr[j] : ''))))]).filter(x => !s.tiles.includes(x.split('\u0000')[0])).slice(0, 3);
    return shuffle([...s.tiles.map((t, j) => ({ txt: t, rom: s.tr ? s.tr[j] : '' })), ...extra.map(x => { const [t, r] = x.split('\u0000'); return { txt: t, rom: r }; })]);
  }
  function speakExercise(ex, title, display, item, autoplay) {
    frame(ex, title, display + `<button class="mic" id="mic" ${SR ? '' : 'disabled'}>🎤</button><p class="sub center" id="heard">${SR ? 'Tap the mic, then say it' : 'Say it out loud, then tap “I said it ✓”'}</p>`, true);
    if ($('spk')) $('spk').onclick = () => say(item.t);
    if (autoplay) say(item.t);
    if (SR) $('mic').onclick = () => {
      if (synth) synth.cancel();
      $('mic').classList.add('on'); $('heard').textContent = 'Listening…';
      listen(L.speech, {
        onResult: heard => { const sc = spokenScore(heard, item); $('heard').textContent = `I heard: “${heard[0]}”`; setTimeout(() => feedback({ ok: sc >= PASS, heard: heard[0], score: sc, spoken: true }, ex), 300); },
        onError: err => { if ($('heard')) $('heard').textContent = micMsg(err); },
        onEnd: () => { if ($('mic')) $('mic').classList.remove('on'); },
      });
    };
    if ($('selfok')) $('selfok').onclick = () => feedback({ ok: true, self: true }, ex);
    $('skip').onclick = () => feedback({ ok: true, free: true }, ex);
  }

  function show() {
    if (hearts <= 0) return fail();
    if (pos >= queue.length) return done();
    const ex = queue[pos], w = ex.w, s = ex.s;
    let check;
    switch (ex.type) {
      case 'listen_pick': case 'listen_respond': {
        const opts = shuffle([w, ...pick(w, 3)]), resp = ex.type === 'listen_respond';
        frame(ex, resp ? 'Listen. What does it mean?' : 'What do you hear?', bigAudio() + choiceList(opts, resp ? o => `${EMOJI[o.en] ? `<span class="em">${EMOJI[o.en]}</span>` : ''}${esc(o.en)}` : wordHtml));
        const get = wireChoices(opts); $('spk').onclick = () => say(w.t); say(w.t);
        check = () => ({ ok: get() === w }); break;
      }
      case 'mc_t': {
        const opts = shuffle([w, ...pick(w, 3)]);
        frame(ex, `Which one is “${esc(w.en)}”? ${EMOJI[w.en] || ''}`, choiceList(opts, wordHtml));
        const get = wireChoices(opts, o => say(o.t));
        check = () => ({ ok: get() === w }); break;
      }
      case 'match': {
        const left = shuffle(ex.ws), right = shuffle(ex.ws);
        frame(ex, 'Tap the matching pairs', `<div class="match"><div>${left.map((x, j) => `<button class="mt" data-side="l" data-j="${j}">${wordHtml(x)}</button>`).join('')}</div>
          <div>${right.map((x, j) => `<button class="mt" data-side="r" data-j="${j}">${EMOJI[x.en] ? EMOJI[x.en] + ' ' : ''}${esc(x.en)}</button>`).join('')}</div></div>`);
        $('check').style.display = 'none';
        let selL = null, selR = null, matched = 0;
        app.querySelectorAll('.mt').forEach(b => b.onclick = () => {
          if (b.dataset.side === 'l') { if (selL) selL.classList.remove('sel'); selL = b; say(left[+b.dataset.j].t); } else { if (selR) selR.classList.remove('sel'); selR = b; }
          b.classList.add('sel');
          if (!selL || !selR) return;
          const a = left[+selL.dataset.j], c = right[+selR.dataset.j], pair = [selL, selR]; selL = selR = null;
          if (a === c) { pair.forEach(e => { e.classList.remove('sel'); e.classList.add('ok'); e.disabled = true; }); if (++matched === ex.ws.length) setTimeout(() => feedback({ ok: true, msg: '🎉 All pairs matched!' }, ex), 300); }
          else pair.forEach(e => { e.classList.remove('sel'); e.classList.add('bad'); setTimeout(() => e.classList.remove('bad'), 500); });
        });
        $('skip').onclick = () => feedback({ ok: false, skipped: true }, ex);
        return;
      }
      case 'speak_repeat':
        return speakExercise(ex, 'Listen and repeat', `<div class="prompt-word">${audioRow()}${wordHtml(w)}<small>${esc(w.en)}</small></div>`, w, true);
      case 'speak_recall':
        speakExercise(ex, `Say it in ${L.name}`, `<div class="prompt-word"><span class="em big">${EMOJI[w.en] || '💬'}</span><span class="tw">${esc(w.en)}</span>
          <button class="btn small alt" id="hint">👀 Hint</button><div id="hintbox" hidden>${wordHtml(w)}</div></div>`, w, false);
        $('hint').onclick = () => { $('hintbox').hidden = false; $('hint').remove(); say(w.t); };
        return;
      case 'shadow': case 'speak_read':
        return speakExercise(ex, ex.type === 'shadow' ? 'Shadow it: listen, then repeat right away' : 'Read this out loud',
          `<div class="prompt-sent">${audioRow()}${esc(s.t)}${s.r ? `<small>${esc(rom(s))}</small>` : ''}<small>${esc(s.en)}</small></div>`, s, ex.type === 'shadow');
      case 'type_en': {
        frame(ex, 'Type this in English', `<div class="prompt-word"><button class="spk" id="spk">🔊</button>${wordHtml(w)}</div><input class="typein" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type in English">`);
        $('spk').onclick = () => say(w.t); say(w.t);
        const inp = $('inp'); inp.focus(); inp.oninput = () => setReady(inp.value.trim().length > 0);
        check = () => judge(inp.value, pool.filter(x => x.t === w.t).flatMap(x => alts(x.en)), 'en'); break;
      }
      case 'build_t': case 'listen_build': {
        const lm = ex.type === 'listen_build', tiles = targetTiles(s);
        frame(ex, lm ? 'Tap what you hear' : `Translate into ${L.name}`, (lm ? bigAudio() : `<div class="prompt-sent">${esc(s.en)}</div>`) + tileUI(tiles));
        if ($('spk')) { $('spk').onclick = () => say(s.t); say(s.t); }
        const get = wireTiles(tiles);
        check = () => ({ ok: get().join(' ') === s.tiles.join(' ') }); break;
      }
      case 'fill': {
        const key = s.tiles[s.b];
        const opts0 = [...new Set([...allSent.flatMap(x => x.tiles), ...pool.map(x => split(x.t).main)])].filter(x => x !== key && !s.tiles.includes(x) && !x.includes('…') && !x.includes('/') && nrm(x) !== nrm(key));
        const opts = shuffle([key, ...shuffle(opts0).slice(0, 3)]);
        frame(ex, 'Fill in the blank', `<div class="prompt-sent"><button class="spk" id="spk">🔊</button><div class="sline">${s.tiles.map((t, j) => j === s.b ? '<span class="blank">____</span>' : esc(t)).join(sep)}</div><small>${esc(s.en)}</small></div>` + choiceList(opts, o => esc(o)));
        $('spk').onclick = () => say(s.t);
        const get = wireChoices(opts);
        check = () => ({ ok: get() === key }); break;
      }
    }
    $('check').onclick = () => feedback(check(), ex);
    $('skip').onclick = () => feedback({ ok: false, skipped: true }, ex);
  }

  function feedback(res, ex) {
    const ok = res.ok, item = ex.s || ex.w;
    if (ok) { solved++; if (!ex.retry && !res.free) firstTry++; } else { hearts--; mistakes++; queue.push({ ...ex, retry: true }); }
    if (ex.w && !res.free) srsMark(code, ex.w, ok);
    if (ex.ws && ok) ex.ws.forEach(x => srsMark(code, x, true));
    if (ok && res.spoken) { spoke++; earn(3, '🎤 speaking bonus'); } else if (ok && res.self) earn(1, '🎤 practice');
    const praise = ['Nice!', 'Great job!', 'Awesome!', 'You got it!', 'So good!'][Math.floor(Math.random() * 5)];
    const head = res.free ? 'No problem, skipped for now' : res.msg ? res.msg : ok ? (res.typo ? 'Correct, but watch the spelling:' : res.spoken ? `${praise} Great pronunciation 🎤` : praise)
      : res.skipped ? 'Skipped. Here\'s the answer:' : res.spoken ? 'Almost! Listen and try again later:' : 'Not quite. Correct answer:';
    const def = ex.ws ? ex.ws.map(x => `${esc(split(x.t).main)} = ${esc(x.en)}`).join(' · ') : ex.s ? defSent(ex.s) : defWord(ex.w);
    const cb = $('checkbar');
    cb.className = 'checkbar fb ' + (ok ? 'good' : 'bad');
    cb.innerHTML = `<div class="checkbar-in col"><div class="fb-row"><div class="fb-m">${mascot(ok ? 'cheer' : 'sad', 58)}</div><div class="fb-text"><div class="fb-head">${head}</div>
      ${res.heard ? `<div class="fb-def">You said: “${esc(res.heard)}” · ${Math.round(res.score * 100)}% match</div>` : ''}<div class="fb-def">${def}</div></div>${item ? '<button class="spk" id="fbspk">🔊</button>' : ''}</div>
      <button class="bigbtn ${ok ? '' : 'pinkbtn'}" id="cont">${pos + 1 >= queue.length && ok ? 'FINISH' : 'NEXT'}</button></div>`;
    app.querySelectorAll('.choice,.tile,.typein,.mt,#mic').forEach(e => e.disabled = true);
    if ($('fbspk')) $('fbspk').onclick = () => say(item.t);
    if (!ok && item) say(item.t);
    activity(0);
    $('cont').onclick = () => { pos++; show(); };
    $('cont').focus();
    const bar = app.querySelector('.progress>i'); if (bar) bar.style.width = (solved / unique * 100) + '%';
    app.querySelector('.hearts').textContent = '❤️ ' + hearts;
  }
  function done() {
    const st = { firstTry, unique, mistakes, spoke, acc: Math.round(firstTry / unique * 100) };
    app.innerHTML = `<div class="card result">${mascot('cheer', 140, 'bob')}${cfg.onFinish(st)}</div>`;
  }
  function fail() {
    app.innerHTML = `<div class="card result">${mascot('sad', 120)}<h1>Out of hearts</h1><p class="sub">No worries! Mistakes help you remember. Try again.</p>
      <div class="ctrls"><a class="btn ok" href="${location.hash.split('?')[0]}?r=${Date.now()}">Try again</a><a class="btn alt" href="#/${code}">Back</a></div></div>`;
  }
  keyHandler = e => {
    if (e.key !== 'Enter') return;
    const c = $('cont'), ch = $('check');
    if (c) { e.preventDefault(); c.click(); } else if (ch && !ch.disabled && ch.style.display !== 'none') { e.preventDefault(); ch.click(); }
  };
  show();
}

async function lesson(code, tid, k) {
  const L = await load(code), T = L.topics.find(t => t.id === tid); k = +k;
  if (!T || !(k >= 0 && k < PER_TOPIC) || !isUnlocked(L, tid + '|' + k)) return go('#/' + code);
  const plan = lessonPlan(T, k);
  runSession(L, { plan, pool: T.words.map((w, i) => ({ ...w, tid, i })), onFinish: st => {
    const xp = 10 + st.firstTry + (st.mistakes === 0 ? 5 : 0), bl = 10 + (st.mistakes === 0 ? 5 : 0);
    S.done[code + '|' + tid + '|' + k] = 1;
    plan.forEach(e => { if (e.w) S.known[kKey(code, e.w.tid, e.w.i)] = 1; });
    activity(xp); earn(bl, 'lesson complete');
    const order = lessonOrder(L), next = order[order.indexOf(tid + '|' + k) + 1];
    return `<h1>Lesson complete!</h1><div class="res-stats"><div><b>+${xp}</b><span>XP</span></div><div><b><span class="coin">B</span> +${bl + st.spoke * 3}</b><span>Blingos</span></div>
      <div><b>${st.acc}%</b><span>accuracy</span></div><div><b>🎤 ${st.spoke}</b><span>spoken</span></div></div>
      <p class="sub">${st.mistakes === 0 ? 'Perfect lesson! +5 bonus.' : `You fixed ${st.mistakes} mistake${st.mistakes > 1 ? 's' : ''}. Missed words come back in Review so they stick.`} 🔥 ${liveStreak()} day streak</p>
      <div class="ctrls">${next ? `<a class="btn ok" href="#/${code}/${next.replace('|', '/lesson/')}">Next lesson →</a>` : ''}<a class="btn alt" href="#/${code}">Back to path</a></div>`;
  } });
}

/* ---------- practice: spaced-repetition review ---------- */
async function review(code) {
  const L = await load(code);
  let keys = dueKeys(code).slice(0, 10);
  if (keys.length < 4) keys = [...new Set([...keys, ...srsKeys(code).sort((a, b) => S.srs[a].box - S.srs[b].box || S.srs[a].due - S.srs[b].due)])].slice(0, 8);
  const ws = keys.map(k => wordByKey(L, k)).filter(Boolean);
  if (!ws.length) {
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name}</a><div class="card result">${mascot('happy', 120)}<h1>Nothing to review yet</h1><p class="sub">Finish a lesson first. Words you learn (and miss) come back here at just the right time.</p><a class="btn" href="#/${code}">Go to lessons</a></div>`;
    return;
  }
  runSession(L, { plan: reviewPlan(shuffle(ws)), pool: L.all, onFinish: st => {
    activity(5 + st.firstTry); earn(5, 'review done');
    return `<h1>Review done! 🧠</h1><div class="res-stats"><div><b>${st.acc}%</b><span>remembered</span></div><div><b>🎤 ${st.spoke}</b><span>spoken</span></div></div>
      <p class="sub">Words you get right come back later and later (1 day → 3 → 7 → 14 → 30). Missed ones come back right away.</p>
      <div class="ctrls"><a class="btn alt" href="#/${code}">Back</a></div>`;
  } });
}

/* ---------- practice: shadowing ---------- */
async function shadowing(code) {
  const L = await load(code);
  const items = L.topics.flatMap(t => [...t.sentences.map(s => ({ ...s, topic: t.icon + ' ' + t.name })),
    ...(t.id === 'phrases' || t.id === 'greetings' ? t.words.map((w, i) => ({ ...w, tid: t.id, i, topic: t.icon + ' ' + t.name })).filter(sayable) : [])]);
  let i = 0, auto = true;
  const rewarded = new Set();
  const render = () => {
    const it = items[i], s = split(it.t), $ = id => document.getElementById(id);
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name}</a><h1>🗣️ Shadowing</h1><p class="sub">Listen, then repeat <b>right away</b>, copying the rhythm and melody. ${SR ? '' : '(This browser can\'t check speech, so just repeat out loud.)'}</p>
      <div class="card shadow-card" style="--c:${L.color}"><div class="sub">${esc(it.topic)} · ${i + 1}/${items.length}</div>
        <div class="tgt">${esc(s.main)}</div>${s.kana ? `<div class="kana">${esc(s.kana)}</div>` : ''}${it.r ? `<div class="rom">${esc(rom(it))}</div>` : ''}<div class="en">${esc(it.en)}</div>
        ${it.tip ? `<div class="tip">💡 ${esc(it.tip)}</div>` : ''}
        <div class="row center-row"><button class="btn" id="play">▶ Play</button><button class="btn alt ${S.slow ? 'on' : ''}" id="slow">🐢 Slow: ${S.slow ? 'on' : 'off'}</button>
        ${SR ? '<button class="btn pink" id="rep">🎤 Repeat</button>' : ''}</div>
        ${SR ? `<label class="chk"><input type="checkbox" id="auto" ${auto ? 'checked' : ''}> Auto: mic starts right after the audio</label>` : ''}
        <div class="meter" id="meter"></div></div>
      <div class="ctrls"><button class="btn alt" id="prev">← Prev</button><button class="btn alt" id="next">Next →</button></div>`;
    const repeat = () => {
      $('meter').innerHTML = '<span class="sub">🎤 Listening… say it now!</span>';
      listen(L.speech, {
        onResult: heard => {
          const sc = spokenScore(heard, it), pct = Math.round(sc * 100);
          $('meter').innerHTML = `<div class="bar big"><i style="width:${pct}%"></i></div><b>${pct}% match</b> ${sc >= PASS ? '🎉' : '· try again!'}<div class="sub">I heard: “${esc(heard[0])}”</div>`;
          if (it.tid != null) srsMark(code, it, sc >= PASS);
          if (sc >= PASS && !rewarded.has(i)) { rewarded.add(i); activity(2); earn(2, '🗣️ shadowing'); }
        },
        onError: err => { if ($('meter')) $('meter').innerHTML = `<span class="sub">${micMsg(err)}</span>`; },
      });
    };
    $('play').onclick = () => speak(it.t, L.speech, { onend: () => { if (SR && auto && $('meter')) repeat(); } });
    $('slow').onclick = () => { S.slow = !S.slow; save(); render(); };
    if ($('rep')) $('rep').onclick = () => { if (synth) synth.cancel(); repeat(); };
    if ($('auto')) $('auto').onchange = e => { auto = e.target.checked; };
    $('prev').onclick = () => { i = (i - 1 + items.length) % items.length; render(); };
    $('next').onclick = () => { i = (i + 1) % items.length; render(); };
  };
  render();
}

/* ---------- practice: say it fast ---------- */
async function sayFast(code) {
  const L = await load(code);
  let base = srsKeys(code).map(k => wordByKey(L, k)).filter(w => w && sayable(w));
  if (base.length < 6) base = L.all.filter(w => sayable(w) && (w.tid === L.topics[0].id || w.tid === L.topics[2].id || S.known[kKey(code, w.tid, w.i)]));
  const rounds = shuffle(base).slice(0, 8), secs = L.romanLabel ? 7 : 6;
  let r = 0, hits = 0, timer = null, rec = null;
  const $ = id => document.getElementById(id);
  const stop = () => { clearInterval(timer); const x = rec; rec = null; try { if (x) x.abort(); } catch (_) {} };
  routeCleanup = stop;
  const intro = () => {
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name}</a><div class="card result">${mascot('happy', 110, 'bob')}<h1>⚡ Say it fast</h1>
      <p class="sub">You'll see an emoji + English word. Say it in ${L.name} before the timer runs out (${secs}s)! ${SR ? 'The mic listens automatically.' : 'This browser can\'t check speech, so say it out loud, then grade yourself.'}</p>
      <button class="btn ok" id="go">Start!</button></div>`;
    $('go').onclick = round;
  };
  const round = () => {
    if (r >= rounds.length) return end();
    const w = rounds[r], s = split(w.t); let left = secs * 10, settled = false;
    app.innerHTML = `<div class="lesson"><div class="lbar"><a class="x" href="#/${code}">✕</a><div class="progress"><i style="width:${r / rounds.length * 100}%"></i></div><span class="hearts">⚡ ${hits}</span></div>
      <div class="fast-card card"><span class="em huge">${EMOJI[w.en] || '💬'}</span><div class="tw">${esc(w.en)}</div><div class="timer"><i id="tbar" style="width:100%"></i></div>
      <div id="fres" class="sub">${SR ? '🎤 Listening… say it!' : 'Say it out loud!'}</div><div id="fbtn" class="ctrls"></div></div></div>`;
    const answer = `<b>${esc(s.main)}</b>${w.r ? ' · <i>' + esc(rom(w)) + '</i>' : ''}${w.tip ? `<div class="tip">💡 ${esc(w.tip)}</div>` : ''}`;
    const next = () => { r++; round(); };
    const settle = (ok, heard) => {
      if (settled) return; settled = true; stop();
      if (ok) { hits++; earn(2, '⚡ fast recall'); activity(3); }
      srsMark(code, w, ok);
      $('fres').innerHTML = `${ok ? '✅ Yes!' : '⏰ Time\'s up!'} ${answer}${heard ? `<div class="sub">I heard: “${esc(heard)}”</div>` : ''}`;
      speak(w.t, L.speech);
      $('fbtn').innerHTML = '<button class="btn ok" id="nx">Next →</button>'; $('nx').onclick = next; $('nx').focus();
    };
    const self = ok => { if (ok) { hits++; earn(1, '⚡ fast recall'); activity(2); } srsMark(code, w, ok); next(); };
    if (SR) {
      const start = () => { rec = listen(L.speech, { interim: true, onResult: heard => { if (spokenScore(heard, w) >= PASS) settle(true, heard[0]); }, onError: () => {}, onEnd: () => { if (!settled && rec && left > 8) start(); } }); };
      start();
    }
    timer = setInterval(() => {
      left--; const b = $('tbar'); if (b) b.style.width = (left / (secs * 10) * 100) + '%';
      if (left > 0) return;
      if (SR) return settle(false);
      stop(); settled = true;
      $('fres').innerHTML = 'Answer: ' + answer; speak(w.t, L.speech);
      $('fbtn').innerHTML = '<button class="btn ok" id="y">I got it ✓</button><button class="btn pink" id="n">Missed</button>';
      $('y').onclick = () => self(true); $('n').onclick = () => self(false);
    }, 100);
  };
  const end = () => {
    const perfect = hits === rounds.length; if (perfect) earn(5, 'perfect round!');
    app.innerHTML = `<div class="card result">${mascot(hits >= rounds.length / 2 ? 'cheer' : 'happy', 130, 'bob')}<h1>${perfect ? 'Lightning fast! ⚡' : 'Nice drill!'}</h1>
      <div class="score">${hits} / ${rounds.length}</div><p class="sub">Missed words go into your Review queue.</p>
      <div class="ctrls"><a class="btn ok" href="#/${code}/practice/fast?r=${Date.now()}">Again</a><a class="btn alt" href="#/${code}">Back</a></div></div>`;
  };
  keyHandler = e => { if (e.key === 'Enter') { const b = $('nx') || $('go'); if (b) { e.preventDefault(); b.click(); } } };
  intro();
}

/* ---------- flashcards (optional review) ---------- */
async function cards(code, tid) {
  const L = await load(code), T = L.topics.find(t => t.id === tid);
  if (!T) return go('#/' + code);
  let i = 0;
  const render = () => {
    const w = { ...T.words[i], tid, i }, s = split(w.t), known = S.known[kKey(code, tid, i)], $ = id => document.getElementById(id);
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name}</a><h1>${T.icon} ${T.name}</h1>
      ${T.note ? `<div class="note">💡 ${esc(T.note)}</div>` : ''}
      <div class="flash-wrap" style="--c:${L.color}"><div class="flash" id="flash">
        <div class="face">${known ? '<span class="known-tag">✓ learned</span>' : ''}<button class="speak" id="say" aria-label="Pronounce">🔊</button>
          <div class="tgt">${esc(s.main)}</div>${s.kana ? `<div class="kana">${esc(s.kana)}</div>` : ''}${w.r ? `<div class="rom">${esc(rom(w))}</div>` : ''}<span class="hint">tap to see meaning</span></div>
        <div class="face back-f"><span class="em big">${EMOJI[w.en] || ''}</span><div class="en">${esc(w.en)}</div>${w.tip ? `<div class="tip">💡 ${esc(w.tip)}</div>` : ''}<span class="hint">tap to flip back</span></div>
      </div></div>
      <div class="counter">${i + 1} / ${T.words.length}</div>
      <div class="ctrls"><button class="btn alt" id="prev">←</button><button class="btn pink" id="again">🔁 Still learning</button><button class="btn ok" id="got">✓ Got it</button><button class="btn alt" id="next">→</button></div>`;
    const flash = $('flash');
    flash.onclick = e => { if (e.target.id !== 'say') flash.classList.toggle('flipped'); };
    $('say').onclick = () => speak(w.t, L.speech);
    $('prev').onclick = () => { i = (i - 1 + T.words.length) % T.words.length; render(); };
    $('next').onclick = () => { i = (i + 1) % T.words.length; render(); };
    $('again').onclick = () => { delete S.known[kKey(code, tid, i)]; srsMark(code, w, false); activity(1); i = (i + 1) % T.words.length; render(); };
    $('got').onclick = () => { const k = kKey(code, tid, i); if (!S.known[k]) earn(1); activity(S.known[k] ? 1 : 3); S.known[k] = 1; srsMark(code, w, true); i = (i + 1) % T.words.length; render(); };
    speak(w.t, L.speech);
  };
  render();
}

/* ---------- quick quiz ---------- */
async function quiz(code, tid) {
  const L = await load(code);
  const topics = tid === 'all' ? L.topics : L.topics.filter(t => t.id === tid);
  if (!topics.length) return go('#/' + code);
  const pool = topics.flatMap(t => t.words.map((w, i) => ({ ...w, tid: t.id, i }))), qs = shuffle(pool).slice(0, QUIZ_LEN);
  const title = tid === 'all' ? '🎯 Mixed quiz' : topics[0].icon + ' ' + topics[0].name + ' quiz';
  let n = 0, score = 0;
  const label = w => { const s = split(w.t); return esc(s.main) + (w.r ? `<small>${esc(rom(w))}</small>` : ''); };
  const render = () => {
    if (n >= qs.length) return finish();
    const a = qs[n], toEn = Math.random() < 0.5, distract = [];
    for (const d of shuffle(pool)) { if (distract.length === 3) break; if (d.t === a.t || d.en === a.en || distract.some(x => x.t === d.t || x.en === d.en)) continue; distract.push(d); }
    const opts = shuffle([a, ...distract]), s = split(a.t);
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name}</a><h1>${title}</h1><div class="progress"><i style="width:${n / qs.length * 100}%"></i></div>
      <div class="q"><div class="sub">${toEn ? 'What does this mean?' : 'How do you say this in ' + L.name + '?'}</div>
        <div class="prompt">${toEn ? esc(s.main) : (EMOJI[a.en] || '') + ' ' + esc(a.en)}</div>${toEn && a.r ? `<div class="rom">${esc(rom(a))}</div>` : ''}
        ${toEn ? '<button class="btn alt small" id="say">🔊 Listen</button>' : ''}</div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${toEn ? esc(o.en) : label(o)}</button>`).join('')}</div>
      <p class="counter">Question ${n + 1} of ${qs.length} · Score ${score}</p>`;
    if (toEn) { document.getElementById('say').onclick = () => speak(a.t, L.speech); speak(a.t, L.speech); }
    let done = false;
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const right = opts[+b.dataset.k] === a;
      app.querySelectorAll('.opt').forEach(x => { if (opts[+x.dataset.k] === a) x.classList.add('right'); });
      if (!right) b.classList.add('wrong'); else { score++; activity(5); S.known[kKey(code, a.tid, a.i)] = 1; }
      srsMark(code, a, right);
      if (!toEn) speak(a.t, L.speech);
      setTimeout(() => { n++; render(); }, right ? 900 : 1800);
    });
  };
  const finish = () => {
    if (tid !== 'all') S.best[code + '|' + tid] = Math.max(S.best[code + '|' + tid] || 0, score);
    const perfect = score === qs.length, bl = score + (perfect ? 5 : 0);
    activity(perfect ? 20 : 2); earn(bl, 'quiz');
    app.innerHTML = `<div class="card result">${mascot(score >= qs.length * 0.7 ? 'cheer' : 'happy', 120, 'bob')}<h1>${perfect ? 'Perfect! 🏆' : score >= qs.length * 0.7 ? 'Great job! 🎉' : 'Nice try! 💪'}</h1>
      <div class="score">${score} / ${qs.length}</div><p class="sub"><span class="coin">B</span> +${bl} Blingos · 🔥 ${liveStreak()} day streak</p>
      <div class="ctrls"><a class="btn" href="#/${code}/${tid}/quiz?r=${Date.now()}">Play again</a><a class="btn alt" href="#/${code}">Back</a></div></div>`;
  };
  render();
}

/* ---------- my character (closet) + shop ---------- */
let charTab = 'chars', tryOn = null;
const DEFAULT_NAME = { colors: 'Original color', faces: 'Kawaii face' };
const ownedList = cat => DEFAULT_NAME[cat] ? [null, ...S.owned[cat]] : S.owned[cat];
function withItem(eq, cat, id) {
  const e = { ...eq, acc: { ...eq.acc } };
  if (cat === 'chars') e.char = id; else if (cat === 'colors') e.color = id; else if (cat === 'faces') e.face = id; else if (cat === 'outfits') e.outfit = id; else e.acc[ACCS[id].slot] = id;
  return e;
}
function isEquipped(cat, id) {
  const e = S.equip;
  return cat === 'chars' ? e.char === id : cat === 'colors' ? e.color === id : cat === 'faces' ? e.face === id : cat === 'outfits' ? e.outfit === id : e.acc[ACCS[id].slot] === id;
}
function charScreen(mode) {
  const shop = mode === 'shop', items = SHOP_CATS[charTab][1];
  const ids = shop ? [...(DEFAULT_NAME[charTab] ? [null] : []), ...Object.keys(items)] : ownedList(charTab);
  const preview = tryOn ? withItem(S.equip, tryOn.cat, tryOn.id) : S.equip;
  const nameOf = (cat, id) => id == null ? DEFAULT_NAME[cat] : SHOP_CATS[cat][1][id].name;
  app.innerHTML = `<a class="back" href="#/">← Home</a>
    <div class="stage card">${charSVG(preview, 'cheer', 170, 'bob')}<div><h1>${shop ? '🛍️ Shop' : '👗 My Character'}</h1><div class="sub">${CHARS[preview.char].name}</div>
      <div class="wallet"><span class="coin">B</span> ${S.blingos} Blingos</div>${tryOn ? `<div class="sub">Trying on: <b>${esc(nameOf(tryOn.cat, tryOn.id))}</b></div>` : '<div class="sub">Tap any item to try it on.</div>'}
      <p class="sub small-print">Earn Blingos from lessons, speaking (bonus!), reviews, quizzes and your daily streak.</p></div></div>
    <div class="tabs"><a class="tab ${!shop ? 'on' : ''}" href="#/me">👗 Closet</a><a class="tab ${shop ? 'on' : ''}" href="#/shop">🛍️ Shop</a></div>
    <div class="chips">${Object.entries(SHOP_CATS).map(([k, [n]]) => `<button class="chip ${k === charTab ? 'on' : ''}" data-cat="${k}">${n}</button>`).join('')}</div>
    <div class="items">${ids.length ? ids.map(id => {
      const it = id == null ? { name: DEFAULT_NAME[charTab], price: 0 } : items[id];
      const own = id == null || S.owned[charTab].includes(id), eq = id == null ? S.equip[charTab === 'colors' ? 'color' : 'face'] == null : isEquipped(charTab, id);
      const sticky = charTab === 'chars' || id == null || charTab === 'colors' || charTab === 'faces';
      return `<div class="item card ${eq ? 'eq' : ''}" data-id="${id ?? ''}">${charSVG(withItem(S.equip, charTab, id), 'happy', 92)}<div class="iname">${esc(it.name)}${charTab === 'accs' ? `<small>${ACCS[id].slot}</small>` : ''}</div>
        ${own ? `<button class="btn small ${eq ? 'alt' : ''}" data-act="wear" ${eq && sticky ? 'disabled' : ''}>${eq ? (sticky ? 'Wearing ✓' : 'Take off') : 'Wear'}</button>`
          : `<button class="btn small buy" data-act="buy" ${S.blingos < it.price ? 'disabled' : ''}><span class="coin">B</span> ${it.price}</button>`}</div>`;
    }).join('') : `<p class="sub">Nothing here yet. Visit the <a href="#/shop"><b>Shop</b></a>!</p>`}</div><p class="center"><button class="linkbtn" id="redeem">Redeem code</button></p>`;
  document.getElementById('redeem').onclick = redeem;
  app.querySelectorAll('.chip').forEach(b => b.onclick = () => { charTab = b.dataset.cat; tryOn = null; charScreen(mode); });
  app.querySelectorAll('.item').forEach(card => {
    const id = card.dataset.id || null, cat = charTab;
    card.onclick = e => {
      const btn = e.target.closest('button'), act = btn && btn.dataset.act;
      if (act === 'buy') {
        const it = items[id];
        if (S.blingos < it.price) return toast('Not enough Blingos yet. Keep practicing! 💪');
        if (!confirm(`Buy ${it.name} for ${it.price} Blingos?`)) return;
        S.blingos -= it.price; S.owned[cat].push(id); S.equip = withItem(S.equip, cat, id); tryOn = null; save(); updateStats();
        toast(`🎉 You got ${esc(it.name)}!`); return charScreen(mode);
      }
      if (act === 'wear') {
        if (cat === 'chars') S.equip.char = id; else if (cat === 'colors') S.equip.color = id; else if (cat === 'faces') S.equip.face = id;
        else if (cat === 'outfits') S.equip.outfit = S.equip.outfit === id ? null : id;
        else { const sl = ACCS[id].slot; S.equip.acc[sl] = S.equip.acc[sl] === id ? null : id; }
        tryOn = null; save(); return charScreen(mode);
      }
      tryOn = { cat, id }; charScreen(mode);
    };
  });
}

/* ---------- gift codes (hash only, one-time per device) ---------- */
const GIFTS = { '0603c00fd56a893f33919c38454c29700c79f2ae41fbb6f6fb712bd17ac1d733': 700000 };
async function redeem() {
  const raw = prompt('Enter a gift code');
  if (!raw) return;
  if (!(window.crypto && crypto.subtle)) return toast('Codes need a secure (https) page.');
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(raw.trim().toUpperCase()));
  const h = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
  S.redeemed = S.redeemed || {};
  if (!GIFTS[h]) return toast('Hmm, that code isn\'t valid.');
  if (S.redeemed[h]) return toast('This code was already redeemed on this device.');
  S.redeemed[h] = 1; S.blingos += GIFTS[h]; save(); updateStats();
  toast(`🎁 <span class="coin">B</span> +${GIFTS[h].toLocaleString()} Blingos!`);
  if (location.hash === '#/me' || location.hash === '#/shop') charScreen(location.hash.slice(2));
}

/* ---------- router + tab bar ---------- */
function go(h) { location.hash = h; }
function setTabs(active) {
  const c = S.lang || 'es', tb = document.getElementById('tabbar');
  tb.querySelector('[data-tab="review"]').href = `#/${c}/practice/review`;
  if (active) tb.querySelectorAll('a').forEach(a => a.classList.toggle('on', a.dataset.tab === active));
}
function route() {
  if (synth) synth.cancel();
  if (routeCleanup) { routeCleanup(); routeCleanup = null; }
  keyHandler = null;
  const parts = location.hash.replace(/^#\/?/, '').split('?')[0].split('/'), [code, tid, mode] = parts;
  window.scrollTo(0, 0);
  const focus = mode === 'lesson' || (tid === 'practice' && (mode === 'review' || mode === 'fast' || (mode === 'chat' && parts[3])));
  document.body.classList.toggle('focus', focus);
  setTabs(code === 'me' || code === 'shop' ? 'char' : code === 'profile' ? 'profile' : code === 'practice' || mode === 'cards' || mode === 'quiz' || (tid === 'practice' && mode !== 'review') ? 'practice' : mode === 'review' ? 'review' : 'home');
  if (code === 'me' || code === 'shop') { tryOn = null; return charScreen(code); }
  if (code === 'profile') return profile();
  if (code === 'practice') return practiceHub();
  if (code === 'langs') return langsView();
  if (!code) return S.lang ? langView(S.lang) : langsView();
  if (!LANGS.includes(code)) return langsView();
  if (!tid) return langView(code);
  if (tid === 'practice') return mode === 'review' ? review(code) : mode === 'shadow' ? shadowing(code) : mode === 'fast' ? sayFast(code) : mode === 'chat' ? chat(code, parts[3]) : practiceHub();
  if (mode === 'lesson') return lesson(code, tid, parts[3]);
  return mode === 'quiz' ? quiz(code, tid) : cards(code, tid);
}
window.addEventListener('hashchange', route);
document.addEventListener('keydown', e => keyHandler && keyHandler(e));
updateStats(); route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
