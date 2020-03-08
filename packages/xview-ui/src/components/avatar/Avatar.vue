<template>
  <span :class="classes" :style="styles">
    <img v-if="src" :src="src">
    <x-icon v-else-if="icon || customIcon" :type="icon" :custom="customIcon"/>
    <span v-else ref="textBox" :style="textStyle">
      <slot>{{text}}</slot>
    </span>
  </span>
</template>
<script>
import XIcon from '../icon'
export default {
  name: 'XAvatar',
  components: { XIcon },
  props: {
    shape: {
      default: 'circle',
      validator(v) {
        return ['circle', 'square'].indexOf(v) !== -1
      }
    },
    size: [String, Number],
    src: String,
    icon: String,
    customIcon: String,
    text: String
  },
  data() {
    return { prefix: 'x-avatar', textStyle: null }
  },
  computed: {
    classes() {
      let { prefix, shape, size, icon } = this
      return [prefix, `${prefix}_${shape}`, size && `${prefix}_${size}`, { isIcon: icon }]
    },
    styles() {
      let size = parseInt(this.size)
      return isNaN(size) ? {} : { width: `${size}px`, height: `${size}px`, fontSize: `${size / 2}px` }
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(val) {
        if (this.src || this.icon || this.customIcon) return
        this.$nextTick(() => {
          let width = this.$el.offsetWidth,
            textWidth = this.$refs.textBox.offsetWidth
          this.textStyle = {
            transform: `scale(${width - 8 < textWidth ? (width - 8) / textWidth : 1})`
          }
        })
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-avatar {
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  color: #fff;
  background-color: #ccc;
  width: @size-normal;
  height: @size-normal;
  border-radius: 50%;
  font-size: 14px;
  &.isIcon {
    font-size: 18px;
  }
  &_square {
    border-radius: 4px;
  }
  &_small {
    width: @size-small;
    height: @size-small;
    &.isIcon {
      font-size: 14px;
    }
  }
  &_large {
    width: @size-large;
    height: @size-large;
    &.isIcon {
      font-size: 24px;
    }
  }
  img {
    width: inherit;
    height: inherit;
  }
}
</style>