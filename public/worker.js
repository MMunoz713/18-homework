const Data_Cache_name = "data-cache-v2"
let cache_name = "static-cache-v1"

let Cache_files =[
    "./",
"./index.html", 
"./styles.css",
"./db.js",
"./index.js",
];

// install event for service worker
self.addEventListener("install", function (evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Files pre-cached successfully!");
        return cache.addAll(Cache_files);
      })
    );
});

self.addEventListener("fetch", function (event) {
    if (event.request.url.includes("/api/")) {
        event.respondWith(
          caches.open(Data_Cache_name).then(cache => {
            return fetch(event.request)
              .then(response => {
                // If the response was good, clone it and store it in the cache.
                if (response.status === 200) {
                  cache.put(event.request.url, response.clone());
                }
    
                return response;
              })
              .catch(err => {
                // Network request failed, try to get it from the cache.
                return cache.match(event.request);
              });
          }).catch(err => console.log(err))
        );
    
        return;
    }
})

event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request).then(function(cachedResponse) {
        if (cachedResponse) {
            return(cachedResponse)
  );
});