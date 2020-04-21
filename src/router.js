import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
    { path: '/', alias: '/login', component: (resolve) => require(['./features/login.vue'], resolve) },
    { 
        path: '/home', component: (resolve) => require(['./features/home.vue'], resolve), children: [
            { path: '/', alias: '/dataEntry', component: (resolve) => require(['./features/dataEntry.vue'], resolve) },
            { path: '/sectorManagement', component: (resolve) => require(['./features/sectorManagement.vue'], resolve) },
            { path: '/areaManagement', component: (resolve) => require(['./features/areaManagement.vue'], resolve) },
            { path: '/userManagement', component: (resolve) => require(['./features/userManagement.vue'], resolve) },
            { path: '/reportQuery', component: (resolve) => require(['./features/reportQuery.vue'], resolve) },
            { path: '/productSettings', component: (resolve) => require(['./features/productSettings.vue'], resolve) }
        ]
    }
];

const router = new VueRouter({routes});
Vue.use(VueRouter);
export default router;