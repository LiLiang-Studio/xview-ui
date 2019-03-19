<template>
  <li class="ui-timeline-item" :style="styles">
    <span class="ui-timeline-item-tail"></span>
    <span :class="[{[color]: clsName}, `ui-timeline-item-${hasSlotDot ? 'custom' : 'dot'}` ]">
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
      hasSlotDot: false
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
    this.hasSlotDot = this.$slots.dot !== undefined
  }
}
</script>
<style lang="less">
.ui-timeline-item {
  padding-bottom: 12px;
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

.ui-timeline-item-dot, .ui-timeline-item-custom {
  &.blue {
    border-color: @primary-color;
  }
  &.green {
    border-color: @success-color;
  }
  &.red {
    border-color: @error-color;
  }
}

.ui-timeline-item-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid transparent;
  background-color: #fff;
}

.ui-timeline-item-custom {
  width: 40px;
  height: auto;
  margin-top: 6px;
  padding: 3px 0;
  text-align: center;
  line-height: 1;
  border: 0;
  border-radius: 0;
  font-size: 14px;
  position: absolute;
  left: -13px;
  transform: translateY(-50%);
  &.blue {
    color: @primary-color;
  }
  &.green {
    color: @success-color;
  }
  &.red {
    color: @error-color;
  }
}

.ui-timeline-item-content {
  padding: 1px 1px 10px 24px;
  font-size: 12px;
  position: relative;
  top: -3px;
}
</style>