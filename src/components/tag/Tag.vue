<template>
  <transition v-if="fade" :name="prefix">
    <div :class="classes" :style="styles" @click="onClick">
      <slot></slot>
      <UiIcon v-if="closable" :class="`${prefix}-close`" type="ios-close-empty" @click="onClose"/>
    </div>
  </transition>
  <div v-else :class="classes" :style="styles" @click="onClick">
    <slot></slot>
    <UiIcon v-if="closable" :class="`${prefix}-close`" type="ios-close-empty" @click="onClose"/>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiTag',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-tag', isChecked: this.checked }
  },
  props: {
    closable: Boolean,
    checkable: Boolean,
    checked: {
      type: Boolean,
      default: true
    },
    type: {
      validator(value) {
        return ['border', 'dot'].indexOf(value) !== -1
      }
    },
    color: {
      type: String,
      default: 'default'
    },
    name: [String, Number],
    fade: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorClass() {
      return [
        'default', 'primary', 'success', 'warning', 'error',
        'blue', 'green', 'red', 'yellow', 'magenta', 'volcano', 'orange', 'gold', 'lime', 'cyan', 'geekblue', 'purple'
      ].find(_ => _ === this.color)
    },
    classes() {
      return [
        this.prefix, 
        this.colorClass && `${this.prefix}-${this.colorClass}`,
        this.type && `${this.prefix}-${this.type}`,
        { checked: this.isChecked }
      ]
    },
    styles() {
      return !this.colorClass && { color: '#fff', backgroundColor: this.color }
    }
  },
  watch: {
    checked(newVal) {
      this.isChecked = newVal
    }
  },
  methods: {
    onClose(event) {
      this.$emit('on-close', event, this.name)
    },
    onClick() {
      if (!this.checkable) return
      this.isChecked = !this.isChecked
      this.$emit('on-change', this.isChecked, this.name)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-tag;
@{prefix} {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  margin: 2px 4px 2px 0;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid;
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: .85;
  }
  &-enter, &-leave-to {
    opacity: 0 !important;
  }
  &-default {
    color: @content-color;
    background-color: @bg-color;
    border-color: @border-color;
  }
  &-primary, &-success, &-error, &-warning {
    border: none;
    &.checked:not(@{prefix}-dot):not(@{prefix}-border) {
      color: #fff;
    }
  }
  &-primary.checked:not(&-dot):not(&-border) {
    background-color: @primary-color;
  }
  &-success.checked:not(&-dot):not(&-border) {
    background-color: @success-color;
  }
  &-error.checked:not(&-dot):not(&-border) {
    background-color: @error-color;
  }
  &-warning.checked:not(&-dot):not(&-border) {
    background-color: @warning-color;
  }
  &-blue {
    color: #1890ff;
    border-color: #91d5ff;
    background-color: #e6f7ff;
  }
  &-green {
    color: #52c41a;
    border-color: #b7eb8f;
    background-color: #f6ffed;
  }
  &-red {
    color: #f5222d;
    border-color: #ffa39e;
    background-color: #fff1f0;
  }
  &-yellow {
    color: #fadb14;
    border-color: #fffb8f;
    background-color: #feffe6;
  }
  &-magenta {
    color: #eb2f96;
    border-color: #ffadd2;
    background-color: #fff0f6;
  }
  &-volcano {
    color: #fa541c;
    border-color: #ffbb96;
    background-color: #fff2e8;
  }
  &-orange {
    color: #fa8c16;
    border-color: #ffd591;
    background-color: #fff7e6;
  }
  &-gold {
    color: #faad14;
    border-color: #ffe58f;
    background-color: #fffbe6;
  }
  &-lime {
    color: #a0d911;
    border-color: #eaff8f;
    background-color: #fcffe6;
  }
  &-cyan {
    color: #13c2c2;
    border-color: #87e8de;
    background-color: #e6fffb;
  }
  &-geekblue {
    color: #2f54eb;
    border-color: #adc6ff;
    background-color: #f0f5ff;
  }
  &-purple {
    color: #722ed1;
    border-color: #d3adf7;
    background-color: #f9f0ff;
  }
  &-dot, &-border {
    background-color: #fff;
  }
  &-dot {
    height: 32px;
    color: @content-color;
    border: 1px solid @divider-color;
  }
  &-dot:before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
    background-color: @divider-color;
  }
  &-dot&-primary:before {
    background-color: @primary-color;
  }
  &-dot&-success:before {
    background-color: @success-color;
  }
  &-dot&-error:before {
    background-color: @error-color;
  }
  &-dot&-warning:before {
    background-color: @warning-color;
  }
  &-close {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 20px;
    position: relative;
    right: -6px;
    opacity: .66;
    text-align: center;
    &:hover {
      opacity: 1;
    }
  }
  &-border {
    height: 24px;
  }
  &-border &-close {
    height: 22px;
    line-height: 22px;
    margin-left: 8px;
    border-left: 1px solid currentColor;
  }
  &-default&-border &-close {
    border-color: @border-color;
  }
  &-primary&-border {
    color: @primary-color;
    border: 1px solid currentColor;
  }
  &-success&-border {
    color: @success-color;
    border: 1px solid currentColor;
  }
  &-error&-border {
    color: @error-color;
    border: 1px solid currentColor;
  }
  &-warning&-border {
    color: @warning-color;
    border: 1px solid currentColor;
  }
}
</style>