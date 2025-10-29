const CACHE_NAME = "psiq-r4-cache-v1";
const OFFLINE_URLS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./index.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method === "GET") {
    event.respondWith(
      caches.match(req).then(cachedRes => {
        if (cachedRes) return cachedRes;
        return fetch(req)
          .then(netRes => {
            const resClone = netRes.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
            return netRes;
          })
          .catch(() => {
            // Si estamos offline y navegando, devolver index.html
            if (req.mode === "navigate") {
              return caches.match("./index.html");
            }
          });
      })
    );
  }
});
