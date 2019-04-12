<template>
<transition :name="transitionName">
  <div class="ui-popper" v-show="visible" :data-dir="placement" :class="{hasArrow}" :style="{...styles, zIndex}">
    <slot></slot>
    <span v-if="hasArrow" class="ui-popper-arrow" :class="placement"></span>
  </div>
</transition>
</template>
<script>
import { setMaxZIndex, getOffset } from './../../utils'
export default {
  data() {
    return { zIndex: 0, styles: {} }
  },
  props: {
    placement: {
      default: 'bottom',
      validator(value) {
        return [
          'top', 'top-start', 'top-end',
          'right', 'right-start', 'right-end',
          'bottom', 'bottom-start', 'bottom-end',
          'left', 'left-start', 'left-end'
        ].indexOf(value) !== -1
      }
    },
    visible: Boolean,
    transitionName: {
      type: String,
      default: 'ui-fade'
    },
    hasArrow: Boolean
  },
  watch: {
    visible() {
      this.updatePosition()
    }
  },
  methods: {
    /**
     * 获取挂载元素位置
     */
    setPosition() {
      // 挂载元素尺寸
      let { offsetHeight: oh, offsetWidth: ow } = this.$el
      // 父组件挂载元素位置和尺寸
      let parentEl = this.$parent.$el
      let { top: t, right: r, bottom: b, left: l, width: w, height: h } = getOffset(parentEl)
      let pos = {}, { placement } = this
      // 如果是顶部和底部 那么top一样；如果是右边和左边 那么left一样
      if (placement.startsWith('top')) {
        pos.top = `${t - oh}px`
      } else if (placement.startsWith('right')) {
        pos.left = `${r}px`
      } else if (placement.startsWith('bottom')) {
        pos.top = `${b}px`
      } else if (placement.startsWith('left')) {
        pos.left = `${l - ow}px`
      }

      if (['top', 'bottom'].indexOf(placement) !== -1) {
        pos.left = `${l - (ow - w) / 2}px`
      } else if (['top-start', 'bottom-start'].indexOf(placement) !== -1) {
        pos.left = `${l}px`
      } else if (['top-end', 'bottom-end'].indexOf(placement) !== -1) {
        pos.left = `${r - ow}px`
      } else if (['right', 'left'].indexOf(placement) !== -1) {
        pos.top = `${t - (oh - h) / 2}px`
      } else if (['right-start', 'left-start'].indexOf(placement) !== -1) {
        pos.top = `${t}px`
      } else if (['right-end', 'left-end'].indexOf(placement) !== -1) {
        pos.top = `${b - oh}px`
      }
      this.styles = pos
    },
    updatePosition() {
      if (!this.visible) return
      this.zIndex = setMaxZIndex()
      this.$nextTick(this.setPosition)
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
    this.updatePosition()
  },
  beforeDestroy() {
    this.$el.parentNode && this.$el.parentNode.removeChild(this.$el)
  }
}
</script>
<style lang="less">
.ui-popper {
  position: absolute;
  &.hasArrow {
    &[data-dir^=top] {
      padding: 5px 0 8px;
    }
    &[data-dir^=right] {
      padding: 0 5px 0 8px;
    }
    &[data-dir^=bottom] {
      padding: 8px 0 5px;
    }
    &[data-dir^=left] {
      padding: 0 8px 0 5px;
    }
  }
}

.ui-popper-arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent;
  &.top, &.top-start, &.top-end {
    bottom: 3px;
    border-width: 5px 5px 0;
    border-top-color: fade(@content-color, 96%);
  }
  &.right, &.right-start, &.right-end {
    left: 3px;
    border-width: 5px 5px 5px 0;
    border-right-color: fade(@content-color, 96%);
  }
  &.bottom, &.bottom-start, &.bottom-end {
    top: 3px;
    border-width: 0 5px 5px;
    border-bottom-color: fade(@content-color, 96%);
  }
  &.left, &.left-start, &.left-end {
    right: 3px;
    border-width: 5px 0 5px 5px;
    border-left-color: fade(@content-color, 96%);
  }
  &.top, &.bottom {
    left: 50%;
    margin-left: -5px;
  }
  &.top-start, &.bottom-start {
    left: 16px;
  }
  &.top-end, &.bottom-end {
    right: 16px;
  }
  &.right, &.left {
    top: 50%;
    margin-top: -5px;
  }
  &.right-start, &.left-start {
    top: 8px;
  }
  &.right-end, &.left-end {
    bottom: 8px;
  }
}
</style>