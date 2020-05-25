const staticCacheName = 'site-static-v4';
const dynamicCacheName = 'site-dynamic-v4';
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/ui.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/dish.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/pages/fallback.html'
];

// cache size limit function ///
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            console.log(keys.length);
            if (keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        });
    });
}


// Install Service Worker / 
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
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Events ////
self.addEventListener('fetch', e => {
    if(e.request.url.indexOf('firestore.googleapis.com') === -1) {
        e.respondWith(
            caches.match(e.request).then(cacheResponse => {
                return cacheResponse || fetch(e.request).then(fetchResponse => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(e.request.url, fetchResponse.clone());
                        limitCacheSize(dynamicCacheName, 20);
                        return fetchResponse;
                    })
                })
            }).catch(() => caches.match('/pages/fallback.html'))
        );
    }
});