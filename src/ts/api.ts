import axios from 'axios'
import {LoginForm, SignOutForm, User} from "@/ts/DataDef";

axios.defaults.withCredentials = true

const ERR_CODE = new Set([404, 500])//TODO

export default {
  async requestWithCatch(method: string, url: string, data: any, catcher: Function) {
    try {
      // @ts-ignore
      let re = await axios[method](url, data)
      if (!ERR_CODE.has(re.status))
        return re.data
      else
        throw `Error: error code:${re.status}`
    } catch (e) {
      catcher(e)
    }
  },

  login(loginForm: LoginForm): Promise<User> {
    return this.requestWithCatch('post', '', loginForm, (e: any) => window.alert(e))
  },

  signOut(signOutFrom: SignOutForm): Promise<any> {
    return this.requestWithCatch('post', '', signOutFrom, (e: any) => window.alert(e))
  },

  getAnnouncement() {
    return this.requestWithCatch('get','',null,(e:any)=>console.log(e))
  },

  getHomeStatisticsData(){
    return this.requestWithCatch('get','',null,(e:any)=>console.log(e))
  }
}
