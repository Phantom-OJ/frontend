import Vue from 'vue'
import Vuex from 'vuex'
import {InfoOptions} from "@/ts/interfaces"
import {Announcement, Assignment, Problem, Record} from "@/ts/entities";
import '@/ts/prototypes'
import {notLogin} from "@/store/testData";
import {EntityContainer} from "@/ts/entity-container";


Vue.use(Vuex)


let vuex = new Vuex.Store({
  state: {
    user: notLogin,
    isAuthenticated: false,
    // loading: false,
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
        icon: 'mdi-account'
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
    assignmentInfo: new EntityContainer<Assignment>(),
    problemInfo: new EntityContainer<Problem>(),
    announcementInfo: new EntityContainer<Announcement>(),
    recordInfo: new EntityContainer<Record>()
  },
  mutations: {
    setUser(state, {user, isAuthenticated}) {
      state.user = isAuthenticated ? user : notLogin
      state.isAuthenticated = isAuthenticated
    },
    setSideNav(state, value) {
      state.sideNav = value
    },
    windowResize(state, payload) {
      state.width_height = payload
    },
    /**
     *
     * @param state
     * @param pageIndex
     * @param list
     * @param detailAssignment
     * @param max
     * @param filter
     */
    setAssignmentInfo(state, {pageIndex, list, detailAssignment, max, filter}: InfoOptions<Assignment>) {
      if (!!pageIndex || pageIndex === 0) state.assignmentInfo.selectPage(pageIndex)
      if (!!list) state.assignmentInfo.list = list
      if (!!detailAssignment) state.assignmentInfo.add(detailAssignment)
      if (!!max) state.assignmentInfo.maxLength = max
      if (!!filter) state.assignmentInfo.filter = filter
    },
    setProblemInfo(state, {pageIndex, list, detailProblem, max, filter}: InfoOptions<Problem>) {
      if (!!pageIndex || pageIndex === 0) state.problemInfo.selectPage(pageIndex)
      if (!!list) state.problemInfo.list = list
      if (!!detailProblem) state.problemInfo.add(detailProblem)
      if (!!max) state.problemInfo.maxLength = max
      if (!!filter) state.problemInfo.filter = filter
    },
    setAnnouncementInfo(state, {pageIndex, list, max}: InfoOptions<Announcement>) {
      if (!!pageIndex || pageIndex === 0) state.announcementInfo.selectPage(pageIndex)
      if (!!list) state.announcementInfo.list = list
      if (!!max) state.announcementInfo.maxLength = max
    },
    setRecordInfo(state, {pageIndex, list, detailRecord, max, filter, code}: InfoOptions<Record>) {
      if (!!pageIndex || pageIndex === 0) state.recordInfo.selectPage(pageIndex)
      if (!!list) state.recordInfo.list = list
      if (!!detailRecord) state.recordInfo.add(detailRecord)
      if (!!max) state.recordInfo.maxLength = max
      if (!!filter) state.recordInfo.filter = filter
      if (!!code) state.recordInfo.get(code.id)!.code = code.code.code
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
    // async logOut({commit, state}) {
    //   let re = await API.logOut('')
    //   commit('setUser', {user: notLogin, isAuthenticated: false})
    //   await router.push('/')
    // }
  },
  strict: true
})
// vuex.commit('setAnnouncementInfo', {list: announcementList, max: 2})
// vuex.commit('setAssignmentInfo', {list: assignmentList, max: 2})
// vuex.commit('setProblemInfo', {list: problemList, max: 2})
// vuex.commit('setRecordInfo', {list: recordList, max: 5})

export default vuex
