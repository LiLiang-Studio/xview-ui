/**
 * 全局指令模块
 */

 /**
  * 事件管理器类
  */
class EventManager {
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

  addHandler(f) {
    this.handlers.push(f)
  }

  removeHandler(f) {
    this.handlers.splice(this.handlers.indexOf(f), 1)
  }

  eventHandler(event) {
    this.handlers.forEach(handler => handler(event))
  }

  getHandlerCount() {
    return this.handlers.length
  }
}

/**
 * 创建事件指令
 * @param {Vue.VueConstructor} Vue 
 */
export function createEventDirective(Vue) {
  return function (directiveName, object, eventName) {
    let eventManager = null
    Vue.directive(directiveName, {
      inserted(el, { value }) {
        if (typeof value !== 'function') return
        if (!eventManager) {
          eventManager = new EventManager(object, eventName)
        }
        el[directiveName + eventName] = value
        eventManager.addHandler(value)
      },
      unbind(el) {
        let handler = el[directiveName + eventName]
        handler && eventManager.removeHandler(handler)
        if (eventManager.getHandlerCount() === 0) {
          eventManager.removeListener()
          eventManager = null
        }
      }
    })
  }
}

/**
 * 创建指令
 * @param {Vue.VueConstructor} Vue 
 */
export function createDirectives(Vue) {
  createEventDirective(Vue)('resize', window, 'resize')
  createEventDirective(Vue)('scroll', window, 'scroll')
  createEventDirective(Vue)('winclick', window, 'click')
}