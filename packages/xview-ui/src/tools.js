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

export const isBool = b => typeof b === 'boolean'

export const isArr = arr => arr instanceof Array

export const isUrl = s => isStr(s) && /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/.test(s)

export const getType = obj => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()

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
    this.locked = true
    let winHeight = window.innerHeight
    let { scrollHeight } = document.body
    if (winHeight > scrollHeight) return
    document.body.style.paddingRight = `${this.getScrollbarWidth()}px`
    document.body.style.overflow = 'hidden'
  },
  unlock() {
    this.locked = false
    document.body.style.paddingRight = document.body.style.overflow = ''
  }
}

export const throttle = (fn, gapTime = 16) => {
  let tid, lastTime
  return () => {
    clearTimeout(tid)
    let nowTime = Date.now()
    if (!lastTime || nowTime - lastTime > gapTime) {
      fn()
      lastTime = nowTime
    } else {
      tid = setTimeout(fn, nowTime - lastTime)
    }
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

export const UiRender = {
  functional: true,
  render: (h, ctx) => ctx.props.render(h)
}

/**
 * 设置文本域自动高度
 * @param {HTMLTextAreaElement} textarea
 * @param {Number} minRows
 * @param {Number} maxRows
 */
export const setAutoHeight = (textarea, minRows, maxRows) => {
  let style = window.getComputedStyle(textarea, null)
  let borderWidth = parseInt(style.borderTopWidth) + parseInt(style.borderBottomWidth)
  let padding = parseInt(style.paddingTop) + parseInt(style.paddingBottom)
  let lineHeight = parseInt(style.lineHeight)
  let matches = textarea.value.match(/\n/gm)
  let lbCount = matches ? matches.length : 0
  let compare = borderWidth + padding + lineHeight * lbCount < textarea.scrollHeight
  if (typeof minRows === 'number' && (!compare && lbCount <= minRows)) return
  if (typeof maxRows === 'number' && lbCount >= maxRows) return
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight + borderWidth}px`
}

/**
 * 格式化日期
 * @param {Date|String} date 
 * @param {String} format 
 */
export const dateFormat = (date, format = 'yyyy-MM-dd hh:mm:ss') => {
  if (typeof date === 'string') {
    let mts = date.match(/(\/Date\((\d+)\)\/)/)
    if (mts && mts.length >= 3) date = parseInt(mts[2])
  }
  date = new Date(date)
  if (!date || date.toUTCString() === 'Invalid Date') return ''
  let map = {
    M: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    q: Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }
  format = format.replace(/([yMdhmsqS])+/g, (all, t) => {
    let v = map[t]
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v
        v = v.substr(v.length - 2)
      }
      return v
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length)
    }
    return all
  })
  return format
}