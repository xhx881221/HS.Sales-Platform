import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
    { path: '/', alias: '/login', component: (resolve) => require(['./features/login.vue'], resolve) }
];

const router = new VueRouter({routes});
Vue.use(VueRouter);
export default router;