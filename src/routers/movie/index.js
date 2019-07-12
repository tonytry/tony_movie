export default {
  path: '/movie',
  name: 'movie',
  // @表示src目录
  component: () => import('@/views/Movie'),

  // 添加二级路由
  children: [
    {
      path: 'city',
      name: 'city',
      component: () => import('@/components/City')
    },
    {
      path: 'nowPlaying',
      component: () => import('@/components/NowPlaying')
    },
    {
      path: 'comingSoon',
      component: () => import('@/components/ComingSoon')
    },
    {
      path: 'search',
      component: () => import('@/components/Search')
    },
    {
      path: 'detail/now/:movieId',
      // 这边命名视图需要写成components，而不是component
      components: {
        // 在点击动画效果，解决背景为空的方法
        default: () => import('@/components/NowPlaying'),
        // 这边只渲染router-view name="detail" 的这部分
        detail: () => import('@/views/Movie/detail')
      },
      // 路由的高度耦合，这边propos用字符集是因为多个components
      props: {
        // 好处直接在props接受movieId
        detail: true
      }
    },
    {
      path: 'detail/come/:movieId',
      // 这边命名视图需要写成components，而不是component
      components: {
        // 在点击动画效果，解决背景为空的方法
        default: () => import('@/components/ComingSoon'),
        // 这边只渲染router-view name="detail" 的这部分
        detail: () => import('@/views/Movie/detail')
      },
      // 路由的高度耦合，这边propos用字符集是因为多个components
      props: {
        // 好处直接在props接受movieId
        detail: true
      }
    },
    {
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}
