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
      path: '/movie',
      redirect: '/movie/nowPlaying'
    }
  ]
}
