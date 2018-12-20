<template>
    <div v-if="parts">
        <h1>{{ part.title }}</h1>
        <div >
            {{part.description}}
        </div>
    </div>
</template>

<script>
//    import parts from '../data/parts';
import getPartsMixin from './get-parts-mixin';

    export default {
        name : 'PartInfo',

        /**
         * Re. 6_6 Using Actions to Work with APIs...
         */
        mixins: [getPartsMixin],

        /**
         * Hard coded data
         */
//        data(){
//            return{
//                part : {
//                    title : 'Part Title',
//                    description : 'Part Description'
//                }
//            };
//        },
        /**
         * Re. Passing Params as Props
         */
        // N.B. Basic props
        // props: ['partType', 'id'],

        // Validated props
        props : {
            partType : {type : String},
            id : {type :[Number, String] }, // Allow Number or String
            // Validate to ensure value is a Number
            validator(value){
                return Number.isInteger( Number(value) );
            }
        },
        /**
         * Computed data using route parameters
         */
        computed: {
            part(){
                /**
                 * The parameters are available to us on the components route property
                 */
//                const partType = this.$route.params.partType;
//                const id = this.$route.params.id;
                /**
                 * Alternatively - use destructuring to get these params
                 * NOTE: these params are always strings
                 */
//                const {partType, id} = this.$route.params;
                /**
                 * Re. Passing Params as Props - One downside to the above syntax is that this component is
                 * bound to this.route - pulling the vars it needs (partType & id) from the routes params.
                 * If we feed these vars in as props then it removes the components dependency on the route, making
                 * the component reusable for other scenarios. This is done by setting the props property on
                 * the route to true - see router/index.js.
                 * Now the route params are passed as props to this component and this component can extract these
                 * params as props of 'this' component c.f. from this.$route.params
                 */
                const {partType, id} = this;

                /**
                 * Do lookup on parts object
                 * - find relevant array e.g. heads and then find which element in the array has a matching id
                 * This will return the whole parts object with title, description, cost etc
                 */
//                return parts[partType].find( part => part.id === +id);// N.B. shorthand '+' to cast id to Number

                /**
                 * Re. 6_6 Using Actions to Work with APIs...
                 */
                return this.parts[partType].find( part => part.id === +id);// N.B. shorthand '+' to cast id to Number
            }
        }
    };

</script>
