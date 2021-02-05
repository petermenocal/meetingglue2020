importScripts('workbox-v3.4.1/workbox-sw.js');

self.addEventListener('message', ({ data }) => {
  if (data === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.workbox.precaching.precacheAndRoute([]);
