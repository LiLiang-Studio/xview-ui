<template>
  <li :class="prefix">
    <span :class="`${prefix}--tail`"></span>
    <span :class="[`${prefix}--dot`, {[color]: clsName, custom}]" :style="styles">
      <slot name="dot"></slot>
    </span>
    <div :class="`${prefix}--content`">
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: 'UiTimelineItem',
  data() {
    return { prefix: 'ui-timeline-item', custom: false }
  },
  props: {
    color: {
      type: String,
      default: 'blue'
    }
  },
  computed: {
    clsName() {
      return ['blue', 'red', 'green'].indexOf(this.color) !== -1
    },
    styles() {
      return !this.clsName && { color: this.color }
    }
  },
  mounted() {
    this.custom = this.$slots.dot !== undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-timeline-item {
  padding-bottom: 24px;
  position: relative;
  &:last-child &--tail {
    display: none;
  }
  &--tail, &--dot {
    position: absolute;
    top: 0;
  }
  &--tail {
    height: 100%;
    left: 6px;
    border-left: 1px solid @divider-color;
  }
  &--dot {
    width: 13px;
    height: 13px;
    line-height: 1;
    font-size: 14px;
    border-radius: 50%;
    text-align: center;
    border: 1px solid currentColor;
    background-color: #fff;
    &.blue {
      color: @primary-color;
    }
    &.green {
      color: @success-color;
    }
    &.red {
      color: @error-color;
    }
    &.custom {
      border: none;
      border-radius: 0;
    }
  }
  &--content {
    padding: 1px 0 0 24px;
    font-size: 12px;
    position: relative;
    top: -3px;
  }
}
</style>