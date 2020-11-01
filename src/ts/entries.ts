import {Entry} from "@/ts/DataDef"

export class Announcement implements Entry {
  ID: number
  description: string|undefined
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
}


export class Problem implements Entry {
  ID: number
  description: string|undefined
  title: string
  tags: Array<string>
  indexInAssignment: number
  //@ts-ignore
  constructor({ID, description, title, tags, indexInAssignment}) {
    this.ID = ID
    this.description = description
    this.title = title
    this.tags = tags
    this.indexInAssignment = indexInAssignment
  }
}

export class Contest implements Entry {
  ID: number
  description: string|undefined
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

