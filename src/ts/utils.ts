import {Entity, EntityCollection, LabelDataList, SEntityCollection} from "@/ts/interfaces";
import {APIException} from "@/ts/exceptions";
import {Vue} from "@/ts/extension";
import {Alert, ProblemStat} from "@/ts/entities";

export class SUtil {

  static readonly pLevelText = ['', 'security.t-weak', 'security.weak', 'security.middle', 'security.strong']
  static readonly pLevelColor = ['error', 'warning', 'warning', 'accent', 'success']
  static readonly barChartOption =
    {
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
  static readonly pieChartOption= {
    aspectRatio:1,
    scales:{
      yAxes:[{
        display:false
      }],
      xAxes:[{
        display:false
      }]
    }
  }

  static rangeToLoad(index: number, num: number): { start: number, end: number } {
    return {
      start: (index - 1) * num + 1,
      end: index * num
    }
  }

  static recordIcon(result: string): string {
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
      default:
        return 'mdi-help'
    }
  }

  static recordBoxStyle(result: string): string {
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
      default:
        return `background: radial-gradient(var(--v-accent-base),var(--v-accent-lighten1));`
    }
  }

  static recordColor(result: string): string {
    switch (result) {
      case 'AC':
        return 'success'
      case 'WA':
        return 'error'
      case 'TLE':
      case 'MLE':
      case 'RE':
        return 'warning'
      default:
        return 'accent'
    }
  }

  static objs2entities<T extends Entity>(list: any[] | undefined, type: new (arg: any) => T): T[] {
    return list?.map(i => new type(i)) ?? []
  }

  static pageDataTransfer<T extends Entity>(collection: EntityCollection|undefined, type: new (arg: any) => T): SEntityCollection<T> {
    return {
      entities: this.objs2entities(collection?.entities??[], type),
      count: collection?.count??0
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
}
