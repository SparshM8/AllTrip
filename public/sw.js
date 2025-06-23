const CACHE_NAME = 'alltripp-v1';
const urlsToCache = [
  '/',
  '/blog',
  '/packages',
  '/destinations',
  '/contact',
  '/destinations/kerala.jpg',
  '/destinations/kashmir.jpg',
  '/destinations/rajasthan.jpg',
  '/himalayas.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});
