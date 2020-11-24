import {Entity, EntityCollection, SEntityCollection} from "@/ts/interfaces";

export class SUtil {

  static rangeToLoad(index: number, num: number): { start: number, end: number } {
    return {
      start: (index - 1) * num + 1,
      end: index * num
    }
  }

  static recordIcon(result: string):string {
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

  static recordBoxStyle(result: string):string {
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

  static recordColor(result:string):string{
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

  static objs2entities<T extends Entity>(list:any[]|undefined, type: new (arg: any) => T):T[]{
    return list?.map(i => new type(i))??[]
  }

  static pageDataTransfer<T extends Entity>(collection:EntityCollection, type: new (arg: any) => T):SEntityCollection<T>{
    return {
      entities:this.objs2entities(collection.entities, type),
      count:collection.count
    }
  }
}
