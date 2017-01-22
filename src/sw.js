const CACHE_NAME = 'ranklol-v1'
self.addEventListener('fetch', function(event) {
  console.log('fetch event : ', event)

  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          console.log('Response from cache ', response)
          return response;
        }

        // IMPORTANT: Clone the request. A request is a stream and
        // can only be consumed once. Since we are consuming this
        // once by cache and once by the browser for fetch, we need
        // to clone the response.
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            console.log('Response of request ', response)
            // Check if we received a valid response
            if(!response || response.status !== 200) {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                console.log('Adding to cache : ', responseToCache)
                cache.put(event.request, responseToCache);
              })
              .catch(function(err) {
                console.error(err);
              });

            return response;
          }
        );
      })
    );
});
