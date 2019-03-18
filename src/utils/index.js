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
  loading: 'load-c'
}

/**
 * 是否函数
 * @param {Function} f 
 */
export function isFunc(f) {
  return typeof f === 'function'
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