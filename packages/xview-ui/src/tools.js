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

export const isNum = n => typeof n === 'number'

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

export const XRender = {
  functional: true,
  render: (h, ctx) => ctx.props.render(h, ctx.props)
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
  if (isNum(minRows) && (!compare && lbCount <= minRows)) return
  if (isNum(maxRows) && lbCount >= maxRows) return
  textarea.style.height = 'auto'
  textarea.style.height = `${textarea.scrollHeight + borderWidth}px`
}

/**
 * 获取元素在页面中的偏移位置
 * @param {HTMLElement} el
 */
export function getOffset(el) {
  let offset = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: el.offsetWidth,
    height: el.offsetHeight
  }
  while (el) {
    offset.top += el.offsetTop
    offset.left += el.offsetLeft
    el = el.offsetParent
  }
  offset.right = offset.left + offset.width
  offset.bottom = offset.top + offset.height
  return offset
}

/**
 * 事件目标是否在元素外部
 * @param {Event} e
 * @param {HTMLElement} el
 */
export const isOutside = (e, el) => {
  return e.target !== el && Array.from(el.querySelectorAll('*')).indexOf(e.target) < 0
}

const pad = (val, len) => (val + '').length < len ? pad('0' + val, len) : val

/**
 * 格式化日期
 * @param {Date | String} d 
 * @param {String} format 
 */
export const formatDate = (d, format = 'yyyy-MM-dd HH:mm:ss') => {
  if (!d) return ''
  if (!(d instanceof Date)) d = new Date(d)
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let date = d.getDate()
  let day = d.getDay()
  let hours = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  let ms = d.getMilliseconds()
  let zone = d.getTimezoneOffset()
  let dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let shortMonthNames = monthNames.map(_ => _.slice(0, 3))
  let shortDayNames = dayNames.map(_ => _.slice(0, 3))

  return format
    .replace(/yyyy/g, () => year) // 年份（四位）
    .replace(/yy/g, () => (year + '').slice(2)) // 年份（两位）
    .replace(/MMMM/g, () => monthNames[month - 1]) // 月份（英文）
    .replace(/MMM/g, () => shortMonthNames[month - 1]) // 月份（英文简写
    .replace(/MM/g, () => pad(month, 2)) // 月份（两位）
    .replace(/M/g, () => month) // 月份（一位）
    .replace(/dddd/g, () => dayNames[day]) // 星期（英文）
    .replace(/ddd/g, () => shortDayNames[day]) // 星期（英文简写）
    .replace(/dd/g, () => pad(date, 2)) // 日期（两位）
    .replace(/d/g, () => date) // 日期（一位）
    .replace(/DD/g, () => '0' + day) // 星期（两位）
    .replace(/D/g, () => day) // 星期（一位）
    .replace(/HH/g, () => pad(hours, 2)) // 小时（24小时制两位）
    .replace(/H/g, () => hours) // 小时（24小时制一位）
    .replace(/hh/g, () => pad(hours > 12 ? hours - 12 : hours, 2)) // 小时（12小时制两位）
    .replace(/h/g, () => hours > 12 ? hours - 12 : hours) // 小时（12小时制一位）
    .replace(/mm/g, () => pad(minutes, 2)) // 分钟（两位）
    .replace(/m/g, () => minutes) // 分钟（一位）
    .replace(/ss/g, () => pad(seconds, 2)) // 秒钟（两位）
    .replace(/s/g, () => seconds) // 秒钟（一位）
    .replace(/SSS/g, () => pad(ms, 3)) // 毫秒（三位）
    .replace(/SS/g, () => pad(Math.round(ms / 10), 2)) // 毫秒（两位）
    .replace(/S/g, () => Math.round(ms / 100)) // 毫秒（一位）
    .replace(/A/g, () => hours > 12 ? 'PM' : 'AM') // 上午与下午（大写）
    .replace(/a/g, () => hours > 12 ? 'pm' : 'am') // 上午与下午（小写）
    .replace(/ZZ/g, () => (zone > 0 ? '-' : '+') + pad(Math.floor(Math.abs(zone) / 60) * 100 + Math.abs(zone) % 60, 4)) // 时区
}

formatDate.hasHours = format => /[h|H]/.test(format)
formatDate.hasMinutes = format => /m/.test(format)
formatDate.hasSeconds = format => /s/.test(format)