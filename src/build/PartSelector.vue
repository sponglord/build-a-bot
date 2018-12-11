<template>
    <!-- The classes on this child comp will evaluate to "part" + whatever is passed for the position prop e.g. "top" -->
    <div class="part" :class="position">
        <!-- @click Re. Navigating to routes with code -->
        <img :src="selectedPart.src" title="arm" @click="showPartInfo()"/>
        <!-- Alternative 'router-link' syntax -->
        <!--<router-link :to="{
                    name : 'Parts',
                    params : {
                        id : this.selectedPart.id,
                        partType : this.selectedPart.type
                    }
                }">
            <img :src="selectedPart.src" title="arm" @click="showPartInfo()"/>
        </router-link>-->
        <button @click="selectPreviousPart()" class="prev-selector"></button>
        <button @click="selectNextPart()" class="next-selector"></button>
        <span class="sale" v-show="selectedPart.onSale">Sale!</span>
    </div>
</template>

<script>
    function getPreviousValidIndex(index, length) {
        const deprecatedIndex = index - 1;
        return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
    }
    function getNextValidIndex(index, length) {
        const incrementedIndex = index + 1;
        return incrementedIndex > length - 1 ? 0 : incrementedIndex;
    }
    export default {
        /**
         * 1. Create a "parts" attribute that RobotBuilder can data bind to when it declares a <PartSelector :parts="[someData]"/>
         * "parts" then becomes available as a property of "this"
         */
        props: ['parts', 'position'],
        /**
         * 2. Validating props
         * - Use a props object where the key is the name of the expected property
         * & the value is an object declaring the expected type.
         * Failure to pass a value of the expected type will result in a console error:
         * "[Vue warn]: Invalid prop: type check failed for prop "parts". Expected Array, got String."
         */
        props: {
            parts : {type : Array, required : true},
            position : {
                type : String,
                /**
                 * 3. The type object can also specify if the prop is required:
                 * "[Vue warn]: Missing required prop: 'position'"
                 */
                required : true,
                /**
                 * 4. We can also validate the passed value beyond just specifying it's type
                 * e.g. to stop the passing of an empty string:
                 * "[Vue warn]: Invalid prop: custom validator check failed for prop 'position'."
                 */
                validator : function(value){

                    // return a test
                    return ['top', 'left', 'center', 'right', 'bottom'].includes(value);
                }
            }
        },
        data() {
            return { selectedPartIndex: 0 };
        },
        computed: {
            selectedPart() {
                return this.parts[this.selectedPartIndex];
            },
        },
        created(){
            this.emitSelectedPart();
        },
        /**
         * 6. The updated lifecycle hook is called whenever the data for a component is updated
         */
        updated(){
            this.emitSelectedPart();
        },
        methods: {
            emitSelectedPart(){
                /**
                 * 5. Every vue component has an emit fn that it can use to emit an event.
                 * Parent components can then bind to these events.
                 * Here we emit a 'partSelected' event passing along the computed property 'selectedPart' (which is a function
                 * that is run every time the computed property is referenced)
                 */
                this.$emit('partSelected', this.selectedPart);
            },
            selectNextPart() {
                this.selectedPartIndex = getNextValidIndex(
                    this.selectedPartIndex,
                    this.parts.length,
                );
//                this.emitSelectedPart();
            },
            selectPreviousPart() {
                this.selectedPartIndex = getPreviousValidIndex(
                    this.selectedPartIndex,
                    this.parts.length,
                );
//                this.emitSelectedPart();
            },
            /**
             * Re. Navigating to routes with code
             * Because we injected a router into our Vue instance in the main index.js file
             * we now have a router available here on this.$router
             */
            showPartInfo(){

                // e.g.1 - Pass in a route URL
//                this.$router.push('/parts');

                // e.g.2 - Use object syntax now we want to pass parameters
                this.$router.push({
                    name : 'Parts',
                    params : {
                        id : this.selectedPart.id,
                        partType : this.selectedPart.type
                    }
                });
            }
        },
    };
</script>

<style scoped>
    .part {
        position: relative;
        width:165px;
        height:165px;
        border: 3px solid #aaa;
    }
    .sale {
        position: absolute;
        bottom: 5px;
        right: 5px;
        color: white;
        background-color: red;
        padding: 3px;
    }
    .part-title {
        position: absolute;
        width: 100%;
        text-align: center;
        font-size: 18px;
        color: red;
        padding-top: 5px;
        top: -25px;
    }
    .part img {
        width:165px;
        cursor: pointer;
    }
    .top {
        border-bottom: none;
    }
    .left {
        border-right: none;
    }
    .right {
        border-left: none;
    }
    .bottom {
        border-top: none;
    }
    .left img {
        transform: rotate(-90deg);
    }
    .right img {
        transform: rotate(90deg);
    }
    .prev-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        left: -28px;
        width: 25px;
        height: 171px;
    }
    .next-selector {
        position: absolute;
        z-index:1;
        top: -3px;
        right: -28px;
        width: 25px;
        height: 171px;
    }
    .left .prev-selector:after,  .right .prev-selector:after{
        content: '\25B2'
    }
    .left .next-selector:after, .right .next-selector:after {
        content: '\25BC'
    }
    .top .prev-selector:after, .bottom .prev-selector:after, .center .prev-selector:after{
        content: '\25C4'
    }
    .top .next-selector:after, .bottom .next-selector:after, .center .next-selector:after{
        content: '\25BA'
    }
    .center .prev-selector, .center .next-selector {
        opacity:0.8;
    }
    .left .prev-selector {
        top: -28px;
        left: -3px;
        width: 144px;
        height: 25px;
    }
    .left .next-selector {
        top: auto;
        bottom: -28px;
        left: -3px;
        width: 144px;
        height: 25px;
    }
    .right .prev-selector {
        top: -28px;
        left: 24px;
        width: 144px;
        height: 25px;
    }
    .right .next-selector {
        top: auto;
        bottom: -28px;
        left: 24px;
        width: 144px;
        height: 25px;
    }
    .highlight {
        border: 1px solid red;
    }
</style>