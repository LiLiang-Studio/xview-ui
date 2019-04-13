<template>
  <ul class="ui-tree-node">
    <li class="ui-tree-node-item" v-for="(item, index) in data" :key="index">
      <div class="ui-tree-node-title">
        <UiIcon class="ui-tree-node-arrow" type="arrow-right-b"/>
        <UiCheckbox v-if="showCheckbox" 
          :disabled="item.disableCheckbox || item.disabled"  v-model="item.checked" @on-change="handleChange"/>
        <span class="ui-tree-node-text" :class="{selected: item.selected}" @click="handleTextClick(item)">{{item.title}}</span>
      </div>
      <ui-tree-node v-if="item.children" :data="item.children" :showCheckbox="showCheckbox"></ui-tree-node>
    </li>
  </ul>
</template>
<script>
import UiIcon from './../Icon'
import UiCheckbox from './../checkbox/Checkbox'
import { findParentByName } from './../../utils'
export default {
  name: 'ui-tree-node',
  components: { UiIcon, UiCheckbox },
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
    handleTextClick(item) {
      if (item.disabled) return
      this.parent && this.parent.updateSeleckedNodes(item)
    },
    handleChange() {
      this.parent.updateCheckedNodes()
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
    line-height: 2;
    font-size: 14px;
  }
}

.ui-tree-node-arrow {
  margin-right: 6px;
  cursor: pointer;
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