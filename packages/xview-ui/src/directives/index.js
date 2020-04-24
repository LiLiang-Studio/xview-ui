import { isFunc, isOutside } from '../tools'

/**
 * 事件监听管理器
 * 主要用于窗口事件智能化管理
 */
class ListenManager {
  constructor(object, eventName) {
    this.handlers = []
    this.object = object
    this.eventName = eventName
    this.eventHandler = this.eventHandler.bind(this)
    this.addListener()
  }

  addListener() {
    this.object.addEventListener(this.eventName, this.eventHandler)
  }

  removeListener() {
    this.object.removeEventListener(this.eventName, this.eventHandler)
  }

  addHandler(el, fn) {
    this.handlers.push({ el, fn })
  }

  removeHandler(el) {
    this.handlers.splice(this.handlers.findIndex(_ => _.el === el), 1)
  }

  eventHandler(e) {
    this.handlers.forEach(_ => _.fn(e))
  }

  getHandlerCount() {
    return this.handlers.length
  }
}

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

// 窗口改变大小指令
export const winresize = createEventDirective(window, 'resize')
// 窗口滚动指令
export const winscroll = createEventDirective(window, 'scroll')
// 目标元素之外单击指令
export const clickoutside = createEventDirective(window, 'click', (el, cb) => e => isOutside(e, el) && cb(e))