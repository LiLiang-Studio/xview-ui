<template>
  <transition :name="prefix">
    <div v-if="visible" :class="classes">
      <UiIcon v-if="showIcon" :class="`${prefix}--icon`" :type="iconType"/>
      <div :class="`${prefix}--body`">
        <p :class="`${prefix}--title`">
          <slot></slot>
        </p>
        <p :class="`${prefix}--desc`">
          <slot name="desc"></slot>
        </p>
      </div>
      <UiCloseIconButton v-if="closable" :class="`${prefix}--close`" @click="close"/>
    </div>
  </transition>
</template>
<script>
import UiIcon from '../icon'
import UiCloseIconButton from '../close-icon-button'
export default {
  name: 'UiAlert',
  components: { UiIcon, UiCloseIconButton },
  data() {
    return { prefix: 'ui-alert', hasDesc: false, visible: true }
  },
  props: {
    type: {
      default: 'info',
      validator(value) {
        return ['info', 'success', 'warning', 'error'].indexOf(value) !== -1
      }
    },
    closable: Boolean,
    showIcon: Boolean
  },
  computed: {
    iconType() {
      return this.$uiTools.iconTypes[this.type]
    },
    classes() {
      let { prefix, type, hasDesc } = this
      return [prefix, `${prefix}--${type}`, { hasDesc }]
    }
  },
  methods: {
    close(event) {
      this.visible = false
      this.$emit('on-close', event)
    }
  },
  mounted() {
    this.hasDesc = this.$slots.desc !== undefined
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@prefix: .ui-alert;
@{prefix} {
  border: 1px solid;
  border-radius: 6px;
  padding: 8px 48px 8px 16px;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  transition: opacity .22s ease-in-out;
  &--info {
    border-color: lighten(@info-color, 33.9%);
    background-color: lighten(@info-color, 39%);
    @{prefix}--icon {
      color: @primary-color;
    }
  }
  &--success {
    border-color: lighten(@success-color, 45%);
    background-color: lighten(@success-color, 50%);
    @{prefix}--icon {
      color: @success-color;
    }
  }
  &--warning {
    border-color: lighten(@warning-color, 40%);
    background-color: lighten(@warning-color, 45%);
    @{prefix}--icon {
      color: @warning-color;
    }
  }
  &--error {
    border-color: lighten(@error-color, 40%);
    background-color: lighten(@error-color, 45%);
    @{prefix}--icon {
      color: @error-color;
    }
  }
  &.hasDesc {
    padding: 16px;
    @{prefix}--icon {
      font-size: 28px;
      margin-right: 16px;
    }
  }
  &--icon {
    font-size: 14px;
    margin-right: 8px;
  }
  &--title {
    color: @title-color;
    font-size: 14px;
    word-break: break-all;
    padding-right: 32px;
    line-height: 1.4;
  }
  &--desc {
    font-size: 12px;
    line-height: 1.7;
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
  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>