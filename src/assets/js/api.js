import axios from './axios'
import $ajax from 'axios'
import {baseApiUrl, commonApiUrl} from './env'
import Vue from 'vue'
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch (uri, params = {}, mock = false, extras = false) {
  let loadingInstance
  let isHideError = false
  if (extras && extras.isHideError)isHideError = true
  if (extras && extras.isLoading) {
    // debugger
    loadingInstance = Vue.prototype.$loading({
      fullscreen: false,
      text: extras.loadingText || '',
      background: 'rgba(0, 0, 0, 0.6)',
      spinner: 'el-icon-loading'
    })
  }
  if (mock) {
    return new Promise((resolve, reject) => {
      resolve(uri)
    })
  }
  return new Promise((resolve, reject) => {
    axios
      .get(uri, {
        params: params
      })
      .then(response => {
        const { msg, code } = response.data
        loadingInstance && loadingInstance.close()
        if (code !== 0) {
          !isHideError && Vue.prototype.$message({message: `[${code}]${msg}`, type: 'error'})
        }
        resolve(response.data)
      })
      .catch(err => {
        loadingInstance && loadingInstance.close()
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post (uri, data, mock = false, extras = false) {
  let loadingInstance
  let isHideError = false
  if (extras && extras.isHideError)isHideError = true
  if (extras && extras.isLoading) {
    loadingInstance = Vue.prototype.$loading({
      fullscreen: false,
      text: extras.loadingText || '',
      background: 'rgba(0, 0, 0, 0.6)',
      spinner: 'el-icon-loading'
    })
  }
  if (mock) {
    return new Promise((resolve, reject) => {
      resolve(uri)
    })
  }
  return new Promise((resolve, reject) => {
    axios.post(uri, data).then(
      response => {
        const { msg, code } = response.data
        loadingInstance && loadingInstance.close()
        if (code !== 0) {
          !isHideError && Vue.prototype.$message({message: `[${code}]${msg}`, type: 'error'})
        }
        resolve(response.data)
      },
      err => {
        loadingInstance && loadingInstance.close()
        reject(err)
      }
    )
  })
}

export function upload (uri, data, mock = false, extras = false) {
  let loadingInstance
  if (extras && extras.isLoading) {
    loadingInstance = Vue.prototype.$loading({
      fullscreen: false,
      text: extras.loadingText || '',
      background: 'rgba(0, 0, 0, 0.6)',
      spinner: 'el-icon-loading'
    })
  }
  if (mock) {
    return new Promise((resolve, reject) => {
      resolve(uri)
    })
  }
  return new Promise((resolve, reject) => {
    $ajax.create({
      timeout: 60000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    let form = new FormData()
    form.append('file', data.file)
    form.append('token', data.token)
    $ajax.post(uri, form).then(
      response => {
        loadingInstance && loadingInstance.close()
        resolve(response.data)
      },
      err => {
        loadingInstance && loadingInstance.close()
        reject(err)
      }
    )
  })
}
let API = {}

// 手机登录
API.loginPhone = (data, extras) => post(baseApiUrl + '/auth/phoneSignIn', data, extras)
// 账号登录
API.loginAccount = (data, extras) => post(baseApiUrl + '/auth/accountSignIn', data, extras)
// 获取验证码
API.sendSmsCaptcha = (data, extras) => post(commonApiUrl + '/verify/sendSmsCaptcha', data, extras)

// 退出登录
API.signOut = (data, extras) => post(baseApiUrl + '/auth/signOut', data, extras)

// 获取权限列表
API.getPermissionList = (data, extras) => fetch(require('@/mock/admin_permision.json'), data, true, extras)

export default API
