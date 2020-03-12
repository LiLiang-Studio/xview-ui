<template>
  <div :class="['x-collapse', {simple}]">
    <slot></slot>
  </div>
</template>
<script>
import { isArr } from '../../tools'
export default {
  name: 'XCollapse',
  props: {
    accordion: Boolean,
    value: [Array, String],
    simple: Boolean
  },
  data() {
    return { panels: [], names: [] }
  },
  watch: {
    value: {
      immediate: true,
      handler: 'syncValue'
    },
    names(val) {
      this.$emit('input', val)
    }
  },
  methods: {
    inNames(vm) {
      return this.names.indexOf(vm.name || this.panels.indexOf(vm)) !== -1
    },
    syncValue() {
      this.names = isArr(this.value) ? this.value : [this.value]
    },
    updateNames(vm) {
      let name = vm.name || this.panels.indexOf(vm)
      let index = this.names.indexOf(name)
      index < 0 ? this.accordion ? (this.names = [name]) : this.names.push(name) : this.names.splice(index, 1)
      this.$emit('on-change', this.names)
    },
    addPanel(vm) {
      this.panels.push(vm)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-collapse {
  font-size: 14px;
  border-radius: 3px;
  background-color: @bg-color;
  border: 1px solid @border-color;
  &.simple {
    border-width: 1px 0;
    background-color: #fff;
  }
}
.x-panel {
  & + & {
    border-top: 1px solid @border-color;
  }
  &_header {
    padding: 9px 0 9px 32px;
    color: #666;
    cursor: pointer;
  }
  &_icon {
    display: inline-block;
    margin-right: 14px;
    transition: transform .2s ease-in-out;
    &.expand {
      transform: rotateZ(90deg);
    }
  }
  &_content {
    padding: 16px;
    background-color: #fff;
  }
}
</style>