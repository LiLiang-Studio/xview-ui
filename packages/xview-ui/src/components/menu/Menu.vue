<template>
  <ul :class="classes" :style="styles">
    <slot></slot>
  </ul>
</template>
<script>
import './style.less'
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
    openNames: {
      type: Array,
      default: () => []
    },
    accordion: { type: Boolean, default: true },
    width: {
      type: String,
      default: '240px'
    }
  },
  data() {
    return { prefix: 'x-menu', openedNames: this.openNames, activedItemName: this.activeName }
  },
  computed: {
    classes() {
      return [this.prefix, `${this.prefix}_${this.mode}`, `${this.prefix}_${this.theme}`]
    },
    styles() {
      return this.mode === 'vertical' && { width: this.width }
    }
  },
  watch: {
    openedNames(val) {
      this.onOpenChange()
    }
  },
  methods: {
    updateOpened(names = []) { // 更新展开的子目录 -> API方法 名字不可修改
      this.openedNames = names
      this.$emit('update:openNames', names)
    },
    updateActiveName(name) { // 更新当前选择项 -> API方法 名字不可修改
      this.activedItemName = name
      this.$emit('update:activeName', name)
    },
    toggleSubmenu(name) {
      let index = this.openedNames.indexOf(name)
      if (this.accordion) {
        this.openedNames = index === -1 ? [name] : []
      } else {
        if (index === -1) {
          this.openedNames.push(name)
        } else {
          this.openedNames.splice(index, 1)
        }
      }
      this.$emit('update:openNames', this.openedNames)
    },
    onOpenChange() {
      this.$emit('on-open-change', this.openedNames)
    },
    onSelect(name) {
      this.$emit('on-select', name)
    }
  }
}
</script>