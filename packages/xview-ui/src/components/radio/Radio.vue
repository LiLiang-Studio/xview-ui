<template>
  <div v-bind="bindProps" @click="onClick">
    <span v-if="!isBtn" :class="[`${prefix}_box`, {checked}]"></span>
    <slot>{{label}}</slot>
  </div>
</template>
<script>
import XBtn from '../button'
import { findParent } from '../../tools'
export default {
  name: 'XRadio',
  props: {
    label: {
      required: true,
      type: [String, Number]
    },
    disabled: Boolean,
    border: Boolean,
    size: {
      validator(v) {
        return ['large', 'small', 'default'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { prefix: 'x-radio', parent: null }
  },
  computed: {
    isBtn() {
      return this.parent && this.parent.type === 'button'
    },
    checked() {
      return this.parent && this.parent.checkedValue === this.label
    },
    bindProps() {
      let { border, disabled, checked, prefix } = this
      let size = this.size || (this.parent && this.parent.size)
      return this.isBtn ?
        { is: XBtn, disabled, size, class: [`${prefix}_btn`, { checked }] } :
        { tabindex: '0', class: [prefix, size && `${prefix}_${size}`, { border, disabled }] }
    }
  },
  methods: {
    onClick() {
      if (!this.disabled) this.parent.update(this.label)
    }
  },
  mounted() {
    this.parent = findParent(this, 'XRadioGroup')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@radio: .x-radio;
@{radio} {
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  margin-right: 8px;
  &_box {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    padding: 2px;
    border: 1px solid @border-color;
    &, &:before {
      border-radius: 50%;
      transition: all .2s ease-in-out;
    }
    &:before {
      content: '';
      display: block;
      height: 100%;
      transform: scale(0);
      background-color: @primary-color;
    }
    &.checked {
      border-color: @primary-color;
      &:before {
        transform: scale(1);
      }
    }
  }
  &_btn.checked {
    z-index: 3;
    color: @primary-color;
    border-color: currentColor;
    &:disabled {
      color: #fff;
      background: #e6e6e6;
      border-color: @border-color;
    }
  }
  &.border {
    padding: 0 15px;
    border-radius: 4px;
    height: @size-normal;
    border: 1px solid @border-color;
  }
  &_small {
    font-size: 12px;
    &.border {
      padding: 0 8px;
      height: @size-small;
    }
    @{radio}_box {
      width: 14px;
      height: 14px;
    }
  }
  &_large {
    &.border {
      height: @size-large;
    }
    @{radio}_box {
      width: 18px;
      height: 18px;
    }
  }
  &.disabled {
    cursor: not-allowed;
    @{radio}_box {
      border-color: @border-color;
      background: #f3f3f3;
      &:before {
        background-color: #ccc;
      }
    }
  }
  &:focus:not(.disabled) &_box {
    .control-shadow(@primary-color);
  }
  &-group {
    &.vertical {
      display: inline-block;
      @{radio} {
        display: flex;
        margin-right: 0;
        height: @size-normal;
      }
    }
  }
}
</style>