<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot></slot>
    </template>
    <div :class="[`${prefix}_body`, {confirm}, popperClass]" :style="bodyStyle" v-clickoutside="onClickoutside">
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
import { clickoutside } from '../../directives'
import { parseSize, isInside } from '../../tools'
const S = String, B = Boolean, NS = [Number, String]
export default {
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
        ref: 'popper',
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
        mousedown() {
          if (_self.listenDownUp) _self.visible = true
        },
        mouseup(e) {
          if (_self.listenDownUp) _self.visible = false
        },
        click(e) {
          const ref = _self.$refs.popper.getReference(), isInput = e.target.tagName.toLowerCase() === 'input'
          if (
            !_self.disabled && isInside(e, ref) &&
            (_self.trigger === 'click' || (_self.trigger === 'focus' && isInput))
          ) _self.visible = true
        }
      }
    }
  },
  directives: { clickoutside },
  watch: {
    visible(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.visible = val
    }
  },
  methods: {
    onClickoutside() {
      this.visible = false
    },
    onCancel() {
      this.visible = false
      this.$emit('on-cancel')
    },
    onOK() {
      this.visible = false
      this.$emit('on-ok')
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
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
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