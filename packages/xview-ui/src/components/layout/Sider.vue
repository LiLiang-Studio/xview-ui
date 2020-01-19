<template>
  <div :class="prefix" :style="styles">
    <slot></slot>
    <div v-if="showTrigger" :class="`${prefix}-trigger`" :style="{width: styles.width}" @click="toggleCollapse">
      <UiIcon :class="[`${prefix}-trigger-icon`, {isCollapsed}]" type="ios-arrow-back"/>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { parseSize } from '../../tools'
export default {
  name: 'UiSider',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-layout-sider', isCollapsed: this.value || this.defaultCollapsed }
  },
  props: {
    value: Boolean,
    width: {
      type: [Number, String],
      default: 200
    },
    collapsible: Boolean,
    collapsedWidth: {
      type: [Number, String],
      default: 64
    },
    hideTrigger: Boolean,
    defaultCollapsed: Boolean,
    reverseArrow: Boolean
  },
  computed: {
    styles() {
      let condition = this.defaultCollapsed || this.collapsible
      let size = parseSize(condition && this.isCollapsed ? this.collapsedWidth : this.width)
      return { width: size, minWidth: size, maxWidth: size, flex: `0 0 ${size}` }
    },
    showTrigger() {
      return !this.hideTrigger && this.collapsible
    },
    triggerIcon() {
      return this.reverseArrow ? 'ios-arrow-forward' : 'ios-arrow-back'
    }
  },
  watch: {
    value(newVal) {
      this.isCollapsed = newVal
    }
  },
  methods: {
    toggleCollapse() {
      if (!(this.defaultCollapsed || this.collapsible)) return
      this.isCollapsed = !this.isCollapsed
      this.$emit('input', this.isCollapsed)
      this.$emit('on-change', this.isCollapsed)
    }
  }
}
</script>