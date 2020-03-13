import Vue from 'vue'
import { getMaxZIndex } from '../../tools'
import XLoadingBar from './LoadingBar.vue'

let vm, tid, clearTimer = () => { clearInterval(tid), tid = null },
  getVM = () => vm || (vm = new Vue({
  data() {
    return {
      customOptions: {},
      options: { percent: 0 }
    }
  },
  render(h) {
    return h(XLoadingBar, {
      style: { zIndex: this.options.zIndex },
      props: { ...this.options, ...this.customOptions },
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
      this.options = { ...this.options, ...options }
    },
    config(options = {}) {
      this.customOptions = { ...this.customOptions, ...options }
    }
  }
}).$mount())

export default {
  start() {
    if (tid) return
    getVM().update({ visible: true, percent: 0, status: undefined, zIndex: getMaxZIndex() })
    let percent = 0
    tid = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 2)
      if (percent > 90) clearTimer()
      this.update(percent)
    }, 200)
  },
  finish(status) {
    clearTimer()
    let vm = getVM()
    vm.update({ visible: true, percent: 100, status })
    vm.$nextTick(() => vm.update({ visible: false }))
  },
  error() {
    this.finish('error')
  },
  update(percent) {
    getVM().update({ percent })
  },
  config(options) {
    getVM().config(options)
  },
  destroy() {
    clearTimer()
    vm && vm.$destroy()
    vm = null
  }
}