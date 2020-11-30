import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import App from './App'
import axios from './assets/js/axios'
import API from './assets/js/api.js'
import Vuebar from 'vuebar'

Vue.config.productionTip = false
// 初始化第三方全局组件
Vue.use(ElementUI)
Vue.use(Vuebar)
// 初始化自定义全局组件
// ...
// 初始化全局过滤器
require('./assets/js/filters')
// 初始化全局方法
Vue.prototype.$http = axios
Vue.prototype.$API = API
// 初始化路由拦截
require('./assets/js/filrouter')

// 添加mock
if (process.env.NODE_ENV === 'development') {
  require('@/assets/js/mock')
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
