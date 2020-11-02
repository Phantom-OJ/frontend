//@ts-nocheck

export function copy(target) {
  let copied_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target){
    if((typeof target !== 'object')||!target){return target;}
    for(let i= 0 ;i<copied_objs.length;i++){
      if(copied_objs[i].target === target){
        return copied_objs[i].copyTarget;
      }
    }
    let obj = {};
    if(Array.isArray(target)){
      obj = [];//处理target是数组的情况
    }
    copied_objs.push({target:target,copyTarget:obj})
    Object.keys(target).forEach(key=>{
      if(obj[key]){ return;}
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(target);
}

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
