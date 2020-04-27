import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [
    { path: '/', alias: '/login', component: (resolve) => require(['./views/login.vue'], resolve) },
    { 
        path: '/home', component: (resolve) => require(['./views/home.vue'], resolve), children: [
            { path: '/', alias: '/dataEntry', component: (resolve) => require(['./views/dataEntry.vue'], resolve) },
            { path: '/sectorManagement', component: (resolve) => require(['./views/sectorManagement.vue'], resolve) },
            { path: '/seriesManagement', name: 'SeriesManagement', component: (resolve) => require(['./views/seriesManagement.vue'], resolve) },
            { path: '/areaManagement', component: (resolve) => require(['./views/areaManagement.vue'], resolve) },
            { path: '/userManagement', component: (resolve) => require(['./views/userManagement.vue'], resolve) },
            { path: '/reportQuery', component: (resolve) => require(['./views/reportQuery.vue'], resolve) },
            { path: '/productSettings', component: (resolve) => require(['./views/productSettings.vue'], resolve) }
        ]
    }
];

const router = new VueRouter({routes});
Vue.use(VueRouter);
export default router;