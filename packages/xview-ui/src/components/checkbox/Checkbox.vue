<template>
  <span :class="prop.classes" @keydown.space.prevent @keyup.space="onClick" @click="onClick">
    <span ref="btn" :class="`${prefix}_btn`" tabindex="0">
      <span v-if="indeterminate" :class="`${prefix}_line`"></span>
      <x-icon v-else :class="`${prefix}_icon`" type="checkmark"/>
    </span>
    <slot>{{label}}</slot>
  </span>
</template>
<script>
import XIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'XCheckbox',
  components: { XIcon },
  props: {
    value: [String, Number, Boolean],
    label: [String, Number, Boolean],
    border: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    size: {
      validator(v) {
        return ['small', 'default', 'large'].indexOf(v) !== -1
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
  data() {
    return { prefix: 'x-checkbox' }
  },
  computed: {
    prop() {
      let par = findParent(this, 'XCheckboxGroup')
      let checked = par ? par.includes(this.label) : this.value === this.trueValue
      let size = this.size || par && par.size
      let { prefix, border, disabled, indeterminate } = this
      return {
        checked,
        classes: [prefix, size && `${prefix}_${size}`, { checked, border, disabled, indeterminate }]
      }
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return
      let { checked } = this.prop, par = findParent(this, 'XCheckboxGroup')
      if (par) {
        par.updateValue(this.label)
      } else {
        this.$emit('input', checked ? this.falseValue : this.trueValue)
        this.$emit('on-change', !checked)
      }
      this.$refs.btn.focus()
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-checkbox;
@{prefix} {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  position: relative;
  margin-right: 8px;
  font-size: 14px;
  &_btn {
    color: #fff;
    outline: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    margin-right: 6px;
    border-radius: 2px;
    background: #fff;
    border: 1px solid @border-color;
    transition: all .2s ease-in-out;
    width: 16px;
    height: 16px;
  }
  &_line {
    width: 70%;
    border-bottom: 2px solid #fff;
  }
  &_icon {
    transform: scale(0);
    transition: all .2s ease-in-out;
  }
  &:not(.disabled) @{prefix}_btn {
    &:focus {
      .control-shadow(@primary-color);
    }
    &:hover {
      border-color: darken(@border-color, 10%);
    }
  }
  &.checked, &.indeterminate {
    &:not(.disabled) @{prefix}_btn {
      border-color: @primary-color;
      background-color: @primary-color;
    }
  }
  &.border {
    padding: 0 15px;
    border-radius: 4px;
    height: @size-normal;
    border: 1px solid @border-color;
  }
  &_large {
    &.border {
      height: @size-large;
    }
    @{prefix}_btn {
      width: 18px;
      height: 18px;
    }
  }
  &_small {
    &.border {
      height: @size-small;
    }
    @{prefix}_btn {
      width: 14px;
      height: 14px;
      font-size: 12px;
    }
  }
  &.checked &_icon {
    transform: scale(1);
  }
  &.disabled {
    &, @{prefix}_btn {
      cursor: not-allowed;
      color: @disabled-color;
    }
    @{prefix}_btn {
      background-color: lighten(@disabled-color, 17%);
    }
  }
}
</style>