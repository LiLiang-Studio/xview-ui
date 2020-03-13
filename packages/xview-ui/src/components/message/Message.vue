<template>
  <div :class="prefix">
    <div :class="[`${prefix}_box`, `${prefix}_${type}`, {background}]">
      <x-icon :class="`${prefix}_icon`" :type="icon"/>
      <slot></slot>
      <x-close-icon-button v-if="closable" :class="`${prefix}_close`" @click="close"/>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import XCloseIconButton from '../close-icon-button'
import { iconTypes } from '../../tools'
const prefix = 'x-message'
export default {
  name: 'XMessage',
  components: { XIcon, XCloseIconButton },
  transition: prefix,
  props: {
    duration: Number,
    onClose: Function,
    closable: Boolean,
    background: Boolean,
    type: {
      default: 'info',
      validator(v) {
        return ['info', 'success', 'warning', 'error', 'loading'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { prefix }
  },
  computed: {
    icon() {
      return iconTypes[this.type]
    }
  },
  mounted() {
    if (this.duration) this.tid = setTimeout(() => this.close(), this.duration * 1000)
  },
  beforeDestroy() {
    clearTimeout(this.tid)
  },
  methods: {
    close() {
      this.onClose && this.onClose(), this.$emit('close')
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-message;
@{prefix} {
  left: 0;
  right: 0;
  text-align: center;
  padding: 0 12px 12px;
  transition: all .3s;
  &-leave-active {
    position: absolute;
  }
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateY(-24px);
  }
  &_box {
    pointer-events: all;
    display: inline-flex;
    align-items: center;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #fff;
    &:not(.background) {
      box-shadow: 0 1px 6px rgba(0,0,0,.2);
    }
    &.background {
      border: 1px solid;
      color: @primary-color;
      .x-alert-theme_info();
    }
  }
  &_icon {
    margin-right: 8px;
    color: @primary-color;
  }
  &_success {
    &.background {
      .x-alert-theme_success();
    }
    &.background, @{prefix}_icon {
      color: @success-color;
    }
  }
  &_warning {
    &.background {
      .x-alert-theme_warning();
    }
    &.background, @{prefix}_icon {
      color: @warning-color;
    }
  }
  &_error {
    &.background {
      .x-alert-theme_error();
    }
    &.background, @{prefix}_icon {
      color: @error-color;
    }
  }
  &_loading {
    @{prefix}_icon {
      animation: x-load-loop 1s linear infinite;
    }
  }
  &_close {
    margin-left: 16px;
    color: currentColor;
  }
}
</style>