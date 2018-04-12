import Vue from 'vue';
import Vuex from 'vuex';
import { signUpStore } from './stores/sign-up.store'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        signUpStore
    }
});
