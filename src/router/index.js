/**
 * A place to define all the routes within our SPA
 * (See index.js as the place where we add this router to our Vue instance)
 */

import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartsInfo.vue';

//Re. Using Nested Routes
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';

// Re. Using Named Views
import SidebarStandard from '../sidebars/SidebarStandard.vue';
import SidebarBuild from '../sidebars/SidebarBuild.vue';

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
         * First route re. Adding Routing to Your App
         */
//        {
//            path : '/', // When Vue sees this URL in the browser it should navigate to the route...
//            name : 'Home',//... with this name...
//            component : HomePage//...which refers to this component
//        },
        /**
         * 2nd route re. Adding Routing to Your App
         */
//        {
//            path : '/build', // When Vue sees this URL in the browser it should navigate to the route...
//            name : 'Build',//... with this name...
//            component : RobotBuilder//...which refers to this component
//        },
        /**
         * First route Re. Using Named Views (multiple sibling routes)
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
         * 2nd route Re. Using Named Views
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
         * Re. Using Nested Routes (parent-child routes)
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
        },
    ],
});