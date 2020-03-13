<template>
  <div :class="prefix">
    <div :class="[`${prefix}_box`, {hasDesc}]">
      <x-icon :class="[`${prefix}_icon`, type]" v-if="showIcon" :type="icon"/>
      <div>
        <div :class="`${prefix}_title`" v-if="title">{{title}}</div>
        <slot></slot>
      </div>
      <x-close-icon-button :class="`${prefix}_close`" @click="close"/>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import XCloseIconButton from '../close-icon-button'
import { iconTypes } from '../../tools'
const prefix = 'x-notice'
export default {
  name: 'XNotice',
  components: { XIcon, XCloseIconButton },
  transition: prefix,
  props: {
    title: String,
    duration: Number,
    onClose: Function,
    type: {
      default: 'open',
      validator(v) {
        return ['info', 'success', 'warning', 'error', 'open'].indexOf(v) !== -1
      }
    }
  },
  data() {
    return { prefix, hasDesc: false }
  },
  computed: {
    icon() {
      return iconTypes[this.type]
    },
    showIcon() {
      return this.type !== 'open'
    }
  },
  mounted() {
    let [desc] = this.$slots.default
    this.hasDesc = desc && (desc.text || desc.children)
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
@prefix: .x-notice;
@{prefix} {
  left: 0;
  right: 0;
  text-align: right;
  padding: 0 12px 12px;
  transition: all .3s;
  &-leave-active  {
    position: absolute;
  }
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateX(24px);
  }
  &_box {
    width: 335px;
    pointer-events: all;
    display: inline-flex;
    text-align: left;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
    position: relative;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    &.hasDesc {
      @{prefix}_icon {
        font-size: 30px;
        margin-right: 16px;
        align-self: flex-start;
      }
      @{prefix}_title {
        font-weight: bold;
        margin-bottom: 6px;
      }
    }
  }
  &_icon {
    font-size: 20px;
    margin-right: 8px;
    &.info {
      color: @primary-color;
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
  }
  &_title {
    font-size: 16px;
    color: @title-color;
    word-break: break-all;
    padding-right: 16px;
    line-height: 1.4;
  }
  &_close {
    position: absolute;
    top: 7px;
    right: 7px;
  }
}
</style>