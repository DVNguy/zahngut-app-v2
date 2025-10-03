// Service Worker for Zahngut PWA App
const CACHE_NAME = 'zahngut-v1.1.0';
const DYNAMIC_CACHE = 'zahngut-dynamic-v1.1.0';

// Core files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/data.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// Install Event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return Promise.allSettled(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}: ${response.status}`);
                }
                return cache.put(url, response);
              })
              .catch(err => {
                console.warn(`[Service Worker] Failed to cache ${url}:`, err.message);
              });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Install complete');
        return self.skipWaiting();
      })
  );
});

// Activate Event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName.startsWith('zahngut-') &&
                   cacheName !== CACHE_NAME &&
                   cacheName !== DYNAMIC_CACHE;
          })
          .map(cacheName => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      console.log('[Service Worker] Activate complete');
      return self.clients.claim();
    })
  );
});

// Fetch Event - Cache First with Network Fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip Chrome extensions and dev tools
  if (url.protocol === 'chrome-extension:' ||
      url.protocol === 'devtools:' ||
      (url.hostname === 'localhost' && url.port !== '8080')) {
    return;
  }

  // External resources (like Doctolib, YouTube links) - always try network first
  if (url.hostname !== location.hostname && url.hostname !== 'localhost') {
    event.respondWith(
      fetch(request)
        .catch(() => {
          return new Response('Offline - External resource unavailable', { status: 503 });
        })
    );
    return;
  }

  // Local resources: Cache First, Network Fallback
  event.respondWith(
    caches.match(request)
      .then(response => {
        if (response) {
          console.log('[Service Worker] Serving from cache:', request.url);
          return response;
        }

        // Not in cache, fetch from network
        return fetch(request)
          .then(response => {
            // Cache successful responses
            if (response && response.status === 200 && response.type === 'basic') {
              const responseToCache = response.clone();
              caches.open(DYNAMIC_CACHE)
                .then(cache => {
                  cache.put(request, responseToCache);
                })
                .catch(err => {
                  console.warn('[Service Worker] Cache put failed:', err);
                });
            }
            return response;
          })
          .catch(() => {
            // Offline - try to serve index.html for navigation requests
            if (request.destination === 'document' ||
                (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
              return caches.match('/index.html');
            }

            return new Response('Offline - Resource not cached', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background Sync
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background sync:', event.tag);

  if (event.tag === 'sync-app-data') {
    event.waitUntil(syncAppData());
  }
});

// Sync function
async function syncAppData() {
  try {
    console.log('[Service Worker] Syncing app data...');
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name =>
      name.startsWith('zahngut-') &&
      name !== CACHE_NAME &&
      name !== DYNAMIC_CACHE
    );

    await Promise.all(oldCaches.map(name => caches.delete(name)));
    console.log('[Service Worker] Sync complete');
  } catch (error) {
    console.error('[Service Worker] Sync failed:', error);
  }
}

console.log('[Service Worker] Script loaded');
