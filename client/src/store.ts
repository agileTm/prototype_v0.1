import Vue from 'vue';
import Vuex from 'vuex';
import { signStore } from '@/store/sign.store';
import { questionStore } from './store/question.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        signStore,
        questionStore
    }
});
