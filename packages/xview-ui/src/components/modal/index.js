import Vue from 'vue'
import XModal from './Modal.vue'
import XDialog from './Dialog.vue'

let vm, getVM = () => vm || (vm = new Vue({
  data() {
    return { options: {} }
  },
  render(h) {
    let { render, ...props } = this.options
    return h(XDialog, {
      props, on: { leave: () => this.destroy() }
    }, render && [render(h)])
  },
  methods: {
    toggle(value) {
      this.options = { ...this.options, value }
    },
    show(options) {
      this.options = { ...options, value: true }
    },
    destroy() {
      this.$destroy()
      vm = null
    }
  }
}).$mount())

XModal.service = {
  ...[
    'info',
    'success',
    'warning',
    'error',
    'confirm'
  ].reduce((acc, type) => {
    return {
      ...acc,
      [type](options) { getVM().show({ ...options, type }) } 
    }
  }, {}),
  remove() {
    vm && vm.toggle(false)
  }
}

export default XModal