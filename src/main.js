import Vue from 'vue';
import Vuex from 'vuex';
import { Input, Button, Select, Option, Loading, Icon, Menu, MenuItem, Row, Col, Scrollbar, Dialog, Form, FormItem, Message, MessageBox, Tooltip, Table, TableColumn, Pagination, Tabs, TabPane, Avatar, Dropdown, DropdownMenu, DropdownItem, DatePicker, Upload, Tree } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js';
import i18n from './locales';
import app from './App.vue';
import store from './store/index';
import AXIOS_INSTANCE from './request/http.js';
import * as filters from './util/filter';

var items = [Vuex, Input, Button, Select, Option, Loading, Icon, Menu, MenuItem, Row, Col, Scrollbar, Dialog, Form, FormItem, Tooltip, Table, TableColumn, Pagination, Tabs, TabPane, Avatar, Dropdown, DropdownMenu, DropdownItem, DatePicker, Upload, Tree];
items.forEach(item => Vue.use(item));

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

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