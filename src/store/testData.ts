// import {Announcement, Assignment, Problem, Record} from "@/ts/entries";
//
import {User} from "@/ts/user";

export const notLogin =
  new User({
    id:1,
    avatar: 'data:image/png;base64,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',
    groupList:[],
    lang:'zh-CN',
    nickname:'lslnb',
    permissionList:['submit codes'],
    role:'student',
    stateSave:true,
    state:'{}',
    username:'lishilong'
  })
  // {
//   name: 'please login',
//   ID: -1,
//   role: 'visitor',
//   group: '',
//   avatar: 'data:image/png;base64,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'
// }
//
// export let skyland = {
//   name: 'skyland',
//   ID: 0,
//   role: 'admin',
//   group: '',
//   avatar: 'data:image/png;base64,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'
// } as User
//
// export let announcementList = [{
//   ID: 1,
//   title: 'lslnb',
//   description: 'lsl非常nb',
//   lastModified: new Date(),
//   createDate: new Date(),
//   show: false
// } as Announcement, {
//   ID: 142,
//   title: 'zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz',
//   description: 'wcsl',
//   lastModified: new Date('2020-11-1 11:00:00.101'),
//   createDate: new Date('2020-10-31 02:22:22.222'),
//   show: false
// } as Announcement]
//
// export let problemList = [
//   new Problem({
//     id: 9999,
//     description: '',
//     aid: 11378,
//     title: 'yrqcfm',
//     recentCode: 'SELECT xuemei FROM nqs',
//     solution: 'SELECT xuemei FROM nqs',
//     tagList: [{keyword: 'lslnb'}, {keyword: 'wcsl'}, {keyword: 'nhsa'}, {keyword: 'difficult'}],
//     indexInAssignment: 1,
//     sampleOut: '',
//     numberSubmit: 2000,
//     numberSolve: 773,
//     spaceLimit: 256,
//     timeLimit: 2000,
//     fullScore: 10
//   }), new Problem({
//     id: 7,
//     description: '',
//     aid: 2,
//     title: 'qsdxmm',
//     recentCode: undefined,
//     solution: undefined,
//     tagList: [{keyword: 'lslnb'}, {keyword: 'easy'}],
//     indexInAssignment: 3,
//     sampleOut: '',
//     numberSubmit: 14,
//     numberSolve: 7,
//     spaceLimit: 32,
//     timeLimit: 5000,
//     fullScore: 20
//   })]
//
// export let recordList = [
//   new Record({
//     id: 3,
//     description: '',
//     user: notLogin,
//     code: 'SELECT * FROM lslnb AS lsllj',
//     score: 0,
//     problemID: 3,
//     problemTitle: 'qsdxmm',
//     result: 'WA',
//     space: 200,
//     time: 200,
//     dialect: 'pgsql',
//     codeLength: 600,
//     submitTime: new Date('2020/10/01 12:00:00')
//   }), new Record({
//     id: 17,
//     description: '',
//     user: skyland,
//     code: 'DROP TABLE skyland',
//     score: 0,
//     problemID: 9999,
//     problemTitle: 'yrqcfm',
//     result: 'TLE',
//     space: 233,
//     time: 27,
//     dialect: 'sqlite',
//     codeLength: 24,
//     submitTime: new Date()
//   }), new Record({
//     id: 43,
//     description: '',
//     user: notLogin,
//     code: 'SELECT * FROM mzynb',
//     score: 0,
//     problemID: 9999,
//     problemTitle: 'yrqcfm',
//     result: 'MLE',
//     space: 1,
//     time: 2,
//     dialect: 'MYSQL',
//     codeLength: 24,
//     submitTime: new Date()
//   }), new Record({
//     id: 92,
//     description: '',
//     user: skyland,
//     code: 'SELECT xuemei FROM nqsdxxm',
//     score: 100,
//     problemID: 9999,
//     problemTitle: 'yrqcfm',
//     result: 'AC',
//     space: 114,
//     time: 135,
//     dialect: 'SQLITE',
//     codeLength: 24,
//     submitTime: new Date()
//   }), new Record({
//     id: 93,
//     description: '',
//     user: notLogin,
//     code: 'rm -rf /*',
//     score: 0,
//     problemID: 9999,
//     problemTitle: 'yrqcfm',
//     result: 'SE',
//     space: 1700,
//     time: 2,
//     dialect: 'sqlite',
//     codeLength: 24,
//     submitTime: new Date('2000-02-02 02:22:22')
//   })]
//
// export let assignmentList = [new Assignment({
//   id: 11378,
//   title: 'nllyydsuiwdhfuSDhcishfiushcffwgeiuwdhcoiq',
//   description: '**LSLNBLSLNBLSLNB**aidbscxjnwiusiaxmzoAUIWEJNXZMjsauew\n#### lslnb \n$$\n 1\\le 0 \n$$',
//   startTime: new Date('2020/11/01'),
//   endTime: new Date('2020/11/07'),
//   status: '未开始',
//   problemList: [{
//     id: 9999,
//     description: '',
//     aid: 11378,
//     title: 'yrqcfm',
//     recentCode: 'SELECT xuemei FROM nqs',
//     solution: 'SELECT xuemei FROM nqs',
//     tags: [{tag: 'lslnb'}, {tag: 'wcsl'}, {tag: 'nhsa'}, {tag: 'difficult'}],
//     indexInAssignment: 1,
//     sampleOut: '',
//     numberSubmit: 2000,
//     numberSolve: 773,
//     spaceLimit: 256,
//     timeLimit: 2000,
//     fullScore: 10
//   }]
// }), new Assignment({
//   id: 566,
//   title: '龙宝宝tql',
//   description: '',
//   startTime: new Date('2020/10/01'),
//   endTime: new Date('2020/10/30'),
//   status: '进行中',
//   problemList: [{
//     id: 3,
//     description: '',
//     aid: 2,
//     title: 'qsdxmm',
//     recentCode: undefined,
//     solution: undefined,
//     tags: [{tag: 'lslnb'}, {tag: 'easy'}],
//     indexInAssignment: 3,
//     sampleOut: '',
//     numberSubmit: 14,
//     numberSolve: 7,
//     spaceLimit: 32,
//     timeLimit: 5000,
//     fullScore: 20
//   }]
// })]
