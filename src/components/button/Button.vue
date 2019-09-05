<template>
  <a :class="classes" :is="root.name" v-bind="root.attrs" v-on="listeners">
    <UiIcon v-if="loading" class="icon-loading" type="load-c"/>
    <UiIcon v-else-if="icon" :type="icon"/>
    <span v-if="!isOnlyIcon"><slot></slot></span>
  </a>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiButton',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-btn', isOnlyIcon: false }
  },
  props: {
    type: {
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    ghost: Boolean,
    size: {
      validator(value) {
        return ['large', 'default', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      validator(value) {
        return value === 'circle'
      }
    },
    long: Boolean,
    htmlType: {
      default: 'button',
      validator(value) {
        return ['button', 'submit', 'reset'].indexOf(value) !== -1
      }
    },
    disabled: Boolean,
    loading: Boolean,
    icon: String,
    to: [String, Object],
    replace: Boolean,
    target: String,
    append: Boolean
  },
  computed: {
    classes() {
      return [
        this.prefix,
        this.type && `${this.prefix}-${this.type}`,
        this.size && `${this.prefix}-${this.size}`,
        this.shape && `${this.prefix}-${this.shape}`,
        { long: this.long, ghost: this.ghost, isOnlyIcon: this.isOnlyIcon, loading: this.loading, disabled: this.disabled }
      ]
    },
    listeners() {
      const that = this
      return Object.assign({}, this.$listeners, {
        click(event) {
          !that.disabled && that.$emit('click', event)
        }
      })
    },
    root() {
      if (this.to) {
        if (!this.target && this.$router) {
          return { name: 'RouterLink', attrs: { to: this.to, replace: this.replace, append: this.append } }
        }
        return { name: 'a', attrs: { target: this.target, href: this.to } }
      }
      return { name: 'button', attrs: { disabled: this.disabled, type: this.htmlType } }
    }
  },
  mounted() {
    this.isOnlyIcon = this.$slots.default === undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-btn {
  outline: none;
  user-select: none;
  cursor: pointer;
  height: 32px;
  font-size: 12px;
  padding: 0 15px;
  border-radius: 3px;
  border: 1px solid;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  position: relative;
  transition: all .2s ease-in-out;
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
  &.loading {
    pointer-events: none;
    .icon-loading {
      animation: ani-load-loop 1s linear infinite;
    }
    &:after {
      opacity: .38;
    }
  }
  &.long {
    width: 100%;
  }
  &-circle {
    border-radius: 36px;
    &.isOnlyIcon {
      padding: 0;
      font-size: 16px;
      border-radius: 50%;
      width: @size-normal;
      min-width: @size-normal;
    }
  }
  &-large, &-group-large & {
    font-size: 14px;
    height: @size-large;
    &.isOnlyIcon {
      font-size: 18px;
      width: @size-large;
      min-width: @size-large;
    }
  }
  &-small, &-group-small & {
    height: @size-small;
    &.isOnlyIcon {
      font-size: 12px;
      width: @size-small;
      min-width: @size-small;
    }
  }
  &-default, &-dashed {
    background-color: #fff;
    border-color: @border-color;
    &.ghost {
      border-color: currentColor;
    }
    &:not(.disabled):hover {
      border-color: currentColor;
    }
  }
  &-default, &-dashed, &-text {
    color: @content-color;
    &.ghost {
      color: #fff;
    }
    &:not(.disabled):hover {
      color: @primary-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@primary-color);
    }
  }
  &-dashed {
    border-style: dashed;
  }
  &-text {
    border-color: transparent;
    background-color: transparent;
  }
  &-primary, &-info, &-success, &-warning, &-error {
    color: #fff;
    &.ghost {
      border-color: currentColor;
      &:not(.disabled):hover {
        background-color: rgba(255, 255, 255, .5);
      }
    }
    &:not(.ghost):not(.disabled) {
      &:hover {
        color: #fff;
      }
      &:hover:after, &:focus:after {
        opacity: .1;
      }
      &:active:after {
        opacity: .3;
      }
    }
  }
  &-primary {
    border-color: @primary-color;
    background-color: @primary-color;
    &.ghost {
      color: @primary-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@primary-color);
    }
  }
  &-info {
    border-color: @info-color;
    background-color: @info-color;
    &.ghost {
      color: @info-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@info-color);
    }
  }
  &-success {
    border-color: @success-color;
    background-color: @success-color;
    &.ghost {
      color: @success-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@success-color);
    }
  }
  &-warning {
    border-color: @warning-color;
    background-color: @warning-color;
    &.ghost {
      color: @warning-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@warning-color);
    }
  }
  &-error {
    border-color: @error-color;
    background-color: @error-color;
    &.ghost {
      color: @error-color;
    }
    &:not(.disabled):focus {
      .form-control-shadow(@error-color);
    }
  }
  &.ghost {
    background-color: transparent;
  }
  &.disabled {
    pointer-events: painted;
    color: @disabled-color;
    cursor: not-allowed;
  }
  &.disabled:not(.text) {
    border-color: @border-color;
    background-color: @bg-color;
  }
  .ui-icon + span {
    margin-left: 8px;
  }
}
</style>