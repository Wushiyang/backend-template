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
Mock.mock(/\/example\/getlist/, () => ({
  code: 0,
  msg: '成功',
  data: {
    filter: [
      {
        field: 'view_pattern',
        label: '查看方式',
        option: [
          {
            label: '单向',
            value: 'oneway'
          },
          {
            label: '双向',
            value: 'bothway'
          }
        ]
      },
      {
        field: 'content_type',
        label: '内容筛选',
        option: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '文本',
            value: 1
          },
          {
            label: '语音',
            value: 2
          },
          {
            label: '图片',
            value: 3
          },
          {
            label: '视频',
            value: 4
          }
        ]
      },
      {
        field: 'search_dimension',
        label: '搜索',
        option: [
          {
            label: '内容',
            value: 'content'
          },
          {
            label: '话题',
            value: 'topic'
          },
          {
            label: '位置',
            value: 'position'
          },
          {
            label: '作者',
            value: 'user'
          },
          {
            label: '管理员手机号',
            value: 'admin_phone'
          }
        ]
      }
    ]
  }
}))
Mock.mock(/\/auth\/userInfo/, () => ({
  code: 0,
  msg: '成功',
  data: {
    permission_list: []
  }
}))
