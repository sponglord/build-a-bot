/**
 * Re. chap 6 - Managing State & Server Communication with Vuex
 *
 * Vuex creates a central store where we can store and retrieve data in a way that works well with change detection
 * across the whole of a Vue application.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

/**
 * Tell our vue instance we are using Vuex
 */
Vue.use(Vuex);


/**
 * At the heart of Vuex is the Vuex Store which has 4 key areas of fny: State, Mutations (sync), Actions (async) & Getters
 */
export default new Vuex.Store({

    /**
     * State
     * Where all of the data for your app is stored
     */
    state: {
        /**
         * It is important for Vue's change detection that you start with a default value for everything that you add to the store.
         * Vue's change detection works by tapping into the getter/setters of objects in the store - these need to be initiated
         * with a default value for this detection to begin
         */
        cart: [],
        parts : null,
    },

    /**
     * Mutations
     * All changes to data in a store must happen through a mutation
     * Mutations are synchronous
     * By telling a store to commit a mutation we keep everything consistent & working well wth change detection
     *
     * Mutations are accessed via this.$store.commit(mutationName, dataToPassToMutation); (see RobotBuilder.vue for example)
     */
    mutations : {

        /**
         * Called from RobotBuilder
         *
         * @param state is passed to the mutation when we use the built in commit fn i.e. this.$store.commit(mutationName, data)
         * @param robot - is the data we pass to our mutation: the 2nd param in the call to this.$store.commit
         */
        addRobotToCart(state, robot){
            state.cart.push(robot);
        },

        updateParts(state, parts){
            state.parts = parts;
        }
    },

    /**
     * Actions
     * Actions are asynchronous (use Promises / async-await) to e.g. make a call to an API to fetch data
     * When these async constructs are finished they commit a mutation to the store.
     * Actions & Mutations work hand in hand to make asynchronous calls and then mutate the state
     *
     * Actions are accessed via this.$store.dispatch(actionName); (see RobotBuilder.vue for example)
     */
    actions: {

        /**
         * Retrieve list of parts from the build-a-bot-server API
         *
         * The first parameter to an action function is a context object.
         * This is an object that exposes several items for working with the state.
         * This context can be destructured like so: getParts( {state, getters, commit, dispatch} )
         *
         * Here however we just need the commit fn (which is how we call mutations on the store - see RobotBuilder)
         */
        getParts( {commit} ){

            axios.get('/api/parts')
                .then(result => {

//                    if(window.console && window.console.log){
//                        window.console.log('### index::store::getParts result.data=',result.data);
//                    }

                    return commit('updateParts', result.data)

                })// Use the destructured 'commit' to access the mutation 'updateParts'
                .catch(console.error);
        },

        /**
         * Re. 6_7 Using Actions to Save Data to an API
         */
        addRobotToCart({commit, state}, robot){

            /**
             * The API expects a fully populated cart object...
             * ..so get current cart fromm state, append this robot and pass to API
             */
            const cart = [...state.cart, robot];// Spread existing cart (adds all items) to our new array PLUS add new robot
            /**
             * re. above
             * "The spread operator can also (non-destructively) turn the contents of its operand into Array elements"
             * - re. http://exploringjs.com/es6/ch_core-features.html#sec_from-apply-to-spread
             */

            return axios.post('/api/cart', cart)
                .then( (result) => {

                    /**
                     * Update local Vuex state to also include the new robot AFTER post to API has succeeded
                     *
                     * Call our mutation
                     */
                    commit('addRobotToCart', robot);

                    if(window.console && window.console.log){
                        window.console.log('### index::THEN FROM ACTION:: result=',result);
                    }

                    return 'data from Action\'s "then"';
                });
        }

    },

    /**
     * Getters
     * Sometimes when you access data from the store you want to perform some complex calculation logic
     * before returning the data e.g. a filter operation
     * For this we use getters
     */
    getters : {

        /**
         * Only return items from the store that are on sale
         */
        cartSaleItems(state){
            return state.cart.filter( item => {
                return (item.head.onSale || item.leftArm.onSale || item.torso.onSale || item.rightArm.onSale || item.base.onSale);
            })
        }
    }
});