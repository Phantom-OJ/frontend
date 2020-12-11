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
    this.ID = id
    this.groupList = (<any[]>groupList)?.map(e => new Group(e)) ?? []
    this.avatar = avatar
    this.role = role
    this.lang = lang
    this.nickname = nickname
    this.permissionList = (<any[]>permissionList)?.map(e => new Permission(e)) ?? []
    this.stateSave = stateSave ?? false
    this.state = JSON.parse(state || '{}')
    this.username = username
  }

  hasPermission(p: string | Permission | symbol): boolean {
    if (p instanceof Permission) {
      return this.permissionList.includes(p)
    } else if (typeof p === 'string') {
      return !!this.permissionList.find(e => e.allowance === Permission.ALLOWANCE.forName(p))
    } else {
      return !!this.permissionList.find(e => e.allowance === p)
    }
  }
}


export class Permission {

  static ALLOWANCE = (function () {
    let allowances = new Map<string, symbol>([
      ['view all submissions', Symbol('view all submissions')],
      ['provide the solution', Symbol('provide the solution')],
      ['publish the announcement', Symbol('public the announcement')],
      ['view all groups', Symbol('view all groups')],
      ['view all assignments', Symbol('view all assignments')],
      ['view all codes', Symbol('view all codes')],
      ['create groups', Symbol('create groups')],
      ['create assignment', Symbol('create assignment')],
      ['modify assignment', Symbol('modify assignment')],
      ['view judge details', Symbol('view judge details')],
      ['grant other users', Symbol('grant other users')],
      ['view all permissions', Symbol('view all permissions')]
    ])
    const _ = function (v: string) {
      return allowances.get(v)
    }
    return Object.freeze({
      forName: _,
      values: allowances.values,
      VIEW_ALL_SUBMISSIONS: _('view all submissions')!,
      PROVIDE_THE_SOLUTION: _('provide the solution')!,
      PUBLISH_THE_ANNOUNCEMENT: _('publish the announcement')!,
      VIEW_ALL_GROUPS: _('view all groups')!,
      VIEW_ALL_ASSIGNMENTS: _('view all assignments')!,
      VIEW_ALL_CODES: _('view all codes')!,
      CREATE_GROUPS: _('create groups')!,
      CREATE_ASSIGNMENT: _('create assignment')!,
      MODIFY_ASSIGNMENT: _('modify assignment')!,
      VIEW_JUDGE_DETAILS: _('view judge details')!,
      GRANT_OTHER_USERS: _('grant other users')!,
      VIEW_ALL_PERMISSIONS: _('view all permissions')!
    })
  })() //尝试使用IIFE来做闭包，TS的ENUM支持不够好

  allowance: symbol
  id?: number
  role?: string

  constructor(e: string | { allowance: string, id: number, role: string }) {
    if (typeof e === 'string') {
      this.allowance = Permission.ALLOWANCE.forName(e?.trim() ?? '')!
    } else {
      this.allowance = Permission.ALLOWANCE.forName(e.allowance.trim())!
      this.id = e.id
      this.role = e.role
    }
  }
}

export class Group {
  ID: number
  description: string

  constructor({id, description}: any) {
    this.ID = id;
    this.description = description
  }

  toString(){
    return this.description
  }
}

interface SavedInfo {
  pageIndex: number
  filter: Filter
}

export interface State {
  time: string
  problemInfo: SavedInfo
  assignmentInfo: SavedInfo
  recordInfo: SavedInfo
  route: string
  state: any
}
