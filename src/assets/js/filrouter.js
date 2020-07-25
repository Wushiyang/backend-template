import router from '@/router'
import store from '@/store'

// 路由进入拦截
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token !== '') {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path.slice(1) }
      })
    }
  } else {
    next()
  }
})
