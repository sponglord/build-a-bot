import axios from 'axios';

export default {
    state: {
        user: null,
        foo : 'usersFoo'
    },
    mutations: {
        updateCurrentUser(state, user) {
            state.user = user;
        },
    },
    getters: {
//        foo(state){
//            return '';
//        }
    },
    actions: {
        signIn({ commit }) {
            axios.post('/api/sign-in')
                .then(result => commit('updateCurrentUser', result.data))
                .catch(console.error);
        },
    },
};