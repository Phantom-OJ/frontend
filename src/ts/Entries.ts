import {Entry, Tag} from "@/ts/DataDef"

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

export class Contest implements Entry {
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
  ID: number;
  description: string | undefined;
  title: string;

  //@ts-ignore
  constructor({ID, description, title}) {
    this.ID = ID;
    this.description = description;
    this.title = title;
  }
}
