<template>
  <li :class="['x-menu-item', {active}]" :style="titleStyle" @click="onClick">
    <slot></slot>
  </li>
</template>
<script>
import { findParent } from '../../tools'
import { watchMode } from './utils'
export default {
  mixins: [watchMode],
  name: 'XMenuItem',
  props: {
    name: [String, Number]
  },
  data() {
    return { active: false }
  },
  mounted() {
    const menu = findParent(this, 'XMenu')
    this.unwatchActivedName = this.$watch(
      () => menu.activedItemName,
      val => this.active = val === this.name,
      { immediate: true }
    )
  },
  beforeDestroy() {
    this.unwatchActivedName()
  },
  methods: {
    onClick() {
      const menu = findParent(this, 'XMenu'), 
        submenu = findParent(this, 'XSubmenu')
      menu.updateActiveName(this.name)
      menu.$emit('on-select', this.name)
      if (menu.mode === 'horizontal' && submenu) submenu.show(false)
    }
  }
}
</script>