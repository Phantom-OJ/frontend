import Vue from 'vue'
import Vuex from 'vuex'
import {InfoContainer, LoginForm, SignUpForm, ProblemInfoContainer} from "@/ts/interfaces"
import router from '@/router/index'
import {Announcement, Assignment, Record} from "@/ts/entries";
import '@/ts/prototypes'


Vue.use(Vuex)

import {announcementList, assignmentList, problemList, recordList, notLogin} from "@/store/testData";


let vuex = new Vuex.Store({
  state: {
    user: notLogin,
    isAuthenticated: false,
    loading: false,
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
        icon: 'mdi-logout'
      }
    },
    width_height: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    assignmentInfo: new InfoContainer<Assignment>(),
    problemInfo: new ProblemInfoContainer(),
    announcementInfo: new InfoContainer<Announcement>(),
    recordInfo: new InfoContainer<Record>()
  },
  mutations: {
    setUser(state, {user, isAuthenticated}) {
      state.user = isAuthenticated?user:notLogin
      state.isAuthenticated = isAuthenticated
    },
    setSideNav(state, value) {
      state.sideNav = value
    },
    setLoading(state, value) {
      state.loading = value
    },
    windowResize(state, payload) {
      state.width_height = payload
    },
    setAssignmentInfo(state, {selectedID, pageIndex, list, detailAssignment, max, filter, clear}) {
      if (!!clear) state.assignmentInfo.clear()
      if (!!selectedID || selectedID === 0) state.assignmentInfo.selectEntry(selectedID)
      if (!!pageIndex || pageIndex === 0) state.assignmentInfo.selectPage(pageIndex)
      if (!!list) state.assignmentInfo.addAll(list)
      if (!!detailAssignment) state.assignmentInfo.add(detailAssignment)
      if (!!max) state.assignmentInfo.maxLength = max
      if (!!filter || filter === '') state.assignmentInfo.filter = filter
    },
    setProblemInfo(state, {selectedID, pageIndex, list, detailProblem, max, filter, clear, code, lang}) {
      if (!!clear) state.problemInfo.clear()
      if (!!selectedID || selectedID === 0) state.problemInfo.selectEntry(selectedID)
      if (!!pageIndex || pageIndex === 0) state.problemInfo.selectPage(pageIndex)
      if (!!list) state.problemInfo.addAll(list)
      if (!!detailProblem) state.problemInfo.add(detailProblem)
      if (!!max) state.problemInfo.maxLength = max
      if (!!filter || filter === '') state.problemInfo.filter = filter
      if (code !== void 0) state.problemInfo.code = code
      if (!!lang || lang === '') state.problemInfo.lang = lang
    },
    setAnnouncementInfo(state, {selectedID, pageIndex, list, max, clear}) {
      if (!!clear) state.announcementInfo.clear()
      if (!!selectedID || selectedID === 0) state.announcementInfo.selectEntry(selectedID)
      if (!!pageIndex || pageIndex === 0) state.announcementInfo.selectPage(pageIndex)
      if (!!list) state.announcementInfo.addAll(list)
      if (!!max) state.announcementInfo.maxLength = max
    },
    setRecordInfo(state, {selectedID, pageIndex, list, detailRecord, max, filter, clear}) {
      if (!!clear) state.recordInfo.clear()
      if (!!selectedID || selectedID === 0) state.recordInfo.selectEntry(selectedID)
      if (!!pageIndex || pageIndex === 0) state.recordInfo.selectPage(pageIndex)
      if (!!list) state.recordInfo.addAll(list)
      if (!!detailRecord) state.recordInfo.add(detailRecord)
      if (!!max) state.recordInfo.maxLength = max
      if (!!filter) state.recordInfo.filter = filter
    }
  },
  actions: {
    // async login({commit}, payload: { loginForm: LoginForm, then: string }) {
    //   let user = await API.login(payload.loginForm)
    //   commit('setUser', {user: user, isAuthenticated: true})
    //   await router.push(payload.then || '/')
    // },
    // async signUp({commit}, payload: { signForm: SignUpForm, then: string }) {
    //   let user = await API.signUp(payload.signForm)
    //   commit('setUser', {user: user, isAuthenticated: true})
    //   await router.push(payload.then || '/')
    // },
    // async signOut({commit, state}) {
    //   let re = await API.signOut('')
    //   commit('setUser', {user: notLogin, isAuthenticated: false})
    //   await router.push('/')
    // }
  },
  strict: true
})
vuex.commit('setAnnouncementInfo', {list: announcementList, max: 2})
vuex.commit('setAssignmentInfo', {list: assignmentList, max: 2})
vuex.commit('setProblemInfo', {list: problemList, max: 2})
vuex.commit('setRecordInfo', {list: recordList, max: 5})

export default vuex
