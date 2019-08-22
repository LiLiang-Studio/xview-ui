<template>
  <UiModalView v-if="visible" class="ui-dialog" v-bind="this.$props" :class="[type]" :maskClosable="false"
    @ok="handleOK" @close="handleClose" @cancel="handleCancel">
    <div class="ui-dialog-content">
      <UiIcon class="ui-dialog-icon" :type="iconType"/>
      <div v-html="content"></div>
    </div>
    <UiButton v-if="!isNormal" slot="footer" type="primary" size="large" @click="handleOK">{{okText || '确定'}}</UiButton>
  </UiModalView>
</template>
<script>
import UiIcon from '../icon'
import UiButton from './../button/Button.vue'
import UiModalView from './ModalView.vue'
import { getDefaultProps } from './modalUntils'
import { iconTypes } from '../../tools'
export default {
  components: { UiIcon, UiButton, UiModalView },
  data() {
    return {
      visible: false
    }
  },
  props: {
    ...getDefaultProps(),
    type: {
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    iconType() {
      return iconTypes[this.type]
    },
    isNormal() {
      return this.type === 'confirm'
    }
  },
  methods: {
    handleOK() {
      this.$emit('ok')
    },
    handleClose() {
      this.$emit('close')
    },
    handleCancel() {
      this.$emit('cancel')
    }
  },
  mounted() {
    this.visible = true
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-dialog {
  .ui-dialog-icon {
    font-size: 36px;
    margin-right: 12px;
  }
  &.info {
    .ui-dialog-icon {
      color: @primary-color;
    }
  }
  &.success {
    .ui-dialog-icon {
      color: @success-color;
    }
  }
  &.warning {
    .ui-dialog-icon {
      color: @warning-color;
    }
  }
  &.error {
    .ui-dialog-icon {
      color: @error-color;
    }
  }
  &.confirm {
    .ui-dialog-icon {
      color: @warning-color;
    }
  }
  .ui-dialog-content {
    display: flex;
  }
}
</style>