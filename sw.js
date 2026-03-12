const CACHE_NAME = 'smartbiz-v2'; // Changement de nom pour forcer la mise à jour
const assets = [
  './',
  './index.html',
  './logoapp.png',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css'
];

// Installation : Mise en cache des ressources de base
self.addEventListener('install', e => {
  self.skipWaiting(); // Force le nouveau SW à prendre le contrôle immédiatement
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assets))
  );
});

// Activation : Nettoyage des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Stratégie Network-First : On privilégie les données fraîches
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
