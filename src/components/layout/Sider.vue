<template>
  <div class="ui-layout-sider" :style="styles">
    <slot></slot>
    <div v-if="showTrigger" class="ui-layout-sider-trigger" :style="{width: styles.width}" @click="toggleCollapse">
      <UiIcon class="ui-layout-sider-trigger-icon" :class="{isCollapsed}" type="ios-arrow-back"/>
    </div>
  </div>
</template>
<script>
import UiIcon from './../Icon'
export default {
  name: 'ui-sider',
  components: { UiIcon },
  data() {
    return {
      isCollapsed: this.value || this.defaultCollapsed
    }
  },
  props: {
    value: Boolean,
    width: {
      type: [Number, String],
      default: 200
    },
    collapsible: Boolean,
    collapsedWidth: {
      type: Number,
      default: 64
    },
    hideTrigger: Boolean,
    defaultCollapsed: Boolean,
    reverseArrow: Boolean
  },
  computed: {
    styles() {
      let condition = this.defaultCollapsed ? true : this.collapsible
      let size = `${condition && this.isCollapsed ? this.collapsedWidth : this.width}px`
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