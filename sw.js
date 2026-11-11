const CACHE_NAME = 'solo-lab-pos-v2';  // ← Changed version number!
const ASSETS = [
  './',
  './index.html',
  './billing.html',          // ✅ Your billing page
  './sales-history.html',     // ✅ Sales history
  './reports.html',           // ✅ Reports page
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
