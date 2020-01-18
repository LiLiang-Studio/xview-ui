<template>
  <div :class="[`${prefix}-${type}`, orientation, {dashed}]">
    <span v-if="hasText && type === 'horizontal'" :class="`${prefix}-text`">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'UiDivider',
  data() {
    return { prefix: 'ui-divider', hasText: false }
  },
  props: {
    type: {
      default: 'horizontal',
      validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) !== -1
      }
    },
    orientation: {
      default: 'center',
      validator(value) {
        return ['left', 'right', 'center'].indexOf(value) !== -1
      }
    },
    dashed: Boolean
  },
  mounted() {
    this.hasText = this.$slots.default !== undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-divider {
  &-horizontal {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    font-size: 16px;
    color: @title-color;
    &:before, &:after {
      content: '';
      border-bottom: 1px solid @border-color;
    }
    &.dashed:before, &.dashed:after {
      border-bottom-style: dashed;
    }
    &.center:before, &.center:after {
      flex: 1;
    }
    &.left:before {
      width: 5%;
    }
    &.left:after {
      flex: 1;
    }
    &.right:before {
      flex: 1;
    }
    &.right:after {
      width: 5%;
    }
  }
  &-vertical {
    display: inline-block;
    margin: 0 8px;
    height: 1em;
    vertical-align: middle;
    border-left: 1px solid @border-color;
    &.dashed {
      border-left-style: dashed;
    }
  }
  &-text {
    padding: 0 24px;
    white-space: nowrap;
  }
}
</style>