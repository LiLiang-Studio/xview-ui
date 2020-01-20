<template>
  <UiButton v-if="isButtonType" :class="[`${prefix}-btn`, {checked}]" :disabled="disabled" @click="onClick">
    <slot>{{label}}</slot>
  </UiButton>
  <div v-else tabindex="0" :class="[prefix, {disabled}]" @click="onClick">
    <span :class="[`${prefix}-box`, {checked}]"></span>
    <span><slot>{{label}}</slot></span>
  </div>
</template>
<script>
import { findParent } from '../../tools'
import UiButton from '../button'
export default {
  name: 'UiRadio',
  components: { UiButton },
  data() {
    return { prefix: 'ui-radio', checked: false, parent: null }
  },
  props: {
    label: [String, Number],
    disabled: Boolean
  },
  watch: {
    checked(newVal) {
      this.$emit('on-change', newVal)
    }
  },
  computed: {
    isButtonType() {
      return this.parent && this.parent.type === 'button'
    }
  },
  methods: {
    onClick() {
      if (this.disabled) return
      this.parent.updateValue(this)
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiRadioGroup')
    this.parent.addChild(this)
    this.checked = this.parent.value === this.label
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-radio {
  font-size: 12px;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  &-box {
    width: 14px;
    height: 14px;
    min-width: 14px;
    margin-right: 8px;
    position: relative;
    border: 1px solid @border-color;
    &, &:before {
      border-radius: 50%;
      transition: all .2s ease-in-out;
    }
    &:before {
      content: '';
      position: absolute;
      top: 2px;
      right: 2px;
      bottom: 2px;
      left: 2px;
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
  &-group.vertical {
    display: inline-block;
  }
  &-group.vertical & {
    display: flex;
    margin-right: 0;
    height: 30px;
  }
  &-group.isButtonType {
    margin-right: 10px;
  }
  &-group &-btn:hover {
    border-color: @border-color;
  }
  &-btn.checked:not(:disabled) {
    z-index: 2;
    color: @primary-color;
    border-color: currentColor;
  }
  &-btn.checked:disabled {
    background-color: #e6e6e6;
  }
  &.disabled {
    cursor: not-allowed;
  }
  &.disabled &-box {
    border-color: @border-color;
    background-color: @disabled-bg-color;
    &:before {
      background-color: #ccc;
    }
  }
  &:focus:not(.disabled) &-box {
    .form-control-shadow(@primary-color);
  }
}
</style>