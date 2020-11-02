export class APIException {
  code: number
  description: string

  constructor(code: number, description: string) {
    this.code = code
    this.description = description
  }
}


export interface User {
  ID: string
  name: string
  // group: string
  avatar: string
  // role: string
}

export interface LoginForm {
  username: string
  password: string
  timestamp: number
}

export interface SignUpForm {
  username: string
  password: string
  nickname: string
}

export interface SignOutForm {

}

export interface Entry {
  ID: number
  title: string
  description: string|undefined
}

export class InfoContainer<T extends Entry> {
  selectedID = -1
  pageIndex = 0
  maxLength = 0
  filter:Map<string,string>|string
  list = new Array<T>()
  map = new Map<number, T>()

  constructor(filter:Map<string,string>|string) {
    this.filter = filter
  }

  pageOf(index: number, num: number): { full: boolean, list: Array<T> } {
    let result = this.list.slice(index * num, (index + 1) * num)
    return {full: result.length === num || (index + 1) * num >= this.maxLength, list: result}
  }

  addAll(list: Array<T>, offset: number = 0) {
    let index = this.list.length + offset
    for (let i = index; i < index + list.length; i++) {
      let t = list[i]
      if (!this.map.has(t.ID)) {
        this.map.set(t.ID, t)
      }
      this.list[i] = t
    }
  }

  rangeToLoad(index: number, num: number): { exist: boolean, start: number, end: number } {
    let start = (index - 1) * num + 1
    start = start < 1 ? 1 : start
    let end = (index + 2) * num + 1
    let exist = this.existOfRange(start, end)
    return {
      exist, start, end
    }
  }

  selectEntry(ID: number) {
    this.selectedID = ID
  }

  selectPage(index: number) {
    this.pageIndex = index
  }

  existOfRange(start: number, end: number): boolean {
    for (let i = start; i < this.list.length; i++) {
      if (this.list[i] !== void 0) {
        return true
      }
    }
    return false
  }

  clear(){
    this.list = new Array<T>()
  }

}

export class Alert {
  type:string
  info:string
  time:number
  show:boolean = true
  exist:boolean = true

  constructor(type: string, info: string, time:number=2000) {
    this.type = type
    this.info = info
    this.time = time
  }
}

export interface Tag {
  tag:string
}
