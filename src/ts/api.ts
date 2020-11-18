import axios from 'axios'
import {APIException, LoginForm, PageSearchFrom, SignOutForm, SignUpForm, User} from "@/ts/interfaces";
import {Assignment} from "@/ts/entries";

axios.defaults.withCredentials = true

const ERR_CODE = new Set([400, 403, 405, 404, 500])//TODO

export class API{

  async request(method: string, url: string, data?: any): Promise<any> {
    // @ts-ignore

    let re = await axios[method](`/api/${url}`, data)
    if (!ERR_CODE.has(re.status))
      return re.data
    else
      throw new APIException(re.status, re.data)
  }

  async login(loginForm: LoginForm): Promise<User> {
    return await this.request('post', '', loginForm)
  }

  async signUp(form: SignUpForm): Promise<User> {
    return await this.request('post', 'user/signup', form)
  }

  async searchAssignmentPage(form: PageSearchFrom): Promise<Array<Assignment>> {
    let data: Array<any> = await this.request('post', 'assignment', form)
    return data.map(e => new Assignment(e))
  }

  async getAssignment(ID: number): Promise<Assignment> {
    let data = await this.request('get', `assignment/${ID}`)
    return new Assignment(data)
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

  getProblems(searchProblemFrom: any) {
    return this.request('get', '', searchProblemFrom)
  }

  getContestEntry() {
    return this.request('get', '', null)
  }
}
