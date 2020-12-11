export class APIException {
  code: number
  description: string
  url:string

  constructor({data, status, statusText, code}: any, url:string) {
    this.code = status??code
    this.description = data?.msg??statusText
    this.url = url
  }

  get info(): string {
    return `Error : ${this.code}\n${this.description}`
  }
}
