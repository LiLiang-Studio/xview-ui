<template>
  <span :class="[prefix, {hasSlot}]">
    <slot></slot>
    <sup v-if="isDot" :style="contentStyles" :class="[`${prefix}--dot`, type]"></sup>
    <sup v-else-if="isShow" :style="contentStyles" :class="contentClasses">{{showCount}}</sup>
  </span>
</template>
<script>
export default {
  name: 'UiBadge',
  data() {
    return { prefix: 'ui-badge', hasSlot: false }
  },
  props: {
    count: [Number, String],
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    dot: Boolean,
    className: String,
    type: {
      default: 'error',
      validator(value) {
        return ['success', 'primary', 'normal', 'error', 'warning', 'info'].indexOf(value) !== -1
      }
    },
    showZero: Boolean,
    text: String,
    offset: Array
  },
  computed: {
    showCount() {
      return this.text || (+this.count > +this.overflowCount ? `${this.overflowCount}+` : this.count)
    },
    isDot() {
      return this.dot && this.count !== 0
    },
    isShow() {
      return this.text || (!this.dot && (this.count || this.showZero))
    },
    contentClasses() {
      return [`${this.prefix}--count`, this.type, this.className]
    },
    contentStyles() {
      let [x, y] = (this.offset || []), style = {}
      if (x) style.right = `${-x}px`
      if (y) style.top = `${y}px`
      return style
    }
  },
  mounted() {
    this.hasSlot = this.$slots.default !== undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-badge;
@{prefix} {
  position: relative;
  display: inline-block;
  &--count, &--dot {
    box-shadow: 0 0 0 1px #fff;
    &.success {
      background-color: @success-color;
    }
    &.primary {
      background-color: @primary-color;
    }
    &.normal {
      color: @sub-color;
      background-color: #e6ebf1;
    }
    &.error {
      background-color: @error-color;
    }
    &.warning {
      background-color: @warning-color;
    }
    &.info {
      background-color: @info-color;
    }
  }
  &--count {
    display: block;
    height: 20px;
    min-width: 20px;
    border-radius: 10px;
    color: #fff;
    line-height: 18px;
    padding: 0 6px;
    font-size: 12px;
    white-space: nowrap;
    border: 1px solid transparent;
  }
  &--dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  &.hasSlot {
    @{prefix}--count, @{prefix}--dot {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
      transform: translate(50%, -50%);
    }
  }
}
</style>