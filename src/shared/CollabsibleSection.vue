<template>
    <div>
        <div class="header">
            <!-- @click handler's tgogle value of open to it's opposite -->
            <span v-if="open" @click="open = !open" >&#x25B2; Collapse</span>
            <span v-if="!open" @click="open = !open">&#x25BC; Expand</span>
        </div>
        <!-- Re. 4_6 Injecting content into a child component with slots -->
        <!-- Toggleable Content -->
        <!-- A slot is a vue specific thing - the content we specify in the parent component (RobotBuilder.vue)
         that sits between the CollapsibleSection tags will be placed into this slot element.
         We use v-if to only show this injected content if open is true -->
        <!--<slot v-if="open">
            &lt;!&ndash; A slot can have default content that will be shown if a slot component is added but then no
            content is specified i.e. <CollabsibleSection></CollabsibleSection> &ndash;&gt;
            <div>DefaultContent</div>
        </slot>-->

        <!--
        Re. Single Page Applications with Vue.js re. 3_9 Slots
        A component can have multiple slots each with a name attribute that allows other components
        to specify which slot to use (these components have a 'slot' attr whose value matches the name of the slot
        e.g. <slot name="title"></slot>
        & <span slot="title">myContent></span>
        -->
        <slot name="main" v-if="open">
            <!-- A slot can have default content that will be shown if a slot component is added but then no
            content is specified i.e. <CollabsibleSection></CollabsibleSection> -->
            <div>DefaultContent</div>
        </slot>
        <slot name="button" v-if="open"></slot>
    </div>
</template>

<script>
    export default {
        name: 'CollapsibleSection',
        data() {
            return { open: true };
        },
    };
</script>

<style scoped>
    .header {
        background-color: #bbb;
        padding: 3px;
        cursor: pointer;
    }
</style>
