export const iconTypes = {
  info: 'information-circled',
  success: 'checkmark-circled',
  warning: 'android-alert',
  error: 'close-circled',
  loading: 'load-c',
  confirm: 'help-circled'
}

export const isFunc = f => typeof f === 'function'

export const isStr = s => typeof s === 'string'

let _maxZIndex = 0
export const getMaxZIndex = () => {
  if (_maxZIndex) return _maxZIndex += 2
  _maxZIndex = 1000
  Array.from(document.querySelectorAll('body>*')).forEach(el => {
    let { zIndex } = window.getComputedStyle(el, null)
    if (!isNaN(zIndex)) _maxZIndex = Math.max(_maxZIndex, zIndex)
  })
  return _maxZIndex
}

const isFoundByOptions = (vm, query) => {
  return isStr(query) ? vm.$options.name === query : Object.keys(query).every(_ => vm.$options[_] === query[_])
}

export const findChildrens = (vm, query) => {
  let rtnArr = [], nochecked = vm.$children.slice()
  while (nochecked.length) {
    let item = nochecked.shift()
    isFoundByOptions(item, query) ? rtnArr.push(item) : item.$children.forEach(_ => nochecked.push(_))
  }
  return rtnArr
}

export const findParent = (vm, query) => {
  let par = vm.$parent
  while (par) {
    if (isFoundByOptions(par, query)) return par
    par = par.$parent
  }
}

export const winScrollbarLock = {
  getScrollbarWidth() {
    let p = document.createElement('p')
    let styles = { width: '100px', height: '100px', overflowY: 'scroll' }
    for (let key in styles) p.style[key] = styles[key]
    document.body.appendChild(p)
    let scrollbarWidth = p.offsetWidth - p.clientWidth
    p.remove()
    return scrollbarWidth
  },
  lock() {
    let winHeight = window.innerHeight
    let { scrollHeight } = document.body
    if (winHeight > scrollHeight) return
    document.body.style.paddingRight = `${this.getScrollbarWidth()}px`
    document.body.style.overflow = 'hidden'
  },
  unlock() {
    document.body.style.paddingRight = document.body.style.overflow = ''
  }
}

export const throttle = (fn, gapTime = 16) => {
  let lastTime = null
  return () => {
    let nowTime = Date.now()
    if (!lastTime ||  nowTime - lastTime > gapTime) {
      fn()
      lastTime = nowTime
    }
  }
}

export const debounce = (fn, gapTime = 16) => {
  let timerId = null
  return () => {
    if (timerId) {
      clearTimeout(timerId)
      return timerId = null
    }
    timerId = setTimeout(fn, gapTime)
  }
}

export const addStylesheet = (id, styleStr) => {
  let styleEl = document.getElementById(id)
  if (styleEl) return
  styleEl = document.createElement('style')
  styleEl.id = id
  styleEl.innerHTML = styleStr
  document.head.appendChild(styleEl)
}

export const parseSize = size => isNaN(size) ? size : `${+size}px`