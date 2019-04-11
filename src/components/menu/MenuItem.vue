<template>
  <li class="ui-menu-item" :class="{active}" @click="handleClick">
    <slot></slot>
  </li>
</template>
<script>
import { findParentByName } from './../../utils'
export default {
  data() {
    return {
      parent: null,
      menuRoot: null
    }
  },
  props: {
    name: [String, Number]
  },
  computed: {
    isVertical() {
      return this.menuRoot && this.menuRoot.getMode() === 'vertical'
    },
    active() {
      if (this.parent) {
        return this.isVertical && this.menuRoot.getActiveName() === this.name
      } else {
        return this.menuRoot && this.menuRoot.getActiveName() === this.name
      }
    }
  },
  methods: {
    handleClick() {
      this.menuRoot && this.menuRoot.updateActiveName(
        !this.parent || this.isVertical ? this.name : this.parent.getName()
      )
      !this.isVertical && this.parent && this.parent.close()
      this.menuRoot && this.menuRoot.onSelect(this.name)
    }
  },
  mounted() {
    this.menuRoot = findParentByName(this, 'ui-menu')
    this.parent = findParentByName(this, 'ui-menu-submenu')
  }
}
</script>