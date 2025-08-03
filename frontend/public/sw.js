// PWA Service Worker Configuration
const CACHE_NAME = 'rygneco-v1.0.0';
const OFFLINE_URL = '/offline.html';

const STATIC_CACHE_URLS = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  OFFLINE_URL
];

const API_CACHE_URLS = [
  '/api/users/me',
  '/api/role-requests/pending'
];

// Install event - cache static resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  
  event.waitUntil(
    Promise.all([
      // Cache static resources
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_CACHE_URLS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => cacheName !== CACHE_NAME)
            .map((cacheName) => caches.delete(cacheName))
        );
      }),
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful navigation responses
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached page or offline page
          return caches.match(request).then((cachedResponse) => {
            return cachedResponse || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      // Network first strategy for API calls
      fetch(request)
        .then((response) => {
          // Cache successful GET requests
          if (request.method === 'GET' && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached response for GET requests
          if (request.method === 'GET') {
            return caches.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                // Add a header to indicate this is from cache
                const headers = new Headers(cachedResponse.headers);
                headers.set('X-From-Cache', 'true');
                return new Response(cachedResponse.body, {
                  status: cachedResponse.status,
                  statusText: cachedResponse.statusText,
                  headers: headers
                });
              }
              // Return offline message for API requests
              return new Response(
                JSON.stringify({ 
                  error: 'Offline', 
                  message: 'This request requires an internet connection' 
                }),
                {
                  status: 503,
                  headers: { 'Content-Type': 'application/json' }
                }
              );
            });
          }
          // For non-GET requests, return error
          return new Response(
            JSON.stringify({ 
              error: 'Offline', 
              message: 'This action requires an internet connection' 
            }),
            {
              status: 503,
              headers: { 'Content-Type': 'application/json' }
            }
          );
        })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    // Cache first strategy for static assets
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      
      return fetch(request).then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      });
    })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Process queued actions when back online
      processOfflineActions()
    );
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    data: {
      url: '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification('Rygneco E-Waste Tracker', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});

// Helper function to process offline actions
async function processOfflineActions() {
  try {
    // Get queued actions from IndexedDB
    const queuedActions = await getQueuedActions();
    
    for (const action of queuedActions) {
      try {
        // Retry the action
        await fetch(action.url, action.options);
        // Remove from queue on success
        await removeQueuedAction(action.id);
      } catch (error) {
        // Keep in queue for next sync
        console.log('Action still failing:', action);
      }
    }
  } catch (error) {
    console.error('Error processing offline actions:', error);
  }
}

// IndexedDB helpers (simplified)
async function getQueuedActions() {
  // Implementation would use IndexedDB to retrieve queued actions
  return [];
}

async function removeQueuedAction(id) {
  // Implementation would remove action from IndexedDB
}
