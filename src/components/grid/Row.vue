<template>
  <div class="ui-row" :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
const prefix = 'ui-row'
export default {
  name: prefix,
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    align: {
      validator(value) {
        return ['top', 'middle', 'bottom'].indexOf(value) !== -1
      }
    },
    justify: {
      validator(value) {
        return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(value) !== -1
      }
    },
    className: String
  },
  computed: {
    classes() {
      let arr = [this.className, { gutter: this.gutter }]
      if (this.align) arr.push(`${prefix}-${this.align}`)
      if (this.justify) arr.push(`${prefix}-${this.justify}`)
      return arr
    },
    styles() {
      let margin = `-${this.gutter / 2}px`
      return this.gutter ? { marginLeft: margin, marginRight: margin } : {}
    }
  }
}
</script>
<style lang="less">
.ui-row {
  display: flex;
  &-top {
    align-items: flex-start;
  }
  &-middle {
    align-items: center;
  }
  &-bottom {
    align-items: flex-end;
  }
  &-start {
    justify-content: flex-start;
  }
  &-end {
    justify-content: flex-end;
  }
  &-center {
    justify-content: center;
  }
  &-space-around {
    justify-content: space-around;
  }
  &-space-between {
    justify-content: space-between;
  }
}
</style>