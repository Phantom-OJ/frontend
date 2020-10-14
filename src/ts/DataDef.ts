export interface User {
  ID: string
  group: string
  avatar: string
}

export interface LoginForm {

}

export interface SignOutForm {

}

export interface Problem {
  title: string
  description: string

}

export interface Contest {

}

export class Info<T> {
  selectedIndex = -1
  pageIndex = 0
  list: Array<T> = []
  map: Map<number, T> = new Map()

  page(index: number, num: number) {
    return this.list.slice(index * num, (index + 1) * num)
  }

}
