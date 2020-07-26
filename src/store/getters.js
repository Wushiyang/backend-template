
// 定义路由
const creatAutoRouter = state => {
  /**
    icon : 图标
    hidden : 如果 'hidden:true' 将隐藏此路由导航
    hyperlink : true 如果true，则path是超链接，外链
    permission: '' | null 这个页面需要的权限标识
  **/
  const routes = [
    {
      path: '/',
      component: () => import('@/pages/index'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/pages/home'),
          hidden: false,
          icon: 'icon-home',
          meta: {
            tit: '首页'
          },
          permission: 'home'
        },
        {
          path: 'https://www.baidu.com/',
          hyperlink: true,
          hidden: false,
          icon: 'icon-home',
          permission: 'baidu',
          meta: {
            tit: '百度链接'
          }
        },
        {
          path: '/monitor',
          hidden: false,
          icon: 'icon-menu-monitor',
          meta: {
            tit: '监控'
          },
          component: () => import('@/components/routermiddleware'),
          permission: 'monitor',
          children: [
            {
              path: '/monitor/monitorbiu',
              name: 'monitorbiu',
              component: () => import('@/pages/monitor/monitorbiu'),
              hidden: false,
              meta: {
                tit: 'Biu贴'
              },
              permission: 'monitor_biu'
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: {
        tit: '登录'
      }
    }
  ]
  return routes
}
export {
  creatAutoRouter
}
