<template>
  <div class="ui-tabs-pane" :style="styles">
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '@/tools'
export default {
  name: 'UiTabPane',
  data() {
    return { key: this.name, parent: null }
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
      return this.parent && { width: `${(1 / this.parent.childs.length) * 100}%` }
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiTabs')
    let len = this.parent.addItem(this)
    this.key = this.name || len - 1
  },
  beforeDestroy() {
    this.parent.removeItem(this)
  }
}
</script>