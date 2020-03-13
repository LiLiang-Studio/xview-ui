import Vue from 'vue'
import XNotice from './Notice.vue'
import XMessage from './Message.vue'
import XWrapper from './Wrapper.vue'
import { isStr, getMaxZIndex } from '../../tools'

const creator = (Component, config, addons = {}) => {
  let vm, key = 0, getVM = () => vm || (vm = new Vue({
    data() {
      return { items: [], zIndex: 0 }
    },
    watch: {
      'items.length'(newval, oldval) {
        if (newval > oldval) this.zIndex = getMaxZIndex()
      }
    },
    render(h) {
      return h(XWrapper, {
        style: { zIndex: this.zIndex },
        props: { transition: Component.transition }
      }, this.items.map(({ ui, key, props }, i) => {
        return h(
          ui,
          { key, props, on: { close: () => this.items.splice(i, 1) } },
          props.render ? [props.render(h)] : props.content || props.desc)
      }))
    },
    mounted() {
      document.body.appendChild(this.$el)
    },
    beforeDestroy() {
      this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
    },
    methods: {
      addItem(props = {}) {
        let item = { props, ui: Component, key: key++ }
        this.items.push(item)
        return item.key
      },
      removeItem(key) {
        let index = this.items.findIndex(_ => _.key === key)
        if (index >= 0) this.items.splice(index, 1)
      }
    }
  }).$mount())

  let defaultConfig = { duration: 1.5, ...(config || {}) },
    addNotice = (options, type) => getVM().addItem({ ...defaultConfig, ...(isStr(options) ? { content: options } : options), type }),
    noticeFunc = options => addNotice(options)

  ;['info', 'warning', 'error', 'success'].forEach(_ => noticeFunc[_] = options => addNotice(options, _))
  noticeFunc.config = options => defaultConfig = { ...defaultConfig, ...options }
  noticeFunc.destroy = () => {
    vm && vm.$destroy()
    vm = null
  }
  for (let k in addons) {
    noticeFunc[k] = options => addons[k](addNotice, options, getVM)
  }
  return noticeFunc
}

export const Message = creator(XMessage, null, {
  loading(addNotice, options, getVM) {
    let key = addNotice(options, 'loading')
    return () => getVM().removeItem(key)
  }
})

export const Notice = creator(XNotice, { duration: 4.5 }, {
  open(addNotice, options) {
    addNotice(options, 'open')
  }
})