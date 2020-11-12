import axios from 'axios'
import {APIException, LoginForm, SignOutForm, SignUpForm, User} from "@/ts/dataDef";

axios.defaults.withCredentials = true

const ERR_CODE = new Set([404, 500])//TODO

// @ts-ignore
export default {
  async requestWithCatch(method: string, url: string, data: any, catcher: Function): Promise<any> {
    try {
      // @ts-ignore
      let re = await axios[method](url, data)
      if (!ERR_CODE.has(re.status))
        return re.data
      else
        throw new APIException(re.status, re.data)
    } catch (e) {
      catcher(e)
    }
  },

  async requestWithOutCatch(method: string, url: string, data: any):Promise<any>{
    // @ts-ignore
    let re = await axios[method](url, data)
    if (!ERR_CODE.has(re.status))
      return re.data
    else
      throw new APIException(re.status, re.data)
  },

  async login(loginForm: LoginForm): Promise<User> {
    return await this.requestWithOutCatch('post','',loginForm)
  },

  async signUp(form: SignUpForm):Promise<User>{
    return await this.requestWithOutCatch('post','/api/user/signup',form)
  },

  signOut(signOutFrom: SignOutForm): Promise<any> {
    return this.requestWithCatch('post', '', signOutFrom, (e: any) => window.alert(e))
  },

  getAnnouncement() {
    return this.requestWithCatch('get', '', null, (e: any) => console.log(e))
  },

  getHomeStatisticsData() {
    return this.requestWithCatch('get', '', null, (e: any) => console.log(e))
  },

  getProblems(searchProblemFrom:any) {
    return this.requestWithCatch('get', '', searchProblemFrom, (e: any) => window.alert(e))
  },

  getContestEntry() {
    return this.requestWithCatch('get', '', null, (e: any) => window.alert(e))
  }
}
