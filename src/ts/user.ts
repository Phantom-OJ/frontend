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

  hasPermission(p: string | Permission): boolean {
    if (p instanceof Permission) {
      return this.permissionList.includes(p)
    } else {
      return !!this.permissionList.find(e => e.allowance === p)
    }
  }
}


export class Permission {

  static ALLOWANCE = Object.freeze({
    forName: (s: string) => s,
    values: () => ['view all submissions', 'provide the solution', 'manage the announcement', 'view all groups', 'view all assignments', 'view all tags',
      'view all codes', 'create groups', 'create assignment', 'modify assignment', 'view judge details', 'grant other users', 'view all permissions',
      'rejudge', 'test code'],
    VIEW_ALL_SUBMISSIONS: 'view all submissions',
    PROVIDE_THE_SOLUTION: 'provide the solution',
    MANAGE_THE_ANNOUNCEMENT: 'manage the announcement',
    VIEW_ALL_GROUPS: 'view all groups',
    VIEW_ALL_ASSIGNMENTS: 'view all assignments',
    VIEW_ALL_CODES: 'view all codes',
    CREATE_GROUPS: 'create groups',
    CREATE_ASSIGNMENT: 'create assignment',
    MODIFY_ASSIGNMENT: 'modify assignment',
    VIEW_JUDGE_DETAILS: 'view judge details',
    GRANT_OTHER_USERS: 'grant other users',
    VIEW_ALL_PERMISSIONS: 'view all permissions',
    VIEW_ALL_TAGS:'view all tags',
    REJUDGE:'rejudge',
    TEST_CODE:'test code'
  })

  allowance: string
  id?: number
  role?: string

  constructor(e: string | { allowance: string, id: number, role: string }) {
    if (typeof e === 'string') {
      this.allowance = e?.trim() ?? ''
    } else {
      this.allowance = e.allowance.trim()
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

  toString() {
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
