<template>
  <div :class="['x-anchor-link', {active}]">
    <a :href="href" @click.prevent="onClick">{{title}}</a>
    <slot></slot>
  </div>
</template>
<script>
import { findParent, getOffset } from '../../tools'
export default {
  name: 'XAnchorLink',
  props: {
    href: String,
    title: String,
    scrollOffset: { type: Number, default: 0 }
  },
  data() {
    return { active: false }
  },
  mounted() {
    this.parent = findParent(this, 'XAnchor')
    this.parent.addItem(this)
  },
  beforeDestroy() {
    this.parent.removeItem(this)
  },
  methods: {
    onClick(e) {
      this.parent.$emit('on-select', this.href)
      let el = document.querySelector(this.href)
      if (el) {
        let id = el.id, start = window.scrollY, end = getOffset(el).top
        el.id = ''
        location.hash = this.href
        this[start > end ? 'toTop' : 'toBottom'](start, end, () => el.id = id)
      }
    },
    toTop(start, end, cb) { // start > end
      let ms = 16, step = (start - end) / (300 / ms), current = end + this.scrollOffset
      this.tid = setInterval(() => {
        if (start > current) {
          start -= step
          window.scrollTo(window.scrollX, start)
        } else {
          clearInterval(this.tid)
          this.tid = null
          window.scrollTo(window.scrollX, current)
          cb && cb()
        }
      }, ms)
    },
    toBottom(start, end, cb) { // start < end
      let ms = 16, step = (end - start) / (300 / ms), current = end + this.scrollOffset
      this.tid = setInterval(() => {
        if (start < current) {
          start += step
          window.scrollTo(window.scrollX, start)
        } else {
          clearInterval(this.tid)
          this.tid = null
          window.scrollTo(window.scrollX, current)
          cb && cb()
        }
      }, ms)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-anchor-link {
  line-height: 1;
  padding: 8px 0 8px 16px;
  & & {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  a {
    display: block;
    color: @content-color;
  }
  &.active a, a:hover {
    color: @primary-color;
  }
}
</style>