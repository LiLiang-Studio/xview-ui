import Vue from 'vue'
import XSpin from './Spin.vue'
import { getMaxZIndex, winScrollbarLock } from '../../tools'

let vm, getVM = () => vm || (vm = new Vue({
  data() {
    return { visible: false, options: {} }
  },
  watch: {
    visible(val) {
      winScrollbarLock[val ? 'lock' : 'unlock']()
    }
  },
  render(h) {
    let { options } = this
    return h(XSpin, {
      props: { size: options.size, fix: true },
      style: { zIndex: getMaxZIndex(), position: 'fixed' },
      directives: [{ name: 'show', value: this.visible }]
    }, options.render && [options.render(h)])
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    show(options = {}) {
      this.options = { size: 'large', ...options }
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
}).$mount())

export const spinService = {
  show(options) {
    getVM().show(options)
  },
  hide() {
    getVM().hide()
  },
  destroy() {
    vm && vm.$destroy()
    vm = null
  }
}

export default XSpin