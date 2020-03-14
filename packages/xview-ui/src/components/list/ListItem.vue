<template>
  <li :class="[`${prefix}_box`, `${prefix}-item`]">
    <div :class="`${prefix}-item_box`">
      <slot></slot>
      <ul v-if="vertical" :class="`${prefix}-item_action`">
        <slot name="action"></slot>
      </ul>
    </div>
    <ul v-if="!vertical" :class="`${prefix}-item_action`">
      <slot name="action"></slot>
    </ul>
    <div :class="`${prefix}-item_extra`">
      <slot name="extra"></slot>
    </div>
  </li>
</template>
<script>
import { findParent } from '../../tools'
export default {
  name: 'XListItem',
  data() {
    return { prefix: 'x-list' }
  },
  computed: {
    vertical() {
      let par = findParent(this, 'XList')
      return par && par.itemLayout === 'vertical'
    }
  }
}
</script>