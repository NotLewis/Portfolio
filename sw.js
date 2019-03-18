//Service Worker

//Cache Name
const pwaCache ='pwa-cache-23';

self.addEventListener('install', (e) => {

    let cacheReady = caches.open(pwaCache).then((cache) => {

        console.log('New Cache Ready')
        return cache.addAll([
            '/',
            'images/blackpoolsvg.svg',
            'main.js',
            'sw.js',
            'css/style.css',
            'images/logo.png',
            'pages/blog-industry.html',
            'pages/blog-optimisation.html',
            'pages/blog-portfolio.html'
        ])
    })

    e.waitUntil(cacheReady)
});


self.addEventListener('activate', (e) => {

   let cacheCleaned = caches.keys().then((keys) => {
        keys.forEach((key) => {
            if(key !== pwaCache) return caches.delete(key);
        })
    })

    e.waitUntil(cacheCleaned);
})

self.addEventListener('fetch', (e) => {

    // SKip for remote fetch
    if (!e.request.url.match(location.origin) ) return;

    // Serve local fetch from cache
    let newRes = caches.open(pwaCache).then((cache) => {
        return cache.match(e.request).then((res) => {
        
        // Check request was found in cache
        if (res) {
            console.log(`Serving ${res.url} from cache.`);
            return res;
        }

        //Fetch on behalf of client and cache
        return fetch(e.request).then((fetchRes) => {

            cache.put(e.request, fetchRes.clone());
            return fetchRes;
        });
    });
});

e.respondWith(newRes);

});



