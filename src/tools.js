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