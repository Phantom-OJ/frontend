import {Entity} from "@/ts/interfaces"
import {API} from "@/ts/api";
import {AnnouncementForm} from "@/ts/forms";
import {Group} from "@/ts/user";

export class Announcement implements Entity {
  ID: number
  description: string
  title: string
  createDate: Date
  lastModified: Date
  show: boolean = false

  //@ts-ignore
  constructor({id, description, title, createDate, lastModified}) {
    this.ID = id
    this.description = description ?? ''
    this.title = title
    this.createDate = new Date(createDate)
    this.lastModified = new Date(lastModified)
  }

  static copy(a: Announcement) {
    return new Announcement({
      id: a.ID,
      description: a.description?.toString(),
      title: a.title.toString(),
      createDate: new Date(a.createDate.getTime()),
      lastModified: new Date(a.lastModified.getTime())
    })
  }

  toForm(): AnnouncementForm {
    return {
      createDate: Date.now(),
      description: this.description,
      title: this.title
    }
  }
}


export class Problem implements Entity {
  ID: number
  description: string
  title: string
  assignmentId: number
  fullScore: number
  spaceLimit: number
  timeLimit: number
  numberSubmit: number
  numberSolve: number
  solution?: string
  recentCode?: string
  tagList: Array<Tag>
  indexInAssignment: number
  solved: SolveState

  constructor({id, description, title, indexInAssignment, assignmentId, fullScore, recentCode, spaceLimit, timeLimit, tagList, numberSubmit, numberSolve, solution, solved}: any) {
    this.ID = id
    this.description = description ?? ''
    this.title = title
    this.indexInAssignment = indexInAssignment
    this.recentCode = recentCode
    this.assignmentId = assignmentId
    this.fullScore = fullScore
    this.spaceLimit = spaceLimit
    this.timeLimit = timeLimit
    this.numberSubmit = numberSubmit
    this.numberSolve = numberSolve
    this.solution = solution
    this.tagList = (tagList as Array<any>)?.map(e => new Tag(e)) ?? []
    this.solved = solved ?? SolveState.NO_SUBMIT
  }
}

export class Assignment implements Entity {
  ID: number
  description: string
  title: string
  startTime: Date
  endTime: Date
  status: string
  fullScore: number
  problemList?: Array<Problem>
  groupList: Group[]

  constructor({id, description, title, startTime, endTime, status, fullScore, problemList, groupList}: any) {
    this.ID = id
    this.description = description ?? ''
    this.title = title
    this.fullScore = fullScore
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.status = status
    this.problemList = (<Array<any>>problemList)?.map(value => new Problem(value)) ?? []
    this.groupList = (groupList as any[])?.map(e => new Group(e)) ?? []
  }
}

export class Record implements Entity {
  ID: number
  description: RecordPoint[]
  avatar: string
  username: string
  userID: number
  codeID: number
  code?: string
  score: number
  problemID: number
  problemTitle: string
  result: string
  space: number
  time: number
  dialect: string
  codeLength: number
  submitTime: Date

  constructor({id, description, avatar, username, userId, codeId, code, score, problemId, problemTitle, result, space, time, dialect, codeLength, submitTime}: any) {
    this.ID = id
    this.description = (<RecordPoint[]>description)?.map(e => new RecordPoint(e))
    this.avatar = avatar
    this.username = username
    this.userID = userId
    this.codeID = codeId
    this.code = code
    this.score = score
    this.problemID = problemId
    this.problemTitle = problemTitle
    this.result = (<string>result)?.toUpperCase().trim()
    this.space = space
    this.time = time
    this.dialect = dialect
    this.codeLength = codeLength
    this.submitTime = new Date(submitTime)
  }

  get title() {
    return this.result
  }

  set title(v) {
    this.result = v
  }

  async queryCode() {
    return await API.getInstance().queryCode(this.codeID)
  }
}

export class RecordPoint {
  result: string
  description: string
  time: number
  space: number
  judgePointIndex: number

  constructor({result, description, time, space, judgePointIndex}: any) {
    this.result = (<string>result)?.toUpperCase().trim();
    this.description = description;
    this.time = time;
    this.space = space;
    this.judgePointIndex = judgePointIndex;
  }
}

export class Code {
  ID: number
  code: string
  codeLength: number
  submitTime: Date


  constructor({id, code, codeLength, submitTime}: any) {
    this.ID = id
    this.code = code
    this.codeLength = codeLength
    this.submitTime = new Date(submitTime)
  }
}

export class Alert {
  private static cnt = 0
  type: string
  info: string
  time: number
  show: boolean = true
  exist: boolean = true
  serialID: number = Alert.cnt++

  constructor({type, info, time}: { type: string, info: string, time?: number }) {
    this.type = type
    this.info = info
    this.time = time ?? 5000
  }
}

export class Tag {
  ID: number
  keyword: string
  description: string

  constructor({id, keyword, description}: any) {
    this.ID = id
    this.keyword = keyword
    this.description = description
  }
}

export class ProblemStatSet {
  resultSet: ProblemStat[]
  dialectSet: ProblemStat[]

  constructor({resultSet, dialectSet}: any) {
    this.resultSet = (<any[]>resultSet)?.map(e => new ProblemStat(e)) ?? []
    this.dialectSet = (<any[]>dialectSet)?.map(e => new ProblemStat(e)) ?? []
  }
}

export class Grade {
  id: number
  score: number
  fullScore: number
  title: string


  constructor({id, score, fullScore, title}: any) {
    this.id = id;
    this.score = score ?? 0;
    this.fullScore = fullScore ?? 0;
    this.title = title ?? '';
  }
}

export class ProblemStat {
  key: string
  count: number

  constructor({key, count}: any) {
    this.key = key
    this.count = count
  }
}

export class JudgeScript {
  ID: number
  keyword: string
  script: string

  constructor({id, keyword, script}: any) {
    this.ID = id;
    this.keyword = keyword;
    this.script = script;
  }
}

export class JudgeDB {
  ID: number
  keyword: string
  databaseUrl: string
  dialect: string

  constructor({id, keyword, databaseUrl, dialect}: any) {
    this.ID = id;
    this.keyword = keyword;
    this.databaseUrl = databaseUrl;
    this.dialect = dialect;
  }
}

export class AssignmentStat {
  ac: number
  noSubmission: number
  problemId: number
  problemTitle: string
  total: number
  wa: number


  constructor({ac, noSubmission, problemId, problemTitle, total, wa}: any) {
    this.ac = ac;
    this.noSubmission = noSubmission;
    this.problemId = problemId;
    this.problemTitle = problemTitle;
    this.total = total;
    this.wa = wa;
  }
}

export enum VCodeMode {REGISTER, RESET_PASSWORD}

export enum SolveState {WA, AC, NO_SUBMIT}

export enum JudgeState {COMPLETE, JUDGING, ERROR}

export class PollingResponse {
  state: JudgeState
  recordId: number
  description: string


  constructor({messageId, recordId, description}: any) {
    this.state = messageId;
    this.recordId = recordId;
    this.description = description;
  }

  get isComplete(){
    return this.state === JudgeState.COMPLETE
  }

  get hasError(){
    return this.state === JudgeState.ERROR
  }
}
