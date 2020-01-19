<template>
  <div :class="`${prefix}-wrap`">
    <ui-overlay v-show="visible" :style="{zIndex: zIndex - 1}" @click="onMaskClick"/>
    <transition :name="prefix" @afterLeave="onLeave">
      <div :class="prefix" v-show="visible" :style="{zIndex}">
        <div :class="[`${prefix}-content`, className]" :style="contentStyle">
          <span v-if="closable" :class="`${prefix}-close`">
            <slot name="close">
              <ui-close-icon-button :class="`${prefix}-close-icon`" @click="show(false)"/>
            </slot>
          </span>
          <div v-if="hasHeader" :class="`${prefix}-header`">
            <slot name="header">{{title}}</slot>
          </div>
          <div :class="`${prefix}-body`">
            <slot></slot>
          </div>
          <div :class="`${prefix}-footer`">
            <slot name="footer">
              <ui-button @click="cancel">{{cancelText}}</ui-button>
              <ui-button type="primary" :loading="isLoading" @click="ok">{{okText}}</ui-button>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import UiOverlay from '../overlay'
import { Button as UiButton } from '../button'
import UiCloseIconButton from '../close-icon-button'
import { parseSize, winScrollbarLock, getMaxZIndex, isFunc } from '../../tools'
export default {
  name: 'UiModal',
  components: { UiOverlay, UiButton, UiCloseIconButton },
  data() {
    return {
      prefix: 'ui-modal',
      visible: this.value,
      zIndex: 1,
      isLoading: false,
      isCallLock: false
    }
  },
  props: {
    value: Boolean,
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    width: {
      type: [Number, String],
      default: 520
    },
    styles: Object,
    className: String,
    maskClosable: {
      type: Boolean,
      default: true
    },
    onOk: Function,
    onCancel: Function
  },
  computed: {
    contentStyle() {
      return { ...this.styles, width: parseSize(this.width) }
    },
    hasHeader() {
      return this.title || this.$slots.header !== undefined
    }
  },
  watch: {
    value(newval) {
      this.visible = newval
    },
    visible(newval) {
      this.$emit('input', newval)
      this.$emit('on-visible-change', newval)
      if (!newval) return
      this.isLoading = false
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
    cancel() {
      this.$emit('on-cancel')
      isFunc(this.onCancel) && this.onCancel()
      this.show(false)
    },
    ok() {
      this.$emit('on-ok')
      isFunc(this.onOk) && this.onOk()
      if (this.loading) return this.isLoading = true
      this.show(false)
    },
    onLeave() {
      this.$emit('leave')
      if (!this.isCallLock) return
      winScrollbarLock.unlock()
      this.isCallLock = false
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px 16px;
  pointer-events: none;
  transition: all .24s ease-in-out;
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateY(-24px);
  }
  &-content {
    max-width: 100%;
    position: relative;
    top: 15vh;
    margin: 0 auto;
    border-radius: 6px;
    pointer-events: all;
    background-color: #fff;
  }
  &-header {
    font-size: 14px;
    font-weight: bold;
    color: @title-color;
    padding: 14px 16px;
    border-bottom: 1px solid @divider-color;
  }
  &-close {
    position: absolute;
    top: 8px;
    right: 8px;
    min-width: 30px;
    text-align: center;
  }
  &-close-icon {
    font-size: 31px;
  }
  &-body {
    padding: 16px;
  }
  &-footer {
    text-align: right;
    padding: 10px 16px;
    border-top: 1px solid @divider-color;
    button + button {
      margin-left: 8px;
    }
  }
}
</style>