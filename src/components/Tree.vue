<template>
  <div class="ui-tree">
    <ul class="ui-tree-list">
      <li class="ui-tree-item" v-for="(item, index) in data" :key="index">
        <div class="title">
          <UiIcon type="arrow-right-b"/>
          <UiCheckbox v-model="item.checked"/>
          <span>{{item.title}}</span>
        </div>
        <ui-tree></ui-tree>
      </li>
    </ul>
  </div>
</template>
<script>
import UiIcon from './Icon'
import UiCheckbox from './checkbox/Checkbox'
import { RenderCell } from './../utils'
export default {
  name: 'ui-tree',
  components: { UiIcon, UiCheckbox },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    multiple: Boolean,
    showCheckbox: Boolean,
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loadData: Function,
    render: Function,
    childrenKey: {
      type: String,
      default: 'children'
    }
  }
}
</script>
<style lang="less">

</style>