<template>
  <transition name="ui-modal">
    <UiModalView v-bind="this.$props" v-if="visible" :style="{zIndex}" :loading="isLoading"
      @ok="handleOK" @close="handleClose" @cancel="handleCancel">
      <slot></slot>
      <slot slot="close" name="close"></slot>
      <slot slot="header" name="header"></slot>
      <slot slot="footer" name="footer"></slot>
    </UiModalView>
  </transition>
</template>
<script>
import UiModalView from './ModalView'
import { getDefaultProps } from './modalUntils'
import { setMaxZIndex, winScrollLock } from '../../utils'
export default {
  components: { UiModalView },
  data() {
    return {
      zIndex: setMaxZIndex(),
      visible: this.value,
      isLoading: false
    }
  },
  props: { ...getDefaultProps(), value: Boolean },
  watch: {
    value(newVal) {
      this.visible = newVal
      if (newVal) {
        winScrollLock.lock()
        this.zIndex = setMaxZIndex()
      } else {
        winScrollLock.unlock()
        this.isLoading = false
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', false)
      this.$emit('on-visible-change', false)
    },
    handleCancel() {
      this.$emit('on-cancel')
      this.handleClose()
    },
    handleOK() {
      this.$emit('on-ok')
      if (this.loading) {
        return this.isLoading = true
      }
      this.handleClose()
    }
  },
  mounted() {
    document.body.appendChild(this.$el)
  },
  beforeDestroy() {
    this.$el.remove()
  }
}
</script>