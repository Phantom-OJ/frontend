import {Announcement, Assignment, Code, Problem, Record, RecordPoint} from "@/ts/entities";

export interface Entity {
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
  code?: {
    code: Code,
    id: number
  }
}

/**
 * all data received from backend
 */
export interface SResponse {
  msg: string
  data: any
}

/**
 * data received from backend
 */
export interface EntityCollection {
  entities: any[]
  count: number
}

/**
 * data transferred from EntityCollection
 */
export interface SEntityCollection<T extends Entity> {
  entities: T[]
  count: number
}

export interface CodeForm {
  code: string
  dialect: string
  submitTime: number
}

export interface LabelDataList {
  labels:string[]
  data:number[]
}
