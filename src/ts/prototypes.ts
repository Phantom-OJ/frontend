//@ts-nocheck

Number.prototype.format = function (num, prefix = '0') {
  if (prefix.length !== 1 || (!this && this !== 0)) {
    throw new Error('invalid prefix or number')
  }
  let re = (this % Math.pow(10, num)).toString()
  while (re.toString().length < num) {
    re = prefix + re
  }
  return re
}

Date.prototype.sString = function (): string {
  return `${this.getFullYear()}-${(this.getMonth() + 1).format(2)}-${this.getDate().format(2)} ${this.getHours().format(2)}:${this.getMinutes().format(2)}`
}

String.prototype.hash = function (): number {
  let hash = 0
  if (!!this) {
    for (let i = 0; i < this.length; i++) {
      hash = hash * 41 + this.charCodeAt(i)
      hash &= 0x7fffffff
    }
  }
  return hash
}
