import {Filter} from "@/ts/interfaces";

export interface LoginForm {
  username: string
  password: string

  // timestamp: number
}

export interface SignUpForm {
  username: string
  password: string
  nickname: string
  verifyCode: string
}

export interface ResetForm {
  username: string
  password: string
  vCode: string
}

export interface PageSearchForm {
  start: number
  end: number
  filter?: Filter
}

export interface AssignmentForm {
  id:number
  title: string
  description: string
  startTime: number
  endTime: number
  status: string
  fullScore: number
  uploadProblemFormList: ProblemForm[]
  groupList: number[]
}

export interface ProblemForm {
  id:number
  title: string
  description: string
  status: string
  spaceLimit: number
  timeLimit: number
  fullScore: number
  solution: string
  indexInAssignment: number
  tagList: number[]
  judgePointList:JudgePointForm[]
  type: string
}

export interface JudgePointForm{
  id:number
  dialect:string
  beforeSql:string
  afterSql:string
  judgeScriptId:number
  answer:string
  judgeDatabaseId:number
}

export interface ModifyUserForm{
  lang:string
  stateSave:boolean
  nickname:string
}

export interface ModifyPasswordForm{
  newPassword:string
  oldPassword:string
}

export interface DBForm{
  id:number
  keyword:string
  databaseUrl:string
  dialect:string
}

export interface AnnouncementForm{
  createDate:number
  description:string
  title:string
}

export interface ScriptForm{
  id:number
  keyword:string
  script:string
}

export class SearchUserForm{
  username:string=''
  group:number=0
  notGroup:number=0
  role:string=''
  notRole:string=''
}

export const STATUS = Object.freeze({
  PUBLIC: 'public',
  PRIVATE: 'private',
  CLOSED: 'closed',
  values() {
    return Object.freeze(['public', 'private', 'closed'])
  }
})

export const TYPE = Object.freeze({
  SELECT: 'SELECT',
  TRIGGER: 'TRIGGER',
  values() {
    return Object.freeze(['SELECT', 'TRIGGER'])
  }
})
