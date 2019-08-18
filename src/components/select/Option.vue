<template>
  <li class="ui-select-option" tabindex="-1" v-if="!isDelete" :class="{selected, multiple, focus, disabled}" @click="handleClick">
    <slot>{{label || value}}</slot>
    <UiIcon v-if="selected && multiple" class="ui-select-option-icon" type="android-done"/>
  </li>
</template>
<script>
import UiIcon from './../Icon.vue'
import { findParentByName } from './../../utils'
export default {
  name: 'ui-select-option',
  components: { UiIcon },
  data() {
    return {
      parent: null,
      isDelete: false,
      focus: false
    }
  },
  props: {
    value: [String, Number],
    label: String,
    disabled: Boolean
  },
  computed: {
    selected() {
      return this.parent && this.parent.isSelectedChild(this)
    },
    multiple() {
      return this.parent && this.parent.multiple
    }
  },
  methods: {
    handleClick() {
      if (this.disabled) return
      if (this.parent) this.parent.updateSelectedValue(this)
    }
  },
  mounted() {
    this.parent = findParentByName(this, 'ui-select')
    this.parent && this.parent.addChild(this)
  },
  beforeDestroy() {
    this.parent && this.parent.removeChild(this)
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.ui-select-option {
  padding: 7px 16px;
  list-style: none;
  outline: none;
  cursor: pointer;
  line-height: 1.2;
  position: relative;
  &.focus:not(.disabled), &:hover:not(.disabled) {
    background-color: @disabled-bg-color;
  }
  &.selected:not(.multiple):not(.disabled) {
    color: #fff;
    background-color: @primary-color;
    &.focus {
      background-color: darken(@primary-color, 8%);
    }
  }
  &.disabled {
    color: @disabled-color;
    cursor: not-allowed;
  }
  &.selected.multiple {
    color: @primary-color;
  }
}

.ui-select-option-icon {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 14px;
}
</style>