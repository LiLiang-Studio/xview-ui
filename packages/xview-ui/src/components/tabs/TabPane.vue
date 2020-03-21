<template>
  <div class="x-tabs-pane">
    <slot></slot>
  </div>
</template>
<script>
import { findParent } from '../../tools'
const S = String, B = Boolean
export default {
  name: 'XTabPane',
  data() {
    return { key: this.name }
  },
  props: {
    name: S,
    label: [S, Function],
    icon: S,
    disabled: B,
    closable: { type: B, default: null }
  },
  mounted() {
    this.parent = findParent(this, 'XTabs')
    let len = this.parent.addItem(this)
    if (this.key === undefined) this.key = len - 1
  },
  beforeDestroy() {
    this.parent.removeItem(this)
  }
}
</script>