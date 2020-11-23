export class SUtil {

  static rangeToLoad(index: number, num: number): { start: number, end: number } {
    return {
      start: (index - 1) * num + 1,
      end: index * num + 1
    }
  }

}
