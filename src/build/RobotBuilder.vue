<template>
    <div class="content">

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
        </div>
    </div>
</template>

<script>
    import availableParts from '../data/parts';
    import PartSelector from './PartSelector.vue';
    import CollabsibleSection from '../shared/CollabsibleSection.vue';

    import mountedHookMixin from './mounted-hook-mixin';

    export default {
        name : 'RobotBuilder',
        components: {
            PartSelector,
            CollabsibleSection,
        },
        created(){
            console.log('component created');
        },

        mixins:[mountedHookMixin],

        /**
         * The data method is called by the component, and the values returned become the data model for that component.
         * N.B. Any data that you are going to bind to or want to change needs to be initialised in the data function
         */
        data(){
            return {
                availableParts,
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
         * The function is called and then the component can use the value that is returned, like a normal property.
         * Computed properties can take various factors into account - for example, the selectedRobot computed property
         * is different depending on the values of the different selected[BodyPart]Index properties of the application.
         * Computed properties help you to move logic out of your template.
         */
        computed: {

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
                this.cart.push( Object.assign({}, robot, {cost}) );// Create a new robot object with a cost property
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
    td, th {
        text-align: left;
        padding: 5px;
        padding-right: 20px;
    }
    .cost {
        text-align: right;
    }
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