// Install Service Worker
self.addEventListener('install', e => {
    console.log('sevice worker has been installed');
});

// Active Service Workerrr
self.addEventListener('activate', e => {
    console.log('service worker has been activated');
});

// Fetch Events
self.addEventListener('fetch', e => {
    console.log('fetch event', e);
});