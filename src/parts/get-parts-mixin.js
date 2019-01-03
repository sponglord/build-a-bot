/**
 * Re. 6_6 Using Actions to Work with APIs...
 */
export default {
    created(){

//        this.$store.dispatch('getParts');

        /**
         * Re. 6_10 Namespacing Modules
         * Now we are namespacing our modules we need to include the modules name in any call to Actions, Mutations or Getters
         */
        this.$store.dispatch('robots/getParts');
    },
    computed:{
        parts(){
            /**
             * Create defaultObj that will initially be used to render templates (until the async action has completed)
             */
            const defaultObj = {
                heads  : [],
                arms   : [],
                torsos : [],
                bases  : [],
            }

//            return this.$store.state.parts || defaultObj;

            /**
             * Re. 6_9 Organising the Store with Modules
             *
             * Access our newly created 'robots' module
             */
            return this.$store.state.robots.parts || defaultObj;
        }
    }
}