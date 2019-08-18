/**
 * 加载条对象
 */

import UiLoadingBar from './LoadingBar.vue'
import { setMaxZIndex } from './../../utils'

/**
 * 创建加载条
 * @param {import("vue").VueConstructor} Vue 
 */
export function createLoadingBar(Vue) {
  return {
    create() {
      return new Vue({
        data() {
          return {
            customOptions: {},
            options: { percent: 0 }
          }
        },
        render(h) {
          return h(UiLoadingBar, {
            props: { ...this.options, ...this.customOptions },
            on: {
              leave: () => this.options = { percent: 0 }
            }
          })
        },
        methods: {
          update(options = {}) {
            this.options = { ...this.options, ...options }
          },
          config(options = {}) {
            this.customOptions = options
          }
        },
        beforeDestroy() {
          this.$el.parentNode.removeChild(this.$el)
        }
      }).$mount()
    },
    getLoadingBar() {
      return this.LoadingBar = this.LoadingBar || this.create()
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    start() {
      if (this.timer) return
      let LoadingBar = this.getLoadingBar()
      LoadingBar.update({ visible: true, zIndex: setMaxZIndex() })
      let percent = 0
      this.timer = setInterval(() => {
        percent += Math.floor(Math.random() * 3 + 2)
        if (percent > 90) this.clearTimer()
        this.update(percent)
      }, 200)
    },
    finish(status) {
      this.clearTimer()
      let LoadingBar = this.getLoadingBar()
      LoadingBar.update({ visible: true, status, zIndex: setMaxZIndex() })
      Vue.nextTick().then(() => LoadingBar.update({ percent: 100, visible: false }))
    },
    error() {
      this.finish('error')
    },
    update(percent) {
      this.getLoadingBar().update({ percent })
    },
    config(options) {
      this.getLoadingBar().config(options)
    },
    destroy() {
      this.clearTimer()
      this.LoadingBar && this.LoadingBar.$destroy()
      this.LoadingBar = null
    }
  }
}