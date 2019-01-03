<template>
    <div id="app">
        <header>
            <nav>
                <ul>
                    <li class="nav-item">
                        <!-- <router-link to="/">-->
                        <!-- Above works, but this is an alternative syntax with binding to one of the
                         routes we declared in ./router/index.js -->
                        <router-link :to="{name : 'Home'}" class="nav-link" exact>
                            <img class="logo" src="assets/build-a-bot-logo.png"/>
                            Build-a-Bot
                        </router-link>
                    </li>

                    <!-- Re. Styling links based on the active route
                    The 'exact' attr forces an exact match on the full url before Vue will apply the
                    .router-link-active class (see styles, below)
                    N.B. if you wish Vue to apply a class of a different name to style the active route link
                    use the 'active-class attr in the router-link element e.g. <router-link active-class="foo" ... -->
                    <li class="nav-item">
                        <router-link :to="{name : 'Build'}" class="nav-link" exact>
                            Build
                        </router-link>
                    </li>

                    <!-- Re. chap 6 - Managing State & Server Communication with Vuex -->
                    <li class="nav-item cart">
                        <router-link to="/cart" class="nav-link" exact>
                            Cart
                        </router-link>
                        <div class="cart-items">
                            {{cart.length}}
                        </div>
                    </li>
                </ul>
            </nav>
        </header>

        <!-- Re. 5_9: Using Named Views: Display different content for different parts of the same page
        Named views are like sibling routes - multiple router-views on a single component
        The route for the component specifies which views to display -->
        <div class="container">
            <aside class="aside">
                <router-view name="sidebar"/>
            </aside>
            <main>
                <!--<HomePage/>-->
                <!--<RobotBuilder/>-->

                <!-- 2. Display the component that matches our current route
                A router-link points to a route object (as declared in router/index.js)
                This route object specifies which component(s) to place in which router-view(s) on the page -->
                <router-view/><!-- Re. 5_9: Using Named Views - if a name attr is not specified it defaults to "default" -->
            </main>
        </div>
    </div>
</template>

<script>
    /**
     * RE. Chapter 5 - Routing
     * 1. Without routing the only way to see HomePage or RobotBuilder is to comment the components & their imports in & out
     * Most modern frameworks however provide a way to navigate between pages within your SPA by changing the URL
     * or clicking on links
     */
//    import HomePage from './home/HomePage.vue'
//    import RobotBuilder from './build/RobotBuilder.vue';
    /**
     * 3. Once routing is in place we don't need the imports, above
     * NOR do we need to declare our components, below
     */

    export default {
        name: 'app',
//        components: {
////            HomePage,
//            RobotBuilder,
//        },

        /**
         * Re. chap 6 - Managing State & Server Communication with Vuex
         */
        computed: {
            cart(){
//                return this.$store.state.cart;

                /**
                 * Re. 6_9 Organising the Store with Modules
                 *
                 * Access our newly created 'robots' module
                 */
                return this.$store.state.robots.cart;
            }
        }
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
    .container{
        display: flex;
        margin: 10px auto;
        justify-content: center;
    }
    .aside{
        padding: 30px;
        background-color: #aaa;
        width: 100px;
        min-height: 300px;
    }
    main{
        /*margin: 0 auto;*/
        padding: 30px;
        background-color: white;
        width: 964px;/* 1024px */
        min-height: 300px;
    }
    header {
        background-color: #999;
        width: 1184px;
        margin: 0 auto;
    }
    .logo {
        vertical-align: middle;
        height: 30px;
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
    .nav-item.cart{
        position: relative;
        margin-left: auto;
        border-right: none;
    }
    .nav-link{
        text-decoration: none;
        color: inherit;/* Avoids changing color of the link */
    }
    .cart-items{
        position: absolute;
        top: -5px;
        right: -9px;
        font-size: 18px;
        width: 20px;
        text-align: center;
        display: inline-block;
        border-radius: 100px;
        background-color: mediumseagreen;
    }
    /* A special class used by Vue that gets applied to any links that match the current route */
    .router-link-active{
       color: white;
    }
</style>
