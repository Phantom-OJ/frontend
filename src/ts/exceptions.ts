export class APIException {
  code: number
  description: string

  constructor({data, status, statusText}: any) {
    this.code = parseInt(status)
    this.description = data?.msg
  }

  get info(): string {
    return `Error: ${this.code}\n${this.description}`
  }
}
