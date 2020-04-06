<template>
  <li :class="prefix" @click="onClick">
    <div :class="`${prefix}_divider`" v-if="divided"></div>
    <div :class="[`${prefix}_inner`, {selected, disabled}]">
      <slot></slot>
    </div>
  </li>
</template>
<script>
import { findParent } from '../../tools'
export default {
  name: 'XDropdownItem',
  props: {
    name: String,
    disabled: Boolean,
    divided: Boolean,
    selected: Boolean
  },
  data() {
    return { prefix: 'x-dropdown-item' }
  },
  methods: {
    onClick() {
      let parent = findParent(this, 'XDropdown')
      !this.disabled && parent && parent.itemClick(this.name)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-dropdown-item {
  list-style: none;
  &_inner {
    cursor: pointer;
    padding: 7px 16px;
    transition: all .2s;
    white-space: nowrap;
    color: @content-color;
    &.selected {
      color: @primary-color;
    }
    &:not(.disabled):hover, &.selected:not(.disabled) {
      background: darken(@bg-color, 2%);
    }
    &.disabled {
      cursor: not-allowed;
      color: @disabled-color;
    }
  }
  &_divider {
    margin: 5px 0;
    border-top: 1px solid @divider-color;
  }
}
</style>