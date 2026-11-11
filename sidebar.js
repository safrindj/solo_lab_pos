const CACHE_NAME = 'solo-lab-pos-v3';  // ← Bumped: fixed sale-history filename + added pages
const ASSETS = [
  './',
  './index.html',
  './billing.html',          // ✅ Your billing page
  './sale-history.html',     // ✅ Sale history (was sales-history.html — file is sale-history.html)
  './reports.html',           // ✅ Reports page
  './setting.html',           // ✅ Settings page
  './products-data.js',       // ✅ Product data
  './sidebar.js',             // ✅ Sidebar script
  './manifest.json',          // ✅ Manifest file
  './shop-logo.png'           // ✅ Shop logo
];

// Install: cache all pages
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();  // Activate immediately
});

// Activate: clean old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

// Fetch: serve from cache first
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
