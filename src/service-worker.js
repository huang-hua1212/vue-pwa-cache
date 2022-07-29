

// 方法一:workbox
workbox.core.skipWaiting(); // 强制等待中的 Service Worker 被激活
workbox.core.clientsClaim(); // Service Worker 被激活后使其立即获得页面控制权
workbox.precaching.precacheAndRoute(self.__precacheManifest || []);
// 缓存web的css资源
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'css-cache'
  })
);

// 缓存web的js资源
workbox.routing.registerRoute(
  // 缓存JS文件
  /.*\.js/,
  // 使用缓存，但尽快在后台更新
  workbox.strategies.staleWhileRevalidate({
    // 使用自定义缓存名称
    cacheName: 'js-cache'
  })
);

// 缓存web的图片资源
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60 // 设置缓存有效期为30天
      })
    ]
  })
);

// 我们很多资源在其他域名上，比如cdn、oss等，这里做单独处理，需要支持跨域
workbox.routing.registerRoute(
  /^https:\/\/cdn\.my\.com\/.*\.(jpe?g|png|gif|svg)/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cdn-images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 5 * 24 * 60 * 60 // 设置缓存有效期为5天
      })
    ],
    fetchOptions: {
      credentials: 'include' // 支持跨域
    }
  })
);

// 缓存get api请求的数据
workbox.routing.registerRoute(
  // new RegExp('https://m.my.com/api'),
  new RegExp('https://blooming-sands-85089.herokuapp.com'),
  workbox.strategies.networkFirst({
    cacheName: 'api'
  })
  // workbox.strategies.cacheFirst({
  //   cacheName: 'api'
  // })
  // workbox.strategies.staleWhileRevalidate({
  //   cacheName: 'api'
  // })
);

// 缓存post api请求的数据
// const bgSyncPlugin = new workbox.backgroundSync.Plugin('apiQueue', {
//   maxRetentionTime: 1 * 60
// });

// workbox.routing.registerRoute(
//   /.*\/api\/.*/,
//   new workbox.strategies.NetworkOnly({
//     plugins: [bgSyncPlugin]
//   }),
//   'POST'
// );








//方法二: pure js
// self.addEventListener('install', event => {
//   console.log('V1 installing…');
//   // cache a cat SVG
//   event.waitUntil(
//     caches.open('static-v1').then(cache => cache.add('service-worker.js')),
//     caches.open('static-v2').then(cache => cache.add('img/icons/android-chrome-192x192.png')),
//     // caches.open('static-v2').then(cache => cache.add('img/img.6ac7abb2.svg'))
//   );
// });

// self.addEventListener('activate', event => {
//   console.log('V1 now ready to handle activate!');
// });

// self.addEventListener('fetch', event => {
//   console.log('V1 now ready to handle fetches!');
//   const url = new URL(event.request.url);

//   // serve the cat SVG from the cache if the request is
//   // same-origin and the path is '/dog.svg'
//   if (url.origin == location.origin && url.pathname.endsWith('/service-worker.js')) {
//     event.respondWith(caches.match('service-worker.js'));
//   }
//   if (url.origin == location.origin && url.pathname.endsWith('/img/icons/android-chrome-192x192.png')) {
//     event.respondWith(caches.match('img/icons/android-chrome-192x192.png'));
//   }
//   // if (url.origin == location.origin && url.pathname.endsWith('/img/img.6ac7abb2.svg')) {
//   //   event.respondWith(caches.match('img/img.6ac7abb2.svg'));
//   // }
// });