<template>
  <div>
    <x-overlay v-if="mask && !fullscreen" v-show="visible" :style="{zIndex}" @click="onMaskClose"/>
    <transition :name="prefix" @afterLeave="onLeave">
      <div :class="classes" v-show="visible" :style="{zIndex}">
        <div :class="[`${prefix}_content`, {noMask: !mask}]" :style="dialogStyle">
          <span v-if="closable" :class="`${prefix}_close`">
            <slot name="close">
              <x-close-icon-button size="31" @click="hide"/>
            </slot>
          </span>
          <div v-if="title || $slots.header" :class="`${prefix}_header`">
            <slot name="header"><div v-html="title"></div></slot>
          </div>
          <div :class="`${prefix}_body`"><slot></slot></div>
          <div v-if="!footerHide" :class="`${prefix}_footer`">
            <slot name="footer">
              <x-btn v-if="hasCancel" type="text" @click="onCancel">{{cancelText}}</x-btn>
              <x-btn type="primary" :loading="isLoading" @click="onOk">{{okText}}</x-btn>
            </slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import XBtn from '../button'
import XOverlay from '../overlay'
import XCloseIconButton from '../close-icon-button'
import { parseSize, winScrollbarLock, getMaxZIndex } from '../../tools'
const S = String, B = Boolean, BTrue = { type: B, default: true }
export default {
  name: 'XModal',
  components: { XOverlay, XBtn, XCloseIconButton },
  props: {
    value: B,
    title: S,
    closable: BTrue,
    maskClosable: BTrue,
    loading: B,
    scrollable: B,
    fullscreen: B,
    mask: BTrue,
    okText: { type: S, default: '确定' },
    cancelText: { type: S, default: '取消' },
    width: { type: [Number, S], default: 520 },
    footerHide: B,
    styles: Object,
    className: S,
    transfer: BTrue,
    hasCancel: BTrue
  },
  data() {
    return { prefix: 'x-modal', visible: false, zIndex: 1, isLoading: false, isCallLock: false }
  },
  computed: {
    classes() {
      return [this.prefix, this.className, { fullscreen: this.fullscreen }]
    },
    dialogStyle() {
      return this.fullscreen ? this.styles : { ...this.styles, width: parseSize(this.width) }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.visible = val
      }
    },
    visible(val) {
      this.$emit('input', val)
      this.$emit('on-visible-change', val)
      if (val) {
        this.isLoading = false
        this.zIndex = getMaxZIndex()
        if (winScrollbarLock.locked || this.scrollable) return
        winScrollbarLock.lock()
        this.isCallLock = true
      }
    }
  },
  mounted() {
    this.transfer && document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.onLeave()
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  },
  methods: {
    hide() {
      this.visible = false
    },
    onMaskClose() {
      if (this.maskClosable) this.hide()
    },
    onCancel() {
      this.hide()
      this.$emit('on-cancel')
    },
    onOk() {
      this.$emit('on-ok')
      if (this.loading) return this.isLoading = true
      this.hide()
    },
    onLeave() {
      this.$emit('leave')
      if (this.isCallLock) {
        winScrollbarLock.unlock()
        this.isCallLock = false
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@modal: .x-modal;
@{modal} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 12px;
  pointer-events: none;
  transition: all .24s ease;
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateY(-24px);
  }
  &_content {
    max-width: 100%;
    position: relative;
    top: 15vh;
    margin: 0 auto;
    border-radius: 6px;
    pointer-events: all;
    background: #fff;
    &.noMask {
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
    }
  }
  &_header {
    font-size: 16px;
    font-weight: bold;
    color: @title-color;
    padding: 14px 16px;
    border-bottom: 1px solid @divider-color;
  }
  &_close {
    position: absolute;
    top: 8px;
    right: 8px;
    min-width: 30px;
    text-align: center;
  }
  &_body {
    padding: 16px;
  }
  &_footer {
    text-align: right;
    padding: 10px 16px;
    border-top: 1px solid @divider-color;
  }
  &.fullscreen {
    padding: 0;
    @{modal}_content {
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 0;
      display: flex;
      flex-direction: column;
    }
    @{modal}_body {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>