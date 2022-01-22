import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

// 导入登录注册组件
// import Reg from '@/views/Reg/Reg.vue'
// import Login from '../views/Login/login.vue'
// import Main from '@/views/main/main'
// import Home from '../views/menus/Home/Home.vue'
// import UserInfo from '../views/menus/User/UserInfo.vue'
// import UserAvatar from '../views/menus/User/UserAvatar.vue'
// import UserPwd from '../views/menus/User/UserPwd.vue'
// import ArtCate from '../views/menus/Article/ArtCate.vue'
// import ArtList from '../views/menus/Article/ArtList.vue'

// 路由懒加载 vue 异步组件技术 导入
const Reg = () => import('@/views/Reg/Reg.vue')
const Login = () => import('../views/Login/login.vue')
const Main = () => import('@/views/main/main')
const Home = () => import('../views/menus/Home/Home.vue')
const UserInfo = () => import('../views/menus/User/UserInfo.vue')
const UserAvatar = () => import('../views/menus/User/UserAvatar.vue')
const UserPwd = () => import('../views/menus/User/UserPwd.vue')
const ArtCate = () => import('../views/menus/Article/ArtCate.vue')
const ArtList = () => import('../views/menus/Article/ArtList.vue')

Vue.use(VueRouter)

// 把下面的代码粘贴到路由模块中对应的位置，即可防止路由报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/reg', component: Reg },
  { path: '/login', component: Login },
  {
    path: '/',
    component: Main,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'user-info', component: UserInfo },
      { path: 'user-avatar', component: UserAvatar },
      { path: 'user-pwd', component: UserPwd },
      { path: 'art-cate', component: ArtCate },
      { path: 'art-list', component: ArtList }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.user.token && to.path !== ('/login' || '/reg')) {
    Vue.prototype.$message.error('没有登录呀!小傻瓜~~')
    return next('/login')
  }
  next()
})

export default router
