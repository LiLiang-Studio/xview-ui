<template>
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>
<script>
import './style.less'
import { findParent, findChildrens } from '../../tools'
export default {
  name: 'XMenu',
  props: {
    mode: {
      default: 'vertical',
      validator(v) {
        return ['horizontal', 'vertical'].indexOf(v) > -1
      }
    },
    theme: {
      default: 'light',
      validator(v) {
        return ['light', 'dark', 'primary'].indexOf(v) > -1
      }
    },
    activeName: [String, Number],
    openNames: { type: Array, default: () => [] },
    accordion: Boolean,
    width: { type: String, default: '240px' }
  },
  data() {
    return { prefix: 'x-menu', openedNames: this.openNames, activedItemName: this.activeName }
  },
  computed: {
    classes() {
      let { prefix } = this
      return [prefix, `${prefix}_${this.mode}`, `${prefix}_${this.theme}`]
    },
    styles() {
      return this.mode === 'vertical' && { width: this.width }
    }
  },
  watch: {
    openedNames(val) {
      this.$emit('on-open-change', val)
    }
  },
  methods: {
    updateActiveName(name) {
      this.activedItemName = name
    },
    toggleSubmenu(vm) {
      let index = this.openedNames.indexOf(vm.name)
      if (this.accordion || 2) {
        const parent = findParent(vm, 'XSubmenu') || this
        const siblings = findChildrens(parent, 'XSubmenu')
        const children = findChildrens(vm, 'XSubmenu')
        if (index > -1) {
          this.openedNames.splice(index, 1)
          children.forEach(_ => {
            let i = this.openedNames.indexOf(_.name)
            if (i > -1) this.openedNames.splice(i, 1)
          })
        } else {
          siblings.forEach(_ => {
            let i = this.openedNames.indexOf(_.name)
            if (i > -1) this.openedNames.splice(i, 1)
          })
          this.openedNames.push(vm.name)
        }
      } else {
        index < 0 ? this.openedNames.push(vm.name) : this.openedNames.splice(index, 1)
      }
    }
  }
}
</script>