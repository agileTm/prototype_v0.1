import Vue from 'vue';
import Router from 'vue-router';
import store from './store';
import { homeRouter } from '@/routes/home/home.router';
import { signUpRouter } from '@/routes/sign-up/sign-up.router';
import { signInRouter } from '@/routes/sign-in/sign-in.router';
import { questionRouter } from '@/routes/question/question.router';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    routes: [
        ...homeRouter,
        ...signUpRouter,
        ...signInRouter,
        ...questionRouter
    ]
});

router.beforeEach(async (to, from, next) => {
    await store.dispatch('signCheck');
    next();
});
