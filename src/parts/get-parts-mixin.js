/**
 * Re. 6_6 Using Actions to Work with APIs...
 */
export default {
    created(){
        this.$store.dispatch('getParts');
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

            return this.$store.state.parts || defaultObj;
        }
    }
}