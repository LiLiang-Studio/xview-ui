<template>
  <div class="ui-tooltip">
    <div class="ui-tooltip-rel" ref="Ref" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
      <slot></slot>
    </div>
    <ui-popper hasArrow :refElement="refElement" :placement="placement" :visible="always || popperVisible">
      <div class="ui-tooltip-content">
        <slot name="content">{{content}}</slot>
      </div>
    </ui-popper>
  </div>
</template>
<script>
import UiPopper from './popper/Popper'
export default {
  components: { UiPopper },
  data() {
    return { popperVisible: false, refElement: null }
  },
  props: {
    content: [String, Number],
    placement: String,
    disabled: Boolean,
    delay: {
      type: Number,
      default: 0
    },
    always: Boolean
  },
  watch: {
    disabled(newVal) {
      if (newVal) this.popperVisible = false
    }
  },
  methods: {
    handleMouseenter() {
      if (this.disabled) return
      this.timeout = setTimeout(() => {
        this.popperVisible = true
        this.$emit('on-popper-show')
      }, this.delay)
    },
    handleMouseleave() {
      clearTimeout(this.timeout)
      this.popperVisible = false
      this.$emit('on-popper-hide')
    }
  },
  mounted() {
    this.refElement = this.$refs.Ref.children[0]
  }
}
</script>
<style lang="less">
.ui-tooltip, .ui-tooltip-rel {
  display: inline-block;
}

.ui-tooltip-content {
  max-width: 250px;
  min-height: 34px;
  padding: 8px 12px;
  color: #fff;
  background-color: fade(@content-color, 96%);
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  white-space: nowrap;
}
</style>