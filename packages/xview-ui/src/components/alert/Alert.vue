<template>
  <transition :name="prefix">
    <div v-if="visible" :class="[prefix, `${prefix}_${type}`, { hasDesc }]">
      <span v-if="showIcon" :class="`${prefix}_icon`">
        <slot name="icon">
          <x-icon :type="iconType"/>
        </slot>
      </span>
      <div>
        <div :class="`${prefix}_title`">
          <slot></slot>
        </div>
        <div :class="`${prefix}_desc`">
          <slot name="desc"></slot>
        </div>
      </div>
      <span v-if="closable" :class="`${prefix}_close`" @click="close">
        <slot name="close">
          <x-close-icon-button/>
        </slot>
      </span>
    </div>
  </transition>
</template>
<script>
import XIcon from '../icon'
import XCloseIconButton from '../close-icon-button'
import { iconTypes } from '../../tools'
export default {
  name: 'XAlert',
  components: { XIcon, XCloseIconButton },
  props: {
    type: {
      default: 'info',
      validator(v) {
        return ['info', 'success', 'warning', 'error'].indexOf(v) !== -1
      }
    },
    closable: Boolean,
    showIcon: Boolean
  },
  data() {
    return { prefix: 'x-alert', hasDesc: false, visible: true }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    }
  },
  mounted() {
    this.hasDesc = !!this.$slots.desc
  },
  methods: {
    close(e) {
      this.visible = false
      this.$emit('on-close', e)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .x-alert;
@{prefix} {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 6px;
  padding: 8px 48px 8px 16px;
  margin-bottom: 10px;
  transition: opacity .22s ease-in-out;
  .x-alert-theme_info();
  &_success {
    .x-alert-theme_success();
    @{prefix}_icon {
      color: @success-color;
    }
  }
  &_warning {
    .x-alert-theme_warning();
    @{prefix}_icon {
      color: @warning-color;
    }
  }
  &_error {
    .x-alert-theme_error();
    @{prefix}_icon {
      color: @error-color;
    }
  }
  &.hasDesc {
    padding: 16px;
    @{prefix}_icon {
      font-size: 28px;
      margin-right: 16px;
    }
  }
  &_icon {
    font-size: 14px;
    margin-right: 8px;
    color: @primary-color;
  }
  &_title {
    color: @title-color;
    font-size: 14px;
    padding-right: 32px;
    line-height: 1.4;
    word-break: break-word;
  }
  &_desc {
    font-size: 12px;
    line-height: 1.7;
    margin-top: 2px;
    word-break: break-word;
  }
  &_close {
    position: absolute;
    top: 7px;
    right: 7px;
  }
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>