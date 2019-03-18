/**
 * Vue原型方法定义模块
 */

import { setMaxZIndex } from '../utils'

/**
 * 通知提醒管理类
 */
export class NoticeManager {
  constructor(Vue, component, cls, config = {}) {
    this.cls = cls
    this.Vue = Vue
    this.component = component
    this.currentKey = 0
    this.wrapperVM = null
    this.initConfig = { duration: 2, top: 24, ...config }
  }

  addComponent(type, options) {
    if (typeof options === 'string') {
      options = { content: options, desc: options }
    }
    this.wrapperVM.comps.push({
      ui: this.component,
      key: ++this.currentKey,
      props: { ...this.initConfig, ...options, type }
    })
  }

  notice(type, options) {
    let that = this
    if (!this.wrapperVM) {
      this.wrapperVM = new this.Vue({
        data: () => ({ comps: [], zIndex: setMaxZIndex() }),
        watch: {
          'comps.length'(newVal, oldVal) {
            if (newVal > oldVal) {
              this.zIndex = setMaxZIndex()
            }
          }
        },
        render(h) {
          return h('div', {
            class: that.cls,
            style: { zIndex: this.zIndex, top: `${that.initConfig.top}px` }
          }, this.comps.map((_, i) => {
            return h(_.ui, {
              key: _.key,
              props: _.props,
              on: {
                destroy: () => this.comps.splice(i, 1)
              }
            })
          }))
        },
        mounted() {
          document.body.appendChild(this.$el)
        },
        beforeDestroy() {
          that.wrapperVM = null
          document.body.removeChild(this.$el)
        }
      }).$mount()
    }
    this.addComponent(type, options)
  }

  info(options) {
    this.notice('info', options)
  }

  success(options) {
    this.notice('success', options)
  }

  warning(options) {
    this.notice('warning', options)
  }

  error(options) {
    this.notice('error', options)
  }

  loading(options) {
    this.notice('loading', options)
  }

  open(options) {
    this.notice('open', options)
  }

  config(options) {
    this.initConfig = { ...this.initConfig, ...options }
  }

  destroy() {
    this.wrapperVM && this.wrapperVM.$destroy()
  }
}