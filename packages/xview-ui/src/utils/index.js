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