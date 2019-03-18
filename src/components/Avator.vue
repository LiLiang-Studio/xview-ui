<template>
  <span class="ui-avator" :class="[{icon}, shape, size]">
    <slot>
      <img v-if="src" :src="src">
      <UiIcon v-else-if="icon" :type="icon"/>
    </slot>
  </span>
</template>
<script>
import UiIcon from './Icon'
export default {
  components: { UiIcon },
  props: {
    shape: {
      default: 'circle',
      validator(value) {
        return ['circle', 'square'].indexOf(value) !== -1
      }
    },
    size: {
      default: 'default',
      validator(value) {
        return ['large', 'small', 'default'].indexOf(value) !== -1
      }
    },
    src: String,
    icon: String
  }
}
</script>
<style lang="less">
.ui-avator {
  display: inline-block;
  text-align: center;
  background-color: #ccc;
  color: #fff;
  overflow: hidden;
  vertical-align: middle;
  width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 50%;
  &.square {
    border-radius: 4px;
  }
  &.icon {
    font-size: 18px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  &.large {
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    &.icon {
      font-size: 24px;
    }
  }
  &.small {
    width: 24px;
    height: 24px;
    line-height: 24px;
    &.icon {
      font-size: 14px;
    }
  }
}
</style>