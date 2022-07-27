module.exports = {
  pwa: {
    name: 'easy-front-vue-cli3',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/service-worker.js',
      // importWorkboxFrom: 'disabled',
      // importScripts: 'https://cdn.your.info/workbox-v4.3.1/workbox-sw.js',
      importScripts: 'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
      // ...other Workbox options...
    },
  },
};
