import {Entry, Tag, User} from "@/ts/interfaces"

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

  constructor({id, description, title, tags, indexInAssignment, sampleOut, aid, fullScore, recentCode, spaceLimit, timeLimit, numberSubmit, numberSolve, solution}:any) {
    this.ID = id
    this.description = description
    this.title = title
    this.tags = tags
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

  constructor({id, description, title, startTime, endTime, status, problemList}:any) {
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
  user: User
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

  constructor({id, description, user, code, score, problemId, problemTitle, result, space, time, dialect, codeLength, submitTime}:any) {
    this.ID = id
    this.description = description
    this.user = user
    this.code = code
    this.score = score
    this.problemId = problemId
    this.problemTitle = problemTitle
    this.result = result
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
}