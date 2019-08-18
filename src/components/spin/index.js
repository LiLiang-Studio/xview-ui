
import UiSpin from './Spin.vue'
import { setMaxZIndex, winScrollLock } from './../../utils'

/**
 * 创建加载中组件
 * @param {Vue.VueConstructor} Vue 
 */
export function createSpin(Vue) {
  return {
    show(options = {}) {
      winScrollLock.lock()
      let props = { ...options, zIndex: setMaxZIndex(), fullscreen: true }
      this.spin = new Vue({
        name: 'ui-spin-wrapper',
        data() {
          return { visible: false }
        },
        render(h) {
          return this.visible && h(UiSpin, { props })
        },
        mounted() {
          document.body.appendChild(this.$el)
          this.visible = true
        },
        beforeDestroy() {
          this.$el.remove()
          winScrollLock.unlock()
        }
      }).$mount()
    },
    hide() {
      this.spin.visible = false
    }
  }
}

export default UiSpin