import Vue from 'vue';
import Vuex from 'vuex';
import { Input, Button, Select, Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js';
import i18n from './locales';
import app from './App.vue';
import store from './store/index';
import AXIOS_INSTANCE from './request/http.js';
import * as filters from './util/filter';

Vue.use(Vuex);
Vue.use(Input);
Vue.use(Button);
Vue.use(Select);
Vue.use(Loading.directive);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

var vm = new Vue({
    i18n,
    router,
    store,
    render: h => h(app)
});

Vue.prototype.$axios = AXIOS_INSTANCE;
vm.$mount('#app')

if (module && module.hot) {
    module.hot.accept();
}