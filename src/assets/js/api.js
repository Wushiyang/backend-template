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
export function fetch (url, params = {}, mock = false, extras = false) {
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
      resolve(require('@/mock/admin_permision.json'))
    })
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
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
export function post (url, data, mock = false, extras = false) {
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
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(
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

export function upload (url, data, extras = false) {
  let loadingInstance
  if (extras && extras.isLoading) {
    loadingInstance = Vue.prototype.$loading({
      fullscreen: false,
      text: extras.loadingText || '',
      background: 'rgba(0, 0, 0, 0.6)',
      spinner: 'el-icon-loading'
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
    $ajax.post(url, form).then(
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

// 获取极验信息
API.getUserGeetest = (data, extras) => post(commonApiUrl + '/verify/startCaptchaServlet', data, extras)
// 获取分享微博详情
API.getShareWeiBoDetail = (data, extras) => fetch(baseApiUrl + '/backend/share/getWeiboDetail', data, extras)

// 获取七牛云的上传凭证token
API.getQiniuToken = (data, extras) => fetch(baseApiUrl + '/common/getQiniuToken', data, extras)

// 发布biu贴
API.saveWeibo = (data, extras) => post(baseApiUrl + '/weibo/save', data, extras)

// 添加话题
API.getSearchTopics = (data, extras) => fetch(baseApiUrl + '/topic/getSearchTopics', data, extras)

// @用户
API.getSearchUsers = (data, extras) => fetch(baseApiUrl + '/user/getList', data, extras)

// 表情，和运营后台复用一个接口
API.getEmojiList = (data, extras) => fetch(baseApiUrl + '/backend/store_weibo/getEmojiList', data, extras)

// 写文章
API.createWithArticle = (data, extras) => post(baseApiUrl + '/weibo/createWithArticle', data, extras)

// 写文章
API.signOut = (data, extras) => post(baseApiUrl + '/auth/signOut', data, extras)

// 写文章
API.getPermissionList = (data, extras) => fetch(baseApiUrl + '/admin/permision', data, true, extras)

export default API
