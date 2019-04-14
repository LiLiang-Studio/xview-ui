<template>
  <ul class="ui-tree-node">
    <li class="ui-tree-node-item" v-for="(item, index) in data" :key="index">
      <div class="ui-tree-node-title">
        <div v-if="item.loading" class="ui-tree-node-loading">
          <UiLoading iconClass="ui-tree-node-loading-icon" loading/>
        </div>
        <template v-else>
          <UiIcon type="arrow-right-b" class="ui-tree-node-arrow" v-if="item.children" 
            :class="{expand: item.expand}" @click="toggleExpand(item)"/>
        </template>
        <UiCheckbox v-if="showCheckbox" 
          :disabled="item.disableCheckbox || item.disabled"  v-model="item.checked" @on-change="handleCheckedChange(item)"/>
        <span class="ui-tree-node-text" :class="{selected: item.selected}" @click="handleTextClick(item)">{{item.title}}</span>
      </div>
      <ui-tree-node v-if="item.children && item.expand" :data="item.children" :showCheckbox="showCheckbox"></ui-tree-node>
    </li>
  </ul>
</template>
<script>
import UiIcon from './../Icon'
import UiLoading from './../scroll/Loading'
import UiCheckbox from './../checkbox/Checkbox'
import { findParentByName } from './../../utils'
export default {
  name: 'ui-tree-node',
  components: { UiIcon, UiLoading, UiCheckbox },
  data() {
    return { parent: null }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    showCheckbox() {
      return this.parent && this.parent.showCheckbox
    }
  },
  methods: {
    /**
     * 选择当前节点
     */
    handleTextClick(item) {
      if (item.disabled) return
      this.parent && this.parent.updateSeleckedNodes(item)
    },
    /**
     * 复选框选中状态改变
     */
    handleCheckedChange(item) {
      this.parent.updateCheckedNodes(item)
    },
    /**
     * 切换折叠和展开子节点
     */
    toggleExpand(item) {
      this.$set(item, 'expand', !item.expand)
      this.parent && this.parent.toggleExpand(item)
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-tree')
  }
}
</script>
<style lang="less">
.ui-tree-node {
  li {
    list-style: none;
    font-size: 14px;
  }
}

.ui-tree-node-title {
  display: flex;
  align-items: center;
  padding: 6px 0;
  .ui-checkbox {
    margin-right: 0;
  }
}

.ui-tree-node-loading-icon, .ui-tree-node-arrow {
  width: 14px;
}

.ui-tree-node-arrow {
  cursor: pointer;
  transition: transform .2s ease-in-out;
  &.expand {
    display: flex;
    justify-content: center;
    transform: rotate(90deg);
  }
}

.ui-tree-node-loading-icon {
  font-size: 14px !important;
  color: @content-color;
}

.ui-tree-node-loading {
  position: relative;
  display: inline-block;
  .ui-scroll-loading {
    height: auto;
    width: 14px;
  }
}

.ui-tree-node-item {
  padding-left: 2em;
}

.ui-tree-node-text {
  padding: 0 4px;
  cursor: pointer;
  &:hover {
    background-color: lighten(@info-color, 39%);
  }
  &.selected {
    background-color: lighten(@info-color, 33%);
  }
}
</style>