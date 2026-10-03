// Network-first service worker: always tries fresh files (so updates show up), falls back to cache offline.
const CACHE = 'lingo-world-v6';
const CORE = ['./', 'index.html', 'style.css', 'characters.js', 'app.js', 'manifest.json', 'icons/icon.svg',
  'data/es.json', 'data/fr.json', 'data/zh.json', 'data/yue.json', 'data/ja.json', 'data/ko.json'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(res => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match('index.html')))
  );
});
