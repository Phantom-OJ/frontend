import {Entity, Filter} from "@/ts/interfaces";

export class EntityContainer<T extends Entity> {
  private _pageIndex = 1
  private _maxLength = 0
  private _search = true
  private _list: T[] = []
  private _filter: Filter = {}
  private _mapTable: T[] = []

  get pageIndex(): number {
    return this._pageIndex;
  }

  get maxLength(): number {
    return this._maxLength;
  }

  set maxLength(value: number) {
    this._maxLength = value;
  }

  get mapTable(): T[] {
    return this._mapTable;
  }

  set mapTable(value: T[]) {
    this._mapTable = value;
  }

  addAll(list: Array<T>): void {
    list.forEach(e => this._mapTable[e.ID] = e)
  }

  add(entry: T): void {
    this._mapTable[entry.ID] = entry
  }

  get(ID: number): T | undefined {
    return this.mapTable[ID]
  }

  selectPage(index: number) {
    this._pageIndex = index
  }

  get filter() {
    return this._filter;
  }

  set filter(value: Filter) {
    this._search = true
    this._filter = value;
  }

  toJSON(): object {
    return {
      pageIndex: this.pageIndex,
      filter: this.filter
    }
  }

  get list(): T[] {
    return this._list
  }

  set list(list) {
    this._list = list
    this._search = false
    this.addAll(list)
  }

  get search(): boolean {
    return this._search;
  }

  set search(value: boolean) {
    this._search = value;
  }
}
