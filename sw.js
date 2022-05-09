console.log('service worker inside sw.js');

const cacheName = 'app-shell-rsrs';
const dynamicCacheName = 'dynamic-cache-v1';
const assets = [
  '/',
  'index.html',
  'js/app.js',
  'js/common.js',
  'js/materialize.min.js',
  'css/styles.css',
  'css/materialize.min.css',
  'img/pkcontacts.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v128/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  'pages/default.html',
];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install service worker
self.addEventListener('install', (event) => {
  console.log('service worker has been installed');
  // wait for install event and save
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', (event) => {
  console.log('service worker has been activated');

  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.fillter((key) => key !== cacheName).map((key) => caches.delete())
      );
    })
  );
});

// fetch event
self.addEventListener('fetch', (event) => {
  console.log('fetch event', event);

  event.respondWith(
    caches
      .match(event.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(event.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(event.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 5);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (event.request.url.indexOf('.html') > -1) {
          return caches.match('pages/default.html');
        }
      })
  );
});
