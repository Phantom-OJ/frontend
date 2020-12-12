import Vue from 'vue'
import Vuex from 'vuex'
import {InfoOptions} from "@/ts/interfaces"
import {Announcement, Assignment, JudgeDB, JudgeScript, Problem, Record, Tag} from "@/ts/entities"
import {notLogin} from "@/store/testData";
import {EntityContainer} from "@/ts/entity-container";
import {Group, Permission} from "@/ts/user";
import {API} from "@/ts/api";

Vue.use(Vuex)

let vuex = new Vuex.Store({
  state: {
    user: notLogin,
    isAuthenticated: true,
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
      },
      admin: {
        text: 'nav-user.admin',
        icon: 'mdi-account-supervisor',
        to: '/administrate'
      }
    },
    width_height: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    assignmentInfo: new EntityContainer<Assignment>(),
    problemInfo: new EntityContainer<Problem>(),
    announcementInfo: new EntityContainer<Announcement>(),
    recordInfo: new EntityContainer<Record>(),
    tags: [] as Tag[],
    scripts: [] as JudgeScript[],
    dbs: [] as JudgeDB[],
    groups: [] as Group[],
    permissions: [] as Permission[],
    roles: [] as string[]
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
    },
    setTags(state, tags) {
      state.tags = tags
    },
    setScripts(state, scripts) {
      state.scripts = scripts
    },
    setDBs(state, dbs) {
      state.dbs = dbs
    },
    setGroups(state, groups) {
      state.groups = groups
    },
    setPermissions(state, ps) {
      state.permissions = ps
    },
    setRoles(state, rs) {
      state.roles = rs
    }
  },
  actions: {
    async loadTags({commit, state}, force) {
      if (state.tags.length === 0 || force) {
        let tags = await API.getInstance().allTags()
        commit('setTags', tags)
      }
    },
    async loadScripts({commit, state}, force) {
      if (state.scripts.length === 0 || force) {
        let scripts = await API.getInstance().allScripts()
        commit('setScripts', scripts)
      }
    },
    async loadDBs({commit, state}, force) {
      if (state.dbs.length === 0 || force) {
        let dbs = await API.getInstance().allDBs()
        commit('setDBs', dbs)
      }
    },
    async loadGroups({commit, state}, force) {
      if (state.groups.length === 0 || force) {
        let groups = await API.getInstance().allGroups()
        commit('setGroups', groups)
      }
    },
    async loadPermissions({commit, state}, force) {
      if (state.permissions.length === 0 || force) {
        let ps = await API.getInstance().allPermissions()
        commit('setPermissions', ps)
        let rs = new Set<string>()
        ps.forEach(e => rs.add(e.role ?? 'ROLE_STUDENT'))
        commit('setRoles', [...rs.values()])
      }
    }
  }
})

export default vuex
