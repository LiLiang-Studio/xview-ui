<template>
  <li :class="classes" v-if="!removed" @click="onClick">
    <div :class="`${prefix}_content`">
      <slot>{{label || value}}</slot>
    </div>
    <x-icon v-if="selected" :class="`${prefix}_doneIcon`" type="android-done"/>
  </li>
</template>
<script>
import XIcon from '../icon'
import { findParent } from '../../tools'
export default {
  name: 'XOption',
  components: { XIcon },
  props: {
    label: String,
    disabled: Boolean,
    value: [String, Number]
  },
  data() {
    return {
      focus: false,
      removed: false,
      selected: false,
      prefix: 'x-option'
    }
  },
  computed: {
    classes() {
      return [
        this.prefix,
        {
          focus: this.focus,
          selected: this.selected,
          disabled: this.disabled
        }
      ]
    }
  },
  mounted() {
    this.parent = findParent(this, 'XSelect') || findParent(this, 'XAutocomplete')
    this.parent.addItem(this)
  },
  beforeDestroy() {
    this.parent.removeItem(this)
    this.parent = null
  },
  methods: {
    onClick() {
      if (!this.disabled) this.parent.updateSelected(this)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  list-style: none;
  padding: 7px 16px;
  line-height: 1.2;
  transition: background-color .2s ease-in-out;
  &.focus:not(.disabled), &:hover:not(.disabled) {
    background: darken(@bg-color, 2%);
  }
  &.selected:not(.disabled) {
    color: @primary-color;
  }
  &.disabled {
    cursor: not-allowed;
    color: @disabled-color;
  }
  &_content {
    flex: 1;
  }
  &_doneIcon {
    margin-left: 16px;
  }
}
</style>