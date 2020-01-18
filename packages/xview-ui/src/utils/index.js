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