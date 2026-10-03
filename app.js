/* Lingo World — vanilla JS, no dependencies */
const LANGS = ['es', 'fr', 'zh', 'ja', 'ko'];
const META = { es: ['🇪🇸', 'Spanish', 'Español', '#ff6b4a'], fr: ['🇫🇷', 'French', 'Français', '#4a7bff'],
  zh: ['🇨🇳', 'Chinese', '中文', '#e63946'], ja: ['🇯🇵', 'Japanese', '日本語', '#ff5fa2'], ko: ['🇰🇷', 'Korean', '한국어', '#7b5cff'] };
const QUIZ_LEN = 10;
const app = document.getElementById('app');
const cache = {};

/* ---------- saved progress ---------- */
const KEY = 'lingoWorld.v1';
const S = Object.assign({ xp: 0, streak: 0, lastDay: null, known: {}, best: {} }, JSON.parse(localStorage.getItem(KEY) || '{}'));
const save = () => localStorage.setItem(KEY, JSON.stringify(S));
const dayStr = d => d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
function liveStreak() {
  const y = new Date(); y.setDate(y.getDate() - 1);
  return (S.lastDay === dayStr(new Date()) || S.lastDay === dayStr(y)) ? S.streak : 0;
}
function activity(xp) {
  const today = dayStr(new Date());
  if (S.lastDay !== today) {
    const y = new Date(); y.setDate(y.getDate() - 1);
    S.streak = S.lastDay === dayStr(y) ? S.streak + 1 : 1;
    S.lastDay = today;
  }
  S.xp += xp; save(); updateStats();
}
function updateStats() {
  document.getElementById('streak').textContent = liveStreak();
  document.getElementById('xp').textContent = S.xp;
}

/* ---------- helpers ---------- */
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// "水（みず）" -> main "水", kana "みず"
function split(t) { const m = t.match(/^(.*?)（(.+?)）$/); return m ? { main: m[1], kana: m[2] } : { main: t, kana: '' }; }
const kKey = (code, tid, i) => code + '|' + tid + '|' + i;
async function load(code) {
  if (!cache[code]) cache[code] = await (await fetch('data/' + code + '.json')).json();
  return cache[code];
}
function knownCount(code, topic) { return topic.words.filter((_, i) => S.known[kKey(code, topic.id, i)]).length; }

/* ---------- speech ---------- */
let voices = [];
const synth = window.speechSynthesis;
if (synth) { const lv = () => voices = synth.getVoices(); lv(); synth.onvoiceschanged = lv; }
function speak(text, lang) {
  if (!synth) return;
  const s = split(text);
  const u = new SpeechSynthesisUtterance((s.kana || s.main).replace(/…/g, ''));
  u.lang = lang; u.rate = 0.85;
  const norm = v => v.lang.replace('_', '-').toLowerCase();
  const v = voices.find(v => norm(v) === lang.toLowerCase()) || voices.find(v => norm(v).startsWith(lang.slice(0, 2)));
  if (v) u.voice = v;
  synth.cancel(); synth.speak(u);
}

/* ---------- views ---------- */
function home() {
  let html = `<h1>Hi! Where to today? ✈️</h1><p class="sub">Pick a language to start learning. Practice every day to grow your 🔥 streak.</p><div class="grid">`;
  for (const c of LANGS) {
    const [flag, name, native, color] = META[c];
    const total = 91, known = Object.keys(S.known).filter(k => k.startsWith(c + '|')).length;
    html += `<a class="card lang" style="--c:${color}" href="#/${c}"><span class="flag">${flag}</span><span class="nm">${name}</span><span class="nt">${native}</span>
      <div class="bar"><i style="width:${Math.round(known / total * 100)}%"></i></div><span class="nt">${known} words learned</span></a>`;
  }
  app.innerHTML = html + '</div>';
}

async function langView(code) {
  const L = await load(code);
  let html = `<a class="back" href="#/">← All languages</a><h1>${L.flag} ${L.name} <span class="sub">${esc(L.native)}</span></h1>
    <div class="big-actions"><a class="btn pink" href="#/${code}/all/quiz">🎯 Mixed quiz (all topics)</a></div><h2>Topics</h2><div class="grid">`;
  for (const t of L.topics) {
    const k = knownCount(code, t), best = S.best[code + '|' + t.id];
    html += `<div class="card topic" style="--c:${L.color}"><span class="ic">${t.icon}</span><span class="nm">${t.name}</span>
      <span class="ct">${k}/${t.words.length} learned${best != null ? ' · best quiz ' + best + '/' + QUIZ_LEN : ''}</span>
      <div class="bar"><i style="width:${Math.round(k / t.words.length * 100)}%"></i></div>
      <div class="row"><a class="btn small" href="#/${code}/${t.id}/cards">🃏 Cards</a><a class="btn small alt" href="#/${code}/${t.id}/quiz">❓ Quiz</a></div></div>`;
  }
  app.innerHTML = html + '</div>';
}

async function cards(code, tid) {
  const L = await load(code), T = L.topics.find(t => t.id === tid);
  if (!T) return go('#/' + code);
  let i = 0;
  const render = () => {
    const w = T.words[i], s = split(w.t), known = S.known[kKey(code, tid, i)];
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name} topics</a><h1>${T.icon} ${T.name}</h1>
      ${T.note ? `<div class="note">💡 ${esc(T.note)}</div>` : ''}
      <div class="flash-wrap" style="--c:${L.color}"><div class="flash" id="flash">
        <div class="face">${known ? '<span class="known-tag">✓ learned</span>' : ''}<button class="speak" id="say" aria-label="Pronounce">🔊</button>
          <div class="tgt">${esc(s.main)}</div>${s.kana ? `<div class="kana">${esc(s.kana)}</div>` : ''}${w.r ? `<div class="rom">${esc(w.r)}</div>` : ''}
          <span class="hint">tap card to see meaning</span></div>
        <div class="face back-f"><div class="en">${esc(w.en)}</div><span class="hint">tap to flip back</span></div>
      </div></div>
      <div class="counter">${i + 1} / ${T.words.length}</div>
      <div class="ctrls"><button class="btn alt" id="prev">← Back</button><button class="btn pink" id="again">🔁 Still learning</button>
        <button class="btn ok" id="got">✓ Got it</button><button class="btn alt" id="next">Next →</button></div>
      ${synth ? '' : '<p class="warn">Your browser does not support speech, so 🔊 is off.</p>'}`;
    const flash = document.getElementById('flash');
    flash.onclick = e => { if (e.target.id !== 'say') flash.classList.toggle('flipped'); };
    document.getElementById('say').onclick = () => speak(w.t, L.speech);
    document.getElementById('prev').onclick = () => { i = (i - 1 + T.words.length) % T.words.length; render(); };
    document.getElementById('next').onclick = () => { i = (i + 1) % T.words.length; render(); };
    document.getElementById('again').onclick = () => { delete S.known[kKey(code, tid, i)]; activity(1); i = (i + 1) % T.words.length; render(); };
    document.getElementById('got').onclick = () => { const k = kKey(code, tid, i); activity(S.known[k] ? 1 : 5); S.known[k] = 1; save(); i = (i + 1) % T.words.length; render(); };
    speak(w.t, L.speech);
  };
  render();
}

async function quiz(code, tid) {
  const L = await load(code);
  const topics = tid === 'all' ? L.topics : L.topics.filter(t => t.id === tid);
  if (!topics.length) return go('#/' + code);
  const pool = topics.flatMap(t => t.words.map((w, i) => ({ ...w, tid: t.id, i })));
  const qs = shuffle(pool).slice(0, QUIZ_LEN);
  const title = tid === 'all' ? '🎯 Mixed quiz' : topics[0].icon + ' ' + topics[0].name + ' quiz';
  let n = 0, score = 0;
  const label = w => { const s = split(w.t); return esc(s.main) + (w.r ? `<small>${esc(w.r)}</small>` : ''); };
  const render = () => {
    if (n >= qs.length) return finish();
    const a = qs[n], toEn = Math.random() < 0.5;
    const distract = [];
    for (const d of shuffle(pool)) {
      if (distract.length === 3) break;
      if (d.t === a.t || d.en === a.en || distract.some(x => x.t === d.t || x.en === d.en)) continue;
      distract.push(d);
    }
    const opts = shuffle([a, ...distract]);
    const s = split(a.t);
    app.innerHTML = `<a class="back" href="#/${code}">← ${L.name} topics</a><h1>${title}</h1>
      <div class="progress"><i style="width:${n / qs.length * 100}%"></i></div>
      <div class="q"><div class="sub">${toEn ? 'What does this mean?' : 'How do you say this in ' + L.name + '?'}</div>
        <div class="prompt">${toEn ? esc(s.main) : esc(a.en)}</div>
        ${toEn && a.r ? `<div class="rom">${esc(a.r)}</div>` : ''}
        ${toEn ? '<button class="btn alt small" id="say">🔊 Listen</button>' : ''}</div>
      <div class="opts">${opts.map((o, k) => `<button class="opt" data-k="${k}">${toEn ? esc(o.en) : label(o)}</button>`).join('')}</div>
      <p class="counter">Question ${n + 1} of ${qs.length} · Score ${score}</p>`;
    if (toEn) { document.getElementById('say').onclick = () => speak(a.t, L.speech); speak(a.t, L.speech); }
    let done = false;
    app.querySelectorAll('.opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const o = opts[+b.dataset.k], right = o === a;
      app.querySelectorAll('.opt').forEach(x => { if (opts[+x.dataset.k] === a) x.classList.add('right'); });
      if (!right) b.classList.add('wrong'); else { score++; activity(10); S.known[kKey(code, a.tid, a.i)] = 1; save(); }
      if (!toEn) speak(a.t, L.speech);
      setTimeout(() => { n++; render(); }, right ? 900 : 1800);
    });
  };
  const finish = () => {
    const key = code + '|' + tid;
    if (tid !== 'all') S.best[key] = Math.max(S.best[key] || 0, score);
    activity(score === qs.length ? 20 : 2); save();
    const msg = score === qs.length ? 'Perfect! 🏆' : score >= qs.length * 0.7 ? 'Great job! 🎉' : 'Nice try, keep practicing! 💪';
    app.innerHTML = `<div class="card result"><h1>${msg}</h1><div class="score">${score} / ${qs.length}</div>
      <p class="sub">+${score * 10 + (score === qs.length ? 20 : 2)} XP · 🔥 ${liveStreak()} day streak</p>
      <div class="ctrls"><a class="btn" href="#/${code}/${tid}/quiz?r=${Date.now()}">Play again</a><a class="btn alt" href="#/${code}">Back to topics</a></div></div>`;
  };
  render();
}

/* ---------- router ---------- */
function go(h) { location.hash = h; }
function route() {
  if (synth) synth.cancel();
  const [code, tid, mode] = location.hash.replace(/^#\/?/, '').split('?')[0].split('/');
  window.scrollTo(0, 0);
  if (!code || !LANGS.includes(code)) return home();
  if (!tid) return langView(code);
  return mode === 'quiz' ? quiz(code, tid) : cards(code, tid);
}
window.addEventListener('hashchange', route);
updateStats(); route();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
