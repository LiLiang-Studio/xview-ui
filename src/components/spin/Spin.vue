<template>
  <transition :name="prefix" @afterLeave="$emit('leave')">
    <div :class="[prefix, {fix}]">
      <div>
        <slot><div :class="[`${prefix}--dot`, size]"></div></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'UiSpin',
  data() {
    return { prefix: 'ui-spin' }
  },
  props: {
    size: {
      validator(value) {
        return ['large', 'small'].indexOf(value) !== -1
      }
    },
    fix: Boolean
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-spin {
  text-align: center;
  color: @primary-color;
  transition: opacity .3s ease-in-out;
  &-enter, &-leave-to {
    opacity: 0;
  }
  &.fix {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 8;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
  }
  &--dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: @primary-color;
    animation: ui-spin-animate 1s ease-in-out infinite;
    &.small {
      width: 12px;
      height: 12px;
    }
    &.large {
      width: 32px;
      height: 32px;
    }
  }
}
@keyframes ui-spin-animate {
  0% {
    transform: scale(0);
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>