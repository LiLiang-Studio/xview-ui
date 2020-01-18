<template>
  <div :class="[prefix, curStatus, {vertical}]">
    <div :class="`${prefix}-box`">
      <div :class="`${prefix}-outer`">
        <div :class="`${prefix}-inner`" :style="innerStyle">
          <div :class="`${prefix}-bg`" :style="bgStyle"></div>
        </div>
      </div>
      <div v-if="!hideInfo" :class="`${prefix}-text`">
        <slot>
          <UiIcon v-if="statusIcon" :class="`${prefix}-status-icon`" :type="statusIcon"/>
          <span v-else>{{Math.min(percent, 100)}}%</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiProgress',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-progress' }
  },
  props: {
    percent: {
      type: Number,
      default: 0
    },
    status: {
      default: 'normal',
      validator(value) {
        return ['normal', 'active', 'wrong', 'success'].indexOf(value) !== -1
      }
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    hideInfo: Boolean,
    vertical: Boolean
  },
  computed: {
    innerStyle() {
      return { borderRadius: `${this.strokeWidth * .5}px`, [this.vertical ? 'width' : 'height']: `${this.strokeWidth}px` }
    },
    bgStyle() {
      return Object.assign({}, this.innerStyle, { [this.vertical ? 'height' : 'width']: `${Math.min(this.percent, 100)}%` })
    },
    curStatus() {
      return this.percent < 100 ? this.status : 'success'
    },
    statusIcon() {
      return ({ wrong: 'ios-close', success: 'ios-checkmark' })[this.curStatus]
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-progress {
  &-box {
    width: 100%;
    display: table;
    border-collapse: collapse;
  }
  &-box, &-outer, &-inner {
    height: 100%;
  }
  &.vertical {
    height: 100%;
    margin-right: 6px;
    display: inline-block;
  }
  &.vertical &-outer {
    padding: 0;
    position: relative;
  }
  &.vertical &-bg {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &.vertical.active &-bg:before {
    transform-origin: 0 100%;
    animation-name: ui-progress-animate-y;
  }
  &.normal &-bg, &.active &-bg {
    background-color: @info-color;
  }
  &.active &-bg:before {
    content: '';
    display: block;
    height: 100%;
    background-color: #fff;
    transform-origin: 0 0;
    animation: ui-progress-animate-x 2s ease-in-out infinite;
  }
  &.wrong {
    color: @error-color;
  }
  &.success {
    color: @success-color;
  }
  &.wrong &-bg, &.success &-bg {
    background-color: currentColor;
  }
  &-outer, &-text {
    display: table-cell;
    vertical-align: middle;
  }
  &-outer {
    padding: 4px 0;
  }
  &-inner {
    overflow: hidden;
    background-color: @disabled-bg-color;
  }
  &-text {
    width: 1px;
    padding-left: 10px;
    white-space: nowrap;
  }
  &-bg {
    transition: width .2s;
  }
  &-status-icon {
    font-size: 14px;
  }
}
</style>