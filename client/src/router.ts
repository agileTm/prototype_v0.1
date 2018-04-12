import Vue from 'vue';
import Router from 'vue-router';
import { homeRouter } from '@/routes/home/home.router';
import { signUpRouter } from '@/routes/sign-up/sign-up.router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        ...homeRouter,
        ...signUpRouter
    ]
});
