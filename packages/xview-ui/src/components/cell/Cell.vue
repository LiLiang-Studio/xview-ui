<template>
  <div :class="[prefix, {disabled, selected}]" v-bind="bindProps" @click="onClick">
    <div>
      <div :class="`${prefix}_title`">
        <slot name="icon"></slot>
        <slot>{{title}}</slot>
      </div>
      <div :class="`${prefix}_label`">
        <slot name="label">{{label}}</slot>
      </div>
    </div>
    <div :class="`${prefix}_right`">
      <slot name="extra">{{extra}}</slot>
      <template v-if="to">
        <slot name="arrow">
          <x-icon type="ios-arrow-forward"/>
        </slot>
      </template>
    </div>
  </div>
</template>
<script>
import XIcon from '../icon'
import { link } from '../../mixins'
import { findParent } from '../../tools'
export default {
  mixins: [link],
  name: 'XCell',
  components: { XIcon },
  props: {
    name: [String, Number],
    title: String,
    label: String,
    extra: String,
    disabled: Boolean,
    selected: Boolean
  },
  data() {
    return { prefix: 'x-cell' }
  },
  computed: {
    bindProps() {
      return this.getLinkProps()
    }
  },
  methods: {
    onClick(e) {
      if (this.disabled) return
      let par = findParent(this, 'XCellGroup')
      par && par.$emit('on-click', this.name)
    }
  }
}
</script>
<style lang="less">
@import url("../../styles/vars.less");
.x-cell {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  min-height: 38px;
  padding: 7px 16px;
  transition: all .2s ease-in-out;
  &, &:hover {
    color: @content-color;
  }
  &:not(.disabled):not(.selected):hover {
    background-color: @disabled-bg-color;
  }
  &.selected {
    color: @primary-color;
    background-color: lighten(@primary-color, 40%);
  }
  &.disabled {
    cursor: not-allowed;
    color: @disabled-color;
  }
  &_label {
    font-size: 12px;
    color: @sub-color;
  }
  &_right .x-icon {
    margin-left: 2px;
  }
  &_title .x-icon {
    margin-right: 2px;
  }
}
</style>