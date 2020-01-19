<template>
  <li class="ui-dropdown-item" :class="{divided}">
    <div class="ui-dropdown-item-btn" :class="{ selected, disabled}" @click="handleClick"><slot></slot></div>
  </li>
</template>
<script>
import { findParent } from '../../tools'
export default {
  data() {
    return { parent: null }
  },
  props: {
    name: String,
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean
  },
  methods: {
    handleClick(event) {
      if (this.disabled) return
      this.parent && this.parent.itemClick(this.name)
    }
  },
  mounted() {
    this.parent = findParent(this, 'ui-dropdown')
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-dropdown-item {
  list-style: none;
  line-height: normal;
  font-size: 12px;
  color: @content-color;
  &.divided {
    margin-top: 5px;
    border-top: 1px solid @divider-color;
    &:before {
      content: '';
      display: block;
      height: 5px;
    }
  }
}

.ui-dropdown-item-btn {
  padding: 7px 16px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color .2s ease-in-out;
  &:hover:not(.disabled) {
    background-color: @disabled-bg-color;
  }
  &.selected:not(.disabled) {
    color: #fff;
    background-color: @primary-color;
  }
  &.disabled {
    color: @disabled-color;
    cursor: not-allowed;
  }
}
</style>