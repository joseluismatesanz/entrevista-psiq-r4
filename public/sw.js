const CACHE_NAME = "psiq-r4-cache-v1";
const OFFLINE_URLS = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png"
  // Nota: Vite generará /assets/*.js y /assets/*.css en build;
  // en producción puedes hacer precache más estricto con Workbox.
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(OFFLINE_URLS);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  // Estrategia cache-first para GET
  if (req.method === "GET") {
    event.respondWith(
      caches.match(req).then(cachedRes => {
        if (cachedRes) return cachedRes;
        return fetch(req).then(netRes => {
          // Guardado dinámico de nuevos assets
          const resClone = netRes.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          return netRes;
        }).catch(() => {
          // fallback muy simple
          if (req.mode === "navigate") {
            return caches.match("/index.html");
          }
        });
      })
    );
  }
});
