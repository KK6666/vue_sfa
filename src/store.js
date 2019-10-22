import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let userData = sessionStorage.getItem('Login_data')
  ? JSON.parse(sessionStorage.getItem('Login_data'))
  : null

export default new Vuex.Store({
  state: {
    LoginUser: userData,
    noticeList: [],
    shopList: []
  },
  mutations: {
    saveUserData(state, userData) {
      state.LoginUser = userData
    },
    // noticeList数组push数据
    noticeListPush(state, data) {
      state.noticeList.push(...data)
    },
    // noticeList数组unshift数据
    noticeListUnshift(state, data) {
      state.noticeList.unshift(...data)
    },
    // 设置公告已读
    setNoticeReaded(state, id) {
      const index = state.noticeList.findIndex(item => item.id == id)
      state.noticeList[index].isRead = true
    },
    // shopList数组push数据
    shopListPush(state, data) {
      state.shopList.push(...data)
    },
    // 清空shopList数组
    emptyShopList(state) {
      state.shopList = []
    }
  },
  actions: {},
  getters: {
    getLoginUser: state => {
      return state.LoginUser
    }
  },
  plugins: [
    // 保持vuex状态，解决刷新vuex丢失
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
})
