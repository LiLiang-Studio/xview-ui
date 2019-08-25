/**
 * 通用工具模块
 */

/**
 * 获取对象的类型
 * @param {any} obj 
 */
export function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
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