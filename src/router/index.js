/**
 * A place to define all the routes within our SPA
 * (See index.js as the place where we add this router to our Vue instance)
 */

import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartsInfo.vue';

/**
 * Tell Vue to use the router
 */
Vue.use(Router);

/**
 * Export router passing in routes configuration object
 */
export default new Router({
    routes : [
        /**
         * First route
         */
        {
            path : '/', // When Vue sees this URL in the browser it should navigate to the route...
            name : 'Home',//... with this name...
            component : HomePage//...which refers to this component
        },
        /**
         * 2nd route
         */
        {
            path : '/build', // When Vue sees this URL in the browser it should navigate to the route...
            name : 'Build',//... with this name...
            component : RobotBuilder//...which refers to this component
        },
        /**
         * Basic route
         */
//        {
//            path : '/parts',
//            name : 'Parts',
//            component : PartInfo
//        }
        /**
         * Advanced route - so we can pass extra information in the URL
         * e.g. for a parts route: which parts section and which actual part.
         * To do this you use a colon followed by a variable name - which allows a route url like '/parts/heads/3'
         */
        {
            path : '/parts/:partType/:id',// we can use these 2 vars to look up a part from our parts list
            name : 'Parts',
            component : PartInfo,
            /**
             * Re. Passing Params as Props: pass the params Vue identifies on the URL as props rather than route params
             * - see PartsInfo.vue for further explanation
             */
            props : true
        }
    ],
});