const CACHE_NAME = 'pesan-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  // Let Google Script POST requests bypass the cache directly
  if (e.request.method === 'POST') return;
  
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});