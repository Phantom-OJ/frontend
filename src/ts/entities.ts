import {Entity} from "@/ts/interfaces"
import {API} from "@/ts/api";

export class Announcement implements Entity {
  ID: number
  description: string
  title: string
  createDate: Date
  lastModified: Date
  show: boolean = false

  //@ts-ignore
  constructor({ancmId, description, title, createDate, lastModified}) {
    this.ID = ancmId
    this.description = description??''
    this.title = title
    this.createDate = new Date(createDate)
    this.lastModified = new Date(lastModified)
  }

  static copy(a: Announcement) {
    return new Announcement({
      ancmId: a.ID.toString(),
      description: a.description?.toString(),
      title: a.title.toString(),
      createDate: new Date(a.createDate.getTime()),
      lastModified: new Date(a.lastModified.getTime())
    })
  }
}


export class Problem implements Entity {
  ID: number
  description: string
  title: string
  aid: number
  fullScore: number
  spaceLimit: number
  timeLimit: number
  numberSubmit: number
  numberSolve: number
  solution?: string
  recentCode?: string
  tags: Array<Tag>
  indexInAssignment: number
  sampleOut: string

  constructor({id, description, title, indexInAssignment, sampleOut, aid, fullScore, recentCode, spaceLimit, timeLimit, tagList, numberSubmit, numberSolve, solution}: any) {
    this.ID = id
    this.description = description??''
    this.title = title
    this.indexInAssignment = indexInAssignment
    this.recentCode = recentCode
    this.sampleOut = sampleOut
    this.aid = aid
    this.fullScore = fullScore
    this.spaceLimit = spaceLimit
    this.timeLimit = timeLimit
    this.numberSubmit = numberSubmit
    this.numberSolve = numberSolve
    this.solution = solution
    this.tags = (tagList as Array<any>)?.map(e => new Tag(e))??[]
  }
}

export class Assignment implements Entity {
  ID: number
  description: string
  title: string
  startTime: Date
  endTime: Date
  status: string
  problemList?: Array<Problem>

  constructor({id, description, title, startTime, endTime, status, problemList}: any) {
    this.ID = id
    this.description = description??''
    this.title = title
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.status = status
    this.problemList = (<Array<any>>problemList)?.map(value => new Problem(value))??[]
  }
}

export class Record implements Entity {
  ID: number
  description: RecordPoint[]
  avatar: string
  username: string
  userID:number
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
  result:string
  description:string
  time:number
  space:number
  judgePointIndex:number

  constructor({result, description, time, space, judgePointIndex}:any) {
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
  exist:boolean = true
  serialID:number = Alert.cnt++

  constructor({type, info, time}: { type: string, info: string, time?: number }) {
    this.type = type
    this.info = info
    this.time = time ?? 5000
  }
}

export class Tag {
  tag: string
  description: string

  constructor({keyword, description}: any) {
    this.tag = keyword
    this.description = description
  }
}

export class ProblemStatSet {
  resultSet:ProblemStat[]
  dialectSet:ProblemStat[]

  constructor({resultSet, dialectSet}:any) {
    this.resultSet = (<any[]>resultSet)?.map(e => new ProblemStat(e))??[]
    this.dialectSet = (<any[]>dialectSet)?.map(e => new ProblemStat(e))??[]
  }


}

export class ProblemStat{
  key:string
  count:number

  constructor({key, count}:any) {
    this.key = key
    this.count = count
  }
}

export class JudgeScript{

}

export class JudgeDB{

}

export enum VCodeMode {REGISTER, RESET_PASSWORD}

