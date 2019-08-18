<template>
  <div class="ui-button-group" :class="[size, shape, { vertical }]">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      default: 'default',
      validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      type: String,
      validator(value) {
        return !value || ['circle'].indexOf(value) !== -1
      }
    },
    vertical: Boolean
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-button-group {
  display: inline-block;
  &.circle {
    .ui-button {
      &, &.isOnlyIcon {
        &:first-child {
          border-top-left-radius: @form-control-large;
          border-bottom-left-radius: @form-control-large;
        }
        &:last-child {
          border-top-right-radius: @form-control-large;
          border-bottom-right-radius: @form-control-large;
        }
      }
    }
  }
  .ui-button {
    position: relative;
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
  &.normal .ui-button {
    height: @form-control-normal;
    &.isOnlyIcon {
      font-size: 16px;
    }
  }
  &.large .ui-button {
    height: @form-control-large;
    font-size: 14px;
    &.isOnlyIcon {
      font-size: 18px;
    }
  }
  &.small .ui-button {
    height: @form-control-small;
    &.isOnlyIcon {
      font-size: 12px;
    }
  }
  &.vertical {
    .ui-button {
      display: block;
      width: 100%;
      max-width: 100%;
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
    &.circle {
      .ui-button {
        &:first-child {
          border-radius: @form-control-large @form-control-large 0 0;
        }
        &:last-child {
          border-radius: 0 0 @form-control-large @form-control-large;
        }
      }
    }
  }
}
</style>