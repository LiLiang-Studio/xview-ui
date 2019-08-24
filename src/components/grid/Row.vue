<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiRow',
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
    }
  },
  computed: {
    classes() {
      let prefix = 'ui-row', { align, justify, gutter } = this
      return [prefix, align && `${prefix}-${align}`, justify && `${prefix}-${justify}`, { gutter }].filter(_ => _)
    },
    styles() {
      return this.gutter && { margin: `0 -${this.gutter / 2}px` }
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