<template>
  <div class="ui-col" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
const prefix = 'ui-col'
import { findParentByName } from './../../utils'
export default {
  props: {
    span: [Number, String],
    order: [Number, String],
    offset: [Number, String],
    push: [Number, String],
    pull: [Number, String],
    className: String,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object]
  },
  computed: {
    classes() {
      let rtnArr = [], arr = ['span', 'order', 'pull', 'push', 'offset']
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
      let { gutter } = findParentByName(this, 'ui-row'), padding = `${gutter / 2}px`
      return gutter ? { paddingLeft: padding, paddingRight: padding } : {}
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-col {
  position: relative;
  word-break: break-word;
  &-span-0 {
    display: none;
  }
  .gen-col();
  .gen-col(@n: 1) when (@n < 25) {
    @val: @n / 24 * 100%;
    &-span-@{n} {
      width: @val;
    }
    &-order-@{n} {
      order: @n;
    }
    &-pull-@{n} {
      right: @val;
    }
    &-push-@{n} {
      left: @val;
    }
    &-offset-@{n} {
      margin-left: @val;
    }
    .gen-col(@n + 1);
  }
  .gen-grid(24, xs);
  @media (min-width: @screen-sm-min) {
    .gen-grid(24, sm);
  }
  @media (min-width: @screen-md-min) {
    .gen-grid(24, md);
  }
  @media (min-width: @screen-lg-min) {
    .gen-grid(24, lg);
  }
  .gen-grid(@n: 24, @size) when (@n > 0) {
    @val: @n / 24 * 100%;
    &-@{size}-span-@{n} {
      width: @val;
    }
    &-@{size}-order-@{n} {
      order: @n;
    }
    &-@{size}-pull-@{n} {
      right: @val;
    }
    &-@{size}-push-@{n} {
      left: @val;
    }
    &-@{size}-offset-@{n} {
      margin-left: @val;
    }
    .gen-grid(@n - 1, @size);
  }
  .gen-grid(@n, @size) when (@n = 0) {
    &-@{size}-span-@{n} {
      display: none;
    }
  }
}
</style>