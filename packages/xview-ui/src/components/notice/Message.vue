<template>
  <div :class="prefix">
    <div :class="`${prefix}--box`">
      <UiIcon :class="[`${prefix}--icon`, type]" :type="iconType"/>
      <slot></slot>
      <UiCloseIconButton v-if="closable" :class="`${prefix}--close`" @click="close"/>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiCloseIconButton from '../close-icon-button'
import { iconTypes, isFunc } from '../../tools'
const prefix = 'ui-message'
export default {
  name: 'UiMessage',
  components: { UiIcon, UiCloseIconButton },
  transition: prefix,
  data() {
    return { prefix }
  },
  props: {
    duration: Number,
    onClose: Function,
    closable: Boolean,
    type: {
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    }
  },
  mounted() {
    if (this.duration) {
      this.timerId = setTimeout(() => this.close(), this.duration * 1000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timerId)
  },
  methods: {
    close() {
      isFunc(this.onClose) && this.onClose()
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-message {
  left: 0;
  right: 0;
  padding: 6px 12px;
  text-align: center;
  transition: all .3s;
  &-leave-active {
    position: absolute;
  }
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateY(-24px);
  }
  &--box {
    pointer-events: all;
    display: inline-flex;
    align-items: center;
    font-size: 13px;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
  }
  &--icon {
    font-size: 14px;
    margin-right: 12px;
    &.info {
      color: @info-color;
    }
    &.success {
      color: @success-color;
    }
    &.warning {
      color: @warning-color;
    }
    &.error {
      color: @error-color;
    }
    &.loading {
      color: @primary-color;
      animation: x-load-loop 1s linear infinite;
    }
  }
  &--close {
    margin-left: 16px;
  }
}
</style>