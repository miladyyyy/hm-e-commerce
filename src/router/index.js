import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '@/views/Login'
import LayoutPage from '@/views/Layout'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/',
    name: 'layout',
    component: LayoutPage,
    redirect: '/welcome',
    children: [
      {
        path: 'welcome',
        component: () => import('@/views/Welcome'),
      },
      {
        path: 'categories',
        component: () => import('@/views/Categories'),
      },
      {
        path: 'goods',
        component: () => import('@/views/Goods'),
      },
      {
        path: 'orders',
        component: () => import('@/views/Orders'),
      },
      {
        path: 'params',
        component: () => import('@/views/Params'),
      },
      {
        path: 'rights',
        component: () => import('@/views/Rights'),
      },
      {
        path: 'roles',
        component: () => import('@/views/Roles'),
      },
      {
        path: 'users',
        component: () => import('@/views/Users'),
      },
      {
        path: 'reports',
        component: () => import('@/views/Reports'),
      },
      {
        path: 'add',
        component: () => import('@/views/Add'),
      },
    ],
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  const { token } = store.state.user
  if (to.path !== '/login' && !token) return next('/login')
  next()
})

export default router
