<template>
  <span :class="classes" v-on="$listeners">
    <slot>
      <img v-if="src" :src="src">
      <UiIcon v-else-if="icon" :type="icon"/>
    </slot>
  </span>
</template>
<script>
import UiIcon from '../icon'
export default {
  name: 'UiAvatar',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-avatar' }
  },
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
  },
  computed: {
    classes() {
      let { prefix, shape, size, icon, src } = this
      return [prefix, `${prefix}--${shape}`, `${prefix}--${size}`, { isIcon: icon }]
    }
  }
}
</script>
<style lang="less">
.ui-avatar {
  display: inline-block;
  text-align: center;
  background-color: #ccc;
  color: #fff;
  overflow: hidden;
  vertical-align: middle;
  position: relative;
  &.isIcon {
    font-size: 18px;
  }
  &--circle {
    border-radius: 50%;
  }
  &--square {
    border-radius: 4px;
  }
  &--default {
    width: 32px;
    height: 32px;
    line-height: 32px;
  }
  &--large {
    width: 40px;
    height: 40px;
    line-height: 40px;
    &.isIcon {
      font-size: 24px;
    }
  }
  &--small {
    width: 24px;
    height: 24px;
    line-height: 24px;
    &.isIcon {
      font-size: 14px;
    }
  }
  img {
    width: inherit;
    height: inherit;
  }
}
</style>