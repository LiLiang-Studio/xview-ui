<template>
  <div :class="prefix">
    <div :class="`${prefix}-header`" @click="onHeaderClick">
      <UiIcon v-if="!hideArrow" :class="[`${prefix}-icon`, {isExpanded}]" type="ios-arrow-forward"/>
      <slot></slot>
    </div>
    <div v-show="isExpanded" :class="`${prefix}-content`">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'UiPanel',
  components: { UiIcon },
  data() {
    return { prefix: 'ui-collapse-item', isExpanded: false }
  },
  props: {
    name: String,
    hideArrow: Boolean
  },
  methods: {
    onHeaderClick() {
      this.isExpanded = !this.isExpanded
      this.parent.updateModel(this)
    },
    fold() {
      this.isExpanded = false
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiCollapse')
    this.parent.addChild(this)
    this.isExpanded = this.parent.isExpand(this)
  }
}
</script>