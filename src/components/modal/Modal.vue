<template>
  <transition name="ui-modal">
    <div v-show="visible" class="ui-modal" :class="[{middle}, className]" :style="{zIndex}">
      <div class="ui-modal-overlay" @click="handleOverlayClick"></div>
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
            <ui-button type="primary" size="large" :loading="showLoading" @click="handleOK">{{okText}}</ui-button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import { setMaxZIndex } from '../../utils'
import UiButton from './../button/Button'
import UiCloseIconButton from './../CloseIconButton'
export default {
  components: { UiButton, UiCloseIconButton },
  data() {
    return {
      zIndex: setMaxZIndex(),
      visible: this.value,
      hasTitle: false,
      showLoading: false
    }
  },
  props: {
    value: Boolean,
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    loading: Boolean,
    scrollable: Boolean,
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    width: {
      type: [Number, String],
      default: 520
    },
    styles: Object,
    className: String,
    middle: Boolean
  },
  computed: {
    dialogStyle() {
      let width = `${parseInt(this.width)}px`
      return { width, maxWidth: width, ...this.styles }
    }
  },
  watch: {
    value(newVal) {
      this.visible = newVal
      this.showLoading = false
      if (newVal) this.zIndex = setMaxZIndex()
    }
  },
  methods: {
    handleOverlayClick() {
      if (this.maskClosable) this.close()
    },
    close() {
      this.visible = false
      this.$emit('input', this.visible)
      this.$emit('on-visible-change', this.visible)
    },
    handleCancel() {
      this.$emit('on-cancel')
      this.close()
    },
    handleOK() {
      this.$emit('on-ok')
      if (this.loading) {
        this.showLoading = true
        return
      }
      this.close()
    }
  },
  mounted() {
    this.hasTitle = this.$slots.header !== undefined || this.title
    document.body.appendChild(this.$el)
  }
}
</script>
<style lang="less">
.ui-modal, .ui-modal-overlay {
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
  &.verticalCenter {
    display: flex;
    align-items: center;
    justify-content: center;
    .ui-modal-dialog {
      top: 0;
    }
  }
}

.ui-modal-overlay {
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