import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

import './assets/global.less'

import axios from 'axios'

// 导入vue-quill-editor富文本编辑器
import VueQuillEditor from 'vue-quill-editor'

// 导入样式
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'

// 安装VueQuillEditor插件
Vue.use(VueQuillEditor)

axios.interceptors.request.use(function (config) {
  if (config.url.startsWith('/my')) {
    config.headers.Authorization = store.state.user.token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.status === 401) {
    // 无效的 token
    // 把 Vuex 中的 token 重置为空，并跳转到登录页面
    store.commit('user/updateToken', '')
    Vue.prototype.$message.error(error.response.data.message)
    router.push('/login')
  }
  return Promise.reject(error)
})

axios.defaults.baseURL = 'http://www.liulongbin.top:3008'

Vue.use(ElementUI)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
