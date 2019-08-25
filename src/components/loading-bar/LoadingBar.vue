<template>
  <transition :name="prefix">
    <div :class="prefix" :style="styles">
      <div :class="[`${prefix}-inner`, status]" :style="innerStyles"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'UiLoadingBar',
  data() {
    return { prefix: 'ui-loadingBar' }
  },
  props: {
    color: String,
    failedColor: String,
    height: {
      type: Number,
      default: 2
    },
    percent: Number,
    status: String
  },
  computed: {
    styles() {
      return { height: `${this.height}px` }
    },
    innerStyles() {
      return { transform: `scaleX(${this.percent / 100})`, backgroundColor: this.status === 'error' ? this.failedColor : this.color }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-loadingBar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  &-leave-active {
    transition: opacity .3s ease-in-out .5s;
  }
  &-leave-to {
    opacity: 0;
  }
  &-inner {
    height: 100%;
    transform-origin: 0 0;
    transition: transform .2s;
    background-color: @primary-color;
    &.error {
      background-color: @error-color;
    }
  }
}
</style>