import { isFunc, isInside } from '../tools'

/**
 * 事件监听管理器
 * 主要用于窗口事件智能化管理
 */
class ListenManager {
  /**
   * 构造函数
   * @param {Window | HTMLElement} object 
   * @param {String} eventName 
   */
  constructor(object, eventName) {
    this.handlers = []
    this.object = object
    this.eventName = eventName
    this.eventHandler = this.eventHandler.bind(this)
    this.addListener()
  }

  /**
   * 添加监听器
   */
  addListener() {
    this.object.addEventListener(this.eventName, this.eventHandler)
  }

  /**
   * 移除监听器
   */
  removeListener() {
    this.object.removeEventListener(this.eventName, this.eventHandler)
  }

  /**
   * 添加处理函数
   * @param {HTMLElement} el 
   * @param {Function} fn 
   */
  addHandler(el, fn) {
    this.handlers.push({ el, fn })
  }

  /**
   * 移除处理函数
   * @param {HTMLElement} el 
   */
  removeHandler(el) {
    this.handlers.splice(this.handlers.findIndex(_ => _.el === el), 1)
  }

  /**
   * 事件处理器
   * @param {Event} e 
   */
  eventHandler(e) {
    this.handlers.forEach(_ => _.fn(e))
  }

  /**
   * 获取处理函数数量
   */
  getHandlerCount() {
    return this.handlers.length
  }
}

/**
 * 创建事件指令
 * @param {Window | HTMLElement} object
 * @param {String} eventName
 * @param {Function} cb 必须是高阶函数
 */
const createEventDirective = (object, eventName, cb) => {
  let listenManager
  return {
    inserted(el, { value }) {
      listenManager = listenManager || new ListenManager(object, eventName)
      listenManager.addHandler(el, isFunc(cb) ? cb(el, value) : value)
    },
    unbind(el) {
      listenManager.removeHandler(el)
      if (listenManager.getHandlerCount() < 1) {
        listenManager.removeListener()
        listenManager = null
      }
    }
  }
}

// 窗口单击指令
export const winclick = createEventDirective(window, 'click')
// 窗口改变大小指令
export const winresize = createEventDirective(window, 'resize')
// 窗口滚动指令
export const winscroll = createEventDirective(window, 'scroll')
// 目标元素之外单击指令
export const clickoutside = createEventDirective(
  window, 'mouseup', (el, cb) => e => isFunc(cb) && !isInside(e, el) && cb(e)
)