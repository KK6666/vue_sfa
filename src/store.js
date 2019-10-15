import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let userData = sessionStorage.getItem('Login_data')
  ? JSON.parse(sessionStorage.getItem('Login_data'))
  : null

export default new Vuex.Store({
  state: {
    LoginUser: userData,
    noticeList: []
  },
  mutations: {
    saveUserData(state, userData) {
      state.LoginUser = userData
    },
    // 数组push数据
    noticeListPush(state, data) {
      state.noticeList.push(...data)
    },
    // 数组unshift数据
    noticeListUnshift(state, data) {
      state.noticeList.unshift(...data)
    },
    // 设置公告已读
    setNoticeReaded(state, id) {
      const index = state.noticeList.findIndex(item => item.id == id)
      state.noticeList[index].isRead = true
    }
  },
  actions: {},
  getters: {
    getLoginUser: state => {
      return state.LoginUser
    }
  }
})
