<template>
  <div :class="prefix">
    <div :class="`${prefix}_title`">
      <span :class="`${prefix}_icon`">
        <x-loading v-if="data.loading" :iconClass="`${prefix}_loadingIcon`" loading/>
        <x-icon v-else-if="hasArrow" type="ios-arrow-forward" :class="[`${prefix}_arrow`, {expand: data.expand}]" @click="onToggleExpand"/>
      </span>
      <x-checkbox
        v-model="data.checked"
        :class="`${prefix}_checkbox`"
        :indeterminate="data.indeterminate"
        :disabled="data.disableCheckbox || data.disabled"
        @on-change="onCheckChange"/>
      <span :class="labelClass" @click="onSelect">
        <x-render v-if="renderFn" :render="renderFn" :data="data" :root="root"/>
        <div v-else v-html="data.title"></div>
      </span>
    </div>
    <template v-if="data.children && data.expand">
      <x-tree-node v-for="(_, i) in data.children" :key="i" :class="`${prefix}_child`" :data="_" :render="render"/>
    </template>
  </div>
</template>
<script>
import XIcon from '../icon'
import XLoading from './../scroll/Loading.vue'
import XCheckbox from '../checkbox'
import { findParent, XRender } from '../../tools'
export default {
  name: 'XTreeNode',
  components: { XIcon, XLoading, XCheckbox, XRender },
  props: { data: Object, render: Function },
  data() {
    return { prefix: 'x-tree-node', parent: null }
  },
  computed: {
    renderFn() {
      return this.data.render || this.render
    },
    root() {
      return this.parent ? this.parent.flatData : []
    },
    hasArrow() {
      return this.data.children && (this.parent && this.parent.loadData ? true : this.data.children.length)
    },
    labelClass() {
      return [`${this.prefix}_label`, { selected: this.data.selected, isRender: this.renderFn }]
    }
  },
  mounted() {
    this.parent = findParent(this, 'XTree')
  },
  methods: {
    onSelect() {
      if (!this.data.disabled) this.parent.updateSelectedNodes(this.data)
    },
    onCheckChange() {
      this.parent.checkChange(this.data)
    },
    onToggleExpand() {
      this.parent.toggleExpand(this.data)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
@iconSize: 16px;
@prefix: .x-tree-node;
@{prefix} {
  &_title {
    margin: 8px 0;
    display: flex;
    align-items: center;
  }
  &_icon {
    width: @iconSize;
    height: @iconSize;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 3px;
  }
  &_arrow {
    cursor: pointer;
    color: @sub-color;
    transition: transform .2s ease-in-out;
    &.expand {
      transform: rotate(90deg);
    }
  }
  &_loadingIcon {
    color: @content-color;
    font-size: 14px !important;
  }
  &_child {
    padding-left: @iconSize;
  }
  &_label {
    padding: 0 4px;
    cursor: pointer;
    border-radius: 3px;
    transition: all .2s ease-in-out;
    &.isRender {
      flex: 1;
    }
    &:hover {
      background: lighten(@primary-color, 40%);
    }
    &.selected {
      background: lighten(@primary-color, 35%);
    }
  }
  &_checkbox {
    margin: 0 0 0 4px;
  }
}
.x-tree:not(.showCheckbox) @{prefix}_checkbox {
  display: none;
}
</style>