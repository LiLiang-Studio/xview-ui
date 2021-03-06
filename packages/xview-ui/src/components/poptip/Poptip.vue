<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot></slot>
    </template>
    <div :class="[`${prefix}_body`, {confirm}, popperClass]" :style="bodyStyle">
      <div v-if="showTitle" :class="`${prefix}_title`" :style="contentStyle">
        <x-icon v-if="confirm" :class="`${prefix}_icon`" type="help-circled"/>
        <slot name="title">{{title}}</slot>
      </div>
      <div v-if="showContent" :class="`${prefix}_content`" :style="contentStyle">
        <slot name="content">{{content}}</slot>
      </div>
      <div v-if="confirm" :class="`${prefix}_actions`">
        <x-btn type="text" size="small" @click="onCancel">{{cancelText}}</x-btn>
        <x-btn type="primary" size="small" @click="onOK">{{okText}}</x-btn>
      </div>
    </div>
  </x-popper>
</template>
<script>
import XIcon from '../icon'
import XBtn from '../button'
import XPopper from '../popper'
import { parseSize } from '../../tools'
const S = String, B = Boolean, NS = [Number, String]
export default {
  name: 'XPoptip',
  components: { XIcon, XBtn, XPopper },
  props: {
    trigger: {
      default: 'click',
      validator(v) {
        return ['hover', 'click', 'focus'].indexOf(v) > -1
      }
    },
    title: NS,
    content: NS,
    width: NS,
    confirm: B,
    disabled: B,
    okText: { type: S, default: '确定' },
    cancelText: { type: S, default: '取消' },
    popperClass: S,
    padding: { type: S, default: '8px 16px' },
    value: B
  },
  data() {
    return { visible: this.value, prefix: 'x-poptip' }
  },
  computed: {
    showTitle() {
      return this.title || this.$slots.title
    },
    showContent() {
      return !this.confirm && (this.content || this.$slots.content)
    },
    bodyStyle() {
      return this.width && { width: parseSize(this.width) }
    },
    contentStyle() {
      return !this.confirm && { padding: this.padding }
    },
    popperProps() {
      return {
        placement: 'top',
        ...this.$attrs,
        hasArrow: true,
        visible: !this.disabled && this.visible
      }
    },
    listenHover() {
      return !this.disabled && !this.confirm && this.trigger === 'hover'
    },
    listenDownUp() {
      return !this.disabled && !this.confirm && this.trigger === 'focus'
    },
    popperListeners() {
      const _self = this
      return {
        ...this.$listeners,
        mouseenter() {
          if (_self.listenHover) _self.visible = true
        },
        mouseleave() {
          if (_self.listenHover) _self.visible = false
        },
        mousedown(e) {
          if (_self.listenDownUp && !_self.getTarget(e).isDisabledInput) _self.visible = true
        },
        mouseup(e) {
          let target = _self.getTarget(e)
          if (_self.listenDownUp && (!target.isInput || target.disabled)) _self.visible = false
        },
        'ref-click'(e) {
          if (!_self.disabled && _self.trigger === 'click' && !_self.getTarget(e).isDisabledInput) _self.visible = true
        },
        clickoutside() {
          _self.visible = false
        }
      }
    }
  },
  watch: {
    visible(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.visible = val
    }
  },
  methods: {
    onCancel() {
      this.visible = false
      this.$emit('on-cancel')
    },
    onOK() {
      this.visible = false
      this.$emit('on-ok')
    },
    getTarget(e) {
      let tar = e.target, { disabled } = tar, isInput = tar.tagName.toLowerCase() === 'input'
      return { disabled, isInput, isDisabledInput: isInput && disabled }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-poptip;
@{prefix} {
  &_body {
    min-width: 150px;
    &.confirm {
      max-width: 300px;
      @{prefix}_title {
        padding: 16px 16px 8px;
        &:after {
          border-bottom: none;
        }
      }
    }
  }
  &_title {
    position: relative;
    color: @title-color;
    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 8px;
      right: 8px;
      bottom: 0;
      border-bottom: 1px solid @divider-color;
    }
  }
  &_content {
    color: @content-color;
  }
  &_actions {
    text-align: right;
    padding: 8px 16px 16px;
  }
  &_icon {
    color: @warning-color;
    margin-right: 4px;
    font-size: 16px;
  }
}
</style>