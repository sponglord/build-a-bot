import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,// Declare our router (see ./router/index.js)
    store,// Declare our vuex store (see ./store/index.js)
}).$mount('#app');
