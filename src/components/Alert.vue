<template>
  <transition name="ui-fade">
    <div class="ui-alert" v-if="visible" :class="[type, { closable, showIcon, hasDesc }]">
      <UiIcon v-if="showIcon" class="ui-alert-icon" :type="iconType"/>
      <div class="ui-alert-body">
        <p class="ui-alert-title"><slot></slot></p>
        <p class="ui-alert-desc"><slot name="desc"></slot></p>
      </div>
      <UiCloseIconButton v-if="closable" class="ui-alert-close" @click="close"/>
    </div>
  </transition>
</template>
<script>
import UiIcon from './Icon'
import UiCloseIconButton from './CloseIconButton'
import { iconTypes } from '../utils'
export default {
  components: { UiIcon, UiCloseIconButton },
  data() {
    return {
      hasDesc: false,
      visible: true
    }
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
      return iconTypes[this.type]
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
.ui-alert {
  border: 1px solid;
  border-radius: 6px;
  padding: 8px 48px 8px 16px;
  position: relative;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  &.info {
    border-color: lighten(@info-color, 33.9%);
    background-color: lighten(@info-color, 39%);
    .ui-alert-icon {
      color: @primary-color;
    }
  }
  &.success {
    border-color: lighten(@success-color, 45%);
    background-color: lighten(@success-color, 50%);
    .ui-alert-icon {
      color: @success-color;
    }
  }
  &.warning {
    border-color: lighten(@warning-color, 40%);
    background-color: lighten(@warning-color, 45%);
    .ui-alert-icon {
      color: @warning-color;
    }
  }
  &.error {
    border-color: lighten(@error-color, 40%);
    background-color: lighten(@error-color, 45%);
    .ui-alert-icon {
      color: @error-color;
    }
  }
  &.hasDesc {
    padding: 16px;
    .ui-alert-icon {
      font-size: 28px;
      margin-right: 16px;
    }
  }
}

.ui-alert-icon {
  font-size: 14px;
  margin-right: 8px;
}

.ui-alert-title {
  color: @title-color;
  font-size: 14px;
  word-break: break-all;
  padding-right: 32px;
  line-height: 1.4;
}

.ui-alert-desc {
  font-size: 12px;
  line-height: 1.7;
  word-break: break-word;
  margin-top: 2px;
}

.ui-alert-close {
  position: absolute;
  top: 7px;
  right: 7px;
  width: 22px;
  text-align: center;
}
</style>