/**
 * 对话框模块
 */

import UiDialog from './Dialog.vue'
import { setMaxZIndex, isFunc, winScrollLock } from './../../utils'

/**
 * 创建对话框
 * @param {Vue} Vue 
 */
export function createModal(Vue) {
  return {
    create(type, options = {}) {
      winScrollLock.lock()
      let { onOk, onCancel, ...props } = options
      this.instance = new Vue({
        data() {
          return {
            visible: true,
            loading: options.loading,
            isLoading: false,
            zIndex: setMaxZIndex()
          }
        },
        watch: {
          visible(newVal) {
            if (newVal) return
            winScrollLock.unlock()
            this.isLoading = false
          }
        },
        render(h) {
          return this.visible && h('transition', {
            props: { name: 'ui-modal' },
            on: {
              afterLeave: () => this.$destroy()
            }
          }, [
            h(UiDialog, {
              props: { ...props, type, loading: this.isLoading },
              style: { zIndex: this.zIndex },
              on: {
                ok: () => {
                  isFunc(onOk) && onOk()
                  if (this.loading) return this.isLoading = true
                  this.close()
                },
                close: this.close,
                cancel: () => {
                  this.close()
                  isFunc(onCancel) && onCancel()
                },
                leave: () => {
                  console.log('离开啦')
                }
              }
            })
          ])
        },
        methods: {
          close() {
            this.visible = false
          }
        },
        mounted() {
          document.body.appendChild(this.$el)
        },
        beforeDestroy() {
          this.$el.remove()
        }
      }).$mount()
    },
  
    info(options) {
      return this.create('info', options)
    },
  
    success(options) {
      return this.create('success', options)
    },
  
    warning(options) {
      return this.create('warning', options)
    },
  
    error(options) {
      return this.create('error', options)
    },
  
    confirm(options) {
      return this.create('confirm', options)
    },
  
    remove() {
      this.instance && (this.instance.visible = false)
    }
  }
}