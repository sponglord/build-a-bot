<template>
    <div>
        <h1>Cart</h1>
        <table>
            <thead>
            <tr>
                <th class="robot-title">
                    Robot
                </th>
                <th class="cost">
                    Cost
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(robot, index) in cart" :key="index">
                <td class="robot-title">
                    {{robot.head.title}}
                </td>
                <td class="cost">
                    {{robot.cost}}
                </td>
            </tr>
            </tbody>
        </table>

        <h2 class="sale-items">You saved money on these robots:</h2>
        <table>
            <thead>
            <tr>
                <th class="robot-title">
                    Robot
                </th>
                <th class="cost">
                    Cost
                </th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(robot, index) in cartSaleItems" :key="index">
                <td class="robot-title">
                    {{robot.head.title}}
                </td>
                <td class="cost">
                    {{robot.cost}}
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'Cart',

        computed: {

            /**
             * Get cart object from our Vuex store
             */
            cart(){
//                return this.$store.state.cart;
                /**
                 * Re. 6_9 Organising the Store with Modules
                 *
                 * Access our newly created 'robots' module
                 */
                return this.$store.state.robots.cart;
            },

            /**
             * Re. 6_4 Using Vuex Getters to Return Calculated Data
             */
            cartSaleItems(){
                /**
                 * Access a getter in the store
                 */
//                return this.$store.getters.cartSaleItems;

                /**
                 * Re. 6_10 Accessing Namespaced Getter
                 *
                 * Now we have namespaced our Store's robots module we have to access this module's getter differently
                 * i.e. including the namespace
                 */
                return this.$store.getters['robots/cartSaleItems'];
            }
        }
    };
</script>

<style scoped>
    td, th {
        padding: 5px;
    }
    .robot-title {
        text-align: left;
        padding-right: 200px;
    }
    .cost {
        text-align: right;
    }
    .sale-items{
        margin-top: 50px;
        font-size: 18px;
        color: red;
    }
</style>