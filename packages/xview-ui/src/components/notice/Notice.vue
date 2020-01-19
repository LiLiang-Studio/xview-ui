<template>
  <div :class="prefix">
    <div :class="[`${prefix}--box`, {hasDesc}]">
      <UiIcon :class="[`${prefix}--icon`, type]" v-if="showIcon" :type="iconType"/>
      <div :class="`${prefix}--body`">
        <div :class="`${prefix}--title`" v-if="title">{{title}}</div>
        <slot></slot>
      </div>
      <UiCloseIconButton :class="`${prefix}--close`" @click="close"/>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import UiCloseIconButton from '../close-icon-button'
import { iconTypes, isFunc } from '../../tools'
const prefix = 'ui-notice'
export default {
  name: 'UiNotice',
  components: { UiIcon, UiCloseIconButton },
  transition: prefix,
  data() {
    return { prefix, hasDesc: false }
  },
  props: {
    title: String,
    duration: Number,
    onClose: Function,
    type: {
      default: 'open',
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'open'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    },
    showIcon() {
      return this.type !== 'open'
    }
  },
  mounted() {
    let [desc] = this.$slots.default
    this.hasDesc = desc && (desc.text || desc.children)
    if (this.duration) {
      this.timerId = setTimeout(() => this.close(), this.duration * 1000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timerId)
  },
  methods: {
    close(event) {
      isFunc(this.onClose) && this.onClose()
      this.$emit('close')
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-notice;
@{prefix} {
  text-align: right;
  padding: 6px 12px;
  transition: all .3s;
  left: 0;
  right: 0;
  &-leave-active  {
    position: absolute;
  }
  &-enter, &-leave-to {
    opacity: 0;
    transform: translateX(24px);
  }
  &--box {
    pointer-events: all;
    width: 335px;
    display: inline-flex;
    text-align: left;
    align-items: center;
    background-color: #fff;
    padding: 16px;
    border-radius: 4px;
    position: relative;
    box-shadow: 0 1px 6px rgba(0,0,0,.2);
    &.hasDesc {
      @{prefix}--icon {
        font-size: 28px;
        margin-right: 16px;
        align-self: flex-start;
      }
      @{prefix}--title {
        font-weight: bold;
        margin-bottom: 6px;
      }
    }
  }
  &--icon {
    font-size: 14px;
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
  &--title {
    color: @title-color;
    font-size: 14px;
    word-break: break-all;
    padding-right: 16px;
    line-height: 1.4;
  }
  &--desc {
    font-size: 12px;
    line-height: 1.5;
    word-break: break-word;
    margin-top: 2px;
  }
  &--close {
    position: absolute;
    top: 7px;
    right: 7px;
    width: 22px;
    text-align: center;
  }
}
</style>