<template>
  <ul :class="prefix">
    <li :class="`${prefix}-item`">
      <div :class="`${prefix}-title`">
        <ui-loading v-if="data.loading" :class="`${prefix}-loading`" :iconClass="`${prefix}-loading-icon`" loading/>
        <ui-icon type="ios-arrow-forward" v-else-if="hasArrow" :class="[`${prefix}-arrow`, {expand: data.expand}]" 
          @click="toggleExpand(data)"/>
        <ui-checkbox v-model="data.checked" :class="`${prefix}-checkbox`" :disabled="data.disableCheckbox || data.disabled"
          :indeterminate="data.indeterminate" @click.native="onCheckboxClick(data)"/>
        <ui-render v-if="renderFns" :render="renderFns" :data="data" :root="rootData"/>
        <span v-else :class="[`${prefix}-text`, {selected: data.selected}]" @click="onTextClick(data)">{{data.title}}</span>
      </div>
      <template v-if="data.children && data.expand">
        <ui-tree-node v-for="(item, index) in data.children" :key="index" :class="`${prefix}-child`" :data="item" :render="render"/>
      </template>
    </li>
  </ul>
</template>
<script>
import UiIcon from '../icon'
import UiLoading from './../scroll/Loading.vue'
import { Checkbox as UiCheckbox } from '../checkbox'
import { findParent } from '@/tools'
const UiRender = {
  functional: true,
  render: (h, ctx) => ctx.props.render(h, ctx.props)
}
export default {
  name: 'UiTreeNode',
  components: { UiIcon, UiLoading, UiCheckbox, UiRender },
  data() {
    return { prefix: 'ui-tree-node', parent: null }
  },
  props: {
    data: Object,
    render: Function
  },
  computed: {
    renderFns() {
      return this.data.render || this.render
    },
    rootData() {
      return this.parent ? this.parent.flatState : []
    },
    hasArrow() {
      if (this.parent && this.parent.loadData) return this.data.children
      return this.data.children && this.data.children.length
    }
  },
  methods: {
    onTextClick(item) {
      if (item.disabled) return
      this.parent.updateSeleckedNodes(item)
    },
    onCheckboxClick(item) {
      if (item.disabled || item.disableCheckbox) return
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
    padding: 4px 0;
    display: flex;
    align-items: center;
  }
  &-loading-icon, &-arrow {
    width: 14px;
  }
  &-arrow, &-loading {
    margin-right: 6px;
  }
  &-arrow {
    color: @sub-color;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform .2s ease-in-out;
    &.expand {
      transform: rotate(90deg);
    }
  }
  &-loading-icon {
    color: @content-color;
    font-size: 14px !important;
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
    border-radius: 3px;
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
  }
}
.ui-tree {
  &.showCheckbox &-node-checkbox {
    display: inline-block;
  }
}
</style>