<template>
    <div>
        <div class="header">
            <!-- @click handler's tgogle value of open to it's opposite -->
            <span v-if="open" @click="open = !open" >&#x25B2; Collapse</span>
            <span v-if="!open" @click="open = !open">&#x25BC; Expand</span>
        </div>
        <!-- Toggleable Content -->
        <!-- A slot is a vue specific thing - the content we specify in the parent component (RobotBuilder.vue)
         that sits between the CollapsibleSection tags will be placed into this slot element.
         We use v-if to only show this injected content if open is true -->
        <slot v-if="open">
            <!-- A slot can have default content that will be shown if a slot component is added but then no
            content is specified i.e. <CollabsibleSection></CollabsibleSection> -->
            <div>DefaultContent</div>
        </slot>
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
