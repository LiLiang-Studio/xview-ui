<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'XRow',
  props: {
    gutter: {
      type: Number,
      default: 0
    },
    align: {
      validator(v) {
        return ['top', 'middle', 'bottom'].indexOf(v) !== -1
      }
    },
    justify: {
      validator(v) {
        return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(v) !== -1
      }
    }
  },
  computed: {
    classes() {
      let prefix = 'x-row', { align, justify, gutter } = this
      return [prefix, align && `${prefix}_${align}`, justify && `${prefix}_${justify}`, { gutter }]
    },
    styles() {
      return this.gutter && { margin: `0 -${this.gutter / 2}px` }
    }
  }
}
</script>
<style lang="less">
.x-row {
  display: flex;
  &_top {
    align-items: flex-start;
  }
  &_middle {
    align-items: center;
  }
  &_bottom {
    align-items: flex-end;
  }
  &_start {
    justify-content: flex-start;
  }
  &_end {
    justify-content: flex-end;
  }
  &_center {
    justify-content: center;
  }
  &_space-around {
    justify-content: space-around;
  }
  &_space-between {
    justify-content: space-between;
  }
}
</style>