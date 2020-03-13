<template>
  <transition :name="prefix">
    <div :class="prefix" :style="styles">
      <div :class="[`${prefix}_bar`, status]" :style="barStyle"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'XLoadingBar',
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
  data() {
    return { prefix: 'x-loadingBar' }
  },
  computed: {
    styles() {
      return { height: `${this.height}px` }
    },
    barStyle() {
      return { transform: `scaleX(${this.percent / 100})`, background: this.status === 'error' ? this.failedColor : this.color }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-loadingBar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  &-leave-active {
    transition: opacity .3s ease-in-out .8s;
  }
  &-leave-to {
    opacity: 0;
  }
  &_bar {
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