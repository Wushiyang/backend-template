import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      power: true,
      component: () => import('@/pages/login'),
      meta: {
        tit: '登录'
      }
    },
    {
      path: '/',
      component: () => import('@/pages/index'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'publishweibo',
          component: () => import('@/pages/home'),
          meta: {
            tit: '发biu贴',
            requireAuth: true
          }
        }
      ]
    }
  ]
})
