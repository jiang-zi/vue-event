import axios from 'axios'
export default {
  namespaced: true,
  state: () => ({
    token: '',
    userInfo: {}
  }),
  mutations: {
    updateToken (state, token) {
      state.token = token
    },
    updateUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async getUserInfo (ctx) {
      const { data: res } = await axios.get('/my/userinfo')
      if (res) {
        ctx.commit('updateUserInfo', res.data)
      }
    }
  }
}
