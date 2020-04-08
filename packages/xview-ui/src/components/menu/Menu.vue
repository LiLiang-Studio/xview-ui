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
    addOpenedNames(name) {
      this.openedNames.push(name)
    },
    removeOpenedNames(vms) {
      vms.forEach(_ => {
        let i = this.openedNames.indexOf(_.name)
        i > -1 && this.openedNames.splice(i, 1)
      })
    },
    toggleSubmenu(vm) {
      let index = this.openedNames.indexOf(vm.name)
      if (this.accordion) {
        const siblings = vm.getSiblings()
        if (index < 0) { // 不在里面 -> 添加到里面并折叠兄弟及其所有子菜单
          this.removeOpenedNames(siblings.reduce((acc, _) => [...acc, ..._.getSubAll()], siblings))
          this.openedNames.push(vm.name)
        } else { // 在里面 -> 移除其及其所有子菜单
          this.removeOpenedNames([vm, ...vm.getSubAll()])
        }
      } else {
        if (index < 0) {
          this.openedNames.push(vm.name)
        } else {
          this.removeOpenedNames([vm, ...vm.getSubAll()])
        }
      }
    }
  }
}
</script>