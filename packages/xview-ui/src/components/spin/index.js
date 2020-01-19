
import UiSpin from './Spin.vue'
import { getMaxZIndex, winScrollbarLock, isFunc } from '../../tools'

/**
 * 创建加载中组件
 * @param {Vue.VueConstructor} Vue 
 */
export const spinService = Vue => {
  return {
    getVM(options = {}) {
      let that = this
      return this.vm || new Vue({
        data() {
          return { visible: false }
        },
        watch: {
          visible(newval) {
            if (!newval) winScrollbarLock.unlock()
          }
        },
        render(h) {
          return h(UiSpin, {
            props: { size: options.size, fix: true },
            style: { zIndex: getMaxZIndex(), position: 'fixed' },
            directives: [{ name: 'show', value: this.visible }],
          }, isFunc(options.render) ? [options.render(h)] : undefined)
        },
        mounted() {
          document.body.appendChild(this.$el)
          this.visible = true
        },
        beforeDestroy() {
          that.vm = null
          this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        },
        methods: {
          show(visible = true) {
            this.visible = visible
          }
        }
      }).$mount()
    },
    show(options) {
      winScrollbarLock.lock()
      this.vm = this.getVM(options)
      this.vm.show()
    },
    hide() {
      this.vm.show(false)
    },
    destroy() {
      this.vm.$destroy()
    }
  }
}

export default UiSpin