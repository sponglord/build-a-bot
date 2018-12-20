<template>
    <!-- Re. 6_6 Using Actions to Work with APIs...

    We use the v-if to stop Vue from trying to render the template before the 'created' lifecycle hook
    has fired to make a call to the Vuex store's async action 'getParts'

    This is necessary because on startup the component's computed property 'availableParts' will access the
    $store's default value for 'parts' ($store.state.parts) which is null and so the template will try to render
    it's <PartSelector> components with null data -->
    <div v-if="availableParts" class="content">

        <div class="preview">
            <!-- Re. Injecting content into a child component with slots
            CollapsibleSection.vue will have a Toggleable Content area into which we can inject content -->
            <CollabsibleSection>
                <div class="preview-content">
                    <div class="top-row">
                        <img :src="selectedRobot.head.src"/>
                    </div>
                    <div class="middle-row">
                        <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
                        <img :src="selectedRobot.torso.src"/>
                        <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
                    </div>
                    <div class="bottom-row">
                        <img :src="selectedRobot.base.src"/>
                    </div>
                </div>
            </CollabsibleSection>
            <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
        </div>

        <div class="top-row">
            <!--<div class="robot-name">
                {{selectedRobot.head.title}}
                <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
            </div>-->

            <!-- A. Tell our PartSelector which parts to use
             We bind to a "parts" attribute of the PartSelector: see PartSelector's "props" property where we declare this -->
            <PartSelector
                :parts="availableParts.heads"
                position="top"
                @partSelected="part => selectedRobot.head=part"/>
        </div>
        <div class="middle-row">

            <!-- B. NOTE the difference: "parts" is an attribute within the PartSelector.vue that we bind too and pass
            along an expression that needs to be evaluated; whereas "position" is an attr on the PartSelector tag.
            However position is still a prop in PartSelector.vue - one that we will add a class binding to -->
            <PartSelector
                :parts="availableParts.arms"
                position="left"
                @partSelected="part => selectedRobot.leftArm=part"
            />
            <PartSelector
                :parts="availableParts.torsos"
                position="center"
                @partSelected="part => selectedRobot.torso=part"
            />
            <PartSelector
                :parts="availableParts.arms"
                position="right"
                @partSelected="part => selectedRobot.rightArm=part"
            />
        </div>
        <div class="bottom-row">
            <PartSelector
                :parts="availableParts.bases"
                position="bottom"
                @partSelected="part => selectedRobot.base=part"
            />
        </div>
        <!--
        No longer needed from Chap 6 - we now have a ShoppingCart.vue
        <div>
            <h1>Cart</h1>
            <table>
                <thead>
                    <th>Robot</th>
                    <th class="cost">Cost</th>
                </thead>
                <tbody>
                    <tr v-for="(robot, index) in cart" :key="index">
                        <td>{{robot.head.title}}</td>
                        <td class="cost">{{robot.cost}}</td>
                    </tr>
                </tbody>
            </table>
        </div>-->
    </div>
</template>

<script>
//    import availableParts from '../data/parts';
    import PartSelector from './PartSelector.vue';
    import CollabsibleSection from '../shared/CollabsibleSection.vue';

    import mountedHookMixin from './mounted-hook-mixin';

    export default {
        name : 'RobotBuilder',
        /**
         * Re. 5_12: Preventing Navigation Away from Pages with Navigation Guards
         * N.B. This is an example of adding a route guard to a component
         *
         * @param to - the route being navigated to
         * @param from - the route being navigated to
         * @param next - a function to call to allow or block navigation
         */
        beforeRouteLeave(to, from, next){

            // Warn the user if they try to leave the page without adding the robot to the cart first

            if(this.addedToCart){
                next(true);

            }else{

                /**
                 * The Window.confirm() method displays a modal dialog with an optional message and two buttons, OK and Cancel.
                 * (and apparently has been around for ages)
                 */
                const response = confirm('You have not added the robot to the cart. Are you sure you want to leave?');

                next(response);
            }
        },
        components: {
            PartSelector,
            CollabsibleSection,
        },
        created(){
            console.log('component created');
            /**
             * Re. 6_6 Using Actions to Work with APIs...
             *
             * Access the Vuex action 'getParts' via the built in 'dispatch' fn - to call the API to retrieve the list of parts
             */
            this.$store.dispatch('getParts');
        },

        mixins:[mountedHookMixin],

        /**
         * The data method is called by the component, and the values returned become the data model for that component.
         * N.B. Any data that you are going to bind to or want to change needs to be initialised in the data function
         */
        data(){
            return {
//                availableParts,
                addedToCart : false,// Re. 5_12: Preventing Navigation Away from Pages...
                cart : [],
                selectedRobot: {
                    head : {},
                    leftArm : {},
                    torso : {},
                    rightArm : {},
                    base : {},
                },
            };
        },

        /**
         * Computed properties are like data, except instead of a specific value, they are a function.
         * The function acts like a GETTER and is called when the computed property is referenced.
         * Then the component can use the value that is returned.
         * Computed properties can take various factors into account - for example, the selectedRobot computed property
         * is different depending on the values of the different selected[BodyPart]Index properties of the application.
         * Computed properties help you to move logic out of your template.
         */
        computed: {

            /**
             * Re. 6_6 Using Actions to Work with APIs...
             *
             * This computed property will get updated once the created call has made the Vuex store perform it's 'getParts' action
             */
            availableParts(){
                return this.$store.state.parts;
            },


            // re. 19. (Conditional styling - making style binding to computed property)
            headBorderStyle(){
                return {
                    border : (this.selectedRobot.head.onSale)?
                        '3px solid red' :
                        '3px solid #aaa'
                };
            },
            // re. 22. (Conditional styling - making class binding to computed property)
            saleBorderClass(){

                return (this.selectedRobot.head.onSale)? 'sale-border' : '';
            }
        },
        /**
         * The methods property of a Vue app contains functions, which are usually called from the template,
         * though they can be called from elsewhere in the script, too.
         * If you look in the template, you will find a button which calls this "selectPreviousHead()" method.
         * Methods are the preferred way of doing an action that changes the data model.
         */
        methods: {

            addToCart(){
                const robot = this.selectedRobot;
                const cost = robot.head.cost +
                        robot.leftArm.cost +
                        robot.torso.cost +
                        robot.rightArm.cost +
                        robot.base.cost;

                // N.B. Good practice to enforce immutability - use Object.assign to ensure that the robot in the array
                // is not the same instance as is in the selectedRobot property.
                // This prevents inadvertant pointers to the same object, in your code
//                this.cart.push( Object.assign({}, robot, {cost}) );// Create a new robot object with a cost property

                /**
                 * Re. chap 6 - Managing State & Server Communication with Vuex
                 * Access our vuex store with this.$store
                 * Then use the built in commit function - passing it the name of a mutation from our store
                 * and the data we want to pass to that mutations
                 */
//                this.$store.commit( 'addRobotToCart', Object.assign({}, robot, {cost}) );

                /**
                 * Re. 6_7 Using Actions to Save Data to an API
                 *
                 * Now we use a Vuex action - instead of the above mutation
                 */
                this.$store.dispatch('addRobotToCart', Object.assign({}, robot, {cost}))
                    .then( (res) => {
                        /**
                         * Re. 6_7 Returning Promises from Actions
                         *
                         * After our action has posted to the API - navigate our App to the Cart page
                         *
                         * GENERAL NOTE RE. PROMISES
                         * The dispatch action is returning a Promise (from axios.post) that itself has a .then method.
                         * That .then gets called first and this .then receives whatever data that .then returns
                         */

                        if(window.console && window.console.log){
                            window.console.log('### RobotBuilder:: THEN FROM DISPATCH:: res=',res);
                        }
                        
                        this.$router.push('/cart');
                    });

                this.addedToCart = true;// Re. 5_12: Preventing Navigation Away from Pages...
            }
        }
    }
</script>

<style scoped>
    .part {
        position: relative;
        width:165px;
        height:165px;
        border: 3px solid #aaa;
    }
    .part img {
        width:165px;
    }
    .top-row {
        display:flex;
        justify-content: space-around;
    }
    .middle-row {
        display:flex;
        justify-content: center;
    }
    .bottom-row {
        display:flex;
        justify-content: space-around;
        border-top: none;
    }
    .head {
        border-bottom: none;
    }
    .left {
        border-right: none;
    }
    .right {
        border-left: none;
    }
    .left img {
        transform: rotate(-90deg);
    }
    .right img {
        transform: rotate(90deg);
    }
    .bottom {
        border-top: none;
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
    .right .next-selector {
        right: -3px;
    }
    .robot-name{
        position: absolute;
        top: -25px;
        text-align: center;
        width: 100%;
    }
    .sale{
        color: red;
    }
    .content{
        position: relative;
    }
    .add-to-cart{
        position: absolute;
        width: 210px;
        padding: 3px;
        font-size: 16px;
    }
    /*
    No longer needed from Chap 6 - we now have a ShoppingCart.vue
    td, th {
        text-align: left;
        padding: 5px;
        padding-right: 20px;
    }
    .cost {
        text-align: right;
    }*/
    .sale-border{
        border: 3px solid red;
    }
    .preview {
        position: absolute;
        top: -20px;
        right: 0;
        width: 210px;
        height: 210px;
        padding: 5px;
    }
    .preview-content {
        border: 1px solid #999;
    }
    .preview img {
        width: 50px;
        height: 50px;
    }
    .rotate-right {
        transform: rotate(90deg);
    }
    .rotate-left {
        transform: rotate(-90deg);
    }
</style>