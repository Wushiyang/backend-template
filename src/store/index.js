import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import * as getters from './getters' // 导入响应的模块，*相当于引入了这个组件下所有导出的事例
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  token: '',
  userInfo: {
    nickname: '',
    phone: '',
    account: '',
    avatar: {
      url: '',
      full_url: '',
      thumbnail_url: ''
    }
  },
  permissionDict: { default: true },
  defaultImg: {
    error: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png', // 错误图片
    avatar: '/static/images/common/userImg.png', // 默认头像
    noCover: 'http://noteview.org/wp-content/uploads/2017/06/zanwufengmian.jpg' // 上传视频无封面显示
  }
}

// 注册上面引入的各大模块
const store = new Vuex.Store({
  state, // 共同维护的一个状态，state里面可以是很多个全局状态
  getters, // 获取数据并渲染
  mutations, // 处理数据的唯一途径，state的改变或赋值只能在这里
  actions, // 数据的异步操作
  plugins: [
    createPersistedState({
      storage: window.localStorage
    })
  ]
})

export default store
