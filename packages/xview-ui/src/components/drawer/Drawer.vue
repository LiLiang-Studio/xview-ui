<template>
  <div :class="`${prefix}-wrap`">
    <ui-overlay v-show="visible" v-if="mask" :style="overlayStyle" @click="onMaskClick"/>
    <transition :name="`${prefix}-${placement}`" @afterLeave="onLeave">
      <div v-show="visible" :class="[prefix, `${prefix}-${placement}`]" :style="contentStyle">
        <span v-if="closable" :class="`${prefix}-close`" @click="show(false)">
          <slot name="close">
            <ui-close-icon-button :class="`${prefix}-close-icon`"/>
          </slot>
        </span>
        <header v-if="hasHeader" :class="`${prefix}-header`">
          <slot name="header">{{title}}</slot>
        </header>
        <main :class="`${prefix}-body`">
          <slot></slot>
        </main>
        <footer v-if="hasFooter" :class="`${prefix}-footer`">
          <slot name="footer"></slot>
        </footer>
      </div>
    </transition>
  </div>
</template>
<script>
import UiOverlay from '../overlay'
import UiCloseIconButton from '../close-icon-button'
import { parseSize, winScrollbarLock, getMaxZIndex } from '../../tools'
export default {
  name: 'UiDrawer',
  components: { UiOverlay, UiCloseIconButton },
  data() {
    return { prefix: 'ui-drawer', visible: this.value, zIndex: 1, isCallLock: false }
  },
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
    placement: {
      default: 'right',
      validator(value) {
        return ['left', 'right'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    overlayStyle() {
      return { ...this.maskStyle, zIndex: this.zIndex - 1 }
    },
    contentStyle() {
      return { ...this.styles, width: parseSize(this.width), zIndex: this.zIndex }
    },
    hasHeader() {
      return this.title || this.$slots.header !== undefined
    },
    hasFooter() {
      return this.$slots.footer !== undefined
    }
  },
  watch: {
    value(newval) {
      this.visible = newval
    },
    visible(newval) {
      this.$emit('input', newval)
      if (!newval) return
      this.zIndex = getMaxZIndex()
      if (winScrollbarLock.locked) return
      winScrollbarLock.lock()
      this.isCallLock = true
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.onLeave()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    show(visible = true) {
      this.visible = visible
    },
    onMaskClick() {
      if (this.maskClosable) this.show(false)
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
.ui-drawer {
  position: fixed;
  top: 0;
  bottom: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  transition: transform .3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  &-right {
    right: 0;
  }
  &-left {
    left: 0;
  }
  &-left-enter, &-left-leave-to {
    transform: translateX(-100%);
  }
  &-right-enter, &-right-leave-to {
    transform: translateX(100%);
  }
  &-close {
    position: absolute;
    top: 8px;
    right: 8px;
  }
  &-close-icon {
    width: 30px;
    text-align: center;
    font-size: 31px;
  }
  &-header {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.5;
    padding: 14px 16px;
    border-bottom: 1px solid @border-color;
  }
  &-body {
    flex: 1;
    height: 0;
    padding: 16px;
    overflow: auto;
  }
  &-footer {
    text-align: right;
    padding: 10px 16px;
    border-top: 1px solid @border-color;
  }
}
</style>