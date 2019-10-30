import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Notice from './views/Notice.vue'
import NoticeDetail from './views/NoticeDetail.vue'
import VisitShop from './views/VisitShop.vue'
import ShopInfo from './views/ShopInfo.vue'
import Sign from './views/Sign.vue'
import Order from './views/Order.vue'
import GoodsSelect from './views/GoodsSelect.vue'
import t from './views/t.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/notice/:id',
      name: 'noticeDetail',
      component: NoticeDetail
    },
    {
      path: '/visitshop',
      name: 'VisitShop',
      component: VisitShop
    },
    {
      path: '/visitshop/:id',
      name: 'ShopInfo',
      component: ShopInfo
    },
    {
      path: '/shopsign/:id',
      name: 'Sign',
      component: Sign
    },
    {
      path: '/order/:id',
      name: 'Order',
      component: Order
    },
    {
      path: '/t',
      name: 't',
      component: t
    },
    {
      path: '/goodsselect/:id',
      name: 'GoodsSelect',
      component: GoodsSelect
    }
  ]
})
