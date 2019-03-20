<template>
  <button class="ui-button" 
    :class="[type, size, shape, { long, isOnlyIcon, loading }]" :disabled="disabled" :type="htmlType" @click="$emit('click', $event)">
    <UiIcon v-if="loading" class="icon-load-loop" type="load-c"/>
    <UiIcon v-else-if="icon" :type="icon"/>
    <span v-if="!isOnlyIcon"><slot></slot></span>
  </button>
</template>
<script>
import UiIcon from './../Icon'
export default {
  components: { UiIcon },
  data() {
    return {
      isOnlyIcon: false
    }
  },
  props: {
    type: {
      default: 'default',
      validator(value) {
        return ['default', 'primary', 'ghost', 'dashed', 'text', 'info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    size: {
      default: 'normal',
      validator(value) {
        return ['large', 'normal', 'small'].indexOf(value) !== -1
      }
    },
    shape: {
      type: String,
      validator(value) {
        return !value || ['circle'].indexOf(value) !== -1
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
    icon: String
  },
  mounted() {
    this.isOnlyIcon = Object.keys(this.$slots).length === 0
  }
}
</script>
<style lang="less">
.ui-button {
  -webkit-appearance: button;
  outline: none;
  padding: 0 15px;
  border-radius: 3px;
  border: 1px solid @border-color;
  user-select: none;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  color: #495060;
  background-color: @bg-color;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  position: relative;
  transition: background-color .2s, border-color .2s, color .2s, box-shadow .2s;
  &:before {
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    background-color: #fff;
    opacity: .35;
    content: '';
    border-radius: inherit;
    z-index: 1;
    transition: opacity .2s;
    display: none;
  }
  &.loading {
    pointer-events: none;
    .icon-load-loop {
      animation: ani-load-loop 1s linear infinite;
    }
    &:before {
      display: block;
    }
  }
  &.isOnlyIcon {
    padding: 0;
    border-radius: 50%;
  }
  &.long {
    width: 100%;
  }
  &.normal {
    height: @form-control-normal;
    &.circle {
      border-radius: @form-control-normal * .5;
    }
    &.isOnlyIcon {
      width: @form-control-normal;
      font-size: 16px;
    }
  }
  &.large {
    height: @form-control-large;
    font-size: 14px;
    &.circle {
      border-radius: @form-control-large * .5;
    }
    &.isOnlyIcon {
      width: @form-control-large;
      font-size: 18px;
    }
  }
  &.small {
    height: @form-control-small;
    &.circle {
      border-radius: @form-control-small * 2;
    }
    &.isOnlyIcon {
      width: @form-control-small;
      font-size: 12px;
    }
  }
  &.default {
    &:hover:not(:disabled) {
      background-color: #fff;
      color: @primary-light-color;
      border-color: @primary-light-color;
    }
    &:active:not(:disabled) {
      color: @primary-dark-color;
      border-color: @primary-dark-color;
    }
  }
  &.ghost, &.dashed {
    background-color: transparent;
    &:hover:not(:disabled) {
      border-color: @primary-light-color;
      color: @primary-light-color;
    }
    &:active:not(:disabled) {
      border-color: @primary-dark-color;
      color: @primary-dark-color;
    }
  }
  &.dashed {
    border-style: dashed;
  }
  &.text {
    border-color: transparent;
    background-color: transparent;
    &:hover:not(:disabled) {
      color: @primary-light-color;
    }
    &:active:not(:disabled) {
      color: @primary-dark-color;
    }
  }
  &.default, &.ghost, &.dashed, &.text {
    &:focus:not(:disabled) {
      .form-control-shadow(@primary-color);
    }
  }

  &.primary, &.info, &.success, &.warning, &.error {
    color: #fff;
  }
  &.primary {
    border-color: @primary-color;
    background-color: @primary-color;
    &:hover:not(:disabled) {
      border-color: @primary-light-color;
      background-color: @primary-light-color;
    }
    &:active:not(:disabled) {
      border-color: @primary-dark-color;
      background-color: @primary-dark-color;
    }
    &:focus:not(:disabled) {
      .form-control-shadow(@primary-color);
    }
  }
  &.info {
    border-color: @info-color;
    background-color: @info-color;
    &:hover:not(:disabled) {
      border-color: @info-light-color;
      background-color: @info-light-color;
    }
    &:active:not(:disabled) {
      border-color: @info-dark-color;
      background-color: @info-dark-color;
    }
    &:focus:not(:disabled) {
      .form-control-shadow(@info-color);
    }
  }
  &.success {
    border-color: @success-color;
    background-color: @success-color;
    &:hover:not(:disabled) {
      border-color: @success-light-color;
      background-color: @success-light-color;
    }
    &:active:not(:disabled) {
      border-color: @success-dark-color;
      background-color: @success-dark-color;
    }
    &:focus:not(:disabled) {
      .form-control-shadow(@success-color);
    }
  }
  &.warning {
    border-color: @warning-color;
    background-color: @warning-color;
    &:hover:not(:disabled) {
      border-color: @warning-light-color;
      background-color: @warning-light-color;
    }
    &:active:not(:disabled) {
      border-color: @warning-dark-color;
      background-color: @warning-dark-color;
    }
    &:focus:not(:disabled) {
      .form-control-shadow(@warning-color);
    }
  }
  &.error {
    border-color: @error-color;
    background-color: @error-color;
    &:hover:not(:disabled) {
      border-color: @error-light-color;
      background-color: @error-light-color;
    }
    &:active:not(:disabled) {
      border-color: @error-dark-color;
      background-color: @error-dark-color;
    }
    &:focus:not(:disabled) {
      .form-control-shadow(@error-color);
    }
  }
  &:disabled {
    color: @disabled-color;
    cursor: not-allowed;
  }
  &:disabled:not(.text) {
    border-color: @border-color;
    background-color: @bg-color;
  }
  .ui-icon+span {
    margin-left: 8px;
  }
}
</style>