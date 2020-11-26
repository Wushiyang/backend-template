import Mock from 'mockjs'
Mock.mock(/\/verify\/sendSmsCaptcha/, () => ({
  code: 0,
  msg: '成功',
  data: {
    code: 111111
  }
}))
Mock.mock(/\/auth\/phoneSignIn/, () => ({
  code: 0,
  msg: '成功',
  data: {
    token: 123456,
    user_info: {
      nickname: '偷笑',
      phone: 18368095041,
      account: '18368095041',
      avatar: {
        url: '/forum/w%3D580/sign=e2d8b201a3345982c58ae59a3cf4310b/7af6e41e3a292df595fb8a60b2315c6034a873a0.jpg',
        full_url:
          'https://imgsa.baidu.com/forum/w%3D580/sign=e2d8b201a3345982c58ae59a3cf4310b/7af6e41e3a292df595fb8a60b2315c6034a873a0.jpg',
        thumbnail_url:
          'https://imgsa.baidu.com/forum/w%3D580/sign=e2d8b201a3345982c58ae59a3cf4310b/7af6e41e3a292df595fb8a60b2315c6034a873a0.jpg'
      }
    }
  }
}))
Mock.mock(/\/auth\/userInfo/, () => ({
  code: 0,
  msg: '成功',
  data: {
    permission_list: []
  }
}))
