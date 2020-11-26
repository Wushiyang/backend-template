// 登录
export const login = (state, data) => {
  state.userInfo = data.user_info
  state.token = data.token
}

// 获取和更新权限
export const setPermissionDic = (state, data) => {
  for (let i = 0; i < data.length; i++) {
    state.permissionList[data[i]] = true
  }
}

// 退出登录
export const logout = (state) => {
  state.token = ''
  state.userInfo = {
    nickname: '',
    phone: '',
    account: '',
    avatar: {
      url: '',
      full_url: '',
      thumbnail_url: ''
    }
  }
}
