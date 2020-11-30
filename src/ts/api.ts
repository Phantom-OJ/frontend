import Axios from 'axios'
import {SResponse, SEntityCollection, User, CodeForm} from "@/ts/interfaces";
import {
  Alert,
  Announcement,
  Assignment,
  Code,
  Problem,
  ProblemStat,
  ProblemStatSet,
  Record,
  VCodeMode
} from "@/ts/entities";
import {APIException} from "@/ts/exceptions";
import {LoginForm, PageSearchFrom, ResetForm, SignOutForm, SignUpForm} from "@/ts/forms";
import {SUtil} from "@/ts/utils";

Axios.defaults.withCredentials = true
Axios.defaults.timeout = 10000

/**
 * $alert and $dialog will be injected into the instance at runtime
 * class is singleton pattern
 */
export class API{
  private static readonly _instance:API = new API()

  private constructor() {
  }

  /**
   * request without catch block, it will throw APIException when GET code in ERR_CODE
   * @param method 'GET', 'POST', etc..
   * @param url 'assignment' will become '/aip/assignment'
   * @param data
   */
  async request(method: string, url: string, data?: any): Promise<SResponse> {
    try {
      // @ts-ignore
      return (await Axios[method](`/api/${url}`, data)).data
    }catch (e) {
      throw new APIException(e.response)
    }
  }

  /**
   * request with catch block, which will call $alert
   * @param method 'GET', 'POST', etc..
   * @param url 'assignment' will become '/aip/assignment'
   * @param data
   */
  async cRequest(method:string, url:string, data?:any):Promise<SResponse>{
    try{
      return await this.request(method, url, data)
    }catch (error) {
      //$alert is injected in App.vue
      this.$alert(new Alert({
        type:'error',
        info:error.info??error.toString(),
        time:8000
      }))
      return {
        data: undefined,
        msg: ''
      }
    }
  }

  async login(loginForm: LoginForm): Promise<User> {
    return (await this.request('post', 'login', loginForm)).data
  }

  async signUp(form: SignUpForm): Promise<User> {
    return (await this.request('post', 'signup', form)).data
  }

  async resetPassword(form: ResetForm):Promise<any>{
    return (await this.request('post', 'rstpwd', form)).msg
  }

  async sendVCode({username, mode}:{username:string, mode:VCodeMode}): Promise<string>{
    return (await this.cRequest('post',`sendvcode`,{
      username, mode
    })).msg
  }

  async searchAssignmentPage(form: PageSearchFrom): Promise<SEntityCollection<Assignment>> {
    const data = (await this.cRequest('post', 'assignment', form)).data
    return SUtil.pageDataTransfer(data, Assignment)
  }

  async queryAssignment(ID: number): Promise<Assignment> {
    const data = (await this.cRequest('get', `assignment/${ID}`)).data
    return new Assignment(data)
  }

  async searchProblemPage(form: PageSearchFrom):Promise<SEntityCollection<Problem>>{
    let data = (await this.cRequest('post','problem',form)).data
    return SUtil.pageDataTransfer(data, Problem)
  }

  async searchRecordPage(form: PageSearchFrom):Promise<SEntityCollection<Record>>{
    let data = (await this.cRequest('post', 'record', form)).data
    return SUtil.pageDataTransfer(data, Record)
  }

  async queryRecord(ID:number):Promise<Record>{
    let data = (await this.cRequest('get', `record/${ID}`)).data
    return new Record(data)
  }

  async queryProblem(ID:number):Promise<Problem>{
    let data = (await this.cRequest('get',`problem/${ID}`)).data
    return new Problem(data)
  }

  async queryProblemStatSet(ID:number):Promise<ProblemStatSet>{
    let data = (await this.cRequest('get',`problem/${ID}/statistics`)).data
    return new ProblemStatSet(data)
  }

  async submitCode(ID:number, form:CodeForm):Promise<boolean>{
    let data = (await this.request('post', `problem/${ID}/submit`, form))
    return data as unknown as boolean
  }

  async queryCode(ID:number):Promise<Code>{
    let data = (await this.cRequest('get',`code/${ID}`)).data
    return new Code(data)
  }

  async signOut(signOutFrom: SignOutForm): Promise<any> {
    return (await this.cRequest('post', '', signOutFrom)).msg
  }

  async searchAnnouncementPage(form: PageSearchFrom) {
    const data =  (await this.cRequest('post', 'announcement', form)).data
    return SUtil.pageDataTransfer(data, Announcement)
  }

  getHomeStatisticsData() {
    return this.cRequest('get', '', null)
  }

  getContestEntry() {
    return this.cRequest('get', '', null)
  }

  static getInstance():API{
    return this._instance
  }
}

export declare interface API {
  $alert(alert:Alert):void
}
