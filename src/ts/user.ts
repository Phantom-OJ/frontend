import {Filter} from "@/ts/interfaces";

export class User {
  ID: number
  avatar: string
  groupList: Group[]
  lang: string
  nickname: string
  permissionList: Permission[]
  role: string
  stateSave: boolean
  state: State
  username: string

  constructor({id, avatar, groupList, lang, nickname, permissionList, role, stateSave, state, username}: any) {
    console.log(state)
    this.ID = id
    this.groupList = (<any[]>groupList)?.map(e => new Group(e))??[]
    this.avatar = avatar
    this.role = role
    this.lang = lang
    this.nickname = nickname
    this.permissionList = (<any[]>permissionList)?.map(e => new Permission(e))??[]
    this.stateSave = stateSave??false
    this.state = JSON.parse(state||'{}')
    this.username = username
  }

  hasPermission(p: string | Permission | symbol):boolean {
    if(p instanceof Permission){
      return this.permissionList.includes(p)
    }else if(typeof p ==='string'){
      return !!this.permissionList.find(e => e.allowance === Permission.ALLOWANCE.forName(p))
    }else{
      return !!this.permissionList.find(e => e.allowance === p)
    }
  }
}


export class Permission {

  static ALLOWANCE = (function () {
    let allowances = new Map<string, symbol>([
      ['modify personal information', Symbol('Allowance: modify personal information')],
      ['check points', Symbol('Allowance: check points')],
      ['submit codes', Symbol('Allowance: submit codes')],
      ['review codes', Symbol('Allowance: review codes')],
      ['view results', Symbol('Allowance: view results')],
      ['view ranking', Symbol('Allowance: view ranking')],
      ['view all submissions', Symbol('Allowance: view all submissions')],
      ['provide the solution', Symbol('Allowance: provide the solution')],
      ['publish the announcement', Symbol('Allowance: public the announcement')],
      ['create assignment', Symbol('Allowance: create assignment')],
      ['create problem', Symbol('Allowance: create problem')],
      ['provide sample database', Symbol('Allowance: provide sample database')],
      ['provide description', Symbol('Allowance: provide description')],
      ['provide space and time limit', Symbol('Allowance: provide space and time limit')],
      ['provide sample output', Symbol('Allowance: provide sample output')],
      ['modify assignment', Symbol('Allowance: modify assignment')],
      ['modify problem', Symbol('Allowance: modify problem')],
      ['grant other users', Symbol('Allowance: grant other users')]
    ])
    const _ = function (v: string) {
      return allowances.get(v)
    }
    return Object.freeze({
      forName: _,
      values: allowances.values,
      MODIFY_PERSONAL_INFORMATION: _('modify personal information')!,
      CHECK_POINTS: _('check points')!,
      SUBMIT_CODES: _('submit codes')!,
      REVIEW_CODES: _('review codes')!,
      VIEW_RESULTS: _('view results')!,
      VIEW_RANKING: _('view ranking')!,
      VIEW_ALL_SUBMISSIONS: _('view all submissions')!,
      PROVIDE_THE_SOLUTION: _('provide the solution')!,
      PUBLISH_THE_ANNOUNCEMENT:_('publish the announcement')!,
      CREATE_ASSIGNMENT: _('create assignment')!,
      CREATE_PROBLEM: _('create problem')!,
      PROVIDE_SAMPLE_DATABASE: _('provide sample database')!,
      PROVIDE_DESCRIPTION: _('provide description')!,
      PROVIDE_SPACE_AND_TIME_LIMIT: _('provide space and time limit')!,
      PROVIDE_SAMPLE_OUTPUT: _('provide sample output')!,
      MODIFY_ASSIGNMENT: _('modify assignment')!,
      MODIFY_PROBLEM:_('modify problem'),
      GRANT_OTHER_USERS: _('grant other users')!
    })
  })() //尝试使用IIFE来做闭包，TS的ENUM支持不够好

  allowance: symbol

  constructor(str:string) {
    this.allowance = Permission.ALLOWANCE.forName(str?.trim()??'')!
  }
}

export class Group{
  ID:number
  description:string

  constructor({id, description}: any) {
    this.ID = id;
    this.description = description
  }
}

interface SavedInfo{
  pageIndex:number
  filter:Filter
}

export interface State{
  problemInfo:SavedInfo
  assignmentInfo:SavedInfo
  recordInfo:SavedInfo
  route:string
  state:any
}
