<template>
  <span :class="[prefix, size, {checked: checked || indeterminate, disabled}]" @click="onClick">
    <span :class="`${prefix}-btn`" tabindex="0">
      <UiIcon :class="[`${prefix}-icon`, {indeterminate}]" type="checkmark"/>
    </span>
    <slot>{{labelText}}</slot>
  </span>
</template>
<script>
import UiIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'UiCheckbox',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-checkbox' }
  },
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    disabled: Boolean,
    indeterminate: Boolean,
    size: {
      validator(value) {
        return ['small', 'default', 'large'].indexOf(value) !== -1
      }
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    }
  },
  computed: {
    checked() {
      let parent = findParent(this, 'UiCheckboxGroup')
      return parent ? parent.includes(this.label) : this.value === this.trueValue
    },
    labelText() {
      return typeof this.label === 'boolean' ? '' : this.label
    }
  },
  watch: {
    checked(newVal) {
      this.$emit('on-change', newVal)
    }
  },
  methods: {
    onClick(event) {
      if (this.disabled) return
      let parent = findParent(this, 'UiCheckboxGroup')
      if (parent) {
        parent.updateValue(this.label)
      } else {
        this.$emit('input', this.checked ? this.falseValue : this.trueValue)
      }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-checkbox {
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 8px;
  font-size: 12px;
  &-btn {
    outline: none;
    display: inline-block;
    box-sizing: content-box;
    text-align: center;
    margin-right: 6px;
    width: 14px;
    height: 14px;
    line-height: 14px;
    border-radius: 2px;
    background-color: #fff;
    border: 1px solid @border-color;
    transition: all .2s ease-in-out;
  }
  &-icon {
    color: #fff;
    transform: scale(0);
    transition: all .2s ease-in-out;
    &.indeterminate {
      width: 70%;
      vertical-align: middle;
      border-bottom: 2px solid currentColor;
      &:before {
        content: '';
      }
    }
  }
  &-group.large &, &.large {
    font-size: 14px;
  }
  &-group.large &-btn, &.large &-btn {
    width: 16px;
    height: 16px;
    line-height: 16px;
  }
  &.checked:not(.disabled) &-btn {
    border-color: @primary-color;
    background-color: @primary-color;
  }
  &.checked &-icon {
    transform: scale(1);
  }
  &.disabled, &.disabled &-icon {
    cursor: not-allowed;
    color: @disabled-color;
  }
  &.disabled &-btn {
    background-color: @disabled-bg-color;
  }
  &:not(.disabled) &-btn:focus {
    .form-control-shadow(@primary-color);
  }
  &:not(.disabled):not(.checked) &-btn:hover {
    border-color: darken(@border-color, 10%);
  }
}
</style>