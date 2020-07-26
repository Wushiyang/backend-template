// 登录
export const login = (state, data) => {
  state.userInfo = data
  state.token = data.token
}

// 获取和更新权限
export const updatePermissionList = (state, data) => {
  state.permissionList = data
}

// 退出登录
export const logout = (state) => {
  state.token = ''
  state.userInfo = {
    account: '',
    password: '',
    phone: '',
    sms_code: '',
    code: '',
    userinfo: {
      avatar: null,
      gender: 0,
      id: null,
      introduction: '',
      nickname: '',
      phone: ''
    }
  }
  // localStorage.removeItem('token')
  // localStorage.removeItem('vuex')
}
