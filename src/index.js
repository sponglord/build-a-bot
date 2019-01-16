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

Vue.config.productionTip = false;// Stops the "You are running Vue in development mode..." console.log

//if(window.console && window.console.log){
//    window.console.log('### index::App:: ',App);
//}

new Vue({

    /**
     * Run the render function and passing in the App component declaration
     */
//    render: h => h(App),

    /**
     * Alternative to above (Re. Single Page Applications with Vue.js):
     * Extend the main Vue instance with the App component's render function
     * instead of running the render function and passing in the App component declaration
     *
     * Do this using the Spread operator - spread the properties of the App component into this declaration
     * of the Vue instance
     */
    ...App,

    router,// Declare our router (see ./router/index.js)
    store,// Declare our vuex store (see ./store/index.js)
}).$mount('#app');

/**
 * Other Notes Re. Single Page Applications with Vue.js
 */

/**
 * v-html
 * Vue automatically sanitizes HTML content before rendering it
 * To use content in a template without sanitizing & encoding use the v-html directive
 * i.e <h3 v-html="content.returned.from.server"></h3>
 * c.f. <h3>{{content.returned.from.server}}</h3>
 */

/**
 * v-model
 * To bind data properties to the values of corresponding input tags use v-model
 * Then every time the input is changed the corresponding property in the data will be updated
 * e.g.
 * <input v-model="password"/>
 * data(){
 *  return{
 *          paswword: '',
 *          username: ''
 *      }
 * }
 */