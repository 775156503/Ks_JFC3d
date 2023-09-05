const login = () => import('@/pages/login.vue')
const home = () => import('@/pages/main.vue')
const notFount = () => import('@/pages/NotFound.vue')

const routes = [
  { path: '/', redirect: 'login' },
  {
    path: '/home',
    name: 'home',
    component: home,
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/:pathMatch(.*)',
    component: notFount,
  },
]

export default routes
