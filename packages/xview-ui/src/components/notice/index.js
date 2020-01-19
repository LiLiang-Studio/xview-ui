import UiNotice from './Notice.vue'
import UiMessage from './Message.vue'
import UiWrapper from './Wrapper.vue'
import { isFunc, isStr, getMaxZIndex } from '../../tools'

/**
 * @param {import('vue').VueConstructor} Vue 
 * @param {Vue} Component
 * @param {Vue} WrappedComponent
 */
const createNoticeManager = (Vue, Component, config = {}) => {
  let comWrapper, key = 0
  const getWrapper = () => {
    comWrapper = comWrapper || new Vue({
      name: 'UiNoticeManager',
      data() {
        return { comps: [], zIndex: 0 }
      },
      watch: {
        'comps.length'(newval, oldval) {
          if (newval > oldval) {
            this.zIndex = getMaxZIndex()
          }
        }
      },
      render(h) {
        return h(
          UiWrapper,
          {
            style: { zIndex: this.zIndex },
            props: { transition: Component.transition }
          },
          this.comps.map(({ ui, key, props }, i) => {
            return h(
              ui,
              {
                key,
                props,
                on: {
                  close: () => this.comps.splice(i, 1)
                }
              },
              isFunc(props.render) ? [props.render(h)] : (props.content || props.desc)
            )
          })
        )
      },
      mounted() {
        document.body.appendChild(this.$el)
      },
      beforeDestroy() {
        comWrapper = null
        document.body.removeChild(this.$el)
      },
      methods: {
        addCompOptions(props = {}) {
          let option = { props, ui: Component, key: key++ }
          this.comps.push(option)
          return option.key
        },
        delComOptionByKey(key) {
          let index = this.comps.find(_ => _.key === key)
          if (index !== -1) this.comps.splice(index, 1)
        }
      }
    }).$mount()
    return comWrapper
  }
  let defaultConfig = Object.assign({}, { duration: 2, closable: false }, config)
  const addNotice = (options, type = 'info') => {
    options = isStr(options) ?
      Object.assign({}, defaultConfig, { content: options, type }) :
      Object.assign({}, defaultConfig, options, { type })
    return getWrapper().addCompOptions(options)
  }
  const noticeFunc = options => addNotice(options)
  noticeFunc.open = options =>  addNotice(options, 'open')
  noticeFunc.info = options =>  addNotice(options, 'info')
  noticeFunc.warning = options => addNotice(options, 'warning')
  noticeFunc.error = options => addNotice(options, 'error')
  noticeFunc.success = options => addNotice(options, 'success')
  noticeFunc.loading = options => {
    let key = addNotice(options, 'loading')
    return () => getWrapper().delComOptionByKey(key)
  }
  noticeFunc.config = options => defaultConfig = Object.assign({}, defaultConfig, options)
  noticeFunc.destroy = () => comWrapper && comWrapper.$destroy()
  return noticeFunc
}

export const createNotice = Vue => createNoticeManager(Vue, UiNotice, { duration: 4 })
export const createMessage = Vue => createNoticeManager(Vue, UiMessage)