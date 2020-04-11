import { isArr } from '../../tools'

export default class Cache {
  constructor(value, label) {
    this.data = ['', null, undefined].indexOf(value) > -1 ? {} :
      isArr(value) ? value.reduce((acc, _, i) => ({ ...acc, [_]: label[i] }), {}) : { [value]: label }
  }

  add(item) {
    this.data[item.value] = item.label || item.value
  }

  remove(value) {
    delete this.data[value]
  }

  getLabel(value) {
    return this.data[value]
  }

  clear() {
    this.data = {}
  }
}