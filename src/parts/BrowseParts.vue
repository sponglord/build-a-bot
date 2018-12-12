<template>
    <div>
        <h1>Browse Parts</h1>
        <ul class="menu">
            <li>
                <!-- 2. Add routes to the 'browse parts' pages -->
                <router-link :to="{name: 'BrowseHeads'}">Heads</router-link>
            </li>
            <li>
                <router-link :to="{name: 'BrowseArms'}">Arms</router-link>
            </li>
            <li>
                <router-link :to="{name: 'BrowseTorsos'}">Torsos</router-link>
            </li>
            <li>
                <router-link :to="{name: 'BrowseBases'}">Bases</router-link>
            </li>
        </ul>
        <!-- Re. Nested Routes
        1. Add a second router-view (we already have one in our App Component)
        This second view will allow us to add the routes above for the individual 'browse parts' pages-->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'BrowseParts',
    };
</script>

<style scoped>
    h1 {
        text-align: center;
    }
    .menu {
        display: flex;
        justify-content: space-around;
        margin: 0 100px;
        font-size: 20px;
    }
    ul {
        list-style-type: none;
    }
    a {
        color: palevioletred;
    }
</style>
