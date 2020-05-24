const staticCacheName = 'site-static-v2';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// Install Service Worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching assets for offline mode');
            cache.addAll(assets);
        })
    );
});

// Active Service Workerrr
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Events
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(cacheResponse => {
            return cacheResponse || fetch(e.request);
        })
    );
});