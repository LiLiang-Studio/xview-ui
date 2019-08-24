<template>
  <div>
    <div :class="{'ui-affix': fixed}" :style="affixStyle">
      <slot></slot>
    </div>
    <div v-show="fixed" :style="placeholderStyle"></div>
  </div>
</template>
<script>
import { throttle } from '@/tools'
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
  watch: {
    fixed(newVal) {
      this.$emit('on-change', newVal)
    }
  },
  mounted() {
    this.onResize()
    this.throttleScroll = throttle(() => this.onScroll(), 50)
    this.throttleResize = throttle(() => this.onResize(), 50)
    window.addEventListener('scroll', this.throttleScroll)
    window.addEventListener('resize', this.throttleResize)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.throttleScroll)
    window.removeEventListener('resize', this.throttleResize)
  },
  methods: {
    onScroll() {
      let rect = this.$el.getBoundingClientRect()
      this.fixed = this.isFixedBottom ? window.innerHeight - rect.bottom <= this.offsetBottom : rect.top <= this.offsetTop
    },
    onResize() {
      let rect = this.$el.getBoundingClientRect()
      this.placeholderStyle = { width: `${rect.width}px`, height: `${rect.height}px` }
      let obj = this.isFixedBottom ? { bottom: `${this.offsetBottom}px` } : { top: `${this.offsetTop}px` }
      this.affixStyle = { ...obj, left: `${rect.left}px` }
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