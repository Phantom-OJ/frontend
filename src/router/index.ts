import Vue from 'vue'
import VueRouter, {Route, RouteConfig} from 'vue-router'
import SHome from '@/views/SHome.vue'
import SLogin from '@/views/SLogin.vue'
import vuex from '@/store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: SHome,
    beforeEnter: function (to: Route, from: Route, next: Function) {
      next()
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/SAbout.vue')
  },
  {
    path: '/i18n',
    name: 'HelloI18n',
    component: () => import('@/components/HelloI18n.vue')
  }, {
    path: '/profile/:uid',
    name: 'profile-other',
    component: () => import('@/views/SProfile.vue'),
    beforeEnter: requireAuthenticatedEnter,
    children: [{
      path: 'edit',
      name: 'profile-edit',
      component: () => import('@/views/profiles/SProfileEdit.vue')
    }, {
      path: 'security',
      name: 'profile-security',
      component: void 0
    }, {
      path: '*',
      name: 'profile-home',
      component: () => import('@/views/profiles/SProfileHome.vue')
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: SLogin,
    beforeEnter: requireNotAuthenticated,
  },
  {
    path: '/sign up',
    name: 'sign-up',
    component: () => import('@/views/SSignUp.vue'),
    beforeEnter: requireNotAuthenticated
  },
  {
    path: '/assignment/all',
    name: 'assignment-all',
    component: () => import('@/views/SAssignment.vue')
  },
  {
    path: '/problem/all',
    name: 'problem-all',
    component: () => import('@/views/SProblem.vue')
  },
  {
    path: '/record/all',
    name: 'record-all',
    component: () => import('@/views/SRecord.vue')
  }, {
    path: '/assignment/:aid',
    name: 'assignment-detail',
    component: () => import('@/views/SAssignmentDetail.vue')
  }, {
    path: '/problem/:pid',
    name: 'problem-detail',
    component: () => import('@/views/SProblemDetail.vue')
  }, {
    path: '/record/:rid',
    name: 'record-detail',
    component: () => import('@/views/SRecordDetail.vue')
  }, {
    path: '/help',
    name: 'help',
    component: () => import('@/views/SHelp.vue')
  }, {
    path: '/forget-pwd',
    name: 'forget-password',
    component: () => import('@/views/SForgetPassword.vue')
  }, {
    path: '/create/assignment',
    name: 'create-assignment',
    component: () => import('@/views/SCreateAssignment.vue')
  }, {
    path: '/forbidden',
    name: 'forbidden',
    component: () => import('@/views/SForbidden.vue')
  },
  {
    path:'/*',
    name:'not-found',
    component: () => import('@/views/SNotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


function requireAuthenticatedEnter(to: Route, from: Route, next: Function) {
  if (!vuex.state.isAuthenticated) {
    next({name: 'login', query: {then: to.path}})
  } else {
    next()
  }
}

function requireNotAuthenticated(to: Route, from: Route, next: Function) {
  if (vuex.state.isAuthenticated) {
    next({name: 'Home'})
  } else {
    next()
  }
}

export default router
