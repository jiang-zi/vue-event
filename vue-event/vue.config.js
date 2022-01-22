module.exports = {
  publicPath: './',
  configureWebpack: {
    // 打包优化
    externals: {
      // import导包的包名: window全局的成员名称
      echarts: 'echarts',
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      dayjs: 'dayjs',
      'element-ui': 'ELEMENT',
      'vue-quill-editor': 'VueQuillEditor',
      'vuex-persistedstate': 'createPersistedState'
    }
  }
}
