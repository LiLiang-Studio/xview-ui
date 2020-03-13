<template>
  <transition :name="prefix">
    <div :class="[prefix, {fix}]">
      <div>
        <slot>
          <div :class="[`${prefix}_dot`, size && `${prefix}_${size}`]"></div>
        </slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'XSpin',
  props: {
    size: {
      validator(v) {
        return ['large', 'small'].indexOf(v) !== -1
      }
    },
    fix: Boolean
  },
  data() {
    return { prefix: 'x-spin' }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@spin: x-spin;
@aniName: ~"@{spin}-animate";
.@{spin} {
  text-align: center;
  color: @primary-color;
  transition: opacity .2s ease-in-out;
  &-enter, &-leave-to {
    opacity: 0;
  }
  &.fix {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, .9);
  }
  &_dot {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: @primary-color;
    animation: @aniName 1s ease-in-out infinite;
  }
  &_small {
    width: 12px;
    height: 12px;
  }
  &_large {
    width: 32px;
    height: 32px;
  }
}
@keyframes @aniName {
  0% {
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(1);
  }
}
</style>