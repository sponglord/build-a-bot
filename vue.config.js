/**
 * NOTE: Doesn't work in our setup - presumably because we're not using Vue-cli
 * Instead see: 'proxy' entry in webpack.config.js
 *
 * Re. chap 6 - Managing State & Server Communication with Vuex
 *
 * Re. 6_6 - Using Actions to Work with APIs...
 *
 * Vue allows us to configure a built Proxy so we can proxy our api (running on localhost:8081 - see built-a-bot-server dir)
 * through the Webpack Dev server that Vue is being served from
 */
module.exports = {
    devServer : {
        proxy : {
            '/api' : {
                target : 'http://localhost:8081',
                changeOrigin : true,
            }
        }
    }
}