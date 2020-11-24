import {Announcement, Assignment, Problem, Record, RecordPoint} from "@/ts/entries";

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

export interface Entry {
  ID: number
  title: string
  description: string | RecordPoint[]
}

export interface Filter {
  id?: string
  name?: string
  tags?: string
  assignment?: string
  problem?: string
  user?: string
}

export interface InfoOptions<T> {
  pageIndex?: number
  list?: T[]
  detailAssignment?: Assignment
  detailProblem?: Problem
  detailRecord?: Record
  detailAnnouncement?: Announcement
  max?: number
  filter?: Filter
}

