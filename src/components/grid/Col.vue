<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '@/tools'
export default {
  props: {
    span: [Number, String],
    order: [Number, String],
    offset: [Number, String],
    push: [Number, String],
    pull: [Number, String],
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object]
  },
  computed: {
    classes() {
      const prefix = 'ui-col'
      let rtnArr = [prefix], arr = ['span', 'order', 'pull', 'push', 'offset']
      arr.forEach(_ => this[_] !== undefined && rtnArr.push(`${prefix}-${_}-${this[_]}`))
      let sizes = ['xs', 'sm', 'md', 'lg']
      sizes.forEach(_ => {
        if (!this[_]) return
        let options = typeof this[_] === 'number' ? { span: this[_] } : this[_]
        for (let key in options) rtnArr.push(`${prefix}-${_}-${key}-${options[key]}`)
      })
      return rtnArr
    },
    styles() {
      let parent = findParent(this, 'UiRow')
      let gutter = parent && parent.gutter, padding = `${gutter / 2}px`
      return gutter && { paddingLeft: padding, paddingRight: padding }
    }
  }
}
</script>
<style lang="less">
.ui-col {
  word-break: break-word;
  &-span-0 {
    display: none;
  }
}
</style>