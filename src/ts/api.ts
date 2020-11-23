import axios from 'axios'
import {Alert, APIException, LoginForm, PageSearchFrom, SignOutForm, SignUpForm, User} from "@/ts/interfaces";
import {Assignment, Code, Problem, Record} from "@/ts/entries";

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
  async request(method: string, url: string, data?: any): Promise<any> {
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
  async cRequest(method:string, url:string, data?:any):Promise<any>{
    try{
      return await this.request(method, url, data)
    }catch (error) {
      //@ts-ignore $alert is injected in App.vue
      this.$alert(new Alert({
        type:'error',
        info:error.info??error.toString(),
        time:8000
      }))
    }
  }

  async login(loginForm: LoginForm): Promise<User> {
    return (await this.request('post', 'login', loginForm)).msg
  }

  async signUp(form: SignUpForm): Promise<User> {
    return (await this.request('post', 'signup', form)).msg
  }

  async searchAssignmentPage(form: PageSearchFrom): Promise<Array<Assignment>> {
    let data: Array<any> = await this.cRequest('post', 'assignment', form)
    return data.map(e => new Assignment(e))
  }

  async queryAssignment(ID: number): Promise<Assignment> {
    let data = await this.cRequest('get', `assignment/${ID}`)
    return new Assignment(data)
  }

  async searchProblemPage(form: PageSearchFrom):Promise<Array<Problem>>{
    let data: Array<any> = await this.cRequest('post','problem',form)
    return data.map(e => new Problem(e))
  }

  async searchRecordPage(form: PageSearchFrom):Promise<Array<Record>>{
    let data: Array<any> = await this.cRequest('post', 'record', form)
    return data.map(e => new Record(e))
  }

  async queryRecord(ID:number):Promise<Record>{
    let data = await this.cRequest('get', `record/${ID}`)
    return new Record(data)
  }

  async queryProblem(ID:number):Promise<Problem>{
    let data = await this.cRequest('get',`problem/${ID}`)
    return new Problem(data)
  }

  async queryCode(ID:number):Promise<Code>{
    let data = await this.cRequest('get',`code/${ID}`)
    return new Code(data)
  }

  signOut(signOutFrom: SignOutForm): Promise<any> {
    return this.cRequest('post', '', signOutFrom)
  }

  getAnnouncement() {
    return this.cRequest('get', '', null)
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
