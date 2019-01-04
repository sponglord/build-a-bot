import Vue from 'vue';
import App from './App.vue';

import router from './router';
import store from './store';

/**
 * Re. 7_4 Making Directives Available Globally
 *
 * As with local directives (see PartSelector.vue) the Vue.directive property takes an object
 * where the key is the name of your directive i.e. v-pin & the value is the variable that the directive is imported under
 */
import pinDirective from './shared/pin-directive';
Vue.directive('pin', pinDirective);

/**
 * Re. 7_6 Creating a Custom Filter
 *
 * As with local filters (see ShoppingCart.vue) the Vue.filter property takes an object
 * where the key is the name of your filter i.e. currency & the value is the variable that the filter is imported under
 */
import currencyFilter from './shared/currency-filter';
Vue.filter('currency', currencyFilter);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    router,// Declare our router (see ./router/index.js)
    store,// Declare our vuex store (see ./store/index.js)
}).$mount('#app');