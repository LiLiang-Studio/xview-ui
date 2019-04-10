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
    active() {
      return !this.parent && this.menuRoot && this.menuRoot.getActiveName() === this.name
    }
  },
  methods: {
    handleClick() {
      this.menuRoot && this.menuRoot.updateActiveName(this.parent ? this.parent.getName() : this.name)
      this.parent && this.parent.close()
      this.menuRoot && this.menuRoot.onSelect(this.name)
    }
  },
  mounted() {
    this.menuRoot = findParentByName(this, 'ui-menu')
    this.parent = findParentByName(this, 'ui-menu-submenu')
  }
}
</script>