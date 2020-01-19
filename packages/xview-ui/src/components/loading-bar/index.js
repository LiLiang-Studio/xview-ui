import { getMaxZIndex } from '../../tools'
import UiLoadingBar from './LoadingBar.vue'

/**
 * 创建加载条
 * @param {import("vue").VueConstructor} Vue 
 */
export default Vue => {
  return {
    getVM() {
      return this.vm || (this.vm = new Vue({
        data() {
          return {
            customOptions: {},
            options: { percent: 0 }
          }
        },
        render(h) {
          return h(UiLoadingBar, {
            style: { zIndex: this.options.zIndex },
            props: Object.assign({}, this.options, this.customOptions),
            directives: [{ name: 'show', value: this.options.visible }]
          })
        },
        mounted() {
          document.body.appendChild(this.$el)
        },
        beforeDestroy() {
          this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
        },
        methods: {
          update(options = {}) {
            this.options = Object.assign({}, this.options, options)
          },
          config(options = {}) {
            this.customOptions = Object.assign({}, this.customOptions, options)
          }
        }
      }).$mount())
    },
    start() {
      if (this.tid) return
      this.getVM().update({ visible: true, percent: 0, status: undefined, zIndex: getMaxZIndex() })
      let percent = 0
      this.tid = setInterval(() => {
        percent += Math.floor(Math.random() * 3 + 2)
        if (percent > 90) this.clearTimer()
        this.update(percent)
      }, 200)
    },
    finish(status) {
      this.clearTimer()
      let vm = this.getVM()
      vm.update({ visible: true, percent: 100, status })
      Vue.nextTick(() => vm.update({ visible: false }))
    },
    error() {
      this.finish('error')
    },
    update(percent) {
      this.getVM().update({ percent })
    },
    config(options) {
      this.getVM().config(options)
    },
    destroy() {
      this.clearTimer()
      this.vm && this.vm.$destroy()
      this.vm = null
    },
    clearTimer() {
      clearInterval(this.tid)
      this.tid = null
    }
  }
}