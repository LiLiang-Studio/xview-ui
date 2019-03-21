<template>
  <div class="ui-modal" :class="[{middle}, className]">
    <div class="ui-modal-mask" @click="handleMaskClick"></div>
    <div class="ui-modal-dialog" :style="dialogStyle">
      <div v-if="hasTitle" class="ui-modal-header">
        <slot name="header">{{title}}</slot>
      </div>
      <a v-if="closable" class="ui-modal-close" @click="close">
        <slot name="close"><UiCloseIconButton/></slot>
      </a>
      <div class="ui-modal-body"><slot></slot></div>
      <div class="ui-modal-footer">
        <slot name="footer">
          <ui-button type="text" size="large" @click="handleCancel">{{cancelText}}</ui-button>
          <ui-button type="primary" size="large" :loading="loading" @click="handleOK">{{okText}}</ui-button>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
import { getDefaultProps } from './modalUntils'
import UiButton from './../button/Button'
import UiCloseIconButton from './../CloseIconButton'
export default {
  components: { UiButton, UiCloseIconButton },
  data() {
    return { hasTitle: false }
  },
  props: getDefaultProps(),
  computed: {
    dialogStyle() {
      let width = `${parseInt(this.width)}px`
      return { width, maxWidth: width, ...this.styles }
    }
  },
  methods: {
    handleMaskClick() {
      if (this.maskClosable) this.close()
    },
    close() {
      this.$emit('close')
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleOK() {
      this.$emit('ok')
    }
  },
  mounted() {
    this.hasTitle = this.$slots.header !== undefined || this.title
  }
}
</script>
<style lang="less">
.ui-modal, .ui-modal-mask {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.ui-modal {
  position: fixed;
  overflow: auto;
  padding: 12px;
  will-change: transform, opacity;
  &.middle {
    display: flex;
    align-items: center;
    justify-content: center;
    .ui-modal-dialog {
      top: 0;
    }
  }
}

.ui-modal-mask {
  position: absolute;
  background-color: rgba(0, 0, 0, .5);
}

.ui-modal-dialog {
  background-color: #fff;
  margin: 0 auto;
  position: relative;
  top: 100px;
  border-radius: 6px;
}

.ui-modal-close {
  position: absolute;
  top: 8px;
  right: 16px;
  .ui-close-icon-button {
    font-size: 31px;
  }
}

.ui-modal-header {
  font-size: 14px;
  font-weight: bold;
  color: @title-color;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 14px 16px;
  border-bottom: 1px solid @divider-color;
}

.ui-modal-body {
  padding: 16px;
  font-size: 12px;
  line-height: 1.5;
}

.ui-modal-footer {
  padding: 12px 18px;
  border-top: 1px solid @divider-color;
  text-align: right;
  button + button {
    margin-left: 8px;
  }
}
</style>