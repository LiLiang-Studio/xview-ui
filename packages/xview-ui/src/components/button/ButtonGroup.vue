<template>
  <div :class="[prefix, `${prefix}_${size}`, { vertical }]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'XButtonGroup',
  props: {
    size: {
      default: 'default',
      validator(v) {
        return ['large', 'default', 'small'].indexOf(v) !== -1
      }
    },
    shape: {
      validator(v) {
        return v === 'circle'
      }
    },
    vertical: Boolean
  },
  data() {
    return { prefix: 'x-btn-group' }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@btnPrefix: .x-btn;
@prefix: .x-btn-group;
@{prefix} {
  display: inline-block;
  margin-right: 10px;
  @{btnPrefix} {
    margin: 0;
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:first-child {
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
    &:hover {
      z-index: 2;
    }
    &:focus {
      z-index: 1;
    }
  }
  &:not(.vertical) @{btnPrefix} {
    &:first-child {
      border-top-right-radius: 0;
    }
    &:last-child {
      border-bottom-left-radius: 0;
    }
  }
  &.vertical {
    @{btnPrefix} {
      display: block;
      margin: 0;
      min-width: @size-normal;
      &:first-child {
        border-bottom-left-radius: 0;
      }
      &:last-child {
        border-top-right-radius: 0;
      }
      &:not(:first-child) {
        margin-top: -1px;
      }
      &_size_small {
        min-width: @size-small;
      }
      &_size_large {
        min-width: @size-large;
      }
    }
  }
}
</style>