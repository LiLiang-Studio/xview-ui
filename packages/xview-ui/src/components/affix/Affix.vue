<template>
  <div v-winresize="onResize()" v-winscroll="onScroll()">
    <div :class="{'ui-affix': fixed}" :style="affixStyle">
      <slot></slot>
    </div>
    <div v-show="fixed" :style="placeholderStyle"></div>
  </div>
</template>
<script>
import { throttle } from '../../tools'
import { winresize, winscroll } from '../../directives'
export default {
  data() {
    return {
      fixed: false,
      affixStyle: {},
      placeholderStyle: {}
    }
  },
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number
  },
  computed: {
    isFixedBottom() {
      return this.offsetBottom !== undefined && this.offsetTop === 0
    }
  },
  directives: {
    winresize,
    winscroll
  },
  watch: {
    fixed(newVal) {
      this.$emit('on-change', newVal)
    }
  },
  mounted() {
    this.onResize()()
  },
  methods: {
    onScroll() {
      return throttle(() => {
        let rect = this.$el.getBoundingClientRect()
        this.fixed = this.isFixedBottom ? window.innerHeight - rect.bottom <= this.offsetBottom : rect.top <= this.offsetTop
      }, 50)
    },
    onResize() {
      return throttle(() => {
        let rect = this.$el.getBoundingClientRect()
        this.placeholderStyle = { width: `${rect.width}px`, height: `${rect.height}px` }
        let obj = this.isFixedBottom ? { bottom: `${this.offsetBottom}px` } : { top: `${this.offsetTop}px` }
        this.affixStyle = { ...obj, left: `${rect.left}px` }
      }, 50)
    }
  }
}
</script>
<style lang="less">
.ui-affix {
  position: fixed;
  z-index: 10;
}
</style>