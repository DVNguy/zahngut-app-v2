// Service Worker für Zahngut App mit Firebase
const CACHE_NAME = 'zahngut-v1.0.0';
const DYNAMIC_CACHE = 'zahngut-dynamic-v1.0.0';

// Wichtige URLs die immer gecacht werden sollen
const urlsToCache = [
  '/',
  '/index.html',
  '/data.js',
  '/manifest.json',
  '/firebase-config.js',
  '/firebase-service.js',
  // Firebase SDKs von CDN
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js'
];

// Install Event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        // Cache each file individually, continue on error
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

// Fetch Event - Network First with Cache Fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip Chrome extensions and dev tools
  if (url.protocol === 'chrome-extension:' || 
      url.protocol === 'devtools:' ||
      url.hostname === 'localhost' && url.port !== '8080') {
    return;
  }
  
  // Firebase API calls - always try network first
  if (url.hostname.includes('firebaseapp.com') || 
      url.hostname.includes('googleapis.com') ||
      url.hostname.includes('firebaseio.com') ||
      url.hostname.includes('firebasestorage.app')) {
    
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful Firebase responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Try cache for Firebase resources
          return caches.match(request).then(response => {
            if (response) {
              console.log('[Service Worker] Serving Firebase from cache:', request.url);
              return response;
            }
            // Return empty JSON for API calls when offline
            if (url.pathname.includes('/api/') || url.hostname.includes('firestore')) {
              return new Response('{"offline": true}', {
                headers: { 'Content-Type': 'application/json' }
              });
            }
            return new Response('Offline', { status: 503 });
          });
        })
    );
    return;
  }
  
  // Firebase JavaScript libraries from CDN
  if (url.hostname === 'www.gstatic.com' && url.pathname.includes('firebase')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('[Service Worker] Serving Firebase SDK from cache:', request.url);
            return response;
          }
          
          return fetch(request)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                  cache.put(request, responseToCache);
                });
              }
              return response;
            })
            .catch(() => {
              console.error('[Service Worker] Failed to fetch Firebase SDK:', request.url);
              return new Response('Firebase SDK not available offline', { status: 503 });
            });
        })
    );
    return;
  }
  
  // All other requests: Network First, Cache Fallback
  event.respondWith(
    fetch(request)
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
        // Offline - try cache
        return caches.match(request)
          .then(response => {
            if (response) {
              console.log('[Service Worker] Serving from cache:', request.url);
              return response;
            }
            
            // Special fallbacks
            if (request.destination === 'document' || 
                (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
              return caches.match('/index.html');
            }
            
            // Default offline response
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
  
  if (event.tag === 'sync-firebase-data') {
    event.waitUntil(
      // Sync offline changes to Firebase when back online
      syncWithFirebase()
    );
  }
});

// Sync function
async function syncWithFirebase() {
  try {
    console.log('[Service Worker] Syncing with Firebase...');
    // This would sync any offline changes
    // For now, just clear old caches
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
