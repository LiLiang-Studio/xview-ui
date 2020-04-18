<template>
  <span>
    <ul :class="prefix">
      <x-cascader-item v-for="_ in data" :key="_.value" :option="_"
        @click.native="onItemClick(_, $event)" @mouseenter.native="onItemClick(_, $event)"/>
    </ul>
    <x-cascader-menu v-if="nextData" :data="nextData"/>
  </span>
</template>
<script>
import { findParent } from '../../tools'
import XCascaderItem from './CascaderItem.vue'
const getChildren = (vm, name = 'XCascaderMenu') => vm.$children.filter(_ => _.$options.name === name)
export default {
  name: 'XCascaderMenu',
  components: { XCascaderItem },
  props: { data: Array },
  data() {
    return { prefix: 'x-cascader-menu', nextData: null }
  },
  methods: {
    onItemClick(option, e) {
      let { trigger, loadData } = findParent(this, 'XCascader'),
        isClick = e.type === 'click',
        isHover = e.type === 'mouseenter' && trigger === 'hover'
      if (isClick || isHover) {
        this.getSubMenus().forEach(_ => _.nextData = null)
        if (loadData && option.children && option.children.length < 1) {
          loadData(option, () => this.nextData = option.children)
        } else {
          this.nextData = option.children
        }
        getChildren(this, 'XCascaderItem').forEach(_ => {
          if (isClick || option.children) {
            _.selected = _.option.value === option.value
          }
        })
      }
      if (!option.children && isClick) {
        findParent(this, 'XCascader').updateValue()
      }
    },
    getSubMenus() {
      let menus = [], menu = getChildren(this)[0]
      while (menu) {
        menus.push(menu)
        menu = getChildren(menu)[0]
      }
      return menus
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-cascader-menu {
  display: inline-block;
  padding: 5px 0;
  min-width: 100px;
  height: 180px;
  overflow: auto;
  vertical-align: top;
  border-right: 1px solid @border-color;
  &:last-child {
    border-right-color: transparent;
  }
}
</style>