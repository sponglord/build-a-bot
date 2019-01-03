/**
 * Re. chap 6 - Managing State & Server Communication with Vuex
 *
 * Vuex creates a central store where we can store and retrieve data in a way that works well with change detection
 * across the whole of a Vue application.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import robotsModule from './modules/robots'
import usersModule from './modules/users'

/**
 * Tell our vue instance we are using Vuex
 */
Vue.use(Vuex);


/**
 * At the heart of Vuex is the Vuex Store which has 4 key areas of fny: State, Mutations (sync), Actions (async) & Getters
 */
export default new Vuex.Store({

//    state:{
//        foo: 'rootFoo'
//    },

    /**
     * Re. 6_9 Organising the Store with Modules
     */
    modules:{
        robots: robotsModule,
        users: usersModule,
    },

    /**
     * Re. 6_10 Namespacing Modules
     *
     * *** See comment in robots.js about namespacing ***
     */


//    getters:{
//        foo(state){
//            return '';
//        }
//    }
});