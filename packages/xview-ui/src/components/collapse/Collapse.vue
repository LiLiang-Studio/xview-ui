<template>
  <div :class="['ui-collapse', {simple}]">
    <slot></slot>
  </div>
</template>
<script>
import { isArr } from '@/tools'
export default {
  name: 'UiCollapse',
  data() {
    return { childs: [], names: this.syncModel() }
  },
  props: {
    accordion: Boolean,
    value: [Array, String],
    simple: Boolean
  },
  watch: {
    value(newVal) {
      this.names = this.syncModel()
    },
    names(newval) {
      this.$emit('input', newval)
      this.$emit('on-change', newval)
    }
  },
  methods: {
    isExpand(vm) {
      return this.names.indexOf(vm.name || this.childs.indexOf(vm)) !== -1
    },
    syncModel() {
      return isArr(this.value) ? this.value : [this.value]
    },
    updateModel(vm) {
      let name = vm.name || this.childs.indexOf(vm)
      let index = this.names.indexOf(name)
      if (this.accordion) {
        this.names = index === -1 ? [name] : []
        return this.childs.forEach(_ => _.name !== name && _.fold())
      }
      if (index === -1) return this.names.push(name)
      this.names.splice(index, 1)
    },
    addChild(vm) {
      this.childs.push(vm)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-collapse {
  border-radius: 3px;
  background-color: @bg-color;
  border: 1px solid @border-color;
  &.simple {
    border-left: none;
    border-right: none;
    background-color: #fff;
  }
  &-item + &-item {
    border-top: 1px solid @border-color;
  }
  &-item-header {
    height: 38px;
    padding-left: 32px;
    color: #666;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  &-item-icon {
    margin-right: 14px;
    transition: transform .2s ease-in-out;
    &.isExpanded {
      transform: rotateZ(90deg);
    }
  }
  &-item-content {
    padding: 16px;
    overflow: hidden;
    background-color: #fff;
  }
}
</style>