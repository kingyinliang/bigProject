import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import common from './modules/common'
import user from './modules/user'
import echarts from './modules/echarts'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage
})
export default new Vuex.Store({
  modules: {
    common,
    user,
    echarts
  },
  plugins: [vuexLocal.plugin]
})
