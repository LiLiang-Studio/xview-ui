<template>
  <div :class="prefix">
    <div :class="`${prefix}_header`" @click="onClick">
      <x-icon v-if="!hideArrow" :class="[`${prefix}_icon`, {expand}]" type="ios-arrow-forward"/>
      <slot></slot>
    </div>
    <x-collapse-transition>
      <div v-show="expand" :class="`${prefix}_body`">
        <div :class="`${prefix}_content`">
          <slot name="content"></slot>
        </div>
      </div>
    </x-collapse-transition>
  </div>
</template>
<script>
import XIcon from '../icon'
import XCollapseTransition from '../collapse-transition'
import { findParent } from '../../tools'
export default {
  name: 'XPanel',
  components: { XIcon, XCollapseTransition },
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