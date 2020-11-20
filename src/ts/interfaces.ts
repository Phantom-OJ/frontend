import {Problem} from "@/ts/entries";

export class APIException {
  code: number
  description: string

  constructor(code: number, description: string) {
    this.code = code
    this.description = description
  }

  get info(): string {
    return `Error code: ${this.code}\n${this.description}`
  }
}

export class PageSearchFrom {
  start: number
  end: number
  filter?: Map<string, string>

  constructor({start, end, filter}: { start: number, end: number, filter?: Map<string, string> }) {
    this.start = start;
    this.end = end;
    this.filter = filter;
  }
}

export class User {
  ID: number
  name: string
  group: string
  avatar: string
  role: string

  constructor({id, name, group, avatar, role}: { id: number, name: string, group: string, avatar: string, role: string }) {
    this.ID = id;
    this.name = name;
    this.group = group;
    this.avatar = avatar;
    this.role = role;
  }
}

export class LoginForm {
  username: string
  password: string
  timestamp: number

  constructor({username, password, timestamp}: { username: string, password: string, timestamp: number }) {
    this.username = username;
    this.password = password;
    this.timestamp = timestamp;
  }
}

export class SignUpForm {
  username: string
  password: string
  nickname: string
  verifyCode: string

  constructor({username, password, nickname, verifyCode}: { username: string, password: string, nickname: string, verifyCode: string }) {
    this.username = username;
    this.password = password;
    this.nickname = nickname;
    this.verifyCode = verifyCode;
  }
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
  private _pageIndex = 1
  private _maxLength = 0
  private _search = true
  private _filter: Map<string, string> = new Map<string, string>()
  private _list = new Array<T>()
  private _map = new Map<number, T>()

  get selectedID(): number {
    return this._selectedID;
  }

  get pageIndex(): number {
    return this._pageIndex;
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

  pageOf(index: number, num: number): { full: boolean, list: Array<T> } {
    let result = this._list.slice((index - 1) * num, index * num)
    return {full: result.length === num || index * num >= this._maxLength, list: result}
  }

  addAll(list: Array<T>, offset: number = 0): void {
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

  add(entry: T): void {
    this._map.set(entry.ID, entry)
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
    for (let i = start; i < this._list.length && i <= end; i++) {
      if (this._list[i] !== void 0) {
        return true
      }
    }
    return false
  }

  clear() {
    this._list = new Array<T>()
  }

  get filter(): Map<string, string> {
    return this._filter;
  }

  set filter(value: Map<string, string>) {
    this._search = true
    this._filter = value;
  }

  toJSON(): object {
    return {
      selectedID: this.selectedID,
      pageIndex: this.pageIndex,
      filter: this.filter
    }
  }
}

export class ProblemInfoContainer extends InfoContainer<Problem> {
  private _code = 'asdfghj'
  private _lang = 'pgsql'

  selectEntry(ID: number) {
    if (ID !== super.selectedID) {
      super.selectEntry(ID);
      this.code = ''
    }
  }

  get selectedID(): number {
    return super.selectedID
  }

  get lang(): string {
    return this._lang
  }

  set lang(v: string) {
    this._lang = v
  }

  get code(): string {
    return this._code;
  }

  set code(value: string) {
    this._code = value;
  }

  toJSON(): object {
    return {
      selectedID: this.selectedID,
      pageIndex: this.pageIndex,
      filter: this.filter,
      code: this.code
    }
  }
}

export class Alert {
  type: string
  info: string
  time: number
  show: boolean = true
  exist: boolean = true

  constructor({type, info, time}: { type: string, info: string, time?: number }) {
    this.type = type
    this.info = info
    this.time = time ?? 5000
  }
}

export interface Tag {
  tag: string
}
