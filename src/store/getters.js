// 定义路由
const creatAutoRouter = (state) => {
  /**
      icon : 图标
      path : vue-router path
      name : vue-router name
      component : vue-router component
      hidden : 如果 'hidden:true' 将隐藏此路由导航
      redirect : vue-router redirect
      hyperlink : 如果 'hyperlink:true' 超链接，外链、
      permission: string 权限标识 // 'default'表示默认权限，用户都有的权限
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
    **/
  const routes = [
    {
      path: '/',
      component: () => import('@/pages/index'),
      redirect: '/home',
      children: [
        {
          icon: 'icon-home',
          path: '/home',
          name: 'home',
          component: () => import('@/pages/home'),
          hidden: false,
          power: true,
          meta: {
            tit: '首页'
          },
          requireAuth: true,
          permission: 'default'
        },
        {
          path: '/example',
          hidden: false,
          icon: 'icon-menu-monitor',
          meta: {
            tit: '例子'
          },
          component: { template: '<router-view />' },
          requireAuth: true,
          permission: 'default',
          children: [
            {
              path: '/example/list',
              name: 'list',
              component: () => import('@/pages/example/list'),
              hidden: false,
              meta: {
                tit: '列表'
              },
              requireAuth: true,
              permission: 'default'
            },
            {
              path: '/example/editor',
              name: 'editor',
              component: () => import('@/pages/example/editor'),
              hidden: false,
              meta: {
                tit: '编辑'
              },
              requireAuth: true,
              permission: 'default'
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      power: true,
      component: () => import('@/pages/login'),
      meta: {
        tit: '登录'
      }
    }
  ]
  return routes
}
export { creatAutoRouter }
