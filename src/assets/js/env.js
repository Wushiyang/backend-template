/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * baseApiUrl: 运营后台api地址
 * commonApiUrl: 公告api地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */

let baseUrl = ''
let baseApiUrl = ''
let commonApiUrl = ''
let routerMode = 'history'
let DEBUG = false
let cancleHTTP = []
if (process.env.NODE_ENV === 'development') {
  // baseUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/'
  // baseApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082'
  // commonApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/common'
  baseUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/'
  baseApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082'
  commonApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/common'

  DEBUG = true
} else if (process.env.NODE_ENV === 'testing') {
  baseUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/'
  baseApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082'
  commonApiUrl = 'http://develop.api.liulian.dev2.0779365.me:8082/common'
  DEBUG = false
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'https://goudanapp.com/'
  baseApiUrl = 'https://social-api.goudanapp.com'
  commonApiUrl = 'https://social-api.goudanapp.com/common'
  DEBUG = false
}
export { baseUrl, baseApiUrl, commonApiUrl, routerMode, DEBUG, cancleHTTP }
