import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { baseUrl } from './env'
import qs from 'qs'
let url = baseUrl
// if ( process.env.NODE_ENV == 'development' ) { url = '' }

// 接口配置
var instance = axios.create({
  baseURL: url,
  timeout: 60000,
  headers: {
    // 请求头，可自行修改
    'Content-Type': 'application/x-www-form-urlencoded',
    'x-platform': '1',
    'x-os-version': '9.0',
    'x-app-version': '1.0',
    'x-device-id': '868720020200352868720020200352',
    'x-api-version': 'v1'
  },
  transformRequest: [
    function (data) {
      return qs.stringify(data)
    }
  ]
})
// http request 拦截器

instance.interceptors.request.use(
  (config) => {
    // 可以在这里增加请求头和一些请求前的操作
    config.headers['x-access-token'] = `${store.state.token}`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// http response 拦截器
instance.interceptors.response.use(
  (response) => {
    if (response.data.code === 108006) {
      // 如果没登录，清空一些数据，并且跳转到登录页面
      store.commit('logout')
      router.push({
        path: '/login'
      })
    }
    return response
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面/ 401 清除token信息并跳转到登录页面
          // 退出 登录
          router.replace({
            path: '/login',
            query: { redirectu9: router.currentRoute.fullPath }
          })
          break
      }
    }
    return Promise.reject(error.response.data)
  }
)
export default instance
