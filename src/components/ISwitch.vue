<template>
  <span class="ui-switch" :class="[{isChecked, disabled}, size]" @click="handleClick">
    <span class="ui-switch-inner" v-if="hasOpenSlot || hasCloseSlot">
      <slot name="open" v-if="isChecked"></slot>
      <slot name="close" v-else></slot>
    </span>
  </span>
</template>
<script>
export default {
  data() {
    return {
      hasOpenSlot: false,
      hasCloseSlot: false,
      isChecked: this.value === this.trueValue
    }
  },
  props:{
    value: Boolean,
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
  watch: {
    value(newVal) {
      this.isChecked = newVal === this.trueValue
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      this.isChecked = !this.isChecked
      this.$emit('on-change', this.isChecked)
      this.$emit('input', this.isChecked ? this.trueValue : this.falseValue)
    }
  },
  mounted() {
    this.hasOpenSlot = this.$slots.open !== undefined
    this.hasCloseSlot = this.$slots.close !== undefined
  }
}
</script>
<style lang="less">
.ui-switch {
  width: 48px;
  height: 24px;
  border-radius: 12px;
  display: inline-block;
  background-color: #ccc;
  user-select: none;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
  transition: all .3s;
  &.large {
    width: 60px;
  }
  &.small {
    width: 24px;
    height: 12px;
    &:after {
      width: 10px;
      height: 10px;
      top: 1px;
      left: 1px;
    }
    &.isChecked:after {
      left: calc(100% - 11px);
    }
  }
  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 10px;
    top: 2px;
    left: 2px;
    background-color: #fff;
    transition: all .3s;
  }
  &.isChecked {
    background-color: @primary-color;
    &:after {
      left: calc(100% - 22px);
    }
    .ui-switch-inner {
      justify-content: flex-start;
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

.ui-switch-inner {
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
}
</style>