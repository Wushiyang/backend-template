import axios from './axios'
import $ajax from 'axios'
import { baseApiUrl, commonApiUrl } from './env'
import Vue from 'vue'
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get (url, params = {}, extras = false) {
  let loadingInstance
  let isHideError = false
  if (extras && extras.isHideError) isHideError = true
  if (extras && extras.isLoading) {
    // debugger
    loadingInstance = Vue.prototype.$loading({
      fullscreen: false,
      text: extras.loadingText || '',
      background: 'rgba(0, 0, 0, 0.6)',
      spinner: 'el-icon-loading'
    })
  }
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((response) => {
        const { msg, code } = response.data
        loadingInstance && loadingInstance.close()
        if (code !== 0) {
          !isHideError && Vue.prototype.$message({ message: `[${code}]${msg}`, type: 'error' })
        }
        resolve(response.data)
      })
      .catch((err) => {
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
export function post (url, data, extras = false) {
  let loadingInstance
  let isHideError = false
  if (extras && extras.isHideError) isHideError = true
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
      (response) => {
        const { msg, code } = response.data
        loadingInstance && loadingInstance.close()
        if (code !== 0) {
          !isHideError && Vue.prototype.$message({ message: `[${code}]${msg}`, type: 'error' })
        }
        resolve(response.data)
      },
      (err) => {
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
      (response) => {
        loadingInstance && loadingInstance.close()
        resolve(response.data)
      },
      (err) => {
        loadingInstance && loadingInstance.close()
        reject(err)
      }
    )
  })
}
let API = {}

// 获取验证码
API.sendSmsCaptcha = (data, extras) => post(commonApiUrl + '/verify/sendSmsCaptcha', data, extras)
// 手机登录
API.loginPhone = (data, extras) => post(baseApiUrl + '/auth/phoneSignIn', data, extras)
// 账号登录
API.loginAccount = (data, extras) => post(baseApiUrl + '/auth/accountSignIn', data, extras)
// 获取用户信息
API.getAdminUserInfo = (data, extras) => get(baseApiUrl + '/auth/userInfo', data, extras)

// 获取例子列表
API.getExampleList = (data, extras) => get(baseApiUrl + '/example/getlist', data, extras)

// // 获取极验信息
// llAPI.getUserGeetest = (data, extras) => post(commonApiUrl + '/verify/startCaptchaServlet', data, extras)
// // 获取分享微博详情
// llAPI.getShareWeiBoDetail = (data, extras) => fetch(baseApiUrl + '/backend/share/getWeiboDetail', data, extras)

// // 获取七牛云的上传凭证token
// llAPI.getQiniuToken = (data, extras) => fetch(baseApiUrl + '/common/getQiniuToken', data, extras)

// // 发布biu贴
// llAPI.saveWeibo = (data, extras) => post(baseApiUrl + '/weibo/save', data, extras)

// // 添加话题
// llAPI.getSearchTopics = (data, extras) => fetch(baseApiUrl + '/topic/getSearchTopics', data, extras)

// // @用户
// llAPI.getSearchUsers = (data, extras) => fetch(baseApiUrl + '/user/getList', data, extras)

// // 表情，和运营后台复用一个接口
// llAPI.getEmojiList = (data, extras) => fetch(baseApiUrl + '/backend/store_weibo/getEmojiList', data, extras)

// // 写文章
// llAPI.createWithArticle = (data, extras) => post(baseApiUrl + '/weibo/createWithArticle', data, extras)

// // 写文章
// llAPI.signOut = (data, extras) => post(baseApiUrl + '/auth/signOut', data, extras)

export default API
