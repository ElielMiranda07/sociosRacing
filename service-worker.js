const VERSION = "1.0.2";
const CACHE_NAME = `socios-racing-${VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

// ================= INSTALL =================
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }),
  );
});

// ================= ACTIVATE =================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        }),
      ),
    ),
  );

  return self.clients.claim();
});

// ================= FETCH =================
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // 🔥 No interceptar Firebase
  if (request.url.includes("firebase")) {
    return;
  }

  // 🔥 Para HTML y JS → Network First
  if (request.destination === "document" || request.destination === "script") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(request)),
    );
    return;
  }

  // 🔥 Para imágenes → Cache First
  if (request.destination === "image") {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      }),
    );
    return;
  }
});
