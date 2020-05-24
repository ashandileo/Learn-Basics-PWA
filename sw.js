const staticCacheName = 'site-static';
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
    console.log('service worker has been activated');
});

// Fetch Events
self.addEventListener('fetch', e => {
    console.log('fetch event', e);
});