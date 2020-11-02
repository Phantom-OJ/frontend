import {Announcement, Contest, Problem, Record} from "@/ts/Entries";

export let announcementList = [{
  ID: 1,
  title: 'lslnb',
  description: 'lsl非常nb',
  lastModified: new Date(),
  createDate: new Date(),
  show: false
} as Announcement, {
  ID: 142,
  title: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
  description: 'wcsl',
  lastModified: new Date('2020-11-1 11:00:00.101'),
  createDate: new Date('2020-10-31 02:22:22.222'),
  show: false
} as Announcement]

export let contestList = [{
  ID: 11378,
  title: '聂佬佬yydsuiwdhfuSDhcishfiushcffwgeiuwdhcoiq',
  description: '',
  startTime: new Date('2020/11/01'),
  stopTime: new Date('2020/11/07'),
  status: '未开始'
} as Contest, {
  ID: 2,
  title: '龙宝宝tql',
  description: '',
  startTime: new Date('2020/10/01'),
  stopTime: new Date('2020/10/30'),
  status: '进行中'
} as Contest]

export let problemList = [{
  ID: 2,
  description: '',
  title: 'yrqcfm',
  tags: [{tag:'lslnb'}, {tag:'wcsl'},{tag:'nhsa'},{tag:'difficult'}],
  indexInAssignment: 0,
  sampleOut: ''
} as Problem, {
  ID: 3,
  description: '',
  title: 'tksb',
  tags: [{tag:'lslnb'}, {tag:'easy'}],
  indexInAssignment: 3,
  sampleOut:''
} as Problem]

export let recordList = [{
  ID: 3,
  description:'',
  title:'AC'
}as Record,{
  ID:17,
  description:'',
  title:'WA'
}as Record]
