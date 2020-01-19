import UiDialog from './Dialog.vue'
/**
 * 创建对话框
 * @param {Vue.VueConstructor} Vue 
 */
export const modalService = Vue => {
  let vm
  const getVM = () => vm || (vm = new Vue({
    data() {
      return { options: {} }
    },
    render(h) {
      return h(UiDialog, {
        props: this.options,
        on: {
          ok: () => this.show(false),
          input: val => this.show(val),
          leave: () => this.destroy()
        }
      })
    },
    methods: {
      show(visible) {
        this.$set(this.options, 'value', visible)
      },
      setOptions(options) {
        this.options = options
      },
      destroy() {
        this.$destroy()
        vm = null
      }
    }
  }).$mount())
  const openDialog = (type, options) => getVM().setOptions({ ...options, type, value: true })
  return {
    ...['info', 'success', 'warning', 'error', 'confirm'].reduce((acc, _) => {
      return { ...acc, [_](options) { openDialog(_, options) } }
    }, {}),
    remove() {
      vm && vm.show(false)
    }
  }
}

export { default } from './Modal.vue'