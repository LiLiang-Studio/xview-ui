<template>
  <div :class="classes">
    <div :class="`${prefix}_box`" :style="boxStyle">
      <div :class="`${prefix}_bg`" :style="bgStyle">
        <x-info v-if="textInside" v-bind="iconProps"></x-info>
      </div>
      <div v-if="successPercent" :class="`${prefix}_bg success`" :style="successBGStyle"></div>
    </div>
    <x-info v-if="!textInside" v-bind="iconProps"></x-info>
  </div>
</template>
<script>
import props from './props'
import { isArr } from '../../tools'
import XInfo from './Info.vue'
export default {
  name: 'XProgress',
  components: { XInfo },
  data() {
    return { prefix: 'x-progress' }
  },
  props: {
    ...props,
    successPercent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 10
    },
    strokeColor: [String, Array],
    vertical: Boolean
  },
  computed: {
    iconProps() {
      return { ...this.$props, status: this.percent < 100 ? this.status : 'success' }
    },
    classes() {
      return [this.prefix, `${this.prefix}_${this.iconProps.status}`, { vertical: this.vertical }]
    },
    boxStyle() {
      return { borderRadius: `${this.strokeWidth}px`, [this.vertical ? 'width' : 'height']: `${this.strokeWidth}px` }
    },
    bgStyle() {
      let c = this.strokeColor
      let [c0, c1] = isArr(c) ? c : [c]
      let bgStyle = { background: c1 ? `linear-gradient(to right,${c0},${c1})` : c0 }
      return { ...bgStyle, ...this.boxStyle, [this.vertical ? 'height' : 'width']: `${Math.min(this.percent, 100)}%` }
    },
    successBGStyle() {
      return { ...this.boxStyle, [this.vertical ? 'height' : 'width']: `${Math.min(this.successPercent, 100)}%` }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-progress;
@aniXName: x-progress-animate-x;
@aniYName: x-progress-animate-y;
@{prefix} {
  display: flex;
  align-items: center;
  color: @primary-color;
  padding: 4px 0;
  &_wrong {
    color: @error-color;
  }
  &_success {
    color: @success-color;
  }
  &_active &_bg:before {
    content: '';
    display: block;
    height: 100%;
    background-color: #fff;
    transform-origin: 0 0;
    animation: @aniXName 2s ease-in-out infinite;
  }
  &_box {
    flex: 1;
    position: relative;
    background-color: lighten(@disabled-color, 15%);
  }
  &_bg {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    transition: width .2s;
    background: currentColor;
    &.success {
      background: @success-color;
    }
  }
  &-info {
    font-size: 14px;
    margin-left: 10px;
    &_text {
      font-size: 12px;
      color: @content-color;
    }
    &.textInside {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      padding-right: 6px;
      display: inline-flex;
      align-items: center;
    }
    &.textInside &_text {
      color: #fff;
    }
  }
  &.vertical {
    height: 100%;
    padding: 0;
    margin-right: 6px;
    display: inline-flex;
    @{prefix}_box {
      height: 100%;
      position: relative;
    }
    @{prefix}_bg {
      top: auto;
      bottom: 0;
    }
    &@{prefix}_active @{prefix}_bg:before {
      transform-origin: 0 100%;
      animation-name: @aniYName;
    }
  }
}
@keyframes @aniXName {
  from {
    opacity: .3;
    transform: scaleX(0);
  }
  to {
    opacity: 0;
    transform: scaleX(1);
  }
}
@keyframes @aniYName {
  from {
    opacity: .3;
    transform: scaleY(0);
  }
  to {
    opacity: 0;
    transform: scaleY(1);
  }
}
</style>