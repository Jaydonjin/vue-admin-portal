import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {Message} from 'element-ui'
import {storage} from '@/utils/storage' // 验权

function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login']// 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start()
  let user = storage.get('_genesis_admin_portal_user')
  if (user) {
    // note: roles must be a array! such as: ['editor','develop']
    if (store.getters.roles.length === 0) {
      // 判断当前用户是否已拉取完user_info信息
      store.dispatch('GetUserInfo').then(res => {
        // 获取user_info
        const roles = res.roles // note: roles must be a array! such as: ['editor','develop']
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        })
      }).catch((err) => {
        next({ path: '/' })
      })
    } else {
      next()
    }
  }
  else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
