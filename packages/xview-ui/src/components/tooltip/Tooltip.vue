<template>
  <x-popper v-bind="popperProps" @mouseenter.native="onMouseenter" @mouseleave.native="onMouseleave">
    <template v-slot:reference>
      <slot></slot>
    </template>
    <div :class="[`${prefix}_content`, theme]" :style="contentStyle">
      <slot name="content">{{content}}</slot>
    </div>
  </x-popper>
</template>
<script>
import { parseSize } from '../../tools'
import XPopper from '../popper/Index.vue'
const N = Number, B = Boolean, NS = [N, String]
export default {
  name: 'XTooltip',
  components: { XPopper },
  props: {
    content: NS,
    placement: String,
    disabled: B,
    delay: { type: N, default: 0 },
    always: B,
    theme: {
      default: 'dark',
      validator(v) {
        return ['dark', 'light'].indexOf(v) > -1
      }
    },
    maxWidth: NS,
    offset: N,
    transfer: B,
    options: Object
  },
  data() {
    return { visible: false, prefix: 'x-tooltip' }
  },
  computed: {
    contentStyle() {
      return { maxWidth: parseSize(this.maxWidth) }
    },
    popperProps() {
      return {
        ref: 'popper',
        offset: this.offset,
        options: this.options,
        transfer: this.transfer,
        placement: this.placement,
        arrowClass: `${this.prefix}_arrow ${this.theme}`,
        visible: !this.disabled && (this.always || this.visible)
      }
    }
  },
  methods: {
    onMouseenter() {
      if (this.disabled) return
      this.tid = setTimeout(() => {
        this.visible = true
        this.$emit('on-popper-show')
      }, this.delay)
    },
    onMouseleave() {
      clearTimeout(this.tid)
      this.visible = false
      this.$emit('on-popper-hide')
    },
    updatePosition() {
      this.$refs.popper.update()
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-tooltip {
  &_content {
    max-width: 500px;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
    &.dark {
      color: #fff;
      background: @content-color;
    }
  }
  &_arrow {
    &.dark:before {
      border-color: @content-color;
      background: @content-color;
    }
  }
}
</style>