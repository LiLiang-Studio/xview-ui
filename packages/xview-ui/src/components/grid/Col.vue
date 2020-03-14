<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '../../tools'
const N = Number, NS = [N, String], NO = [N, Object]
export default {
  name: 'XCol',
  props: {
    xs: NO, sm: NO, md: NO, lg: NO, xl: NO, xxl: NO,
    span: NS, order: NS, offset: NS, push: NS, pull: NS
  },
  computed: {
    classes() {
      let prefix = 'x-col', classes = [prefix]
      !['span', 'order', 'pull', 'push', 'offset'].forEach(_ => {
        this[_] !== undefined && classes.push(`${prefix}-${_}-${this[_]}`)
      })
      let sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
      sizes.forEach(_ => {
        if (!this[_]) return
        let options = typeof this[_] === 'number' ? { span: this[_] } : this[_]
        for (let key in options) classes.push(`${prefix}-${_}-${key}-${options[key]}`)
      })
      return classes
    },
    styles() {
      let parent = findParent(this, 'XRow')
      let gutter = parent && parent.gutter, padding = `${gutter / 2}px`
      return gutter && { paddingLeft: padding, paddingRight: padding }
    }
  }
}
</script>
<style lang="less">
.x-col {
  position: relative;
  word-break: break-word;
}
</style>