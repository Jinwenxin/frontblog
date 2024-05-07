// 路由前置拦截
import router from './router'
// import { useStore } from 'vuex'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import store from './store' // 使用全局store，不是hook useStore()
// const store = useStore()
router.beforeEach((to, from, next) => { // 路由跳转前
  NProgress.start() // 开启进度条
  if (to.meta.title) { // 设置页面标题    
    document.title = to.meta.title        
  }
  if (to.matched.some(record => record.meta.requiresAuth)) { // 判断该路由是否需要登录权限
    console.log(store.state.token)
    if (store.state.token) { // 通过vuex state获取当前的token
      next() // 直接进入该路由
    } else {
      next({               // 否则全部重定向到登录页面

        path: '/login',
        query: {
          redirect: to.fullPath // 将跳转的路由path作为参数，登录成功后跳转到该路由
        }
      })              
    }
  } else {
    next() // 如没有登录权限，直接进入该路由
  }
})

router.afterEach(() => { // 路由跳转后
  NProgress.done() // 关闭进度条
})      