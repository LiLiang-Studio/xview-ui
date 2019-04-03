/**
 * 通用工具模块
 */

// 最大图层值
var maxZIndex

// 消息图标类型
export const iconTypes = {
  info: 'information-circled',
  success: 'checkmark-circled',
  warning: 'android-alert',
  error: 'close-circled',
  loading: 'load-c',
  confirm: 'help-circled'
}

/**
 * 是否函数
 * @param {Function} f 
 */
export function isFunc(f) {
  return typeof f === 'function'
}

/**
 * 获取对象的类型
 * @param {any} obj 
 */
export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}

/**
 * 设置最大图层值
 */
export function setMaxZIndex() {
  if (maxZIndex) {
    maxZIndex += 2
    return maxZIndex
  }
  let zIndex = 1000
  let elements = document.querySelectorAll('body>*')
  let elementArray = Array.prototype.slice.call(elements)
  elementArray.forEach(el => {
    let elZIndex = window.getComputedStyle(el, null).zIndex
    if (!isNaN(elZIndex)) zIndex = Math.max(zIndex, elZIndex)
  })
  maxZIndex = zIndex + 2
  return maxZIndex
}

/**
 * 设置文本域自动高度
 * @param {HTMLTextAreaElement} textarea
 * @param {Number} minRows
 * @param {Number} maxRows
 */
export function setAutoHeight(textarea, minRows, maxRows) {
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
 * 通过组件名字查找父组件
 * @param {Vue.default} vm 
 * @param {String} name 
 */
export function findParentByName(vm, name) {
  let par = vm.$parent
  while (par) {
    if (par.$options.name === name) return par
    par = par.$parent
  }
}

/**
 * 通过组件名查找所有子组件
 * @param {Vue.default} vm 
 * @param {String} name 
 */
export function findChildrensByName(vm, name) {
  let rtnArr = [], nochecked = [...vm.$children]
  const checkFunc = vm => vm.$options.name === name
  while (nochecked.length) {
    let curItem = nochecked.pop()
    if (checkFunc(curItem)) {
      rtnArr.push(curItem)
    } else {
      curItem.$children.forEach(_ => {
        nochecked.push(_)
        if (checkFunc(_)) rtnArr.push(_)
      })
    }
  }
  return rtnArr
}

/**
 * 节流控制
 * @param {Function} fn
 * @param {Number} gapTime
 */
export function throttle(fn, gapTime = 20) {
  let lastTime = null
  return () => {
    let nowTime = Date.now()
    if (nowTime - lastTime > gapTime || !lastTime) {
        fn()
        lastTime = nowTime
    }
  }
}

/**
 * 对视口锁定滚动和解锁滚动
 */
export const winScrollLock = {
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

export const RenderCell = {
  name: 'ui-render',
  functional: true,
  props: {
    render: Function
  },
  render: (h, ctx) => ctx.props.render(h)
}

/**
 * 判断一个元素是否另一个元素的父元素或者自身
 * @param {HTMLElement} par 
 * @param {HTMLElement} el 
 */
export function isSelfOrParent(par, el) {
  do {
    if (el === par) return true
    el = el.parentNode
  } while (el && el !== document.body)
  return false
}

/**
 * 判断一个元素的父元素是否有指定的类
 * @param {HTMLElement} el 
 * @param {String} clsName 
 */
export function hasClassNameOfParent(el, clsName) {
  return !!findParentByClassName(el, clsName)
}

/**
 * 通过类名查找父元素
 * @param {HTMLElement} el 
 * @param {String} clsName 
 */
export function findParentByClassName(el, clsName) {
  do {
    if (el.classList.contains(clsName)) return el
    el = el.parentNode
  } while (el && el !== document.body)
  return null
}