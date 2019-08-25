<template>
  <div :class="[prefix, `${prefix}-${size}`, `${prefix}-${shape}`, { vertical }]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'UiButtonGroup',
  data() {
    return { prefix: 'ui-btn-group' }
  },
  props: {
    size: {
      default: 'default',
      validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      validator(value) {
        return value === 'circle'
      }
    },
    vertical: Boolean
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-btn-group {
  display: inline-block;
  .ui-btn {
    float: left;
    &:hover {
      z-index: 1;
    }
    &.isOnlyIcon {
      width: auto;
      padding: 0 15px;
      border-radius: 3px;
    }
    &:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &:not(:first-child) {
      margin-left: -1px;
    }
  }
  &.vertical .ui-btn {
    float: none;
    display: flex;
    width: 100%;
    margin-left: 0;
    &:first-child {
      border-radius: 3px 3px 0 0;
    }
    &:last-child {
      border-radius: 0 0 3px 3px;
    }
    &:not(:first-child) {
      margin-top: -1px;
    }
  }
  &-circle {
    .ui-btn:first-child {
      border-top-left-radius: @size-large;
      border-bottom-left-radius: @size-large;
    }
    .ui-btn:last-child {
      border-top-right-radius: @size-large;
      border-bottom-right-radius: @size-large;
    }
    &.vertical {
      .ui-btn {
        &:first-child {
          border-radius: @size-large @size-large 0 0;
        }
        &:last-child {
          border-radius: 0 0 @size-large @size-large;
        }
      }
    }
  }
}
</style>