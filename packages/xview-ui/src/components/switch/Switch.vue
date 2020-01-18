<template>
  <span tabindex="0" :class="[prefix, `${prefix}-${size}`, {checked, disabled}]" @click="onClick">
    <slot name="open" v-if="checked"></slot>
    <slot name="close" v-else></slot>
  </span>
</template>
<script>
export default {
  name: 'UiSwitch',
  data() {
    return { prefix: 'ui-switch', inputValue: this.value }
  },
  props:{
    value: {},
    size: {
      validator(value) {
        return ['large', 'default','small'].indexOf(value) !== -1
      }
    },
    disabled: Boolean,
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
      return this.inputValue === this.trueValue
    }
  },
  watch: {
    value(newval) {
      this.inputValue = newval
    },
    checked(newval) {
      this.$emit('on-change', newval)
    },
    inputValue(newval) {
      this.$emit('input', newval)
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) this.inputValue = this.checked ? this.falseValue : this.trueValue
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-switch {
  width: 44px;
  height: 22px;
  padding: 0 8px;
  border-radius: 22px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  outline: none;
  cursor: pointer;
  user-select: none;
  position: relative;
  vertical-align: middle;
  color: #fff;
  background-color: #ccc;
  transition: all .3s ease-in-out;
  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    width: 18px;
    border-radius: 18px;
    background-color: #fff;
    transition: all .3s ease-in-out;
  }
  &:focus:not(:hover):not(.disabled) {
    .form-control-shadow(@primary-color);
  }
  &.checked {
    justify-content: flex-start;
    background-color: @primary-color;
    &:after {
      left: calc(100% - 20px);
    }
  }
  &-large {
    width: 56px;
  }
  &-small {
    width: 30px;
    height: 16px;
    &:after {
      width: 12px;
    }
    &.checked:after {
      left: calc(100% - 14px);
    }
  }
  &.disabled {
    cursor: not-allowed;
    background-color: #f3f3f3;
    &:after {
      background-color: #ccc;
    }
  }
}
</style>