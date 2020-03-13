<template>
  <div :class="`${prefix}_wrap`">
    <x-overlay v-show="visible" v-if="mask" :style="overlayStyle" @click="onMaskClick"/>
    <transition :name="`${prefix}_${placement}`" @afterLeave="onLeave">
      <div v-show="visible" :class="[prefix, `${prefix}_${placement}`]" :style="boxStyle">
        <span v-if="closable" :class="`${prefix}_close`" @click="close">
          <slot name="close">
            <x-close-icon-button size="31"/>
          </slot>
        </span>
        <header v-if="hasHeader" :class="`${prefix}_header`">
          <slot name="header">{{title}}</slot>
        </header>
        <main :class="`${prefix}_body`">
          <slot></slot>
        </main>
        <footer v-if="hasFooter" :class="`${prefix}_footer`">
          <slot name="footer"></slot>
        </footer>
      </div>
    </transition>
  </div>
</template>
<script>
import XOverlay from '../overlay'
import XCloseIconButton from '../close-icon-button'
import { parseSize, winScrollbarLock, getMaxZIndex } from '../../tools'
export default {
  name: 'XDrawer',
  components: { XOverlay, XCloseIconButton },
  props: {
    value: Boolean,
    title: String,
    width: {
      type: [Number, String],
      default: 256
    },
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskStyle: Object,
    styles: Object,
    scrollable: Boolean,
    placement: {
      default: 'right',
      validator(v) {
        return ['left', 'right'].indexOf(v) !== -1
      }
    },
    transfer: {
      type: Boolean,
      default: true
    },
    inner: Boolean,
    beforeClose: Function
  },
  data() {
    return { zIndex: 1, prefix: 'x-drawer', visible: this.value }
  },
  computed: {
    overlayStyle() {
      let style = { ...this.maskStyle, zIndex: this.zIndex - 1 }
      return this.inner ? { ...style, position: 'absolute' } : style
    },
    boxStyle() {
      let style = { ...this.styles, width: parseSize(this.width), zIndex: this.zIndex }
      return this.inner ? { ...style, position: 'absolute' } : style
    },
    hasHeader() {
      return this.title || this.$slots.header
    },
    hasFooter() {
      return this.$slots.footer
    }
  },
  watch: {
    value(val) {
      this.visible = val
    },
    visible(val) {
      this.$emit('input', val)
      this.$emit('on-visible-change', val)
      if (val) this.onOpen()
    }
  },
  mounted() {
    if (!this.inner && this.transfer) document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.onLeave()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    close() {
      this.beforeClose ? this.beforeClose().then(this.onClose) : this.onClose()
    },
    onClose() {
      this.visible = false
      this.$emit('on-close')
    },
    onOpen() {
      this.zIndex = getMaxZIndex()
      if (this.inner || this.scrollable || winScrollbarLock.locked) return
      winScrollbarLock.lock()
      this.isCallLock = true
    },
    onMaskClick() {
      if (this.maskClosable) this.close()
    },
    onLeave() {
      if (!this.isCallLock) return
      winScrollbarLock.unlock()
      this.isCallLock = false
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: transform .24s ease-in-out;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  &_right {
    right: 0;
    &-enter, &-leave-to {
      transform: translateX(100%);
    }
  }
  &_left {
    left: 0;
    &-enter, &-leave-to {
      transform: translateX(-100%);
    }
  }
  &_close {
    position: absolute;
    top: 8px;
    right: 15px;
  }
  &_header {
    font-size: 16px;
    line-height: 1.5;
    padding: 14px 16px;
    color: @title-color;
    border-bottom: 1px solid @border-color;
  }
  &_body {
    flex: 1;
    padding: 16px;
    overflow: auto;
  }
  &_footer {
    text-align: right;
    padding: 10px 16px;
    border-top: 1px solid @border-color;
  }
}
</style>