import Vue from 'vue'
import Vuex from 'vuex'
// 保证vuex在页面刷新不会清空
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

let userData = sessionStorage.getItem('Login_data')
  ? JSON.parse(sessionStorage.getItem('Login_data'))
  : null

export default new Vuex.Store({
  state: {
    LoginUser: userData,
    noticeList: [],
    shopList: [],
    goods: [],
    curOrderShop: null,
    warehouseList: null
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
    },
    // goods数组push数据
    goodsPush(state, data) {
      state.goods.push(...data)
    },
    // 清空goods数组
    emptyGoods(state) {
      state.goods = []
    },
    // 将当前下订单门店信息存入store（在shopInfo组件完成）
    initCurOrderShop(state, shopInfo) {
      state.curOrderShop = shopInfo
    },
    initWarehouseList(state, data) {
      state.warehouseList = data
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
