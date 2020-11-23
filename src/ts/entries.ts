import {Entry, Tag} from "@/ts/interfaces"
import {API} from "@/ts/api";

export class Announcement implements Entry {
  ID: number
  description: string | undefined
  title: string
  createDate: Date
  lastModified: Date
  show: boolean = false

  //@ts-ignore
  constructor({ancmId, description, title, createDate, lastModified}) {
    this.ID = ancmId
    this.description = description
    this.title = title
    this.createDate = createDate
    this.lastModified = lastModified
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


export class Problem implements Entry {
  ID: number
  description: string | undefined
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
    this.description = description
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
    this.tags = (tagList as Array<any>).map(e => new Tag(e))
  }
}

export class Assignment implements Entry {
  ID: number
  description: string | undefined
  title: string
  startTime: Date
  endTime: Date
  status: string
  problemList?: Array<Problem>

  constructor({id, description, title, startTime, endTime, status, problemList}: any) {
    this.ID = id
    this.description = description
    this.title = title
    this.startTime = new Date(startTime)
    this.endTime = new Date(endTime)
    this.status = status
    this.problemList = (<Array<any>>problemList)?.map(value => new Problem(value))
  }
}

export class Record implements Entry {
  ID: number
  description: string | undefined
  avatar: string
  username: string
  codeID: number
  code?: string
  score: number
  problemId: number
  problemTitle: string
  result: string
  space: number
  time: number
  dialect: string
  codeLength: number
  submitTime: Date

  constructor({id, description, avatar, username, codeId, code, score, problemId, problemTitle, result, space, time, dialect, codeLength, submitTime}: any) {
    this.ID = id
    this.description = description
    this.avatar = avatar
    this.username = username
    this.codeID = codeId
    this.code = code
    this.score = score
    this.problemId = problemId
    this.problemTitle = problemTitle
    this.result = (<string>result).toUpperCase().trim()
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
    let code = await API.getInstance().queryCode(this.codeID)
    this.code = code.code
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
