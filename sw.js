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

caches.open(cacheNAme).then((cache) => {
  cache.addAll(assets);
});

// install service worker
self.addEventListener('install', (event) => {
  console.log('service worker has been installed');
});

// activate event
self.addEventListener('activate', (event) => {
  console.log('service worker has been activated');
});

// fetch event
self.addEventListener('fetch', (event) => {
  console.log('fetch event', event);
});
