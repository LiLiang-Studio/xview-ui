<template>
  <ul :class="prefix">
    <li :class="`${prefix}-item`" v-for="(item, index) in data" :key="index">
      <div :class="`${prefix}-title`">
        <ui-loading v-if="item.loading" :class="`${prefix}-loading`" :iconClass="`${prefix}-loading-icon`" loading/>
        <ui-icon type="ios-arrow-forward" v-else-if="item.children" :class="[`${prefix}-arrow`, {expand: item.expand}]" 
          @click="toggleExpand(item)"/>
        <ui-checkbox :class="`${prefix}-checkbox`"
          :disabled="item.disableCheckbox || item.disabled" v-model="item.checked" @click.native="onCheckboxClick(item)"/>
        <span :class="[`${prefix}-text`, {selected: item.selected}]" @click="onTextClick(item)">{{item.title}}</span>
      </div>
      <ui-tree-node :class="`${prefix}-child`" v-if="item.children && item.expand" :data="item.children" :render="render"/>
    </li>
  </ul>
</template>
<script>
import UiIcon from '../icon'
import UiLoading from './../scroll/Loading.vue'
import { Checkbox as UiCheckbox } from '../checkbox'
import { findParent } from '@/tools'
export default {
  name: 'UiTreeNode',
  components: { UiIcon, UiLoading, UiCheckbox },
  data() {
    return { prefix: 'ui-tree-node', parent: null }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    render: Function
  },
  methods: {
    onTextClick(item) {
      if (item.disabled) return
      this.parent.updateSeleckedNodes(item)
    },
    onCheckboxClick(item) {
      if (item.disabled) return
      this.parent.updateCheckedNodes(item)
    },
    toggleExpand(item) {
      this.parent.toggleExpand(item)
    }
  },
  mounted() {
    this.parent = findParent(this, 'UiTree')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-tree-node {
  &-item {
    font-size: 14px;
    list-style: none;
  }
  &-title {
    padding: 6px 0;
    display: flex;
    align-items: center;
  }
  &-loading-icon, &-arrow {
    width: 14px;
  }
  &-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    vertical-align: middle;
    transition: transform .2s ease-in-out;
    &.expand {
      display: flex;
      justify-content: center;
      transform: rotate(90deg);
    }
  }
  &-loading-icon {
    font-size: 14px !important;
    color: @content-color;
  }
  &-loading {
    height: auto;
    width: 14px;
  }
  &-child {
    padding-left: 2em;
  }
  &-text {
    padding: 0 4px;
    cursor: pointer;
    border-radius: 2px;
    transition: all .2s ease-in-out;
    &:hover {
      background-color: lighten(@info-color, 39%);
    }
    &.selected {
      background-color: lighten(@info-color, 33%);
    }
  }
  &-checkbox {
    display: none;
    margin-right: 0;
    margin-left: 6px;
  }
}
.ui-tree {
  &.showCheckbox &-node-checkbox {
    display: inline-block;
  }
}
</style>