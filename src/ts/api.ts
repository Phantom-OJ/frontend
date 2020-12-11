import Axios from 'axios'
import {CodeForm, SEntityCollection, SResponse} from "@/ts/interfaces";
import {
  Announcement,
  Assignment,
  Code,
  Grade, JudgeDB,
  JudgeScript,
  Problem,
  ProblemStatSet,
  Record,
  Tag,
  VCodeMode
} from "@/ts/entities";
import {APIException} from "@/ts/exceptions";
import {LoginForm, ModifyPasswordForm, ModifyUserForm, PageSearchForm, ResetForm, SignUpForm} from "@/ts/forms";
import {SUtil} from "@/ts/utils";
import {Group, User} from "@/ts/user";
import {Vue} from "@/ts/extension";
import {notLogin} from "@/store/testData";

Axios.defaults.withCredentials = true
Axios.defaults.timeout = 20000


/**
 * $alert and $dialog will be injected into the instance at runtime
 * class is singleton pattern
 */
export class API {
  private static readonly _instance: API = new API()

  private constructor() {
  }

  /**
   * request without catch block, it will throw APIException when GET code in ERR_CODE
   * @param method 'GET', 'POST', etc..
   * @param url 'assignment' will become '/aip/assignment'
   * @param data
   */
  async request(method: string, url: string, data?: any): Promise<SResponse>|never {
    try {
      // @ts-ignore
      return (await Axios[method](`/api/${url}`, data)).data
    } catch (e) {
      throw new APIException(e.response, url)
    }
  }

  /**
   * request with catch block, which will call $alert
   * @param method 'GET', 'POST', etc..
   * @param url 'assignment' will become '/aip/assignment'
   * @param data
   */
  async cRequest(method: string, url: string, data?: any): Promise<SResponse> {
    try {
      return await this.request(method, url, data)
    } catch (error) {
      if (error instanceof APIException) {
        switch (error.code) {
          case 401:
            // this.$vue.$store.commit('setUser',{isAuthenticated:false})
            // await this.$vue.$router.push(`/login?then=${this.$vue.$route.path}`)
            break
          case 403:
            await this.$vue.$router.replace({
              name: 'forbidden'
            })
            break
          case 404:
            await this.$vue.$router.replace({
              name: 'not-found'
            })
            break
          default:
            SUtil.alertAPIException(error, this.$vue)
        }
      }
      return {
        msg:'error',
        data:{}
      }
    }
  }

  async modifyProfile(form:ModifyUserForm):Promise<User>{
    return new User((await this.cRequest('post', 'modify/basic', form)).data)
  }

  async modifyPassword(form:ModifyPasswordForm):Promise<string>{
    return (await this.request('post','modify/password', form)).msg
  }

  async uploadJudgeScript(form:FormData):Promise<string>{
    return (await this.cRequest('post','upload/judgescript', form)).msg
  }

  async uploadAvatar(form:FormData):Promise<string>{
    return (await this.cRequest('post', 'upload/avatar', form)).msg
  }

  async checkState(): Promise<[User, boolean]> {
    try {
      let data = (await this.request('post', 'checkstate')).data
      return [new User(data), true]
    } catch (error) {
      if (error instanceof APIException && (error.code === 401||error.code===403||error.code===404)) {
        return [notLogin, false]
      }
      SUtil.alertAPIException(error, this.$vue)
      return [notLogin, false]
    }
  }

  async login(loginForm: LoginForm): Promise<User> {
    return new User((await this.request('post', 'login', loginForm)).data)
  }

  async signUp(form: SignUpForm): Promise<User> {
    return new User((await this.request('post', 'signup', form)).data)
  }

  async resetPassword(form: ResetForm): Promise<any> {
    return (await this.request('post', 'rstpwd', form)).msg
  }

  async sendVCode({username, mode}: { username: string, mode: VCodeMode }): Promise<string> {
    return (await this.cRequest('post', `sendvcode`, {
      username, mode
    })).msg
  }

  async allGroups():Promise<Group[]>{
    let data = (await this.cRequest('get','require/group')).data
    return (data as any[])?.map(e=>new Group(e))??[]
  }

  async allTags():Promise<Tag[]>{
    let data = (await this.cRequest('get','require/tag')).data
    return (data as any[])?.map(e => new Tag(e))??[]
  }

  async allScripts():Promise<JudgeScript[]>{
    let data = (await this.cRequest('get','require/judgescript')).data
    return (data as any[])?.map(e => new JudgeScript(e))??[]
  }

  async allDBs():Promise<JudgeDB[]>{
    let data = (await this.cRequest('get','require/judgedb')).data
    return (data as any[])?.map(e => new JudgeDB(e))??[]
  }

  async searchAssignmentPage(form: PageSearchForm): Promise<SEntityCollection<Assignment>> {
    const data = (await this.cRequest('post', 'assignment', form)).data
    return SUtil.pageDataTransfer(data, Assignment)
  }

  async queryUserGrade(ID:number): Promise<Grade[]>{
    const data = (await this.cRequest('get', `user/${ID}/grade`)).data
    return (data as any[])?.map(e => new Grade(e))??[]
  }

  async queryAssignment(ID: number): Promise<Assignment> {
    const data = (await this.cRequest('get', `assignment/${ID}`)).data
    return new Assignment(data)
  }

  async searchProblemPage(form: PageSearchForm): Promise<SEntityCollection<Problem>> {
    let data = (await this.cRequest('post', 'problem', form)).data
    return SUtil.pageDataTransfer(data, Problem)
  }

  async searchRecordPage(form: PageSearchForm): Promise<SEntityCollection<Record>> {
    let data = (await this.cRequest('post', 'record', form)).data
    return SUtil.pageDataTransfer(data, Record)
  }

  async queryRecord(ID: number): Promise<Record> {
    let data = (await this.cRequest('get', `record/${ID}`)).data
    return new Record(data)
  }

  async queryProblem(ID: number): Promise<Problem> {
    let data = (await this.cRequest('get', `problem/${ID}`)).data
    return new Problem(data)
  }

  async queryProblemStatSet(ID: number): Promise<ProblemStatSet> {
    let data = (await this.cRequest('get', `problem/${ID}/statistics`)).data
    return new ProblemStatSet(data)
  }

  async queryUserStatSet(ID:number):Promise<ProblemStatSet>{
    let data = (await this.cRequest('get', `user/${ID}/statistics`)).data
    return new ProblemStatSet(data)
  }

  async queryUser(ID: number): Promise<User> {
    let data = (await this.cRequest('get', `user/${ID}`)).data
    return new User(data)
  }

  async submitCode(ID: number, form: CodeForm): Promise<boolean> {
    let data = (await this.request('post', `problem/${ID}/submit`, form))
    return data as unknown as boolean
  }

  async queryCode(ID: number): Promise<Code> {
    let data = (await this.cRequest('get', `code/${ID}`)).data
    return new Code(data)
  }

  async logOut(): Promise<any> {
    return (await this.cRequest('post', 'logout')).msg
  }

  async searchAnnouncementPage(form: PageSearchForm) {
    const data = (await this.cRequest('post', 'announcement', form)).data
    return SUtil.pageDataTransfer(data, Announcement)
  }

  getHomeStatisticsData() {
    return this.cRequest('get', '', null)
  }

  getContestEntry() {
    return this.cRequest('get', '', null)
  }

  static getInstance(): API {
    return this._instance
  }
}

export declare interface API {
  $vue: Vue
}
