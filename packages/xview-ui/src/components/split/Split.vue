<template>
  <div :class="[prefix, `${prefix}_${mode}`]">
    <template v-if="isHor">
      <div :style="paneStyle"><slot name="left"></slot></div>
      <div ref="trigger" @mousedown="onMousedown">
        <slot name="trigger">
          <div :class="[`${prefix}_triggerBar`, mode]">
            <i v-for="i in 8" :key="i"></i>
          </div>
        </slot>
      </div>
      <div :class="`${prefix}_right`"><slot name="right"></slot></div>
    </template>
    <template v-else>
      <div :style="paneStyle"><slot name="top"></slot></div>
      <div ref="trigger" @mousedown="onMousedown">
        <slot name="trigger">
          <div :class="[`${prefix}_triggerBar`, mode]">
            <i v-for="i in 8" :key="i"></i>
          </div>
        </slot>
      </div>
      <div :class="`${prefix}_bottom`"><slot name="bottom"></slot></div>
    </template>
  </div>
</template>
<script>
export default {
  name: 'XSplit',
  props: {
    value: {
      type: [Number, String],
      default: .5
    },
    mode: {
      default: 'horizontal',
      validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) !== -1
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
  data() {
    return { prefix: 'x_split', paneStyle: {}, inputValue: this.value }
  },
  computed: {
    isHor() {
      return this.mode === 'horizontal'
    },
    bodyClass() {
      return [`${this.prefix}_disSelection`, this.mode]
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    this.updatePaneStyle()
  },
  methods: {
    onMousedown(e) {
      this.initValue = this.inputValue
      this.offset = this.isHor ? e.pageX : e.pageY
      document.body.classList.add(...this.bodyClass)
      document.addEventListener('mousemove', this.onMousemove)
      document.addEventListener('mouseup', this.onMouseup)
      this.$emit('on-move-start')
    },
    onMousemove(e) {
      let minVal, maxVal, value
      let { offsetWidth: width, offsetHeight: height } = this.$el
      if (this.isHor) {
        let triggerSize = this.$refs.trigger.offsetWidth / width
        minVal = isNaN(this.min) ? parseInt(this.min) / width : this.min
        maxVal = (isNaN(this.max) ? (width - parseInt(this.max)) / width : this.max) - triggerSize
        value = this.initValue + (e.pageX - this.offset) / width
      } else {
        let triggerSize = this.$refs.trigger.offsetHeight / height
        minVal = isNaN(this.min) ? parseInt(this.min) / height : this.min
        maxVal = (isNaN(this.max) ? (height - parseInt(this.max)) / height : this.max) - triggerSize
        value = this.initValue + (e.pageY - this.offset) / height
      }
      this.inputValue = Math.min(Math.max(minVal, value), maxVal)
      this.updatePaneStyle()
      this.$emit('on-moving', e)
    },
    onMouseup(e) {
      document.body.classList.remove(...this.bodyClass)
      document.removeEventListener('mousemove', this.onMousemove)
      document.removeEventListener('mouseup', this.onMouseup)
      this.$emit('on-move-end')
    },
    updatePaneStyle() {
      let size = this.inputValue
      if (isNaN(size)) size = this.isHor ? parseInt(size) / this.$el.offsetWidth : parseInt(size) / this.$el.offsetHeight
      size = `${size * 100}%`
      this.paneStyle = this.isHor ? { width: size } : { height: size }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x_split {
  height: 100%;
  display: flex;
  align-items: stretch;
  &_vertical {
    flex-direction: column;
  }
  &_right, &_bottom {
    flex: 1;
  }
  &_triggerBar {
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
  &_disSelection {
    user-select: none;
    cursor: col-resize;
    &.vertical {
      cursor: row-resize;
    }
  }
}
</style>