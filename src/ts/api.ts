import axios from 'axios'
import {SResponse, SEntityCollection, User} from "@/ts/interfaces";
import {Alert, Announcement, Assignment, Code, Problem, Record} from "@/ts/entities";
import {APIException} from "@/ts/exceptions";
import {LoginForm, PageSearchFrom, SignOutForm, SignUpForm} from "@/ts/forms";
import {SUtil} from "@/ts/utils";

axios.defaults.withCredentials = true

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
      return (await axios[method](`/api/${url}`, data)).data
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
      //@ts-ignore
      return false
    }
  }

  async login(loginForm: LoginForm): Promise<User> {
    return (await this.request('post', 'login', loginForm)).data
  }

  async signUp(form: SignUpForm): Promise<User> {
    return (await this.request('post', 'signup', form)).data
  }

  async sendVCode(username:string): Promise<string>{
    return (await this.cRequest('post',`sendvcode/${username}`)).msg
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
