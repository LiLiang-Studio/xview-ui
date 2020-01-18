<template>
  <ui-modal :className="prefix" v-bind="$props" :maskClosable="false" v-on="$listeners">
    <div :class="`${prefix}-content`">
      <ui-icon :class="[`${prefix}-icon`, type]" :type="icon"/>
      <div v-html="content"></div>
    </div>
    <ui-button v-if="isNoNormal" slot="footer" type="primary" @click="onOK">{{okText}}</ui-button>
  </ui-modal>
</template>
<script>
import UiIcon from '../icon'
import UiModal from './Modal.vue'
import { Button as UiButton } from '../button'
import { iconTypes } from '@/tools'
export default {
  name: 'UiDialog',
  components: { UiIcon, UiModal, UiButton },
  data() {
    return { prefix: 'ui-dialog' }
  },
  props: {
    ...UiModal.props,
    content: String,
    type: {
      validator(value) {
        return ['info', 'success', 'warning', 'error', 'confirm'].indexOf(value) !== -1
      }
    }
  },
  computed: {
    icon() {
      return iconTypes[this.type]
    },
    isNoNormal() {
      return this.type !== 'confirm'
    }
  },
  methods: {
    onOK() {
      this.$emit('ok')
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-dialog {
  &-content {
    display: flex;
  }
  &-icon {
    font-size: 36px;
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