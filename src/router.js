import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Home from './views/Home.vue'
import User from './views/User.vue'
import Notice from './views/Notice.vue'
import NoticeDetail from './views/NoticeDetail.vue'
import VisitShop from './views/VisitShop.vue'

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
    }
  ]
})
