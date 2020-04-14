import Vue from 'vue';
import { Button, Select } from 'element-ui';
import router from './router.js';
import i18n from './locales';
import App from './App.vue';
import AXIOS_INSTANCE from './request/http.js';

Vue.use(Button);
Vue.use(Select);

new Vue({
    i18n,
    router,
    render: h => h(App)
}).$mount('#app');

if (module && module.hot) {
    module.hot.accept();
}