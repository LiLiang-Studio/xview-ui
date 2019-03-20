<template>
  <div class="ui-progress" :class="[curStatus, {vertical}]">
    <div class="ui-progress-box">
      <div class="ui-progress-outer">
        <div class="ui-progress-inner" :style="innerStyle">
          <div class="ui-progress-bg" :style="bgStyle"></div>
        </div>
      </div>
      <div v-if="!hideInfo" class="ui-progress-text">
        <slot>
          <UiIcon v-if="statusIcon" :type="statusIcon"/>
          <span v-else>{{Math.min(percent, 100)}}%</span>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import UiIcon from './Icon'
export default {
  components: { UiIcon },
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
      let style = { borderRadius: `${this.strokeWidth * .5}px` }
      return this.vertical ? { ...style, width: `${this.strokeWidth}px` } : { ...style, height: `${this.strokeWidth}px` }
    },
    bgStyle() {
      let percent = Math.min(this.percent, 100)
      return this.vertical ? { ...this.innerStyle, height: `${percent}%` } : { ...this.innerStyle, width: `${percent}%` }
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
.ui-progress {
  .ui-progress-box {
    width: 100%;
    display: table;
    border-collapse: collapse;
  }
  &.vertical {
    display: inline-block;
    margin-right: 6px;
    &, .ui-progress-box, .ui-progress-outer, .ui-progress-inner {
      width: auto;
      height: 100%;
    }
    .ui-progress-outer {
      padding: 0;
    }
    .ui-progress-outer {
      position: relative;
    }
    .ui-progress-inner {
      vertical-align: middle;
    }
    .ui-progress-bg {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
    }
    &.active .ui-progress-bg:before {
      transform-origin: 0 100%;
      animation-name: ui-progress-animate-y;
    }
  }
  &.normal, &.active {
    .ui-progress-bg {
      background-color: @info-color;
    }
  }
  &.active {
    .ui-progress-bg:before {
      content: '';
      display: block;
      height: 100%;
      background-color: #fff;
      transform-origin: 0 0;
      animation: ui-progress-animate-x 2s ease-in-out infinite;
    }
  }
  &.wrong {
    color: @error-color;
    .ui-progress-bg {
      background-color: @error-color;
    }
  }
  &.success {
    color: @success-color;
    .ui-progress-bg {
      background-color: @success-color;
    }
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
}
</style>