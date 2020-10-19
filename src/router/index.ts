import Vue from 'vue'
import VueRouter, {Route, RouteConfig} from 'vue-router'
import SHome from '@/views/SHome.vue'
import SLogin from '@/views/SLogin.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: SHome
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/i18n',
    name: 'HelloI18n',
    component: () => import('@/components/HelloI18n.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/SProfile.vue'),
    beforeEnter: requireAuthenticatedEnter
  },
  {
    path: '/login',
    name: 'login',
    component: SLogin,
    beforeEnter: requireNotAuthenticated
  },
  {
    path:'/sign up',
    name:'sign-up',
    component: () => import('@/views/SSignUp.vue'),
    beforeEnter: requireNotAuthenticated
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function requireAuthenticatedEnter(to: Route, from: Route, next: Function) {
  if (!router.app.$store.state.isAuthenticated) {
    next({name: 'login', query: {then: to.path}})
  }else {
    next()
  }
}

function requireNotAuthenticated(to: Route, from: Route, next: Function) {
  if (router.app.$store.state.isAuthenticated){
    next({name:'Home'})
  }else{
    next()
  }
}

export default router
