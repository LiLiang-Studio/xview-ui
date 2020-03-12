<template>
  <div :class="prefix">
    <div :class="`${prefix}_header`" @click="onClick">
      <x-icon v-if="!hideArrow" :class="[`${prefix}_icon`, {expand}]" type="ios-arrow-forward"/>
      <slot></slot>
    </div>
    <div v-show="expand" :class="`${prefix}_content`">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'XPanel',
  components: { XIcon },
  props: { name: String, hideArrow: Boolean },
  data() {
    return { prefix: 'x-panel' }
  },
  computed: {
    expand() {
      return findParent(this, 'XCollapse').inNames(this)
    }
  },
  methods: {
    onClick() {
      this.parent.updateNames(this)
    }
  },
  mounted() {
    this.parent = findParent(this, 'XCollapse')
    this.parent.addPanel(this)
  }
}
</script>