import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)
const routes = store.getters.creatAutoRouter

const router = new Router({
  routes
})

export default router
