<template>
    <div class="home">
        <div>
            <!-- contentBase setting in webpack.config.js points to /dist dir where the assets folder is -->
            <img class="robot" src="assets/robot-home.png" aria-hidden="true"/>
        </div>
        <div class="get-started">
            <!--<a href="">Get started</a> building your first robot!-->

            <!-- Link to one of our routes (as defined in ./router/index.js -->
            <router-link to="/build">Get started</router-link> building your first robot!
        </div>
    </div>
</template>

<script>
    export default {
        name  : 'HomePage',
        props : {
            msg : String,
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home{
        text-align: center;
    }
    .robot{
        height: 300px;
    }
</style>
