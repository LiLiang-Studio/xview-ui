<template>
  <div v-winresize="throttleResize" v-winscroll="throttleScroll">
    <div :class="{'ui-affix': fixed}" :style="affixStyle">
      <slot></slot>
    </div>
    <div v-show="fixed" :style="placeholderStyle"></div>
  </div>
</template>
<script>
import { throttle } from '../../tools'
export default {
  data() {
    return {
      fixed: false,
      affixStyle: {},
      placeholderStyle: {},
      throttleResize: throttle(() => this.onResize(), 50),
      throttleScroll: throttle(() => this.onScroll(), 50)
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