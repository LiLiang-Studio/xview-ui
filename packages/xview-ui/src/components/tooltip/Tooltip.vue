<template>
  <x-popper v-bind="popperProps" v-on="popperListeners">
    <template v-slot:reference>
      <slot></slot>
    </template>
    <div :class="[`${prefix}_content`, theme]" :style="contentStyle">
      <slot name="content">{{content}}</slot>
    </div>
  </x-popper>
</template>
<script>
import XPopper from '../popper'
import { parseSize } from '../../tools'
const N = Number, B = Boolean, NS = [N, String]
export default {
  name: 'XTooltip',
  components: { XPopper },
  props: {
    content: NS,
    disabled: B,
    delay: { type: N, default: 0 },
    always: B,
    theme: {
      default: 'dark',
      validator(v) {
        return ['dark', 'light'].indexOf(v) > -1
      }
    },
    maxWidth: NS
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
        ...this.$attrs,
        ref: 'popper',
        arrowClass: `${this.prefix}_arrow ${this.theme}`,
        visible: !this.disabled && (this.always || this.visible)
      }
    },
    popperListeners() {
      const _self = this
      return {
        ...this.$listeners,
        mouseenter() {
          if (!_self.disabled) {
            _self.tid = setTimeout(() => _self.visible = true, _self.delay)
          }
        },
        mouseleave() {
          clearTimeout(_self.tid)
          _self.visible = false
        }
      }
    }
  },
  methods: {
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