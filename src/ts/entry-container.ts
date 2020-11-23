import {Problem} from "@/ts/entries";
import {Entry, Filter} from "@/ts/interfaces";

export class EntryContainer<T extends Entry> {
  private _selectedID = -1
  private _pageIndex = 1
  private _maxLength = 0
  private _search = true
  private _list: T[] = []
  private _filter: Filter = {}
  private _mapTable: T[] = []

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


  selectEntry(ID: number) {
    this._selectedID = ID
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
      selectedID: this.selectedID,
      pageIndex: this.pageIndex,
      filter: this.filter
    }
  }

  get list(): T[] {
    return this._list
  }

  set list(list) {
    this._list = list
    this.addAll(list)
  }

  get search(): boolean {
    return this._search;
  }

  set search(value: boolean) {
    this._search = value;
  }
}

export class ProblemContainer extends EntryContainer<Problem> {
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

