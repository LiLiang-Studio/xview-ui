
import UiSpin from './Spin.vue'
import { getMaxZIndex, winScrollbarLock, isFunc } from '@/tools'

/**
 * 创建加载中组件
 * @param {Vue.VueConstructor} Vue 
 */
export const spinService = Vue => {
  return {
    show(options = {}) {
      winScrollbarLock.lock()
      this.vm = new Vue({
        data() {
          return { visible: false }
        },
        render(h) {
          return h(UiSpin, {
            props: { size: options.size, fix: true },
            style: { zIndex: getMaxZIndex(), position: 'fixed' },
            directives: [{ name: 'show', value: this.visible }],
            on: { leave: () => this.$destroy() }
          }, isFunc(options.render) ? [options.render(h)] : undefined)
        },
        mounted() {
          document.body.appendChild(this.$el)
          this.visible = true
        },
        beforeDestroy() {
          winScrollbarLock.unlock()
          this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        }
      }).$mount()
    },
    hide() {
      this.vm.visible = false
    }
  }
}

export default UiSpin