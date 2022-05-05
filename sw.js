console.log('service worker inside sw.js');

const cacheNAme = 'app-shell-rsrs';
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
];

// install service worker
self.addEventListener('install', (event) => {
  console.log('service worker has been installed');
  // wait for install event and save
  event.waitUntil(
    caches.open(cacheNAme).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', (event) => {
  console.log('service worker has been activated');
});

// fetch event
self.addEventListener('fetch', (event) => {
  console.log('fetch event', event);

  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes;
    })
  );
});
