<template>
  <div :class="[prefix, mode]">
    <template v-if="isHor">
      <div :class="`${prefix}-left`" :style="paneStyle">
        <slot name="left"></slot>
      </div>
      <div ref="Trigger" :class="[`${prefix}-trigger`, mode]" @mousedown="onMousedown">
        <slot name="trigger">
          <div :class="[`${prefix}-trigger-bar`, mode]">
            <i v-for="i in 8" :key="i"></i>
          </div>
        </slot>
      </div>
      <div :class="`${prefix}-right`">
        <slot name="right"></slot>
      </div>
    </template>
    <template v-else>
      <div :class="`${prefix}-top`" :style="paneStyle">
        <slot name="top"></slot>
      </div>
      <div ref="Trigger" :class="[`${prefix}-trigger`, mode]" @mousedown="onMousedown">
        <slot name="trigger">
          <div :class="[`${prefix}-trigger-bar`, mode]">
            <i v-for="i in 8" :key="i"></i>
          </div>
        </slot>
      </div>
      <div :class="`${prefix}-bottom`">
        <slot name="bottom"></slot>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'UiSplit',
  data() {
    return { prefix: 'ui-split', paneStyle: {}, inputValue: this.value }
  },
  props: {
    value: {
      type: [Number, String],
      default: .5
    },
    mode: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    min: {
      type: [Number, String],
      default: '40px'
    },
    max: {
      type: [Number, String],
      default: '40px'
    }
  },
  computed: {
    isHor() {
      return this.mode === 'horizontal'
    }
  },
  watch: {
    value(newval) {
      this.inputValue = newval
    },
    inputValue(newval) {
      this.$emit('input', newval)
    }
  },
  mounted() {
    this.updatePaneStyle()
  },
  methods: {
    onMousedown(e) {
      this.initValue = this.inputValue
      this.offset = this.isHor ? e.pageX : e.pageY
      document.body.classList.add('ui-disable-selection')
      document.addEventListener('mousemove', this.onMousemove)
      document.addEventListener('mouseup', this.onMouseup)
      this.$emit('on-move-start')
    },
    onMousemove(e) {
      let minVal, maxVal, value
      let { offsetWidth: width, offsetHeight: height } = this.$el
      if (this.isHor) {
        let triggerSize = this.$refs.Trigger.offsetWidth / width
        minVal = isNaN(this.min) ? parseInt(this.min) / width : this.min
        maxVal = (isNaN(this.max) ? (width - parseInt(this.max)) / width : this.max) - triggerSize
        value = this.initValue + (e.pageX - this.offset) / width
      } else {
        let triggerSize = this.$refs.Trigger.offsetHeight / height
        minVal = isNaN(this.min) ? parseInt(this.min) / height : this.min
        maxVal = (isNaN(this.max) ? (height - parseInt(this.max)) / height : this.max) - triggerSize
        value = this.initValue + (e.pageY - this.offset) / height
      }
      this.inputValue = Math.min(Math.max(minVal, value), maxVal)
      this.updatePaneStyle()
      this.$emit('on-moving', e)
    },
    onMouseup(e) {
      document.body.classList.remove('ui-disable-selection')
      document.removeEventListener('mousemove', this.onMousemove)
      document.removeEventListener('mouseup', this.onMouseup)
      this.$emit('on-move-end')
    },
    updatePaneStyle() {
      let size = this.inputValue
      if (typeof size === 'string') {
        if (this.isHor) {
          size = parseInt(size) / this.$el.offsetWidth
        } else {
          size = parseInt(size) / this.$el.offsetHeight
        }
      }
      size = `${size * 100}%`
      this.paneStyle = this.isHor ? { width: size } : { height: size }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-split {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  &-trigger-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: @bg-color;
    border: 1px solid @border-color;
    i {
      background-color: fade(@title-color, 25%);
    }
    &.horizontal {
      width: 6px;
      height: 100%;
      border-width: 0 1px;
      cursor: col-resize;
      flex-direction: column;
      i {
        width: 100%;
        height: 1px;
        margin-top: 3px;
      }
    }
    &.vertical {
      width: 100%;
      height: 6px;
      border-width: 1px 0;
      cursor: row-resize;
      i {
        width: 1px;
        height: 100%;
        margin-right: 3px;
      }
    }
  }
  &.vertical {
    flex-direction: column;
  }
  &-right {
    flex: 1;
    width: 0;
  }
  &-bottom {
    flex: 1;
    height: 0;
  }
}
</style>