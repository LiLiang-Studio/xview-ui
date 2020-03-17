<template>
  <x-modal :class="`${prefix}_wrap`" v-bind="modalProps" v-on="listeners">
    <slot>
      <div :class="`${prefix}_content`">
        <x-icon :class="[`${prefix}_icon`, type]" size="36" :type="icon"/>
        <div v-html="content"></div>
      </div>
    </slot>
  </x-modal>
</template>
<script>
import XIcon from '../icon'
import XModal from './Modal.vue'
import XBtn from '../button'
import { iconTypes } from '../../tools'
const S = String, B = Boolean, F = Function
export default {
  name: 'XDialog',
  components: { XIcon, XModal, XBtn },
  props: {
    value: B,
    title: S,
    content: S,
    width: { default: 416 },
    okText: { type: S, default: '确定' },
    cancelText: {},
    loading: B,
    scrollable: B,
    onOk: F,
    onCancel: F,
    type: {
      validator(v) {
        return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(v) !== -1
      }
    }
  },
  data() {
    let _self = this
    return {
      prefix: 'x-dialog',
      listeners: {
        ...this.$listeners,
        'on-ok'() {
          _self.onOk && _self.onOk()
        },
        'on-cancel'() {
          _self.onCancel && _self.onCancel()
        }
      }
    }
  },
  computed: {
    icon() {
      return iconTypes[this.type]
    },
    modalProps() {
      let { content, onOk, onCancel, type, ...props } = this.$props
      return { ...props, closable: false, maskClosable: false, className: this.prefix, hasCancel: this.type === 'confirm' }
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-dialog {
  &_content {
    display: flex;
  }
  &_icon {
    float: left;
    margin-right: 12px;
    &.info {
      color: @primary-color;
    }
    &.success {
      color: @success-color;
    }
    &.warning, &.confirm {
      color: @warning-color;
    }
    &.error {
      color: @error-color;
    }
  }
}
</style>