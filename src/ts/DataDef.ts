export interface User {
  ID: string
  name: string
  group: string
  avatar: string
  role: string
}

export interface LoginForm {
  username:string
  password:string
  timestamp:number
}

export interface SignOutForm {

}

interface Entry {
  ID:number
  title: string
  description: string
  isFull:boolean
}

export interface Problem extends Entry {

}

export interface Contest extends Entry{
  startTime: Date
  stopTime: Date
  status: string
}

export interface Announcement extends Entry{

}

export class Info<T extends Entry> {
  selectedID = -1
  pageIndex = 0
  list = new Array<T>()
  map = new Map<number,T>()

  constructor() {
  }

  pageOf(index: number, num: number) {
    return this.list.slice(index * num, (index + 1) * num)
  }

  addAll(list:Array<T>){
    for(let t of list){
      if(!this.map.has(t.ID)){
        this.map.set(t.ID, t)
        this.list.push(t)
      }
    }
  }

  selectEntry(ID:number){
    this.selectedID = ID
  }

  selectPage(index:number){
    this.pageIndex = index
  }

}
