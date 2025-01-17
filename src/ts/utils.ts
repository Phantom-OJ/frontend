import {Entity, EntityCollection, LabelDataList, SEntityCollection} from "@/ts/interfaces";
import {APIException} from "@/ts/exceptions";
import {Vue} from "@/ts/extension";
import {Alert, ProblemStat, SolveState} from "@/ts/entities";
import {State} from "@/ts/user";

export class SUtil {

  static readonly pLevelText = ['', 'security.t-weak', 'security.weak', 'security.middle', 'security.strong']
  static readonly pLevelColor = ['error', 'warning', 'warning', 'accent', 'success']
  static readonly barChartOption = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: false
        }
      }],
      xAxes: [{
        ticks: {
          maxRotation: 0,
          autoSkipPadding: 15
        }
      }]
    },
  }
  static readonly pieChartOption = {
    aspectRatio: 1,
    scales: {
      yAxes: [{
        display: false
      }],
      xAxes: [{
        display: false
      }]
    }
  }
  static readonly languages = ['pgsql', 'sqlite', 'mysql']

  static readonly localeMap = new Map<string, string>([['en', 'English'], ['zh-CN', '简体中文']])

  static rangeToLoad(index: number, num: number): { start: number, end: number } {
    return {
      start: (index - 1) * num + 1,
      end: index * num
    }
  }

  static recordIcon(result: string): string {
    result = result.trim().toUpperCase()
    switch (result) {
      case 'AC':
        return 'mdi-check'
      case 'WA':
        return 'mdi-bomb'
      case 'TLE':
        return 'mdi-clock-out'
      case 'MLE':
        return 'mdi-memory'
      case 'RE':
        return 'mdi-bug'
      case 'SE':
        return 'mdi-help'
      default:
        return 'mdi-timelapse'
    }
  }

  static recordBoxStyle(result: string): string {
    result = result.trim().toUpperCase()
    switch (result) {
      case 'AC':
        // return `background-color: var(--v-success-lighten1);`
        return `background: radial-gradient(var(--v-success-base),var(--v-success-lighten1));`
      case 'WA':
        return `background: radial-gradient(var(--v-error-base),var(--v-error-lighten1));`
      case 'TLE':
      case 'MLE':
      case 'RE':
        return `background: radial-gradient(var(--v-warning-base),var(--v-warning-lighten1));`
      case 'SE':
        return `background: radial-gradient(var(--v-accent-base),var(--v-accent-lighten1));`
      default:
        return `background: radial-gradient(var(--v-info-base), var(--v-info-lighten1))`
    }
  }

  static recordColor(result: string): string {
    result = result.trim().toUpperCase()
    switch (result) {
      case 'AC':
        return 'success'
      case 'WA':
        return 'error'
      case 'TLE':
      case 'MLE':
      case 'RE':
        return 'warning'
      case 'SE':
        return 'accent'
      default:
        return 'info'
    }
  }

  static recordStatisticColor(result: string): string {
    result = result.toUpperCase().trim()
    switch (result) {
      case 'AC':
        return '#4caf50'
      case 'WA':
        return '#ff5722'
      case 'TLE':
      case 'MLE':
      case 'RE':
        return '#ff9800'
      case 'SE':
        return '#3165e5'
      default:
        return '#734bee'
    }
  }

  static solveStateColor(state: SolveState) {
    switch (state) {
      case SolveState.AC:
        return 'success'
      case SolveState.WA:
        return 'warning'
      case SolveState.NO_SUBMIT:
      default:
        return 'accent'
    }
  }

  static solveStateIcon(state: SolveState) {
    switch (state) {
      case SolveState.AC:
        return 'mdi-check'
      case SolveState.WA:
        return 'mdi-bomb'
      case SolveState.NO_SUBMIT:
      default:
        return 'mdi-minus'
    }
  }

  static objs2entities<T extends Entity>(list: any[] | undefined, type: new (arg: any) => T): T[] {
    return list?.map(i => new type(i)) ?? []
  }

  static pageDataTransfer<T extends Entity>(collection: EntityCollection | undefined, type: new (arg: any) => T): SEntityCollection<T> {
    return {
      entities: this.objs2entities(collection?.entities ?? [], type),
      count: collection?.count ?? 0
    }
  }

  static checkMail(value: string): boolean {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      .test(value)
  }

  static alertAPIException(error: APIException, vue: Vue) {
    vue.$alert(new Alert({
      type: 'error',
      info: error.info ?? error.toString()
    }))
  }

  static alertIfSuccess(msg:string, t:string, vue:Vue){
    if(msg.toUpperCase().trim()==='SUCCESS'){
      vue.$alert(new Alert({
        type:'success',
        info:vue.$t(t).toString()
      }))
    }
  }

  static passwordLevel(p: string) {
    if (p.length < 6)
      return 0
    let level = 0
    level += /[a-z]/.test(p) ? 1 : 0
    level += /[A-Z]/.test(p) ? 1 : 0
    level += /[0-9]/.test(p) ? 1 : 0
    level += /[^a-zA-Z0-9]/.test(p) ? 1 : 0
    return level
  }

  static genLabelDataFromStat(statList: ProblemStat[]): LabelDataList {
    return {
      labels: statList.map(p => p.key),
      data: statList.map(p => p.count)
    }
  }

  static async recover(_state: State, vue: Vue) {
    if (!_state.route||_state.route.trim().includes('/')||_state.route.trim().includes('/login')) return
    if(!(await vue.$confirm(vue.$t('profile.recover').toString()))) return
    vue.$store.commit('setProblemInfo', _state.problemInfo)
    vue.$store.commit('setAssignmentInfo', _state.assignmentInfo)
    vue.$store.commit('setRecordInfo', _state.recordInfo)
    window.state = _state.state
    vue.$router.replace({
      path: _state.route,
      query: {
        recover: 'true'
      }
    }).catch(e => void e)
  }

  static async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  static differenceByID<T extends { ID?: number, id?: number }>(a: T[], b: T[]): T[] {
    if (a[0].ID)
      return a.filter(i => b.find(j => i.ID === j.ID) === void 0)
    else
      return a.filter(i => b.find(j => i.id === j.id) === void 0)
  }

  static difference<T>(a: T[], b: T[]): T[] {
    return a.filter(i => b.find(j => j === i) === void 0)
  }
}
