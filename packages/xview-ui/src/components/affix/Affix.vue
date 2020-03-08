<template>
  <div v-winresize="onResize()" v-winscroll="onScroll()">
    <div :class="{'x-affix': fixed}" :style="affixStyle">
      <slot></slot>
    </div>
    <div v-show="fixed" :style="placeholderStyle"></div>
  </div>
</template>
<script>
import { throttle } from '../../tools'
import { winresize, winscroll } from '../../directives'
export default {
  name: 'XAffix',
  props: {
    offsetTop: {
      type: Number,
      default: 0
    },
    offsetBottom: Number
  },
  data() {
    return {
      fixed: false,
      affixStyle: {},
      placeholderStyle: {}
    }
  },
  computed: {
    fixedBottom() {
      return this.offsetBottom !== undefined && this.offsetTop === 0
    }
  },
  directives: { winresize, winscroll },
  watch: {
    fixed(val) {
      this.$emit('on-change', val)
    }
  },
  mounted() {
    this.onResize()()
  },
  methods: {
    onScroll() {
      return throttle(() => {
        let rect = this.$el.getBoundingClientRect()
        this.fixed = this.fixedBottom ? window.innerHeight - rect.bottom <= this.offsetBottom : rect.top <= this.offsetTop
      }, 50)
    },
    onResize() {
      return throttle(() => {
        let rect = this.$el.getBoundingClientRect()
        this.placeholderStyle = { width: `${rect.width}px`, height: `${rect.height}px` }
        let obj = this.fixedBottom ? { bottom: `${this.offsetBottom}px` } : { top: `${this.offsetTop}px` }
        this.affixStyle = { ...obj, left: `${rect.left}px` }
      }, 50)
    }
  }
}
</script>
<style lang="less">
.x-affix {
  position: fixed;
  z-index: 10;
}
</style>