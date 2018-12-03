<template>
    <div id="app">
        <header>
            <nav>
                <ul>
                    <li class="nav-item">
                        <img class="logo" src="assets/build-a-bot-logo.png"/>
                        Build-a-Bot
                    </li>
                </ul>
            </nav>
        </header>
        <main>
            <RobotBuilder/>
        </main>
    </div>
</template>

<script>

import RobotBuilder from './build/RobotBuilder.vue';

export default {
  name: 'app',
  components: {
    RobotBuilder,
  },
};
</script>

<!-- Global style
As a general rule you should not have any global styles in any component other than your top level App component -->
<style>
    body{
        background: linear-gradient(to bottom, #555, #999 );
        background-attachment: fixed;
    }
</style>

<!-- Scoped style.
Scoping works by creating hash values that Vue adds as an attr to the element and then the css selector targets only
those elements with that hash e.g. header[dat-v-fca0345]
See points 15 - 17 in RobotBuilder.vue for further explanation of scoping-->
<style scoped>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }
    main{
        margin: 0 auto;
        padding: 30px;
        background-color: white;
        width: 1024px;
        min-height: 300px;
    }
    header {
        background-color: #999;
        width: 1084px;
        margin: 0 auto;
    }
    ul {
        padding: 3px;
        display: flex;
    }
    .nav-item {
        display: inline-block;
        padding: 5px 10px;
        font-size: 22px;
        border-right: 1px solid #bbb;
    }
    .logo {
        vertical-align: middle;
        height: 30px;
    }
</style>
