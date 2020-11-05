import {Entry, Tag, User} from "@/ts/DataDef"

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

  static copy(a:Announcement) {
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
  tags: Array<Tag>
  indexInAssignment: number
  sampleOut: string

  //@ts-ignore
  constructor({ID, description, title, tags, indexInAssignment, sampleOut}) {
    this.ID = ID
    this.description = description
    this.title = title
    this.tags = tags
    this.indexInAssignment = indexInAssignment
    this.sampleOut = sampleOut
  }
}

export class Assignment implements Entry {
  ID: number
  description: string | undefined
  title: string
  startTime: Date
  stopTime: Date
  status: string


  //@ts-ignore
  constructor({ID, description, title, startTime, stopTime, status}) {
    this.ID = ID
    this.description = description
    this.title = title
    this.startTime = startTime
    this.stopTime = stopTime
    this.status = status
  }
}

export class Record implements Entry{
  ID: number
  description: string | undefined
  user: User
  pid: number
  result: string
  space: number
  time: number
  dialect: string
  codeLength: number
  submitTime: Date

  //@ts-ignore
  constructor({ID, description, user, pid, result, space, time, dialect, codeLength, submitTime}) {
    this.ID = ID
    this.description = description
    this.user = user
    this.pid = pid
    this.result = result
    this.space = space
    this.time = time
    this.dialect = dialect
    this.codeLength = codeLength
    this.submitTime = new Date(submitTime)
  }

  get title(){
    return this.result
  }

  set title(v){
    this.result = v
  }
}