import axios from 'axios'
import {Alert, APIException, LoginForm, PageSearchFrom, SignOutForm, SignUpForm, User} from "@/ts/interfaces";
import {Assignment, Problem} from "@/ts/entries";

axios.defaults.withCredentials = true

export class API{

  /**
   * request without catch block, it will throw APIException when get code in ERR_CODE
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
        time:10000
      }))
    }
  }

  async login(loginForm: LoginForm): Promise<User> {
    return await this.request('post', 'login', loginForm)
  }

  async signUp(form: SignUpForm): Promise<User> {
    return await this.request('post', 'signup', form)
  }

  async searchAssignmentPage(form: PageSearchFrom): Promise<Array<Assignment>> {
    let data: Array<any> = await this.request('post', 'assignment', form)
    return data.map(e => new Assignment(e))
  }

  async getAssignment(ID: number): Promise<Assignment> {
    let data = await this.request('get', `assignment/${ID}`)
    return new Assignment(data)
  }

  async searchProblemPage(form: PageSearchFrom):Promise<Array<Problem>>{
    let data: Array<any> = await this.request('post','problem',form)
    return data.map(e => new Problem(e))
  }

  async getProblem(ID:number):Promise<Problem>{
    let data = await this.request('get',`problem/${ID}`)
    return new Problem(data)
  }

  signOut(signOutFrom: SignOutForm): Promise<any> {
    return this.request('post', '', signOutFrom)
  }

  getAnnouncement() {
    return this.request('get', '', null)
  }

  getHomeStatisticsData() {
    return this.request('get', '', null)
  }

  getContestEntry() {
    return this.request('get', '', null)
  }
}
