<template>
  <span tabindex="0" :class="classes" :style="styles"
    @click="onClick" @keydown.space.prevent="onSpaceKeydown" @keyup.space="onSpaceKeyup">
    <slot name="open" v-if="opened"></slot>
    <slot name="close" v-else></slot>
    <span :class="[`${prefix}_ball`, {loading}]"></span>
  </span>
</template>
<script>
import { isFunc } from '../../tools'
export default {
  name: 'XSwitch',
  props:{
    value: {},
    size: {
      validator(v) {
        return ['large', 'default','small'].indexOf(v) !== -1
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
    },
    trueColor: String,
    falseColor: String,
    beforeChange: Function,
    loading: Boolean
  },
  data() {
    return { prefix: 'x-switch', inputValue: this.value }
  },
  computed: {
    opened() {
      return this.inputValue === this.trueValue
    },
    classes() {
      return [
        this.prefix,
        this.size && `${this.prefix}_${this.size}`,
        { opened: this.opened, disabled: this.disabled, loading: this.loading }
      ]
    },
    styles() {
      return { background: this.opened ? this.trueColor : this.falseColor }
    }
  },
  watch: {
    value(val) {
      this.inputValue = val
    },
    inputValue(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    onClick() {
      if (this.disabled || this.loading) return
      const change = () => {
        this.inputValue = this.opened ? this.falseValue : this.trueValue
        this.$emit('on-change', this.inputValue)
      }
      isFunc(this.beforeChange) ? this.beforeChange().then(change) : change()
    },
    onSpaceKeydown() {
      if (this.keydown) return
      this.onClick()
      this.keydown = true
    },
    onSpaceKeyup() {
      this.keydown = false
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-switch;
@aniName: x-switch_loading;
@{prefix} {
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
  &_ball {
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    width: 18px;
    padding: 2px 2px 0;
    border-radius: 18px;
    background-color: #fff;
    transition: all .3s ease-in-out;
    &.loading:before {
      content: '';
      display: block;
      height: calc(100% - 4px);
      border-radius: 50%;
      border: 1px solid;
      border-color: @primary-color transparent transparent;
      animation: @aniName 1s linear infinite;
    }
  }
  &:focus:not(:hover) {
    .control-shadow(@primary-color);
  }
  &.opened {
    justify-content: flex-start;
    background-color: @primary-color;
    @{prefix}_ball {
      left: calc(100% - 20px);
    }
  }
  &_large {
    width: 56px;
  }
  &_small {
    width: 30px;
    height: 16px;
    @{prefix}_ball {
      width: 12px;
    }
    &.opened @{prefix}_ball {
      left: calc(100% - 14px);
    }
  }
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fff;
    opacity: 0;
    transition: opacity .2s ease;
  }
  &.disabled {
    cursor: not-allowed;
  }
  &.disabled:before, &.loading:before {
    opacity: .4;
  }
}
@keyframes @aniName {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(1turn);
  }
}
</style>