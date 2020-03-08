<template>
  <div :class="classes" v-bind="btnProps" v-on="listeners">
    <x-icon v-if="loading" :class="`${prefix}_iconLoop`" type="load-c"/>
    <x-icon v-else-if="icon" :type="icon" :custom="customIcon"/>
    <span v-if="!iconOnly"><slot></slot></span>
  </div>
</template>
<script>
import XIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'XButton',
  components: { XIcon },
  props: {
    type: {
      default: 'default',
      validator(v) {
        return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(v) !== -1
      }
    },
    ghost: Boolean,
    size: {
      validator(v) {
        return ['large', 'default', 'small'].indexOf(v) !== -1
      }
    },
    shape: {
      validator(v) {
        return v === 'circle'
      }
    },
    long: Boolean,
    htmlType: {
      default: 'button',
      validator(v) {
        return ['button', 'submit', 'reset'].indexOf(v) !== -1
      }
    },
    disabled: Boolean,
    loading: Boolean,
    icon: String,
    customIcon: String,
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  data() {
    return { prefix: 'x-btn', iconOnly: false, parent: null }
  },
  computed: {
    classes() {
      let { prefix, type, size, shape, long, ghost, loading, disabled, iconOnly } = this
      if (this.parent) {
        size = size || this.parent.size
        shape = shape || this.parent.shape
      }
      return [
        prefix,
        `${prefix}_${type}`,
        size && `${prefix}_size_${size}`,
        shape && `${prefix}_${shape}`,
        { long, ghost, loading, disabled, iconOnly }
      ]
    },
    btnProps() {
      let { to, target, $router, replace, append, disabled, htmlType: type } = this
      return to ? !target && $router ? 
        { is: 'RouterLink', to, replace, append } : { is: 'a', target, href: to } : { is: 'button', disabled, type }
    },
    listeners() {
      let that = this
      return {
        ...this.$listeners,
        click(e) {
          !that.disabled && that.$emit('click', e)
        }
      }
    }
  },
  mounted() {
    this.iconOnly = !this.$slots.default
    this.parent = findParent(this, 'XButtonGroup')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-btn;
@{prefix} {
  outline: none;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  transition: all .2s ease-in-out;
  height: @size-normal;
  font-size: 14px;
  padding: 0 15px;
  border-radius: 3px;
  border: 1px solid;
  + @{prefix} {
    margin-left: 10px;
  }
  &:after {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: 1;
    opacity: 0;
    border-radius: inherit;
    background-color: currentColor;
    transition: opacity .2s ease-in-out;
  }
  &_default, &_dashed, &_text {
    color: @content-color;
    &:focus {
      .control-shadow(@primary-color)
    }
    &.ghost {
      color: #fff;
    }
  }
  &_primary, &_info, &_success, &_warning, &_error {
    color: #fff;
    &:not(.disabled):hover:after {
      opacity: .2;
    }
    &:not(.disabled):active:after {
      opacity: 0;
    }
    &.ghost {
      border-color: currentColor;
      &:not(.disabled):after {
        opacity: 0;
      }
      &:hover {
        background-color: rgba(255,250,242,.5);
      }
    }
    &.loading:after {
      opacity: .38;
    }
  }
  &_default, &_dashed {
    background-color: #fff;
    border-color: @border-color;
    &:hover {
      color: @primary-color;
      border-color: @primary-color;
    }
    &.ghost {
      border-color: currentColor;
    }
  }
  &_text {
    background-color: transparent;
    &:hover {
      color: @primary-color;
    }
  }
  &_dashed {
    border-style: dashed;
  }
  &_primary, &_info, &_success, &_warning, &_error, &_text {
    border-color: transparent;
  }
  &_primary {
    background-color: @primary-color;
    &:focus {
      .control-shadow(@primary-color)
    }
    &.ghost {
      color: @primary-color;
    }
  }
  &_info {
    background-color: @info-color;
    &:focus {
      .control-shadow(@info-color)
    }
    &.ghost {
      color: @primary-color;
    }
  }
  &_success {
    background-color: @success-color;
    &:focus {
      .control-shadow(@success-color)
    }
    &.ghost {
      color: @success-color;
    }
  }
  &_warning {
    background-color: @warning-color;
    &:focus {
      .control-shadow(@warning-color)
    }
    &.ghost {
      color: @warning-color;
    }
  }
  &_error {
    background-color: @error-color;
    &:focus {
      .control-shadow(@error-color)
    }
    &.ghost {
      color: @error-color;
    }
  }
  &_primary, &_info, &_success, &_warning, &_error, &_default, &_dashed {
    &.ghost {
      background-color: transparent;
    }
  }
  &_circle {
    border-radius: @size-large;
  }
  &.iconOnly {
    padding: 0;
    font-size: 16px;
    width: @size-normal;
  }
  &_size_small {
    height: @size-small;
    font-size: 12px;
    padding: 0 7px;
    &.iconOnly {
      font-size: 14px;
      width: @size-small;
    }
  }
  &_size_large {
    height: @size-large;
    font-size: 16px;
    &.iconOnly {
      font-size: 18px;
      width: @size-large;
    }
  }
  &.long {
    width: 100%;
  }
  &.loading {
    pointer-events: none;
  }
  &.disabled {
    cursor: not-allowed;
    color: @disabled-color;
    border-color: @border-color;
    background-color: #f7f7f7;
  }
  > span {
    display: inline-block;
    vertical-align: middle;
  }
  .x-icon + span {
    margin-left: 3px;
  }
  &_iconLoop {
    animation: x-load-loop 1s linear infinite;
  }
}
</style>