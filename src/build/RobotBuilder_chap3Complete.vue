<template>
    <div class="content">
        <div class="top-row">

            <!-- 11. Repeating elements with v-for (see 12. below) -->
            <button class="add-to-cart" @click="addToCart()">Add to Cart</button>

            <!-- 18. Binding to the style attribute -->
            <!-- <div class="top part" :style="{border: '3px solid red'}"> -->
            <!-- N.B. when your css attribute is hyphenated you can either write [background-color] or backgroundColor-->

            <!-- 19. Conditional styling -->
            <!--<div class="top part" :style="headBorderStyle">-->

                <!-- 20. N.B. Multiple style calculations can be applied - then you pass in an array of style conditions
                e.g.:style="[headBorderStyle, moreStyles]"
                Here the headBorderStyle calculations will be applied first, moreStyles second & they will override
                headBorderStyles where the css attributes are the same -->

            <!-- 21. Using class bindings instead of inline styles -->
            <!-- A class binding is an object where the keys are the names of the classes you'd like to toggle
            and the value is a boolean expression that will evaluate to true when you want the class to be applied.
            This class will be applied in addition to those ones already added through the 'class' attribute (top & part) -->
            <!--<div class="top part" :class="{'sale-border' : selectedRobot.head.onSale}">-->

            <!-- 22. If multiple classes need to be applied through your class object and it start to become complicated
            it might be better to bind the class to a computed property like we did for the style binding in 19.
            e.g. :class="[saleBorderClass]" -->
            <!--<div class="top part" :class="[saleBorderClass]">-->

            <!-- 23. As a final optimisation - now we have our class binding to an array, we can add the classes from
            the original class attr to this array -->
            <div :class="[saleBorderClass, 'top', 'part']">

                <!-- 6. Interpolation - to display raw data on the page
                Any valid expression can go between the {{ }} (tho' best to keep it simple within the template) -->

                <!-- 7. Adding v-once means any bindings in this element will be evaluated once and never again
                e.g. <div v-once class="robot-name">-->
                <div class="robot-name">
                    {{selectedRobot.head.title}}

                    <!-- 8. Conditionally showing content with v-if - if the expression evaluates to true then the element is shown
                    v-if works by adding and removing elements from the DOM-->
                    <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>

                    <!-- 9. v-show will have the same effect as v-if
                     v-show works by setting & removing a display: none inline style property on the element -->

                    <!-- 10. Use case v-if vs. v-show
                    If the content you are showing & hiding is expensive to generate and is going to be shown/hidden frequently
                    then you should use v-show e.g. an element that contains a vue component. This is expensive for vue to evaluate
                    and continually destroy/mount on the DOM.
                    However above we are only showing/hiding a simple span element, so v-if is appropriate-->
                </div>

                <!-- 1. v-bind:src= "Bind the src attr of this img to this expression..." -->
                <!-- 2. v-bind also has an abbreviated syntax : i.e. :src-->
                <img v-bind:src="availableParts.heads[selectedHeadIndex].src" title="head"/>

                <!-- 3. v-on:click= "Whenever this element is clicked run/call this expression" -->
                <button v-on:click="selectPreviousHead()" class="prev-selector">&#9668;</button>

                <!-- 4. v-on also has an abbreviated syntax @ i.e. @click-->
                <button @click="selectNextHead()" class="next-selector">&#9658;</button>
            </div>
        </div>
        <div class="middle-row">
            <div class="left part">

                <!-- 5. Here we use the computed property: selectedRobot for our binding-->
                <!-- Computed properties help you to move logic out of your template -->
                <img :src="selectedRobot.leftArm.src" title="left arm"/>

                <button @click="selectPreviousLeftArm()" class="prev-selector">&#9668;</button>
                <button @click="selectNextLeftArm()" class="next-selector">&#9658;</button>
            </div>
            <div class="center part">
                <img :src="selectedRobot.torso.src" title="torso"/>
                <button @click="selectPreviousTorso()" class="prev-selector">&#9668;</button>
                <button @click="selectNextTorso()" class="next-selector">&#9658;</button>
            </div>
            <div class="right part">
                <img :src="selectedRobot.rightArm.src" title="right arm"/>
                <button @click="selectPreviousRightArm()" class="prev-selector">&#9668;</button>
                <button @click="selectNextRightArm()" class="next-selector">&#9658;</button>
            </div>
        </div>
        <div class="bottom-row">
            <div class="bottom part">
                <img :src="selectedRobot.base.src" title="feet"/>
                <button @click="selectPreviousBase()" class="prev-selector">&#9668;</button>
                <button @click="selectNextBase()" class="next-selector">&#9658;</button>
            </div>
        </div>
        <div>
            <h1>Cart</h1>
            <table>
                <thead>
                    <th>Robot</th>
                    <th class="cost">Cost</th>
                </thead>
                <tbody>
                    <!-- 12. see addToCart() where we create a new robot object w. cost property and push it into this.cart
                    In the line below we iterate over each item in this.cart creating a new row with cells for title & cost -->
                    <!--<tr v-for="robot in cart">-->
                    <!-- 13. Above line will work but... whenever you are repeating data Vue needs a unique key attr
                    for each item so it can identify that item for updates, hence: -->
                    <tr v-for="(robot, index) in cart" :key="index">
                        <td>{{robot.head.title}}</td>
                        <td class="cost">{{robot.cost}}</td>
                    </tr>
                    <!-- 14. N.B. Never use v-for & v-if on the same element - it is not performant and the Vue Docs warn of this -->
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import availableParts from '../data/parts';

    // re. 25. Mixins
    import mountedHookMixin from './mounted-hook-mixin';

    const getPreviousValidIndex = (index, length) => {

        const deprecatedIndex = index - 1;
        return (deprecatedIndex < 0)? length -1 : deprecatedIndex
    }

    const getNextValidIndex = (index, length) => {

        const incrementedIndex = index + 1;
        return (incrementedIndex > length -1)? 0 : incrementedIndex;
    }

    export default {
        name : 'RobotBuilder',
        /**
         * 24. Lifecycle hooks of a component - take an action based on the lifecycle state of a component
         * A typical use case would be to retrieve data values form an API once a component has been created
         * Here however we are just binding to the created hook to perform a console.log
         */
        created(){
            console.log('component created');
        },

        /**
         * 25. Mixins - are a way to share functionality across multiple components.
         * Any component option can be extracted out to a mixin file and then when that file is imported
         * it will be merged with your component options.
         * Here we are going to extract the hook for the mounted lifecycle state
         */
//        mounted(){
//            console.log('It lives!');
//        },
        mixins:[mountedHookMixin],

        /**
         * The data method is called by the component, and the values returned become the data model for that component.
         * N.B. Any data that you are going to bind to or want to change needs to be initialised in the data function
         */
        data(){
            return {
                availableParts,
                selectedHeadIndex : 0,
                selectedLeftArmIndex : 0,
                selectedTorsoIndex : 0,
                selectedRightArmIndex : 0,
                selectedBaseIndex : 0,
                cart : []
            };
        },
        // Alternate syntax for data property
//        data:()=>(
//            {
//                availableParts
//            }
//        ),

        /**
         * Computed properties are like data, except instead of a specific value, they are a function.
         * The function is called and then the component can use the value that is returned, like a normal property.
         * Computed properties can take various factors into account - for example, the selectedRobot computed property
         * is different depending on the values of the different selected[BodyPart]Index properties of the application.
         * Computed properties help you to move logic out of your template.
         */
        computed: {
            selectedRobot(){
                return {
                    head : availableParts.heads[this.selectedHeadIndex],
                    leftArm : availableParts.arms[this.selectedLeftArmIndex],
                    torso : availableParts.torsos[this.selectedTorsoIndex],
                    rightArm : availableParts.arms[this.selectedRightArmIndex],
                    base : availableParts.bases[this.selectedBaseIndex],
                }
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
            selectPreviousHead(){
                this.selectedHeadIndex = getPreviousValidIndex(this.selectedHeadIndex, availableParts.heads.length);
            },
            selectNextHead(){
                this.selectedHeadIndex = getNextValidIndex(this.selectedHeadIndex, availableParts.heads.length);
            },
            selectPreviousLeftArm(){
                this.selectedLeftArmIndex = getPreviousValidIndex(this.selectedLeftArmIndex, availableParts.arms.length);
            },
            selectNextLeftArm(){
                this.selectedLeftArmIndex = getNextValidIndex(this.selectedLeftArmIndex, availableParts.arms.length);
            },
            selectPreviousTorso(){
                this.selectedTorsoIndex = getPreviousValidIndex(this.selectedTorsoIndex, availableParts.torsos.length);
            },
            selectNextTorso(){
                this.selectedTorsoIndex = getNextValidIndex(this.selectedTorsoIndex, availableParts.torsos.length);
            },
            selectPreviousRightArm(){
                this.selectedRightArmIndex = getPreviousValidIndex(this.selectedRightArmIndex, availableParts.arms.length);
            },
            selectNextRightArm(){
                this.selectedRightArmIndex = getNextValidIndex(this.selectedRightArmIndex, availableParts.arms.length);
            },
            selectPreviousBase(){
                this.selectedBaseIndex = getPreviousValidIndex(this.selectedBaseIndex, availableParts.bases.length);
            },
            selectNextBase(){
                this.selectedBaseIndex = getNextValidIndex(this.selectedBaseIndex, availableParts.bases.length);
            },

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

<!-- 15. Scoping works by creating hash values that Vue adds as an attr to the element and then the css
selector targets only those elements with that hash e.g. td[dat-v-fca0345]
As a general rule you should not have any global styles in any component other than your top level App component -->

<!-- 16. If you have a scoped style in a parent component that applies to an element that contains a child component,
the scoped style will 'bleed down' into the child component along the line of traditional CSS inheritance rules:
so something like font-color will be inherited whilst a border property will not -->

<!-- 17. If you do want to style a child component from the parent's scoped style you can do that to the child's
ROOT element. The root element in this component is a div with the class "content". If the parent App.vue component
creates a style rule for .content it will be applied to this root element div.
However you can also use the .content as a path to the child elements of the child component IF you use the DEEP selector
i.e. (in App.vue) .content >>> .robot-name{ border: 1px solid red;} This will put a red border around the div with the
class .robot-name in this child component. ALT syntax: .content /deep/ .robot-name.
 N.B. This deep selector is DEEP: it will continue down the component inheritance chain affecting all child components. -->
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
        right: 30px;
        width: 220px;
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
</style>