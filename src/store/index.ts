import Vue from 'vue'
import Vuex from 'vuex'
import {InfoContainer, LoginForm, User, SignUpForm} from "@/ts/DataDef"
import API from '@/ts/api'
import router from '@/router/index'
import {Announcement, Contest, Problem} from "@/ts/entries";
import '@/ts/prototypes'

Vue.use(Vuex)

const notLogin = <User>{
  name: 'please login',
  ID: 'please login',
  role: 'visitor',
  group: '',
  avatar: 'data:image/png;base64,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'
}

let vuex = new Vuex.Store({
  state: {
    user: notLogin,
    isAuthenticated: false,
    sideNav: <boolean>false,
    nav: [
      {
        text: 'nav-bar.home',
        icon: 'mdi-home-circle-outline',
        to: '/'
      }, {
        text: 'nav-bar.help',
        description: 'nav.help_des',
        icon: 'mdi-help-circle-outline',
        to: '/help'
      }, {
        text: 'nav-bar.problem',
        icon: 'mdi-folder-outline',
        to: '/problem/all'
      }, {
        text: 'nav-bar.state',
        icon: 'mdi-state-machine',
        to: '/state/all'
      }, {
        text: 'nav-bar.contest',
        icon: 'mdi-clipboard-text',
        to: '/contest/all'
      }
    ],
    navUser: {
      login: {
        text: 'nav-user.login',
        icon: 'mdi-login',
        to: '/login'
      },
      signUp: {
        text: 'nav-user.sign-up',
        icon: 'mdi-account-plus',
        to: '/sign up'
      },
      profile: {
        text: 'nav-user.profile',
        icon: 'mdi-account',
        to: '/user/profile'
      },
      signOut: {
        text: 'nav-user.sign-out',
        icon: 'mdi-logout',
        event: 'signOut'
      }
    },
    width_height: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    contestInfo: new InfoContainer<Contest>(),
    problemInfo: new InfoContainer<Problem>(),
    announcementInfo: new InfoContainer<Announcement>()
  },
  mutations: {
    setUser(state, {user, isAuthenticated}) {
      state.user = user
      state.isAuthenticated = isAuthenticated
    },
    setSideNav(state, value) {
      state.sideNav = value
    },
    windowResize(state, payload) {
      state.width_height = payload
    },
    setContestInfo(state, {selectedID, pageIndex, list, max, filter}) {
      if (!!selectedID || selectedID === 0) state.contestInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.contestInfo.pageIndex = pageIndex
      if (!!list) state.contestInfo.addAll(list)
      if (!!max) state.contestInfo.maxLength = max
      if (!!filter) state.contestInfo.filter = filter
    },
    setProblemInfo(state, {selectedID, pageIndex, list, max, filter}) {
      if (!!selectedID || selectedID === 0) state.problemInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.problemInfo.pageIndex = pageIndex
      if (!!list) state.problemInfo.addAll(list)
      if (!!max) state.problemInfo.maxLength = max
      if (!!filter) state.problemInfo.filter = filter
    },
    setAnnouncementInfo(state, {selectedID, pageIndex, list, max, filter}) {
      if (!!selectedID || selectedID === 0) state.announcementInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.announcementInfo.pageIndex = pageIndex
      if (!!list) state.announcementInfo.addAll(list)
      if (!!max) state.announcementInfo.maxLength = max
      if (!!filter) state.announcementInfo.filter = filter
    },
  },
  actions: {
    async login({commit}, payload: { loginForm: LoginForm, then: string }) {
      let user = await API.login(payload.loginForm)
      commit('setUser', {user: user, isAuthenticated: true})
      await router.push(payload.then || '/')
    },
    async signUp({commit}, payload: { signForm: SignUpForm, then: string }) {
      let user = await API.signUp(payload.signForm)
      commit('setUser', {user: user, isAuthenticated: true})
      await router.push(payload.then || '/')
    },
    async signOut({commit, state}) {
      let re = await API.signOut('')
      commit('setUser', {user: notLogin, isAuthenticated: false})
      await router.push('/')
    }
  },
  strict: true
})

import {announcementList, contestList, problemList} from "@/store/testData";

vuex.commit('setAnnouncementInfo', {list: announcementList, max: 2})
vuex.commit('setContestInfo', {list: contestList, max: 2})
vuex.commit('setProblemInfo', {list: problemList, max: 2})

export default vuex
