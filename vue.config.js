// vue.config.js

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
  // 选项...
  // publicPath: '/',  //用新的vscode用GoLive開啟
  //   publicPath: '/dist/', // 在此vscode用GoLive開啟
  // '/VueSpringClass_vuecli_version1/'
  // '/repoName/'
  publicPath: process.env.NODE_ENV === 'production' ? '/node-spring-class_mid/' : '/',

};
