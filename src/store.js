import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let userData = sessionStorage.getItem('Login_data')
  ? JSON.parse(sessionStorage.getItem('Login_data'))
  : null

export default new Vuex.Store({
  state: {
    LoginUser: userData
  },
  mutations: {
    saveUserData(state, userData) {
      state.LoginUser = userData
    }
  },
  actions: {},
  getters: {
    getLoginUser: state => {
      return state.LoginUser
    }
  }
})
