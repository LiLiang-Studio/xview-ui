<template>
  <span class="ui-badge">
    <slot></slot>
    <template v-if="count">
      <sup v-if="dot" class="ui-badge-dot"></sup>
      <sup v-else class="ui-badge-count" :class="className">{{showCount}}</sup>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    count: [Number, String],
    overflowCount: {
      type: [Number, String],
      default: 99
    },
    dot: Boolean,
    className: String
  },
  computed: {
    showCount() {
      return parseInt(this.count) > parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
    }
  }
}
</script>
<style lang="less">
@import url("../styles/vars.less");
.ui-badge {
  position: relative;
  display: inline-block;
  line-height: 1;
  vertical-align: middle;
}

.ui-badge-count, .ui-badge-dot {
  position: absolute;
  background-color: @error-color;
  z-index: 10;
  box-shadow: 0 0 0 1px #fff;
}

.ui-badge-count {
  transform: translateX(50%);
  transform-origin: -10% center;
  top: -10px;
  right: 0;
  height: 20px;
  min-width: 20px;
  border-radius: 10px;
  border: 1px solid transparent;
  color: #fff;
  line-height: 18px;
  text-align: center;
  padding: 0 6px;
  font-size: 12px;
  white-space: nowrap;
}

.ui-badge-dot {
  transform: translateX(-50%);
  transform-origin: 0 center;
  top: -4px;
  right: -8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;

}
</style>