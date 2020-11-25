import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import axios from './assets/js/axios'
import API from './assets/js/api.js'
import Vuebar from 'vuebar'

// 路由拦截
import './assets/js/filrouter'
// 全局过滤器
import './assets/js/filters'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$API = API
Vue.use(ElementUI)
Vue.use(Vuebar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})
