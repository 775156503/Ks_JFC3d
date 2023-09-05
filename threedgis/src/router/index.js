import { message } from 'ant-design-vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { showFullLoading, hideFullLoading } from '../assets/js/nprogress'

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})
//全局使用进度条
router.beforeEach((to, from, next) => {
  showFullLoading()
  if (to.path == '/login' || to.path == '/register') {
    // 登录或者注册才可以往下进行
    next()
  } else {
    // 获取 token
    const token = localStorage.getItem('token_51')
    // token 不存在
    if (token === null || token === '') {
      message.error('您还没有登录，请先登录')
      next('/login')
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  hideFullLoading()
  if (to.path == '/home') message.success('欢迎回来')
})

export default router
