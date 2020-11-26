import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import App from './App'
import axios from './assets/js/axios'
import API from './assets/js/api.js'
import './assets/js/filters'
import './assets/js/filrouter'
import Vuebar from 'vuebar'

if (process.env.NODE_ENV === 'development') {
  require('@/assets/js/mock')
}

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
