<template>
  <li class="ui-timeline-item">
    <span class="ui-timeline-item-tail"></span>
    <span class="ui-timeline-item-dot" :class="{[color]: clsName, custom}" :style="styles">
      <slot name="dot"></slot>
    </span>
    <div class="ui-timeline-item-content">
      <slot></slot>
    </div>
  </li>
</template>
<script>
export default {
  data() {
    return {
      custom: false
    }
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
      return !this.clsName && this.color ? { borderColor: this.color } : {}
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
  &:last-child .ui-timeline-item-tail {
    display: none;
  }
}

.ui-timeline-item-tail, .ui-timeline-item-dot {
  position: absolute;
  top: 0;
}

.ui-timeline-item-tail {
  height: 100%;
  left: 6px;
  border-left: 1px solid @divider-color;
}

.ui-timeline-item-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid;
  background-color: #fff;
  &.blue {
    color: @primary-color;
    border-color: @primary-color;
  }
  &.green {
    color: @success-color;
    border-color: @success-color;
  }
  &.red {
    color: @error-color;
    border-color: @error-color;
  }
  &.custom {
    text-align: center;
    line-height: 1;
    border: none;
    border-radius: 0;
    font-size: 14px;
  }
}

.ui-timeline-item-content {
  padding: 1px 0 0 24px;
  font-size: 12px;
  position: relative;
  top: -3px;
}
</style>