import { createStore } from 'vuex'

const store = createStore({
  state: {
    token: localStorage.getItem('token') || '',
    userInfo: sessionStorage.getItem('userInfo')? JSON.parse(sessionStorage.getItem('userInfo')) : {}
  },
  getters: {
    // get token
    getToken(state) {
      return state.token
    },
    // get user info
    getUserInfo(state) {
      return state.userInfo || {} // return empty object if user info is not set yet  
    }
  },
  mutations: {
    // set token
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    // set user info
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    // remove token and user info
    removeTokenAndUserInfo(state) {
      state.token = ''
      state.userInfo = {}
      localStorage.removeItem('token')
      sessionStorage.removeItem('userInfo')
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
