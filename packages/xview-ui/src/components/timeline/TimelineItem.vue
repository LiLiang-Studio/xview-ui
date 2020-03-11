<template>
  <li :class="prefix">
    <span :class="`${prefix}_tail`"></span>
    <span :class="[`${prefix}_dot`, {[color]: clsName, custom}]" :style="styles">
      <slot name="dot"></slot>
    </span>
    <div :class="`${prefix}_content`">
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  name: 'XTimelineItem',
  props: { color: String },
  data() {
    return { prefix: 'x-timeline-item', custom: false }
  },
  computed: {
    clsName() {
      return ['blue', 'red', 'green'].indexOf(this.color) !== -1
    },
    styles() {
      return this.clsName ? {} : { color: this.color }
    }
  },
  mounted() {
    this.custom = this.$slots.dot
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-timeline {
  list-style: none;
  &-item {
    font-size: 14px;
    position: relative;
    padding-bottom: 24px;
    &:last-child &_tail {
      display: none;
    }
    &_tail, &_dot {
      position: absolute;
      top: 0;
    }
    &_tail {
      height: 100%;
      left: 6px;
      border-left: 1px solid @divider-color;
    }
    &_dot {
      display: flex;
      justify-content: center;
      width: 13px;
      height: 13px;
      border-radius: 50%;
      border: 1px solid currentColor;
      background-color: #fff;
      color: @primary-color;
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
    &_content {
      padding-left: 24px;
      position: relative;
      top: -3px;
    }
  }
  &.pending &-item:nth-last-child(2) &-item_tail {
    border-left-style: dotted;
  }
}
</style>