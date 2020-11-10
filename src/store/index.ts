import Vue from 'vue'
import Vuex from 'vuex'
import {InfoContainer, LoginForm, User, SignUpForm} from "@/ts/DataDef"
import API from '@/ts/API'
import router from '@/router/index'
import {Announcement, Assignment, Problem, Record} from "@/ts/Entries";
import '@/ts/Prototypes'

Vue.use(Vuex)

import {announcementList, assignmentList, problemList, recordList, notLogin} from "@/store/testData";


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
        text: 'nav-bar.record',
        icon: 'mdi-state-machine',
        to: '/record/all'
      }, {
        text: 'nav-bar.assignment',
        icon: 'mdi-clipboard-text',
        to: '/assignment/all'
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
    assignmentInfo: new InfoContainer<Assignment>(''),
    problemInfo: new InfoContainer<Problem>(''),
    announcementInfo: new InfoContainer<Announcement>(''),
    recordInfo: new InfoContainer<Record>(new Map<string,string>())
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
    setAssignmentInfo(state, {selectedID, pageIndex, list, max, filter, clear}) {
      if (!!clear) state.assignmentInfo.clear()
      if (!!selectedID || selectedID === 0) state.assignmentInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.assignmentInfo.pageIndex = pageIndex
      if (!!list) state.assignmentInfo.addAll(list)
      if (!!max) state.assignmentInfo.maxLength = max
      if (!!filter || filter === '') state.assignmentInfo.filter = filter
    },
    setProblemInfo(state, {selectedID, pageIndex, list, max, filter, clear}) {
      if (!!clear) state.problemInfo.clear()
      if (!!selectedID || selectedID === 0) state.problemInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.problemInfo.pageIndex = pageIndex
      if (!!list) state.problemInfo.addAll(list)
      if (!!max) state.problemInfo.maxLength = max
      if (!!filter || filter === '') state.problemInfo.filter = filter
    },
    setAnnouncementInfo(state, {selectedID, pageIndex, list, max, clear}) {
      if (!!clear) state.announcementInfo.clear()
      if (!!selectedID || selectedID === 0) state.announcementInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.announcementInfo.pageIndex = pageIndex
      if (!!list) state.announcementInfo.addAll(list)
      if (!!max) state.announcementInfo.maxLength = max
    },
    setRecordInfo(state, {selectedID, pageIndex, list, max, filter, clear}) {
      if (!!clear) state.recordInfo.clear()
      if (!!selectedID || selectedID === 0) state.recordInfo.selectedID = selectedID
      if (!!pageIndex || pageIndex === 0) state.recordInfo.pageIndex = pageIndex
      if (!!list) state.recordInfo.addAll(list)
      if (!!max) state.recordInfo.maxLength = max
      if (!!filter) state.recordInfo.filter = filter
    }
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
vuex.commit('setAnnouncementInfo', {list: announcementList, max: 2})
vuex.commit('setAssignmentInfo', {list: assignmentList, max: 2})
vuex.commit('setProblemInfo', {list: problemList, max: 2})
vuex.commit('setRecordInfo',{list:recordList, max:5})

export default vuex
