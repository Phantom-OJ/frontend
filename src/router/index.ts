import Vue from 'vue'
import VueRouter, {NavigationGuardNext, Route, RouteConfig} from 'vue-router'
import SHome from '@/views/SHome.vue'
import SLogin from '@/views/SLogin.vue'
import vuex from '@/store/index'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [{
  path: '/',
  name: 'Home',
  component: SHome
}, {
  path: '/about',
  name: 'About',
  component: () => import(/* webpackChunkName: "about" */ '@/views/SAbout.vue')
}, {
  path: '/profile/:uid',
  name: 'profile-other',
  component: () => import('@/views/SProfile.vue'),
  beforeEnter: (to, from, next) => {
    if (!isPositiveNumber(to.params.uid)) {
      next({name: 'not-found'})
    } else {
      next()
    }
  },
  children: [{
    path: 'edit',
    name: 'profile-edit',
    component: () => import('@/views/profiles/SProfileEdit.vue'),
    beforeEnter: requireSelf
  }, {
    path: 'security',
    name: 'profile-security',
    component: () => import('@/views/profiles/SProfileSecurity.vue'),
    beforeEnter: requireSelf
  }, {
    path: '*',
    name: 'profile-home',
    component: () => import('@/views/profiles/SProfileHome.vue')
  }]
}, {
  path: '/login',
  name: 'login',
  component: SLogin,
  beforeEnter: requireNotAuthenticated,
}, {
  path: '/sign up',
  name: 'sign-up',
  component: () => import('@/views/SSignUp.vue'),
  beforeEnter: requireNotAuthenticated
}, {
  path: '/assignment/all',
  name: 'assignment-all',
  component: () => import('@/views/SAssignment.vue')
}, {
  path: '/problem/all',
  name: 'problem-all',
  component: () => import('@/views/SProblem.vue')
}, {
  path: '/record/all',
  name: 'record-all',
  component: () => import('@/views/SRecord.vue')
}, {
  path: '/announcement',
  name: 'announcement-all',
  component: () => import('@/views/SAnnouncement.vue')
}, {
  path: '/assignment/:aid',
  name: 'assignment-detail',
  component: () => import('@/views/SAssignmentDetail.vue'),
  beforeEnter: (to, from, next) => {
    if (!isPositiveNumber(to.params.aid)) {
      next({name: 'not-found'})
    } else {
      next()
    }
  }
}, {
  path: '/problem/:pid',
  name: 'problem-detail',
  component: () => import('@/views/SProblemDetail.vue'),
  beforeEnter: (to, from, next) => {
    if (!isPositiveNumber(to.params.pid)) {
      next({name: 'not-found'})
    } else {
      next()
    }
  }
}, {
  path: '/record/:rid',
  name: 'record-detail',
  component: () => import('@/views/SRecordDetail.vue'),
  beforeEnter: (to, from, next) => {
    if (!isPositiveNumber(to.params.rid)) {
      next({name: 'not-found'})
    } else {
      next()
    }
  }
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
  component: () => import('@/views/SManageAssignment.vue'),
  beforeEnter: requireAuthenticatedEnter
}, {
  path: '/modify/assignment/:aid/problem/:pid',
  name: 'modify-problem',
  component: () => import('@/views/SManageProblem.vue'),
  beforeEnter: requireAuthenticatedEnter
}, {
  path: '/modify/assignment/:aid',
  name: 'modify-assignment',
  component: () => import('@/views/SManageAssignment.vue'),
  beforeEnter: requireAuthenticatedEnter
}, {
  path: '/modify/judge-points/:pid',
  name: 'modify-judge-points',
  component: () => import('@/views/SManageAssignment.vue'),
  beforeEnter: requireAuthenticatedEnter
}, {
  path: '/administrate',
  name: 'administrate',
  component: () => import('@/views/SAdmin.vue'),
  beforeEnter: function (to: Route, from: Route, next: Function) {
    if (vuex.state.isAuthenticated && vuex.state.user.permissionList.length > 0) {
      next()
    } else {
      next('/')
    }
  }
}, {
  path: '/forbidden',
  name: 'forbidden',
  component: () => import('@/views/SForbidden.vue')
}, {
  path: '/*',
  name: 'not-found',
  component: () => import('@/views/SNotFound.vue')
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function requireAuthenticatedEnter(to: Route, from: Route, next: NavigationGuardNext) {
  if (!vuex.state.isAuthenticated) {
    next({name: 'login', query: {then: to.path}})
  } else {
    next()
  }
}

function requireNotAuthenticated(to: Route, from: Route, next: NavigationGuardNext) {
  if (vuex.state.isAuthenticated) {
    next('/')
  } else {
    next()
  }
}

function requireSelf(to: Route, from: Route, next: NavigationGuardNext) {
  if (parseInt(to.params.uid) !== vuex.state.user.ID) {
    next({
      name: 'profile-home'
    })
  } else {
    next()
  }
}

function isPositiveNumber(o: any) {
  return parseInt(o) > 0
}

export default router
