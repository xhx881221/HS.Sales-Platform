import Vue from 'vue'
import Vuex from 'vuex'
import authorization  from './modules/authorization'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        authorization
    },
    strict: debug,
})