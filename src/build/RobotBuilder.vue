<template>
    <div>
        <div class="top-row">
            <div class="top part">

                <!-- 7. Interpolation - to display raw data on the page
                Any valid expression can go between the {{ }} (tho' best to keep it simple within the template) -->
                <div class="robot-name">
                    {{selectedRobot.head.title}}
                <!-- 8. Adding v-once means any bindings in this element will be evaluated once and never again -->
                <!-- e.g. <div v-once class="robot-name">-->
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
    </div>
</template>

<script>
    import availableParts from '../data/parts';

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
         * The data method is called by the component, and the values returned become the data model for that component.
         */
        data(){
            return {
                availableParts,
                selectedHeadIndex : 0,
                selectedLeftArmIndex : 0,
                selectedTorsoIndex : 0,
                selectedRightArmIndex : 0,
                selectedBaseIndex : 0,
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
        }
    }
</script>

<style>
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
</style>