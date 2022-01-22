import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import artCate from './artCate'
// 1. 导入包
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 2. 配置为 vuex 的插件
  plugins: [createPersistedState()],
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    artCate
  }
})
