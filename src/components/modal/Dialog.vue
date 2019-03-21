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
import UiIcon from './../Icon'
import UiButton from './../button/Button'
import UiModalView from './ModalView'
import { getDefaultProps } from './modalUntils'
import { iconTypes } from './../../utils'
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