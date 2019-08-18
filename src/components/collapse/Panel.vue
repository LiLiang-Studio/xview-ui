<template>
  <div class="ui-collapse-item">
    <div class="ui-collapse-item-header" :class="{isExpanded}" @click="handleHeaderClick">
      <UiIcon class="ui-collapse-item-icon" type="arrow-right-b"/>
      <slot></slot>
    </div>
    <div v-show="isExpanded" class="ui-collapse-item-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import UiIcon from './../Icon.vue'
import { findParentByName } from '../../utils'
export default {
  components: { UiIcon },
  data() {
    return {
      parent: null,
      isExpanded: false
    }
  },
  props: {
    name: String
  },
  methods: {
    handleHeaderClick() {
      this.isExpanded = !this.isExpanded
      if (this.parent) {
        this.parent.updateModel(this.name)
      }
    },
    fold() {
      this.isExpanded = false
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-collapse')
    if (this.parent) {
      this.parent.addChild(this)
      this.isExpanded = this.parent.includes(this.name)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-collapse-item + .ui-collapse-item {
  border-top: 1px solid @border-color;
}

.ui-collapse-item-header {
  height: 38px;
  padding-left: 32px;
  color: #666;
  display: flex;
  align-items: center;
  cursor: pointer;
  &.isExpanded .ui-collapse-item-icon {
    transform: rotateZ(90deg);
  }
}

.ui-collapse-item-icon {
  margin-right: 3px;
  transition: transform .2s ease-in-out;
}

.ui-collapse-item-content {
  background-color: #fff;
  padding: 16px;
  overflow: hidden;
}
</style>