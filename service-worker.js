const CACHE_NAME = "socios-racing-v5";

const urlsToCache = [
  "/",
  "/login.html",
  "/dashboard.html",
  "/js/login.js",
  "/js/dashboard.js",
  "/manifest.json",
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
