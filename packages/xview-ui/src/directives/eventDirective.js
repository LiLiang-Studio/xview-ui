/**
 * 事件指令
 */

function EventManager(object, eventName) {
  this.handlers = []
  this.object = object
  this.eventName = eventName
  this.eventHandler = this.eventHandler.bind(this)
  this.addListener()
}

EventManager.prototype = {
  addListener() {
    this.object.addEventListener(this.eventName, this.eventHandler)
  },
  removeListener() {
    this.object.removeEventListener(this.eventName, this.eventHandler)
  },
  addHandler(fn) {
    this.handlers.push(fn)
  },
  removeHandler(fn) {
    this.handlers.splice(this.handlers.indexOf(fn), 1)
  },
  eventHandler(event) {
    this.handlers.forEach(handler => handler(event))
  },
  getHandlerCount() {
    return this.handlers.length
  }
}

/**
 * 创建事件指令
 * 
 * @param {Object} object
 * @param {String} eventName
 */
export default function createEventDirective(object, eventName) {
  let eventManager
  return {
    inserted(el, { value }) {
      if (typeof value !== 'function') {
        throw new Error('The value of directive must be a function !')
      }
      if (!eventManager) {
        eventManager = new EventManager(object, eventName)
      }
      el[el.tagName + eventName] = value
      eventManager.addHandler(value)
    },
    unbind(el) {
      let handler = el[el.tagName + eventName]
      handler && eventManager.removeHandler(handler)
      if (eventManager.getHandlerCount() === 0) {
        eventManager.removeListener()
        eventManager = null
      }
    }
  }
}