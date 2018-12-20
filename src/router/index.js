/**
 * A place to define all the routes within our SPA
 * (See index.js as the place where we add this router to our Vue instance)
 */

import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartsInfo.vue';

//Re. 5_8: Using Nested Routes
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';

// Re. 5_9: Using Named Views
import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';

// Re. chap 6 - Managing State & Server Communication with Vuex
import ShoppingCart from '../cart/ShoppingCart.vue'

/**
 * Tell Vue to use the router
 */
Vue.use(Router);

/**
 * Export router passing in routes configuration object
 */
export default new Router({

    /**
     * Re. 5_10: Enabling HTML5 History Mode
     *
     * Setting this mode removes the # signs from the URL
     * However this has one consequence - the URLS that are now generated are only understood when run locally because
     * Vue/Webpack Dev Server know how to serves these URLs e.g. localhost:8050/parts/heads/1.
     *
     * A server will not understand them.
     *
     * NOTE: In fact even our local environment doesn't understand them if you try to navigate straight in to one of them
     * e.g. localhost:8050/build - you actually need to start at base level: localhost:8050 every time and navigate from there
     *
     * This is not the case with #-tag routing 'cos only the part before the # is sent to the server everything else is
     * handled client-side.
     *
     * In order for these URLs to work on a server - you need to configure your server to always serve up the
     * main index.html whenever these URLs are requested. (See the Vue documentation for "HTML5 History Mode")
     */
//    mode : 'history',

    /**
     * Declare routes
     */
    routes : [
        /**
         * First route re. 5_2: Adding Routing to Your App
         */
//        {
//            path : '/', // When Vue sees this URL in the browser it should navigate to the route...
//            name : 'Home',//... with this name...
//            component : HomePage//...which refers to this component
//        },
        /**
         * 2nd route re. 5_2: Adding Routing to Your App
         */
//        {
//            path : '/build', // When Vue sees this URL in the browser it should navigate to the route...
//            name : 'Build',//... with this name...
//            component : RobotBuilder//...which refers to this component
//        },
        /**
         * First route Re. 5_9: Using Named Views (multiple sibling routes)
         */
        {
            path : '/',
            name : 'Home',
            /**
             *  We now have a components property whose value is a keyed object
             */
            components : {
                default : HomePage,// When our Home page is displayed the "default" router-view should display HomePage...
                sidebar : SidebarStandard// ...and the "sidebar" router-view should display SidebarStandard
            }
        },
        /**
         * 2nd route Re. 5_9: Using Named Views
         */
        {
            path : '/build',
            name : 'Build',
            components : {
                default : RobotBuilder,// When our Build page is displayed the "default" router-view should display RobotBuilder...
                sidebar : SidebarBuild// ...and the "sidebar" router-view should display SidebarBuild
            }
        },
        /**
         * Re. 5_8: Using Nested Routes (parent-child routes)
         * The order is important - this needs to be above the route below where we pass parameters to the parts route
         * otherwise that route would try and process this route first thinking we were passing it a 'browse' partType param
         * NOTE: not sure this is actually true - moved this route below the parts/:params route and it all still worked
         */
        {
            /**
             * Parent route
             */
            path : '/parts/browse',
            name : 'BrowseParts',
            component : BrowseParts,
            /**
             * Child routes for this parent
             */
            children : [
                {
                    path : 'heads',// This path is relative to the parent route: the full route is 'parts/browse/heads'
                    name : 'BrowseHeads',
                    component: RobotHeads
                },
                {
                    path : 'arms',
                    name : 'BrowseArms',
                    component: RobotArms
                },
                {
                    path : 'torsos',
                    name : 'BrowseTorsos',
                    component: RobotTorsos
                },
                {
                    path : 'bases',
                    name : 'BrowseBases',
                    component: RobotBases
                },
            ]
        },
        /**
         * Re. 5_6: Working with Route Params
         * Advanced route - so we can pass extra information in the URL
         * e.g. for a parts route: which parts section and which actual part.
         * To do this you use a colon followed by a variable name - which allows a route url like '/parts/heads/3'
         */
        {
            path : '/parts/:partType/:id',// we can use these 2 vars to look up a part from our parts list
            name : 'Parts',
            component : PartInfo,
            /**
             * Re. 5_7: Passing Params as Props: pass the params Vue identifies on the URL as props rather than route params
             * - see PartsInfo.vue for further explanation
             */
            props : true,
            /**
             * Re. 5_11: Preventing Pages from Loading with Navigation Guards aka Route Guards
             * These guards can be placed either on the route or the component and are use to stop navigation to invalid
             * pages.
             * Here we add a guard to the route...
             *
             * @param to - the route being navigated to
             * @param from - the route being navigated to
             * @param next - a function to call to allow or block navigation
             */
            beforeEnter(to, from, next){

                // Don't navigate if the id is not a number

                // We can get the id param off the "to" route
                const isValidId = Number.isInteger( Number(to.params.id) );

                // If you want the navigation to proceed call the "next" fn with the parameter true
                // or block it by passing false
                next(isValidId);

                if(window.console && window.console.log){
                    window.console.log('### index::beforeEnter:: isValidId for route=',isValidId);
                }
            }
        },

        /**
         * Re. chap 6 - Managing State & Server Communication with Vuex
         */
        {
            path : '/cart',
            name : 'Cart',
            component : ShoppingCart
        }
    ],
});