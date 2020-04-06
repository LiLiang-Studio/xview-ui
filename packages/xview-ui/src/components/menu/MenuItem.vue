<template>
  <li :class="['x-menu-item', {active}]" @click="onClick">
    <slot></slot>
  </li>
</template>
<script>
import { findParent } from '../../tools'
export default {
  name: 'XMenuItem',
  props: {
    name: [String, Number]
  },
  data() {
    return { submenu: null, menu: null }
  },
  computed: {
    isHor() {
      return this.menu && this.menu.mode === 'horizontal'
    },
    active() {
      return this.menu && this.menu.activedItemName === this.name
    }
  },
  mounted() {
    this.menu = findParent(this, 'XMenu')
    this.submenu = findParent(this, 'XSubmenu')
  },
  methods: {
    onClick() {
      this.menu && this.menu.updateActiveName(this.name)
      this.isHor && this.submenu && this.submenu.show(false)
    }
  }
}
</script>