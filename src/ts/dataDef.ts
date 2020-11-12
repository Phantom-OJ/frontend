import {Problem} from "@/ts/entries";

export class APIException {
  code: number
  description: string

  constructor(code: number, description: string) {
    this.code = code
    this.description = description
  }
}


export interface User {
  ID: number
  name: string
  group: string
  avatar: string
  role: string
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
  description: string | undefined
}

export class InfoContainer<T extends Entry> {
  private _selectedID = -1
  private _pageIndex = 0
  private _maxLength = 0
  private _search = true
  private _filter: Map<string, string> | string
  private _list = new Array<T>()
  private _map = new Map<number, T>()

  get selectedID(): number {
    return this._selectedID;
  }

  set selectedID(value: number) {
    this._selectedID = value;
  }

  get pageIndex(): number {
    return this._pageIndex;
  }

  set pageIndex(value: number) {
    this._pageIndex = value;
  }

  get maxLength(): number {
    return this._maxLength;
  }

  set maxLength(value: number) {
    this._maxLength = value;
  }

  get search(): boolean {
    return this._search;
  }

  set search(value: boolean) {
    this._search = value;
  }

  get list(): T[] {
    return this._list;
  }

  set list(value: T[]) {
    this._list = value;
  }

  get map(): Map<number, T> {
    return this._map;
  }

  set map(value: Map<number, T>) {
    this._map = value;
  }


  constructor(filter: Map<string, string> | string) {
    this._filter = filter
  }

  pageOf(index: number, num: number): { full: boolean, list: Array<T> } {
    let result = this._list.slice(index * num, (index + 1) * num)
    return {full: result.length === num || (index + 1) * num >= this._maxLength, list: result}
  }

  addAll(list: Array<T>, offset: number = 0) {
    this._search = false
    let index = this._list.length + offset
    for (let i = index; i < index + list.length; i++) {
      let t = list[i]
      if (!this._map.has(t.ID)) {
        this._map.set(t.ID, t)
      }
      this._list[i] = t
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
    this._selectedID = ID
  }

  selectPage(index: number) {
    this._pageIndex = index
  }

  existOfRange(start: number, end: number): boolean {
    for (let i = start; i < this._list.length; i++) {
      if (this._list[i] !== void 0) {
        return true
      }
    }
    return false
  }

  clear() {
    this._list = new Array<T>()
  }

  get filter(): Map<string, string> | string {
    return this._filter;
  }

  set filter(value: Map<string, string> | string) {
    this._search = true
    this._filter = value;
  }

}

export class ProblemInfoContainer extends InfoContainer<Problem> {
  private _code = 'asdfghj'

  set selectedID(v: number) {
    if (v !== super.selectedID) {
      super.selectedID = v
      this.code = ''
    }
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }
}

export class Alert {
  type: string
  info: string
  time: number
  show: boolean = true
  exist: boolean = true

  constructor(type: string, info: string, time: number = 2000) {
    this.type = type
    this.info = info
    this.time = time
  }
}

export interface Tag {
  tag: string
}
