import axios from 'axios'
export default {
  namespaced: true,
  state: () => ({
    cateList: []
  }),
  mutations: {
    updateCateList (state, cateList) {
      state.cateList = cateList
    }
  },
  actions: {
    async getCateList (context) {
      const { data: res } = await axios.get('/my/cate/list')
      if (res.code === 0) {
        context.commit('updateCateList', res.data)
      }
    }
  }
}
