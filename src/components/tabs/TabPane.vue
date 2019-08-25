<template>
  <div class="ui-tab-pane" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '@/tools'
export default {
  data() {
    return {
      key: this.name,
      parent: null
    }
  },
  props: {
    name: String,
    label: [String, Function],
    icon: String,
    disabled: Boolean,
    closable: {
      type: Boolean,
      default: null
    }
  },
  computed: {
    styles() {
      return this.parent ? { width: `${(1 / this.parent.tabPanes.length) * 100}%` } : {}
    }
  },
  mounted() {
    this.parent = findParent(this, 'ui-tabs')
    if (this.parent) {
      this.parent.addPane(this)
    }
  },
  beforeDestroy() {
    this.$el.remove()
    this.parent && this.parent.removePane(this)
  }
}
</script>