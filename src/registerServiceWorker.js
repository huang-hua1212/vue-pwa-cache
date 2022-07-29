// /src/serviceWorker.js
import { register } from 'register-service-worker';
import path from 'path';

async function estimate() {
  const quota = await navigator.storage.estimate();
  // quota.usage -> 用了多少 bytes
  // quota.quota -> 還剩多少 bytes 可使用
  const percentageUsed = (quota.usage / quota.quota) * 100;
  console.log(`${percentageUsed}% 已使用`);
  const remaining = quota.quota - quota.usage;
  console.log(`還可以寫入 ${remaining} bytes`);
}
// 判斷瀏覽器是否可使用serviceWorker功能
if ('serviceWorker' in navigator) {
  estimate();
  console.log('yes!!');
} else {
  console.log('no!!');
}
// process.env.NODE_ENV === 'production'
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development') {
  console.log(path.resolve(`${process.env.BASE_URL}service-worker.js`));
  // register(`${process.env.BASE_URL}service-worker.js`,
  register(`${process.env.BASE_URL}service-worker.js`, { scope: '/' }, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n'
        + 'For more details, visit https://goo.gl/AFskqB',
      );
    },
    registered() {
      console.log('Service worker has been registered.');
    },
    cached() {
      console.log('Content has been cached for offline use.');
    },
    updatefound() {
      console.log('New content is downloading.');
    },
    updated() {
      console.log('New content is available; please refresh.');
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
