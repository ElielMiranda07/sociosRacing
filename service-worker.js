const CACHE_NAME = "socios-racing-v1";

const urlsToCache = [
  "/",
  "/login.html",
  "/dashboard.html",
  "/login.js",
  "/dashboard.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request)),
  );
});
